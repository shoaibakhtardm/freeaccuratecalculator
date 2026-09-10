// scripts/generate-guide.mjs
import fs from 'node:fs';
import path from 'node:path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.warn('⚠️ No GEMINI_API_KEY provided in environment. Set GEMINI_API_KEY to execute generation.');
}

const targetTopic = process.argv[2] || 'How to Calculate EMI for Home Loan in India 2026';
const targetSlug = process.argv[3] || 'how-to-calculate-home-loan-emi-2026';
const targetCalcHref = process.argv[4] || '/finance/emi-calculator/';

const systemPrompt = `You are a Principal Financial Analyst and Technical SEO Editor.
Write a comprehensive, publication-ready markdown article for our Astro site.
Strict requirements:
1. Frontmatter YAML must strictly conform to:
---
title: "${targetTopic}"
seoTitle: "${targetTopic} — Exact Formulas & Amortization"
h1: "${targetTopic}"
description: "Master the exact math behind home loan EMIs. Step-by-step formula breakdown, tax savings under Section 24b/80C, and prepayment strategies."
targetKeyword: "home loan emi calculation formula"
pubDate: 2026-03-10
category: "finance"
tags: ["home-loan", "emi", "mortgage", "tax-planning"]
lang: "en"
targetCalculator:
  name: "EMI Calculator"
  href: "${targetCalcHref}"
  badge: "Interactive Engine"
  description: "Simulate monthly installments, interest rates, and loan tenures instantly."
relatedCalculators:
  - "compound-interest-calculator"
  - "sip-calculator"
faqs:
  - question: "What is the standard formula used by banks for EMI?"
    answer: "Banks use the Reducing Balance method: EMI = P × r × (1 + r)^n ÷ [(1 + r)^n - 1]."
  - question: "How does prepaying 1 extra EMI per year affect the loan tenure?"
    answer: "Paying just 1 extra monthly installment each year on a 20-year loan typically shortens the loan term by 3 to 4 years and saves up to 20% in interest."
---
2. Use H2 and H3 markdown headings with zero fluff.
3. Include an exact worked mathematical example with numbers.
4. Naturally reference and link back to "${targetCalcHref}".
5. Output ONLY valid markdown. Do not wrap in extra backtick fences.`;

async function run() {
  if (!GEMINI_API_KEY) {
    console.log('Skipping API call because GEMINI_API_KEY is not set.');
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: systemPrompt }] }],
    }),
  });

  const data = await res.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    console.error('Failed to generate content:', JSON.stringify(data));
    return;
  }

  const cleanMd = rawText.replace(/^```markdown\n/, '').replace(/\n```$/, '');
  const outPath = path.resolve(`src/content/guides/${targetSlug}.md`);
  fs.writeFileSync(outPath, cleanMd, 'utf-8');
  console.log(`✅ Guide successfully created at ${outPath}`);
}

run();
