// src/data/programmatic/sipClusters.ts

export interface SipClusterPage {
  slug: string;
  monthlyDeposit: number;
  years: number;
  expectedReturnRate: number; // default % p.a.
  title: string;
  metaDescription: string;
  h1: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const SIP_PROGRAMMATIC_DATA: SipClusterPage[] = [
  {
    slug: '5000-monthly-sip-for-10-years',
    monthlyDeposit: 5000,
    years: 10,
    expectedReturnRate: 12,
    title: '₹5,000 Monthly SIP for 10 Years — Maturity Value & Wealth Growth',
    metaDescription: 'Investing ₹5,000 per month for 10 years at 12% return yields ₹11,61,695. See the exact year-by-year investment breakdown, returns, and inflation impact.',
    h1: '₹5,000 Monthly SIP for 10 Years',
    faqs: [
      {
        question: 'How much will ₹5,000 per month grow to in 10 years at 12%?',
        answer: 'At an expected 12% annual return (Annuity Due standard), your total investment of ₹6,00,000 will grow to approximately ₹11,61,695, earning ₹5,61,695 in compounded returns.'
      },
      {
        question: 'What is the tax on ₹5,000 SIP mutual funds after 10 years?',
        answer: 'Under Indian LTCG (Long-Term Capital Gains) rules for equity mutual funds, capital gains exceeding ₹1.25 Lakh in a financial year are taxed at 12.5% without indexation.'
      }
    ]
  },
  {
    slug: '10000-monthly-sip-for-10-years',
    monthlyDeposit: 10000,
    years: 10,
    expectedReturnRate: 12,
    title: '₹10,000 Monthly SIP for 10 Years — Maturity Value & Step-by-Step Proof',
    metaDescription: 'A ₹10,000 monthly mutual fund SIP for 10 years grows to ₹23,23,391 at 12% returns. View the interactive compounding schedule and breakdown.',
    h1: '₹10,000 Monthly SIP for 10 Years',
    faqs: [
      {
        question: 'What is the maturity corpus of a ₹10,000 SIP for 10 years at 12%?',
        answer: 'Your total capital invested will be ₹12,00,000 (120 payments of ₹10,000), yielding an accumulated wealth corpus of ₹23,23,391 with ₹11,23,391 in pure profit.'
      }
    ]
  },
  {
    slug: '10000-monthly-sip-for-15-years',
    monthlyDeposit: 10000,
    years: 15,
    expectedReturnRate: 12,
    title: '₹10,000 Monthly SIP for 15 Years — ₹50 Lakh Wealth Accumulation',
    metaDescription: 'Investing ₹10,000 per month for 15 years yields ₹50,45,760 at 12% p.a. Discover how compounding interest delivers a 180% return on invested capital.',
    h1: '₹10,000 Monthly SIP for 15 Years',
    faqs: [
      {
        question: 'Can a ₹10,000 SIP create ₹50 Lakhs in 15 years?',
        answer: 'Yes. At a 12% CAGR, contributing ₹10,000 monthly for 180 months yields ₹50,45,760 from an invested principal of only ₹18,00,000.'
      }
    ]
  },
  {
    slug: '25000-monthly-sip-for-20-years',
    monthlyDeposit: 25000,
    years: 20,
    expectedReturnRate: 12,
    title: '₹25,000 Monthly SIP for 20 Years — The ₹2.5 Crore Retirement Engine',
    metaDescription: 'Calculate the returns on a ₹25,000 monthly SIP over 20 years. Accumulate ₹2,49,78,740 with ₹60,00,000 invested principal at 12% CAGR.',
    h1: '₹25,000 Monthly SIP for 20 Years',
    faqs: [
      {
        question: 'How much will ₹25,000 SIP be worth after 20 years?',
        answer: 'After 20 years (240 installments), an investor will have deposited ₹60,00,000. At 12% CAGR, the total maturity value reaches ₹2,49,78,740 (approx. ₹2.5 Crore).'
      }
    ]
  },
  {
    slug: '50000-monthly-sip-for-15-years',
    monthlyDeposit: 50000,
    years: 15,
    expectedReturnRate: 12,
    title: '₹50,000 Monthly SIP for 15 Years — ₹2.5 Crore Target Roadmap',
    metaDescription: 'Discover the exact maturity value of ₹50,000 monthly SIP over 15 years. Total maturity reaches ₹2,52,28,801 with ₹90,00,000 invested at 12% returns.',
    h1: '₹50,000 Monthly SIP for 15 Years',
    faqs: [
      {
        question: 'How fast can a ₹50,000 SIP reach ₹2.5 Crore?',
        answer: 'At a 12% annualized return, a monthly SIP of ₹50,000 crosses ₹2.52 Crore in exactly 15 years (180 months).'
      }
    ]
  }
];
