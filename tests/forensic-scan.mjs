// tests/forensic-scan.mjs
import fs from 'node:fs';

const html = fs.readFileSync('dist/client/calculadora-edad/es/index.html', 'utf8');

// Strip script, style, comments, and head metadata
let body = html;
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  body = bodyMatch[1];
}

// Remove scripts and styles
body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
body = body.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
body = body.replace(/<!--[\s\S]*?-->/g, '');

// Extract all visible text outside tags and attribute values that could be user-facing (like placeholder, title, aria-label)
const tagRegex = /<([a-z0-9-]+)([^>]*)>/gi;
const userFacingStrings = [];

// 1. Text content between tags
let textContent = body.replace(/&copy;/gi, '©').replace(/<[^>]+>/g, ' ');
textContent.split(/\s+/).filter(Boolean);

// 2. Attributes
let match;
while ((match = tagRegex.exec(body)) !== null) {
  const attrs = match[2];
  const attrMatches = attrs.matchAll(/(placeholder|title|aria-label|aria-description|alt)="([^"]*)"/gi);
  for (const am of attrMatches) {
    userFacingStrings.push(am[2]);
  }
}

console.log('Total extracted attribute strings:', userFacingStrings.length);

const bannedWords = [
  'years', 'months', 'days', 'hours', 'minutes', 'seconds',
  'birth', 'birthday', 'heartbeats', 'breaths', 'calculate',
  'share', 'copy', 'download', 'print', 'reset', 'now', 'today',
  'calendar', 'picker', 'compare', 'target', 'result', 'chronological'
];

let issues = 0;
// Check textContent
for (const word of bannedWords) {
  const regex = new RegExp(`(?<![a-záéíóúñ])${word}(?![a-záéíóúñ])`, 'iu');
  if (regex.test(textContent)) {
    const allMatches = [...textContent.matchAll(new RegExp(`(?<![a-záéíóúñ])${word}(?![a-záéíóúñ])`, 'giu'))];
    for (const m of allMatches) {
      const start = Math.max(0, m.index - 30);
      const end = Math.min(textContent.length, m.index + 30);
      console.log(`[Text Node] Potential English word "${word}": ...${textContent.substring(start, end).trim()}...`);
      issues++;
    }
  }
}

// Check attributes
for (const str of userFacingStrings) {
  for (const word of bannedWords) {
    const regex = new RegExp(`(?<![a-záéíóúñ])${word}(?![a-záéíóúñ])`, 'iu');
    if (regex.test(str)) {
      console.log(`[Attribute] Potential English word "${word}" in: "${str}"`);
      issues++;
    }
  }
}

if (issues === 0) {
  console.log('SUCCESS: Zero English user-facing text found in rendered DOM and attributes!');
} else {
  console.log(`FAIL: Found ${issues} potential English strings.`);
}
