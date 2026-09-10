// src/data/categoryConfig.ts

export interface CategoryToolOverride {
  id: string;
  name?: string;
  shortName: string;
  icon: string;
  badge: string;
  subNiche: string;
  description?: string;
}

export interface CategoryEducationCard {
  icon: string;
  title: string;
  desc: string;
}

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryPageConfig {
  id: string;
  name: string;
  icon: string;
  pillBadge: string;
  headlineHighlight: string;
  subheadline: string;
  gradient: {
    light: string;
    dark: string;
    glow: string;
    accent: string;
  };
  tools: CategoryToolOverride[];
  educationHeading: string;
  educationSubheading: string;
  educationCards: CategoryEducationCard[];
  faqsHeading: string;
  faqsSubheading: string;
  faqs: CategoryFaq[];
}

export const CATEGORY_PAGE_CONFIGS: Record<string, CategoryPageConfig> = {
  legal: {
    id: 'legal',
    name: 'Legal',
    icon: '⚖️',
    pillBadge: 'Verified Legal Calculators',
    headlineHighlight: 'Fast, Accurate & Private.',
    subheadline: 'Pure legal and statutory guideline calculators arranged in a 3-by-3 structure. All computations run 100% client-side with zero data storage.',
    gradient: {
      light: 'from-amber-600 via-yellow-600 to-indigo-600',
      dark: 'from-amber-400 dark:via-yellow-300 dark:to-indigo-300',
      glow: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      accent: 'amber',
    },
    tools: [
      {
        id: 'child-support-calculator',
        shortName: 'Child Support',
        icon: '⚖️',
        badge: 'Income Shares',
        subNiche: 'Family Law',
        description: 'Statutory child support guidelines based on combined parental income and custody percentage.',
      },
      {
        id: 'alimony-calculator',
        shortName: 'Alimony & Support',
        icon: '📜',
        badge: 'Spousal Support',
        subNiche: 'Family Law',
        description: 'Estimate alimony maintenance amounts and duration based on marital length and earnings disparity.',
      },
      {
        id: 'settlement-value-calculator',
        shortName: 'Settlement Value',
        icon: '💼',
        badge: 'Injury Multiplier',
        subNiche: 'Civil Claims',
        description: 'Personal injury claim settlement estimates based on medical specials, lost wages, and pain multipliers.',
      },
      {
        id: 'legal-fee-calculator',
        shortName: 'Legal Fees',
        icon: '🏛️',
        badge: 'Contingency / Retainer',
        subNiche: 'Practice Law',
        description: 'Hourly attorney fee retainers vs percentage contingency fee payouts and net client proceeds.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Legal Calculators?',
    educationSubheading: 'Built for statutory guideline accuracy, objective case evaluation, and complete client confidentiality',
    educationCards: [
      {
        icon: '🔒',
        title: '100% Confidential & Local',
        desc: 'Sensitive family finances, divorce assets, and personal injury numbers never touch any server. Everything evaluates locally in your browser.',
      },
      {
        icon: '📜',
        title: 'Statutory Model Transparency',
        desc: 'Calculations follow standardized legal formulas including parental income-shares models and standard insurance settlement multiplier frameworks.',
      },
      {
        icon: '⚖️',
        title: 'Unbiased Case Benchmarks',
        desc: 'Objective mathematical models free from attorney billing incentives or insurance claim adjuster pressure.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Legal Calculations',
    faqsSubheading: 'Answers to help you understand support guidelines and dispute valuation',
    faqs: [
      {
        question: 'How is statutory child support calculated?',
        answer: 'Most jurisdictions use the Income Shares model, which estimates the total amount parents would spend on children if intact, then allocates that obligation proportionally to each parent’s net income and custody time.',
      },
      {
        question: 'What is the standard multiplier for pain and suffering in personal injury settlements?',
        answer: 'Insurance adjusters and attorneys typically apply a multiplier between 1.5x and 5x to economic damages (medical bills and lost wages), depending on injury severity, recovery duration, and permanent impairment.',
      },
      {
        question: 'How is spousal support (alimony) duration determined?',
        answer: 'Durations generally correlate with marriage length. Short marriages (under 10 years) typically receive alimony for roughly half the marriage duration, while marriages over 20 years may qualify for permanent or long-term support.',
      },
      {
        question: 'What is the typical contingency fee percentage for civil attorneys?',
        answer: 'Standard contingency agreements typically take 33.3% of the gross settlement before trial, increasing to 40% if a formal lawsuit is filed or litigation goes to trial.',
      },
      {
        question: 'Are personal injury settlement payouts subject to income tax?',
        answer: 'Under IRS Section 104(a)(2), compensatory damages received for personal physical injuries or sickness are generally non-taxable at the federal level, though punitive damages and interest are taxable.',
      },
    ],
  },

  business: {
    id: 'business',
    name: 'Business',
    icon: '💼',
    pillBadge: 'Verified Business Calculators',
    headlineHighlight: 'Fast, Accurate & Clean.',
    subheadline: 'Pure corporate finance, valuation, and unit economic calculators arranged in a 3-by-3 structure. Each tool runs 100% client-side with zero latency.',
    gradient: {
      light: 'from-blue-600 via-indigo-600 to-emerald-500',
      dark: 'from-blue-400 dark:via-indigo-300 dark:to-emerald-300',
      glow: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      accent: 'blue',
    },
    tools: [
      {
        id: 'break-even-calculator',
        shortName: 'Break-Even Point',
        icon: '🎯',
        badge: 'Volume & Revenue',
        subNiche: 'Operations',
        description: 'Calculate break-even production units and sales revenue required to cover fixed overhead costs.',
      },
      {
        id: 'roi-calculator',
        shortName: 'ROI Calculator',
        icon: '📈',
        badge: 'Return on Capital',
        subNiche: 'Corporate Finance',
        description: 'Net return on investment percentages and annualized yield on corporate capital expenditure.',
      },
      {
        id: 'business-valuation-calculator',
        shortName: 'Business Valuation',
        icon: '🏢',
        badge: 'SDE & EBITDA',
        subNiche: 'Corporate Finance',
        description: 'Estimate enterprise fair market value using industry EBITDA multiples and SDE cash flows.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Business Calculators?',
    educationSubheading: 'Engineered for managerial accounting rigor, commercial clarity, and private corporate forecasting',
    educationCards: [
      {
        icon: '🔒',
        title: 'Confidential Financial Data',
        desc: 'Proprietary M&A multiples, EBITDA figures, and unit margins stay in volatile browser memory with zero tracking.',
      },
      {
        icon: '📊',
        title: 'GAAP & Standard Formulas',
        desc: 'Formulas align with standard financial analysis textbooks and institutional valuation practices.',
      },
      {
        icon: '⚡',
        title: 'Instant Scenario Modeling',
        desc: 'Adjust fixed costs, contribution margins, and multiples with instant real-time feedback.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Business Calculations',
    faqsSubheading: 'Essential financial benchmarks for founders, CFOs, and business brokers',
    faqs: [
      {
        question: 'How is the break-even point in units calculated?',
        answer: 'Break-Even Units = Fixed Costs ÷ (Selling Price per Unit - Variable Cost per Unit). The denominator represents your Contribution Margin per unit.',
      },
      {
        question: 'What is the difference between ROI and Annualized ROI?',
        answer: 'Standard ROI measures cumulative percentage gain over the entire holding period, while Annualized ROI accounts for compounding duration across multiple years.',
      },
      {
        question: 'What EBITDA multiple should be used for small to mid-sized businesses?',
        answer: 'Small businesses with under $1M in cash flow typically trade between 2x and 4x SDE, while mid-market companies ($2M-$10M EBITDA) trade between 4x and 8x EBITDA.',
      },
      {
        question: 'What is Seller’s Discretionary Earnings (SDE)?',
        answer: 'SDE equals Net Profit before taxes, plus owner compensation, personal discretionary perks, and one-time non-recurring expenses.',
      },
      {
        question: 'How do fixed costs differ from variable costs?',
        answer: 'Fixed costs (rent, salaries, software subscriptions) remain constant regardless of sales volume, while variable costs (materials, shipping, credit fees) scale with every unit sold.',
      },
    ],
  },

  construction: {
    id: 'construction',
    name: 'Construction',
    icon: '🏗️',
    pillBadge: 'Verified Construction Calculators',
    headlineHighlight: 'Fast, Accurate & Free.',
    subheadline: 'Pure construction estimation and civil material calculators arranged in a 3-by-3 structure. Includes built-in wastage allowances and dual unit support.',
    gradient: {
      light: 'from-amber-600 via-orange-600 to-stone-600',
      dark: 'from-amber-400 dark:via-orange-300 dark:to-stone-300',
      glow: 'from-amber-500/20 via-orange-500/10 to-transparent',
      accent: 'amber',
    },
    tools: [
      {
        id: 'concrete-calculator',
        shortName: 'Concrete Volume',
        icon: '🏗️',
        badge: 'Yards & Bags',
        subNiche: 'Foundations',
        description: 'Cubic yardage and 60lb/80lb premix bag counts with 10% waste buffer.',
      },
      {
        id: 'square-footage-calculator',
        shortName: 'Square Footage',
        icon: '📐',
        badge: 'Area & Cost',
        subNiche: 'Surfaces',
        description: 'Total floor and wall square footage across multiple rooms with material cost totals.',
      },
      {
        id: 'paint-calculator',
        shortName: 'Paint Coverage',
        icon: '🎨',
        badge: 'Gallons & Coats',
        subNiche: 'Finishing',
        description: 'Gallons of paint required excluding doors and windows across 1 or 2 coats.',
      },
      {
        id: 'brick-calculator',
        shortName: 'Brick & Masonry',
        icon: '🧱',
        badge: 'Bricks & Mortar',
        subNiche: 'Masonry',
        description: 'Modular and standard brick counts for walls and facades with mortar volume.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Construction Calculators?',
    educationSubheading: 'Engineered for contractor precision, material waste management, and fast job-site quoting',
    educationCards: [
      {
        icon: '📐',
        title: 'Built-In Wastage Buffers',
        desc: 'Automatic 5% to 10% material buffer calculations prevent on-site material shortages and work stoppages.',
      },
      {
        icon: '⚖️',
        title: 'Dual Imperial & Metric Units',
        desc: 'Seamlessly switch between cubic yards, cubic meters, square feet, and square meters with exact conversions.',
      },
      {
        icon: '💰',
        title: 'Instant Job Costing',
        desc: 'Factor unit material prices directly into square footage and volume calculations for accurate bids.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Construction Calculations',
    faqsSubheading: 'Material estimation answers for general contractors, builders, and DIY remodelers',
    faqs: [
      {
        question: 'How many 80lb bags of concrete make one cubic yard?',
        answer: 'It takes 45 bags of 80lb premixed concrete (or 60 bags of 60lb premix) to equal one cubic yard (27 cubic feet) of cured concrete.',
      },
      {
        question: 'Why should you add a waste buffer to concrete pours?',
        answer: 'Standard trade practice recommends adding 5% to 10% extra concrete to account for uneven subgrades, form bowing, spillage, and slab thickness variations.',
      },
      {
        question: 'How many square feet does one gallon of paint cover?',
        answer: 'One US gallon of quality architectural paint covers roughly 350 to 400 square feet on smooth, primed drywall per coat.',
      },
      {
        question: 'How many standard modular bricks are in a square foot of wall?',
        answer: 'Standard modular brick (3-5/8" x 2-1/4" x 7-5/8") requires 7 bricks per square foot including standard 3/8-inch mortar joints.',
      },
      {
        question: 'How do you calculate square footage for irregular L-shaped areas?',
        answer: 'Divide the space into distinct rectangular sections, calculate the area of each (Length × Width), and add them together.',
      },
    ],
  },

  'real-estate': {
    id: 'real-estate',
    name: 'Real Estate',
    icon: '🏢',
    pillBadge: 'Verified Real Estate Calculators',
    headlineHighlight: 'Fast, Accurate & Clean.',
    subheadline: 'Pure property investment, rental yield, and capitalization rate calculators arranged in a 3-by-3 structure. Tested against institutional underwriting models.',
    gradient: {
      light: 'from-emerald-600 via-teal-600 to-blue-600',
      dark: 'from-emerald-400 dark:via-teal-300 dark:to-blue-300',
      glow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      accent: 'emerald',
    },
    tools: [
      {
        id: 'rental-yield-calculator',
        shortName: 'Rental Yield',
        icon: '🏢',
        badge: 'Gross & Net Yield',
        subNiche: 'Investment',
        description: 'Calculate gross and net annual rental yield percentages after operating expenses.',
      },
      {
        id: 'cap-rate-calculator',
        shortName: 'Cap Rate (NOI)',
        icon: '📊',
        badge: 'Asset Valuation',
        subNiche: 'Investment',
        description: 'Capitalization rate calculation from Net Operating Income (NOI) and property purchase price.',
      },
      {
        id: 'property-tax-calculator',
        shortName: 'Property Tax',
        icon: '🏠',
        badge: 'Mill Levies',
        subNiche: 'Taxation',
        description: 'Estimate annual property tax based on assessed fair market value and local millage rates.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Real Estate Calculators?',
    educationSubheading: 'Built for property investors, syndicators, and real estate professionals seeking accurate returns',
    educationCards: [
      {
        icon: '📈',
        title: 'Institutional Underwriting',
        desc: 'Calculates true Net Operating Income (NOI), cap rates, and net rental yields after real-world operating expenses.',
      },
      {
        icon: '🔒',
        title: 'Private Portfolio Analysis',
        desc: 'Your property addresses, rental rolls, purchase prices, and yields are computed locally and never logged.',
      },
      {
        icon: '🌍',
        title: 'Universal Multi-Currency Support',
        desc: 'Easily adapt calculations across US, UK, European, Canadian, and Australian real estate markets.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Real Estate Calculations',
    faqsSubheading: 'Real estate investment principles, capitalization rates, and property cash flows',
    faqs: [
      {
        question: 'What is a good Capitalization Rate (Cap Rate) for rental property?',
        answer: 'A typical healthy cap rate ranges from 4% to 7% in high-demand tier-1 markets, and 7% to 10% in secondary markets with higher cash flow potential.',
      },
      {
        question: 'What is the difference between Gross Yield and Net Yield?',
        answer: 'Gross Yield only compares annual rent to purchase price. Net Yield deducts property taxes, insurance, management fees, maintenance reserves, and vacancy loss.',
      },
      {
        question: 'Does Net Operating Income (NOI) include mortgage payments?',
        answer: 'No. NOI explicitly excludes debt service (principal and interest) and income taxes, measuring pure operational performance independent of financing.',
      },
      {
        question: 'How do millage rates translate to annual property tax?',
        answer: 'One mill equals $1 of tax per $1,000 of assessed property value. Formula: Assessed Value × Millage Rate ÷ 1,000.',
      },
      {
        question: 'What vacancy rate should you factor into rental projections?',
        answer: 'Prudent real estate underwriters factor a 5% to 8% vacancy allowance (roughly 2 to 4 weeks per year) to ensure resilient cash flow.',
      },
    ],
  },

  technology: {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    pillBadge: 'Verified Technology Calculators',
    headlineHighlight: 'Fast, Accurate & Free.',
    subheadline: 'Pure networking, cryptographic entropy, and data transmission calculators arranged in a 3-by-3 structure. Built to RFC and IETF specifications.',
    gradient: {
      light: 'from-indigo-600 via-violet-600 to-cyan-600',
      dark: 'from-indigo-400 dark:via-violet-300 dark:to-cyan-300',
      glow: 'from-indigo-500/20 via-violet-500/10 to-transparent',
      accent: 'indigo',
    },
    tools: [
      {
        id: 'subnet-calculator',
        shortName: 'IPv4 Subnet',
        icon: '🌐',
        badge: 'CIDR & Mask',
        subNiche: 'Networking',
        description: 'Subnet masks, broadcast addresses, wildcard masks, CIDR notation, and usable host counts.',
      },
      {
        id: 'password-generator',
        shortName: 'Password Entropy',
        icon: '🔐',
        badge: 'Web Crypto API',
        subNiche: 'Security',
        description: 'Cryptographically secure password generation with Shannon entropy score calculation.',
      },
      {
        id: 'bandwidth-calculator',
        shortName: 'Bandwidth & Pipe',
        icon: '📡',
        badge: 'Network Throughput',
        subNiche: 'Networking',
        description: 'Bandwidth requirements for concurrent users, video streaming bitrates, and peak traffic.',
      },
      {
        id: 'data-transfer-calculator',
        shortName: 'Data Transfer Time',
        icon: '⚡',
        badge: 'GB/TB Download',
        subNiche: 'Data Engineering',
        description: 'Calculate download and upload durations across broadband, 5G, and fiber link speeds.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Technology Calculators?',
    educationSubheading: 'Built for network engineers, sysadmins, and software architects requiring RFC-compliant accuracy',
    educationCards: [
      {
        icon: '🔐',
        title: 'Native Web Crypto API',
        desc: 'High-entropy password generation executes client-side using browser CSPRNG without network transmissions.',
      },
      {
        icon: '🌐',
        title: 'RFC Standards Compliant',
        desc: 'Bitwise subnet masks and host range boundaries adhere strictly to RFC 4632 and CIDR specifications.',
      },
      {
        icon: '⚡',
        title: 'Real-Time Bitwise Math',
        desc: 'Instant calculations for subnet masks, network addresses, and data transfers with zero latency.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Technology Calculations',
    faqsSubheading: 'Clear networking and data engineering answers for technical teams',
    faqs: [
      {
        question: 'What is CIDR notation in IPv4 networking?',
        answer: 'Classless Inter-Domain Routing (CIDR) represents subnet masks as a slash followed by the count of leading network bits (e.g., /24 denotes 255.255.255.0).',
      },
      {
        question: 'Why do you subtract 2 from total IP addresses in a subnet?',
        answer: 'Two addresses are reserved by RFC standard: the first address is the Network Address and the last address is the Broadcast Address.',
      },
      {
        question: 'What is the difference between Mbps and MB/s?',
        answer: 'Mbps (Megabits per second) measures telecom speed; MB/s (Megabytes per second) measures file size. Divide Mbps by 8 to get approximate MB/s transfer speed.',
      },
      {
        question: 'What makes a password cryptographically secure?',
        answer: 'A password with 70+ bits of entropy derived from a length of 16+ characters combining uppercase, lowercase, numbers, and symbols.',
      },
      {
        question: 'How does network protocol overhead affect actual throughput?',
        answer: 'TCP/IP headers and packet handshakes typically add 5% to 10% overhead above raw payload data sizes during file transfers.',
      },
    ],
  },

  health: {
    id: 'health',
    name: 'Health',
    icon: '🩺',
    pillBadge: 'Verified Health Calculators',
    headlineHighlight: 'Fast, Accurate & Private.',
    subheadline: 'Pure medical, metabolic, body composition, and obstetrics calculators arranged in a 3-by-3 structure. Tested against WHO and peer-reviewed formulas.',
    gradient: {
      light: 'from-rose-600 via-pink-600 to-emerald-500',
      dark: 'from-rose-400 dark:via-pink-300 dark:to-emerald-300',
      glow: 'from-rose-500/20 via-pink-500/10 to-transparent',
      accent: 'rose',
    },
    tools: [
      {
        id: 'bmi-calculator',
        shortName: 'BMI Calculator',
        icon: '⚖️',
        badge: 'WHO Clinical',
        subNiche: 'Body Composition',
        description: 'Body Mass Index with instant Metric & Imperial toggle and WHO risk category classification.',
      },
      {
        id: 'calorie-calculator',
        shortName: 'Calorie & TDEE',
        icon: '🍎',
        badge: 'Mifflin-St Jeor',
        subNiche: 'Metabolism',
        description: 'Total Daily Energy Expenditure (TDEE) and caloric intake targets for weight loss or gain.',
      },
      {
        id: 'body-fat-calculator',
        shortName: 'Body Fat %',
        icon: '📏',
        badge: 'US Navy Method',
        subNiche: 'Body Composition',
        description: 'Body fat percentage estimation using circumference measurements (neck, waist, hip).',
      },
      {
        id: 'bmr-calculator',
        shortName: 'BMR Calculator',
        icon: '🔥',
        badge: 'Basal Rate',
        subNiche: 'Metabolism',
        description: 'Basal Metabolic Rate calories burned at complete rest using Harris-Benedict and Mifflin formulas.',
      },
      {
        id: 'ideal-weight-calculator',
        shortName: 'Ideal Weight',
        icon: '🎯',
        badge: 'Clinical Ranges',
        subNiche: 'Body Composition',
        description: 'Healthy target weight ranges across Devine, Robinson, Miller, and Hamwi medical formulas.',
      },
      {
        id: 'pace-calculator',
        shortName: 'Running Pace',
        icon: '🏃',
        badge: 'Pace & Splits',
        subNiche: 'Fitness',
        description: 'Calculate running pace per mile or kilometer, finish times, and split intervals.',
      },
      {
        id: 'pregnancy-calculator',
        shortName: 'Pregnancy Due Date',
        icon: '👶',
        badge: 'Naegele Rule',
        subNiche: 'Obstetrics',
        description: 'Estimated date of delivery (EDD) and gestational age based on last menstrual period.',
      },
      {
        id: 'pregnancy-conception-calculator',
        shortName: 'Conception Date',
        icon: '🗓️',
        badge: 'Ovulation Window',
        subNiche: 'Obstetrics',
        description: 'Estimate probable conception dates and fertile window from LMP or due date.',
      },
      {
        id: 'due-date-calculator',
        shortName: 'Clinical Due Date',
        icon: '🩺',
        badge: 'Trimester Timeline',
        subNiche: 'Obstetrics',
        description: 'Complete week-by-week pregnancy milestones and trimester timelines.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Health Calculators?',
    educationSubheading: 'Built for clinical validity, evidence-based formulas, and strict personal health confidentiality',
    educationCards: [
      {
        icon: '🔒',
        title: '100% Client-Side Privacy',
        desc: 'Biometrics, body measurements, and pregnancy timelines are never transmitted over the internet or logged.',
      },
      {
        icon: '🩺',
        title: 'Peer-Reviewed Formulas',
        desc: 'Built upon validated medical equations including WHO BMI classification, Mifflin-St Jeor TDEE, and Naegele’s rule.',
      },
      {
        icon: '🔄',
        title: 'Metric & Imperial Switching',
        desc: 'Seamlessly switch between kilograms/centimeters and pounds/inches with sub-millimeter precision.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Health Calculations',
    faqsSubheading: 'Evidence-based health guidance and clinical formula explanations',
    faqs: [
      {
        question: 'What are the clinical BMI categories established by WHO?',
        answer: 'Underweight: < 18.5; Normal Weight: 18.5 – 24.9; Overweight: 25.0 – 29.9; Class I Obesity: 30.0 – 34.9; Class II: 35.0 – 39.9; Class III: ≥ 40.0.',
      },
      {
        question: 'How accurate is the Mifflin-St Jeor formula for metabolic rate?',
        answer: 'Multiple clinical validation studies have shown the Mifflin-St Jeor formula is within 10% of measured resting metabolic rate, outperforming the older Harris-Benedict formula.',
      },
      {
        question: 'How does Naegele’s rule calculate pregnancy due dates?',
        answer: 'Naegele’s rule takes the first day of the last menstrual period (LMP), adds 1 year, subtracts 3 months, and adds 7 days (assuming a 28-day cycle).',
      },
      {
        question: 'What is the difference between BMR and TDEE?',
        answer: 'BMR (Basal Metabolic Rate) is the energy expended while asleep or at complete rest. TDEE includes daily physical activity, exercise, and the thermic effect of food.',
      },
      {
        question: 'Why does BMI sometimes misclassify muscular individuals?',
        answer: 'BMI measures weight relative to height squared and does not differentiate between dense muscle mass and adipose tissue. Body fat percentage provides better clinical context.',
      },
    ],
  },

  statistics: {
    id: 'statistics',
    name: 'Statistics',
    icon: '📊',
    pillBadge: 'Verified Statistics Calculators',
    headlineHighlight: 'Fast, Accurate & Free.',
    subheadline: 'Pure inferential, probability, and descriptive statistics calculators arranged in a 3-by-3 structure. Tested against standard statistical models.',
    gradient: {
      light: 'from-indigo-600 via-blue-600 to-teal-500',
      dark: 'from-indigo-400 dark:via-blue-300 dark:to-teal-300',
      glow: 'from-indigo-500/20 via-blue-500/10 to-transparent',
      accent: 'indigo',
    },
    tools: [
      {
        id: 'standard-deviation-calculator',
        shortName: 'Std Deviation',
        icon: '📊',
        badge: 'Sample & Pop',
        subNiche: 'Descriptive',
        description: 'Sample and population standard deviation, variance, mean, and sum of squares.',
      },
      {
        id: 'sample-size-calculator',
        shortName: 'Sample Size',
        icon: '🎯',
        badge: 'Confidence Level',
        subNiche: 'Inferential',
        description: 'Statistically significant sample size needed given margin of error and confidence level (95%/99%).',
      },
      {
        id: 'probability-calculator',
        shortName: 'Probability Math',
        icon: '🎲',
        badge: 'Perm & Comb',
        subNiche: 'Probability',
        description: 'Independent, mutually exclusive, and conditional event probabilities with permutations.',
      },
      {
        id: 'confidence-interval-calculator',
        shortName: 'Confidence Interval',
        icon: '📐',
        badge: 'Margin of Error',
        subNiche: 'Inferential',
        description: 'Confidence interval range for sample means and proportions with normal Z and Student t distributions.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Statistics Calculators?',
    educationSubheading: 'Engineered for scientific researchers, data analysts, and students requiring statistical precision',
    educationCards: [
      {
        icon: '📐',
        title: 'Bessel’s Sample Correction',
        desc: 'Automatically applies n-1 degrees of freedom for sample variance to eliminate inferential estimation bias.',
      },
      {
        icon: '🎯',
        title: 'Exact Numerical Precision',
        desc: 'IEEE 754 precision math ensures statistical calculations maintain exact rounding to 6 decimal places.',
      },
      {
        icon: '🔒',
        title: 'Proprietary Dataset Privacy',
        desc: 'Your research samples, survey sizes, and experimental datasets compute purely on your local machine.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Statistics Calculations',
    faqsSubheading: 'Essential inferential and descriptive statistics guidance',
    faqs: [
      {
        question: 'When should I use sample vs population standard deviation?',
        answer: 'Use sample standard deviation (divided by n-1) when analyzing a sample to infer broader population parameters. Use population (divided by N) when you have every data point.',
      },
      {
        question: 'What sample size is needed for a 95% confidence level and 5% margin of error?',
        answer: 'For a large or unknown population, Cochran’s formula yields a sample size requirement of approximately 384 respondents.',
      },
      {
        question: 'What is the difference between mutually exclusive and independent events?',
        answer: 'Mutually exclusive events cannot occur simultaneously (P(A and B) = 0). Independent events do not influence each other’s probability (P(A and B) = P(A) × P(B)).',
      },
      {
        question: 'What does a 95% confidence interval actually mean?',
        answer: 'It means that if you drew repeated samples and computed intervals each time, approximately 95% of those intervals would contain the true population parameter.',
      },
      {
        question: 'When should you use a Student’s t-score instead of a Z-score?',
        answer: 'Use a t-distribution when the sample size is small (n < 30) or when the true population standard deviation is unknown and estimated from the sample.',
      },
    ],
  },

  marketing: {
    id: 'marketing',
    name: 'Marketing',
    icon: '📈',
    pillBadge: 'Verified Marketing Calculators',
    headlineHighlight: 'Fast, Accurate & Clean.',
    subheadline: 'Pure digital acquisition, paid media, and growth analytics calculators arranged in a 3-by-3 structure. Designed for growth marketers and media buyers.',
    gradient: {
      light: 'from-purple-600 via-fuchsia-600 to-pink-500',
      dark: 'from-purple-400 dark:via-fuchsia-300 dark:to-pink-300',
      glow: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
      accent: 'purple',
    },
    tools: [
      {
        id: 'conversion-rate-calculator',
        shortName: 'Conversion Rate',
        icon: '🎯',
        badge: 'Funnel %',
        subNiche: 'CRO',
        description: 'Calculate funnel conversion rates, visitor volume required, and incremental revenue.',
      },
      {
        id: 'cac-calculator',
        shortName: 'CAC Calculator',
        icon: '💳',
        badge: 'Acquisition Cost',
        subNiche: 'Paid Media',
        description: 'Blended and paid Customer Acquisition Cost incorporating total marketing and sales expenditure.',
      },
      {
        id: 'roas-calculator',
        shortName: 'ROAS & Ad Spend',
        icon: '📈',
        badge: 'Ad Return',
        subNiche: 'Paid Media',
        description: 'Return on Ad Spend ratio, break-even ROAS percentage, and net campaign profitability.',
      },
      {
        id: 'email-roi-calculator',
        shortName: 'Email ROI',
        icon: '✉️',
        badge: 'Campaign Yield',
        subNiche: 'Retention',
        description: 'Email campaign return on investment based on open rates, click-through rates, and list size.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Marketing Calculators?',
    educationSubheading: 'Built for paid media buyers, growth operators, and CMOs demanding unit-economic clarity',
    educationCards: [
      {
        icon: '💰',
        title: 'Break-Even ROAS Clarity',
        desc: 'Quickly uncover minimum ROAS thresholds required before running paid campaigns into unprofitable deficits.',
      },
      {
        icon: '🔒',
        title: 'Confidential Ad Spend Data',
        desc: 'Budget totals, customer acquisition figures, and client email sizes never leave your device.',
      },
      {
        icon: '⚡',
        title: 'Real-Time Funnel Modeling',
        desc: 'Model conversion rate uplifts and lifetime customer value impacts with sub-millisecond calculation.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Marketing Calculations',
    faqsSubheading: 'Unit economics, return on ad spend, and conversion rate optimization',
    faqs: [
      {
        question: 'How do you calculate break-even ROAS?',
        answer: 'Break-Even ROAS = 1 ÷ Gross Profit Margin. For example, with a 40% gross margin, break-even ROAS is 1 ÷ 0.40 = 2.50x (or 250%).',
      },
      {
        question: 'What is the difference between Paid CAC and Blended CAC?',
        answer: 'Paid CAC divides paid advertising spend by paid channel customers. Blended CAC divides all sales and marketing costs by all acquired customers across all channels.',
      },
      {
        question: 'What is considered a healthy LTV:CAC ratio for digital businesses?',
        answer: 'A ratio of 3:1 is considered ideal. A 1:1 ratio is unsustainable, while a ratio over 5:1 often means you are underinvesting in customer acquisition growth.',
      },
      {
        question: 'How do you calculate conversion rate?',
        answer: 'Conversion Rate = (Total Conversions ÷ Total Visitors or Clicks) × 100.',
      },
      {
        question: 'How is email marketing ROI calculated?',
        answer: 'Email ROI = ((Revenue from Email Campaign - Total Campaign Cost) ÷ Total Campaign Cost) × 100.',
      },
    ],
  },

  math: {
    id: 'math',
    name: 'Math',
    icon: '📐',
    pillBadge: 'Verified Math Calculators',
    headlineHighlight: 'Fast, Accurate & Free.',
    subheadline: 'Pure core mathematical, trigonometric, and geometric calculators arranged in a 3-by-3 structure. Each calculation provides step-by-step proofs.',
    gradient: {
      light: 'from-blue-600 via-indigo-600 to-violet-600',
      dark: 'from-blue-400 dark:via-indigo-300 dark:to-violet-300',
      glow: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      accent: 'blue',
    },
    tools: [
      {
        id: 'percentage-calculator',
        shortName: 'Percentage Calc',
        icon: '🔢',
        badge: 'Multi-Mode',
        subNiche: 'Core Math',
        description: 'Percentages, percentage increases, percentage decreases, differences, and fractions to percent.',
      },
      {
        id: 'scientific-calculator',
        shortName: 'Scientific Calc',
        icon: '🔬',
        badge: 'Trig & Log',
        subNiche: 'Advanced',
        description: 'Trigonometric functions (sin, cos, tan), logarithms, powers, and roots with full precision.',
      },
      {
        id: 'fraction-calculator',
        shortName: 'Fraction Calculator',
        icon: '➗',
        badge: 'Simplify & Mixed',
        subNiche: 'Core Math',
        description: 'Add, subtract, multiply, and divide proper and mixed fractions with automatic simplification.',
      },
      {
        id: 'triangle-calculator',
        shortName: 'Triangle Geometry',
        icon: '📐',
        badge: 'Pythagoras & Law',
        subNiche: 'Geometry',
        description: 'Right-angle Pythagorean theorem, SAS/SSS triangle solvers, perimeter, and Heron area.',
      },
      {
        id: 'random-number-generator',
        shortName: 'Random Generator',
        icon: '🎲',
        badge: 'Uniform PRNG',
        subNiche: 'Probability',
        description: 'Generate unbiased random numbers and integers within custom ranges without duplicates.',
      },
      {
        id: 'standard-deviation-calculator',
        shortName: 'Variance & Std Dev',
        icon: '📊',
        badge: 'Variance Math',
        subNiche: 'Advanced',
        description: 'Statistical variance, standard deviation, and mean calculations with step-by-step arithmetic.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Math Calculators?',
    educationSubheading: 'Built for mathematical rigor, step-by-step transparency, and high-precision arithmetic',
    educationCards: [
      {
        icon: '🔬',
        title: 'Rational Fraction Arithmetic',
        desc: 'Fractions maintain exact integer numerators and denominators to prevent IEEE 754 floating-point drift.',
      },
      {
        icon: '📐',
        title: 'Step-by-Step Proofs',
        desc: 'Every calculation provides clear intermediate algebraic steps and verified reference formulas.',
      },
      {
        icon: '⚡',
        title: 'Edge Performance',
        desc: 'Complex trigonometric and polynomial functions execute in sub-milliseconds in your local browser.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Math Calculations',
    faqsSubheading: 'Clear mathematical proofs, algebraic rules, and geometric theorems',
    faqs: [
      {
        question: 'How do you calculate percentage increase or decrease?',
        answer: 'Percentage Change = ((New Value - Original Value) ÷ Original Value) × 100. A positive result indicates an increase; negative indicates a decrease.',
      },
      {
        question: 'How do you add fractions with different denominators?',
        answer: 'Find the Least Common Denominator (LCD), convert each fraction so they share the common denominator, add the numerators, and simplify the result.',
      },
      {
        question: 'What is the Pythagorean Theorem formula?',
        answer: 'a² + b² = c², where a and b are the perpendicular legs of a right triangle, and c is the hypotenuse opposite the right angle.',
      },
      {
        question: 'What is Heron’s formula for triangle area?',
        answer: 'Area = √(s(s - a)(s - b)(s - c)), where s is the semi-perimeter: (a + b + c) ÷ 2.',
      },
      {
        question: 'What is the difference between degrees and radians?',
        answer: '180 degrees equals π radians. Radians measure angles by arc length divided by radius, making them natural for calculus and physics.',
      },
    ],
  },

  automotive: {
    id: 'automotive',
    name: 'Automotive',
    icon: '🚗',
    pillBadge: 'Verified Automotive Calculators',
    headlineHighlight: 'Fast, Accurate & Clean.',
    subheadline: 'Pure vehicle ownership, fuel economy, and depreciation calculators arranged in a 3-by-3 structure. Tested against realistic road conditions.',
    gradient: {
      light: 'from-red-600 via-orange-600 to-amber-500',
      dark: 'from-red-400 dark:via-orange-300 dark:to-amber-300',
      glow: 'from-red-500/20 via-orange-500/10 to-transparent',
      accent: 'red',
    },
    tools: [
      {
        id: 'fuel-cost-calculator',
        shortName: 'Fuel Trip Cost',
        icon: '⛽',
        badge: 'Trip Expense',
        subNiche: 'Commute & Travel',
        description: 'Calculate total fuel cost, gallons needed, and cost per passenger for road trips.',
      },
      {
        id: 'mpg-calculator',
        shortName: 'MPG Fuel Economy',
        icon: '🚗',
        badge: 'MPG & L/100km',
        subNiche: 'Vehicle Efficiency',
        description: 'Actual vehicle miles per gallon (MPG) and liters per 100 km between tank fill-ups.',
      },
      {
        id: 'car-depreciation-calculator',
        shortName: 'Car Depreciation',
        icon: '📉',
        badge: 'Resale Curve',
        subNiche: 'Ownership Cost',
        description: 'Estimate future vehicle value, annual depreciation rate, and trade-in equity over 1 to 10 years.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Automotive Calculators?',
    educationSubheading: 'Built for vehicle owners, fleet operators, and road trippers planning commute costs',
    educationCards: [
      {
        icon: '⛽',
        title: 'Dual Unit Fuel Formats',
        desc: 'Seamlessly switch between US MPG, UK Imperial MPG, and European Liters per 100 kilometers.',
      },
      {
        icon: '📉',
        title: 'Exponential Depreciation',
        desc: 'Models realistic automotive depreciation curves including steep 20% first-year vehicle value drops.',
      },
      {
        icon: '🔒',
        title: 'Private Commute Data',
        desc: 'Vehicle mileage logs, travel distances, and purchase prices remain entirely inside your browser.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Automotive Calculations',
    faqsSubheading: 'Vehicle operational economics, fuel consumption, and depreciation curves',
    faqs: [
      {
        question: 'How fast do new cars depreciate over the first few years?',
        answer: 'New cars typically lose roughly 20% of value in their first year, followed by 10% to 15% per year, retaining roughly 40% of initial MSRP after 5 years.',
      },
      {
        question: 'How do you accurately calculate real-world MPG?',
        answer: 'Fill your tank completely and reset the trip odometer. At the next fill-up, divide the trip miles by the exact gallons required to fill the tank.',
      },
      {
        question: 'How do you convert US MPG to Liters per 100 km (L/100km)?',
        answer: 'L/100km = 235.215 ÷ US MPG. For example, 30 MPG equals approximately 7.84 L/100km.',
      },
      {
        question: 'What driving habits have the biggest impact on fuel efficiency?',
        answer: 'Aggressive acceleration and speeding above 60 mph decrease fuel economy by 15% to 30%. Maintaining proper tire pressure recovers up to 3% efficiency.',
      },
      {
        question: 'How does high mileage affect vehicle depreciation?',
        answer: 'The average driver covers 12,000 to 15,000 miles per year. Exceeding this threshold accelerates depreciation deductions on trade-in value.',
      },
    ],
  },

  biology: {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    pillBadge: 'Verified Biology Calculators',
    headlineHighlight: 'Fast, Accurate & Free.',
    subheadline: 'Pure Mendelian genetics, population equilibrium, and microbiology growth calculators arranged in a 3-by-3 structure. Tested against scientific standards.',
    gradient: {
      light: 'from-emerald-600 via-teal-600 to-cyan-600',
      dark: 'from-emerald-400 dark:via-teal-300 dark:to-cyan-300',
      glow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      accent: 'emerald',
    },
    tools: [
      {
        id: 'punnett-square-calculator',
        shortName: 'Punnett Square',
        icon: '🧬',
        badge: 'Mendelian Ratio',
        subNiche: 'Genetics',
        description: 'Monohybrid and dihybrid cross genotypic and phenotypic inheritance ratios.',
      },
      {
        id: 'hardy-weinberg-calculator',
        shortName: 'Hardy-Weinberg',
        icon: '🔬',
        badge: 'Allele Frequency',
        subNiche: 'Population Genetics',
        description: 'Calculate allele frequencies (p, q) and genotype frequencies (p², 2pq, q²) in population genetics.',
      },
      {
        id: 'bacterial-growth-calculator',
        shortName: 'Bacterial Growth',
        icon: '🧫',
        badge: 'Binary Fission',
        subNiche: 'Microbiology',
        description: 'Exponential bacterial population growth, doubling times, and final colony counts.',
      },
      {
        id: 'molecular-weight-calculator',
        shortName: 'Biomolecule Weight',
        icon: '🧪',
        badge: 'DNA / Protein',
        subNiche: 'Molecular Bio',
        description: 'Molecular weight of DNA sequences, oligonucleotides, and amino acid protein chains in Daltons.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Biology Calculators?',
    educationSubheading: 'Built for students, geneticists, and laboratory researchers requiring verified biological modeling',
    educationCards: [
      {
        icon: '🔬',
        title: 'Mendelian & Population Laws',
        desc: 'Calculations adhere strictly to Mendelian segregation ratios and Hardy-Weinberg equilibrium equations.',
      },
      {
        icon: '🧬',
        title: 'Biomolecular Precision',
        desc: 'Accurate Dalton molecular mass determination accounting for dehydration condensation peptide bonding.',
      },
      {
        icon: '⚡',
        title: 'Instant Lab Preparation',
        desc: 'Calculate bacterial doubling kinetics and genotypic probability tables with instant responsive feedback.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Biology Calculations',
    faqsSubheading: 'Classical genetics, microbial growth kinetics, and molecular biochemistry',
    faqs: [
      {
        question: 'What is the expected phenotypic ratio in a heterozygous monohybrid cross (Aa × Aa)?',
        answer: 'A classical 3:1 dominant to recessive phenotypic ratio, and a 1:2:1 genotypic ratio (1 AA : 2 Aa : 1 aa).',
      },
      {
        question: 'What are the assumptions of Hardy-Weinberg equilibrium?',
        answer: 'No natural selection, no mutation, no gene flow (migration), infinitely large population size, and completely random mating.',
      },
      {
        question: 'How is exponential bacterial colony growth calculated?',
        answer: 'N(t) = N₀ × 2^(t ÷ d), where N₀ is initial colony count, t is elapsed time, and d is generation/doubling time.',
      },
      {
        question: 'What is the average molecular weight of an amino acid in a protein?',
        answer: 'Approximately 110 Daltons (Da), which accounts for the loss of a water molecule (18 Da) during peptide bond formation.',
      },
      {
        question: 'What is the average molecular weight of a base pair in double-stranded DNA?',
        answer: 'Approximately 650 Daltons (or 660 g/mol per nucleotide base pair).',
      },
    ],
  },

  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    pillBadge: 'Verified Chemistry Calculators',
    headlineHighlight: 'Fast, Accurate & Free.',
    subheadline: 'Pure stoichiometry, molar mass, dilution, and acid-base pH calculators arranged in a 3-by-3 structure. Built on IUPAC atomic weights.',
    gradient: {
      light: 'from-cyan-600 via-teal-600 to-blue-600',
      dark: 'from-cyan-400 dark:via-teal-300 dark:to-blue-300',
      glow: 'from-cyan-500/20 via-teal-500/10 to-transparent',
      accent: 'cyan',
    },
    tools: [
      {
        id: 'molar-mass-calculator',
        shortName: 'Molar Mass (g/mol)',
        icon: '⚖️',
        badge: 'Periodic Weights',
        subNiche: 'Stoichiometry',
        description: 'Calculate molecular weight and elemental mass percentages from chemical formulas.',
      },
      {
        id: 'solution-dilution-calculator',
        shortName: 'Dilution (M1V1=M2V2)',
        icon: '🧪',
        badge: 'Concentration',
        subNiche: 'Solutions',
        description: 'Calculate stock solution dilution volumes and final molar concentrations.',
      },
      {
        id: 'ph-calculator',
        shortName: 'pH & pOH Solver',
        icon: '🌡️',
        badge: 'Log Hydronium',
        subNiche: 'Acids & Bases',
        description: 'Convert between pH, pOH, [H+] hydronium, and [OH-] hydroxide ion concentrations.',
      },
      {
        id: 'stoichiometry-calculator',
        shortName: 'Stoichiometry',
        icon: '⚗️',
        badge: 'Reagents & Yield',
        subNiche: 'Reactions',
        description: 'Determine limiting reactants, theoretical yield, and percent yield for chemical reactions.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Chemistry Calculators?',
    educationSubheading: 'Built for wet-lab researchers, chemistry students, and chemical engineers',
    educationCards: [
      {
        icon: '⚛️',
        title: 'IUPAC Standard Weights',
        desc: 'Atomic weights reference the latest standard IUPAC periodic tables to 4 decimal places.',
      },
      {
        icon: '🧪',
        title: 'Solution Chemistry Precision',
        desc: 'Exact volumetric dilution math (M₁V₁ = M₂V₂) prevents costly errors when preparing reagents.',
      },
      {
        icon: '⚡',
        title: 'Instant Logarithmic Math',
        desc: 'Precise conversions between hydronium ion molarity and pH/pOH equilibrium values with zero drift.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Chemistry Calculations',
    faqsSubheading: 'Stoichiometric principles, acid-base equilibriums, and laboratory dilutions',
    faqs: [
      {
        question: 'How do you calculate molar mass from a molecular formula?',
        answer: 'Multiply each element’s standard atomic mass by its stoichiometric subscript in the molecular formula, then sum all values.',
      },
      {
        question: 'How does the solution dilution formula (M₁V₁ = M₂V₂) work?',
        answer: 'Because the total moles of solute do not change when solvent is added: Initial Molarity × Initial Volume = Final Molarity × Final Volume.',
      },
      {
        question: 'What is the relationship between pH and pOH at 25°C?',
        answer: 'pH + pOH = 14. pH is the negative base-10 logarithm of hydronium concentration: pH = -log₁₀[H⁺].',
      },
      {
        question: 'How do you determine the limiting reactant in a reaction?',
        answer: 'Convert each reactant mass into moles, divide by its stoichiometric coefficient in the balanced equation; the smallest result is limiting.',
      },
      {
        question: 'What is percent yield in chemical synthesis?',
        answer: 'Percent Yield = (Actual Yield in lab ÷ Theoretical Maximum Yield) × 100.',
      },
    ],
  },

  physics: {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    pillBadge: 'Verified Physics Calculators',
    headlineHighlight: 'Fast, Accurate & Clean.',
    subheadline: 'Pure kinematic, energy, circuit, and projectile motion calculators arranged in a 3-by-3 structure. Built on standard Newtonian and SI physical constants.',
    gradient: {
      light: 'from-violet-600 via-purple-600 to-indigo-600',
      dark: 'from-violet-400 dark:via-purple-300 dark:to-indigo-300',
      glow: 'from-violet-500/20 via-purple-500/10 to-transparent',
      accent: 'violet',
    },
    tools: [
      {
        id: 'velocity-acceleration-calculator',
        shortName: 'Kinematics',
        icon: '🚀',
        badge: 'SUVAT Equations',
        subNiche: 'Mechanics',
        description: 'Solve initial/final velocity, displacement, acceleration, and elapsed time.',
      },
      {
        id: 'kinetic-energy-calculator',
        shortName: 'Kinetic Energy',
        icon: '⚡',
        badge: 'Joules (½mv²)',
        subNiche: 'Energy',
        description: 'Calculate kinetic energy in Joules, object velocity, and mass using classical mechanics.',
      },
      {
        id: 'ohms-law-calculator',
        shortName: "Ohm's Law & Power",
        icon: '🔌',
        badge: 'V = I × R (Watts)',
        subNiche: 'Electromagnetism',
        description: 'Calculate Voltage (V), Current (I), Resistance (R), and Electric Power (W).',
      },
      {
        id: 'projectile-motion-calculator',
        shortName: 'Projectile Motion',
        icon: '🎯',
        badge: 'Range & Apex',
        subNiche: 'Kinematics',
        description: 'Calculate parabolic trajectory, maximum apex height, flight time, and horizontal range.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Physics Calculators?',
    educationSubheading: 'Engineered for physics students, engineers, and scientists requiring verified SI physical equations',
    educationCards: [
      {
        icon: '🚀',
        title: 'Classical Kinematics Rigor',
        desc: 'Solves standard SUVAT kinematic systems with standard Earth gravitational acceleration (g = 9.80665 m/s²).',
      },
      {
        icon: '🔌',
        title: 'Four-Way Ohm’s Law Solver',
        desc: 'Simultaneous cross-calculation between Volts, Amperes, Ohms, and Watts without algebraic trial-and-error.',
      },
      {
        icon: '⚡',
        title: 'Sub-Millisecond Execution',
        desc: 'All quadratic projectile solutions and energy integrals calculate locally in browser memory.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Physics Calculations',
    faqsSubheading: 'Classical mechanics, kinematics, and electrical circuit formulas',
    faqs: [
      {
        question: 'What are the primary kinematic (SUVAT) equations?',
        answer: 'v = u + at, s = ut + ½at², v² = u² + 2as, and s = ½(u + v)t, where u = initial velocity, v = final velocity, a = acceleration, s = displacement, t = time.',
      },
      {
        question: 'How is classical kinetic energy calculated?',
        answer: 'KE = ½mv², where m is mass in kilograms and v is velocity in meters per second, resulting in energy in Joules.',
      },
      {
        question: 'What is Ohm’s Law and how does it relate to electrical power?',
        answer: 'V = I × R (Voltage = Current × Resistance). Electrical power in Watts is P = V × I = I²R = V² ÷ R.',
      },
      {
        question: 'At what launch angle is projectile range maximized?',
        answer: 'At 45 degrees, assuming launch and landing surfaces are at equal elevation and aerodynamic air resistance is neglected.',
      },
      {
        question: 'Does mass affect the rate at which objects fall in a vacuum?',
        answer: 'No. In a vacuum with no air resistance, all objects accelerate downward at identical rates (g ≈ 9.81 m/s²) regardless of mass.',
      },
    ],
  },

  food: {
    id: 'food',
    name: 'Food',
    icon: '🍎',
    pillBadge: 'Verified Food Calculators',
    headlineHighlight: 'Fast, Accurate & Free.',
    subheadline: 'Pure recipe scaling, baker’s percentage, macronutrient, and portion nutrition calculators arranged in a 3-by-3 structure. Designed for chefs and bakers.',
    gradient: {
      light: 'from-orange-600 via-amber-600 to-red-500',
      dark: 'from-orange-400 dark:via-amber-300 dark:to-red-300',
      glow: 'from-orange-500/20 via-amber-500/10 to-transparent',
      accent: 'orange',
    },
    tools: [
      {
        id: 'recipe-scaler-calculator',
        shortName: 'Recipe Scaler',
        icon: '🍲',
        badge: 'Portion Multiplier',
        subNiche: 'Culinary Math',
        description: 'Scale ingredient quantities up or down proportionally by target serving count.',
      },
      {
        id: 'bakers-percentage-calculator',
        shortName: "Baker's Percent",
        icon: '🍞',
        badge: 'Flour Hydration',
        subNiche: 'Baking Science',
        description: 'Calculate dough hydration percentages, salt, yeast, and flour weights for artisan bread.',
      },
      {
        id: 'macronutrient-calculator',
        shortName: 'Macro Split',
        icon: '🥗',
        badge: 'Protein/Carb/Fat',
        subNiche: 'Nutrition',
        description: 'Partition daily caloric intake into gram targets for protein, carbohydrates, and fats.',
      },
      {
        id: 'calorie-per-serving-calculator',
        shortName: 'Nutrition / Serving',
        icon: '🍽️',
        badge: 'Portion Division',
        subNiche: 'Nutrition',
        description: 'Divide total batch calories and nutrients by serving size for meal prep and food labels.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Food Calculators?',
    educationSubheading: 'Built for professional bakers, culinary chefs, and nutrition planners requiring formula precision',
    educationCards: [
      {
        icon: '🍞',
        title: 'Standard Baker’s Percentages',
        desc: 'Flour weight is locked at 100% baseline, allowing instant formulation of dough hydration and starter yeast ratios.',
      },
      {
        icon: '🥗',
        title: 'Standard Atwater Factors',
        desc: 'Calculates macro calories using verified standard energy values (4 kcal/g protein, 4 kcal/g carb, 9 kcal/g fat).',
      },
      {
        icon: '⚖️',
        title: 'Precision Portion Scaling',
        desc: 'Scale catering batches from 4 servings to 400 servings without compounding rounding errors.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Food Calculations',
    faqsSubheading: 'Culinary math, commercial baking hydration, and dietary macro partitioning',
    faqs: [
      {
        question: 'What is Baker’s Percentage and why do professional bakers use it?',
        answer: 'Baker’s percentage sets total flour weight as 100%. All other ingredients (water, salt, yeast) are calculated as a percentage of flour weight, making batch scaling effortless.',
      },
      {
        question: 'What is ideal dough hydration for sourdough bread?',
        answer: 'Standard sandwich loaves use 60% to 65% hydration; artisan sourdough typically ranges between 70% and 80% hydration for an open, airy crumb.',
      },
      {
        question: 'How many calories are in one gram of protein, carbohydrate, and fat?',
        answer: 'Protein yields 4 kcal per gram; Carbohydrates yield 4 kcal per gram; Dietary fat yields 9 kcal per gram.',
      },
      {
        question: 'How do you scale a recipe for a different pan size or serving count?',
        answer: 'Divide desired yield by original recipe yield to get your conversion factor, then multiply each ingredient weight by that factor.',
      },
      {
        question: 'How do you calculate calories per serving for home-cooked meals?',
        answer: 'Sum the total caloric content of all raw ingredients, then divide by the total number of weighed individual portions.',
      },
    ],
  },

  sports: {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    pillBadge: 'Verified Sports Calculators',
    headlineHighlight: 'Fast, Accurate & Clean.',
    subheadline: 'Pure exercise physiology, strength training, and athletic handicap calculators arranged in a 3-by-3 structure. Tested against WHS and athletic research.',
    gradient: {
      light: 'from-blue-600 via-sky-600 to-emerald-500',
      dark: 'from-blue-400 dark:via-sky-300 dark:to-emerald-300',
      glow: 'from-blue-500/20 via-sky-500/10 to-transparent',
      accent: 'blue',
    },
    tools: [
      {
        id: 'heart-rate-zone-calculator',
        shortName: 'Heart Rate Zones',
        icon: '❤️',
        badge: 'Karvonen Zones 1-5',
        subNiche: 'Cardio Training',
        description: 'Calculate target aerobic, threshold, and VO2 max training zones using resting and max HR.',
      },
      {
        id: 'one-rep-max-calculator',
        shortName: 'One-Rep Max (1RM)',
        icon: '🏋️',
        badge: 'Brzycki / Epley',
        subNiche: 'Strength & Conditioning',
        description: 'Estimate maximum single-repetition lift capacity and submaximal training percentages.',
      },
      {
        id: 'golf-handicap-calculator',
        shortName: 'Golf Handicap',
        icon: '⛳',
        badge: 'WHS Differential',
        subNiche: 'Athletic Scoring',
        description: 'Calculate score differentials and official World Handicap System (WHS) index.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Sports Calculators?',
    educationSubheading: 'Built for strength athletes, endurance runners, and golfers seeking data-driven training metrics',
    educationCards: [
      {
        icon: '🏋️',
        title: 'Validated 1RM Equations',
        desc: 'Integrates Brzycki and Epley strength formulas to safely estimate peak lift capacity without injury risk.',
      },
      {
        icon: '❤️',
        title: 'Karvonen Heart Rate Reserve',
        desc: 'Incorporates individual resting pulse to tailor precise Zone 1 to Zone 5 cardiovascular aerobic zones.',
      },
      {
        icon: '🔒',
        title: 'Confidential Athletic Data',
        desc: 'Personal workout numbers, heart metrics, and golf scores remain completely private on your device.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Sports Calculations',
    faqsSubheading: 'Cardiovascular training, strength periodization, and athletic scoring benchmarks',
    faqs: [
      {
        question: 'What is the purpose of Zone 2 cardio training?',
        answer: 'Zone 2 (60% to 70% of max heart rate) maximizes fat oxidation and builds mitochondrial density without placing excess stress on the central nervous system.',
      },
      {
        question: 'How accurate is the Brzycki 1-Rep Max formula?',
        answer: 'The Brzycki equation is highly accurate when using submaximal sets between 2 and 8 repetitions. Formulas become less reliable above 10 reps.',
      },
      {
        question: 'How is a golf score differential calculated under the World Handicap System?',
        answer: 'Score Differential = (Adjusted Gross Score - Course Rating) × (113 ÷ Slope Rating).',
      },
      {
        question: 'How do you calculate Maximum Heart Rate (MHR)?',
        answer: 'The traditional formula is 220 - Age. The Tanaka formula (208 - 0.7 × Age) is considered more accurate for adults over 40.',
      },
      {
        question: 'What percentage of 1RM should you train with for hypertrophy vs power?',
        answer: 'Hypertrophy typically uses 65% to 80% of 1RM for 8 to 12 reps; maximal strength and power training uses 85% to 95% of 1RM for 1 to 5 reps.',
      },
    ],
  },

  ecology: {
    id: 'ecology',
    name: 'Ecology',
    icon: '🌱',
    pillBadge: 'Verified Ecology Calculators',
    headlineHighlight: 'Fast, Accurate & Free.',
    subheadline: 'Pure environmental carbon footprint, residential solar PV, and resource conservation calculators arranged in a 3-by-3 structure.',
    gradient: {
      light: 'from-emerald-600 via-green-600 to-teal-500',
      dark: 'from-emerald-400 dark:via-green-300 dark:to-teal-300',
      glow: 'from-emerald-500/20 via-green-500/10 to-transparent',
      accent: 'emerald',
    },
    tools: [
      {
        id: 'carbon-footprint-calculator',
        shortName: 'Carbon Footprint',
        icon: '🌍',
        badge: 'CO2e Emissions',
        subNiche: 'Emissions',
        description: 'Estimate annual metric tons of CO2 emissions from transportation, home energy, and diet.',
      },
      {
        id: 'solar-energy-calculator',
        shortName: 'Solar PV Output',
        icon: '☀️',
        badge: 'kWh & Savings',
        subNiche: 'Renewables',
        description: 'Calculate annual solar kilowatt-hours generated, system sizing, and utility bill offset.',
      },
      {
        id: 'water-conservation-calculator',
        shortName: 'Water Savings',
        icon: '💧',
        badge: 'Gallons Conserved',
        subNiche: 'Conservation',
        description: 'Gallons of water saved annually with low-flow fixtures and efficient irrigation.',
      },
      {
        id: 'compost-ratio-calculator',
        shortName: 'Compost C:N Ratio',
        icon: '🍂',
        badge: 'Carbon to Nitrogen',
        subNiche: 'Organic Waste',
        description: 'Balance brown carbon-rich and green nitrogen-rich organic matter for optimal 30:1 composting.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Ecology Calculators?',
    educationSubheading: 'Built for sustainability officers, homeowners, and environmental stewards modeling ecological impact',
    educationCards: [
      {
        icon: '🌍',
        title: 'EPA Emission Factors',
        desc: 'Emissions calculations use verified government Greenhouse Gas Equivalency factors for fuel and grid power.',
      },
      {
        icon: '☀️',
        title: 'Solar Irradiance Modeling',
        desc: 'Calculates true residential solar PV generation taking system derate factors and peak sun hours into account.',
      },
      {
        icon: '🔒',
        title: 'Confidential Utility Modeling',
        desc: 'Your electricity bills, gas consumption, and travel miles are computed locally and never shared.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Ecology Calculations',
    faqsSubheading: 'Carbon emissions, renewable solar generation, and resource conservation',
    faqs: [
      {
        question: 'What is the average annual carbon footprint per person?',
        answer: 'The global average is roughly 4 metric tons of CO2e per person. In the United States and Canada, the average footprint is approximately 14 to 16 metric tons.',
      },
      {
        question: 'What is the optimal Carbon-to-Nitrogen (C:N) ratio for backyard composting?',
        answer: 'An ideal ratio is between 25:1 and 30:1. If carbon is too high, decomposition slows; if nitrogen is too high, the pile becomes anaerobic and smelly.',
      },
      {
        question: 'How much electricity does a 5 kW residential solar system generate?',
        answer: 'A 5 kW system typically produces between 6,000 and 7,500 kWh annually, depending on your geographic region’s average peak sun hours.',
      },
      {
        question: 'How much water do low-flow bathroom fixtures save?',
        answer: 'EPA WaterSense fixtures reduce flow from 2.5 GPM to 1.8 GPM or lower, reducing hot water consumption and utility bills by 30% to 50%.',
      },
      {
        question: 'What household changes produce the largest reduction in carbon emissions?',
        answer: 'Switching to heat pumps, installing rooftop solar, driving an electric vehicle or utilizing public transit, and minimizing food waste have the largest measurable impact.',
      },
    ],
  },

  converter: {
    id: 'converter',
    name: 'Converter',
    icon: '🔄',
    pillBadge: 'Verified Converter Calculators',
    headlineHighlight: 'Fast, Accurate & Free.',
    subheadline: 'Pure unit conversion calculators across length, mass, temperature, and volume arranged in a 3-by-3 structure. Built on NIST reference standards.',
    gradient: {
      light: 'from-indigo-600 via-blue-600 to-purple-600',
      dark: 'from-indigo-400 dark:via-blue-300 dark:to-purple-300',
      glow: 'from-indigo-500/20 via-blue-500/10 to-transparent',
      accent: 'indigo',
    },
    tools: [
      {
        id: 'conversion-calculator',
        shortName: 'Universal Converter',
        icon: '🔄',
        badge: 'Multi-Unit',
        subNiche: 'Multi-Unit',
        description: 'Comprehensive unit conversion across length, area, volume, mass, time, and speed.',
      },
      {
        id: 'length-converter',
        shortName: 'Length Converter',
        icon: '📏',
        badge: 'Meters / Feet / In',
        subNiche: 'Distance',
        description: 'Precise conversion between millimeters, centimeters, meters, kilometers, inches, feet, and miles.',
      },
      {
        id: 'weight-converter',
        shortName: 'Weight Converter',
        icon: '⚖️',
        badge: 'Kg / Lbs / Oz',
        subNiche: 'Mass',
        description: 'Convert milligrams, grams, kilograms, metric tons, ounces, pounds, and stones.',
      },
      {
        id: 'temperature-converter',
        shortName: 'Temperature Converter',
        icon: '🌡️',
        badge: 'Celsius & Fahrenheit',
        subNiche: 'Thermal',
        description: 'Convert instantly between Celsius, Fahrenheit, Kelvin, and Rankine scales.',
      },
    ],
    educationHeading: 'Why Use Free Accurate Unit Converters?',
    educationSubheading: 'Built for engineers, scientists, and global professionals requiring exact NIST conversion factors',
    educationCards: [
      {
        icon: '📐',
        title: 'NIST Standards Alignment',
        desc: 'Conversion ratios adhere to National Institute of Standards & Technology official constant specifications.',
      },
      {
        icon: '⚡',
        title: 'Zero Decimal Drift',
        desc: 'Floating-point correction algorithms guarantee exact decimal rounding without standard JavaScript precision errors.',
      },
      {
        icon: '🔒',
        title: '100% Offline-Capable',
        desc: 'All conversion lookup matrices run client-side in sub-milliseconds without server dependency.',
      },
    ],
    faqsHeading: 'Frequently Asked Questions About Unit Conversions',
    faqsSubheading: 'Metric, imperial, and thermodynamic temperature conversion rules',
    faqs: [
      {
        question: 'How do you convert Celsius to Fahrenheit and vice versa?',
        answer: '°F = (°C × 9 ÷ 5) + 32. To convert back: °C = (°F - 32) × 5 ÷ 9.',
      },
      {
        question: 'Exactly how many centimeters are in one inch?',
        answer: 'By international agreement, 1 inch is defined as exactly 2.54 centimeters (or 25.4 millimeters).',
      },
      {
        question: 'What is the difference between a metric ton and an imperial short ton?',
        answer: 'A metric ton (tonne) equals exactly 1,000 kilograms (2,204.62 lbs). A US short ton equals 2,000 pounds (907.18 kg).',
      },
      {
        question: 'How do you convert kilograms to pounds?',
        answer: 'Multiply kilograms by 2.20462. To convert pounds to kilograms, divide by 2.20462.',
      },
      {
        question: 'What is absolute zero in Celsius and Fahrenheit?',
        answer: 'Absolute zero (0 Kelvin) is -273.15°C or -459.67°F, representing the theoretical temperature where all molecular entropy ceases.',
      },
    ],
  },
};
