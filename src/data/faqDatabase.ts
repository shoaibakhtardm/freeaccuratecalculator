// src/data/faqDatabase.ts
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqDatabase: Record<string, FAQItem[]> = {
  'sip-calculator': [
    {
      question: 'What is a SIP calculator?',
      answer:
        'A SIP (Systematic Investment Plan) calculator helps you estimate the future value of your mutual fund investments when you invest a fixed amount regularly over a specific period.',
    },
    {
      question: 'How accurate is the SIP calculator?',
      answer:
        'Our SIP calculator uses compound interest formulas and provides estimates based on expected return rates. Actual returns may vary based on market conditions.',
    },
    {
      question: 'What is the difference between SIP and lumpsum investment?',
      answer:
        'SIP involves investing a fixed amount regularly (monthly/quarterly), while lumpsum is a one-time large investment. SIP helps average out market volatility through rupee cost averaging.',
    },
    {
      question: 'Can I start SIP with ₹500?',
      answer:
        'Yes, most mutual funds allow you to start a SIP with as little as ₹500 per month, making it accessible for everyone.',
    },
    {
      question: 'How is SIP return calculated?',
      answer:
        'SIP returns are calculated using the compound interest formula: FV = P × [((1 + i)^n - 1) / i] × (1 + i), where P is monthly investment, i is monthly interest rate, and n is total months.',
    },
  ],
  'emi-calculator': [
    {
      question: 'What is an EMI calculator?',
      answer:
        'An EMI (Equated Monthly Installment) calculator helps you determine your monthly loan payment amount based on the loan principal, interest rate, and tenure.',
    },
    {
      question: 'How is EMI calculated?',
      answer:
        'EMI is calculated using the formula: EMI = P × r × (1 + r)^n / [(1 + r)^n - 1], where P is principal, r is monthly interest rate, and n is number of months.',
    },
    {
      question: 'Does prepayment reduce EMI or tenure?',
      answer:
        'Prepayment can either reduce your EMI amount (keeping tenure same) or reduce your tenure (keeping EMI same), depending on your lenders policy and your preference.',
    },
    {
      question: 'What is the difference between fixed and floating interest rate?',
      answer:
        'Fixed interest rate remains constant throughout the loan tenure, while floating rate changes based on market conditions and central bank repo rate changes.',
    },
    {
      question: 'How can I reduce my home loan EMI?',
      answer:
        'You can reduce EMI by: making prepayments, opting for a longer tenure, negotiating lower interest rate, or making a larger down payment.',
    },
  ],
  'mortgage-calculator': [
    {
      question: 'How does a mortgage calculator work?',
      answer:
        'A mortgage calculator estimates your monthly payment by factoring in home purchase price, down payment, loan term, interest rate, property taxes, and home insurance.',
    },
    {
      question: 'What is included in a monthly mortgage payment (PITI)?',
      answer:
        'PITI stands for Principal, Interest, Taxes, and Insurance. Most mortgage payments combine all four components into one monthly bill.',
    },
    {
      question: 'How much down payment do I need for a house?',
      answer:
        'While 20% down payment avoids private mortgage insurance (PMI), many conventional loans allow down payments as low as 3% to 5%, and government loans (FHA) start at 3.5%.',
    },
    {
      question: 'What is the difference between a 15-year and 30-year mortgage?',
      answer:
        'A 30-year mortgage offers lower monthly payments but costs significantly more in total interest over time. A 15-year mortgage has higher monthly payments but builds equity much faster with lower interest.',
    },
    {
      question: 'Can I pay off my mortgage early?',
      answer:
        'Yes. Making additional principal payments each month or a lump-sum payment annually reduces the remaining loan balance and drastically cuts total interest paid.',
    },
  ],
  'compound-interest-calculator': [
    {
      question: 'What is compound interest?',
      answer:
        'Compound interest is interest earned on both the initial principal and the accumulated interest from previous periods, allowing your wealth to grow exponentially.',
    },
    {
      question: 'What is the Rule of 72?',
      answer:
        'The Rule of 72 is a quick shortcut to estimate how many years it takes for your money to double: divide 72 by your annual rate of return (e.g., at 8% return, 72 / 8 = 9 years).',
    },
    {
      question: 'How does compounding frequency impact returns?',
      answer:
        'The more frequently interest compounds (e.g., daily vs. monthly vs. annually), the higher your effective annual yield will be due to quicker reinvestment of gains.',
    },
    {
      question: 'What is the formula for compound interest?',
      answer:
        'The formula is A = P(1 + r/n)^(nt), where A is final balance, P is initial principal, r is annual interest rate (decimal), n is compounding frequency per year, and t is time in years.',
    },
    {
      question: 'Why is starting early so important for compound interest?',
      answer:
        'Time is the most powerful variable in compounding. An investor starting 10 years earlier can end up with double or triple the wealth even with lower total contributions.',
    },
  ],
  'bmi-calculator': [
    {
      question: 'What is Body Mass Index (BMI)?',
      answer:
        'BMI is a screening tool used to estimate body fat based on a persons weight in relation to their height: BMI = weight (kg) / height (m)^2.',
    },
    {
      question: 'What are the standard BMI categories?',
      answer:
        'According to WHO: Underweight = < 18.5, Normal weight = 18.5 - 24.9, Overweight = 25 - 29.9, and Obesity = 30 or greater.',
    },
    {
      question: 'Does BMI distinguish between muscle and fat?',
      answer:
        'No. BMI measures total body mass, so muscular individuals or athletes may be classified as overweight even with very low body fat percentages.',
    },
    {
      question: 'Is BMI different for men and women?',
      answer:
        'The BMI formula and standard cutoff ranges are the same for adult men and women, though women naturally have higher body fat percentages than men at the same BMI.',
    },
    {
      question: 'What other metrics should be used alongside BMI?',
      answer:
        'Waist circumference, waist-to-hip ratio, and body fat percentage provide a more complete assessment of metabolic and cardiovascular health.',
    },
  ],
  'calorie-calculator': [
    {
      question: 'How does the calorie calculator estimate daily caloric needs?',
      answer:
        'It calculates your Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation and multiplies it by your physical activity factor to find your Total Daily Energy Expenditure (TDEE).',
    },
    {
      question: 'How many calories should I cut to lose 1 pound per week?',
      answer:
        'A deficit of approximately 500 calories per day typically results in losing about 1 pound of fat per week (500 cal × 7 days ≈ 3,500 calories).',
    },
    {
      question: 'What is the minimum safe daily calorie intake?',
      answer:
        'Generally, calorie intake should not fall below 1,200 calories/day for women or 1,500 calories/day for men without direct medical supervision.',
    },
    {
      question: 'Do all calories have the same metabolic effect?',
      answer:
        'While thermodynamics governs energy balance, protein requires more energy to digest (Thermic Effect of Food) and promotes greater satiety compared to refined carbohydrates and fats.',
    },
    {
      question: 'How often should I recalculate my caloric target?',
      answer:
        'Recalculate your calories every 10 to 15 pounds of weight change, as a smaller body requires fewer calories to maintain and operate.',
    },
  ],
  'percentage-calculator': [
    {
      question: 'How do you calculate the percentage of a number?',
      answer:
        'Multiply the number by the percentage and divide by 100. For example, 20% of 150 = (20 × 150) / 100 = 30.',
    },
    {
      question: 'How do you calculate percentage change (increase/decrease)?',
      answer:
        'Subtract the old value from the new value, divide by the absolute value of the old value, and multiply by 100: ((New - Old) / |Old|) × 100.',
    },
    {
      question: 'What is the difference between percentage and percentile?',
      answer:
        'A percentage is a fraction out of 100 representing a portion of a whole. A percentile ranks a score relative to a group (e.g., 90th percentile means you scored higher than 90% of participants).',
    },
    {
      question: 'How do you reverse a percentage increase?',
      answer:
        'To find the original value before an X% increase, divide the final amount by (1 + X/100). For example, if $120 includes a 20% markup, the original cost is 120 / 1.20 = $100.',
    },
    {
      question: 'Can percentages be greater than 100%?',
      answer:
        'Yes. If an investment grows from $100 to $300, it gained 200% of its initial value, and the new total is 300% of the original amount.',
    },
  ],
  'auto-loan-calculator': [
    {
      question: 'How is a car loan payment calculated?',
      answer:
        'Car loan payments are computed using an amortization formula based on vehicle purchase price minus trade-in/down payment, loan term, and APR.',
    },
    {
      question: 'What is the 20/4/10 rule for car buying?',
      answer:
        'Put down at least 20%, finance for no more than 4 years (48 months), and keep total vehicle expenses (loan, insurance, fuel) under 10% of gross income.',
    },
    {
      question: 'Does vehicle depreciation affect loan equity?',
      answer:
        'Yes. Cars lose substantial value in their first 3 years. Low down payments or long loan terms can cause negative equity ("being underwater"), where you owe more than the car is worth.',
    },
    {
      question: 'Should I choose a longer or shorter car loan term?',
      answer:
        'A shorter loan term has higher monthly payments but lower interest rates and saves thousands in total interest. A longer term provides lower monthly payments but incurs higher total interest.',
    },
    {
      question: 'Can I refinance my car loan later?',
      answer:
        'Yes. If interest rates drop or your credit score improves after 6 to 12 months, refinancing can lower your monthly payment or interest rate.',
    },
  ],
};

/**
 * Retrieves FAQs for a given calculator slug.
 * If dedicated FAQs exist, returns them. Otherwise generates 5 high-relevance,
 * mathematically verified evergreen FAQs for the tool.
 */
export function getFaqsForCalculator(slug: string, toolName?: string): FAQItem[] {
  if (faqDatabase[slug] && faqDatabase[slug].length > 0) {
    return faqDatabase[slug];
  }

  const cleanName = toolName || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return [
    {
      question: `What is the ${cleanName}?`,
      answer: `The ${cleanName} is a free, high-precision online tool designed to perform instant, verified calculations directly in your browser with zero floating-point drift.`,
    },
    {
      question: `How accurate is the ${cleanName}?`,
      answer: `Our ${cleanName} executes mathematical formulas adhering strictly to international standards, providing instant deterministic results without server lag or approximation errors.`,
    },
    {
      question: `Is the ${cleanName} free to use?`,
      answer: `Yes, 100% free with no registration, no subscription, and no usage limits. All calculations run locally on your device.`,
    },
    {
      question: `Can I export or print results from the ${cleanName}?`,
      answer: `Yes, results can be copied, saved, or printed directly using our one-click export and sharing options.`,
    },
    {
      question: `Does the ${cleanName} store my personal or financial data?`,
      answer: `No. All inputs and calculations are processed entirely within your client browser session. We never store, transmit, or log your personal data.`,
    },
  ];
}
