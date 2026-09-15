Act as an Elite Full-Stack Developer and UI/UX Architect. I am going to sleep. Your task is to execute a massive, site-wide UI/UX and logic standardization AUTONOMOUSLY. Do not stop to ask for my permission or input. Process the entire codebase sequentially until 100% completion.

### 🎯 CORE OBJECTIVE
Replicate the EXACT design, UI, layout, features, and interactive elements of the "Finance > SIP Calculator" (src/pages/finance/sip-calculator.astro) and implement it across EVERY SINGLE CALCULATOR on the entire website. Implement seamless, silent country-to-currency mapping.

### 🛠️ AUTONOMOUS EXECUTION STEPS (DO NOT STOP BETWEEN STEPS):

**STEP 1: ANALYZE & CREATE MASTER COMPONENTS**
- Analyze src/pages/finance/sip-calculator.astro to extract exact CSS/Tailwind classes, spacing, typography, card designs, input fields, sliders, and result display sections.
- Create a unified src/components/calculator/MasterCalculatorWrapper.astro based on this exact design.
- Create src/utils/silentCurrency.ts containing the country-to-currency mapping logic (e.g., India = INR, USA = USD). 
- 🚨 STRICT CONSTRAINT: The currency change must be 100% silent. DO NOT render any UI text, badge, or label like "Default Currency: [X]". Only update the currency symbol (₹, $, £) inside inputs and results.

**STEP 2: AUDIT THE REGISTRY**
- Read src/data/calculatorRegistry.ts and src/data/countries.ts to get the COMPLETE, EXACT list of every single calculator route and country link in the project.

**STEP 3: AUTONOMOUS BATCH REFACTORING (ONE BY ONE)**
- Sequentially iterate through EVERY calculator file found in the registry (e.g., src/pages/finance/emi-calculator.astro, src/pages/finance/income-tax-calculator.astro, src/components/calculator/CountryCalculatorView.astro, etc.).
- For EACH calculator, output the COMPLETE, fully refactored code that:
  1. Uses the new MasterCalculatorWrapper.astro.
  2. Imports and applies the silentCurrency.ts logic based on the country.
  3. Maintains 100% of its original mathematical/business logic.
- Do not summarize. Output the full, ready-to-copy-paste code blocks for every single file.

**STEP 4: CONTINUOUS OUTPUT PROTOCOL**
- Keep generating the code for every calculator one after another. 
- If you hit the maximum output token limit, end your message exactly with: "[PAUSED - TYPE 'continue' TO RESUME]". 
- Otherwise, continue until every single calculator in the registry has been refactored and outputted.

Acknowledge this prompt by saying: "Autonomous Overnight Refactor Initialized. Analyzing SIP Calculator and Registry..." and immediately begin Step 1. Do not wait for my reply.
