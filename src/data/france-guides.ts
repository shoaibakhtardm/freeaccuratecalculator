// src/data/france-guides.ts

export interface GuideSection {
  heading: string;
  content: string;
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface FranceGuide {
  id: string;
  slug: string;
  category: string;
  categorySlug: string;
  categoryLabel: string;
  badge: string;
  readTime: string;
  icon: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  targetKeyword?: string;
  h1?: string;
  summary: string;
  keywords: string;
  calculator: {
    label: string;
    href: string;
    badge: string;
  };
  relatedGuideSlugs?: string[];
  sections: GuideSection[];
  faqs: GuideFAQ[];
}

export interface FranceGuideCategory {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const FRANCE_GUIDE_CATEGORIES: FranceGuideCategory[] = [
  {
    id: 'impot-revenu',
    slug: 'impot-revenu',
    name: 'Impôt sur le Revenu',
    icon: '💰',
    description: "Barème progressif 2026 à 5 tranches, calcul du TMI, quotient familial et mécanisme de décote.",
    color: 'emerald',
  },
  {
    id: 'frais-reels',
    slug: 'frais-reels',
    name: 'Frais Réels & Déductions',
    icon: '🧾',
    description: "Arbitrage entre abattement forfaitaire de 10% et déduction des frais réels selon l'article 83 du CGI.",
    color: 'emerald',
  },
  {
    id: 'indemnites-kilometriques',
    slug: 'indemnites-kilometriques',
    name: 'Indemnités Kilométriques',
    icon: '🚗',
    description: "Barème officiel DGFIP 2026, calcul par chevaux fiscaux (CV) et majoration de 20% pour véhicules électriques.",
    color: 'teal',
  },
  {
    id: 'tva-entreprise',
    slug: 'tva-entreprise',
    name: 'TVA & Entreprise',
    icon: '🚀',
    description: "Formules HT vers TTC, extraction de TVA et application des 4 taux légaux (20%, 10%, 5,5% et 2,1%).",
    color: 'purple',
  },
  {
    id: 'credit-immobilier',
    slug: 'credit-immobilier',
    name: 'Crédit Immobilier & HCSF',
    icon: '🏠',
    description: "Normes contraignantes HCSF à 35% d'endettement, durée maximale de 25 ans et calcul de mensualité.",
    color: 'sky',
  },
  {
    id: 'logement-apl',
    slug: 'logement-apl',
    name: 'Logement & APL',
    icon: '🏢',
    description: "Barèmes CAF 2026, découpage par zones (1, 2, 3), loyers plafonds et calcul des droits étudiants.",
    color: 'blue',
  },
  {
    id: 'taxe-amenagement',
    slug: 'taxe-amenagement',
    name: "Taxe d'Aménagement",
    icon: '📐',
    description: "Valeurs forfaitaires 2026 (892 € / 1 011 €), abattement de 50% résidence principale et piscines.",
    color: 'cyan',
  },
  {
    id: 'epargne-placements',
    slug: 'epargne-placements',
    name: 'Épargne & Placements',
    icon: '💹',
    description: "Effet boule de neige des intérêts composés, Livret A, LEP, PEA et imposition à la Flat Tax 30%.",
    color: 'amber',
  },
  {
    id: 'retraite-pensions',
    slug: 'retraite-pensions',
    name: 'Retraite & Pensions',
    icon: '🏖️',
    description: "Réforme des retraites, âge légal à 64 ans, 172 trimestres de cotisation et décote/surcote CNAV.",
    color: 'rose',
  },
  {
    id: 'assurance-prevoyance',
    slug: 'assurance-prevoyance',
    name: 'Assurance & Prévoyance',
    icon: '🛡️',
    description: "Résiliation d'assurance emprunteur Loi Lemoine à tout moment, économies TAEA et fin du questionnaire médical.",
    color: 'amber',
  },
  {
    id: 'emploi-salaire',
    slug: 'emploi-salaire',
    name: 'Emploi & Salaire',
    icon: '💼',
    description: "Conversion salaire brut en net pour cadres et non-cadres, calcul d'indemnité légale de licenciement et rupture.",
    color: 'indigo',
  },
];

export const FRANCE_GUIDES: FranceGuide[] = [
  // Guide 1: Income Tax Brackets
  {
    id: 'bareme-impot-revenu-2026',
    slug: 'bareme-impot-revenu-2026',
    category: 'impot-revenu',
    categorySlug: 'impot-revenu',
    categoryLabel: 'Impôt sur le Revenu',
    badge: 'Barème Officiel 2026',
    readTime: '10 min de lecture',
    icon: '📑',
    title: "Impôt sur le Revenu 2026 : Guide Complet - Barèmes, Calcul et Optimisation",
    metaTitle: "Impôt sur le Revenu 2026 : Guide Complet - Barèmes, Calcul et Optimisation",
    metaDescription: "Guide complet sur l'impôt sur le revenu 2026 en France. Découvrez les barèmes, tranches d'imposition, calcul détaillé et stratégies d'optimisation fiscale légales.",
    targetKeyword: "impôt sur le revenu 2026 barème calcul optimisation",
    h1: "Impôt sur le Revenu 2026 : Guide Complet - Barèmes, Calcul et Optimisation",
    summary: "Guide exhaustif sur l'impôt sur le revenu en France en 2026 : barème progressif officiel à 5 tranches, calcul par quotient familial, prélèvement à la source, crédits d'impôt et stratégies d'optimisation fiscale.",
    keywords: "impôt sur le revenu 2026, barème impôt 2026, calcul impôt sur le revenu, tranches imposition France, prélèvement à la source, déclaration revenus 2026, optimisation fiscale, réduction impôt, crédit d'impôt, quotient familial",
    calculator: {
      label: "Simulateur d'Impôt sur le Revenu",
      href: "/countries/france/income-tax-calculator/",
      badge: "Simulateur Officiel",
    },
    relatedGuideSlugs: ['frais-reels-vs-abattement-10', 'bareme-kilometrique-dgfip-2026', 'simulateur-salaire-brut-net-2026'],
    sections: [
      {
        heading: "1. Comprendre l'Impôt sur le Revenu & les Tranches 2026",
        content: `L'impôt sur le revenu est un prélèvement fiscal obligatoire calculé sur les revenus annuels des ménages français. En 2026, le système fiscal français applique un barème progressif avec des taux variant de 0% à 45% selon vos revenus.
        <div class="overflow-x-auto my-4">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Tranche Fiscale (par part)</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Fraction du Revenu Net Imposable</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Taux Marginal (TMI)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">Tranche 1</td><td class="p-3">Jusqu'à 11 600 €</td><td class="p-3 font-semibold text-emerald-600 dark:text-emerald-400">0 % (Non imposable)</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">Tranche 2</td><td class="p-3">De 11 601 € à 29 579 €</td><td class="p-3 font-semibold text-sky-600 dark:text-sky-400">11 %</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">Tranche 3</td><td class="p-3">De 29 580 € à 84 577 €</td><td class="p-3 font-semibold text-indigo-600 dark:text-indigo-400">30 %</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">Tranche 4</td><td class="p-3">De 84 578 € à 181 917 €</td><td class="p-3 font-semibold text-amber-600 dark:text-amber-400">41 %</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-medium">Tranche 5</td><td class="p-3">Au-delà de 181 917 €</td><td class="p-3 font-semibold text-rose-600 dark:text-rose-400">45 %</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm pt-1">Simulez votre impôt exact en quelques clics avec notre <a href="/countries/france/income-tax-calculator/" class="text-indigo-600 dark:text-indigo-400 font-semibold underline">Calculateur d'Impôt France</a>.</p>`,
      },
      {
        heading: "2. Comment Calculer Votre Impôt sur le Revenu (Méthode Étape par Étape)",
        content: `Le calcul de l'impôt sur le revenu suit une méthode progressive par tranches :
        <div class="p-4 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed space-y-1">
          <div><strong>Étape 1 :</strong> Déterminez votre Revenu Net Imposable (RNI) = Somme des revenus après abattement de 10% (ou frais réels).</div>
          <div><strong>Étape 2 :</strong> Calculez votre quotient familial : Q = RNI ÷ Nombre de parts fiscales (N).</div>
          <div><strong>Étape 3 :</strong> Appliquez le barème progressif à la part Q pour chaque tranche franchie.</div>
          <div><strong>Étape 4 :</strong> Multipliez l'impôt obtenu par le nombre total de parts (N) pour avoir l'impôt brut total.</div>
        </div>
        <div class="mt-4 p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm">
          <h4 class="font-bold text-indigo-900 dark:text-indigo-200 mb-2">💡 Exemple de Calcul Détaillé : Couple marié avec 2 enfants (3 parts)</h4>
          <p class="mb-2 text-slate-700 dark:text-slate-300">Hypothèse : Revenu net imposable du foyer = <strong>60 000 €</strong> en 2025.</p>
          <ul class="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            <li>Quotient familial : 60 000 € ÷ 3 parts = <strong>20 000 € par part</strong></li>
            <li>Tranche 1 (0 à 11 600 €) : 11 600 € × 0% = <strong>0 €</strong></li>
            <li>Tranche 2 (11 601 à 20 000 €) : (20 000 - 11 600) × 11% = <strong>924 €</strong></li>
            <li>Impôt par part = <strong>924 €</strong></li>
            <li><strong>Impôt total dû</strong> = 924 € × 3 parts = <strong class="text-indigo-700 dark:text-indigo-300">2 772 €</strong> (Taux moyen réel : 4,62%).</li>
          </ul>
        </div>`,
      },
      {
        heading: "3. Le Prélèvement à la Source & Types de Taux",
        content: `Depuis 2019, l'impôt sur le revenu est prélevé directement à la source chaque mois sur vos fiches de paie, pensions ou allocations.
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <span class="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">🎯 Taux Personnalisé</span>
            <p class="text-xs text-slate-600 dark:text-slate-400">Calculé par la DGFIP d'après votre dernière déclaration de revenus globale du foyer.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <span class="font-bold text-slate-700 dark:text-slate-300 block mb-1">⚖️ Taux Individualisé</span>
            <p class="text-xs text-slate-600 dark:text-slate-400">Permet à des conjoints ayant de gros écarts de revenus de payer chacun un taux adapté sans modifier l'impôt global.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <span class="font-bold text-amber-600 dark:text-amber-400 block mb-1">🛡️ Taux Neutre / Standard</span>
            <p class="text-xs text-slate-600 dark:text-slate-400">Grille barémique appliquée par l'employeur si le contribuable souhaite préserver la confidentialité de son foyer.</p>
          </div>
        </div>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Vous pouvez modifier votre taux ou signaler une variation de revenus à tout moment sur votre espace <a href="https://www.impots.gouv.fr" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 underline">impots.gouv.fr</a>.</p>`,
      },
      {
        heading: "4. Calendrier Fiscal & Dates Limites de Déclaration 2026",
        content: `Tous les contribuables domiciliés fiscalement en France doivent déclarer leurs revenus chaque année, y compris les personnes non imposables.
        <div class="overflow-x-auto my-3">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Zone Géographique</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Départements concernés</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Date limite en ligne</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
              <tr><td class="p-3 font-semibold">Zone 1</td><td class="p-3">Départements 01 à 19 & non-résidents</td><td class="p-3 text-indigo-600 dark:text-indigo-400 font-semibold">Mi-Mai 2026 (23h59)</td></tr>
              <tr><td class="p-3 font-semibold">Zone 2</td><td class="p-3">Départements 20 à 54 (Corse incluse)</td><td class="p-3 text-indigo-600 dark:text-indigo-400 font-semibold">Fin Mai 2026 (23h59)</td></tr>
              <tr><td class="p-3 font-semibold">Zone 3</td><td class="p-3">Départements 55 à 976 (DOM inclus)</td><td class="p-3 text-indigo-600 dark:text-indigo-400 font-semibold">Début Juin 2026 (23h59)</td></tr>
            </tbody>
          </table>
        </div>`,
      },
      {
        heading: "5. Les Réductions et Crédits d'Impôt Principaux",
        content: `Plusieurs dispositifs fiscaux permettent de diminuer directement le montant de l'impôt à payer :
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs sm:text-sm">
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
            <h4 class="font-bold text-slate-900 dark:text-white mb-2">🎁 Réductions d'Impôt</h4>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
              <li><strong>Dons d'intérêt général :</strong> 66% du don (jusqu'à 20% du revenu imposable).</li>
              <li><strong>Dons Coluche (repas/logement) :</strong> 75% du don jusqu'au plafond légal de 1 000 €.</li>
              <li><strong>Investissements locatifs (Pinel, Denormandie, Malraux) :</strong> Réduction selon engagement locatif.</li>
            </ul>
          </div>
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
            <h4 class="font-bold text-slate-900 dark:text-white mb-2">💳 Crédits d'Impôt (Remboursables)</h4>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
              <li><strong>Emploi à domicile :</strong> 50% des dépenses engagées (plafond de 12 000 € à 15 000 €/an).</li>
              <li><strong>Frais de garde jeunes enfants (-6 ans) :</strong> 50% des dépenses plafonnées à 3 500 €/enfant.</li>
              <li><strong>Transition énergétique :</strong> MaPrimeRénov' et aides à la rénovation thermique.</li>
            </ul>
          </div>
        </div>`,
      },
      {
        heading: "6. Stratégies d'Optimisation Fiscale Légales",
        content: `Pour réduire durablement votre imposition sans risque de redressement fiscal :
        <div class="space-y-3 my-3 text-xs sm:text-sm">
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400">1. Frais réels vs Abattement automatique de 10%</h4>
            <p class="text-slate-600 dark:text-slate-300 mt-1">Si vos trajets quotidiens et frais de repas dépassent l'abattement automatique de 10% (max 14 171 €), déduisez vos <a href="/countries/france/frais-reels-abattement/" class="text-indigo-600 dark:text-indigo-400 underline font-semibold">frais réels au barème kilométrique</a>.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400">2. Versements sur Plan Épargne Retraite (PER)</h4>
            <p class="text-slate-600 dark:text-slate-300 mt-1">Les versements volontaires effectués sur un PER individuel sont directement déductibles de votre revenu net global dans la limite du plafond épargne retraite (10% des revenus professionnels).</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400">3. Immobilier Meublé (LMNP Réel)</h4>
            <p class="text-slate-600 dark:text-slate-300 mt-1">Grâce à l'amortissement du bâti et du mobilier, le régime <a href="/countries/france/simulateur-lmnp-reel-micro-bic/" class="text-indigo-600 dark:text-indigo-400 underline font-semibold">LMNP au réel simplifié</a> permet souvent d'effacer 100% de l'impôt sur vos loyers perçus pendant 10 à 15 ans.</p>
          </div>
        </div>`,
      },
      {
        heading: "7. Revenus à Déclarer & Sanctions en Cas de Retard",
        content: `Vous devez déclarer tous les revenus perçus l'année précédente : salaires, primes, retraites, rentes, revenus fonciers, dividendes, plus-values et bénéfices professionnels (BIC, BNC, BA).
        <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1 my-3">
          <p class="font-bold">⚠️ Sanctions prévues par le Code Général des Impôts :</p>
          <ul class="list-disc list-inside space-y-0.5">
            <li><strong>Majoration de 10% :</strong> Dépôt tardif de la déclaration avant mise en demeure.</li>
            <li><strong>Majoration de 40% :</strong> Déclaration déposée dans les 30 jours suivant une mise en demeure ou manquement délibéré.</li>
            <li><strong>Majoration de 80% :</strong> Activité occulte ou manœuvres frauduleuses.</li>
            <li><strong>Intérêts de retard :</strong> 0,20% par mois (soit 2,4% par an).</li>
          </ul>
        </div>`,
      },
    ],
    faqs: [
      {
        question: "À partir de quel revenu paie-t-on des impôts en France en 2026 ?",
        answer: "Pour une personne célibataire sans enfant (1 part), le seuil de mise en recouvrement et le jeu combiné de la décote et de l'abattement de 10% font qu'en dessous d'environ 17 438 € de revenu net annuel, vous n'avez aucun impôt à payer.",
      },
      {
        question: "Comment fonctionne le barème progressif par tranches ?",
        answer: "Le barème est progressif : chaque tranche s'applique uniquement à la portion des revenus comprise entre ses bornes, et jamais à l'intégralité de vos revenus. Le passage dans une tranche supérieure (ex. 30%) n'augmente l'impôt que sur la partie dépassant 29 580 €.",
      },
      {
        question: "Peut-on être imposé alors qu'on ne travaille pas ?",
        answer: "Oui, car l'impôt sur le revenu taxe l'ensemble des ressources perçues : pensions de retraite, allocations chômage, indemnités journalières, revenus locatifs et plus-values financières.",
      },
      {
        question: "Comment contester un avis d'imposition en cas d'erreur ?",
        answer: "Vous pouvez effectuer une réclamation en ligne depuis votre messagerie sécurisée sur impots.gouv.fr jusqu'au 31 décembre de la deuxième année suivant celle de la mise en recouvrement de l'avis contesté.",
      },
    ],
  },

  // Guide 2: Actual Expenses vs 10% Deduction
  {
    id: 'frais-reels-vs-abattement-10',
    slug: 'frais-reels-vs-abattement-10',
    category: 'frais-reels',
    categorySlug: 'frais-reels',
    categoryLabel: 'Frais Réels & Déductions',
    badge: 'Optimisation Fiscale 2026',
    readTime: '9 min de lecture',
    icon: '🧾',
    title: "Frais Réels 2026 : Guide Complet - Déductions Impôts et Optimisation",
    metaTitle: "Frais Réels 2026 : Guide Complet - Déductions Impôts et Optimisation",
    metaDescription: "Guide complet sur les frais réels déductibles 2026. Découvrez comment déduire vos frais professionnels, kilométriques, repas et réduire votre impôt sur le revenu légalement.",
    targetKeyword: "frais réels 2026 déduction impôts optimisation barème",
    h1: "Frais Réels 2026 : Guide Complet - Déductions Impôts et Optimisation",
    summary: "Guide complet sur l'option des frais réels déductibles en 2026 : barèmes kilométriques, forfaits repas, télétravail, double résidence, matériel professionnel et comparaison avec l'abattement automatique de 10%.",
    keywords: "frais réels 2026, déduction impôt frais professionnels, frais kilométriques barème, abattement 10% salaire, optimisation fiscale salariés, déclarer frais réels, frais repas déductibles, frais télétravail impôt, justificatifs frais réels, plafond frais réels",
    calculator: {
      label: "Simulateur Frais Réels vs 10%",
      href: "/countries/france/frais-reels-abattement/",
      badge: "Simulateur Comparateur",
    },
    relatedGuideSlugs: ['bareme-impot-revenu-2026', 'bareme-kilometrique-dgfip-2026', 'simulateur-salaire-brut-net-2026'],
    sections: [
      {
        heading: "1. Qu'est-ce que les Frais Réels & Comparatif avec l'Abattement de 10%",
        content: `Les frais réels sont des dépenses professionnelles courantes que tout salarié peut déduire de ses revenus imposables au lieu de l'abattement forfaitaire automatique de 10% (article 83 du CGI).
        <div class="overflow-x-auto my-3">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Dispositif Fiscal</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Fonctionnement</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Plafonds 2026</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td class="p-3 font-semibold text-slate-900 dark:text-white">Abattement Forfaitaire 10%</td>
                <td class="p-3">Automatique sans aucun justificatif requis</td>
                <td class="p-3 font-medium text-slate-700 dark:text-slate-300">Min 509 € / Max 14 555 € / personne</td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td class="p-3 font-semibold text-indigo-600 dark:text-indigo-400">Déduction des Frais Réels</td>
                <td class="p-3">Sur option avec conservation des justificatifs 3 ans</td>
                <td class="p-3 font-semibold text-indigo-600 dark:text-indigo-400">Aucun plafond global (justifié à l'euro près)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300"><strong>Règle d'or :</strong> Dès lors que le total de vos dépenses professionnelles réelles dépasse 10% de votre rémunération nette fiscale, vous devez cocher l'option des frais réels sur votre déclaration.</p>`,
      },
      {
        heading: "2. Les 7 Catégories de Frais Professionnels Déductibles",
        content: `L'administration fiscale autorise la déduction d'un large éventail de frais engagés pour les besoins de votre activité :
        <div class="space-y-3 my-3 text-xs sm:text-sm">
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
            <h4 class="font-bold text-slate-900 dark:text-white">🚗 1. Frais de Déplacement & Transport</h4>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 mt-1">
              <li><strong>Barème kilométrique officiel :</strong> Déduction des trajets domicile-travail (jusqu'à 40 km aller, soit 80 km/jour, sans justificatif d'éloignement). Au-delà de 40 km, des contraintes familiales ou professionnelles doivent être justifiées.</li>
              <li><strong>Transports en commun :</strong> Part de l'abonnement Navigo / TER non remboursée par l'employeur, tickets de péage et frais de parking sur le lieu de travail.</li>
              <li><strong>Intérêts d'emprunt véhicule :</strong> Déductibles au prorata de l'usage professionnel.</li>
            </ul>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
            <h4 class="font-bold text-slate-900 dark:text-white">🍽️ 2. Frais Supplémentaires de Repas</h4>
            <p class="text-slate-600 dark:text-slate-300 mt-1">Si vos horaires ou la distance vous empêchent de rentrer déjeuner chez vous : déduction de la différence entre le prix réel payé (facture restaurant/traiteur) et le coût forfaitaire d'un repas à domicile (<strong>5,90 €</strong>), plafonnée à <strong>20,70 €</strong> par repas (hors cantine).</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
            <h4 class="font-bold text-slate-900 dark:text-white">💻 3. Frais de Télétravail à Domicile</h4>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 mt-1">
              <li><strong>Forfait simplifié :</strong> 2,60 € à 2,70 € par jour de télétravail (soit 59,40 €/mois ou 650 €/an sans justificatif de facture).</li>
              <li><strong>Frais réels justifiés :</strong> Quote-part de loyer/surface dédiée, électricité, abonnement internet fibre, chauffage.</li>
            </ul>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
            <h4 class="font-bold text-slate-900 dark:text-white">🏢 4. Double Résidence, Formation & Matériel</h4>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 mt-1">
              <li><strong>Double résidence :</strong> Loyer du second logement temporaire, taxe d'habitation, trajets hebdomadaires de retour.</li>
              <li><strong>Formations & documentation :</strong> Stages non financés par le CPF/employeur, revues techniques, adhésions syndicales.</li>
              <li><strong>Équipements informatiques :</strong> Ordinateur, écran, mobilier de bureau, vêtements spécifiques (EPI, blouses, uniformes obligatoires). Les biens de plus de 500 € HT s'amortissent sur 3 ans.</li>
            </ul>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200">
          ⚠️ <strong>Attention :</strong> Les frais de garde d'enfants ne sont <strong>pas déductibles</strong> en frais réels (ils ouvrent droit à un crédit d'impôt séparé de 50% plafonné à 3 500 €/enfant).
        </div>`,
      },
      {
        heading: "3. Exemple Concret de Calcul de Gain Fiscal",
        content: `Prenons le cas de Marie, commerciale, percevant <strong>35 000 € net imposable</strong> avec une TMI à 30%. Elle parcourt 15 000 km/an avec son véhicule 5 CV :
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs sm:text-sm">
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50">
            <h4 class="font-bold text-slate-900 dark:text-white mb-2">Option 1 : Abattement 10% Forfaitaire</h4>
            <p class="text-slate-600 dark:text-slate-400">Déduction automatique :</p>
            <p class="text-lg font-bold text-slate-900 dark:text-white font-mono mt-1">35 000 € × 10% = 3 500 €</p>
          </div>
          <div class="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/40">
            <h4 class="font-bold text-emerald-900 dark:text-emerald-200 mb-2">Option 2 : Frais Réels Détaillés</h4>
            <ul class="space-y-1 font-mono text-slate-700 dark:text-slate-300 text-xs">
              <li>• Kilomètres (15 000 km 5 CV) : 6 750 €</li>
              <li>• Repas (150 repas × 5,90 €) : 885 €</li>
              <li>• Télétravail & Matériel : 750 €</li>
              <li><strong>Total Frais Réels = 8 385 €</strong></li>
            </ul>
          </div>
        </div>
        <div class="p-4 rounded-xl bg-indigo-900 text-white space-y-1 text-xs sm:text-sm">
          <p class="font-bold text-indigo-200">🎯 Bilan de l'Arbitrage :</p>
          <p>Assiette imposable réduite de <strong>8 385 € - 3 500 € = 4 885 € supplémentaires</strong>.</p>
          <p class="text-emerald-300 font-bold text-sm sm:text-base">Économie d'impôt nette = 4 885 € × 30% (TMI) = + 1 465,50 € d'impôts économisés.</p>
        </div>`,
      },
      {
        heading: "4. Comment Déclarer Vos Frais Réels sur impots.gouv.fr",
        content: `La déclaration s'effectue simplement lors de votre déclaration de revenus en ligne de printemps :
        <ol class="list-decimal list-inside space-y-2 my-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>À l'étape 3 "Revenus", cochez la case <strong>"Frais réels"</strong> (cases <strong>1AK</strong> pour le déclarant 1, <strong>1BK</strong> pour le conjoint).</li>
          <li>Indiquez le montant global total de vos frais sans joindre de pièces justificatives.</li>
          <li>Précisez dans la note explicative de fin de déclaration le détail sommaire (modèle de véhicule, puissance fiscale CV, distance domicile-travail et nombre de repas).</li>
          <li>Conservez impérativement tous vos reçus, factures et relevés kilométriques pendant <strong>3 ans</strong> (délai de reprise de la DGFiP).</li>
        </ol>`,
      },
      {
        heading: "5. Pièges & Erreurs Fréquentes à Éviter",
        content: `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs sm:text-sm">
          <div class="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/20">
            <h4 class="font-bold text-rose-900 dark:text-rose-200">❌ Erreurs Classiques</h4>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 mt-1">
              <li>Déduire les frais de garde d'enfants en frais réels (invalide).</li>
              <li>Oublier de déduire les remboursements de l'employeur (ex: indemnités de transport ou tickets restaurant).</li>
              <li>Perdre les justificatifs de carburant ou de garage.</li>
            </ul>
          </div>
          <div class="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/20">
            <h4 class="font-bold text-emerald-900 dark:text-emerald-200">✅ Bonnes Pratiques</h4>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 mt-1">
              <li>Tenir un carnet de bord mensuel des trajets professionnels avec dates et motifs.</li>
              <li>Pour les couples mariés/pacsés : chaque conjoint choisit librement son option indépendamment de l'autre.</li>
              <li>Utiliser un tableur ou simulateur dédié pour vérifier la rentabilité avant soumission.</li>
            </ul>
          </div>
        </div>`,
      },
    ],
    faqs: [
      {
        question: "Peut-on déclarer les frais réels sans conserver les justificatifs ?",
        answer: "Non. En cas de contrôle sur pièces par l'administration fiscale, l'absence de justificatifs valables (tickets, factures d'entretien, calendrier de télétravail) entraîne la réintégration automatique du forfait 10% avec pénalités et intérêts de retard.",
      },
      {
        question: "Les frais de trajet domicile-travail sont-ils toujours déductibles ?",
        answer: "Oui, dans la limite de 40 kilomètres aller (80 km aller-retour par jour). Au-delà de 40 km, vous devez être en mesure de justifier d'un motif d'éloignement valable (emploi du conjoint, précarité de l'emploi, problème de santé familial ou marché local de l'emploi).",
      },
      {
        question: "Chaque conjoint d'un couple marié peut-il choisir une option différente ?",
        answer: "Absolument. Au sein d'un même foyer fiscal (mariage ou PACS), un conjoint peut opter pour les frais réels en case 1AK tandis que l'autre conserve l'abattement automatique de 10% en case 1BK.",
      },
      {
        question: "Les indemnités kilométriques versées par l'employeur sont-elles imposables ?",
        answer: "Non, les indemnités forfaitaires versées par l'employeur dans la limite du barème officiel sont exonérées d'impôt. Cependant, si vous optez pour les frais réels, vous devez soit les déduire du total de vos frais, soit les réintégrer à vos salaires bruts imposables.",
      },
    ],
  },

  // Guide 3: Mileage Allowance
  {
    id: 'bareme-kilometrique-dgfip-2026',
    slug: 'bareme-kilometrique-dgfip-2026',
    category: 'indemnites-kilometriques',
    categorySlug: 'indemnites-kilometriques',
    categoryLabel: 'Indemnités Kilométriques',
    badge: 'Arrêté DGFIP 2026',
    readTime: '10 min de lecture',
    icon: '🚗',
    title: "Indemnités Kilométriques 2026 : Barème Officiel DGFIP, Calcul et Majoration Électrique",
    metaTitle: "Barème Kilométrique 2026 : Calcul DGFIP, Voitures, Motos et Bonus Électrique",
    metaDescription: "Guide complet sur les indemnités kilométriques 2026 en France. Découvrez les formules officielles DGFIP par CV, la majoration de 20% pour les véhicules électriques et les règles de déduction fiscale.",
    targetKeyword: "barème kilométrique 2026 calcul indemnités dgfip voiture électrique",
    h1: "Indemnités Kilométriques 2026 : Barème Officiel DGFIP, Calcul et Majoration Électrique",
    summary: "Guide complet du barème kilométrique officiel publié par la DGFIP en 2026 : formules par puissance fiscale (de 3 CV à 7 CV et plus), majoration légale de 20% pour les véhicules 100% électriques, règle des 40 km et méthode de déclaration.",
    keywords: "barème kilométrique 2026, calcul indemnités kilométriques, dgfip cv chevaux fiscaux, voiture électrique majoration 20%, frais de déplacement impôts, carnet de bord kilométrique, frais réels transport",
    calculator: {
      label: "Calculateur d'Indemnités Kilométriques",
      href: "/countries/france/indemnites-kilometriques/",
      badge: "Formule Officielle DGFIP",
    },
    relatedGuideSlugs: ['frais-reels-vs-abattement-10', 'bareme-impot-revenu-2026', 'conversion-salaire-brut-en-net-france'],
    sections: [
      {
        heading: "1. Qu'est-ce que le Barème Kilométrique DGFIP ?",
        content: `Le barème kilométrique officiel est fixé chaque année par arrêté ministériel conjoint du ministère de l'Économie et du Budget. Il permet aux salariés, aux dirigeants et aux indépendants utilisant leur véhicule personnel à des fins professionnelles de déduire un forfait global représentatif de leurs coûts d'utilisation.
        <div class="p-4 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>Ce que couvre le barème kilométrique :</strong> La dépréciation du véhicule (usure et amortissement), les frais d'entretien et de réparations mécaniques, les dépenses de pneumatiques, la prime d'assurance annuelle et la consommation de carburant ou d'électricité.
          <br><br>
          <strong>Ce qui peut être déduit en sus :</strong> Les frais de péage d'autoroute et de stationnement payant professionnel, ainsi que les intérêts d'emprunt liés à l'achat du véhicule (au prorata de l'usage professionnel).
        </div>`,
      },
      {
        heading: "2. Les Formules Officielles Automobiles 2026 par Puissance Fiscale (CV)",
        content: `Le barème officiel pour les voitures thermiques et hybrides est structuré en trois tranches de distance annuelle parcourue (d = distance totale en kilomètres) :
        <div class="overflow-x-auto my-4">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Puissance Fiscale</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Jusqu'à 5 000 km</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">De 5 001 à 20 000 km</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Au-delà de 20 000 km</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-xs">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-semibold font-sans">3 CV et moins</td><td class="p-3">d × 0,529 €</td><td class="p-3">(d × 0,316 €) + 1 065 €</td><td class="p-3">d × 0,370 €</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-semibold font-sans">4 CV</td><td class="p-3">d × 0,606 €</td><td class="p-3">(d × 0,340 €) + 1 330 €</td><td class="p-3">d × 0,407 €</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-semibold font-sans text-indigo-600 dark:text-indigo-400">5 CV (Standard)</td><td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">d × 0,636 €</td><td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">(d × 0,357 €) + 1 395 €</td><td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">d × 0,427 €</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-semibold font-sans">6 CV</td><td class="p-3">d × 0,665 €</td><td class="p-3">(d × 0,374 €) + 1 457 €</td><td class="p-3">d × 0,447 €</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-semibold font-sans">7 CV et plus</td><td class="p-3">d × 0,697 €</td><td class="p-3">(d × 0,394 €) + 1 515 €</td><td class="p-3">d × 0,470 €</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm">Calculez instantanément votre indemnité avec notre <a href="/countries/france/indemnites-kilometriques/" class="text-indigo-600 dark:text-indigo-400 font-semibold underline">Calculateur d'Indemnités Kilométriques 2026</a>.</p>`,
      },
      {
        heading: "3. La Majoration Légale de 20 % pour les Véhicules 100 % Électriques",
        content: `Afin d'encourager la transition écologique du parc automobile, l'article 83 du Code Général des Impôts prévoit une <strong>majoration automatique de 20 %</strong> sur le montant total des indemnités calculées selon le barème de base pour tous les véhicules 100 % électriques.
        <div class="p-4 my-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
          <h4 class="font-bold mb-1">⚡ Exemple de Majoration pour une Peugeot e-208 ou Tesla Model 3 (5 CV) parcourant 14 000 km :</h4>
          <ul class="space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300">
            <li>1. Calcul base thermique : (14 000 km × 0,357 €) + 1 395 € = <strong>6 393,00 €</strong></li>
            <li>2. Application du bonus électrique : 6 393,00 € × 1,20 = <strong class="text-emerald-700 dark:text-emerald-300">7 671,60 € déductibles</strong></li>
            <li><strong>Gain net supplémentaire déduit :</strong> + 1 278,60 € d'assiette fiscale !</li>
          </ul>
        </div>`,
      },
      {
        heading: "4. Barème pour les Deux-Roues (Motos et Scooters)",
        content: `Les deux-roues motorisés bénéficient de grilles dédiées selon la cylindrée :
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs sm:text-sm">
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-slate-900 dark:text-white mb-2">🛵 Cyclomoteurs (≤ 50 cm³)</h4>
            <ul class="space-y-1 font-mono text-slate-600 dark:text-slate-400 text-xs">
              <li>• Jusqu'à 2 000 km : d × 0,315 €</li>
              <li>• De 2 001 à 5 000 km : (d × 0,079 €) + 471 €</li>
              <li>• Au-delà de 5 000 km : d × 0,173 €</li>
            </ul>
          </div>
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-slate-900 dark:text-white mb-2">🏍️ Motos (> 50 cm³, ex: 3 à 5 CV)</h4>
            <ul class="space-y-1 font-mono text-slate-600 dark:text-slate-400 text-xs">
              <li>• Jusqu'à 3 000 km : d × 0,468 €</li>
              <li>• De 3 001 à 6 000 km : (d × 0,099 €) + 1 107 €</li>
              <li>• Au-delà de 6 000 km : d × 0,284 €</li>
            </ul>
          </div>
        </div>
        <p class="text-xs text-slate-500">Les deux-roues 100% électriques bénéficient également de la majoration de 20 %.</p>`,
      },
      {
        heading: "5. Règles du Trajet Domicile-Travail & Plafond des 40 km",
        content: `Pour la déduction des trajets réguliers entre le domicile et le lieu de travail :
        <ul class="list-disc list-inside space-y-1.5 my-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li><strong>Distance inférieure ou égale à 40 km aller (80 km/jour) :</strong> La déduction est admise de plein droit sans avoir à justifier de l'éloignement.</li>
          <li><strong>Distance supérieure à 40 km aller :</strong> La déduction est plafonnée à 40 km, sauf si vous pouvez justifier de contraintes professionnelles (mutations, horaires atypiques) ou familiales (emploi du conjoint, santé, scolarité des enfants).</li>
          <li><strong>Allers-retours limités à 1 par jour :</strong> Sauf impossibilité de se restaurer sur le lieu de travail ou obligations d'assistance médicale.</li>
        </ul>`,
      },
      {
        heading: "6. Justificatifs Obligatoires & Carnet de Bord",
        content: `En cas de contrôle sur pièces de l'administration fiscale, vous devez pouvoir présenter :
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-xs sm:text-sm space-y-2">
          <p><strong>1. La carte grise du véhicule :</strong> Le véhicule doit être immatriculé au nom du salarié (ou du conjoint marié/pacsé). Les véhicules en leasing (LOA/LLD) sont admis.</p>
          <p><strong>2. Un carnet de bord chronologique :</strong> Tableau indiquant les dates de déplacement, les lieux de départ/arrivée, les motifs professionnels précis et le kilométrage exact.</p>
          <p><strong>3. Factures d'entretien et de carburant :</strong> Attestant du kilométrage réel au compteur lors des révisions et contrôles techniques.</p>
        </div>`,
      },
    ],
    faqs: [
      {
        question: "Comment calculer ses indemnités kilométriques avec une voiture électrique en 2026 ?",
        answer: "Appliquez la formule officielle correspondant à la puissance fiscale (CV) et au kilométrage total parcouru, puis multipliez le résultat brut obtenu par 1,20 pour intégrer la majoration légale de 20 % réservée aux véhicules électriques.",
      },
      {
        question: "Les frais de péage et de stationnement sont-ils inclus dans le barème kilométrique ?",
        answer: "Non. Le barème kilométrique couvre le carburant, l'assurance, l'entretien et l'usure du véhicule. Les péages autoroutiers et les tickets de stationnement engagés pour des besoins professionnels s'ajoutent en sus sur présentation des justificatifs.",
      },
      {
        question: "Que se passe-t-il si mon trajet domicile-travail dépasse 40 km ?",
        answer: "Sans justification recevable de contrainte familiale ou professionnelle, l'administration fiscale limite la déduction à 40 km aller (soit 80 km aller-retour par jour de travail effectif).",
      },
      {
        question: "Puis-je utiliser le barème kilométrique avec un véhicule en leasing (LOA ou LLD) ?",
        answer: "Oui, les véhicules loués en LOA ou LLD peuvent utiliser le barème kilométrique à condition de ne pas déduire en plus les loyers de location.",
      },
    ],
  },

  // Guide 4: VAT Calculation
  {
    id: 'calcul-tva-france-taux-formules',
    slug: 'calcul-tva-france-taux-formules',
    category: 'tva-entreprise',
    categorySlug: 'tva-entreprise',
    categoryLabel: 'TVA & Entreprise',
    badge: 'Code Général des Impôts',
    readTime: '10 min de lecture',
    icon: '🧾',
    title: "Calcul de TVA en France : Formules Hors Taxe (HT), TTC, Auto-Entrepreneur et les 4 Taux 2026",
    metaTitle: "Calculateur de TVA France 2026 : Formules HT/TTC, Extraction et Taux Officiels",
    metaDescription: "Guide complet sur la TVA en France en 2026. Maîtrisez le calcul HT vers TTC, l'extraction de TVA, les seuils de franchise auto-entrepreneur et les 4 taux officiels (20%, 10%, 5,5%, 2,1%).",
    targetKeyword: "calcul TVA France 2026 taux 20 10 5.5 formule HT TTC",
    h1: "Calcul de TVA en France : Formules HT/TTC, Extraction et les 4 Taux Officiels 2026",
    summary: "Méthodes officielles de calcul de la taxe sur la valeur ajoutée (TVA) en France : passage du HT au TTC, extraction du montant de TVA, seuils de franchise en base de TVA pour auto-entrepreneurs et champ d'application des 4 taux légaux.",
    keywords: "calcul tva france 2026, calculateur tva hors taxe ttc, taux tva 20 10 5.5 2.1, formule extraction tva, franchise en base tva auto entrepreneur, déclaration ca3 ca12 bercy",
    calculator: {
      label: "Calculateur de TVA France",
      href: "/countries/france/vat-calculator/",
      badge: "Tous Taux Français Inclus",
    },
    relatedGuideSlugs: ['conversion-salaire-brut-en-net-france', 'bareme-impot-revenu-2026'],
    sections: [
      {
        heading: "1. Les 4 Taux Officiels de TVA en France et Leurs Champs d'Application",
        content: `La France applique quatre taux de TVA selon la nature du bien ou du service commercialisé (articles 278 et suivants du CGI) :
        <div class="overflow-x-auto my-4">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Taux Légal</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Dénomination</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Secteurs & Biens Concernés</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-bold text-indigo-600 dark:text-indigo-400 font-mono">20,0 %</td><td class="p-3 font-semibold">Taux Normal</td><td class="p-3">Majorité des biens de consommation, prestations de services informatiques, conseils, honoraires, véhicules neufs et électroménager.</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-bold text-sky-600 dark:text-sky-400 font-mono">10,0 %</td><td class="p-3 font-semibold">Taux Intermédiaire</td><td class="p-3">Restauration sur place, hébergement hôtelier, transports publics de voyageurs, travaux de rénovation et d'entretien dans les logements de plus de 2 ans.</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-bold text-emerald-600 dark:text-emerald-400 font-mono">5,5 %</td><td class="p-3 font-semibold">Taux Réduit</td><td class="p-3">Alimentation de première nécessité, abonnements gaz et électricité, cantines scolaires, livres physiques/numériques et travaux de rénovation énergétique RGE.</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-bold text-amber-600 dark:text-amber-400 font-mono">2,1 %</td><td class="p-3 font-semibold">Taux Particulier</td><td class="p-3">Médicaments remboursables par la Sécurité sociale, presse d'information politique et générale et redevance audiovisuelle.</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm">Effectuez tous vos calculs instantanément avec notre <a href="/countries/france/vat-calculator/" class="text-indigo-600 dark:text-indigo-400 font-semibold underline">Calculateur de TVA France</a>.</p>`,
      },
      {
        heading: "2. Formules Mathématiques : Passage HT / TTC et Extraction",
        content: `Les équations comptables officielles pour manipuler la TVA :
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs sm:text-sm">
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50">
            <h4 class="font-bold text-slate-900 dark:text-white mb-1">Passer du HT au TTC</h4>
            <div class="font-mono text-indigo-600 dark:text-indigo-400 text-xs">TTC = HT × (1 + Taux / 100)</div>
            <p class="text-slate-500 text-[11px] mt-1">Ex: 100 € HT à 20% = 100 × 1,20 = 120,00 € TTC</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50">
            <h4 class="font-bold text-slate-900 dark:text-white mb-1">Extraire le HT du TTC</h4>
            <div class="font-mono text-indigo-600 dark:text-indigo-400 text-xs">HT = TTC ÷ (1 + Taux / 100)</div>
            <p class="text-slate-500 text-[11px] mt-1">Ex: 120 € TTC à 20% = 120 ÷ 1,20 = 100,00 € HT</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50">
            <h4 class="font-bold text-slate-900 dark:text-white mb-1">Calculer la TVA Seule</h4>
            <div class="font-mono text-indigo-600 dark:text-indigo-400 text-xs">TVA = TTC - HT</div>
            <p class="text-slate-500 text-[11px] mt-1">Ex: 120 € TTC - 100 € HT = 20,00 € de TVA</p>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
          💡 <strong>Astuce rapide "Diviser par 6" :</strong> Pour une facture à 20%, le montant de la TVA est exactement égal à <code>TTC ÷ 6</code> (puisque 20 / 120 = 1/6). Pour 600 € TTC, la TVA est de 100 €.
        </div>`,
      },
      {
        heading: "3. Auto-Entrepreneurs : Seuils de Franchise en Base de TVA 2026",
        content: `Les micro-entreprises bénéficient du régime de la franchise en base de TVA (article 293 B du CGI) tant que leur chiffre d'affaires annuel reste sous les seuils réglementaires :
        <div class="overflow-x-auto my-3">
          <table class="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 font-semibold">
              <tr>
                <th class="p-2.5 border-b">Activité Professionnelle</th>
                <th class="p-2.5 border-b">Seuil de Base (Franchise)</th>
                <th class="p-2.5 border-b">Seuil Majoré (Tolérance)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
              <tr><td class="p-2.5 font-sans font-medium">Prestations de services (BNC / BIC)</td><td class="p-2.5">36 800 €</td><td class="p-2.5 text-rose-600 dark:text-rose-400">39 100 €</td></tr>
              <tr><td class="p-2.5 font-sans font-medium">Vente de marchandises / Hébergement</td><td class="p-2.5">91 900 €</td><td class="p-2.5 text-rose-600 dark:text-rose-400">101 000 €</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300">En cas de dépassement du seuil majoré, la TVA devient applicable dès le premier jour du mois de dépassement. Vos factures doivent alors impérativement faire figurer votre numéro de TVA intracommunautaire.</p>`,
      },
      {
        heading: "4. Facturation & Mentions Obligatoires",
        content: `Toute facture émise par une entreprise assujettie à la TVA doit obligatoirement mentionner : le prix unitaire HT, le taux de TVA applicable par ligne de produit, le montant total de la TVA ventilé par taux, le montant total TTC et le numéro de TVA intracommunautaire des deux parties (pour les transactions B2B).`,
      },
    ],
    faqs: [
      {
        question: "Comment calculer le montant HT à partir d'un prix TTC à 20% ?",
        answer: "Divisez simplement le prix TTC par 1,20 (ex: 120 € TTC / 1,20 = 100 € HT). La TVA s'obtient ensuite par différence (120 - 100 = 20 €) ou en divisant le TTC par 6.",
      },
      {
        question: "Quels travaux bénéficient de la TVA réduite à 5,5 % ?",
        answer: "Seuls les travaux d'amélioration de la performance énergétique (isolation, pompe à chaleur, chaudière biomasse) réalisés par des artisans certifiés RGE dans des logements de plus de 2 ans bénéficient du taux à 5,5 %.",
      },
      {
        question: "Que se passe-t-il si un auto-entrepreneur dépasse le seuil de franchise en base ?",
        answer: "Si le chiffre d'affaires dépasse le seuil majoré (39 100 € pour les services ou 101 000 € pour la vente), l'auto-entrepreneur doit facturer la TVA dès le premier jour du mois de dépassement et déclarer sa TVA collectée à l'administration fiscale.",
      },
    ],
  },

  // Guide 5: Mortgage & HCSF Rules
  {
    id: 'pret-immobilier-normes-hcsf-2026',
    slug: 'pret-immobilier-normes-hcsf-2026',
    category: 'credit-immobilier',
    categorySlug: 'credit-immobilier',
    categoryLabel: 'Crédit Immobilier & HCSF',
    badge: 'Normes HCSF 2026',
    readTime: '11 min de lecture',
    icon: '🏠',
    title: "Prêt Immobilier 2026 : Règles HCSF, Taux d'Endettement 35% et Calcul de Capacité d'Emprunt",
    metaTitle: "Prêt Immobilier 2026 : Règles HCSF 35%, Capacité d'Emprunt et Mensualités",
    metaDescription: "Guide complet sur le prêt immobilier en 2026 en France. Découvrez les normes contraignantes HCSF à 35% d'endettement, la durée maximale de 25 ans, le calcul du reste à vivre et la simulation de vos mensualités.",
    targetKeyword: "prêt immobilier 2026 règles hcsf taux endettement 35% mensualité",
    h1: "Prêt Immobilier 2026 : Règles HCSF, Taux d'Endettement 35% et Capacité d'Emprunt",
    summary: "Tout comprendre sur l'octroi d'un crédit immobilier en France en 2026 : respect strict du taux d'endettement maximal de 35% assurance comprise, durée d'emprunt plafonnée à 25 ans (27 ans en VEFA), calcul de mensualité constante et test du reste à vivre bancaire.",
    keywords: "prêt immobilier 2026, règles hcsf crédit, taux endettement 35%, capacité emprunt banque, durée prêt 25 ans, mensualité crédit immobilier, taeg assurance emprunteur, calcul reste à vivre",
    calculator: {
      label: "Simulateur Capacité d'Emprunt HCSF",
      href: "/countries/france/capacite-emprunt-hcsf/",
      badge: "Norme 35% Conforme",
    },
    relatedGuideSlugs: ['assurance-emprunteur-loi-lemoine', 'taxe-amenagement-baremes-2026', 'simulateur-ptz-2026'],
    sections: [
      {
        heading: "1. Les Normes Contraignantes du HCSF (35% d'Endettement & 25 Ans)",
        content: `Depuis la décision juridique contraignante du Haut Conseil de Stabilité Financière (HCSF), les banques françaises sont soumises à des règles d'octroi de crédit immobilier strictement encadrées sous peine de sanctions de l'ACPR :
        <div class="overflow-x-auto my-3">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Règle HCSF</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Plafond Légal Strict</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Exceptions Prévues</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-semibold text-slate-900 dark:text-white">Taux d'effort maximal</td><td class="p-3 font-bold text-rose-600 dark:text-rose-400 font-mono">35,0 % des revenus nets</td><td class="p-3">Assurance emprunteur obligatoirement incluse dans le calcul de la mensualité.</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-semibold text-slate-900 dark:text-white">Durée d'emprunt maximale</td><td class="p-3 font-bold text-slate-800 dark:text-slate-200 font-mono">25 ans (300 mois)</td><td class="p-3">Extension à <strong>27 ans</strong> possible en VEFA ou achat ancien avec travaux ≥ 25% du coût total.</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-semibold text-slate-900 dark:text-white">Poche de flexibilité</td><td class="p-3 font-bold text-indigo-600 dark:text-indigo-400 font-mono">20 % des dossiers</td><td class="p-3">Réservée à au moins 70% pour l'acquisition de la résidence principale (primo-accédants prioritaires).</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm">Simulez votre profil emprunteur avec notre <a href="/countries/france/capacite-emprunt-hcsf/" class="text-indigo-600 dark:text-indigo-400 font-semibold underline">Simulateur de Capacité d'Emprunt HCSF</a>.</p>`,
      },
      {
        heading: "2. Formule Mathématique de la Mensualité Constante",
        content: `La mensualité $M$ d'un prêt amortissable à taux fixe se calcule selon la formule actuarielle :
        <div class="p-4 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
          M = C × [ r ÷ (1 - (1 + r)^(-n)) ] + Assurance Mensuelle<br><br>
          • C = Capital emprunté en euros (€)<br>
          • r = Taux nominal mensuel (Taux annuel divisé par 12)<br>
          • n = Nombre total de mensualités (ex: 240 mois pour 20 ans, 300 mois pour 25 ans)
        </div>`,
      },
      {
        heading: "3. Revenus Pris en Compte & Règle du Reste à Vivre",
        content: `Les banques appliquent des coefficients de pondération stricts sur vos revenus :
        <ul class="list-disc list-inside space-y-1.5 my-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li><strong>Salaires en CDI / Fonctionnaires :</strong> Pris en compte à 100 % (hors primes variables, qui sont moyennées sur 3 ans).</li>
          <li><strong>Revenus locatifs :</strong> Retenus avec un abattement de sécurité de 30 % pour vacance locative (soit 70 % des loyers bruts).</li>
          <li><strong>Indépendants et CDD :</strong> Pris en compte uniquement sur la moyenne des 3 derniers bilans comptables ou avis d'imposition.</li>
          <li><strong>Reste à vivre minimal :</strong> Les banques exigent généralement un solde mensuel minimum après paiement de la mensualité de 800 € à 1 000 € pour une personne seule, et 1 200 € à 1 500 € pour un couple (+ 300 € à 400 € par enfant).</li>
        </ul>`,
      },
      {
        heading: "4. Stratégies pour Débloquer Votre Financement en 2026",
        content: `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs sm:text-sm">
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-1">1. Soldez les Crédits Consommation</h4>
            <p class="text-slate-600 dark:text-slate-300">Un crédit auto de 250 €/mois ampute votre capacité d'emprunt immobilier de plus de 45 000 € sur 20 ans.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-1">2. Délégation d'Assurance (Loi Lemoine)</h4>
            <p class="text-slate-600 dark:text-slate-300">Remplacer le contrat groupe bancaire par une assurance déléguée fait baisser le TAEG et réintègre de la mensualité sous la barre des 35%.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-1">3. Intégrez le PTZ 2026</h4>
            <p class="text-slate-600 dark:text-slate-300">Le <a href="/countries/france/simulateur-ptz/" class="text-indigo-600 dark:text-indigo-400 underline font-semibold">Prêt à Taux Zéro</a> permet d'obtenir jusqu'à 50% de financement sans aucun intérêt bancaire avec différé de remboursement.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-1">4. Allongez la Durée à 25 Ans</h4>
            <p class="text-slate-600 dark:text-slate-300">Passer de 20 à 25 ans diminue la mensualité mécanique et permet d'emprunter 15% de capital supplémentaire sous le plafond de 35%.</p>
          </div>
        </div>`,
      },
    ],
    faqs: [
      {
        question: "L'assurance emprunteur est-elle incluse dans le calcul des 35% du HCSF ?",
        answer: "Oui, la réglementation du HCSF impose d'inclure obligatoirement le coût mensuel de l'assurance emprunteur dans le calcul du taux d'effort maximal de 35 %, ainsi que les éventuels frais de dossier et de garantie (TAEG).",
      },
      {
        question: "Quelle est la durée maximale autorisée pour un prêt immobilier en 2026 ?",
        answer: "La durée maximale standard est fixée à 25 ans (300 mois). Elle peut être portée à 27 ans (différé d'amortissement de 2 ans inclus) pour un achat en VEFA (neuf sur plan) ou dans l'ancien lorsque le montant des travaux représente au moins 25 % du coût total du projet.",
      },
      {
        question: "Une banque peut-elle déroger aux 35% d'endettement ?",
        answer: "Oui, chaque établissement bancaire dispose d'un quota de flexibilité lui permettant d'accorder jusqu'à 20 % de ses prêts en dérogation aux critères du HCSF, principalement fléchés vers l'acquisition d'une résidence principale par des primo-accédants disposant d'un excellent reste à vivre.",
      },
    ],
  },

  // Guide 6: Housing Assistance (APL)
  {
    id: 'simulateur-apl-baremes-caf-2026',
    slug: 'simulateur-apl-baremes-caf-2026',
    category: 'logement-apl',
    categorySlug: 'logement-apl',
    categoryLabel: 'Logement & APL',
    badge: 'Barème CAF 2026',
    readTime: '10 min de lecture',
    icon: '🏢',
    title: "Simulateur APL 2026 : Barèmes CAF, Découpage par Zone, Étudiants et Calcul des Droits",
    metaTitle: "Simulateur APL 2026 : Calcul CAF, Zones 1, 2, 3 et Montant des Droits",
    metaDescription: "Guide complet sur l'Aide Personnalisée au Logement (APL) en 2026. Découvrez les plafonds de loyer par zone (1, 2, 3), la réforme de contemporanéité, les règles pour étudiants et le calcul exact.",
    targetKeyword: "simulateur APL 2026 calcul CAF zones 1 2 3 étudiant",
    h1: "Simulateur APL 2026 : Barèmes CAF, Découpage par Zone et Calcul des Droits",
    summary: "Tout comprendre sur le calcul de l'Aide Personnalisée au Logement (APL) en France en 2026 : actualisation trimestrielle des ressources, découpage territorial en 3 zones, loyers plafonds, calcul pour étudiants et colocations.",
    keywords: "simulateur apl 2026, calcul apl caf, aide logement etudiant, zones caf 1 2 3, loyer plafond apl, participation personnelle logement, apl colocation",
    calculator: {
      label: "Simulateur APL 2026",
      href: "/countries/france/simulateur-apl/",
      badge: "Formule Officielle CAF",
    },
    relatedGuideSlugs: ['pret-immobilier-normes-hcsf-2026', 'taxe-amenagement-baremes-2026', 'frais-reels-vs-abattement-10'],
    sections: [
      {
        heading: "1. Comment Fonctionne l'APL 'en Temps Réel' (Réforme de Contemporanéité)",
        content: `Depuis la réforme des aides au logement, le montant de l'APL n'est plus calculé sur les revenus d'il y a 2 ans (N-2), mais sur les <strong>revenus nets catégoriels des 12 derniers mois glissants</strong>.
        <div class="p-4 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Le montant de vos droits est <strong>recalculé automatiquement tous les 3 mois</strong> par la CAF ou la MSA grâce aux données transmises directement par l'Urssaf et le prélèvement à la source (Dispositif de Ressources Mensuelles).
        </div>`,
      },
      {
        heading: "2. Découpage Territorial des 3 Zones Géographiques CAF & Loyers Plafonds",
        content: `Le barème CAF applique des plafonds de loyer différents selon la tension immobilière de la commune de résidence :
        <div class="overflow-x-auto my-3">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Zone CAF</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Périmètre Géographique</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Plafond Loyer (Personne seule)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">Zone 1</td><td class="p-3">Paris et l'ensemble de la région Île-de-France.</td><td class="p-3 font-mono font-semibold">325,47 €</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-bold text-sky-600 dark:text-sky-400">Zone 2</td><td class="p-3">Agglomérations de plus de 100 000 habitants et la Corse.</td><td class="p-3 font-mono font-semibold">281,44 €</td></tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40"><td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">Zone 3</td><td class="p-3">Reste du territoire métropolitain et zones rurales.</td><td class="p-3 font-mono font-semibold">263,33 €</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm">Estimez vos droits mensuels avec notre <a href="/countries/france/simulateur-apl/" class="text-indigo-600 dark:text-indigo-400 font-semibold underline">Simulateur APL 2026</a>.</p>`,
      },
      {
        heading: "3. La Formule Mathématique Officielle de l'APL",
        content: `Le calcul de l'APL répond à l'équation générale fixée par le Code de la construction et de l'habitation :
        <div class="p-4 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
          APL = L + C - Pp<br><br>
          • L = Loyer principal retenu (plafonné selon la zone et la composition familiale)<br>
          • C = Forfait de charges (environ 58,13 € pour une personne seule)<br>
          • Pp = Participation personnelle minimale du ménage (calculée selon vos ressources R0)
        </div>
        <p class="text-xs text-slate-500">Un abattement forfaitaire de 5 € par mois est systématiquement déduit, et aucun versement n'est effectué si l'APL résultante est inférieure à 15 €/mois.</p>`,
      },
      {
        heading: "4. Cas Particuliers : Étudiants, Colocataires et Logements CROUS",
        content: `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs sm:text-sm">
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-1">🎓 Étudiants & Rattachés Fiscaux</h4>
            <p class="text-slate-600 dark:text-slate-300">Si un étudiant touche l'APL, ses parents ne peuvent plus percevoir les allocations familiales pour lui. Les étudiants non-boursiers et boursiers bénéficient d'un forfait d'évaluation forfaitaire avantageux.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400 mb-1">👥 Colocations</h4>
            <p class="text-slate-600 dark:text-slate-300">Chaque colocataire effectue une demande individuelle. La CAF divise le loyer plafond de référence par le nombre de colocataires inscrits au contrat de bail.</p>
          </div>
        </div>`,
      },
    ],
    faqs: [
      {
        question: "Comment est calculée l'APL en France en 2026 ?",
        answer: "L'APL est calculée sur la base de vos revenus des 12 derniers mois (actualisés tous les 3 mois), de votre loyer effectif (dans la limite du plafond de votre zone géographique) et de la composition de votre foyer fiscal.",
      },
      {
        question: "Un étudiant rattaché au foyer fiscal de ses parents peut-il toucher l'APL ?",
        answer: "Oui, un étudiant peut percevoir l'APL même s'il est rattaché fiscalement à ses parents pour l'impôt sur le revenu. Attention toutefois : pour la CAF, il quitte le foyer de ses parents, ce qui peut réduire les allocations familiales perçues par ces derniers.",
      },
      {
        question: "Quel est le montant minimum versé pour l'APL ?",
        answer: "La CAF ne verse pas l'APL si le montant mensuel calculé est inférieur au seuil légal de 15 €.",
      },
    ],
  },

  // Guide 7: Compound Interest & Savings
  {
    id: 'interets-composes-epargne-france',
    slug: 'interets-composes-epargne-france',
    category: 'epargne-placements',
    categorySlug: 'epargne-placements',
    categoryLabel: 'Épargne & Placements',
    badge: 'Stratégie Patrimoniale',
    readTime: '10 min de lecture',
    icon: '💹',
    title: "Intérêts Composés & Épargne en France : Multiplier son Capital avec les Placements Réglementés",
    metaTitle: "Intérêts Composés 2026 : Simulateur d'Épargne (Livret A, PEA, LEP)",
    metaDescription: "Faites travailler votre argent. Simulez la croissance de votre capital avec les intérêts composés sur Livret A, LEP, PEA et Assurance-Vie en 2026.",
    targetKeyword: "calcul intérêts composés France 2026 livret A PEA",
    h1: "Intérêts Composés & Épargne en France : Multiplier son Capital en 2026",
    summary: "L'effet boule de neige mathématique appliqué aux finances personnelles : comparaison des rendements Livret A, LDDS, LEP vs PEA et Assurance-Vie avec Flat Tax à 30%.",
    keywords: "calcul interets composes france 2026 livret a pea, interets composes epargne, livret a lep ldds, pea assurance vie flat tax capitalisation",
    calculator: {
      label: "Calculateur d'Intérêts Composés",
      href: "/countries/france/compound-interest-calculator/",
      badge: "Projection Graphique",
    },
    relatedGuideSlugs: ['reforme-retraite-france-64-ans', 'bareme-impot-revenu-2026'],
    sections: [
      {
        heading: "1. La Puissance Mathématique des Intérêts Composés",
        content: `Albert Einstein qualifiait les intérêts composés de « huitième merveille du monde ». En finance, les intérêts composés désignent le mécanisme par lequel les gains générés par un placement sont réinvestis pour produire à leur tour de nouveaux gains.
        <div class="p-4 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
          Formule générale avec versements périodiques :<br>
          A = P × (1 + r)^t + PMT × [ ((1 + r)^t - 1) ÷ r ]<br><br>
          • P = Capital initial investi (€)<br>
          • r = Taux d'intérêt annuel effectif<br>
          • t = Durée du placement en années<br>
          • PMT = Épargne mensuelle ou annuelle récurrente
        </div>
        <p class="text-sm">Visualisez la courbe exponentielle de vos économies avec notre <a href="/countries/france/compound-interest-calculator/" class="text-indigo-600 dark:text-indigo-400 font-semibold underline">Calculateur d'Intérêts Composés</a>.</p>`,
      },
      {
        heading: "2. Comparatif de Rendement sur 15 Ans : Livrets Réglementés vs PEA",
        content: `Pour un investissement de départ de 5 000 € avec un versement mensuel de 250 € sur une durée de 15 ans (total épargné : 50 000 €) :
        <div class="overflow-x-auto my-3">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 font-semibold">
              <tr>
                <th class="p-3 border-b">Support d'Épargne</th>
                <th class="p-3 border-b">Taux Moyen Estimé</th>
                <th class="p-3 border-b">Capital Final</th>
                <th class="p-3 border-b">Intérêts Générés</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-xs font-mono">
              <tr><td class="p-3 font-sans font-medium">Compte courant</td><td class="p-3">0,0 %</td><td class="p-3">50 000 €</td><td class="p-3 text-slate-400">0 €</td></tr>
              <tr><td class="p-3 font-sans font-medium">Livret A / LDDS (Plafonné)</td><td class="p-3">3,0 % (Net)</td><td class="p-3">63 800 €</td><td class="p-3 text-emerald-600 dark:text-emerald-400">+ 13 800 €</td></tr>
              <tr><td class="p-3 font-sans font-medium">Assurance-Vie (Fonds Euro / UC 60/40)</td><td class="p-3">4,5 %</td><td class="p-3">72 900 €</td><td class="p-3 text-emerald-600 dark:text-emerald-400">+ 22 900 €</td></tr>
              <tr class="bg-indigo-50/50 dark:bg-indigo-950/30"><td class="p-3 font-sans font-bold text-indigo-600 dark:text-indigo-400">PEA (ETF Monde / S&P 500)</td><td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">7,5 %</td><td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">95 400 €</td><td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">+ 45 400 €</td></tr>
            </tbody>
          </table>
        </div>`,
      },
      {
        heading: "3. Fiscalité des Placements en France : PEA vs Compte-Titres & Flat Tax (30%)",
        content: `En France, les gains sur valeurs mobilières sont soumis par défaut au Prélèvement Forfaitaire Unique (PFU ou « Flat Tax ») de 30 % (12,8 % d'impôt sur le revenu + 17,2 % de prélèvements sociaux).
        <div class="p-4 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <strong>L'avantage décisif du Plan d'Épargne en Actions (PEA) :</strong> Après 5 ans de détention, tous les retraits et arbitrages sont <strong>100 % exonérés d'impôt sur le revenu</strong> (seuls les prélèvements sociaux de 17,2 % restent dus sur les plus-values nettes).
        </div>`,
      },
    ],
    faqs: [
      {
        question: "Quelle est la règle des 72 pour doubler son capital ?",
        answer: "La règle des 72 permet d'estimer rapidement le nombre d'années nécessaires pour doubler un capital : divisez 72 par le taux de rendement annuel (ex: à 7 % par an, votre capital double en 72 ÷ 7 ≈ 10,3 ans).",
      },
      {
        question: "Pourquoi privilégier le PEA plutôt qu'un compte-titres ordinaire en France ?",
        answer: "Le PEA permet de réinvestir 100 % de ses dividendes et plus-values sans aucun frottement fiscal pendant la phase d'épargne, et offre une exonération totale d'impôt sur le revenu après 5 ans.",
      },
    ],
  },

  // Guide 8: Pension & Retirement
  {
    id: 'reforme-retraite-france-64-ans',
    slug: 'reforme-retraite-france-64-ans',
    category: 'retraite-pensions',
    categorySlug: 'retraite-pensions',
    categoryLabel: 'Retraite & Pensions',
    badge: 'Loi Retraites 2026',
    readTime: '11 min de lecture',
    icon: '🏖️',
    title: "Retraite en France : Âge Légal à 64 Ans, 172 Trimestres, Calcul de Pension et Décote",
    metaTitle: "Calcul Retraite France 2026 : Âge Légal 64 Ans, 172 Trimestres et Pension",
    metaDescription: "Guide complet sur la retraite en France en 2026. Comprenez l'âge légal à 64 ans, les 172 trimestres requis, la formule du SAM (25 meilleures années), la décote/surcote et le taux plein automatique à 67 ans.",
    targetKeyword: "calcul retraite France 2026 âge légal 64 ans 172 trimestres pension",
    h1: "Retraite en France 2026 : Âge Légal à 64 Ans, 172 Trimestres et Simulateur",
    summary: "Décryptage exhaustif de la législation sur les retraites en France : relèvement de l'âge légal à 64 ans, calcul de la pension de base du régime général (CNAV/Agirc-Arrco), impact du Salaire Annuel Moyen (SAM) et stratégies d'optimisation.",
    keywords: "calcul retraite france 2026, age legal retraite 64 ans, 172 trimestres cnav, pension taux plein 67 ans, formule sam 25 meilleures annees, decote surcote retraite, agirc arrco points",
    calculator: {
      label: "Simulateur de Retraite France",
      href: "/countries/france/retirement-calculator/",
      badge: "Régime Général & Complémentaire",
    },
    relatedGuideSlugs: ['interets-composes-epargne-france', 'conversion-salaire-brut-en-net-france'],
    sections: [
      {
        heading: "1. Les Deux Conditions Cumulatives du Départ à Taux Plein",
        content: `Pour percevoir une retraite à taux plein sans minoration définitive dans le régime général des salariés :
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs sm:text-sm">
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <span class="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">⏳ 1. L'Âge Légal Minimum</span>
            <p class="text-slate-600 dark:text-slate-300">Fixé à <strong>64 ans</strong> pour toutes les personnes nées à partir du 1er janvier 1968 (départ anticipé possible pour carrières longues avant 20 ans ou invalidité).</p>
          </div>
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <span class="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">📜 2. La Durée d'Assurance</span>
            <p class="text-slate-600 dark:text-slate-300">Justifier de <strong>172 trimestres cotisés ou assimilés</strong> (soit 43 années complètes de cotisations).</p>
          </div>
        </div>
        <p class="text-sm">Calculez l'âge précis de votre départ avec notre <a href="/countries/france/retirement-calculator/" class="text-indigo-600 dark:text-indigo-400 font-semibold underline">Simulateur de Retraite France</a>.</p>`,
      },
      {
        heading: "2. Formule de Calcul de la Pension de Base (CNAV)",
        content: `La pension annuelle brute du régime général des salariés se calcule ainsi :
        <div class="p-4 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
          Pension CNAV = SAM × Taux × (Trimestres validés ÷ Trimestres requis)<br><br>
          • SAM = Moyenne des 25 meilleures années de salaires bruts (revalorisés par coefficient officiel et plafonnés au PASS annuel)<br>
          • Taux plein = 50 % (taux maximum)
        </div>`,
      },
      {
        heading: "3. Retraite Complémentaire Agirc-Arrco (Système par Points)",
        content: `Pour les salariés du secteur privé, s'ajoute la pension complémentaire Agirc-Arrco : <code>Pension Complémentaire = Nombre de points accumulés × Valeur de service du point</code>.`,
      },
      {
        heading: "4. Décote, Surcote et Taux Plein Automatique à 67 Ans",
        content: `<ul class="list-disc list-inside space-y-1.5 my-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li><strong>Décote :</strong> Chaque trimestre manquant pour atteindre les 172 trimestres ampute le taux de liquidation de 1,25 % (soit une baisse définitive d'environ 2,5 % par trimestre manquant).</li>
          <li><strong>Surcote :</strong> Chaque trimestre cotisé au-delà des 172 trimestres et après l'âge légal majore la pension définitive de <strong>+1,25 % par trimestre</strong> (+5 % par an).</li>
          <li><strong>Âge du taux plein automatique (67 ans) :</strong> À 67 ans, vous obtenez automatiquement le taux plein de 50 %, quel que soit votre nombre de trimestres validés.</li>
        </ul>`,
      },
    ],
    faqs: [
      {
        question: "Quel est l'âge légal de départ à la retraite en 2026 ?",
        answer: "L'âge légal est de 64 ans pour les générations nées à partir de 1968, avec une exigence de 172 trimestres cotisés pour obtenir le taux plein sans décote.",
      },
      {
        question: "À quel âge la décote est-elle automatiquement annulée ?",
        answer: "À 67 ans, le taux plein de 50 % est garanti de plein droit par la loi, même si vous n'avez pas cotisé les 172 trimestres requis.",
      },
    ],
  },

  // Guide 9: Borrower Insurance (Loi Lemoine)
  {
    id: 'assurance-emprunteur-loi-lemoine',
    slug: 'assurance-emprunteur-loi-lemoine',
    category: 'assurance-prevoyance',
    categorySlug: 'assurance-prevoyance',
    categoryLabel: 'Assurance & Prévoyance',
    badge: 'Loi Lemoine 2022-2026',
    readTime: '9 min de lecture',
    icon: '🛡️',
    title: "Assurance Emprunteur & Loi Lemoine : Comment Économiser Jusqu'à 15 000 € en 2026",
    metaTitle: "Assurance Emprunteur & Loi Lemoine 2026 : Résiliation et Économies",
    metaDescription: "Changez d'assurance emprunteur à tout moment sans frais grâce à la loi Lemoine. Découvrez la fin du questionnaire de santé et économisez jusqu'à 15 000 € sur votre crédit immobilier.",
    targetKeyword: "assurance emprunteur loi Lemoine 2026 résiliation sans frais",
    h1: "Assurance Emprunteur & Loi Lemoine : Comment Économiser Jusqu'à 15 000 € en 2026",
    summary: "Guide pratique sur la loi Lemoine : résiliation infra-annuelle sans préavis ni pénalités bancaires, suppression du questionnaire médical sous 200 000 €, droit à l'oubli à 5 ans et substitution d'assurance.",
    keywords: "assurance emprunteur loi lemoine 2026, resiliation assurance pret tout moment, fin questionnaire medical pret, delegation assurance credit immobilier, economie taux assurance pret",
    calculator: {
      label: "Simulateur Prêt Immobilier & Assurance",
      href: "/countries/france/capacite-emprunt-hcsf/",
      badge: "Assurance Déléguée Inclus",
    },
    relatedGuideSlugs: ['pret-immobilier-normes-hcsf-2026', 'taxe-amenagement-baremes-2026'],
    sections: [
      {
        heading: "1. Les 3 Révolutions Majeures de la Loi Lemoine",
        content: `Entrée en vigueur pour libérer les emprunteurs du monopole des contrats groupe des banques, la loi Lemoine confère des droits d'ordre public incontestables :
        <div class="space-y-3 my-3 text-xs sm:text-sm">
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400">1. Résiliation à tout moment sans aucun frais</h4>
            <p class="text-slate-600 dark:text-slate-300 mt-1">Vous pouvez résilier votre contrat d'assurance à n'importe quel moment après la signature du prêt, sans attendre la date d'anniversaire et sans frais de dossier bancaire.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400">2. Fin du questionnaire médical sous 200 000 €</h4>
            <p class="text-slate-600 dark:text-slate-300 mt-1">Aucune question relative à l'état de santé ni aucun examen médical ne peut être exigé si la part assurée par emprunteur est inférieure ou égale à 200 000 € (400 000 € pour un couple) et que le prêt arrive à échéance avant le 60ᵉ anniversaire de l'assuré.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-indigo-600 dark:text-indigo-400">3. Droit à l'oubli réduit à 5 ans</h4>
            <p class="text-slate-600 dark:text-slate-300 mt-1">Les personnes ayant guéri d'un cancer ou d'une hépatite C n'ont plus à déclarer leur ancienne maladie dès 5 ans après la fin du protocole thérapeutique.</p>
          </div>
        </div>`,
      },
      {
        heading: "2. Contrat Groupe Bancaire vs Délégation d'Assurance : Pourquoi un tel écart ?",
        content: `Les banques calculent leurs cotisations sur le montant total du <strong>capital emprunté initial</strong> (taux fixe constant), tandis que les assureurs alternatifs appliquent un barème individualisé calculé sur le <strong>capital restant dû</strong>. Résultat : vous payez de moins en moins cher au fur et à mesure du remboursement du prêt.`,
      },
      {
        heading: "3. Procédure de Changement en 3 Étapes",
        content: `<ol class="list-decimal list-inside space-y-2 my-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>Comparez les offres et souscrivez un nouveau contrat présentant une équivalence de garanties (critères CCSF).</li>
          <li>Envoyez le certificat d'adhésion et les conditions générales à votre banque par lettre recommandée avec accusé de réception.</li>
          <li>La banque a l'obligation légale de vous répondre dans un délai de <strong>10 jours ouvrés</strong> sous peine d'une amende administrative de 3 000 €.</li>
        </ol>`,
      },
    ],
    faqs: [
      {
        question: "La banque peut-elle modifier mon taux d'intérêt de prêt si je change d'assurance ?",
        answer: "Non. L'article L. 313-30 du Code de la consommation interdit formellement à la banque de modifier le taux d'intérêt du crédit ou d'exiger des frais d'avenant en cas de changement d'assurance emprunteur.",
      },
      {
        question: "Qu'est-ce que l'équivalence de garanties CCSF ?",
        answer: "C'est la grille de critères définie par le Comité Consultatif du Secteur Financier : le nouveau contrat doit couvrir au minimum les mêmes risques essentiels (décès, PTIA, invalidité, incapacité de travail) que ceux exigés par votre banque dans sa fiche standardisée.",
      },
    ],
  },

  // Guide 10: Gross to Net Salary
  {
    id: 'conversion-salaire-brut-en-net-france',
    slug: 'conversion-salaire-brut-en-net-france',
    category: 'emploi-salaire',
    categorySlug: 'emploi-salaire',
    categoryLabel: 'Emploi & Salaire',
    badge: 'Cotisations Urssaf 2026',
    readTime: '9 min de lecture',
    icon: '💼',
    title: "Convertir un Salaire Brut en Net en France : Simulateur Cadre, Non-Cadre et Fonction Publique 2026",
    metaTitle: "Calcul Salaire Brut en Net 2026 : Simulateur Cadre, Non-Cadre et Impôts",
    metaDescription: "Convertissez instantanément votre salaire brut en net en France en 2026. Découvrez les taux de cotisations salariales (22% vs 25%), le salaire super-brut et l'impact du prélèvement à la source.",
    targetKeyword: "calcul salaire brut en net 2026 cadre non cadre fiche de paie",
    h1: "Convertir un Salaire Brut en Net en France : Simulateur Cadre et Non-Cadre 2026",
    summary: "Détail complet des retenues sociales sur bulletin de salaire français : cotisations santé, retraite de base et complémentaire Agirc-Arrco, chômage, CSG/CRDS déductible/non déductible et net imposable.",
    keywords: "calcul salaire brut en net 2026, conversion salaire brut net, cotisations salariales urssaf, salaire cadre non cadre, salaire net imposable pas, super brut employeur",
    calculator: {
      label: "Simulateur Salaire Brut en Net",
      href: "/countries/france/simulateur-salaire-brut-net/",
      badge: "Synchronisation Instantanée",
    },
    relatedGuideSlugs: ['indemnite-legale-licenciement-code-travail', 'bareme-impot-revenu-2026', 'frais-reels-vs-abattement-10'],
    sections: [
      {
        heading: "1. Ratios Moyens de Conversion en 2026",
        content: `En France, le montant prélevé sur le salaire brut dépend du statut professionnel du salarié :
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs sm:text-sm">
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-slate-900 dark:text-white mb-1">🏢 Statut Non-Cadre</h4>
            <div class="font-mono text-indigo-600 dark:text-indigo-400 font-bold">~22 % de cotisations</div>
            <p class="text-slate-500 text-[11px] mt-1">Salaire Net ≈ Brut × 0,78</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-slate-900 dark:text-white mb-1">👔 Statut Cadre</h4>
            <div class="font-mono text-indigo-600 dark:text-indigo-400 font-bold">~25 % de cotisations</div>
            <p class="text-slate-500 text-[11px] mt-1">Salaire Net ≈ Brut × 0,75 (APEC, prévoyance)</p>
          </div>
          <div class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40">
            <h4 class="font-bold text-slate-900 dark:text-white mb-1">🏛️ Fonction Publique</h4>
            <div class="font-mono text-indigo-600 dark:text-indigo-400 font-bold">~15 % de cotisations</div>
            <p class="text-slate-500 text-[11px] mt-1">Salaire Net ≈ Brut × 0,85</p>
          </div>
        </div>
        <p class="text-sm">Calculez votre fiche de paie avec notre <a href="/countries/france/simulateur-salaire-brut-net/" class="text-indigo-600 dark:text-indigo-400 font-semibold underline">Simulateur de Salaire Brut en Net France</a>.</p>`,
      },
      {
        heading: "2. Tableau Exemple Comparatif pour un Salaire Brut de 3 500 €",
        content: `
        <div class="overflow-x-auto my-3">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 font-semibold">
              <tr>
                <th class="p-3 border-b">Ligne de Paie</th>
                <th class="p-3 border-b">Non-Cadre</th>
                <th class="p-3 border-b">Cadre</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-xs">
              <tr><td class="p-3 font-sans font-medium">Salaire Brut</td><td class="p-3">3 500,00 €</td><td class="p-3">3 500,00 €</td></tr>
              <tr><td class="p-3 font-sans font-medium">Cotisations Salariales</td><td class="p-3 text-rose-600 dark:text-rose-400">- 770,00 € (22%)</td><td class="p-3 text-rose-600 dark:text-rose-400">- 875,00 € (25%)</td></tr>
              <tr class="bg-emerald-50/50 dark:bg-emerald-950/30"><td class="p-3 font-sans font-bold text-emerald-800 dark:text-emerald-200">Salaire Net Avant Impôt</td><td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">2 730,00 €</td><td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">2 625,00 €</td></tr>
              <tr><td class="p-3 font-sans font-medium">Charges Patronales (Employeur)</td><td class="p-3 text-slate-500">+ 1 470,00 € (42%)</td><td class="p-3 text-slate-500">+ 1 575,00 € (45%)</td></tr>
              <tr class="bg-slate-100 dark:bg-slate-800 font-bold"><td class="p-3 font-sans">Coût Total Entreprise (Super-Brut)</td><td class="p-3">4 970,00 €</td><td class="p-3">5 075,00 €</td></tr>
            </tbody>
          </table>
        </div>`,
      },
      {
        heading: "3. Pourquoi le Net Imposable est Supérieur au Net Payé ?",
        content: `Sur votre fiche de paie, le montant imposable est plus élevé que votre virement bancaire car il réintègre la <strong>CSG / CRDS non déductible</strong> (2,9 %) ainsi que la <strong>part patronale de la complémentaire santé obligatoire</strong>.`,
      },
    ],
    faqs: [
      {
        question: "Comment calculer son salaire net mensuel à partir du brut ?",
        answer: "Pour une estimation rapide, retirez 22 % du salaire brut pour un salarié non-cadre (Brut × 0,78) et 25 % pour un cadre (Brut × 0,75).",
      },
      {
        question: "Qu'est-ce que le coût total employeur ou super-brut ?",
        answer: "Le super-brut représente la somme du salaire brut et des cotisations patronales (environ 40 % à 45 % en sus du brut). C'est le coût total déboursé par l'entreprise pour rémunérer le collaborateur.",
      },
    ],
  },

  // Guide 11: Severance Pay
  {
    id: 'indemnite-legale-licenciement-code-travail',
    slug: 'indemnite-legale-licenciement-code-travail',
    category: 'emploi-salaire',
    categorySlug: 'emploi-salaire',
    categoryLabel: 'Emploi & Salaire',
    badge: 'Code du Travail',
    readTime: '8 min de lecture',
    icon: '⚖️',
    title: "Indemnité de Licenciement & Rupture Conventionnelle : Formule Légale et Fiscalité 2026",
    metaTitle: "Calcul Indemnité de Licenciement 2026 : Formule Légale Code du Travail",
    metaDescription: "Guide complet sur le calcul de l'indemnité légale de licenciement et rupture conventionnelle en France en 2026 (articles L1234-9 et R1234-2 du Code du travail). Exonération fiscale et exemples.",
    targetKeyword: "calcul indemnité de licenciement 2026 code du travail rupture conventionnelle",
    h1: "Indemnité de Licenciement : Formule Légale du Code du Travail et Fiscalité 2026",
    summary: "Règles juridiques de calcul de l'indemnité légale de licenciement : 1/4 de mois par année jusqu'à 10 ans, 1/3 au-delà, salaire mensuel de référence, indemnité supra-légale et seuils d'exonération fiscale et sociale.",
    keywords: "calcul indemnite licenciement 2026, indemnite legale licenciement code du travail, calcul rupture conventionnelle, salaire de reference 12 mois 3 mois, exoneration fiscale indemnite depart",
    calculator: {
      label: "Simulateur d'Indemnité de Licenciement",
      href: "/countries/france/indemnite-licenciement/",
      badge: "Formule Légale Minimale",
    },
    relatedGuideSlugs: ['conversion-salaire-brut-en-net-france', 'reforme-retraite-france-64-ans'],
    sections: [
      {
        heading: "1. La Formule Légale Minimale (Article R1234-2 du Code du Travail)",
        content: `Tout salarié en CDI licencié (hors faute grave ou lourde) et justifiant d'au moins 8 mois d'ancienneté ininterrompue a droit à une indemnité minimale légale :
        <div class="p-4 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
          • Jusqu'à 10 ans d'ancienneté : <strong>1/4 de mois de salaire</strong> par année d'ancienneté.<br>
          • À partir de la 11ᵉ année : <strong>1/3 de mois de salaire</strong> par année au-delà de 10 ans.<br>
          • Les mois incomplets sont proratisés au douzième (ex: 5 ans et 6 mois = 5,5 années).
        </div>
        <p class="text-sm">Simulez votre indemnité exacte avec notre <a href="/countries/france/indemnite-licenciement/" class="text-indigo-600 dark:text-indigo-400 font-semibold underline">Simulateur d'Indemnité de Licenciement</a>.</p>`,
      },
      {
        heading: "2. Détermination du Salaire de Référence",
        content: `Le salaire mensuel servant de base au calcul est la formule <strong>la plus favorable</strong> entre :
        <ul class="list-disc list-inside space-y-1.5 my-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li>La moyenne des 12 derniers mois de salaire brut précédant le licenciement.</li>
          <li>Le tiers des 3 derniers mois (les primes annuelles étant proratisées).</li>
        </ul>`,
      },
      {
        heading: "3. Exemple Chiffré : 14 Ans d'Ancienneté avec 3 000 € de Salaire",
        content: `
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm space-y-1">
          <p>• Tranche 1 (10 premières années) : 10 × (3 000 € ÷ 4) = <strong>7 500,00 €</strong></p>
          <p>• Tranche 2 (4 années suivantes) : 4 × (3 000 € ÷ 3) = <strong>4 000,00 €</strong></p>
          <p class="font-bold text-emerald-600 dark:text-emerald-400 pt-1 text-sm sm:text-base">• Total Indemnité Légale = 7 500 € + 4 000 € = 11 500,00 € nets d'impôt.</p>
        </div>`,
      },
      {
        heading: "4. Exonération Fiscale & Sociale de l'Indemnité",
        content: `L'indemnité légale de licenciement ou spécifique de rupture conventionnelle est totalement exonérée d'impôt sur le revenu dans la limite du montant légal ou conventionnel, ou jusqu'à 2 fois la rémunération annuelle brute (plafonnée à 6 fois le PASS annuel).`,
      },
    ],
    faqs: [
      {
        question: "Quelle est l'ancienneté minimale pour toucher une indemnité de licenciement ?",
        answer: "Le salarié doit justifier d'au moins 8 mois d'ancienneté ininterrompue au sein de l'entreprise à la date de notification de la lettre de licenciement.",
      },
      {
        question: "L'indemnité de rupture conventionnelle est-elle soumise à l'impôt sur le revenu ?",
        answer: "Non, l'indemnité de rupture conventionnelle est exonérée d'impôt sur le revenu dans la limite du montant prévu par la convention collective ou du double du salaire annuel brut (plafond légal).",
      },
    ],
  },

  // Extra Guide: Taxe d'Aménagement
  {
    id: 'taxe-amenagement-baremes-2026',
    slug: 'taxe-amenagement-baremes-2026',
    category: 'taxe-amenagement',
    categorySlug: 'taxe-amenagement',
    categoryLabel: "Taxe d'Aménagement",
    badge: 'Barème Officiel 2026',
    readTime: '9 min de lecture',
    icon: '📐',
    title: "Taxe d'Aménagement 2026 : Valeurs Forfaitaires, Abattement 50%, Piscines et Calcul DGFIP",
    metaTitle: "Taxe d'Aménagement 2026 : Calcul, Abattement 50% et Barèmes Officiels",
    metaDescription: "Guide complet sur la taxe d'aménagement en France en 2026. Découvrez les valeurs forfaitaires au m² (892 € province, 1 011 € IdF), l'abattement de 50% et le calcul pour abris et piscines.",
    targetKeyword: "taxe d'aménagement 2026 calcul barème abattement 50% piscine",
    h1: "Taxe d'Aménagement 2026 : Valeurs Forfaitaires, Abattement 50% et Modalités DGFIP",
    summary: "Mécanisme officiel de calcul de la taxe d'aménagement : valeurs forfaitaires au m² (892 € province, 1 011 € IdF), abattement de plein droit de 50% pour la résidence principale, piscines (251 €/m²) et exonérations légales.",
    keywords: "taxe amenagement 2026, calcul taxe amenagement dgfip, bareme taxe amenagement province idf, abattement 50 taxe amenagement, taxe piscine abri jardin, permis construire declaration prealable",
    calculator: {
      label: "Simulateur Taxe d'Aménagement",
      href: "/countries/france/taxe-amenagement/",
      badge: "Simulateur Officiel Dédié",
    },
    relatedGuideSlugs: ['pret-immobilier-normes-hcsf-2026', 'simulateur-apl-baremes-caf-2026'],
    sections: [
      {
        heading: "1. Les Valeurs Forfaitaires Officielles 2026 au m²",
        content: `Pour toute construction ou agrandissement clos et couvert de plus de 5 m² avec une hauteur sous plafond supérieure à 1,80 mètre :
        <div class="overflow-x-auto my-3">
          <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 font-semibold">
              <tr>
                <th class="p-3 border-b">Type d'Aménagement</th>
                <th class="p-3 border-b">Valeur Forfaitaire 2026</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-xs font-mono">
              <tr><td class="p-3 font-sans font-medium">Bâtiment hors Île-de-France (Province)</td><td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">892,00 € / m²</td></tr>
              <tr><td class="p-3 font-sans font-medium">Bâtiment en Île-de-France</td><td class="p-3 font-bold text-indigo-600 dark:text-indigo-400">1 011,00 € / m²</td></tr>
              <tr><td class="p-3 font-sans font-medium">Piscine découverte</td><td class="p-3 font-bold text-emerald-600 dark:text-emerald-400">251,00 € / m² de bassin</td></tr>
              <tr><td class="p-3 font-sans font-medium">Emplacement de stationnement extérieur</td><td class="p-3">2 928,00 € par place</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm">Simulez votre projet avec notre <a href="/countries/france/taxe-amenagement/" class="text-indigo-600 dark:text-indigo-400 font-semibold underline">Simulateur de Taxe d'Aménagement</a>.</p>`,
      },
      {
        heading: "2. Formule Mathématique de la Taxe d'Aménagement",
        content: `La taxe se décompose en une part communale et une part départementale :
        <div class="p-4 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
          Taxe Totale = Assiette Fiscale × (Taux Communal + Taux Départemental)<br><br>
          • Assiette Fiscale = Surface Taxable (m²) × Valeur Forfaitaire (€/m²)<br>
          • Taux communal voté : généralement entre 1 % et 5 % (jusqu'à 20 % dans certains secteurs renforcés).<br>
          • Taux départemental voté : plafonné à 2,5 %.
        </div>`,
      },
      {
        heading: "3. L'Abattement Légal de 50 % sur la Résidence Principale",
        content: `En vertu de l'article L. 331-12 du Code de l'urbanisme, un <strong>abattement de 50 %</strong> s'applique automatiquement sur la valeur forfaitaire des <strong>100 premiers mètres carrés</strong> d'une construction à usage de résidence principale.`,
      },
      {
        heading: "4. Exonérations Totales Prévues par la Loi",
        content: `Sont totalement exonérés de taxe d'aménagement : les petits abris de jardin de surface inférieure ou égale à 5 m², les serres de jardin d'agrément, et les logements sociaux financés par un prêt aidé (PLA).`,
      },
    ],
    faqs: [
      {
        question: "Quand doit-on payer la taxe d'aménagement ?",
        answer: "La taxe d'aménagement est liquidée après la délivrance du permis de construire ou de la déclaration préalable. Si le montant est inférieur à 1 500 €, il est payable en une seule fois 12 mois après l'autorisation. S'il est supérieur à 1 500 €, il est divisé en deux fractions égales à 14 et 24 mois.",
      },
      {
        question: "Les abris de jardin sont-ils tous taxables ?",
        answer: "Seuls les abris de jardin dont la surface est supérieure à 5 m² et la hauteur sous plafond dépasse 1,80 m sont soumis à la taxe d'aménagement.",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): FranceGuide | undefined {
  return FRANCE_GUIDES.find((g) => g.slug === slug || g.id === slug);
}

export function getGuidesByCategory(categorySlug: string): FranceGuide[] {
  return FRANCE_GUIDES.filter((g) => g.categorySlug === categorySlug || g.category === categorySlug);
}

export function getRelatedGuides(guide: FranceGuide): FranceGuide[] {
  if (guide.relatedGuideSlugs && guide.relatedGuideSlugs.length > 0) {
    const directMatches = guide.relatedGuideSlugs
      .map((s) => getGuideBySlug(s))
      .filter((g): g is FranceGuide => Boolean(g));
    if (directMatches.length > 0) return directMatches;
  }
  return getGuidesByCategory(guide.categorySlug).filter((g) => g.slug !== guide.slug).slice(0, 3);
}
