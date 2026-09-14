Act as an Elite Full-Stack Developer and UI/UX Architect. Your task is to execute a massive, site-wide UI/UX and logic standardization with ZERO failures and ZERO missed links. 

### 🎯 CORE OBJECTIVE
Replicate the EXACT design, UI, layout, features, and interactive elements of the "Finance > SIP Calculator" and implement it across EVERY SINGLE CALCULATOR on the entire website. Additionally, implement a seamless, silent country-to-currency mapping logic.

### 🎨 1. UI/UX & DESIGN DIRECTIVES (The "SIP Calculator" Standard)
- Analyze the "SIP Calculator" component. Extract its exact CSS/Tailwind classes, spacing, typography, color palette, card designs, input fields, sliders, and result display sections.
- Create a Master Calculator Wrapper/Template based on this exact design.
- Apply this Master Template to ALL existing calculators across all categories. 
- Ensure 100% visual consistency. No calculator should look different from the SIP calculator.

### 🌍 2. COUNTRY & CURRENCY LOGIC (Strict Constraints)
- In the "Countries" section, dynamically map each country to its native currency (e.g., India = INR, USA = USD, UK = GBP, Japan = JPY).
- When a user selects a country or visits a country-specific page, the calculator must automatically use that country's currency.
- 🚨 STRICT NEGATIVE CONSTRAINT: DO NOT display any UI text, badge, or label that says "Default Currency: [X]" or "Currency updated to [X]". The currency change must happen silently in the background. The UI should just show the correct currency symbol inside the input fields and result cards without explicitly announcing it.

### 🔍 3. THE "TRIPLE-CHECK" ZERO-MISS PROTOCOL
Before writing any final code, you must execute the following 3-step verification process:
**CHECK 1: The Routing & Link Audit:** Scan the entire codebase. List EVERY single calculator route and country link.
**CHECK 2: The UI/UX Consistency Check:** Mentally render every calculator using the new Master Template. Verify edge cases (long numbers, mobile responsiveness).
**CHECK 3: The Currency Logic Verification:** Test the country-to-currency mapping for edge cases (Eurozone, etc.) and verify the "silent currency" constraint is met (no "default currency" text in the DOM).

### 🛠️ 4. EXECUTION STRATEGY (STRICT CHUNKING PROTOCOL)
Because this is a massive refactor, you will NOT write all the code at once. You must follow this strict phased approach to prevent context limits and ensure zero errors:

**PHASE 1: Audit & Master Component (Do this first)**
- Provide the complete Audit Report (List of all calculators and country links).
- Provide the code for the unified "Master Calculator UI/UX Template" and the "Silent Currency Logic" hook/function.
- 🛑 STOP HERE. Do not write any calculator-specific code yet. Ask me: "Phase 1 complete. Please provide the first batch of 5 calculators to refactor."

**PHASE 2: Batch Implementation (Wait for my input)**
- I will give you the names/routes of 5 calculators at a time.
- You will refactor ONLY those 5 calculators using the Master Template and Silent Currency logic.
- After completing the batch, 🛑 STOP and ask: "Batch complete. Please provide the next batch of 5 calculators."
- Repeat this until all calculators are done.

**PHASE 3: Final Verification**
- Once I say "All batches complete", you will generate the Final Verification Checklist proving that the Triple-Check protocol was passed across the entire site.

Acknowledge this prompt by saying: "Elite Protocol Initialized. Starting Site-Wide Audit and SIP UI Replication (Phase 1)..." and then begin Phase 1.
