// src/data/countryPageConfig.ts
import type { CountryConfig } from './countries';
import { CALCULATORS, CATEGORY_METADATA, type CalculatorEntry } from './calculatorRegistry';
import { SEARCHABLE_CALCULATORS } from './searchDatabase';
import { getCategoryById } from './categories';
import { CATEGORY_PAGE_CONFIGS } from './categoryConfig';
import { frCategories, frUI, frToolNames } from './i18n';
import type {
  DirectoryToolItem,
  EducationCard,
  FAQItem,
} from '../components/directory/DirectoryPageView.astro';

export interface CountryPageConfig {
  country?: CountryConfig;
  categoryId?: string;
  isFrench?: boolean;
  title: string;
  description: string;
  jsonLd: any;
  breadcrumbs: Array<{ label: string; href?: string }>;
  pillBadgeText: string;
  pillFlagUrl: string;
  headline: string;
  headlineHighlight: string;
  subheadlineText: string;
  directoryTitle: string;
  directoryFlagUrl: string;
  backLink: { label: string; href: string };
  searchPlaceholder: string;
  tools: DirectoryToolItem[];
  allSearchableToolsJson: string;
  educationHeading: string;
  educationSubheading: string;
  educationCards: EducationCard[];
  faqsHeading: string;
  faqsSubheading: string;
  faqs: FAQItem[];
  glowGradient: string;
  headlineGradient: string;
  headlineGradientDark: string;
}

// Master list of known tools with curated metadata and icons
const KNOWN_TOOLS_METADATA: Record<
  string,
  {
    name: string;
    shortName: string;
    icon: string;
    badge: string;
    description: string;
    category: string;
  }
> = {
  'sip-calculator': {
    name: 'SIP Calculator',
    shortName: 'SIP',
    icon: '📈',
    badge: 'Mutual Fund',
    description: 'Systematic Investment Plan returns and wealth compounding.',
    category: 'finance',
  },
  'step-up-sip-calculator': {
    name: 'Step-Up SIP Calculator',
    shortName: 'Step-Up SIP',
    icon: '🚀',
    badge: 'Annual Boost',
    description: 'Factor annual investment increments into future SIP returns.',
    category: 'finance',
  },
  'income-tax-calculator': {
    name: 'Income Tax Calculator',
    shortName: 'Income Tax',
    icon: '📑',
    badge: 'Statutory Slabs',
    description: 'Annual tax liability, standard deductions, and net post-tax income.',
    category: 'finance',
  },
  'emi-calculator': {
    name: 'EMI Calculator',
    shortName: 'EMI',
    icon: '🏦',
    badge: 'Reducing Balance',
    description: 'Home, vehicle, and personal loan EMIs with reducing balance interest.',
    category: 'finance',
  },
  'mortgage-calculator': {
    name: 'Mortgage Calculator',
    shortName: 'Mortgage',
    icon: '🏠',
    badge: 'Amortization',
    description: 'Monthly mortgage payments, property taxes, and complete payoff breakdown.',
    category: 'finance',
  },
  'salary-calculator': {
    name: 'Salary Calculator',
    shortName: 'Salary Take-Home',
    icon: '💼',
    badge: 'Net Pay',
    description: 'Gross annual pay to net take-home salary after statutory payroll taxes.',
    category: 'finance',
  },
  'auto-loan-calculator': {
    name: 'Auto Loan Calculator',
    shortName: 'Auto Loan',
    icon: '🚗',
    badge: 'Vehicle APR',
    description: 'Car loan installments, down payments, and total finance charges.',
    category: 'finance',
  },
  'compound-interest-calculator': {
    name: 'Compound Interest Calculator',
    shortName: 'Compound Int',
    icon: '⏳',
    badge: 'Wealth Growth',
    description: 'Calculate interest compounding across daily, monthly, and annual intervals.',
    category: 'finance',
  },
  'simple-interest-calculator': {
    name: 'Simple Interest Calculator',
    shortName: 'Simple Int',
    icon: '⏱️',
    badge: 'Fixed Yield',
    description: 'Linear interest yield calculation based on principal, rate, and tenure.',
    category: 'finance',
  },
  'loan-calculator': {
    name: 'Personal Loan Calculator',
    shortName: 'Loan',
    icon: '💳',
    badge: 'Fixed APR',
    description: 'Estimate monthly loan payments, total interest, and payoff schedules.',
    category: 'finance',
  },
  'amortization-calculator': {
    name: 'Loan Amortization Schedule',
    shortName: 'Amortization',
    icon: '📊',
    badge: 'Full Schedule',
    description: 'Detailed payment-by-payment principal and interest amortization chart.',
    category: 'finance',
  },
  'lumpsum-calculator': {
    name: 'Lumpsum Calculator',
    shortName: 'Lumpsum',
    icon: '💰',
    badge: 'One-Time',
    description: 'One-time investment growth and compound returns over long horizons.',
    category: 'finance',
  },
  'swp-calculator': {
    name: 'SWP Calculator',
    shortName: 'SWP',
    icon: '📉',
    badge: 'Systematic Cash',
    description: 'Systematic Withdrawal Plan returns, regular income, and remaining balance.',
    category: 'finance',
  },
  'ppf-calculator': {
    name: 'PPF Calculator',
    shortName: 'PPF',
    icon: '🏛️',
    badge: 'Tax-Exempt',
    description: 'Public Provident Fund compound interest, deposits, and maturity balance.',
    category: 'finance',
  },
  'epf-calculator': {
    name: 'EPF Calculator',
    shortName: 'EPF',
    icon: '🏢',
    badge: 'Retirement Fund',
    description: 'Employees Provident Fund accumulation with employer matching and interest.',
    category: 'finance',
  },
  'gratuity-calculator': {
    name: 'Gratuity Calculator',
    shortName: 'Gratuity',
    icon: '🎖️',
    badge: 'Statutory Benefit',
    description: 'Gratuity payout formula for tenure over 5 years under employment statutes.',
    category: 'finance',
  },
  '401k-calculator': {
    name: '401(k) Calculator',
    shortName: '401(k)',
    icon: '📈',
    badge: 'Retirement Match',
    description: 'Pre-tax 401(k) compounding with employer match and inflation projection.',
    category: 'finance',
  },
  'roth-ira-calculator': {
    name: 'Roth IRA Calculator',
    shortName: 'Roth IRA',
    icon: '🛡️',
    badge: 'Tax-Free Growth',
    description: 'Post-tax Roth IRA compounding and tax-free retirement withdrawal balance.',
    category: 'finance',
  },
  'percentage-calculator': {
    name: 'Percentage Calculator',
    shortName: 'Percentage',
    icon: '📐',
    badge: 'Multi-Mode',
    description: 'Percentage changes, discounts, fractional portions, and proportion math.',
    category: 'math',
  },
  'bmi-calculator': {
    name: 'BMI Calculator',
    shortName: 'BMI',
    icon: '🩺',
    badge: 'WHO Standard',
    description: 'Body Mass Index and healthy weight range calculation based on height and weight.',
    category: 'health',
  },
  'age-calculator': {
    name: 'Age Calculator',
    shortName: 'Age',
    icon: '🎂',
    badge: 'Calendar Precision',
    description: 'Exact age in years, months, weeks, days, and hours from date of birth.',
    category: 'everyday',
  },
  'date-calculator': {
    name: 'Date Calculator',
    shortName: 'Date',
    icon: '📅',
    badge: 'Time Duration',
    description: 'Add or subtract days, calculate business day durations between two dates.',
    category: 'everyday',
  },
  'calorie-calculator': {
    name: 'Calorie & TDEE Calculator',
    shortName: 'Calorie',
    icon: '🍎',
    badge: 'Mifflin-St Jeor',
    description: 'Total Daily Energy Expenditure, maintenance calories, and fitness macro splits.',
    category: 'health',
  },
  'profit-margin-calculator': {
    name: 'Profit Margin Calculator',
    shortName: 'Margin',
    icon: '🎯',
    badge: 'Markup & Gross',
    description: 'Gross margin, markup percentages, cost of goods, and net profit analysis.',
    category: 'finance',
  },
  'break-even-calculator': {
    name: 'Break-Even Calculator',
    shortName: 'Break-Even',
    icon: '💼',
    badge: 'Unit Volume',
    description: 'Calculate unit sales and revenue required to offset fixed and variable costs.',
    category: 'business',
  },
  'rental-yield-calculator': {
    name: 'Rental Yield Calculator',
    shortName: 'Rental Yield',
    icon: '🏢',
    badge: 'Gross & Net',
    description: 'Gross and net rental property yields factoring management fees and repairs.',
    category: 'real-estate',
  },
  'vat-calculator': {
    name: 'VAT Calculator',
    shortName: 'VAT',
    icon: '🧾',
    badge: 'Tax Inclusive',
    description: 'Add or extract Value Added Tax percentages from purchase figures.',
    category: 'finance',
  },
  'gst-calculator': {
    name: 'GST Calculator',
    shortName: 'GST',
    icon: '📑',
    badge: 'Goods & Services',
    description: 'Add or exclude statutory Goods and Services Tax rates easily.',
    category: 'finance',
  },
  'currency-converter': {
    name: 'Currency Converter',
    shortName: 'Currency',
    icon: '💱',
    badge: 'Multi-FX',
    description: 'Convert between major global currencies with precision rate multipliers.',
    category: 'finance',
  },
};

// Standard universal tools to supplement popular tools up to a multiple of 3
const UNIVERSAL_FALLBACK_ORDER = [
  'mortgage-calculator',
  'emi-calculator',
  'compound-interest-calculator',
  'loan-calculator',
  'percentage-calculator',
  'salary-calculator',
  'auto-loan-calculator',
  'simple-interest-calculator',
  'amortization-calculator',
  'bmi-calculator',
  'age-calculator',
  'profit-margin-calculator',
  'sip-calculator',
  'lumpsum-calculator',
  'date-calculator',
  'calorie-calculator',
  'rental-yield-calculator',
  'break-even-calculator',
];

// Set of calculator IDs registered in CALCULATORS registry (for country prerendering)
const REGISTERED_CALC_IDS = new Set(CALCULATORS.map((c) => c.id));

/**
 * Build a curated, 3-by-3 aligned list of calculator tools for a country
 */
export function getCountryTools(country: CountryConfig): DirectoryToolItem[] {
  const seenIds = new Set<string>();
  const tools: DirectoryToolItem[] = [];

  // 1. First add country's specific popular calculators
  for (const id of country.popularCalculators) {
    if (!seenIds.has(id)) {
      seenIds.add(id);
      const meta = KNOWN_TOOLS_METADATA[id];
      const regCalc = CALCULATORS.find((c) => c.id === id);
      const isCountryPrerendered = REGISTERED_CALC_IDS.has(id);
      const category = meta?.category || regCalc?.category || 'finance';
      const href = isCountryPrerendered
        ? `/countries/${country.slug}/${id}/`
        : `/${category}/${id}/`;

      const frenchNameMap: Record<string, { name: string; shortName: string; badge: string }> = {
        'age-calculator': { name: "Calculateur d'Âge", shortName: 'Âge', badge: 'Précision Calendrier' },
        'calorie-calculator': { name: 'Calculateur de Calories', shortName: 'Calories', badge: 'Mifflin-St Jeor' },
        'date-calculator': { name: 'Calculateur de Dates', shortName: 'Dates', badge: 'Durée & Jours' },
        'percentage-calculator': { name: 'Calculateur de Pourcentage', shortName: 'Pourcentage', badge: 'Multi-Modes' },
        'retirement-calculator': { name: 'Calculateur de Retraite', shortName: 'Retraite', badge: 'Planification' },
        'vat-calculator': { name: 'Calculateur de TVA', shortName: 'TVA', badge: 'TVA 20% & 5,5%' },
        'bmi-calculator': { name: 'Calculateur IMC', shortName: 'IMC', badge: 'Norme OMS' },
        'step-up-sip-calculator': { name: 'Épargne avec Boost', shortName: 'Boost Épargne', badge: 'Boost Annuel' },
        'sip-calculator': { name: 'Épargne Programmée', shortName: 'Épargne Prog.', badge: 'Fonds & Épargne' },
        'income-tax-calculator': { name: 'Impôt sur le Revenu', shortName: 'Impôt Revenu', badge: 'Barème 2026' },
        'compound-interest-calculator': { name: 'Intérêts Composés', shortName: 'Intérêts Comp.', badge: 'Croissance Capital' },
        'emi-calculator': { name: 'Mensualités de Prêt', shortName: 'Mensualités', badge: 'Capital Décroissant' },
        'auto-loan-calculator': { name: 'Prêt Auto', shortName: 'Prêt Auto', badge: 'Crédit Véhicule' },
        'mortgage-calculator': { name: 'Prêt Immobilier', shortName: 'Prêt Immo', badge: 'Amortissement' },
        'salary-calculator': { name: 'Salaire Net', shortName: 'Salaire Net', badge: 'Net Après Charges' },
      };

      const frMeta = country.slug === 'france' ? frenchNameMap[id] : null;

      tools.push({
        id,
        name: frMeta?.name || meta?.name || regCalc?.name || id,
        shortName: frMeta?.shortName || meta?.shortName || id.replace(/-calculator$/, ''),
        href,
        description:
          meta?.description ||
          regCalc?.description ||
          `Calculate with ${country.currencySymbol} precision.`,
        category,
        badge: frMeta?.badge || meta?.badge || `${country.currencySymbol} Verified`,
        icon: meta?.icon || '🧮',
      });
    }
  }

  // If France, sort alphabetically by French name and return exact 15 tools
  if (country.slug === 'france') {
    tools.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    return tools;
  }

  // 2. Add universal financial tools until we reach at least 15, 18, or 21 tools (multiple of 3)
  for (const id of UNIVERSAL_FALLBACK_ORDER) {
    if (!seenIds.has(id)) {
      seenIds.add(id);
      const meta = KNOWN_TOOLS_METADATA[id];
      const regCalc = CALCULATORS.find((c) => c.id === id);

      // If this tool is prerendered under country, link to country URL, otherwise to its category URL
      const isCountryPrerendered = country.popularCalculators.includes(id);
      const href = isCountryPrerendered
        ? `/countries/${country.slug}/${id}/`
        : `/${meta?.category || regCalc?.category || 'finance'}/${id}/`;

      tools.push({
        id,
        name: meta?.name || regCalc?.name || id,
        shortName: meta?.shortName || id.replace(/-calculator$/, ''),
        href,
        description:
          meta?.description ||
          regCalc?.description ||
          `Calculate with ${country.currencySymbol} precision.`,
        category: meta?.category || regCalc?.category || 'finance',
        badge: meta?.badge || `${country.currencySymbol} Tool`,
        icon: meta?.icon || '🧮',
      });
    }

    // Keep grid in multiples of 3, aiming for 15 or 18 tools
    if (tools.length >= 18) break;
  }

  // Ensure total count is a strict multiple of 3 (for 3-by-3 layout rhythm)
  const remainder = tools.length % 3;
  if (remainder !== 0) {
    tools.splice(tools.length - remainder, remainder);
  }

  return tools;
}

/**
 * Generates the complete, standardized configuration for any country directory page
 */
export function getCountryPageConfig(country: CountryConfig): CountryPageConfig {
  const cleanCountryName = country.name;
  const fullTitle = `${cleanCountryName} Calculators — Free Online Finance, Tax & Utility Tools (${country.currencySymbol})`;
  const description = `Mathematically verified online calculators for ${cleanCountryName}. Customized with ${country.currency} (${country.currencySymbol}) currency, ${
    country.numberSystem === 'lakh-crore' ? 'Lakh/Crore numbering' : 'standard grouping'
  }, and statutory financial rules.`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: fullTitle,
    description: description,
    url: `https://freeaccuratecalculator.com/countries/${country.slug}/`,
  };

  const breadcrumbs = [
    { label: 'Countries', href: '/countries/' },
    { label: cleanCountryName },
  ];

  const pillBadgeText = `${cleanCountryName} Edition • ${country.currency} (${country.currencySymbol})`;
  const headline = `${cleanCountryName} Calculators.`;
  const headlineHighlight = 'Fast, Accurate & Clean.';
  const subheadlineText = `Calculators optimized for ${cleanCountryName}'s financial conventions, ${country.currency} (${country.currencySymbol}) formatting, and ${
    country.numberSystem === 'lakh-crore' ? 'the South Asian Lakh/Crore system' : 'standard international groupings'
  }. Zero cold starts and instant client privacy.`;

  const directoryTitle = `${cleanCountryName} Directory All Tools`;
  const backLink = { label: '← All Countries', href: '/countries/' };
  const searchPlaceholder = `Search ${cleanCountryName} calculators...`;

  const tools = getCountryTools(country);
  const allSearchableToolsJson = JSON.stringify(SEARCHABLE_CALCULATORS);

  const educationHeading = `Why Use Free Accurate ${cleanCountryName} Calculators?`;
  const educationSubheading = `Engineered for ${cleanCountryName} financial standards, statutory formulas, and complete client privacy`;

  const educationCards: EducationCard[] = [
    {
      icon: '🪙',
      title: `${country.currency} (${country.currencySymbol}) & ${
        country.numberSystem === 'lakh-crore' ? 'Lakh/Crore' : 'Standard'
      } Formatting`,
      desc: `Automatic currency formatting in ${country.currency} with ${
        country.numberSystem === 'lakh-crore'
          ? 'South Asian numbering (e.g. 10,00,000)'
          : 'standard international thousands grouping (e.g. 1,000,000)'
      } for intuitive local calculations.`,
    },
    {
      icon: '🔒',
      title: '100% Client-Side Privacy',
      desc: `All calculations, loans, salaries, and wealth projections execute exclusively in your local browser memory. Zero data is ever logged or transmitted to any server.`,
    },
    {
      icon: '📐',
      title: 'Verified Mathematical Precision',
      desc: `Strict floating-point accuracy tested against reference mathematical and banking formulas, eliminating rounding drift and adhering to statutory guidelines.`,
    },
  ];

  const faqsHeading = `Frequently Asked Questions About ${cleanCountryName} Calculations`;
  const faqsSubheading = `Clear answers regarding ${cleanCountryName} currency, statutory formulas, and calculation accuracy`;

  const faqs: FAQItem[] = [
    {
      question: `Are these calculators customized for ${cleanCountryName}?`,
      answer: `Yes. Each tool defaults to ${country.currency} (${country.currencySymbol}) and respects ${cleanCountryName}'s standard numerical formatting, reducing balance loan amortization, and regional statutory conventions.`,
    },
    {
      question: `How is number formatting handled for ${cleanCountryName}?`,
      answer: `Calculations are rendered using ${
        country.numberSystem === 'lakh-crore'
          ? 'the Lakh/Crore system (e.g., ₹10,00,000)'
          : 'the standard international grouping system (e.g., $1,000,000)'
      } according to official national standards.`,
    },
    {
      question: `Is my financial or personal information stored?`,
      answer: `Never. All computations run 100% locally in your client-side browser with zero data transmission, logging, or storage. We do not require accounts or personal info.`,
    },
    {
      question: `Can I change the currency symbol?`,
      answer: `Yes. While ${country.currency} (${country.currencySymbol}) is the pre-configured default for ${cleanCountryName}, financial calculators include an instant currency switcher for multi-currency analysis.`,
    },
    {
      question: `Are these calculators completely free?`,
      answer: `Yes. All calculators on Free Accurate Calculator are permanently free with unlimited access, zero paywalls, and no subscription requirements.`,
    },
  ];

  return {
    country,
    title: fullTitle,
    description,
    jsonLd,
    breadcrumbs,
    pillBadgeText,
    pillFlagUrl: country.flagUrl,
    headline,
    headlineHighlight,
    subheadlineText,
    directoryTitle,
    directoryFlagUrl: country.flagUrl,
    backLink,
    searchPlaceholder,
    tools,
    allSearchableToolsJson,
    educationHeading,
    educationSubheading,
    educationCards,
    faqsHeading,
    faqsSubheading,
    faqs,
    glowGradient: 'from-indigo-500/20 via-blue-500/10 to-transparent',
    headlineGradient: 'from-blue-600 via-indigo-600 to-purple-600',
    headlineGradientDark: 'dark:from-blue-400 dark:via-indigo-300 dark:to-purple-300',
  };
}

/**
 * Generates the complete, standardized configuration for any country-category directory page
 * (e.g., /countries/india/finance/, /countries/united-states/health/)
 */
export function getCountryCategoryPageConfig(
  country: CountryConfig,
  categoryId: string
): CountryPageConfig {
  const isFr = country.slug === 'france';
  const cleanCountryName = isFr ? 'France' : country.name;
  const catItem = getCategoryById(categoryId);
  const catMeta = CATEGORY_METADATA[categoryId as keyof typeof CATEGORY_METADATA];
  const catConfig = CATEGORY_PAGE_CONFIGS[categoryId];

  const defaultCatName = catItem?.name || catMeta?.name?.replace(/\s+Calculators$/i, '') || categoryId;
  const cleanCatName = isFr ? (frCategories[categoryId] || defaultCatName) : defaultCatName;

  const fullTitle = isFr
    ? `Calculatrices de ${cleanCatName} Gratuites et Précises France 2026`
    : `${cleanCountryName} ${cleanCatName} Calculators — Free Online Tools (${country.currencySymbol})`;

  const description = isFr
    ? `Outils de calcul gratuits et précis pour la catégorie ${cleanCatName} en France. 100% confidentiel, sans publicité et conforme aux normes françaises.`
    : `Accurate ${cleanCountryName} ${cleanCatName.toLowerCase()} calculators customized with ${country.currency} (${country.currencySymbol}) currency, statutory formulas, and instant edge calculation. 100% free and private.`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: fullTitle,
    description: description,
    url: `https://freeaccuratecalculator.com/countries/${country.slug}/${categoryId}/`,
  };

  const breadcrumbs = isFr
    ? [
        { label: frUI.breadcrumbHome, href: '/' },
        { label: frUI.breadcrumbCountries, href: '/countries/' },
        { label: frUI.breadcrumbFrance, href: '/countries/france/' },
        { label: cleanCatName },
      ]
    : [
        { label: 'Countries', href: '/countries/' },
        { label: cleanCountryName, href: `/countries/${country.slug}/` },
        { label: cleanCatName },
      ];

  const pillBadgeText = isFr
    ? `France • Calculatrices de ${cleanCatName}`
    : `${cleanCountryName} • ${cleanCatName} Calculators`;

  const headline = isFr ? 'Calculatrices de' : `${cleanCountryName} ${cleanCatName} Calculators.`;
  const headlineHighlight = isFr ? `${cleanCatName} pour la France` : (catConfig?.headlineHighlight || 'Fast, Accurate & Clean.');
  const subheadlineText = isFr
    ? `Outils de calcul de ${cleanCatName.toLowerCase()} haute précision calibrés pour la France. Standard Euro (€), formules certifiées, zéro stockage de données et calcul instantané.`
    : `High-precision ${cleanCatName.toLowerCase()} tools customized for ${cleanCountryName}. Defaulted to ${country.currency} (${country.currencySymbol}) precision with zero data storage and instant client-side calculation.`;

  const directoryTitle = isFr ? `Calculatrices de ${cleanCatName}` : `${cleanCountryName} ${cleanCatName} Tools`;
  const backLink = isFr
    ? { label: '← Toutes les Calculatrices France', href: '/countries/france/' }
    : { label: `← All ${cleanCountryName} Calculators`, href: `/countries/${country.slug}/` };

  const searchPlaceholder = isFr ? frUI.searchPlaceholder : `Search ${cleanCountryName} ${cleanCatName.toLowerCase()} calculators...`;

  // 1. Gather all tools in this category for this country
  const seenIds = new Set<string>();
  const tools: DirectoryToolItem[] = [];

  // 1a. Tools in country's popularCalculators that belong to this category
  for (const id of country.popularCalculators) {
    const meta = KNOWN_TOOLS_METADATA[id];
    const regCalc = CALCULATORS.find((c) => c.id === id);
    const toolCat = meta?.category || regCalc?.category;

    if (toolCat === categoryId && !seenIds.has(id)) {
      seenIds.add(id);
      const frTool = isFr ? frToolNames[id] : null;
      tools.push({
        id,
        name: frTool?.name || meta?.name || regCalc?.name || id,
        shortName: frTool?.shortName || meta?.shortName || id.replace(/-calculator$/, ''),
        href: (isFr && id === 'percentage-calculator')
          ? '/fr/math/percentage-calculator/'
          : `/countries/${country.slug}/${categoryId}/${id}/`,
        description:
          frTool?.desc ||
          meta?.description ||
          regCalc?.description ||
          (isFr ? `Calculez avec précision pour la France en Euro (€).` : `Calculate with ${country.currencySymbol} precision.`),
        category: categoryId,
        badge: isFr ? 'Norme FR' : (meta?.badge || `${country.currencySymbol} Verified`),
        icon: meta?.icon || catItem?.icon || '🧮',
      });
    }
  }

  // 1b. Remaining tools from CALCULATORS for this category
  const remainingCalcs = CALCULATORS.filter((c) => {
    if (c.category !== categoryId) return false;
    if (country.slug === 'france') {
      if ([
        '401k-calculator',
        'roth-ira-calculator',
        'ppf-calculator',
        'epf-calculator',
        'gratuity-calculator',
        'age-calculator',
        'calorie-calculator',
        'bmi-calculator',
        'date-calculator',
      ].includes(c.id)) {
        return false;
      }
    }
    return true;
  });
  for (const regCalc of remainingCalcs) {
    if (!seenIds.has(regCalc.id)) {
      seenIds.add(regCalc.id);
      const meta = KNOWN_TOOLS_METADATA[regCalc.id];
      const isCountryPrerendered = isFr || country.popularCalculators.includes(regCalc.id);
      let href = isCountryPrerendered
        ? `/countries/${country.slug}/${categoryId}/${regCalc.id}/`
        : `/${categoryId}/${regCalc.id}/`;

      if (isFr) {
        if (regCalc.id === 'sales-tax-calculator') href = `/countries/france/${categoryId}/vat-calculator/`;
        if (regCalc.id === 'loan-calculator') href = `/countries/france/${categoryId}/emi-calculator/`;
      }

      const frTool = isFr ? frToolNames[regCalc.id] : null;
      tools.push({
        id: regCalc.id,
        name: frTool?.name || meta?.name || regCalc.name,
        shortName: frTool?.shortName || meta?.shortName || regCalc.name.replace(/\s+Calculator$/i, ''),
        href,
        description:
          frTool?.desc ||
          meta?.description ||
          regCalc.description ||
          (isFr ? `Calculez avec précision pour la France en Euro (€).` : `Calculate with precision for ${cleanCountryName}.`),
        category: categoryId,
        badge: isFr ? 'Norme FR' : (meta?.badge || (isCountryPrerendered ? `${country.currencySymbol} Verified` : 'Verified Tool')),
        icon: meta?.icon || catItem?.icon || '🧮',
      });
    }
  }

  // If France, sort alphabetically by name
  if (country.slug === 'france') {
    tools.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  }

  // Ensure tool count is a multiple of 3 if count >= 3, for strict 3-by-3 visual alignment
  if (tools.length >= 3) {
    const remainder = tools.length % 3;
    if (remainder !== 0) {
      tools.splice(tools.length - remainder, remainder);
    }
  }

  const allSearchableToolsJson = JSON.stringify(SEARCHABLE_CALCULATORS);

  const educationHeading = isFr
    ? frUI.whyUseTitle
    : `Why Use Free Accurate ${cleanCountryName} ${cleanCatName} Tools?`;

  const educationSubheading = isFr
    ? `Conçus selon les normes françaises, garantis avec une précision légale et 100% confidentiels`
    : `Engineered for ${cleanCountryName} standards, statutory accuracy, and 100% browser privacy`;

  const educationCards: EducationCard[] = isFr
    ? [
        {
          icon: '💶',
          title: 'Précision Euro (€) & Normes Françaises',
          desc: 'Formatage monétaire en Euro (€) et conformité stricte avec les formules de calcul et barèmes légaux applicables en France.',
        },
        {
          icon: '🔒',
          title: 'Confidentialité 100% Locale',
          desc: 'Aucune donnée financière ou personnelle n’est envoyée à des serveurs distants. Tous les calculs s’effectuent en mémoire dans votre navigateur.',
        },
        {
          icon: '⚡',
          title: 'Calculs Instantanés & Zéro Dérive',
          desc: 'Algorithmes audités et optimisés pour éliminer les erreurs d’arrondi à virgule flottante et garantir des résultats exacts.',
        },
      ]
    : catConfig?.educationCards?.map((c) => ({
        icon: c.icon,
        title: c.title,
        desc: c.desc,
      })) || [
        {
          icon: '🪙',
          title: `${country.currency} (${country.currencySymbol}) Precision`,
          desc: `Pre-calibrated with ${country.currency} formatting and ${cleanCountryName} statutory numerical conventions for seamless local calculations.`,
        },
        {
          icon: '🔒',
          title: '100% Client-Side Privacy',
          desc: `Zero server transmission or data logging. All computations run directly within your browser session memory.`,
        },
        {
          icon: '📐',
          title: 'Mathematical Rigor',
          desc: `Formulas verified against standard academic, financial, and scientific benchmarks to eliminate floating-point errors.`,
        },
      ];

  const faqsHeading = isFr
    ? `Questions Fréquemment Posées sur les Calculatrices de ${cleanCatName}`
    : `Frequently Asked Questions About ${cleanCountryName} ${cleanCatName} Calculations`;

  const faqsSubheading = isFr
    ? `Réponses claires sur la conformité en France, les formules et la confidentialité des calculs`
    : `Clear answers regarding currency defaults, calculation accuracy, and privacy`;

  const faqs: FAQItem[] = isFr
    ? [
        {
          question: `Ces calculatrices de ${cleanCatName.toLowerCase()} sont-elles adaptées à la France ?`,
          answer: `Oui. Les calculs financiers et statistiques utilisent la devise Euro (€), le formatage numérique français (séparateur décimal et groupement par millier), ainsi que les barèmes réglementaires français.`,
        },
        {
          question: `Quelle est la précision des résultats pour la catégorie ${cleanCatName.toLowerCase()} ?`,
          answer: `Chaque calculatrice applique des algorithmes mathématiques conformes aux normes professionnelles et académiques pour éliminer toute dérive d’arrondi.`,
        },
        {
          question: `Mes données de calcul sont-elles enregistrées ?`,
          answer: `Non, jamais. La totalité du traitement s'exécute côté client dans votre navigateur web sans aucun transfert vers des serveurs tiers.`,
        },
        {
          question: `Puis-je consulter d'autres catégories pour la France ?`,
          answer: `Oui. Vous pouvez parcourir toutes les catégories françaises via la grille sur cette page ou revenir au répertoire principal France.`,
        },
      ]
    : [
        {
          question: `Are these ${cleanCatName.toLowerCase()} calculators customized for ${cleanCountryName}?`,
          answer: `Yes. Tools that compute monetary amounts default to ${country.currency} (${country.currencySymbol}) and apply ${cleanCountryName}'s numerical grouping (${country.numberSystem === 'lakh-crore' ? 'Lakh/Crore' : 'thousands standard'}) and relevant statutory rules.`,
        },
        {
          question: `How accurate are the ${cleanCountryName} ${cleanCatName.toLowerCase()} calculations?`,
          answer: `Every tool uses mathematically verified formulas audited against standard banking, scientific, and statutory standards for exact precision without rounding drift.`,
        },
        {
          question: `Is my personal data saved when using ${cleanCountryName} calculators?`,
          answer: `Never. Our platform operates 100% client-side in your local browser memory. No inputs, calculations, or identifiers are ever stored or uploaded to any remote server.`,
        },
        {
          question: `Can I access other categories for ${cleanCountryName}?`,
          answer: `Yes. You can explore all calculator categories for ${cleanCountryName} via the category grid on this page or return to the main ${cleanCountryName} country directory.`,
        },
      ];

  return {
    country,
    categoryId,
    isFrench: isFr,
    title: fullTitle,
    description,
    jsonLd,
    breadcrumbs,
    pillBadgeText,
    pillFlagUrl: country.flagUrl,
    headline,
    headlineHighlight,
    subheadlineText,
    directoryTitle,
    directoryFlagUrl: country.flagUrl,
    backLink,
    searchPlaceholder,
    tools,
    allSearchableToolsJson,
    educationHeading,
    educationSubheading,
    educationCards,
    faqsHeading,
    faqsSubheading,
    faqs,
    glowGradient: catConfig?.gradient?.glow || 'from-indigo-500/20 via-blue-500/10 to-transparent',
    headlineGradient: catConfig?.gradient?.light || 'from-blue-600 via-indigo-600 to-purple-600',
    headlineGradientDark: catConfig?.gradient?.dark || 'dark:from-blue-400 dark:via-indigo-300 dark:to-purple-300',
  };
}
