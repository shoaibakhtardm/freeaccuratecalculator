// src/components/SEO/OrphanRescueLinks.tsx
import { REGIONAL_CALCULATOR_NETWORK, type RegionalCalculatorLink } from '../../data/orphanLinks';

export * from '../../data/orphanLinks';

export interface OrphanRescueLinksProps {
  currentCategory?: string;
  currentCountry?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
}

/**
 * Contextually filters the master regional calculator network based on page vertical or country.
 */
export function filterRegionalLinks(props: OrphanRescueLinksProps): RegionalCalculatorLink[] {
  let relevantLinks = REGIONAL_CALCULATOR_NETWORK;

  if (props.currentCategory) {
    const categoryMatches = REGIONAL_CALCULATOR_NETWORK.filter(
      (item) => item.category === props.currentCategory!.toLowerCase()
    );
    if (categoryMatches.length > 0) {
      relevantLinks = categoryMatches;
    }
  }

  if (props.currentCountry) {
    const countryMatches = relevantLinks.filter(
      (item) => item.countryName.toLowerCase() === props.currentCountry!.toLowerCase()
    );
    if (countryMatches.length > 0) {
      relevantLinks = countryMatches;
    }
  }

  return relevantLinks.slice(0, props.limit || 8);
}

export default filterRegionalLinks;
