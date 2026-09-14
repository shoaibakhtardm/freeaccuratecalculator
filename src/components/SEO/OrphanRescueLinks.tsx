// src/components/SEO/OrphanRescueLinks.tsx
import React from 'react';

export interface RegionalCalculatorLink {
  anchorText: string;
  href: string;
  flagEmoji: string;
  countryName: string;
  category: string;
  badgeText: string;
  description: string;
}

export interface OrphanRescueLinksProps {
  currentCategory?: string;
  currentCountry?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
}

// Master contextual matrix of high-value regional calculator pages
export const REGIONAL_CALCULATOR_NETWORK: RegionalCalculatorLink[] = [
  // Finance Vertical - High Value Deep Routes
  {
    anchorText: 'India Home Loan EMI Calculator',
    href: '/countries/india/emi-calculator/',
    flagEmoji: '🇮🇳',
    countryName: 'India',
    category: 'finance',
    badgeText: '₹ INR Slabs',
    description: 'Calculates monthly installments, interest breakdown, and amortization in Lakhs and Crores.',
  },
  {
    anchorText: 'India FY 2025–26 Income Tax Calculator',
    href: '/countries/india/income-tax-calculator/',
    flagEmoji: '🇮🇳',
    countryName: 'India',
    category: 'finance',
    badgeText: 'New vs Old',
    description: 'Compare Budget 2025/2026 tax regimes with ₹75k standard deduction and 87A rebate.',
  },
  {
    anchorText: 'India SIP Wealth & Return Calculator',
    href: '/countries/india/sip-calculator/',
    flagEmoji: '🇮🇳',
    countryName: 'India',
    category: 'finance',
    badgeText: 'Mutual Funds',
    description: 'Forecast disciplined mutual fund wealth accumulation with rupee inflation adjustments.',
  },
  {
    anchorText: 'US Mortgage & 30-Year Loan Calculator',
    href: '/countries/united-states/mortgage-calculator/',
    flagEmoji: '🇺🇸',
    countryName: 'United States',
    category: 'finance',
    badgeText: '$ USD Fixed',
    description: 'Detailed monthly P&I, property taxes, PMI, and homeowner insurance estimates.',
  },
  {
    anchorText: 'US Federal & State Income Tax Calculator',
    href: '/countries/united-states/income-tax-calculator/',
    flagEmoji: '🇺🇸',
    countryName: 'United States',
    category: 'finance',
    badgeText: 'IRS Brackets',
    description: 'Updated with standard deductions, 401(k) limits, and progressive tax tiers.',
  },
  {
    anchorText: 'UK Salary & Take-Home Tax Calculator',
    href: '/countries/united-kingdom/income-tax-calculator/',
    flagEmoji: '🇬🇧',
    countryName: 'United Kingdom',
    category: 'finance',
    badgeText: 'HMRC PAYE',
    description: 'Calculates National Insurance contributions, student loan deductions, and pension relief.',
  },
  {
    anchorText: 'UK Stamp Duty Land Tax (SDLT) Calculator',
    href: '/countries/united-kingdom/stamp-duty-calculator/',
    flagEmoji: '🇬🇧',
    countryName: 'United Kingdom',
    category: 'finance',
    badgeText: 'Property Tax',
    description: 'Official residential tiered rates for first-time buyers and additional properties.',
  },
  {
    anchorText: 'Canada Mortgage Stress Test Calculator',
    href: '/countries/canada/mortgage-calculator/',
    flagEmoji: '🇨🇦',
    countryName: 'Canada',
    category: 'finance',
    badgeText: 'CMHC Insured',
    description: 'Qualifying rates under OSFI mortgage stress test rules and amortization periods.',
  },
  {
    anchorText: 'Australia Stage 3 Tax & Super Calculator',
    href: '/countries/australia/income-tax-calculator/',
    flagEmoji: '🇦🇺',
    countryName: 'Australia',
    category: 'finance',
    badgeText: 'ATO Revised',
    description: 'Updated for revised Stage 3 tax cuts, 2% Medicare levy, and SG contributions.',
  },
  {
    anchorText: 'Germany Netto-Brutto Gehalt Calculator',
    href: '/countries/germany/income-tax-calculator/',
    flagEmoji: '🇩🇪',
    countryName: 'Germany',
    category: 'finance',
    badgeText: 'Steuerklasse',
    description: 'Calculates solidary surcharge, health insurance, and pension contributions.',
  },
  {
    anchorText: 'UAE End-of-Service Gratuity Calculator',
    href: '/countries/united-arab-emirates/gratuity-calculator/',
    flagEmoji: '🇦🇪',
    countryName: 'finance',
    category: 'finance',
    badgeText: 'MOHRE Law',
    description: 'Accurate severance pay computations under UAE Federal Labour Law.',
  },
  {
    anchorText: 'Singapore CPF & Salary Take-Home Calculator',
    href: '/countries/singapore/income-tax-calculator/',
    flagEmoji: '🇸🇬',
    countryName: 'Singapore',
    category: 'finance',
    badgeText: 'CPF Ordinary',
    description: 'Calculates statutory employee and employer CPF deductions with progressive IRAS tiers.',
  },

  // Health & Nutrition Vertical
  {
    anchorText: 'Clinical BMI & Metric Weight Calculator',
    href: '/health/bmi-calculator/',
    flagEmoji: '🩺',
    countryName: 'Global',
    category: 'health',
    badgeText: 'WHO Standard',
    description: 'WHO classification with height-to-weight healthy spectrum index.',
  },
  {
    anchorText: 'Daily Calorie Deficit & TDEE Calculator',
    href: '/health/calorie-calculator/',
    flagEmoji: '🍎',
    countryName: 'Global',
    category: 'health',
    badgeText: 'Mifflin-St Jeor',
    description: 'Basal metabolic rate and activity multiplier for fat loss and muscle hypertrophy.',
  },
  {
    anchorText: 'Macro Nutrient Split & Meal Ratio Calculator',
    href: '/health/macronutrient-calculator/',
    flagEmoji: '🥗',
    countryName: 'Global',
    category: 'health',
    badgeText: 'Dietary Macro',
    description: 'Calculates optimal grams of protein, carbs, and fats based on fitness targets.',
  },
  {
    anchorText: 'Navy Circumference Body Fat % Calculator',
    href: '/health/body-fat-calculator/',
    flagEmoji: '⚖️',
    countryName: 'Global',
    category: 'health',
    badgeText: 'US Navy Formula',
    description: 'Accurate fat percentage computation without calipers using tape measurements.',
  },

  // Math, Science & Engineering Vertical
  {
    anchorText: 'Comprehensive Percentage & Delta Calculator',
    href: '/math/percentage-calculator/',
    flagEmoji: '📐',
    countryName: 'Global',
    category: 'math',
    badgeText: 'Exact IEEE-754',
    description: 'Percentage increase, percentage difference, discount rates, and reverse percentage.',
  },
  {
    anchorText: 'High-Precision Scientific Math Calculator',
    href: '/math/scientific-calculator/',
    flagEmoji: '🔬',
    countryName: 'Global',
    category: 'math',
    badgeText: 'Trigonometry',
    description: 'Full trigonometric, logarithmic, factorial, and exponential functions without floating drift.',
  },
  {
    anchorText: 'Chronological Exact Age & Time Calculator',
    href: '/everyday/age-calculator/',
    flagEmoji: '🎂',
    countryName: 'Global',
    category: 'everyday',
    badgeText: 'Day/Hour/Sec',
    description: 'Exact years, months, days, total hours, and seconds elapsed since birth date.',
  },
  {
    anchorText: 'Solar Photovoltaic Energy Yield Calculator',
    href: '/ecology/solar-energy-calculator/',
    flagEmoji: '☀️',
    countryName: 'Global',
    category: 'science',
    badgeText: 'kWh Estimation',
    description: 'Sun hours, panel wattage, and inverter efficiency modeling for residential solar.',
  },
  {
    anchorText: 'Commercial Real Estate Cap Rate Calculator',
    href: '/real-estate/cap-rate-calculator/',
    flagEmoji: '🏢',
    countryName: 'Global',
    category: 'business',
    badgeText: 'NOI Valuation',
    description: 'Capitalization rate calculation from Net Operating Income and current asset valuation.',
  },
  {
    anchorText: 'Corporate Break-Even Point & Margin Calculator',
    href: '/business/break-even-calculator/',
    flagEmoji: '📊',
    countryName: 'Global',
    category: 'business',
    badgeText: 'Unit Economics',
    description: 'Fixed cost coverage, contribution margin ratio, and unit volume thresholds.',
  },
];

/**
 * OrphanRescueLinks Component
 * Eliminates orphan risk by providing crawlable, zero-CLS, dofollow links
 * to deep-nested regional calculators and hubs.
 */
export const OrphanRescueLinks: React.FC<OrphanRescueLinksProps> = ({
  currentCategory,
  currentCountry,
  title,
  subtitle,
  limit = 8,
}) => {
  // Contextually filter links based on current view
  let relevantLinks = REGIONAL_CALCULATOR_NETWORK;

  if (currentCategory) {
    const categoryMatches = REGIONAL_CALCULATOR_NETWORK.filter(
      (item) => item.category === currentCategory.toLowerCase()
    );
    if (categoryMatches.length > 0) {
      relevantLinks = categoryMatches;
    }
  }

  if (currentCountry) {
    const countryMatches = relevantLinks.filter(
      (item) => item.countryName.toLowerCase() === currentCountry.toLowerCase()
    );
    if (countryMatches.length > 0) {
      relevantLinks = countryMatches;
    }
  }

  const displayedLinks = relevantLinks.slice(0, limit);

  const headingText =
    title ||
    (currentCategory
      ? `Global & Country-Specific ${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Calculators`
      : 'Popular Regional & Specialized Financial Calculators');

  const subText =
    subtitle ||
    'Mathematically verified, localized calculation tools calibrated for country-specific tax codes, currencies, and regulatory standards.';

  return (
    <section
      aria-label="Regional and Specialized Calculator Directory"
      className="orphan-rescue-section w-full border-t border-hairline bg-canvas py-10 sm:py-14"
      style={{ minHeight: '380px' }} // Zero-CLS reservation guarantee
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-hairline gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-canvas-elevated text-body border border-hairline mb-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Verified Regional Index
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-ink font-outfit">
              {headingText}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-body leading-relaxed">
              {subText}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/countries/"
              rel="dofollow"
              className="text-xs font-semibold text-link hover:text-ink transition-colors inline-flex items-center gap-1 whitespace-nowrap"
            >
              <span>Explore All Countries</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Zero-CLS Responsive CSS Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayedLinks.map((item, index) => (
            <a
              key={`${item.href}-${index}`}
              href={item.href}
              rel="dofollow"
              title={`${item.anchorText} — Verified Tool`}
              className="group relative flex flex-col justify-between rounded-xl border border-hairline bg-canvas p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-link/40 hover:shadow-card shadow-whisper"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xl leading-none" role="img" aria-label={item.countryName}>
                    {item.flagEmoji}
                  </span>
                  <span className="inline-block rounded-md bg-canvas-elevated px-2 py-0.5 text-[10px] font-semibold text-body border border-hairline uppercase tracking-wider">
                    {item.badgeText}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-ink font-outfit group-hover:text-link transition-colors line-clamp-2">
                  {item.anchorText}
                </h3>

                <p className="mt-2 text-xs text-body line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-hairline/60 flex items-center justify-between text-xs font-medium text-body group-hover:text-link transition-colors">
                <span className="text-[11px] font-mono capitalize text-muted">{item.countryName}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
                  Launch Tool
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrphanRescueLinks;
