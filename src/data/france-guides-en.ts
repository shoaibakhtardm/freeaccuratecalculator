// src/data/france-guides-en.ts
import type { FranceGuide } from './france-guides';

export const FRANCE_GUIDES_EN: FranceGuide[] = [
  // Guide 1: Income Tax Brackets
  {
    id: 'bareme-impot-revenu-2026',
    slug: 'bareme-impot-revenu-2026',
    category: 'impot-revenu',
    categorySlug: 'impot-revenu',
    categoryLabel: 'Income Tax',
    badge: 'Official 2026 Slabs',
    readTime: '10 min read',
    icon: '📑',
    title: 'French Income Tax 2026: Complete Guide – Tax Slabs, Calculation & Legal Optimization',
    metaTitle: 'French Income Tax 2026: Complete Guide – Tax Slabs & Calculation',
    metaDescription: 'Complete 2026 guide to French income tax: statutory 5-bracket progressive scale (DGFIP), family quotient (parts fiscales), calculation examples, and legal tax deductions.',
    targetKeyword: 'french income tax 2026 brackets calculation optimization',
    h1: 'French Income Tax 2026: Complete Guide – Tax Slabs, Calculation & Optimization',
    summary: 'Comprehensive guide to French personal income tax in 2026: official 5 progressive brackets, family quotient mechanism (quotient familial), withholding tax (prélèvement à la source), tax credits, and optimization strategies.',
    keywords: 'french income tax 2026, french tax brackets 2026, calculate income tax france, dgfip tax brackets, withholding tax france, parts fiscales, french tax optimization',
    calculator: {
      label: 'French Income Tax Calculator',
      href: '/countries/france/en/finance/income-tax-calculator/',
      badge: 'Official Simulator',
    },
    relatedGuideSlugs: ['frais-reels-vs-abattement-10', 'bareme-kilometrique-dgfip-2026', 'conversion-salaire-brut-en-net-france'],
    sections: [
      {
        heading: '1. Understanding French Income Tax & Progressive Brackets for 2026',
        content: `Personal income tax in France (Impôt sur le Revenu - IR) is a progressive direct tax levied on the annual net taxable income of tax households. In 2026, the French General Directorate of Public Finances (DGFIP) applies a progressive scale divided into five tax brackets ranging from 0% to 45%.
        <div class="overflow-x-auto my-4">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Tax Bracket (per fiscal unit)</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Fraction of Net Taxable Income</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Marginal Tax Rate (TMI)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">Bracket 1</td><td class="p-3">Up to €11,600</td><td class="p-3 font-semibold text-emerald-600 dark:text-emerald-400">0% (Tax-exempt)</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">Bracket 2</td><td class="p-3">From €11,601 to €29,579</td><td class="p-3 font-semibold text-sky-600 dark:text-sky-400">11%</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">Bracket 3</td><td class="p-3">From €29,580 to €84,577</td><td class="p-3 font-semibold text-indigo-600 dark:text-indigo-400">30%</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">Bracket 4</td><td class="p-3">From €84,578 to €181,917</td><td class="p-3 font-semibold text-amber-600 dark:text-amber-400">41%</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">Bracket 5</td><td class="p-3">Above €181,917</td><td class="p-3 font-semibold text-rose-600 dark:text-rose-400">45%</td></tr>
            </tbody>
          </table>
        </div>
        It is essential to distinguish between your Marginal Tax Rate (Taux Marginal d'Imposition - TMI), which is the tax percentage applied to the highest euro of your income, and your Average Tax Rate (Taux Moyen), which represents the total tax paid divided by total taxable income.`,
      },
      {
        heading: '2. The Family Quotient Mechanism (Quotient Familial)',
        content: `The French tax system does not tax individuals in isolation; it taxes the entire household (foyer fiscal) through the unique Family Quotient system. Total household net income is divided by the number of tax parts (parts fiscales):
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Single, divorced, or widowed without dependents:</strong> 1 part</li>
          <li><strong>Married couple or PACS partners:</strong> 2 parts</li>
          <li><strong>First and second dependent child:</strong> +0.5 part each</li>
          <li><strong>Third and each subsequent child:</strong> +1.0 part each</li>
        </ul>
        <strong>Calculation Method:</strong><br/>
        1. Calculate Net Taxable Income (RNI).<br/>
        2. Divide RNI by total parts (N) to obtain income per part: <code>Q = RNI / N</code>.<br/>
        3. Apply the 5-bracket progressive tax scale to Q.<br/>
        4. Multiply the resulting tax by the total number of parts (N).<br/>
        Note that the tax savings resulting from each half-part for dependents are capped by law at €1,759 per half-part in 2026.`,
      },
      {
        heading: '3. Step-by-Step Worked Calculation Example',
        content: `Consider a married couple in France with two dependent children (total of 3 fiscal parts) earning a combined net taxable salary of €72,000 in 2026:
        <ul class="list-disc pl-5 space-y-1 my-3 text-slate-300">
          <li>Standard 10% professional expense deduction applies: €72,000 - €7,200 = €64,800 net taxable base.</li>
          <li>Income per fiscal part: <code>€64,800 / 3 parts = €21,600</code>.</li>
          <li>Bracket 1 (up to €11,600): €0.</li>
          <li>Bracket 2 (€11,601 to €21,600): (€21,600 - €11,600) × 11% = €10,000 × 11% = €1,100.</li>
          <li>Gross tax per part = €1,100.</li>
          <li>Total gross tax for household = €1,100 × 3 parts = <strong>€3,300</strong>.</li>
          <li>Effective average tax rate: €3,300 / €72,000 = <strong>4.58%</strong>, with a Marginal Tax Rate (TMI) of 11%.</li>
        </ul>`,
      },
      {
        heading: '4. The Tax Smoothing Mechanism (La Décote)',
        content: `To prevent low-income households from experiencing steep tax cliff effects when crossing into taxable territory, the French tax code applies an automatic smoothing discount called <em>la décote</em>.
        In 2026, single filers whose gross tax is below €1,929 and joint filers whose gross tax is below €3,191 qualify for this reduction. The décote formula subtracts a percentage of the difference between the ceiling and gross tax, substantially reducing or eliminating tax liability for modest incomes.`,
      },
      {
        heading: '5. Withholding Tax at Source (Prélèvement à la Source - PAS)',
        content: `Since 2019, income tax in France is collected directly at source by employers, pension funds, or through monthly DGFIP bank debits. 
        Taxpayers can choose between three withholding rate options:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Personalized Rate (Taux Personnalisé):</strong> Default rate calculated on the entire household tax return.</li>
          <li><strong>Individualized Rate (Taux Individualisé):</strong> Tailored for couples with significant income disparity, assigning a lower rate to the lower-earning partner without changing total tax liability.</li>
          <li><strong>Neutral Rate (Taux Neutre):</strong> Grid-based rate preserving confidentiality from the employer regarding external income sources.</li>
        </ul>`,
      },
      {
        heading: '6. Tax Reductions, Deductions & Credits',
        content: `French tax law distinguishes between deductions (which reduce taxable income), reductions (which reduce tax liability down to €0), and refundable tax credits (which result in a cash refund if tax is zero):
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Home Childcare and Domestic Employment:</strong> 50% tax credit on qualifying expenses up to €12,000/year (plus €1,500 per child).</li>
          <li><strong>Charitable Donations:</strong> 66% tax reduction for recognized public-interest charities, and 75% for basic-needs organizations (Coluche law).</li>
          <li><strong>Retirement Savings Plans (PER):</strong> Voluntary contributions to a Plan d'Épargne Retraite are fully deductible from net taxable income up to statutory ceilings.</li>
        </ul>`,
      },
      {
        heading: '7. Statutory Overall Tax Shelter Cap (Plafonnement des Niches Fiscales)',
        content: `In France, the cumulative annual tax savings achievable through tax breaks (niches fiscales) is strictly capped at <strong>€10,000 per household</strong> (or €18,000 for specific investments such as overseas DOM-TOM investments and SOFICA film financing). Contributions to retirement savings (PER) and historical monument restoration investments operate outside this ceiling.`,
      },
    ],
    faqs: [
      {
        question: 'What are the 2026 French income tax brackets?',
        answer: 'The 2026 progressive brackets are: 0% up to €11,600; 11% from €11,601 to €29,579; 30% from €29,580 to €84,577; 41% from €84,578 to €181,917; and 45% on income exceeding €181,917.',
      },
      {
        question: 'What is the difference between Marginal Tax Rate (TMI) and Average Tax Rate?',
        answer: 'The TMI is the tax rate applied to your highest euro of income, which dictates how much tax you pay on any pay rise. The Average Tax Rate is the actual percentage of total tax paid relative to your total gross taxable income.',
      },
      {
        question: 'How do children affect French income tax liability?',
        answer: 'Each child adds fiscal parts (0.5 part for the 1st and 2nd child, 1.0 part for the 3rd and subsequent). This reduces income per part, dropping the family into lower tax brackets. The tax saving is capped at €1,759 per half-part in 2026.',
      },
      {
        question: 'When is the 2026 French annual tax return filed?',
        answer: 'Income earned in 2025 is declared in April-June 2026 via the impots.gouv.fr portal. Any adjustment between withholding tax already paid and final tax calculated is settled in August-September 2026.',
      },
    ],
  },

  // Guide 2: Actual Expenses vs 10% Flat Allowance
  {
    id: 'frais-reels-vs-abattement-10',
    slug: 'frais-reels-vs-abattement-10',
    category: 'frais-reels',
    categorySlug: 'frais-reels',
    categoryLabel: 'Actual Expenses & Deductions',
    badge: 'Article 83 CGI',
    readTime: '8 min read',
    icon: '🧾',
    title: 'Actual Expenses vs 10% Flat Deduction 2026: French Tax Optimization Guide',
    metaTitle: 'Actual Expenses vs 10% Flat Allowance 2026: Complete French Guide',
    metaDescription: 'Optimize your 2026 French tax return: compare the automatic 10% standard deduction against deducting actual business expenses (frais réels) under Article 83 CGI.',
    targetKeyword: 'frais reels vs 10 percent deduction france 2026',
    h1: 'Actual Expenses vs 10% Flat Deduction 2026: Complete French Guide',
    summary: 'Strategic analysis comparing the automatic 10% professional expense deduction against itemized actual business expenses (frais réels) under Article 83 of the French General Tax Code for 2026 tax returns.',
    keywords: 'frais reels 2026, 10 percent allowance france, itemized deductions french tax, commute deduction france, meal expense deduction dgfip',
    calculator: {
      label: 'Actual Expenses vs 10% Simulator',
      href: '/countries/france/frais-reels-abattement/',
      badge: 'Tax Arbitrage Tool',
    },
    relatedGuideSlugs: ['bareme-impot-revenu-2026', 'bareme-kilometrique-dgfip-2026'],
    sections: [
      {
        heading: '1. The Default 10% Standard Allowance (Abattement Forfaitaire)',
        content: `By default, the French tax administration applies an automatic 10% flat allowance to gross employment income to cover professional expenses (commuting, meals, job tools).
        In 2026, this deduction is subject to strict statutory boundaries:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Minimum allowance:</strong> €495 per employed member of the household.</li>
          <li><strong>Maximum cap:</strong> €14,171 per employed person (reached at €141,710 of gross annual salary).</li>
        </ul>
        No receipts or justifications are required when opting for the standard 10% deduction.`,
      },
      {
        heading: '2. When Is Itemizing Actual Expenses (Frais Réels) Advantageous?',
        content: `Itemizing actual business expenses is beneficial whenever your verified annual job-related costs exceed 10% of your gross taxable remuneration.
        Common profiles benefiting from actual expenses:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li>Employees commuting more than 30 km to 40 km each way by car or motorcycle daily.</li>
          <li>Employees without subsidized workplace canteen facilities who incur external lunch costs.</li>
          <li>Professionals incurring significant home office or teleworking expenses not reimbursed by the employer.</li>
          <li>Workers pursuing job-related continuous education, exams, or specialized professional attire at personal expense.</li>
        </ul>`,
      },
      {
        heading: '3. Deductible Expense Categories Under French Law',
        content: `Under Article 83-3 of the French General Tax Code, eligible expenses must be strictly necessary for your profession, incurred during the tax year, and supported by receipts:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Commuting Expenses (Frais de Déplacement):</strong> Based on the official DGFIP mileage scale up to 40 km each way (unless professional/personal circumstances justify a longer distance).</li>
          <li><strong>Meal Expenses (Frais de Repas):</strong> The deductible amount is the difference between actual meal cost (capped at €20.70) and the statutory value of a home meal (€5.35 in 2026). If the employer provides restaurant vouchers (titres-restaurant), the employer contribution must be subtracted.</li>
          <li><strong>Teleworking Expenses:</strong> Flat allowance of €2.70 per remote workday (up to €59.40/month or €712.80/year) without receipts, or actual substantiated home office costs.</li>
          <li><strong>Documentation & Equipment:</strong> Technical books, computer hardware (amortized over 3 years if exceeding €500 excl. tax).</li>
        </ul>`,
      },
      {
        heading: '4. Worked Decision Example',
        content: `An executive in France earns €45,000 gross taxable salary and commutes 35 km each way (70 km daily) in a 5 CV car for 210 working days/year (14,700 km annually):
        <ul class="list-disc pl-5 space-y-1 my-3 text-slate-300">
          <li><strong>Option A (10% standard):</strong> €45,000 × 10% = <strong>€4,500 deduction</strong>.</li>
          <li><strong>Option B (Frais Réels):</strong> Mileage allowance for 14,700 km at 5 CV = (14,700 × 0.364) + 1,480 = €6,831. Plus meal expenses for 210 days @ €4.50 = €945. Total = <strong>€7,776 deduction</strong>.</li>
          <li><strong>Tax Savings:</strong> Extra deduction of €3,276. At a 30% Marginal Tax Rate (TMI), this yields a direct tax reduction of <code>€3,276 × 30% = €982.80 in net cash savings</code>.</li>
        </ul>`,
      },
      {
        heading: '5. Audit Proof & Documentation Requirements',
        content: `If you elect for actual expenses, you must retain all supporting documentation (fuel receipts, vehicle registration document - carte grise, repair bills, meal receipts, telework certificates) for at least three full calendar years following the tax return year. Failure to provide receipts upon request results in automatic reassessment back to the 10% deduction with interest penalties.`,
      },
    ],
    faqs: [
      {
        question: 'Can one spouse opt for actual expenses while the other keeps the 10% allowance?',
        answer: 'Yes. In France, the choice between the 10% standard deduction and actual expenses (frais réels) is individualized for each member of the tax household.',
      },
      {
        question: 'Do I need to submit receipts with my tax return?',
        answer: 'No. You do not send receipts when filing online. However, you must preserve them securely for 3 years in case of an audit by the French tax inspector.',
      },
      {
        question: 'Is there a limit on daily commuting distance for actual expenses?',
        answer: 'Yes. The distance is capped at 40 km each way (80 km round-trip) unless specific family, health, or labor market circumstances justify a greater distance.',
      },
      {
        question: 'Can I change my choice every year?',
        answer: 'Yes. You can switch between the 10% standard deduction and actual expenses every year when filing your annual income tax declaration.',
      },
    ],
  },

  // Guide 3: Mileage Allowance 2026
  {
    id: 'bareme-kilometrique-dgfip-2026',
    slug: 'bareme-kilometrique-dgfip-2026',
    category: 'indemnites-kilometriques',
    categorySlug: 'indemnites-kilometriques',
    categoryLabel: 'Mileage Allowances',
    badge: 'DGFIP 2026 Scale',
    readTime: '7 min read',
    icon: '🚗',
    title: 'Mileage Allowance 2026: Official French DGFIP Scale & Calculation Formulas',
    metaTitle: 'Mileage Allowance 2026: Official French DGFIP Rates & Scale',
    metaDescription: 'Calculate your 2026 French mileage allowance: official DGFIP tax scales by fiscal horsepower (3 to 7+ CV), mileage brackets, and +20% electric vehicle bonus.',
    targetKeyword: 'mileage allowance scale dgfip france 2026',
    h1: 'Mileage Allowance 2026: Official French DGFIP Scale & Calculation',
    summary: 'Complete guide to the official French DGFIP 2026 mileage allowance scale (barème kilométrique) for personal vehicle use: fiscal horsepower ratings, distance brackets, formulas, and electric vehicle incentives.',
    keywords: 'bareme kilometrique 2026, mileage allowance france, dgfip vehicle scale, electric car tax bonus france, commute deduction',
    calculator: {
      label: 'Mileage Allowance Calculator',
      href: '/countries/france/indemnites-kilometriques/',
      badge: 'Official DGFIP Scale',
    },
    relatedGuideSlugs: ['frais-reels-vs-abattement-10', 'bareme-impot-revenu-2026'],
    sections: [
      {
        heading: '1. How the Official French Mileage Scale Works',
        content: `The official French mileage scale (Barème Kilométrique DGFIP) allows employees, self-employed workers, and business executives to calculate tax-deductible vehicle operating expenses when using a personal car or motorcycle for work-related travel.
        The scale covers all ownership costs: vehicle depreciation, repair and maintenance, tires, fuel, and vehicle insurance. Only motorway tolls and parking expenses can be deducted in addition to the mileage rate.`,
      },
      {
        heading: '2. The 2026 DGFIP Statutory Car Scale',
        content: `The formula depends on the vehicle's administrative fiscal power (Puissance Administrative - CV) indicated on box P.6 of the French vehicle registration certificate (Carte Grise):
        <div class="overflow-x-auto my-4">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Fiscal Power (CV)</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Up to 5,000 km</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">5,001 km to 20,000 km</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Over 20,000 km</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">3 CV and under</td><td class="p-3">d × 0.529</td><td class="p-3">(d × 0.316) + 1,065</td><td class="p-3">d × 0.370</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">4 CV</td><td class="p-3">d × 0.606</td><td class="p-3">(d × 0.340) + 1,330</td><td class="p-3">d × 0.407</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">5 CV</td><td class="p-3">d × 0.636</td><td class="p-3">(d × 0.357) + 1,395</td><td class="p-3">d × 0.427</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">6 CV</td><td class="p-3">d × 0.665</td><td class="p-3">(d × 0.374) + 1,457</td><td class="p-3">d × 0.447</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">7 CV and above</td><td class="p-3">d × 0.697</td><td class="p-3">(d × 0.394) + 1,515</td><td class="p-3">d × 0.470</td></tr>
            </tbody>
          </table>
        </div>
        <em>d</em> represents the total distance in kilometers driven for professional purposes during the tax year.`,
      },
      {
        heading: '3. Special +20% Bonus for 100% Electric Vehicles',
        content: `To incentivize the ecological transition, French tax law provides an automatic <strong>20% enhancement</strong> on the calculated mileage allowance for 100% battery-electric vehicles (VE).
        <strong>Example:</strong> For an electric car with 5 CV driven 12,000 km:<br/>
        Base allowance: <code>(12,000 × 0.357) + 1,395 = €5,679</code>.<br/>
        Electric enhancement (+20%): <code>€5,679 × 1.20 = €6,814.80</code>.<br/>
        The taxpayer deducts an extra €1,135.80, delivering significant tax savings.`,
      },
      {
        heading: '4. Commuting Distance Limitations (The 40 km Rule)',
        content: `For regular daily home-to-work journeys, tax deduction is limited to 40 km each way (80 km round-trip per workday). If you live further than 40 km from your workplace, the excess distance cannot be deducted unless justified by special circumstances such as:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li>Spouse's employment location preventing family relocation.</li>
          <li>Job instability or short-term contracts.</li>
          <li>Health reasons or eldercare responsibilities.</li>
          <li>Significant housing price disparities making relocation near the workplace economically unviable.</li>
        </ul>`,
      },
      {
        heading: '5. Two-Wheeler and Motorcycle Scale',
        content: `Separate statutory scales apply to motorized two-wheelers (scooters under 50 cm³, and motorcycles over 50 cm³ divided into 1-2 CV, 3-5 CV, and 5+ CV tiers). The same 20% surcharge applies to 100% electric motorcycles and scooters.`,
      },
      {
        heading: '6. Documentation & Audit Preparedness',
        content: `In the event of an audit, you must present a precise trip logbook documenting: date of each trip, exact origin and destination addresses, purpose of the business meeting or shift, and total round-trip distance. Keep maintenance invoices showing odometer readings to substantiate annual mileage.`,
      },
    ],
    faqs: [
      {
        question: 'Does the mileage allowance cover fuel costs?',
        answer: 'Yes. The DGFIP scale incorporates fuel, insurance, repairs, depreciation, and tire wear. You cannot deduct fuel receipts separately if you use the scale.',
      },
      {
        question: 'Can I deduct parking fees and tolls in addition to the scale?',
        answer: 'Yes. Motorway tolls (péages) and business parking expenses can be deducted at actual substantiated cost in addition to the calculated mileage scale.',
      },
      {
        question: 'What is the electric vehicle bonus in the 2026 scale?',
        answer: '100% electric vehicles receive an automatic 20% increase on the total calculated mileage allowance under French tax law.',
      },
      {
        question: 'Where can I find the fiscal power (CV) of my car?',
        answer: 'Look at box P.6 on your French vehicle registration document (certificat d’immatriculation / carte grise).',
      },
    ],
  },

  // Guide 4: VAT Calculation
  {
    id: 'calcul-tva-france-taux-formules',
    slug: 'calcul-tva-france-taux-formules',
    category: 'tva-entreprise',
    categorySlug: 'tva-entreprise',
    categoryLabel: 'VAT & Business',
    badge: 'Statutory VAT Rates',
    readTime: '6 min read',
    icon: '🚀',
    title: 'French VAT Calculation 2026: Pre-Tax (HT) to Post-Tax (TTC) Formulas & Rates',
    metaTitle: 'French VAT Calculation 2026: Pre-Tax (HT) & Post-Tax (TTC) Guide',
    metaDescription: 'Master French VAT calculations: conversion formulas from HT to TTC and reverse VAT extraction, official statutory rates (20%, 10%, 5.5%, 2.1%), and invoice rules.',
    targetKeyword: 'vat calculation france ht ttc formulas 2026',
    h1: 'French VAT Calculation 2026: Formulas & Statutory Rates',
    summary: 'Essential guide to Value-Added Tax (TVA) in France: mathematical formulas for calculating VAT, converting between Pre-Tax (HT) and Post-Tax (TTC) values, and official statutory rates.',
    keywords: 'french vat calculation, calcul tva france, convert ht to ttc, tva 20 percent france, french vat rates 2026, tva extraction formula',
    calculator: {
      label: 'French VAT / Sales Tax Calculator',
      href: '/countries/france/en/finance/sales-tax-calculator/',
      badge: 'Multi-Rate Engine',
    },
    relatedGuideSlugs: ['bareme-impot-revenu-2026'],
    sections: [
      {
        heading: '1. The 4 Official French VAT Rates in 2026',
        content: `Value-Added Tax (Taxe sur la Valeur Ajoutée - TVA) is an indirect general consumption tax applied to sales of goods and services in France:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Standard Rate (20%):</strong> Applies to the vast majority of consumer goods, manufactured products, non-food services, and alcohol.</li>
          <li><strong>Intermediate Rate (10%):</strong> Applies to restaurant dining, non-alcoholic drinks consumed on-site, passenger transport, cultural events, and renovation work on residential dwellings over 2 years old.</li>
          <li><strong>Reduced Rate (5.5%):</strong> Essential food products, books (print and digital), school cafeterias, live performing arts, and energy-efficiency home renovations.</li>
          <li><strong>Super-Reduced Rate (2.1%):</strong> Reimbursable prescription pharmaceuticals, press publications, and certain livestock sales.</li>
        </ul>`,
      },
      {
        heading: '2. Mathematical Formulas: HT to TTC',
        content: `To calculate the inclusive Post-Tax price (TTC) from the exclusive Pre-Tax price (HT):
        <div class="p-3 my-3 rounded-xl bg-slate-800/80 font-mono text-xs sm:text-sm text-indigo-300">
          TVA Amount = HT × (Rate / 100)<br/>
          TTC Price = HT × (1 + Rate / 100)
        </div>
        <strong>Multipliers by Rate:</strong><br/>
        • 20% VAT: <code>TTC = HT × 1.20</code><br/>
        • 10% VAT: <code>TTC = HT × 1.10</code><br/>
        • 5.5% VAT: <code>TTC = HT × 1.055</code><br/>
        • 2.1% VAT: <code>TTC = HT × 1.021</code>`,
      },
      {
        heading: '3. Reverse VAT Extraction: TTC to HT',
        content: `To extract the exclusive Pre-Tax amount (HT) and the embedded VAT from a Post-Tax invoice total (TTC):
        <div class="p-3 my-3 rounded-xl bg-slate-800/80 font-mono text-xs sm:text-sm text-indigo-300">
          HT Price = TTC / (1 + Rate / 100)<br/>
          Embedded VAT = TTC - HT
        </div>
        <strong>Reverse Multipliers:</strong><br/>
        • 20% VAT: <code>HT = TTC / 1.20</code> (or <code>TTC × 0.833333</code>)<br/>
        • 10% VAT: <code>HT = TTC / 1.10</code> (or <code>TTC × 0.909091</code>)<br/>
        • 5.5% VAT: <code>HT = TTC / 1.055</code> (or <code>TTC × 0.947867</code>)<br/>
        • 2.1% VAT: <code>HT = TTC / 1.021</code> (or <code>TTC × 0.979432</code>)`,
      },
      {
        heading: '4. Invoice Compliance & Franchise en Base de TVA',
        content: `In France, micro-enterprises and small businesses can operate under the VAT-exempt regime (Franchise en base de TVA) if their turnover does not exceed statutory thresholds (€85,000 for sales of goods, €37,500 for services in 2026). They do not charge VAT and must display the statutory mention on invoices: <em>"TVA non applicable, art. 293 B du CGI"</em>.`,
      },
    ],
    faqs: [
      {
        question: 'What is the standard VAT rate in France?',
        answer: 'The standard VAT rate in France is 20%, applying to most goods and services.',
      },
      {
        question: 'How do I extract VAT from a TTC price at 20%?',
        answer: 'Divide the TTC price by 1.20 to find the HT base, then subtract HT from TTC to find the VAT amount.',
      },
      {
        question: 'What VAT rate applies to home renovations in France?',
        answer: 'Energy improvement work qualifies for 5.5% VAT, general improvement work qualifies for 10% VAT (provided the home is over 2 years old), and new construction is taxed at 20%.',
      },
    ],
  },

  // Guide 5: Mortgage Standards HCSF 2026
  {
    id: 'pret-immobilier-normes-hcsf-2026',
    slug: 'pret-immobilier-normes-hcsf-2026',
    category: 'credit-immobilier',
    categorySlug: 'credit-immobilier',
    categoryLabel: 'Mortgages & HCSF',
    badge: 'HCSF 35% Standards',
    readTime: '9 min read',
    icon: '🏠',
    title: 'French Mortgage Standards 2026: HCSF Rules, Debt-to-Income Limits & Borrowing Capacity',
    metaTitle: 'French Mortgage Standards 2026: HCSF 35% Debt Ratio & Rules',
    metaDescription: 'Legally binding French mortgage regulations in 2026: HCSF 35% maximum debt ratio, 25-year duration cap, borrower insurance requirements, and bank flexibility margins.',
    targetKeyword: 'french mortgage standards hcsf debt ratio 2026',
    h1: 'French Mortgage Standards 2026: HCSF Rules & Borrowing Capacity',
    summary: 'Comprehensive guide to official mortgage lending criteria in France governed by the High Council for Financial Stability (HCSF): maximum 35% debt-to-income ratio, 25-year maximum term, and lender flexibility margins.',
    keywords: 'hcsf mortgage rules france 2026, debt to income ratio france, maximum mortgage term france, capacite emprunt hcsf, borrower insurance loan',
    calculator: {
      label: 'HCSF Borrowing Capacity Simulator',
      href: '/countries/france/capacite-emprunt-hcsf/',
      badge: 'HCSF Compliant',
    },
    relatedGuideSlugs: ['assurance-emprunteur-loi-lemoine'],
    sections: [
      {
        heading: '1. The Legally Binding Nature of HCSF Standards',
        content: `Since January 1, 2022, the macroprudential decisions of the High Council for Financial Stability (Haut Conseil de Stabilité Financière - HCSF) are legally binding under French monetary and financial law. Commercial banks in France face regulatory sanctions from the ACPR if they breach these macroprudential limits outside authorized quotas.`,
      },
      {
        heading: '2. The 35% Maximum Debt-to-Income Ceiling (Taux d’Effort)',
        content: `The cornerstone HCSF rule dictates that total monthly debt servicing costs (Taux d'effort) cannot exceed <strong>35% of gross monthly income</strong> before tax withholding.
        <div class="p-3 my-3 rounded-xl bg-slate-800/80 font-mono text-xs sm:text-sm text-indigo-300">
          Taux d'Effort = (All Monthly Loan Payments + Borrower Insurance) / Gross Monthly Income ≤ 35.0%
        </div>
        Crucially, the statutory formula mandates that mandatory borrower insurance (assurance emprunteur) must be included within the monthly debt numerator.`,
      },
      {
        heading: '3. Maximum Loan Maturity: 25 Years (with 27-Year Extension)',
        content: `The statutory maximum loan maturity for residential mortgages is capped at <strong>25 years (300 months)</strong>.
        However, an extension to <strong>27 years (324 months)</strong> is permitted under two specific conditions:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li>Off-plan purchases (Vente en l’État Futur d’Achèvement - VEFA) or new constructions with deferred completion periods.</li>
          <li>Older properties requiring major renovation work representing at least 25% of total project cost.</li>
        </ul>`,
      },
      {
        heading: '4. The 20% Bank Flexibility Margin',
        content: `French commercial banks are allowed to deviate from the HCSF criteria for up to <strong>20% of their total quarterly mortgage production</strong>. However, this flexibility quota is heavily ring-fenced:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li>At least 70% of the quota must be reserved for primary residence purchases.</li>
          <li>At least 30% of this primary residence quota is reserved exclusively for first-time buyers (primo-accédants).</li>
          <li>Only 20% of the flexibility margin can be allocated to buy-to-let rental investments or secondary homes.</li>
        </ul>`,
      },
    ],
    faqs: [
      {
        question: 'What is the maximum debt ratio for a mortgage in France?',
        answer: 'The statutory maximum debt-to-income ratio (taux d’effort) is 35%, including mandatory borrower insurance.',
      },
      {
        question: 'Can a French mortgage exceed 25 years?',
        answer: 'Generally no, but it can extend up to 27 years for new-build off-plan purchases (VEFA) or renovations exceeding 25% of the acquisition cost.',
      },
      {
        question: 'Is borrower insurance included in the 35% HCSF limit?',
        answer: 'Yes. The HCSF explicitly requires mandatory borrower loan insurance premiums to be factored into the 35% ceiling.',
      },
    ],
  },

  // Guide 6: APL Housing Benefit 2026
  {
    id: 'simulateur-apl-baremes-caf-2026',
    slug: 'simulateur-apl-baremes-caf-2026',
    category: 'logement-apl',
    categorySlug: 'logement-apl',
    categoryLabel: 'Housing & APL',
    badge: 'CAF 2026 Slabs',
    readTime: '7 min read',
    icon: '🏢',
    title: 'French APL Housing Benefit 2026: CAF Slabs, Geographic Zones (1, 2, 3) & Student Aid',
    metaTitle: 'French APL Housing Benefit 2026: CAF Slabs & Zone Guide',
    metaDescription: 'Understand French APL housing benefit in 2026: CAF calculation formulas, rent ceilings by geographic zones (Zone 1 Paris, Zone 2, Zone 3), and student eligibility.',
    targetKeyword: 'apl housing benefit france caf zones 2026',
    h1: 'French APL Housing Benefit 2026: CAF Slabs & Zones Guide',
    summary: 'Comprehensive guide to personalized housing assistance (Aide Personnalisée au Logement - APL) administered by the French CAF: calculation formulas, geographic rent ceilings, and student eligibility.',
    keywords: 'apl 2026 caf, apl zones france, aide personnalisee logement, student apl eligibility france, apl rent ceiling',
    calculator: {
      label: 'French APL Simulator',
      href: '/countries/france/simulateur-apl/',
      badge: 'CAF Compliant',
    },
    relatedGuideSlugs: ['pret-immobilier-normes-hcsf-2026'],
    sections: [
      {
        heading: '1. How French APL Housing Benefit Operates in 2026',
        content: `Personalized Housing Assistance (APL) is a financial benefit paid by the Family Allowance Fund (Caisse d’Allocations Familiales - CAF) or Agricultural Mutual Fund (MSA) to reduce rent expenses for qualifying tenants residing in conventional housing (logement conventionné).
        Since the implementation of contemporary resource calculation (APL en temps réel), entitlement is based on your net taxable income over the preceding 12 months, automatically updated every quarter.`,
      },
      {
        heading: '2. Geographic Zoning Framework (Zones 1, 2, 3)',
        content: `The CAF applies geographic rent ceilings (Plafonds de Loyer) based on three tension zones:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Zone 1:</strong> Paris and municipalities in the Île-de-France region (highest living costs and highest rent caps).</li>
          <li><strong>Zone 2:</strong> Agglomerations with over 100,000 residents, Corsica, and high-tension outer suburbs.</li>
          <li><strong>Zone 3:</strong> Rest of mainland France (rural areas and small towns with standard rent caps).</li>
        </ul>`,
      },
      {
        heading: '3. The Mathematical CAF Formula',
        content: `The statutory monthly APL amount is computed according to the formula:
        <div class="p-3 my-3 rounded-xl bg-slate-800/80 font-mono text-xs sm:text-sm text-indigo-300">
          APL = Max(0, L + C - PP)
        </div>
        Where:<br/>
        • <strong>L:</strong> The monthly rent capped at the statutory ceiling for your zone.<br/>
        • <strong>C:</strong> A flat monthly charges allowance (€38.50 per person).<br/>
        • <strong>PP:</strong> The personal household financial contribution (Participation Personnelle), calculated from reference income and minimum financial capacity.`,
      },
      {
        heading: '4. Student Eligibility & Roommate Rules (Colocation)',
        content: `Students in France are eligible for APL regardless of whether they rent a studio apartment, university residence (CROUS), or private shared flat (colocation). In a shared flat, each tenant submits an individual application where the CAF applies a specific reduced rent ceiling (equal to 75% of the single person ceiling) to each leaseholder.`,
      },
    ],
    faqs: [
      {
        question: 'Can foreign students claim APL in France?',
        answer: 'Yes. International students with a valid French residence permit (titre de séjour or VLS-TS) and a conventional lease can claim CAF APL assistance.',
      },
      {
        question: 'What is the rent ceiling in Zone 1 (Paris)?',
        answer: 'In Zone 1 (Île-de-France), the monthly rent ceiling taken into account for a single person without dependents is approximately €325 in the CAF formula.',
      },
      {
        question: 'How often is the APL amount recalculated?',
        answer: 'APL is updated automatically every three months by the CAF based on your income declared to tax authorities over the preceding 12 rolling months.',
      },
    ],
  },

  // Guide 7: Compound Interest & Savings
  {
    id: 'interets-composes-epargne-france',
    slug: 'interets-composes-epargne-france',
    category: 'epargne-placements',
    categorySlug: 'epargne-placements',
    categoryLabel: 'Savings & Investments',
    badge: 'PEA & Assurance-Vie',
    readTime: '8 min read',
    icon: '📈',
    title: 'Compound Interest & Savings in France: Wealth Acceleration via PEA & Assurance-Vie',
    metaTitle: 'Compound Interest & Savings in France: PEA & Assurance-Vie Guide',
    metaDescription: 'Maximize compound interest in France: compounding formulas, regulated tax-free accounts (Livret A, LEP), and investment wrappers (PEA, Assurance-Vie).',
    targetKeyword: 'compound interest savings france pea assurance vie',
    h1: 'Compound Interest & Savings in France: Long-Term Growth Strategies',
    summary: 'Mathematical breakdown of compound interest and exponential capital accumulation applied to French regulated savings accounts and tax-advantaged investment wrappers.',
    keywords: 'compound interest france, interets composes epargne, pea investment france, assurance vie taxation, flat tax pfu 30 percent',
    calculator: {
      label: 'Compound Interest Calculator France',
      href: '/countries/france/en/finance/compound-interest-calculator/',
      badge: 'Wealth Simulator',
    },
    relatedGuideSlugs: ['bareme-impot-revenu-2026'],
    sections: [
      {
        heading: '1. The Mathematics of Exponential Compound Growth',
        content: `Compound interest is the mechanism where interest earned over a period is reinvested to generate additional interest in subsequent periods.
        The universal compound interest equation is:
        <div class="p-3 my-3 rounded-xl bg-slate-800/80 font-mono text-xs sm:text-sm text-indigo-300">
          A = P × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) - 1) / (r/n)]
        </div>
        Where <em>P</em> is initial principal, <em>r</em> is annual interest rate, <em>n</em> is compounding frequency, <em>t</em> is time in years, and <em>PMT</em> is regular periodic contribution.`,
      },
      {
        heading: '2. Regulated Tax-Free Accounts (Livret A, LDDS, LEP)',
        content: `France provides unique state-guaranteed savings accounts completely exempt from income tax and social security contributions:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Livret A:</strong> Capped at €22,950 per individual, interest compounded bi-monthly on the 1st and 16th of each month.</li>
          <li><strong>LDDS (Livret de Développement Durable et Solidaire):</strong> Capped at €12,000, 100% tax-free.</li>
          <li><strong>LEP (Livret d’Épargne Populaire):</strong> Reserved for modest income earners, offering high statutory rates capped at €10,000.</li>
        </ul>`,
      },
      {
        heading: '3. Tax-Advantaged Wrappers: PEA & Assurance-Vie',
        content: `For long-term wealth compounding above regulated account caps:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Plan d'Épargne en Actions (PEA):</strong> Capped at €150,000 in cash deposits. After 5 years, capital gains and dividends are <strong>100% exempt from income tax</strong> (only 17.2% social contributions apply). Compounding operates tax-free inside the wrapper.</li>
          <li><strong>Assurance-Vie:</strong> The benchmark French long-term savings contract. Withdrawals after 8 years enjoy an annual tax-free capital gains allowance of €4,600 (single) or €9,200 (couple).</li>
          <li><strong>Compte-Titres Ordinaire (CTO):</strong> Standard brokerage account subject annually to the 30% Flat Tax (Prélèvement Forfaitaire Unique - PFU: 12.8% income tax + 17.2% social charges).</li>
        </ul>`,
      },
    ],
    faqs: [
      {
        question: 'How does the French bi-monthly interest rule (règle des quinzaines) work?',
        answer: 'On French bank savings accounts, deposits start earning interest on the 1st or 16th following deposit, and withdrawals stop earning interest on the 1st or 16th preceding withdrawal.',
      },
      {
        question: 'What is the tax rate on PEA gains after 5 years?',
        answer: 'Gains are completely exempt from personal income tax. They are only subject to social security contributions (prélèvements sociaux) at 17.2%.',
      },
    ],
  },

  // Guide 8: Pension Reform 64 Years
  {
    id: 'reforme-retraite-france-64-ans',
    slug: 'reforme-retraite-france-64-ans',
    category: 'retraite-pensions',
    categorySlug: 'retraite-pensions',
    categoryLabel: 'Pensions & Retirement',
    badge: '2026 Reform Slabs',
    readTime: '9 min read',
    icon: '⏳',
    title: 'French Pension Reform: Statutory Age at 64, 172 Quarters & Pension Calculation',
    metaTitle: 'French Pension Reform 2026: Age 64 & 172 Quarters Guide',
    metaDescription: 'Official rules for French retirement in 2026: progressive increase of statutory retirement age to 64, 172 contribution quarters, and pension calculation formulas.',
    targetKeyword: 'french pension reform statutory age 64 quarters 2026',
    h1: 'French Pension Reform: Statutory Age at 64 & 172 Quarters',
    summary: 'Comprehensive analysis of the French statutory pension system: statutory retirement age progressive escalation to 64, requirement of 172 insurance quarters (trimestres), and penalty/bonus mechanisms.',
    keywords: 'french pension reform 64 years, trimestres retraite 172, pension calculation france, age legal retraite, decote surcote france',
    calculator: {
      label: 'French Retirement Calculator',
      href: '/countries/france/en/finance/retirement-calculator/',
      badge: 'Pension Estimator',
    },
    relatedGuideSlugs: ['bareme-impot-revenu-2026'],
    sections: [
      {
        heading: '1. The New Statutory Retirement Age (Âge Légal à 64 Ans)',
        content: `Following the statutory pension reform, the legal minimum retirement age in France increases progressively by 3 months per birth year, reaching 64 years for individuals born in 1968 and subsequent cohorts. Workers cannot claim their basic statutory pension before this age unless qualifying for early retirement (carrières longues, disability, or arduous work conditions).`,
      },
      {
        heading: '2. The 172 Contribution Quarters Requirement',
        content: `To receive a full-rate pension (taux plein at 50% for basic social security), workers born from 1965 onwards must validate <strong>172 contribution quarters (43 full years of contributions)</strong>. One quarter is validated by earning minimum wages (equivalent to 150 hours of SMIC in a calendar year) rather than working calendar months.`,
      },
      {
        heading: '3. Full Rate at 67 Without Penalties (Âge d’Annulation de la Décote)',
        content: `Regardless of the number of quarters validated throughout your career, reaching age <strong>67</strong> automatically unlocks the full pension rate (taux plein) without any actuarial reduction penalty (décote).`,
      },
      {
        heading: '4. The Pension Calculation Formula',
        content: `In the general private sector regime (CNAV / Carsat), the annual basic gross pension is computed as:
        <div class="p-3 my-3 rounded-xl bg-slate-800/80 font-mono text-xs sm:text-sm text-indigo-300">
          Basic Pension = SAM × Rate × (Validated Quarters / Required Quarters)
        </div>
        Where <em>SAM</em> is the average annual salary of your 25 best working years, <em>Rate</em> is 50% at full rate, and complementary pensions (Agirc-Arrco point system) are added on top.`,
      },
    ],
    faqs: [
      {
        question: 'What is the statutory retirement age in France in 2026?',
        answer: 'The statutory age is advancing progressively toward 64 years old depending on your exact year of birth.',
      },
      {
        question: 'How many quarters are needed for a full French pension?',
        answer: 'Individuals born in 1965 or later need 172 quarters (43 contribution years) to qualify for a full pension without discount penalties.',
      },
    ],
  },

  // Guide 9: Borrower Insurance Loi Lemoine
  {
    id: 'assurance-emprunteur-loi-lemoine',
    slug: 'assurance-emprunteur-loi-lemoine',
    category: 'assurance-prevoyance',
    categorySlug: 'assurance-prevoyance',
    categoryLabel: 'Insurance & Protection',
    badge: 'Loi Lemoine Rights',
    readTime: '7 min read',
    icon: '🛡️',
    title: 'Borrower Insurance & Lemoine Law: Switch Anytime & Save on French Home Loans',
    metaTitle: 'Borrower Insurance & Lemoine Law: Save on French Mortgages',
    metaDescription: 'Discover how the French Lemoine Law allows mortgage holders to cancel and switch loan insurance at any time without fees, cutting thousands of euros in costs.',
    targetKeyword: 'loi lemoine loan insurance switch france 2026',
    h1: 'Borrower Insurance & Lemoine Law: How to Switch and Save',
    summary: 'Strategic handbook on the French Lemoine Law: anytime cancellation of mortgage borrower insurance without penalty, elimination of the medical questionnaire, and TAEA rate comparisons.',
    keywords: 'loi lemoine france, switch mortgage insurance, assurance emprunteur resiliation, taea rate comparison, medical questionnaire loan',
    calculator: {
      label: 'French Mortgage Calculator',
      href: '/countries/france/en/finance/mortgage-calculator/',
      badge: 'Loan Comparison',
    },
    relatedGuideSlugs: ['pret-immobilier-normes-hcsf-2026'],
    sections: [
      {
        heading: '1. Anytime Cancellation Without Fees (Résiliation Infra-Annuelle)',
        content: `Under the Lemoine Law (Loi n° 2022-270), all borrowers in France have the statutory right to cancel and substitute their mortgage insurance policy at any time, from the very first day of the loan, free of charge. Banks cannot charge review fees or alter initial loan interest rates.`,
      },
      {
        heading: '2. Equivalent Level of Guarantees (Équivalence des Garanties)',
        content: `The only legal condition for substituting bank group insurance with an external individual policy (délégation d’assurance) is that the new contract must offer equivalent or superior cover across mandatory guarantees (Death, Total and Irreversible Loss of Autonomy - PTIA, Total Work Incapacity - ITT, and Permanent Disability - IPT).`,
      },
      {
        heading: '3. Abolition of the Medical Questionnaire',
        content: `The Lemoine Law abolished medical questionnaires and health declarations for real estate loans meeting two cumulative conditions:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li>Insured loan outstanding does not exceed <strong>€200,000 per borrower</strong> (€400,000 for a couple).</li>
          <li>Final maturity date occurs before the insured borrower's <strong>60th birthday</strong>.</li>
        </ul>`,
      },
    ],
    faqs: [
      {
        question: 'When can I switch mortgage insurance under the Lemoine Law?',
        answer: 'You can terminate and switch your borrower insurance at any time without waiting for an annual policy renewal date and without penalty fees.',
      },
      {
        question: 'How long does a French bank have to respond to a substitution request?',
        answer: 'By law, lenders must provide a formal written acceptance or motivated refusal within 10 working days of receiving the substitution file.',
      },
    ],
  },

  // Guide 10: Gross to Net Salary Conversion
  {
    id: 'conversion-salaire-brut-en-net-france',
    slug: 'conversion-salaire-brut-en-net-france',
    category: 'emploi-salaire',
    categorySlug: 'emploi-salaire',
    categoryLabel: 'Employment & Payroll',
    badge: 'URSSAF 2026 Contributions',
    readTime: '8 min read',
    icon: '💼',
    title: 'Gross-to-Net Salary Conversion in France 2026: Non-Executive vs Executive Payroll',
    metaTitle: 'Gross-to-Net Salary France 2026: Conversion & Contribution Guide',
    metaDescription: 'Convert gross salary to net take-home pay in France for 2026: statutory social contribution deductions (22% non-executive, 25% executive), CSG/CRDS, and withholding tax.',
    targetKeyword: 'gross to net salary conversion france 2026',
    h1: 'Gross-to-Net Salary Conversion in France 2026: Complete Breakdown',
    summary: 'Practical guide to French payroll mechanics: converting gross contract salary into net before tax and net take-home pay, factoring statutory URSSAF deductions for executives (cadres) and non-executives.',
    keywords: 'gross to net salary france 2026, convert brut en net france, urssaf payroll deductions, cadre non cadre salary, net take home pay france',
    calculator: {
      label: 'Gross to Net Salary Simulator France',
      href: '/countries/france/simulateur-salaire-brut-net/',
      badge: 'URSSAF Calibrated',
    },
    relatedGuideSlugs: ['bareme-impot-revenu-2026', 'indemnite-legale-licenciement-code-travail'],
    sections: [
      {
        heading: '1. The Difference Between Gross Salary and Net Pay in France',
        content: `In France, employment contracts express remuneration in Gross Salary (Salaire Brut). Before the employee receives net payment, mandatory social security contributions (cotisations sociales salariales) are deducted by the employer and remitted to URSSAF and pension funds.
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Gross Salary (Salaire Brut):</strong> Total contractual pay before any statutory deductions.</li>
          <li><strong>Net Before Tax (Net à Payer Avant Impôt):</strong> Gross salary minus all employee social contributions.</li>
          <li><strong>Net Take-Home Pay (Net Payé):</strong> The actual cash transferred to the employee's bank account after withholding income tax (Prélèvement à la Source - PAS).</li>
        </ul>`,
      },
      {
        heading: '2. Typical Contribution Rates: Executive vs Non-Executive',
        content: `Employee social contributions vary based on employment status:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Non-Executive (Non-Cadre):</strong> Deductions average approximately <strong>22%</strong> of gross salary (Net ≈ 78% of gross).</li>
          <li><strong>Executive (Cadre):</strong> Deductions average approximately <strong>25%</strong> of gross salary due to higher complementary pension and death insurance contributions (Net ≈ 75% of gross).</li>
          <li><strong>Civil Service (Fonction Publique):</strong> Deductions average approximately <strong>15% to 18%</strong> on basic salary.</li>
        </ul>`,
      },
      {
        heading: '3. Detailed Employee Payroll Deductions Breakdown',
        content: `Mandatory employee deductions itemized on a standard French pay slip (bulletin de paie):
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Health and Sickness (Assurance Maladie):</strong> Funded through general taxation (CSG).</li>
          <li><strong>Old Age Pension (Assurance Vieillesse):</strong> Basic capped rate of 6.90% and uncapped rate of 0.40%.</li>
          <li><strong>Complementary Pension (Agirc-Arrco):</strong> Tranche 1 rate of 3.15% (up to Social Security Ceiling - PMSS) and Tranche 2 rate of 8.64%.</li>
          <li><strong>CSG & CRDS:</strong> Generalized Social Contribution and Social Debt Reimbursement totaling 9.70% levied on 98.25% of gross income.</li>
        </ul>`,
      },
    ],
    faqs: [
      {
        question: 'What percentage is deducted from gross salary in France?',
        answer: 'Roughly 22% for non-executives (yielding 78% net) and 25% for executives (yielding 75% net) before income tax withholding.',
      },
      {
        question: 'How do I quickly estimate my monthly net salary?',
        answer: 'Multiply your gross monthly salary by 0.78 if you are a non-executive, or by 0.75 if you are an executive.',
      },
    ],
  },

  // Guide 11: Severance Pay
  {
    id: 'indemnite-legale-licenciement-code-travail',
    slug: 'indemnite-legale-licenciement-code-travail',
    category: 'emploi-salaire',
    categorySlug: 'emploi-salaire',
    categoryLabel: 'Employment & Payroll',
    badge: 'French Labor Code',
    readTime: '8 min read',
    icon: '⚖️',
    title: 'Statutory Severance Pay & Mutual Termination: French Labor Code Calculation Rules',
    metaTitle: 'Statutory Severance Pay France 2026: Labor Code Calculation',
    metaDescription: 'Calculate statutory severance pay in France under Article R1234-2 of the Labor Code: minimum rates, mutual termination (rupture conventionnelle), and tax exemptions.',
    targetKeyword: 'statutory severance pay france labor code calculation',
    h1: 'Statutory Severance Pay & Mutual Termination: French Labor Code Guide',
    summary: 'Comprehensive methodology for calculating statutory severance pay and mutual termination compensation under the French Labor Code: seniority rules, reference salaries, and tax exemptions.',
    keywords: 'severance pay france, indemnite licenciement code travail, rupture conventionnelle indemnity, severance tax exemption france',
    calculator: {
      label: 'Severance Pay Calculator France',
      href: '/countries/france/indemnite-licenciement/',
      badge: 'Labor Code Compliant',
    },
    relatedGuideSlugs: ['conversion-salaire-brut-en-net-france', 'bareme-impot-revenu-2026'],
    sections: [
      {
        heading: '1. Legal Eligibility for Severance Pay (Article L1234-9)',
        content: `Under Article L1234-9 of the French Labor Code, every employee with an open-ended employment contract (CDI) dismissed for personal or economic reasons (excluding gross misconduct - faute grave or intentional misconduct - faute lourde) is entitled to statutory severance compensation after completing at least <strong>8 months of uninterrupted seniority</strong> with the enterprise.`,
      },
      {
        heading: '2. The Statutory Calculation Formula (Article R1234-2)',
        content: `Statutory minimum severance pay cannot be lower than:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>1/4 of monthly reference salary</strong> per year of seniority for the first 10 years.</li>
          <li><strong>1/3 of monthly reference salary</strong> per year of seniority for each year beyond the 10th year.</li>
        </ul>
        Years of seniority are calculated down to exact full months on a pro-rata basis. Collective bargaining agreements (conventions collectives) often stipulate higher compensation than the legal minimum.`,
      },
      {
        heading: '3. Determining the Monthly Reference Salary',
        content: `The monthly reference salary is the most advantageous amount between:
        <ul class="list-disc pl-5 space-y-1 my-3 text-slate-300">
          <li>1/12 of the gross remuneration earned over the 12 months preceding dismissal notice.</li>
          <li>1/3 of the gross remuneration earned over the 3 months preceding dismissal (with bonuses prorated).</li>
        </ul>`,
      },
      {
        heading: '4. Tax and Social Security Exemption Framework',
        content: `Severance pay awarded within statutory or collective limits is exempt from French personal income tax up to the statutory ceiling (twice the annual gross remuneration earned in the preceding year or 50% of total compensation, capped at 6 times the annual Social Security Ceiling - PASS, approximately €282,000). It is also exempt from social security contributions up to 2 times PASS.`,
      },
    ],
    faqs: [
      {
        question: 'Does mutual termination (rupture conventionnelle) give right to severance pay?',
        answer: 'Yes. The specific compensation for rupture conventionnelle cannot legally be lower than statutory severance pay.',
      },
      {
        question: 'How much seniority is required to receive statutory severance pay?',
        answer: 'A minimum of 8 months uninterrupted seniority in the company on the notification date is required by the French Labor Code.',
      },
    ],
  },

  // Guide 12: Development Tax 2026
  {
    id: 'taxe-amenagement-baremes-2026',
    slug: 'taxe-amenagement-baremes-2026',
    category: 'taxe-amenagement',
    categorySlug: 'taxe-amenagement',
    categoryLabel: 'Development Tax',
    badge: 'Statutory 2026 Rates',
    readTime: '9 min read',
    icon: '🏗️',
    title: 'French Development Tax (Taxe d’Aménagement) 2026: Official Slabs & Formula',
    metaTitle: 'French Development Tax 2026: Rates, Slabs & Calculation',
    metaDescription: 'Official calculation guide for the French development tax (Taxe d’aménagement) in 2026: statutory standard values per m², municipal and departmental voting rates, and exemptions.',
    targetKeyword: 'taxe amenagement development tax france rates 2026',
    h1: 'French Development Tax (Taxe d’Aménagement) 2026: Official Slabs & Calculation',
    summary: 'Official calculation guide for the French development tax (Taxe d’aménagement) on construction projects in 2026: statutory square-meter base values, municipal and departmental rates, and pool/parking installations.',
    keywords: 'taxe amenagement 2026, french development tax, building permit tax france, tax taxable surface construction, swimming pool development tax',
    calculator: {
      label: 'Development Tax Simulator France',
      href: '/countries/france/taxe-amenagement/',
      badge: 'Statutory Engine',
    },
    relatedGuideSlugs: ['pret-immobilier-normes-hcsf-2026'],
    sections: [
      {
        heading: '1. What Is the French Development Tax?',
        content: `The French Development Tax (Taxe d’Aménagement) is an indirect local tax applied to all construction, reconstruction, and enlargement operations requiring a building permit (Permis de Construire) or preliminary declaration of works (Déclaration Préalable). It finances municipal and departmental public infrastructure and environmental preservation.`,
      },
      {
        heading: '2. Official Statutory Values per Square Meter in 2026',
        content: `The tax base is calculated by multiplying created taxable floor area (surface taxable) by official statutory standard values re-indexed annually:
        <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-300">
          <li><strong>Île-de-France Region (Paris):</strong> <strong>€1,050 per m²</strong></li>
          <li><strong>Other French Departments:</strong> <strong>€925 per m²</strong></li>
        </ul>
        Specific fixed bases apply to outdoor facilities:<br/>
        • Swimming pools: <strong>€258 per m²</strong> of pool surface.<br/>
        • Outdoor vehicle parking spaces: <strong>€3,000 to €6,000 per space</strong> depending on municipal votes.`,
      },
      {
        heading: '3. The Statutory Multi-Part Calculation Formula',
        content: `The total development tax payable consists of two distinct components:
        <div class="p-3 my-3 rounded-xl bg-slate-800/80 font-mono text-xs sm:text-sm text-indigo-300">
          Total Tax = (Taxable Base × Municipal Rate) + (Taxable Base × Departmental Rate)
        </div>
        Where:<br/>
        • <strong>Municipal Rate (Part Communale):</strong> Voted by city council, typically between 1% and 5% (up to 20% in major urban development zones).<br/>
        • <strong>Departmental Rate (Part Départementale):</strong> Voted by departmental council, capped at 2.5%.`,
      },
      {
        heading: '4. Statutory Abatements & Exemptions',
        content: `A statutory <strong>50% abatement</strong> is automatically applied to the first 100 square meters of primary residence construction financed by qualifying loans (such as PTZ). Furthermore, buildings under 5 square meters are completely exempt.`,
      },
    ],
    faqs: [
      {
        question: 'When is the French development tax paid?',
        answer: 'For building permits filed, tax notices are issued by the DGFIP. For amounts exceeding €1,500, payment is split into two equal installments due after 12 and 24 months.',
      },
      {
        question: 'Are swimming pools subject to development tax in France?',
        answer: 'Yes. In-ground or semi-inground swimming pools requiring declaration of works are taxed on a fixed statutory base of €258 per square meter of water surface.',
      },
    ],
  },
];
