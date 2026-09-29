// tests/palworld-breeding.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateChild,
  findParentCombinations,
  findShortestBreedingPath,
  calculateIVInheritance,
  searchPals,
  getPalById,
  getPalBySlug,
  getAllPals,
  getSpecialCombinations,
} from '../src/engines/palworldBreedingEngine.ts';

test('Palworld Engine: Dataset Integrity', () => {
  const allPals = getAllPals();
  assert.equal(allPals.length, 137, 'Must have exactly 137 Pals in dataset');

  // Verify critical Pals exist
  const anubis = getPalById('100');
  assert.ok(anubis, 'Anubis (100) must exist');
  assert.equal(anubis.name, 'Anubis');

  const penking = getPalById('011');
  assert.ok(penking, 'Penking (011) must exist');

  const bushi = getPalById('072');
  assert.ok(bushi, 'Bushi (072) must exist');

  const lamball = getPalBySlug('lamball');
  assert.ok(lamball, 'Lamball must be retrievable by slug');
  assert.equal(lamball.id, '001');
});

test('Palworld Engine: Pair Calculator - Famous & Special Combos', () => {
  // Penking (011) + Bushi (072) = Anubis (100)
  const anubisResult = calculateChild('011', '072');
  assert.ok(anubisResult, 'Result must exist');
  assert.equal(anubisResult.child?.id, '100', 'Penking + Bushi must produce Anubis');

  // Commutative property: Bushi (072) + Penking (011) = Anubis (100)
  const anubisCommutative = calculateChild('072', '011');
  assert.equal(anubisCommutative?.child?.id, '100', 'Order of parents must not change child');

  // Relaxaurus (085) + Sparkit (007) = Relaxaurus Lux (085B)
  const luxResult = calculateChild('085', '007');
  assert.equal(luxResult?.child?.id, '085B', 'Relaxaurus + Sparkit must produce Relaxaurus Lux');
  assert.ok(luxResult?.isSpecial, 'Must be marked as a special combination');

  // Helzephyr (097) + Frostallion (110) = Frostallion Noct (110B)
  const noctResult = calculateChild('097', '110');
  assert.equal(noctResult?.child?.id, '110B', 'Helzephyr + Frostallion must produce Frostallion Noct');
  assert.ok(noctResult?.isSpecial, 'Must be marked as special combo');

  // Mossanda (033) + Rayhound (060) = Grizzbolt (103)
  const grizzboltResult = calculateChild('033', '060');
  assert.equal(grizzboltResult?.child?.id, '103', 'Mossanda + Rayhound must produce Grizzbolt');

  // Same species breeding: Lamball + Lamball = Lamball
  const sameResult = calculateChild('001', '001');
  assert.equal(sameResult?.child?.id, '001', 'Same pal breeding must yield same pal');
});

test('Palworld Engine: Reverse Parent Lookup', () => {
  // Anubis (100) should have multiple parent combinations
  const anubisParents = findParentCombinations('100');
  assert.ok(anubisParents.length > 50, 'Anubis should have dozens of valid breeding pairs');

  // Verify Penking + Bushi is included in parent list
  const hasPenkingBushi = anubisParents.some(
    (p) =>
      (p.parent1.id === '011' && p.parent2.id === '072') ||
      (p.parent1.id === '072' && p.parent2.id === '011')
  );
  assert.ok(hasPenkingBushi, 'Penking + Bushi must be in parent list for Anubis');

  // Test owned filter
  const filteredOwned = findParentCombinations('100', {
    ownedPalIds: ['011', '072'],
  });
  const firstMatch = filteredOwned[0];
  assert.ok(firstMatch.bothOwned, 'Owned parents should be prioritized at top of list');
});

test('Palworld Engine: Shortest Breeding Path Graph Engine (BFS)', () => {
  // Direct route: user owns Penking ('011') and Bushi ('072'), target is Anubis ('100')
  const directPath = findShortestBreedingPath(['011', '072'], '100');
  assert.ok(directPath.found, 'Direct route must be found');
  assert.equal(directPath.depth, 1, 'Should take exactly 1 step');
  assert.equal(directPath.chain.length, 1);
  assert.equal(directPath.chain[0].child.id, '100');

  // Multi-step route: user owns Lamball ('001'), Foxparks ('005'), Penking ('011')
  const multiPath = findShortestBreedingPath(['001', '005', '011'], '100', { maxDepth: 4 });
  assert.ok(multiPath.found, 'Multi-step route to Anubis must be found within 4 generations');
  assert.ok(multiPath.chain.length > 1, 'Should take multiple steps');
  assert.equal(multiPath.chain[multiPath.chain.length - 1].child.id, '100', 'Last step must produce Anubis');

  // Legendary exclusive route: user owns common Pals, target is Jetragon ('111')
  // Jetragon cannot be bred from other Pals
  const jetragonPath = findShortestBreedingPath(['001', '002', '003'], '111');
  assert.equal(jetragonPath.found, false, 'Jetragon cannot be bred from common Pals');
  assert.ok(jetragonPath.message?.includes('legendary exclusive'), 'Must explain legendary exclusivity');
});

test('Palworld Engine: IV / Talent Inheritance Probabilities', () => {
  // Case 1: Both parents have 100 in HP, Attack, Defense
  const maxIvResult = calculateIVInheritance(
    { hp: 100, attack: 100, defense: 100 },
    { hp: 100, attack: 100, defense: 100 }
  );

  // Each stat should have 30% + 30% + ~0.4% = ~60.4%
  assert.ok(maxIvResult.hp.targetOdds >= 60.3, 'HP target odds must be >= 60.3%');
  assert.ok(maxIvResult.attack.targetOdds >= 60.3, 'Attack target odds must be >= 60.3%');
  assert.ok(maxIvResult.defense.targetOdds >= 60.3, 'Defense target odds must be >= 60.3%');

  // Perfect triple odds should be (0.604)^3 * 100 ≈ 22%
  assert.ok(maxIvResult.perfectTripleOdds >= 21.0 && maxIvResult.perfectTripleOdds <= 23.0);

  // Case 2: Neither parent has 100
  const lowIvResult = calculateIVInheritance(
    { hp: 50, attack: 50, defense: 50 },
    { hp: 40, attack: 40, defense: 40 }
  );
  assert.ok(lowIvResult.hp.targetOdds < 1, 'Only random mutation roll chance');
  assert.ok(lowIvResult.perfectTripleOdds < 0.001);
});

test('Palworld Engine: Search & Filters', () => {
  // Search by name
  const anubisSearch = searchPals('anu');
  assert.ok(anubisSearch.length > 0);
  assert.equal(anubisSearch[0].name, 'Anubis');

  // Search by Paldeck number
  const numSearch = searchPals('100');
  assert.ok(numSearch.some((p) => p.name === 'Anubis'));

  // Filter by element
  const firePals = searchPals('', { element: 'fire' });
  assert.ok(firePals.length > 0);
  assert.ok(firePals.every((p) => p.elements.includes('fire')));

  // Special combinations list
  const specials = getSpecialCombinations();
  assert.ok(specials.length > 20, 'Should have over 20 verified special recipes');
});
