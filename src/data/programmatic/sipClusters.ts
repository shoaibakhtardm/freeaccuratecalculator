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

// All obsolete SIP scenario records have been permanently removed (forensic URL cleanup).
// The scenario system is retained: add new records here to generate new /finance/sip/[slug]/ pages.
export const SIP_PROGRAMMATIC_DATA: SipClusterPage[] = [];
