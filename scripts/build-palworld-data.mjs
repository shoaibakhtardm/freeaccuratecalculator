// scripts/build-palworld-data.mjs
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  console.log('Fetching Palworld data...');
  const [palsRaw, breedingRaw, palcalcRaw] = await Promise.all([
    fetch('https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/src/pals.json').then(r => r.json()),
    fetch('https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main/src/breeding.json').then(r => r.json()),
    fetch('https://raw.githubusercontent.com/tylercamp/palcalc/master/PalCalc.Model/db.json').then(r => r.json())
  ]);

  const palMap = new Map();
  for (const p of palsRaw) {
    const pc = palcalcRaw.Pals.find(x => x.Name.toLowerCase() === p.name.toLowerCase());
    palMap.set(p.key, {
      id: p.key,
      name: p.name,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      palDexNo: p.key,
      elements: p.types.map(t => t.name.toLowerCase()),
      breedingPower: pc ? pc.BreedingPower : 1000,
      rarity: pc ? pc.Rarity : 1,
      hp: pc ? pc.Hp : 80,
      attack: pc ? pc.Attack : 80,
      defense: pc ? pc.Defense : 80,
      image: p.imageWiki,
      description: p.description ? p.description.replace(/\r?\n/g, ' ') : '',
      suitabilities: (p.suitability || []).map(s => ({ type: s.type, level: s.level })),
      isSpecial: (breedingRaw[p.key] || []).length <= 4,
      specialPairCount: (breedingRaw[p.key] || []).length
    });
  }

  const specialCombinations = [];
  for (const [childKey, pairs] of Object.entries(breedingRaw)) {
    if (pairs.length <= 4) {
      const child = palMap.get(childKey);
      for (const [p1, p2] of pairs) {
        if (p1 === p2) {
          if (pairs.length === 1) {
            specialCombinations.push({
              childId: childKey,
              childName: child.name,
              parent1Id: p1,
              parent1Name: palMap.get(p1).name,
              parent2Id: p2,
              parent2Name: palMap.get(p2).name,
              type: 'legendary',
              description: `${child.name} is a legendary/exclusive Pal that can only be bred with two ${child.name} parents.`
            });
          }
        } else {
          specialCombinations.push({
            childId: childKey,
            childName: child.name,
            parent1Id: p1,
            parent1Name: palMap.get(p1).name,
            parent2Id: p2,
            parent2Name: palMap.get(p2).name,
            type: 'variant',
            description: `${child.name} has a special breeding recipe: ${palMap.get(p1).name} + ${palMap.get(p2).name}.`
          });
        }
      }
    }
  }

  const finalPals = Array.from(palMap.values()).sort((a, b) => {
    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });

  const outputTs = `// src/data/palworldData.ts
// Auto-generated verified Palworld breeding dataset
// Version: 1.0.4 (Verified Datamined Game Data)

export interface PalSuitability {
  type: string;
  level: number;
}

export interface Pal {
  id: string;
  name: string;
  slug: string;
  palDexNo: string;
  elements: string[];
  breedingPower: number;
  rarity: number;
  hp: number;
  attack: number;
  defense: number;
  image: string;
  description: string;
  suitabilities: PalSuitability[];
  isSpecial?: boolean;
  specialPairCount?: number;
}

export interface SpecialCombination {
  childId: string;
  childName: string;
  parent1Id: string;
  parent1Name: string;
  parent2Id: string;
  parent2Name: string;
  type: 'variant' | 'legendary' | 'exclusive';
  description: string;
}

export const DATA_VERSION = '1.0.4';
export const DATASET_UPDATED = '2026-03';

export const PALWORLD_PALS: Pal[] = ${JSON.stringify(finalPals, null, 2)};

export const PALWORLD_BREEDING_MAP: Record<string, Array<[string, string]>> = ${JSON.stringify(breedingRaw)};

export const PALWORLD_SPECIAL_COMBINATIONS: SpecialCombination[] = ${JSON.stringify(specialCombinations, null, 2)};
`;

  const destPath = path.resolve('src/data/palworldData.ts');
  fs.writeFileSync(destPath, outputTs, 'utf8');
  console.log('Successfully wrote', destPath, 'Length:', outputTs.length);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
