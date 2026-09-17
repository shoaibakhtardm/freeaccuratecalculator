// src/data/i18n.ts

export const frCategories: Record<string, string> = {
  insurance: "Assurance",
  legal: "Juridique",
  business: "Entreprise",
  construction: "Construction",
  "real-estate": "Immobilier",
  technology: "Technologie",
  health: "Santé",
  statistics: "Statistiques",
  marketing: "Marketing",
  math: "Mathématiques",
  automotive: "Automobile",
  biology: "Biologie",
  chemistry: "Chimie",
  physics: "Physique",
  food: "Alimentation",
  sports: "Sports",
  ecology: "Écologie",
  everyday: "Quotidien",
  converter: "Convertisseur",
  finance: "Finance",
  love: "Amour",
};

export const enCategories: Record<string, string> = {
  insurance: "Insurance",
  legal: "Legal",
  business: "Business",
  construction: "Construction",
  "real-estate": "Real Estate",
  technology: "Technology",
  health: "Health",
  statistics: "Statistics",
  marketing: "Marketing",
  math: "Math",
  automotive: "Automotive",
  biology: "Biology",
  chemistry: "Chemistry",
  physics: "Physics",
  food: "Food",
  sports: "Sports",
  ecology: "Ecology",
  everyday: "Everyday",
  converter: "Converter",
  finance: "Finance",
  love: "Love",
};

export const frUI = {
  breadcrumbHome: "Accueil",
  breadcrumbCountries: "Pays",
  breadcrumbFrance: "France",
  allTools: "Tous les Outils",
  searchLabel: "Rechercher",
  searchPlaceholder: "Rechercher (ex: prêt, TVA, salaire, impôt, retraite, amortissement)",
  noResults: "Aucun calculateur trouvé",
  trySearchFor: "Essayez avec des termes comme",
  examples: "prêt, tva, salaire, impôt, amortissement",
  checkSpelling: "ou vérifiez l'orthographe",
  found: "calculateur(s) trouvé(s)",
  suggestions: "Outils suggérés",
  navigateHint: "↑ ↓ pour naviguer",
  selectHint: "↵ pour ouvrir",
  closeHint: "esc pour fermer",
  showAll: "Afficher tous les outils",
  launchTool: "Lancer l'Outil",
  whyUseTitle: "Pourquoi Utiliser ces Outils ?",
  languageToggleFR: "🇫🇷 FR",
  languageToggleEN: "🇬🇧 EN",
};

export const enUI = {
  breadcrumbHome: "Home",
  breadcrumbCountries: "Countries",
  breadcrumbFrance: "France",
  allTools: "All Tools",
  searchPlaceholder: "Search calculators...",
  noResults: "No calculators found for this search.",
  launchTool: "Launch Tool",
  whyUseTitle: "Why Use These Tools?",
  languageToggleFR: "🇫🇷 FR",
  languageToggleEN: "🇬🇧 EN",
};

// Common French tool name translations
export const frToolNames: Record<string, { name: string; shortName: string; desc: string }> = {
  // Insurance
  'term-life-insurance-calculator': {
    name: "Simulateur de Prévoyance & Capital Décès",
    shortName: "Prévoyance Décès",
    desc: "Calculez le capital décès recommandé et la rente de protection pour vos proches.",
  },
  'health-insurance-calculator': {
    name: "Simulateur de Mutuelle Santé",
    shortName: "Mutuelle Santé",
    desc: "Simulez vos cotisations, le taux de remboursement BRSS et votre reste à charge.",
  },
  'auto-insurance-calculator': {
    name: "Simulateur d'Assurance Auto",
    shortName: "Assurance Auto",
    desc: "Estimez vos cotisations d'assurance auto (tiers, tous risques) et franchises.",
  },
  'homeowners-insurance-calculator': {
    name: "Simulateur d'Assurance Habitation",
    shortName: "Assurance Habitation",
    desc: "Estimez votre cotisation Multirisque Habitation (MRH) selon surface, pièces et mobilier.",
  },
  'renters-insurance-calculator': {
    name: "Simulateur d'Assurance Locataire",
    shortName: "Assurance Locataire",
    desc: "Calculez votre prime d'assurance locataire obligatoire et protection des biens.",
  },
  'disability-insurance-calculator': {
    name: "Simulateur de Prévoyance Invalidité",
    shortName: "Prévoyance Invalidité",
    desc: "Calculez vos indemnités journalières et rentes complémentaires en cas d'arrêt.",
  },
  'annuity-payout-calculator': {
    name: "Simulateur de Rente Viagère",
    shortName: "Rente Viagère",
    desc: "Estimez les versements réguliers issus de votre capital constitué.",
  },
  'umbrella-insurance-calculator': {
    name: "Simulateur d'Assurance Responsabilité Civile",
    shortName: "Responsabilité Civile",
    desc: "Protection complémentaire contre les sinistres et litiges majeurs.",
  },
  'whole-life-insurance-calculator': {
    name: "Simulateur d'Assurance Vie Entière",
    shortName: "Vie Entière",
    desc: "Épargne et transmission de capital avec fiscalité avantageuse.",
  },

  // Health
  'bmi-calculator': {
    name: "Calculateur d'IMC (Indice de Masse Corporelle)",
    shortName: "IMC",
    desc: "Évaluez votre corpulence selon les seuils officiels de l'OMS.",
  },
  'calorie-calculator': {
    name: "Calculateur de Calories & TDEE",
    shortName: "Calories",
    desc: "Besoin énergétique journalier et métabolisme de base (MB).",
  },
  'body-fat-calculator': {
    name: "Calculateur de Masse Grasse",
    shortName: "Masse Grasse",
    desc: "Pourcentage de tissu adipeux selon la formule de la marine américaine.",
  },
  'ideal-weight-calculator': {
    name: "Calculateur de Poids Idéal",
    shortName: "Poids Idéal",
    desc: "Poids de référence selon les formules Lorentz, Devine et Miller.",
  },
  'water-intake-calculator': {
    name: "Calculateur d'Hydratation Journalière",
    shortName: "Hydratation",
    desc: "Volume d'eau quotidien recommandé selon votre poids et activité.",
  },
  'target-heart-rate-calculator': {
    name: "Calculateur de Fréquence Cardiaque Cible",
    shortName: "Fréquence Cardiaque",
    desc: "Zones cardio cibles pour l'endurance et le fractionné.",
  },
  'macro-calculator': {
    name: "Calculateur de Macronutriments",
    shortName: "Macronutriments",
    desc: "Répartition protéines, lipides et glucides selon vos objectifs.",
  },
  'pace-calculator': {
    name: "Calculateur d'Allure de Course",
    shortName: "Allure",
    desc: "Vitesse moyenne en min/km et temps de passage 5k, 10k, semi et marathon.",
  },
  'body-surface-area-calculator': {
    name: "Calculateur de Surface Corporelle",
    shortName: "Surface Corporelle",
    desc: "Surface corporelle (BSA) selon Mosteller et DuBois.",
  },
  'gestational-age-calculator': {
    name: "Calculateur d'Âge Gestationnel & Terme",
    shortName: "Âge Gestationnel",
    desc: "Date présumée d'accouchement et semaines d'aménorrhée (SA).",
  },

  // Math
  'percentage-calculator': {
    name: "Calculateur de Pourcentage",
    shortName: "Pourcentage",
    desc: "Calcul de hausses, baisses, remises et ratios en un clic.",
  },
  'scientific-calculator': {
    name: "Calculatrice Scientifique",
    shortName: "Scientifique",
    desc: "Trigonométrie, logarithmes, factorielles et calculs complexes.",
  },
  'fraction-calculator': {
    name: "Calculateur de Fractions",
    shortName: "Fractions",
    desc: "Addition, soustraction, multiplication et simplification de fractions.",
  },
  'ratio-calculator': {
    name: "Calculateur de Ratio & Proportions",
    shortName: "Ratios",
    desc: "Résolution de ratios, proportions et règles de trois.",
  },
  'standard-deviation-calculator': {
    name: "Calculateur d'Écart-Type",
    shortName: "Écart-Type",
    desc: "Variance, écart-type échantillon et population.",
  },
  'probability-calculator': {
    name: "Calculateur de Probabilités",
    shortName: "Probabilités",
    desc: "Combinaisons, permutations et probabilités conditionnelles.",
  },
  'logarithm-calculator': {
    name: "Calculateur de Logarithmes",
    shortName: "Logarithmes",
    desc: "Log népérien (ln), log base 10 et bases personnalisées.",
  },

  // Everyday
  'age-calculator': {
    name: "Calculateur d'Âge Précis",
    shortName: "Âge",
    desc: "Âge exact en années, mois, jours, heures et minutes.",
  },
  'date-difference-calculator': {
    name: "Calculateur d'Écart de Dates",
    shortName: "Écart Dates",
    desc: "Nombre de jours ouvrés et calendaires entre deux dates.",
  },
  'time-calculator': {
    name: "Calculateur de Durée & Heures",
    shortName: "Durées",
    desc: "Addition et soustraction d'heures, minutes et secondes.",
  },
  'discount-calculator': {
    name: "Calculateur de Soldes & Remises",
    shortName: "Soldes",
    desc: "Prix après remise et économie réalisée pendant les soldes.",
  },
  'tip-calculator': {
    name: "Calculateur de Pourboire & Partage",
    shortName: "Pourboire",
    desc: "Calcul du pourboire et division équitable de l'addition.",
  },
  'gpa-calculator': {
    name: "Calculateur de Moyenne Scolaire (GPA)",
    shortName: "Moyenne",
    desc: "Moyenne générale pondérée avec coefficients.",
  },
  'hours-calculator': {
    name: "Calculateur d'Heures de Travail",
    shortName: "Heures Travail",
    desc: "Comptabilisation des heures de présence et temps de pause.",
  },
  'password-generator': {
    name: "Générateur de Mots de Passe Sécurisés",
    shortName: "Mot de Passe",
    desc: "Générez des mots de passe ultra-sécurisés et cryptographiquement forts.",
  },

  // Real Estate
  'rental-yield-calculator': {
    name: "Calculateur de Rendement Locatif",
    shortName: "Rendement Locatif",
    desc: "Rentabilité brute et nette pour investissement immobilier locatif.",
  },
  'cap-rate-calculator': {
    name: "Calculateur de Taux de Capitalisation",
    shortName: "Taux Cap",
    desc: "Évaluez le taux de rentabilité opérationnelle d'un bien immobilier.",
  },
  'property-tax-calculator': {
    name: "Calculateur de Taxe Foncière",
    shortName: "Taxe Foncière",
    desc: "Estimation de la fiscalité locale et valeur locative cadastrale.",
  },

  // Legal
  'child-support-calculator': {
    name: "Calculateur de Pension Alimentaire",
    shortName: "Pension Alimentaire",
    desc: "Barème indicatif de pension alimentaire selon les revenus et la garde.",
  },
  'alimony-calculator': {
    name: "Calculateur de Prestation Compensatoire",
    shortName: "Prestation Compensatoire",
    desc: "Estimation de la compensation financière post-divorce.",
  },
  'settlement-value-calculator': {
    name: "Calculateur d'Indemnités de Sinistre",
    shortName: "Indemnités",
    desc: "Évaluation du préjudice corporel et matériel.",
  },
  'legal-fee-calculator': {
    name: "Calculateur d'Honoraires d'Avocat",
    shortName: "Honoraires",
    desc: "Estimation des frais de justice et honoraires juridiques.",
  },

  // Business
  'break-even-calculator': {
    name: "Calculateur de Seuil de Rentabilité",
    shortName: "Seuil Rentabilité",
    desc: "Point mort et chiffre d'affaires minimum pour être rentable.",
  },
  'roi-calculator': {
    name: "Calculateur de Retour sur Investissement (ROI)",
    shortName: "ROI",
    desc: "Mesurez la rentabilité financière de vos investissements.",
  },
  'business-valuation-calculator': {
    name: "Calculateur de Valorisation d'Entreprise",
    shortName: "Valorisation",
    desc: "Multiples d'EBITDA et valorisation financière de société.",
  },

  // Construction
  'square-footage-calculator': {
    name: "Calculateur de Surface en Mètres Carrés",
    shortName: "Mètres Carrés",
    desc: "Calcul de surface de pièces, sols et murs en m².",
  },
  'paint-calculator': {
    name: "Calculateur de Peinture",
    shortName: "Peinture",
    desc: "Litres de peinture nécessaires selon la surface et les couches.",
  },
  'concrete-calculator': {
    name: "Calculateur de Béton",
    shortName: "Béton",
    desc: "Volume de béton en m³ et sacs de ciment pour dalles et fondations.",
  },
  'brick-calculator': {
    name: "Calculateur de Briques",
    shortName: "Briques",
    desc: "Nombre de briques et quantité de mortier pour un mur.",
  },

  // Automotive
  'fuel-cost-calculator': {
    name: "Calculateur de Coût de Carburant",
    shortName: "Carburant",
    desc: "Prix du trajet selon la distance, consommation et prix au litre.",
  },
  'mpg-calculator': {
    name: "Calculateur de Consommation L/100km",
    shortName: "Consommation",
    desc: "Consommation moyenne aux 100 kilomètres de votre véhicule.",
  },
  'car-depreciation-calculator': {
    name: "Calculateur de Décote Automobile",
    shortName: "Décote Auto",
    desc: "Perte de valeur argus annuelle de votre véhicule.",
  },

  // Converter
  'length-converter': {
    name: "Convertisseur de Longueur",
    shortName: "Longueur",
    desc: "Mètres, kilomètres, pouces, pieds, miles et centimètres.",
  },
  'weight-converter': {
    name: "Convertisseur de Poids & Masse",
    shortName: "Poids",
    desc: "Grammes, kilogrammes, livres (lbs), onces et tonnes.",
  },
  'temperature-converter': {
    name: "Convertisseur de Température",
    shortName: "Température",
    desc: "Celsius (°C), Fahrenheit (°F) et Kelvin (K).",
  },

  // New French Statutory Tools
  'simulateur-apl': {
    name: "Simulateur APL 2026",
    shortName: "APL",
    desc: "Estimation de l'Aide Personnalisée au Logement selon les barèmes officiels CAF.",
  },
  'apl-simulator': {
    name: "Simulateur APL 2026",
    shortName: "APL",
    desc: "Estimation de l'Aide Personnalisée au Logement selon les barèmes officiels CAF.",
  },
  'indemnite-licenciement': {
    name: "Calculateur d'Indemnité de Licenciement",
    shortName: "Licenciement",
    desc: "Calcul de l'indemnité légale de rupture selon le Code du travail (art. R1234-2).",
  },
  'severance-calculator': {
    name: "Calculateur d'Indemnité de Licenciement",
    shortName: "Licenciement",
    desc: "Calcul de l'indemnité légale de rupture selon le Code du travail (art. R1234-2).",
  },
  'frais-reels-abattement': {
    name: "Comparateur Frais Réels vs Abattement 10%",
    shortName: "Frais Réels",
    desc: "Optimisation fiscale entre déduction forfaitaire automatique de 10% et frais réels déclarés.",
  },
  'real-expenses-calculator': {
    name: "Comparateur Frais Réels vs Abattement 10%",
    shortName: "Frais Réels",
    desc: "Optimisation fiscale entre déduction forfaitaire automatique de 10% et frais réels déclarés.",
  },
  'indemnites-kilometriques': {
    name: "Calculateur d'Indemnités Kilométriques 2026",
    shortName: "Indemnités Km",
    desc: "Barème officiel DGFIP pour véhicules thermiques, hybrides et électriques (+20%).",
  },
  'mileage-allowance-calculator': {
    name: "Calculateur d'Indemnités Kilométriques 2026",
    shortName: "Indemnités Km",
    desc: "Barème officiel DGFIP pour véhicules thermiques, hybrides et électriques (+20%).",
  },

  // Finance
  'mortgage-calculator': {
    name: "Calculateur de Prêt Immobilier",
    shortName: "Prêt Immobilier",
    desc: "Simulation de crédit immobilier, mensualités et amortissement pour banques françaises.",
  },
  'loan-calculator': {
    name: "Calculateur de Prêt Personnel",
    shortName: "Prêt Personnel",
    desc: "Calcul des mensualités, TAEG et coût total pour crédit conso ou travaux.",
  },
  'auto-loan-calculator': {
    name: "Calculateur de Prêt Automobile",
    shortName: "Prêt Auto",
    desc: "Simulation de crédit auto ou moto avec tableau de remboursement complet.",
  },
  'compound-interest-calculator': {
    name: "Calculateur d'Intérêts Composés",
    shortName: "Intérêts Composés",
    desc: "Capitalisation des intérêts et croissance exponentielle de votre épargne en euros.",
  },
  'interest-calculator': {
    name: "Calculateur d'Intérêts Bancaires",
    shortName: "Intérêts",
    desc: "Calcul des intérêts d'épargne (Livret A, LDDS, comptes à terme) et fiscalité.",
  },
  'payment-calculator': {
    name: "Calculateur de Mensualités de Crédit",
    shortName: "Mensualités",
    desc: "Échéances d'emprunt selon le montant emprunté, le taux et la durée.",
  },
  'retirement-calculator': {
    name: "Calculateur de Retraite & Rente",
    shortName: "Retraite",
    desc: "Estimation de pension de retraite et capital d'épargne complémentaire.",
  },
  'amortization-calculator': {
    name: "Calculateur de Tableau d'Amortissement",
    shortName: "Amortissement",
    desc: "Échéancier mois par mois détaillant le capital amorti, les intérêts et le solde restant.",
  },
  'investment-calculator': {
    name: "Calculateur d'Investissement & Rendement",
    shortName: "Investissement",
    desc: "Rendement global, plus-value et projection patrimoniale en euros.",
  },
  'inflation-calculator': {
    name: "Calculateur d'Inflation & Pouvoir d'Achat",
    shortName: "Inflation",
    desc: "Érosion monétaire et évolution du pouvoir d'achat selon les indices de prix INSEE.",
  },
  'finance-calculator': {
    name: "Calculateur Financier Universel",
    shortName: "Finance",
    desc: "Outil financier polyvalent pour prêts, investissements et flux de trésorerie.",
  },
  'income-tax-calculator': {
    name: "Calculateur d'Impôt sur le Revenu 2026",
    shortName: "Impôt Revenu",
    desc: "Barème fiscal officiel, tranches marginales (TMI) et calcul du quotient familial.",
  },
  'salary-calculator': {
    name: "Calculateur de Salaire Brut / Net",
    shortName: "Salaire Net",
    desc: "Conversion instantanée brut-net avec déduction des cotisations sociales françaises.",
  },
  'interest-rate-calculator': {
    name: "Calculateur de Taux d'Intérêt",
    shortName: "Taux d'Intérêt",
    desc: "Déterminez le taux d'intérêt réel (TAEG) d'une opération financière.",
  },
  'sales-tax-calculator': {
    name: "Calculateur de TVA France",
    shortName: "TVA",
    desc: "Calcul de la taxe sur la valeur ajoutée (20%, 10%, 5,5% et 2,1%) HT et TTC.",
  },
  'vat-calculator': {
    name: "Calculateur de TVA France",
    shortName: "TVA",
    desc: "Calcul de la taxe sur la valeur ajoutée (20%, 10%, 5,5% et 2,1%) HT et TTC.",
  },
  'sip-calculator': {
    name: "Calculateur d'Épargne Programmée",
    shortName: "Épargne Programmée",
    desc: "Versements programmés mensuels et capitalisation à long terme.",
  },
  'step-up-sip-calculator': {
    name: "Calculateur d'Épargne Progressive (Step-Up)",
    shortName: "Épargne Progressive",
    desc: "Croissance d'épargne avec revalorisation annuelle programmée des versements.",
  },
  'lumpsum-calculator': {
    name: "Calculateur de Placement Forfaitaire",
    shortName: "Placement Forfaitaire",
    desc: "Rendement d'un apport unique placé sur les marchés financiers.",
  },
  'swp-calculator': {
    name: "Calculateur de Rente Périodique (SWP)",
    shortName: "Rente Périodique",
    desc: "Retraits financiers réguliers et suivi du capital restant dû.",
  },
  'simple-interest-calculator': {
    name: "Calculateur d'Intérêts Simples",
    shortName: "Intérêts Simples",
    desc: "Calcul linéaire direct sur capital fixe sans réinvestissement des gains.",
  },
  'profit-margin-calculator': {
    name: "Calculateur de Marge Bénéficiaire",
    shortName: "Marge Bénéficiaire",
    desc: "Marge commerciale brute, nette et taux de marque pour entreprises.",
  },

  // Health
  'bmr-calculator': {
    name: "Calculateur de Métabolisme de Base (MB)",
    shortName: "Métabolisme de Base",
    desc: "Dépense calorique minimale au repos selon les équations Mifflin-St Jeor.",
  },
  'pregnancy-calculator': {
    name: "Calculateur de Grossesse & Suivi",
    shortName: "Grossesse",
    desc: "Calendrier de grossesse, semaines d'aménorrhée (SA) et trimestres.",
  },
  'pregnancy-conception-calculator': {
    name: "Calculateur de Date de Conception",
    shortName: "Conception",
    desc: "Période d'ovulation estimée et date présumée de fécondation.",
  },
  'due-date-calculator': {
    name: "Calculateur de Date d'Accouchement",
    shortName: "Date d'Accouchement",
    desc: "Date prévisionnelle de terme selon le premier jour des dernières règles.",
  },

  // Math
  'random-number-generator': {
    name: "Générateur de Nombres Aléatoires",
    shortName: "Aléatoire",
    desc: "Tirage au sort sécurisé avec bornes personnalisées et sans doublons.",
  },
  'triangle-calculator': {
    name: "Calculateur de Triangle",
    shortName: "Triangle",
    desc: "Angles, côtés, aire, périmètre et théorème de Pythagore.",
  },

  // Everyday
  'date-calculator': {
    name: "Calculateur de Dates & Jours Ouvrés",
    shortName: "Dates",
    desc: "Durée exacte entre deux dates et calcul des jours fériés et ouvrés.",
  },
  'grade-calculator': {
    name: "Calculateur de Notes & Moyenne",
    shortName: "Notes",
    desc: "Moyenne scolaire pondérée avec coefficients et barèmes.",
  },
  'subnet-calculator': {
    name: "Calculateur de Sous-Réseau IP",
    shortName: "Sous-Réseau",
    desc: "Adresses réseau, masque de sous-réseau, broadcast et plages d'hôtes CIDR.",
  },
  'conversion-calculator': {
    name: "Calculateur Universel d'Unités",
    shortName: "Conversions",
    desc: "Conversion rapide d'unités de mesure métriques et internationales.",
  },

  // Technology
  'bandwidth-calculator': {
    name: "Calculateur de Bande Passante Réseau",
    shortName: "Bande Passante",
    desc: "Débit descendant et montant, transfert de données et saturation réseau.",
  },
  'data-transfer-calculator': {
    name: "Calculateur de Temps de Téléchargement",
    shortName: "Transfert Données",
    desc: "Estimation de la durée de téléchargement selon la vitesse de connexion.",
  },

  // Statistics
  'sample-size-calculator': {
    name: "Calculateur de Taille d'Échantillon",
    shortName: "Échantillon",
    desc: "Nombre de répondants requis selon la marge d'erreur et le niveau de confiance.",
  },
  'confidence-interval-calculator': {
    name: "Calculateur d'Intervalle de Confiance",
    shortName: "Intervalle Confiance",
    desc: "Bornes d'estimation statistique pour moyennes et proportions.",
  },

  // Marketing
  'conversion-rate-calculator': {
    name: "Calculateur de Taux de Conversion",
    shortName: "Taux de Conversion",
    desc: "Pourcentage de visiteurs convertis en clients ou prospects.",
  },
  'cac-calculator': {
    name: "Calculateur de Coût d'Acquisition Client (CAC)",
    shortName: "CAC",
    desc: "Coût marketing et commercial moyen pour recruter un nouveau client.",
  },
  'roas-calculator': {
    name: "Calculateur de ROAS (Retour sur Dépenses Publicitaires)",
    shortName: "ROAS",
    desc: "Mesure de l'efficacité et de la rentabilité de vos campagnes publicitaires.",
  },
  'email-roi-calculator': {
    name: "Calculateur de Rentabilité Emailing",
    shortName: "ROI Emailing",
    desc: "Retour sur investissement de vos newsletters et campagnes marketing.",
  },

  // Biology
  'punnett-square-calculator': {
    name: "Calculateur d'Échiquier de Punnett",
    shortName: "Échiquier Punnett",
    desc: "Probabilités de croisement génétique et transmission des allèles.",
  },
  'hardy-weinberg-calculator': {
    name: "Calculateur d'Équilibre de Hardy-Weinberg",
    shortName: "Hardy-Weinberg",
    desc: "Fréquences alléliques et génotypiques au sein d'une population.",
  },
  'bacterial-growth-calculator': {
    name: "Calculateur de Croissance Bactérienne",
    shortName: "Croissance Bactérienne",
    desc: "Cinétique de multiplication microbienne et temps de génération.",
  },
  'molecular-weight-calculator': {
    name: "Calculateur de Poids Moléculaire ADN / ARN",
    shortName: "Poids Moléculaire",
    desc: "Masse molaire des séquences de nucléotides et oligonucléotides.",
  },

  // Chemistry
  'molar-mass-calculator': {
    name: "Calculateur de Masse Molaire",
    shortName: "Masse Molaire",
    desc: "Masse molaire en g/mol selon la formule brute de la molécule.",
  },
  'solution-dilution-calculator': {
    name: "Calculateur de Dilution de Solution (C1V1 = C2V2)",
    shortName: "Dilution",
    desc: "Volume et concentration de solution mère à prélever pour dilution.",
  },
  'ph-calculator': {
    name: "Calculateur de pH & pOH",
    shortName: "pH",
    desc: "Acidité, basicité et concentration en ions oxonium [H3O+] et hydroxyde.",
  },
  'stoichiometry-calculator': {
    name: "Calculateur de Stœchiométrie Chimique",
    shortName: "Stœchiométrie",
    desc: "Équilibrage de réaction, réactif limitant et rendement de synthèse.",
  },

  // Physics
  'velocity-acceleration-calculator': {
    name: "Calculateur de Vitesse & Accélération",
    shortName: "Vitesse",
    desc: "Cinématique du mouvement rectiligne uniforme et uniformément accéléré.",
  },
  'kinetic-energy-calculator': {
    name: "Calculateur d'Énergie Cinétique",
    shortName: "Énergie Cinétique",
    desc: "Énergie en Joules (J) selon la masse et la vitesse de l'objet.",
  },
  'ohms-law-calculator': {
    name: "Calculateur de la Loi d'Ohm (U = R × I)",
    shortName: "Loi d'Ohm",
    desc: "Tension en volts, intensité en ampères et résistance en ohms.",
  },
  'projectile-motion-calculator': {
    name: "Calculateur de Tir Balistique & Portée",
    shortName: "Balistique",
    desc: "Trajectoire, portée maximale et flèche d'un projectile lancé.",
  },

  // Food
  'recipe-scaler-calculator': {
    name: "Calculateur de Proportions de Recette",
    shortName: "Proportions Recette",
    desc: "Ajustez les quantités d'ingrédients selon le nombre de convives.",
  },
  'macronutrient-calculator': {
    name: "Calculateur de Ratio Nutritionnel",
    shortName: "Ratio Nutrition",
    desc: "Répartition énergétique en glucides, lipides et protéines d'un repas.",
  },
  'bakers-percentage-calculator': {
    name: "Calculateur de Pourcentage de Boulanger",
    shortName: "Boulangerie",
    desc: "Proportions de farine, eau, levain et sel pour panification.",
  },
  'calorie-per-serving-calculator': {
    name: "Calculateur de Calories par Portion",
    shortName: "Calories Portion",
    desc: "Valeur calorique totale divisée par le nombre de parts servies.",
  },

  // Sports
  'heart-rate-zone-calculator': {
    name: "Calculateur de Zones Cardio Sport",
    shortName: "Zones Cardio",
    desc: "Zones d'intensité d'entraînement (échauffement, endurance, PMA).",
  },
  'one-rep-max-calculator': {
    name: "Calculateur de Max en Musculation (1RM)",
    shortName: "1RM Musculation",
    desc: "Charge maximale théorique (formules Brzycki, Epley et Lander).",
  },
  'golf-handicap-calculator': {
    name: "Calculateur de Handicap de Golf",
    shortName: "Handicap Golf",
    desc: "Index de jeu selon les scores de parcours et le slope officiel.",
  },

  // Ecology
  'carbon-footprint-calculator': {
    name: "Calculateur d'Empreinte Carbone Personnelle",
    shortName: "Empreinte Carbone",
    desc: "Émissions annuelles en tonnes d'équivalent CO2 (logement, transport, alimentation).",
  },
  'solar-energy-calculator': {
    name: "Calculateur de Rendement Solaire Panneaux",
    shortName: "Énergie Solaire",
    desc: "Production d'électricité en kWh selon la surface et l'ensoleillement régional.",
  },
  'water-conservation-calculator': {
    name: "Calculateur d'Économie d'Eau",
    shortName: "Économie d'Eau",
    desc: "Volume d'eau économisé en litres et réduction de la facture.",
  },
  'compost-ratio-calculator': {
    name: "Calculateur d'Équilibre Carbone / Azote (C/N)",
    shortName: "Compost C/N",
    desc: "Équilibre matières brunes et vertes pour un compostage réussi.",
  },

  // Profession
  'doctor-pediatric-dosage-calculator': {
    name: "Calculateur de Posologie Pédiatrique",
    shortName: "Posologie",
    desc: "Calcul de dose médicale pédiatrique selon le poids corporel en kg.",
  },
  'nurse-iv-drip-calculator': {
    name: "Calculateur de Débit de Perfusion IV",
    shortName: "Perfusion IV",
    desc: "Débit de gouttes par minute pour perfusion intraveineuse.",
  },
  'lawyer-billable-hours-calculator': {
    name: "Calculateur d'Heures Facturables Avocat",
    shortName: "Heures Facturables",
    desc: "Gestion du temps d'honoraires et rentabilité des dossiers juridiques.",
  },
  'engineer-project-cost-calculator': {
    name: "Calculateur de Coût de Projet Ingénieur",
    shortName: "Coût Projet",
    desc: "Estimation budgétaire de conception et ingénierie technique.",
  },
  'architect-far-calculator': {
    name: "Calculateur de Coefficient d'Occupation des Sols (COS)",
    shortName: "COS / Emprise",
    desc: "Surface de plancher constructible selon la superficie de la parcelle.",
  },
  'accountant-tax-calculator': {
    name: "Calculateur de Cotisations Indépendant & TNS",
    shortName: "Cotisations TNS",
    desc: "Charges sociales et cotisations pour travailleurs non-salariés.",
  },
  'realtor-commission-calculator': {
    name: "Calculateur d'Honoraires d'Agence Immobilière",
    shortName: "Honoraires Agence",
    desc: "Barème des commissions d'agence immobilière TTC sur prix de vente.",
  },
  'developer-sprint-velocity-calculator': {
    name: "Calculateur de Vélocité de Sprint Agile",
    shortName: "Vélocité Agile",
    desc: "Capacité en story points et rythme de livraison Scrum.",
  },
  'teacher-grade-curve-calculator': {
    name: "Calculateur de Courbe de Gauss pour Notes",
    shortName: "Harmonisation Notes",
    desc: "Harmonisation et ajustement de barème de notation académique.",
  },
  'pilot-fuel-burn-calculator': {
    name: "Calculateur de Carburant Aviation",
    shortName: "Carburant Vol",
    desc: "Consommation horaire en litres/kg et autonomie de vol.",
  },
};
