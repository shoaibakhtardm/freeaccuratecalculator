// src/engines/palworldBreedingEngine.ts
/**
 * Palworld Breeding Calculation Engine
 * 100% Client-Side, Deterministic, Pure Functions
 * 
 * Provides:
 * 1. calculateChild(parent1Id, parent2Id) -> Child Pal + Special metadata
 * 2. findParentCombinations(childId, options) -> All pairs that produce child
 * 3. findShortestBreedingPath(ownedIds, targetId, options) -> Graph BFS breeding chain
 * 4. calculateIVInheritance(parentA, parentB) -> Probability breakdown for talents/IVs
 * 5. searchPals(query, filter) -> Fast fuzzy & keyword search
 */

import {
  PALWORLD_PALS,
  PALWORLD_BREEDING_MAP,
  PALWORLD_SPECIAL_COMBINATIONS,
  type Pal,
  type SpecialCombination,
} from '../data/palworldData.ts';

export interface ParentPairResult {
  parent1: Pal;
  parent2: Pal;
  isSpecial: boolean;
  bothOwned: boolean;
}

export interface BreedingStep {
  step: number;
  parent1: Pal;
  parent2: Pal;
  child: Pal;
  isSpecial?: boolean;
}

export interface BreedingPathResult {
  found: boolean;
  target: Pal;
  depth: number;
  chain: BreedingStep[];
  allRequiredPals: Pal[];
  missingPals: Pal[];
  timeMs: number;
  message?: string;
}

export interface StatInheritanceProbability {
  parentAValue: number;
  parentBValue: number;
  parentAOdds: number; // e.g. 30%
  parentBOdds: number; // e.g. 30%
  mutationOdds: number; // e.g. 40%
  targetValue: number; // typically 100 or max
  targetOdds: number; // combined probability of hitting target
}

export interface IVInheritanceResult {
  hp: StatInheritanceProbability;
  attack: StatInheritanceProbability;
  defense: StatInheritanceProbability;
  perfectTripleOdds: number; // probability of getting max in all 3 stats
  summary: string;
}

// Inverted lookup map: parent1Id_parent2Id -> childId
const pairToChildMap = new Map<string, string>();
// Quick map: palId -> Pal
const palsById = new Map<string, Pal>();
// Quick map: slug -> Pal
const palsBySlug = new Map<string, Pal>();
// Special combo set for O(1) detection: parent1Id_parent2Id -> SpecialCombination
const specialComboMap = new Map<string, SpecialCombination>();

// Initialize lookups once on engine load
for (const pal of PALWORLD_PALS) {
  palsById.set(pal.id, pal);
  palsBySlug.set(pal.slug, pal);
}

for (const [childId, pairs] of Object.entries(PALWORLD_BREEDING_MAP)) {
  for (const [p1, p2] of pairs) {
    pairToChildMap.set(`${p1}_${p2}`, childId);
    pairToChildMap.set(`${p2}_${p1}`, childId);
  }
}

for (const sc of PALWORLD_SPECIAL_COMBINATIONS) {
  specialComboMap.set(`${sc.parent1Id}_${sc.parent2Id}`, sc);
  specialComboMap.set(`${sc.parent2Id}_${sc.parent1Id}`, sc);
}

/**
 * Retrieve a Pal by its internal or Paldeck ID (e.g. "001", "100", "085B")
 */
export function getPalById(id: string): Pal | undefined {
  return palsById.get(id);
}

/**
 * Retrieve a Pal by its URL slug (e.g. "anubis", "lamball")
 */
export function getPalBySlug(slug: string): Pal | undefined {
  return palsBySlug.get(slug.toLowerCase().trim());
}

/**
 * Get all available Pals in the dataset
 */
export function getAllPals(): Pal[] {
  return PALWORLD_PALS;
}

/**
 * Search Pals by query string, element, and sorting
 */
export function searchPals(
  query: string,
  options?: {
    element?: string;
    rarity?: number;
    specialOnly?: boolean;
    limit?: number;
  }
): Pal[] {
  const q = query.toLowerCase().trim();
  const elementFilter = options?.element?.toLowerCase().trim();
  const rarityFilter = options?.rarity;
  const specialOnly = options?.specialOnly;
  const limit = options?.limit || 500;

  const results: Array<{ pal: Pal; score: number }> = [];

  for (const pal of PALWORLD_PALS) {
    if (elementFilter && elementFilter !== 'all' && !pal.elements.includes(elementFilter)) {
      continue;
    }
    if (rarityFilter && pal.rarity !== rarityFilter) {
      continue;
    }
    if (specialOnly && !pal.isSpecial) {
      continue;
    }

    if (!q) {
      results.push({ pal, score: 0 });
      continue;
    }

    const name = pal.name.toLowerCase();
    const id = pal.id.toLowerCase();

    // Scoring for sorting relevance
    if (name === q || id === q) {
      results.push({ pal, score: 100 });
    } else if (name.startsWith(q)) {
      results.push({ pal, score: 80 });
    } else if (name.includes(q)) {
      results.push({ pal, score: 50 });
    } else if (id.includes(q)) {
      results.push({ pal, score: 40 });
    } else if (pal.elements.some((e) => e.includes(q))) {
      results.push({ pal, score: 30 });
    }
  }

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.pal.id.localeCompare(b.pal.id, undefined, { numeric: true });
  });

  return results.slice(0, limit).map((r) => r.pal);
}

/**
 * Calculate the offspring of two parents.
 * Returns child Pal, whether it is a special combination, and metadata.
 */
export function calculateChild(
  parent1Id: string,
  parent2Id: string
): {
  child: Pal | null;
  parent1: Pal | null;
  parent2: Pal | null;
  isSpecial: boolean;
  specialCombination?: SpecialCombination;
  calculatedPowerTarget: number;
} | null {
  const p1 = palsById.get(parent1Id);
  const p2 = palsById.get(parent2Id);

  if (!p1 || !p2) {
    return null;
  }

  // Same Pal breeding always yields the same Pal
  if (p1.id === p2.id) {
    return {
      child: p1,
      parent1: p1,
      parent2: p2,
      isSpecial: false,
      calculatedPowerTarget: p1.breedingPower,
    };
  }

  // Check special combo override
  const special = specialComboMap.get(`${p1.id}_${p2.id}`);
  const targetPower = Math.floor((p1.breedingPower + p2.breedingPower + 1) / 2);

  const childId = pairToChildMap.get(`${p1.id}_${p2.id}`);
  const child = childId ? palsById.get(childId) || null : null;

  return {
    child,
    parent1: p1,
    parent2: p2,
    isSpecial: !!special,
    specialCombination: special,
    calculatedPowerTarget: targetPower,
  };
}

/**
 * Find all parent combinations that produce a given child Pal.
 */
export function findParentCombinations(
  childId: string,
  options?: {
    ownedPalIds?: string[];
    uniqueOnly?: boolean;
    searchQuery?: string;
  }
): ParentPairResult[] {
  const pairs = PALWORLD_BREEDING_MAP[childId];
  if (!pairs) return [];

  const ownedSet = new Set(options?.ownedPalIds || []);
  const uniqueOnly = options?.uniqueOnly || false;
  const q = options?.searchQuery?.toLowerCase().trim();

  const results: ParentPairResult[] = [];

  for (const [p1Id, p2Id] of pairs) {
    const parent1 = palsById.get(p1Id);
    const parent2 = palsById.get(p2Id);
    if (!parent1 || !parent2) continue;

    const isSpecial = specialComboMap.has(`${p1Id}_${p2Id}`);
    if (uniqueOnly && !isSpecial) continue;

    if (q) {
      const matchP1 = parent1.name.toLowerCase().includes(q) || parent1.id.includes(q);
      const matchP2 = parent2.name.toLowerCase().includes(q) || parent2.id.includes(q);
      if (!matchP1 && !matchP2) continue;
    }

    const bothOwned = ownedSet.size > 0 && ownedSet.has(p1Id) && ownedSet.has(p2Id);

    results.push({
      parent1,
      parent2,
      isSpecial,
      bothOwned,
    });
  }

  // Sort: both owned first, then special combos, then alphabetical
  results.sort((a, b) => {
    if (a.bothOwned !== b.bothOwned) return a.bothOwned ? -1 : 1;
    if (a.isSpecial !== b.isSpecial) return a.isSpecial ? -1 : 1;
    return a.parent1.name.localeCompare(b.parent1.name);
  });

  return results;
}

/**
 * Graph-based Shortest Breeding Path Finder (BFS)
 * Given a list of owned Pal IDs and a target Pal ID:
 * Finds the minimum generation chain to breed the target.
 */
export function findShortestBreedingPath(
  ownedPalIds: string[],
  targetPalId: string,
  options?: {
    maxDepth?: number;
    lockedPalIds?: string[];
    excludedPalIds?: string[];
  }
): BreedingPathResult {
  const t0 = performance.now();
  const target = palsById.get(targetPalId);

  if (!target) {
    return {
      found: false,
      target: target as any,
      depth: 0,
      chain: [],
      allRequiredPals: [],
      missingPals: [],
      timeMs: 0,
      message: 'Target Pal not found in database.',
    };
  }

  const maxDepth = Math.min(options?.maxDepth || 4, 5);
  const excludedSet = new Set(options?.excludedPalIds || []);
  const lockedSet = new Set(options?.lockedPalIds || []);

  // Filter valid owned pals
  const initialOwned = Array.from(new Set(ownedPalIds))
    .filter((id) => palsById.has(id) && !excludedSet.has(id));

  // If user already owns the target
  if (initialOwned.includes(targetPalId)) {
    return {
      found: true,
      target,
      depth: 0,
      chain: [],
      allRequiredPals: [target],
      missingPals: [],
      timeMs: performance.now() - t0,
      message: 'You already own this target Pal!',
    };
  }

  // If owned list is empty, calculate the easiest 1-step or 2-step route from common Pals
  if (initialOwned.length === 0) {
    const parentPairs = findParentCombinations(targetPalId);
    if (parentPairs.length > 0) {
      const bestPair = parentPairs[0];
      return {
        found: false,
        target,
        depth: 1,
        chain: [
          {
            step: 1,
            parent1: bestPair.parent1,
            parent2: bestPair.parent2,
            child: target,
            isSpecial: bestPair.isSpecial,
          },
        ],
        allRequiredPals: [bestPair.parent1, bestPair.parent2],
        missingPals: [bestPair.parent1, bestPair.parent2],
        timeMs: performance.now() - t0,
        message: 'No owned Pals specified. Displaying a direct 1-step breeding combination.',
      };
    }
  }

  // Check legendary restriction: Jetragon, Frostallion, Paladius, Necromus, Chikipi, etc.
  const parentPairs = PALWORLD_BREEDING_MAP[targetPalId] || [];
  if (parentPairs.length === 1 && parentPairs[0][0] === targetPalId && parentPairs[0][1] === targetPalId) {
    if (!initialOwned.includes(targetPalId)) {
      return {
        found: false,
        target,
        depth: 0,
        chain: [],
        allRequiredPals: [target],
        missingPals: [target],
        timeMs: performance.now() - t0,
        message: `${target.name} is a legendary exclusive species that can only be bred by pairing two ${target.name} parents. It cannot be bred from other species.`,
      };
    }
  }

  // BFS Graph Search
  // state: map of palId -> { p1: string, p2: string, depth: number }
  const palOrigin = new Map<string, { p1: string; p2: string; depth: number } | null>();
  for (const id of initialOwned) {
    palOrigin.set(id, null);
  }

  let currentPool = [...initialOwned];

  for (let depth = 1; depth <= maxDepth; depth++) {
    const newlyAdded: string[] = [];

    // Evaluate all pairs in currentPool
    for (let i = 0; i < currentPool.length; i++) {
      for (let j = i; j < currentPool.length; j++) {
        const p1 = currentPool[i];
        const p2 = currentPool[j];

        if (excludedSet.has(p1) || excludedSet.has(p2)) continue;

        const childId = pairToChildMap.get(`${p1}_${p2}`);
        if (!childId || excludedSet.has(childId)) continue;

        if (!palOrigin.has(childId)) {
          palOrigin.set(childId, { p1, p2, depth });
          newlyAdded.push(childId);

          if (childId === targetPalId) {
            // Target reached! Trace back chain
            const chain: BreedingStep[] = [];
            const visitedInChain = new Set<string>();

            function trace(id: string) {
              const origin = palOrigin.get(id);
              if (!origin) return;
              trace(origin.p1);
              trace(origin.p2);
              const stepKey = `${origin.p1}_${origin.p2}_${id}`;
              if (!visitedInChain.has(stepKey)) {
                visitedInChain.add(stepKey);
                const parent1 = palsById.get(origin.p1)!;
                const parent2 = palsById.get(origin.p2)!;
                const child = palsById.get(id)!;
                const isSpecial = specialComboMap.has(`${origin.p1}_${origin.p2}`);
                chain.push({
                  step: chain.length + 1,
                  parent1,
                  parent2,
                  child,
                  isSpecial,
                });
              }
            }

            trace(targetPalId);

            // Collect all unique pals required
            const requiredSet = new Set<string>();
            for (const step of chain) {
              requiredSet.add(step.parent1.id);
              requiredSet.add(step.parent2.id);
            }
            const allRequiredPals = Array.from(requiredSet)
              .map((id) => palsById.get(id)!)
              .filter(Boolean);

            const missingPals = allRequiredPals.filter((p) => !initialOwned.includes(p.id));

            return {
              found: true,
              target,
              depth: chain.length,
              chain,
              allRequiredPals,
              missingPals,
              timeMs: performance.now() - t0,
            };
          }
        }
      }
    }

    if (newlyAdded.length === 0) break;
    currentPool = [...palOrigin.keys()];
  }

  // Not found within maxDepth: fallback to closest reverse combo
  const targetParentCombinations = findParentCombinations(targetPalId);
  const bestAlternative = targetParentCombinations.length > 0 ? targetParentCombinations[0] : null;

  return {
    found: false,
    target,
    depth: 0,
    chain: bestAlternative
      ? [
          {
            step: 1,
            parent1: bestAlternative.parent1,
            parent2: bestAlternative.parent2,
            child: target,
            isSpecial: bestAlternative.isSpecial,
          },
        ]
      : [],
    allRequiredPals: bestAlternative ? [bestAlternative.parent1, bestAlternative.parent2] : [],
    missingPals: bestAlternative ? [bestAlternative.parent1, bestAlternative.parent2] : [],
    timeMs: performance.now() - t0,
    message: `No breeding route found within ${maxDepth} generations with your currently selected Pals. Try adding more common Pals or increasing depth.`,
  };
}

/**
 * Calculate IV / Talent Inheritance Probabilities
 * Based on datamined Palworld inheritance mechanic weights:
 * - 30% chance to inherit Parent A stat
 * - 30% chance to inherit Parent B stat
 * - 40% chance of random mutation / rolled value (0 to 100)
 */
export function calculateIVInheritance(
  parentA: { hp: number; attack: number; defense: number },
  parentB: { hp: number; attack: number; defense: number },
  targetStatValue = 100
): IVInheritanceResult {
  const clamp = (val: number) => Math.max(0, Math.min(100, Math.round(val)));

  function calculateSingleStat(valA: number, valB: number): StatInheritanceProbability {
    const clampedA = clamp(valA);
    const clampedB = clamp(valB);

    // Probability of hitting targetStatValue (e.g. 100)
    // Parent A gives 30% if A === target
    // Parent B gives 30% if B === target
    // Random roll gives (40% * 1/101) ≈ 0.396%
    const randomChance = 40 / 101; // ~0.396%

    let targetOdds = 0;
    if (clampedA === targetStatValue && clampedB === targetStatValue) {
      targetOdds = 30 + 30 + randomChance; // 60.396%
    } else if (clampedA === targetStatValue || clampedB === targetStatValue) {
      targetOdds = 30 + randomChance; // 30.396%
    } else {
      targetOdds = randomChance; // 0.396%
    }

    return {
      parentAValue: clampedA,
      parentBValue: clampedB,
      parentAOdds: 30,
      parentBOdds: 30,
      mutationOdds: 40,
      targetValue: targetStatValue,
      targetOdds: Number(targetOdds.toFixed(2)),
    };
  }

  const hp = calculateSingleStat(parentA.hp, parentB.hp);
  const attack = calculateSingleStat(parentA.attack, parentB.attack);
  const defense = calculateSingleStat(parentA.defense, parentB.defense);

  // Independent probabilities for each stat
  const perfectTripleOdds = Number(
    ((hp.targetOdds / 100) * (attack.targetOdds / 100) * (defense.targetOdds / 100) * 100).toFixed(3)
  );

  let summary = '';
  if (perfectTripleOdds >= 20) {
    summary = 'Outstanding breeding pair! Over 20% chance to hatch a perfect 100/100/100 IV Pal.';
  } else if (perfectTripleOdds >= 5) {
    summary = 'Strong breeding pair. Average 1 in 15 to 1 in 20 eggs will achieve maximum stats.';
  } else {
    summary = 'Standard breeding pair. Pass down high IV stats from each parent to increase triple-max odds.';
  }

  return {
    hp,
    attack,
    defense,
    perfectTripleOdds,
    summary,
  };
}

/**
 * Get all verified special combinations in the dataset
 */
export function getSpecialCombinations(): SpecialCombination[] {
  return PALWORLD_SPECIAL_COMBINATIONS;
}
