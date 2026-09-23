// src/i18n/homepageDict.ts
import type { SupportedLocale } from '../types/i18n.ts';

export interface HomepageStrings {
  seo: {
    title: string;
    description: string;
    websiteName: string;
    websiteDesc: string;
  };
  hero: {
    pillBadge: string;
    h1Line1: string;
    h1Highlight: string;
    subtitle: string;
    metric1Value: string;
    metric1Label: string;
    metric2Value: string;
    metric2Label: string;
    metric3Value: string;
    metric3Label: string;
  };
  search: {
    placeholder: string;
    ariaLabel: string;
    clearLabel: string;
    ctrlK: string;
    suggestedCount: string;
    openHint: string;
    noResults: string;
    noResultsHint: string;
    verifiedBadge: string;
    navigateHint: string;
    closeHint: string;
    openCalc: string;
    typewriterPrompts: string[];
  };
  categoriesSection: {
    heading: string;
    domainsCount: string;
    categories: Record<string, string>;
    descriptions?: Record<string, string>;
  };
  popularSection: {
    heading: string;
    toolsCount: string;
    tools: Record<string, string>;
  };
  regionsSection: {
    heading: string;
    economiesCount: string;
    countries: Record<string, string>;
  };
  aboutSection: {
    eyebrow: string;
    h2: string;
    desc: string;
    headerLeft: string;
    headerRight: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
    pillar5Title: string;
    pillar5Desc: string;
    pillar6Title: string;
    pillar6Desc: string;
    ctaButton: string;
  };
  orphanSection: {
    badge: string;
    heading: string;
    subtext: string;
    exploreAll: string;
  };
  howItWorksSection?: {
    eyebrow: string;
    heading: string;
    desc: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  guidesSection?: {
    eyebrow: string;
    heading: string;
    desc: string;
    viewAll: string;
  };
  faqSection?: {
    eyebrow: string;
    heading: string;
    desc: string;
    items: Array<{ question: string; answer: string }>;
  };
  footer: {
    brandDesc: string;
    cloudflareVerified: string;
    financeTitle: string;
    healthTitle: string;
    mathTitle: string;
    everydayTitle: string;
    globalTitle: string;
    guides: string;
    about: string;
    contact: string;
    terms: string;
    privacy: string;
    rights: string;
  };
}

export const HOMEPAGE_TRANSLATIONS: Record<SupportedLocale, HomepageStrings> = {
  "en": {
    "seo": {
      "title": "Free Online Calculators – Finance, Math, Health & More | Free Accurate Calculator",
      "description": "Free online calculators for finance, math, health, business and everyday calculations. Get fast, transparent results with documented formulas and clear explanations.",
      "websiteName": "Free Accurate Calculator",
      "websiteDesc": "Free online calculators for finance, health, math, business, and everyday utility."
    },
    "hero": {
      "pillBadge": "100+ Free Online Calculators • Documented Formulas • Private Math",
      "h1Line1": "Free Online Calculators",
      "h1Highlight": "Fast, Accurate & Easy to Use",
      "subtitle": "Access free online calculators for personal finance, math, health, business, statistics, and everyday tasks. Get fast, transparent results with documented formulas, step-by-step explanations, and private browser computations.",
      "metric1Value": "⚡ 100+ Tools",
      "metric1Label": "Free Online Access",
      "metric2Value": "📐 Documented Math",
      "metric2Label": "Formulas & Assumptions",
      "metric3Value": "🔒 Browser-Based",
      "metric3Label": "Zero Data Uploaded"
    },
    "search": {
      "placeholder": "Search 📈 SIP Calculator...",
      "ariaLabel": "Search all calculators",
      "clearLabel": "Clear search",
      "ctrlK": "Ctrl K",
      "suggestedCount": "Suggested Calculators",
      "openHint": "press enter ↵ to open",
      "noResults": "No calculators found",
      "noResultsHint": "Try searching for \"sip\", \"emi\", \"tax\", \"percentage\", or \"mortgage\"",
      "verifiedBadge": "Verified Calculator Links",
      "navigateHint": "navigate",
      "closeHint": "close",
      "openCalc": "Open →",
      "typewriterPrompts": [
        "Search 📈 SIP Calculator...",
        "Search 🎂 Age Calculator...",
        "Search 🏦 EMI Calculator...",
        "Search 🩺 BMI Calculator...",
        "Search 🏠 Mortgage Calculator...",
        "Search 📑 Income Tax Calculator...",
        "Search 🍎 Calorie & TDEE...",
        "Search 📐 Percentage Calculator...",
        "Search 🔬 Scientific Calculator...",
        "Search 🚗 Auto Loan Calculator...",
        "Search 💰 Lumpsum Calculator...",
        "Search ⏱️ Time Calculator...",
        "Search 📊 Compound Interest...",
        "Search 🏢 Rental Yield...",
        "Search 🔄 Unit Converter...",
        "Search 🛡️ Term Life Insurance...",
        "Search ⚖️ Child Support...",
        "Search 💼 Break-Even Analysis...",
        "Search 🎓 GPA Calculator...",
        "Search 📅 Date Difference..."
      ]
    },
    "categoriesSection": {
      "heading": "Calculator Categories",
      "domainsCount": "21 Domains",
      "categories": {
        "finance": "Finance",
        "insurance": "Insurance",
        "legal": "Legal",
        "business": "Business",
        "construction": "Construction",
        "real-estate": "Real Estate",
        "technology": "Technology",
        "health": "Health",
        "statistics": "Statistics",
        "marketing": "Marketing",
        "math": "Math",
        "automotive": "Automotive",
        "biology": "Biology",
        "chemistry": "Chemistry",
        "physics": "Physics",
        "food": "Food",
        "sports": "Sports",
        "ecology": "Ecology",
        "everyday": "Everyday",
        "converter": "Converter",
        "love": "Love"
      },
      "descriptions": {
        "finance": "Calculate loans, mortgages, interest, investments and personal finance scenarios.",
        "insurance": "Estimate term life insurance coverage, premiums and policy needs.",
        "legal": "Estimate alimony, child support and statutory legal obligations.",
        "business": "Analyze ROI, break-even points, profit margins and financial ratios.",
        "construction": "Estimate concrete volume, paint coverage, materials and project dimensions.",
        "real-estate": "Calculate rental yield, property affordability and mortgage amortization.",
        "technology": "Estimate AI token costs, bandwidth, storage and computing resources.",
        "health": "Track BMI, BMR, body fat, caloric needs and health metrics.",
        "statistics": "Compute probabilities, standard deviations, sample sizes and distributions.",
        "marketing": "Calculate CAC, ROAS, conversion rates and campaign performance.",
        "math": "Solve percentages, fractions, scientific equations and geometry problems.",
        "automotive": "Estimate auto loan payments, fuel economy and vehicle depreciation.",
        "biology": "Calculate cell doubling times, DNA concentration and biological rates.",
        "chemistry": "Compute molarity, solution dilutions, gas laws and chemical quantities.",
        "physics": "Calculate velocity, acceleration, kinetic energy, force and physical constants.",
        "food": "Adjust recipe scaling, serving quantities and nutritional proportions.",
        "sports": "Compute running pace, heart-rate training zones and athletic performance.",
        "ecology": "Calculate carbon footprint offsets, compost ratios and ecological impact.",
        "everyday": "Quick utilities for age, date differences, hours worked and passwords.",
        "converter": "Convert length, weight, temperature, area, volume and data units.",
        "love": "Explore zodiac compatibility, relationship metrics and fun interpersonal quizzes."
      }
    },
    "popularSection": {
      "heading": "Popular Calculators",
      "toolsCount": "33 Tools",
      "tools": {
        "percentage-calculator": "Percentage Calculator",
        "bmi-calculator": "BMI Calculator",
        "age-calculator": "Age Calculator",
        "love-calculator": "Love Calculator",
        "scientific-calculator": "Scientific Calculator",
        "emi-calculator": "EMI Calculator",
        "mortgage-calculator": "Mortgage Calculator",
        "loan-calculator": "Loan Calculator",
        "time-calculator": "Time Calculator",
        "date-calculator": "Date Calculator",
        "salary-calculator": "Salary Calculator",
        "compound-interest-calculator": "Compound Interest",
        "conversion-calculator": "Unit Converter",
        "body-fat-calculator": "Body Fat Calculator",
        "bmr-calculator": "BMR Calculator",
        "sip-calculator": "SIP Calculator",
        "auto-loan-calculator": "Auto Loan",
        "gpa-calculator": "GPA Calculator",
        "roi-calculator": "ROI Calculator",
        "tip-calculator": "Tip Calculator",
        "income-tax-calculator": "Income Tax Calculator",
        "probability-calculator": "Probability Calculator",
        "password-generator": "Password Generator",
        "discount-calculator": "Discount Calculator",
        "ovulation-calculator": "Ovulation Calculator",
        "ohms-law-calculator": "Ohm’s Law Calculator",
        "pregnancy-due-date-calculator": "Pregnancy Due Date",
        "concrete-calculator": "Concrete Volume",
        "paint-calculator": "Paint Calculator",
        "amortization-calculator": "Amortization Calculator",
        "inflation-calculator": "Inflation Calculator",
        "square-footage-calculator": "Square Footage",
        "ruler": "Online Ruler"
      }
    },
    "regionsSection": {
      "heading": "Supported Regions",
      "economiesCount": "18 Economies",
      "countries": {
        "united-states": "United States",
        "india": "India",
        "united-kingdom": "United Kingdom",
        "canada": "Canada",
        "australia": "Australia",
        "germany": "Germany",
        "france": "France",
        "japan": "Japan",
        "brazil": "Brazil",
        "italy": "Italy",
        "spain": "Spain",
        "mexico": "Mexico",
        "south-africa": "South Africa",
        "saudi-arabia": "Saudi Arabia",
        "uae": "United Arab Emirates",
        "singapore": "Singapore",
        "netherlands": "Netherlands",
        "nigeria": "Nigeria"
      }
    },
    "aboutSection": {
      "eyebrow": "ENGINEERING & METHODOLOGY",
      "h2": "Built for Speed, Trust & Mathematical Transparency",
      "desc": "Free Accurate Calculator provides reliable, transparent online calculation tools built on documented formulas and private browser computing.",
      "headerLeft": "Core Calculation Pillars",
      "headerRight": "Modern Architecture",
      "pillar1Title": "Pre-rendered Edge Delivery",
      "pillar1Desc": "Static HTML prerendered across Cloudflare's global edge network for fast, reliable calculation access without server round-trip delays.",
      "pillar2Title": "Jurisdiction & Rule Awareness",
      "pillar2Desc": "Calculators adapt to regional standards, including US tax brackets, UK HMRC rules, and Indian Lakh/Crore systems.",
      "pillar3Title": "Private Browser Computing",
      "pillar3Desc": "Calculations execute locally inside your web browser. Your numerical inputs and salary figures are never transmitted to or stored on remote servers.",
      "pillar4Title": "Standard Mathematical Models",
      "pillar4Desc": "Calculations use closed-form algebraic equations, standard JavaScript floating-point arithmetic, and published rounding conventions.",
      "pillar5Title": "Step-by-Step Transparency",
      "pillar5Desc": "Formulas, variable definitions, and worked examples are displayed alongside results so you can verify the math.",
      "pillar6Title": "Export & Print Ready",
      "pillar6Desc": "Generate clean, presentation-ready printable PDF summaries and structured data tables directly from calculation results.",
      "ctaButton": "Learn About Our Methodology"
    },
    "orphanSection": {
      "badge": "Verified Regional Index",
      "heading": "Popular Regional & Specialized Financial Calculators",
      "subtext": "Mathematically verified, localized calculation tools calibrated for country-specific tax codes, currencies, and regulatory standards.",
      "exploreAll": "Explore All Countries"
    },
    "howItWorksSection": {
      "eyebrow": "Methodology & Standards",
      "heading": "How Our Calculators Work",
      "desc": "Engineered for mathematical transparency, clear assumptions, and user privacy.",
      "step1Title": "1. Documented Formulas",
      "step1Desc": "Every calculator implements recognized closed-form mathematical equations, published statutory rules, and peer-reviewed algorithms.",
      "step2Title": "2. Private Client-Side Calculations",
      "step2Desc": "Calculations run directly inside your browser. No financial amounts, salary details, or personal inputs are uploaded to our servers.",
      "step3Title": "3. Transparent Assumptions",
      "step3Desc": "We display the mathematical formulas, variable definitions, rounding conventions, and stated assumptions behind every calculation result."
    },
    "guidesSection": {
      "eyebrow": "Knowledge Base",
      "heading": "Featured Financial & Mathematical Guides",
      "desc": "In-depth mathematical breakdowns, personal finance strategies, and step-by-step decision frameworks.",
      "viewAll": "View All In-Depth Guides →"
    },
    "faqSection": {
      "eyebrow": "Common Questions",
      "heading": "Frequently Asked Questions",
      "desc": "Clear, direct answers about our calculators, data privacy, and methodology.",
      "items": [
        {
          "question": "Are the calculators on Free Accurate Calculator free to use?",
          "answer": "Yes, all calculators are free to use. There are no subscriptions, paywalls, or mandatory account registrations required to calculate or download PDF summaries."
        },
        {
          "question": "How are calculations performed and verified?",
          "answer": "Our calculators use documented mathematical formulas, published statutory standards (such as current tax brackets), and explicit assumptions. Each tool displays the formulas and methodology used so you can verify how numbers are derived."
        },
        {
          "question": "Is my personal or financial data private?",
          "answer": "Yes. Calculations execute client-side in your web browser. Your numerical inputs, salary figures, and personal details are never uploaded to our servers or saved in a remote database."
        },
        {
          "question": "Can I use these calculators on smartphones and tablets?",
          "answer": "Yes. All calculators are designed to be mobile-responsive with optimized touch targets, adaptive numeric keyboards, and fast results on smartphones, tablets, and desktops."
        },
        {
          "question": "Can calculations replace professional financial or health advice?",
          "answer": "No. The calculators provide educational estimates based on mathematical models and stated assumptions. They are not a substitute for professional legal, tax, financial, or medical advice from a certified professional."
        },
        {
          "question": "How can I save or print a calculation summary?",
          "answer": "Every calculator features a 1-click printable report option that creates a clean PDF summary of your inputs, results, and amortization or breakdown tables."
        }
      ]
    },
    "footer": {
      "brandDesc": "Fast, transparent, and private online calculators with edge performance, documented formulas, and browser-based calculations.",
      "cloudflareVerified": "Cloudflare Edge Verified",
      "financeTitle": "Finance & Wealth",
      "healthTitle": "Health & Fitness",
      "mathTitle": "Math & Science",
      "everydayTitle": "Utility & Everyday",
      "globalTitle": "Global Editions",
      "guides": "Guides",
      "about": "About Us",
      "contact": "Contact Us",
      "terms": "Terms & Conditions",
      "privacy": "Privacy Policy",
      "rights": "All rights reserved."
    }
  },
  "es": {
    "seo": {
      "title": "Calculadoras en línea gratuitas – Finanzas, salud y matemáticas | Free Accurate Calculator",
      "description": "Calculadoras en línea gratuitas para finanzas, salud, matemáticas y vida cotidiana. Resultados rápidos y transparentes con fórmulas documentadas.",
      "websiteName": "Free Accurate Calculator (Español)",
      "websiteDesc": "Calculadoras en línea gratuitas para finanzas, salud, matemáticas y uso cotidiano."
    },
    "hero": {
      "pillBadge": "100+ Calculadoras en línea gratuitas • Fórmulas documentadas",
      "h1Line1": "Calculadoras en línea gratuitas",
      "h1Highlight": "Rápidas, precisas y fáciles de usar",
      "subtitle": "Accede a calculadoras en línea gratuitas para finanzas personales, salud, matemáticas, negocios y tareas cotidianas. Resultados transparentes con fórmulas documentadas y cálculos privados en tu navegador.",
      "metric1Value": "⚡ 100+ Herramientas",
      "metric1Label": "Acceso en línea gratuito",
      "metric2Value": "📐 Fórmulas Claras",
      "metric2Label": "Matemáticas verificables",
      "metric3Value": "🔒 En el navegador",
      "metric3Label": "Sin envío de datos"
    },
    "search": {
      "placeholder": "Buscar calculadora (ej. hipoteca, IMC, porcentaje)...",
      "ariaLabel": "Buscar en todas las calculadoras",
      "clearLabel": "Borrar búsqueda",
      "ctrlK": "Ctrl K",
      "suggestedCount": "Calculadoras Sugeridas",
      "openHint": "presiona enter ↵ para abrir",
      "noResults": "No se encontraron calculadoras",
      "noResultsHint": "Prueba buscando \"hipoteca\", \"préstamo\", \"impuestos\", \"porcentaje\" o \"IMC\"",
      "verifiedBadge": "Enlaces Verificados",
      "navigateHint": "navegar",
      "closeHint": "cerrar",
      "openCalc": "Abrir →",
      "typewriterPrompts": [
        "Buscar 🏦 Calculadora de Préstamos (EMI)...",
        "Buscar 🏠 Calculadora de Hipoteca...",
        "Buscar 🩺 Calculadora de IMC...",
        "Buscar 🎂 Calculadora de Edad Exacta...",
        "Buscar 📐 Calculadora de Porcentajes...",
        "Buscar 📊 Interés Compuesto...",
        "Buscar 🍎 Calorías y TDEE...",
        "Buscar 🚗 Préstamo de Auto...",
        "Buscar 💼 Punto de Equilibrio...",
        "Buscar 🔄 Convertidor de Unidades...",
        "Buscar 📑 Impuesto sobre la Renta...",
        "Buscar 🏢 Rendimiento de Alquiler...",
        "Buscar ⏱️ Calculadora de Horas...",
        "Buscar 🔬 Calculadora Científica..."
      ]
    },
    "categoriesSection": {
      "heading": "Categorías",
      "domainsCount": "21 Dominios",
      "categories": {
        "finance": "Finanzas",
        "insurance": "Seguros",
        "legal": "Legal",
        "business": "Negocios",
        "construction": "Construcción",
        "real-estate": "Bienes Raíces",
        "technology": "Tecnología",
        "health": "Salud",
        "statistics": "Estadística",
        "marketing": "Marketing",
        "math": "Matemáticas",
        "automotive": "Automotriz",
        "biology": "Biología",
        "chemistry": "Química",
        "physics": "Física",
        "food": "Alimentación",
        "sports": "Deportes",
        "ecology": "Ecología",
        "everyday": "Vida Diaria",
        "converter": "Conversores",
        "love": "Amor y Pareja"
      },
      "descriptions": {
        "finance": "Calcula préstamos, hipotecas, inversiones y escenarios de finanzas personales.",
        "insurance": "Estima coberturas de seguros de vida, primas y necesidades de pólizas.",
        "legal": "Calcula pensiones alimenticias, manutención de menores y obligaciones legales.",
        "business": "Analiza retorno de inversión (ROI), punto de equilibrio y márgenes comerciales.",
        "construction": "Calcula volumen de concreto, cobertura de pintura y materiales de obra.",
        "real-estate": "Calcula rendimiento de alquileres, amortización de hipotecas y asequibilidad.",
        "technology": "Estima costos de tokens de IA, ancho de banda y almacenamiento en la nube.",
        "health": "Monitorea IMC, tasa metabólica basal (TMB), grasa corporal y calorías diarias.",
        "statistics": "Calcula probabilidades, desviaciones estándar, tamaño de muestra y distribuciones.",
        "marketing": "Estima costo de adquisición (CAC), retorno en publicidad (ROAS) y conversiones.",
        "math": "Resuelve porcentajes, fracciones, ecuaciones científicas y cálculos geométricos.",
        "automotive": "Calcula cuotas de préstamos para autos, consumo de combustible y depreciación.",
        "biology": "Calcula tiempo de duplicación celular, concentración de ADN y tasas biológicas.",
        "chemistry": "Determina molaridad, dilución de soluciones, leyes de gases y masa molecular.",
        "physics": "Calcula velocidad, aceleración, energía cinética, fuerza y magnitudes físicas.",
        "food": "Escala porciones de recetas e ingredientes para cocina y repostería.",
        "sports": "Calcula ritmo de carrera, zonas de frecuencia cardíaca y marcas deportivas.",
        "ecology": "Calcula huella de carbono, proporciones de composta e impacto ambiental.",
        "everyday": "Herramientas rápidas para edad exacta, diferencia de fechas, horas y contraseñas.",
        "converter": "Convierte longitud, peso, temperatura, área, volumen y datos informáticos.",
        "love": "Compatibilidad zodiacal, numerología romántica y pruebas divertidas de pareja."
      }
    },
    "popularSection": {
      "heading": "Calculadoras Populares",
      "toolsCount": "33 Herramientas",
      "tools": {
        "percentage-calculator": "Calculadora de porcentajes",
        "bmi-calculator": "Calculadora de IMC",
        "age-calculator": "Calculadora de edad",
        "love-calculator": "Calculadora de amor",
        "scientific-calculator": "Calculadora científica",
        "emi-calculator": "Calculadora de cuota (EMI)",
        "mortgage-calculator": "Calculadora de hipoteca",
        "loan-calculator": "Calculadora de préstamos",
        "time-calculator": "Calculadora de tiempo",
        "date-calculator": "Calculadora de fechas",
        "salary-calculator": "Calculadora de salario",
        "compound-interest-calculator": "Calculadora de interés compuesto",
        "conversion-calculator": "Conversor de unidades",
        "body-fat-calculator": "Calculadora de grasa corporal",
        "bmr-calculator": "Calculadora de TMB (BMR)",
        "sip-calculator": "Calculadora SIP",
        "auto-loan-calculator": "Préstamo de auto",
        "gpa-calculator": "Calculadora de promedio (GPA)",
        "roi-calculator": "Calculadora de ROI",
        "tip-calculator": "Calculadora de propinas",
        "income-tax-calculator": "Impuesto sobre la renta",
        "probability-calculator": "Calculadora de probabilidad",
        "password-generator": "Generador de contraseñas",
        "discount-calculator": "Calculadora de descuentos",
        "ovulation-calculator": "Calculadora de ovulación",
        "ohms-law-calculator": "Ley de Ohm",
        "pregnancy-due-date-calculator": "Fecha probable de parto",
        "concrete-calculator": "Calculadora de concreto",
        "paint-calculator": "Calculadora de pintura",
        "amortization-calculator": "Tabla de amortización",
        "inflation-calculator": "Calculadora de inflación",
        "square-footage-calculator": "Metros y pies cuadrados",
        "ruler": "Regla en pantalla"
      }
    },
    "regionsSection": {
      "heading": "Regiones y Países",
      "economiesCount": "18 Economías",
      "countries": {
        "united-states": "Estados Unidos",
        "india": "India",
        "united-kingdom": "Reino Unido",
        "canada": "Canadá",
        "australia": "Australia",
        "germany": "Alemania",
        "france": "Francia",
        "japan": "Japón",
        "brazil": "Brasil",
        "italy": "Italia",
        "spain": "España",
        "mexico": "México",
        "south-africa": "Sudáfrica",
        "saudi-arabia": "Arabia Saudita",
        "uae": "Emiratos Árabes",
        "singapore": "Singapur",
        "netherlands": "Países Bajos",
        "nigeria": "Nigeria"
      }
    },
    "aboutSection": {
      "eyebrow": "INGENIERÍA Y METODOLOGÍA",
      "h2": "Diseñado para Velocidad, Confianza y Transparencia Matemática",
      "desc": "Free Accurate Calculator ofrece herramientas de cálculo online confiables y transparentes, basadas en fórmulas documentadas y computación privada en tu navegador.",
      "headerLeft": "Pilares de Cálculo",
      "headerRight": "Arquitectura Moderna",
      "pillar1Title": "Entrega Rápida en el Borde",
      "pillar1Desc": "HTML estático pre-renderizado en la red global de Cloudflare para un acceso inmediato sin demoras de servidor.",
      "pillar2Title": "Adaptación Regional",
      "pillar2Desc": "Herramientas adaptadas a estándares locales, monedas internacionales y formatos numéricos claros.",
      "pillar3Title": "Cálculos en tu Navegador",
      "pillar3Desc": "Los cálculos se ejecutan localmente en tu navegador. Tus datos y cifras financieras nunca se envían ni se guardan en servidores remotos.",
      "pillar4Title": "Modelos Matemáticos Estándar",
      "pillar4Desc": "Ecuaciones algebraicas cerradas y aritmética estándar de punto flotante en JavaScript con reglas explícitas de redondeo.",
      "pillar5Title": "Transparencia Paso a Paso",
      "pillar5Desc": "Fórmulas, variables y ejemplos explicativos disponibles para verificar cada resultado numérico.",
      "pillar6Title": "Listo para Imprimir y PDF",
      "pillar6Desc": "Genera resúmenes limpios en PDF y tablas de amortización imprimibles directamente desde tus resultados.",
      "ctaButton": "Conoce Nuestra Metodología"
    },
    "orphanSection": {
      "badge": "Índice Regional Verificado",
      "heading": "Calculadoras Financieras Regionales y Especializadas",
      "subtext": "Herramientas matemáticas verificadas y calibradas para normativas fiscales, monedas y estándares locales.",
      "exploreAll": "Explorar Todos los Países"
    },
    "howItWorksSection": {
      "eyebrow": "Metodología y Estándares",
      "heading": "Cómo Funcionan Nuestras Calculadoras",
      "desc": "Diseñadas para máxima transparencia matemática, supuestos claros y privacidad total.",
      "step1Title": "1. Fórmulas Documentadas",
      "step1Desc": "Cada herramienta implementa ecuaciones matemáticas estándar y algoritmos reconocidos.",
      "step2Title": "2. Procesamiento Local en el Navegador",
      "step2Desc": "Todos los cálculos se resuelven en tu dispositivo. Ningún dato financiero o personal se envía a servidores.",
      "step3Title": "3. Supuestos Transparentes",
      "step3Desc": "Presentamos con claridad las fórmulas, variables y criterios de redondeo para que puedas verificar los números."
    },
    "faqSection": {
      "eyebrow": "Preguntas Frecuentes",
      "heading": "Preguntas Frecuentes sobre las Calculadoras",
      "desc": "Respuestas directas sobre el funcionamiento, privacidad y precisión de nuestras herramientas.",
      "items": [
        {
          "question": "¿Las calculadoras de Free Accurate Calculator son totalmente gratuitas?",
          "answer": "Sí, todas las calculadoras son de uso libre y gratuito. No requieren registros, cuentas ni suscripciones para calcular o descargar reportes en PDF."
        },
        {
          "question": "¿Cómo se garantiza la precisión de las operaciones?",
          "answer": "Nuestras calculadoras aplican fórmulas matemáticas estándar y supuestos explícitos. Cada herramienta detalla su metodología para que puedas verificar los cálculos."
        },
        {
          "question": "¿Mis datos personales o financieros se guardan en algún servidor?",
          "answer": "No. Toda la computación ocurre en la memoria local de tu navegador web. No recopilamos, transmitimos ni almacenamos tus entradas numéricas."
        },
        {
          "question": "¿Puedo usar estas calculadoras en teléfonos móviles y tabletas?",
          "answer": "Sí. Todas las calculadoras cuentan con diseño adaptable y optimizado para pantallas táctiles en dispositivos móviles, tabletas y ordenadores de escritorio."
        },
        {
          "question": "¿Los resultados sustituyen el consejo de un profesional?",
          "answer": "No. Las calculadoras proporcionan estimaciones educativas basadas en modelos matemáticos. No reemplazan la asesoría profesional certificada en finanzas, impuestos o salud."
        },
        {
          "question": "¿Cómo puedo guardar o imprimir mis resultados?",
          "answer": "Cada herramienta incluye una función para generar un reporte limpio en formato PDF o imprimir la tabla de resultados en un solo clic."
        }
      ]
    },
    "footer": {
      "brandDesc": "Calculadoras matemáticas online rápidas, transparentes y privadas con ejecución directa en el navegador y fórmulas documentadas.",
      "cloudflareVerified": "Verificado en Cloudflare Edge",
      "financeTitle": "Finanzas y Préstamos",
      "healthTitle": "Salud y Bienestar",
      "mathTitle": "Matemáticas y Ciencia",
      "everydayTitle": "Utilidades Diarias",
      "globalTitle": "Ediciones Globales",
      "guides": "Guías",
      "about": "Sobre Nosotros",
      "contact": "Contacto",
      "terms": "Términos de Uso",
      "privacy": "Política de Privacidad",
      "rights": "Todos los derechos reservados."
    }
  },
  "fr": {
    "seo": {
      "title": "Calculateurs en ligne gratuits – Finance, santé et maths | Free Accurate Calculator",
      "description": "Calculateurs en ligne gratuits pour les finances, la santé, les maths et le quotidien. Résultats instantanés avec formules documentées et explications claires.",
      "websiteName": "Free Accurate Calculator (Français)",
      "websiteDesc": "Calculateurs en ligne gratuits et précis pour la finance, la santé, les mathématiques et le quotidien."
    },
    "hero": {
      "pillBadge": "100+ Calculateurs gratuits • Formules documentées • Calculs privés",
      "h1Line1": "Calculateurs en ligne gratuits",
      "h1Highlight": "Rapides, précis et simples d’utilisation",
      "subtitle": "Accédez à des calculateurs en ligne gratuits pour vos finances personnelles, votre santé, vos calculs mathématiques et professionnels. Résultats instantanés, formules documentées et exécution sécurisée dans votre navigateur.",
      "metric1Value": "⚡ 100+ Outils",
      "metric1Label": "Accès libre et gratuit",
      "metric2Value": "📐 Formules Claires",
      "metric2Label": "Méthodes documentées",
      "metric3Value": "🔒 Dans le navigateur",
      "metric3Label": "Zéro transmission"
    },
    "search": {
      "placeholder": "Rechercher un calculateur (ex. prêt immobilier, IMC, pourcentage)...",
      "ariaLabel": "Rechercher parmi tous les calculateurs",
      "clearLabel": "Effacer la recherche",
      "ctrlK": "Ctrl K",
      "suggestedCount": "Suggestions de calculateurs",
      "openHint": "appuyez sur entrée ↵ pour ouvrir",
      "noResults": "Aucun calculateur trouvé",
      "noResultsHint": "Essayez de chercher \"prêt\", \"impôt\", \"pourcentage\", \"imc\" ou \"intérêts\"",
      "verifiedBadge": "Liens vérifiés",
      "navigateHint": "naviguer",
      "closeHint": "fermer",
      "openCalc": "Ouvrir →",
      "typewriterPrompts": [
        "Rechercher 🏦 Calculateur de Prêt Immobilier...",
        "Rechercher 🩺 Calculateur IMC...",
        "Rechercher 📈 Intérêts Composés...",
        "Rechercher 📐 Calculateur de Pourcentage...",
        "Rechercher 🎂 Calculateur d’Âge Précis...",
        "Rechercher 🚗 Prêt Automobile...",
        "Rechercher 📊 Épargne Programmée...",
        "Rechercher 🔄 Convertisseur d’Unités...",
        "Rechercher 💼 Calculateur de Salaire Brut Net...",
        "Rechercher ⏱️ Calculateur d’Heures de Travail...",
        "Rechercher 🔬 Calculateur Scientifique..."
      ]
    },
    "categoriesSection": {
      "heading": "Catégories",
      "domainsCount": "21 Domaines",
      "categories": {
        "finance": "Finance",
        "insurance": "Assurance",
        "legal": "Droit & Famille",
        "business": "Gestion & Entreprise",
        "construction": "BTP & Travaux",
        "real-estate": "Immobilier",
        "technology": "Informatique & IA",
        "health": "Santé & Forme",
        "statistics": "Statistiques",
        "marketing": "Marketing",
        "math": "Mathématiques",
        "automotive": "Automobile",
        "biology": "Biologie",
        "chemistry": "Chimie",
        "physics": "Physique",
        "food": "Cuisine & Nutrition",
        "sports": "Sport & Fitness",
        "ecology": "Écologie",
        "everyday": "Vie Quotidienne",
        "converter": "Convertisseurs",
        "love": "Amour & Affinités"
      },
      "descriptions": {
        "finance": "Calculez vos mensualités de crédit, prêts immobiliers, intérêts et épargne.",
        "insurance": "Estimez vos cotisations d’assurance vie, garanties et capitaux nécessaires.",
        "legal": "Calculez pensions alimentaires, prestations compensatoires et obligations.",
        "business": "Analysez retour sur investissement (ROI), point mort et marges commerciales.",
        "construction": "Estimez volumes de béton, surfaces de peinture et quantités de matériaux.",
        "real-estate": "Calculez rendement locatif brut/net, mensualités et capacité d’emprunt.",
        "technology": "Estimez coûts de tokens IA, bande passante réseau et stockage cloud.",
        "health": "Suivez IMC, métabolisme de base (MB), masse grasse et besoins caloriques.",
        "statistics": "Calculez probabilités, écarts-types, tailles d’échantillons et lois usuelles.",
        "marketing": "Mesurez coût d’acquisition (CAC), rentabilité publicitaire (ROAS) et conversions.",
        "math": "Résolvez pourcentages, fractions, calculs géométriques et équations scientifiques.",
        "automotive": "Calculez mensualités de crédit auto, consommation de carburant et décote.",
        "biology": "Calculez temps de dédoublement cellulaire, concentration ADN et cinétique.",
        "chemistry": "Calculez molarité, dilutions de solutions, lois des gaz et masses molaires.",
        "physics": "Calculez vitesse, accélération, énergie cinétique, forces et lois physiques.",
        "food": "Ajustez proportions de recettes et quantités d’ingrédients en cuisine.",
        "sports": "Calculez allures de course, zones cardiaques d’entraînement et temps cibles.",
        "ecology": "Estimez empreinte carbone, compostage équilibré et impact environnemental.",
        "everyday": "Outils rapides pour calcul d’âge, durées, fiches d’heures et mots de passe.",
        "converter": "Convertissez longueurs, poids, températures, surfaces, volumes et octets.",
        "love": "Compatibilité astrologique, tests de prénoms et quiz relationnels ludiques."
      }
    },
    "popularSection": {
      "heading": "Calculateurs Populaires",
      "toolsCount": "33 Outils",
      "tools": {
        "percentage-calculator": "Calculateur de pourcentage",
        "bmi-calculator": "Calculateur IMC",
        "age-calculator": "Calculateur d’âge",
        "love-calculator": "Calculateur d’amour",
        "scientific-calculator": "Calculateur scientifique",
        "emi-calculator": "Calculateur de mensualité (EMI)",
        "mortgage-calculator": "Calculateur de prêt immobilier",
        "loan-calculator": "Calculateur de prêt",
        "time-calculator": "Calculateur de temps",
        "date-calculator": "Calculateur de dates",
        "salary-calculator": "Calculateur de salaire",
        "compound-interest-calculator": "Calculateur d’intérêts composés",
        "conversion-calculator": "Convertisseur d’unités",
        "body-fat-calculator": "Masse graisseuse",
        "bmr-calculator": "Métabolisme de base (MB)",
        "sip-calculator": "Calculateur d’épargne programmée",
        "auto-loan-calculator": "Prêt automobile",
        "gpa-calculator": "Calculateur de moyenne",
        "roi-calculator": "Calculateur de ROI",
        "tip-calculator": "Calculateur de pourboire",
        "income-tax-calculator": "Impôt sur le revenu",
        "probability-calculator": "Calculateur de probabilité",
        "password-generator": "Générateur de mots de passe",
        "discount-calculator": "Calculateur de soldes",
        "ovulation-calculator": "Calculateur d’ovulation",
        "ohms-law-calculator": "Loi d’Ohm",
        "pregnancy-due-date-calculator": "Date d’accouchement",
        "concrete-calculator": "Calculateur de béton",
        "paint-calculator": "Calculateur de peinture",
        "amortization-calculator": "Tableau d’amortissement",
        "inflation-calculator": "Calculateur d’inflation",
        "square-footage-calculator": "Calculateur de surface",
        "ruler": "Règle en ligne"
      }
    },
    "regionsSection": {
      "heading": "Régions & Pays",
      "economiesCount": "18 Économies",
      "countries": {
        "united-states": "États-Unis",
        "india": "Inde",
        "united-kingdom": "Royaume-Uni",
        "canada": "Canada",
        "australia": "Australie",
        "germany": "Allemagne",
        "france": "France",
        "japan": "Japon",
        "brazil": "Brésil",
        "italy": "Italie",
        "spain": "Espagne",
        "mexico": "Mexique",
        "south-africa": "Afrique du Sud",
        "saudi-arabia": "Arabie Saoudite",
        "uae": "Émirats Arabes Unis",
        "singapore": "Singapour",
        "netherlands": "Pays-Bas",
        "nigeria": "Nigeria"
      }
    },
    "aboutSection": {
      "eyebrow": "INGÉNIERIE & MÉTHODOLOGIE",
      "h2": "Vitesse, Fiabilité et Rigueur Mathématique",
      "desc": "Free Accurate Calculator propose des outils de calcul en ligne précis et transparents, conçus sur des formules documentées et exécutés localement dans votre navigateur.",
      "headerLeft": "Piliers Fondamentaux",
      "headerRight": "Architecture Moderne",
      "pillar1Title": "Distribution Edge Prégénérée",
      "pillar1Desc": "Pages HTML statiques pré-rendues sur le réseau mondial de Cloudflare pour un chargement immédiat et sans latence serveur.",
      "pillar2Title": "Normes & Réglementations",
      "pillar2Desc": "Outils adaptés aux formats financiers, devises et normes mathématiques avec hypothèses transparentes.",
      "pillar3Title": "Traitement Local dans le Navigateur",
      "pillar3Desc": "Toutes les opérations mathématiques s’exécutent directement dans votre navigateur web sans téléversement de données personnelles.",
      "pillar4Title": "Modèles Mathématiques Standard",
      "pillar4Desc": "Équations algébriques fermées et arithmétique standard en virgule flottante JavaScript avec règles d’arrondi explicites.",
      "pillar5Title": "Transparence des Calculs",
      "pillar5Desc": "Formules mathématiques, définitions de variables et étapes détaillées affichées aux côtés de chaque résultat.",
      "pillar6Title": "Rapports PDF & Impression",
      "pillar6Desc": "Génération instantanée de fiches de calcul propres et de tableaux d’amortissement prêts à l’impression.",
      "ctaButton": "Découvrir Notre Méthodologie"
    },
    "orphanSection": {
      "badge": "Index Régional Vérifié",
      "heading": "Calculateurs Régionaux et Spécialisés",
      "subtext": "Outils mathématiques étalonnés pour les normes fiscales, monétaires et barèmes de chaque pays.",
      "exploreAll": "Explorer Tous les Pays"
    },
    "howItWorksSection": {
      "eyebrow": "Méthodologie & Standards",
      "heading": "Comment Fonctionnent Nos Calculateurs",
      "desc": "Conçus pour garantir la transparence des équations, la clarté des hypothèses et le respect strict de la vie privée.",
      "step1Title": "1. Formules Mathématiques Documentées",
      "step1Desc": "Chaque outil met en œuvre des formules reconnues, des règles de calcul standard et des algorithmes validés.",
      "step2Title": "2. Traitement Local dans le Navigateur",
      "step2Desc": "Les calculs sont exécutés directement dans votre navigateur. Aucun montant financier ou donnée personnelle n’est transmis à nos serveurs.",
      "step3Title": "3. Hypothèses et Variables Explicites",
      "step3Desc": "Toutes les formules, conventions d’arrondi et variables sont affichées afin que vous puissiez contrôler les résultats pas à pas."
    },
    "faqSection": {
      "eyebrow": "Questions Fréquentes",
      "heading": "Foire Aux Questions sur Nos Outils",
      "desc": "Réponses claires sur le fonctionnement, la confidentialité et la précision de nos calculateurs.",
      "items": [
        {
          "question": "Les calculateurs sont-ils réellement gratuits ?",
          "answer": "Oui, tous nos outils sont en libre accès gratuit. Aucun abonnement, paiement ou inscription obligatoire n’est requis pour calculer ou exporter vos résumés PDF."
        },
        {
          "question": "Comment les calculs sont-ils effectués et vérifiés ?",
          "answer": "Nos calculateurs reposent sur des formules mathématiques documentées, des normes financières éprouvées et des hypothèses clairement exposées."
        },
        {
          "question": "Mes données personnelles ou financières sont-elles confidentielles ?",
          "answer": "Oui. Le traitement s’effectue exclusivement dans la mémoire locale de votre navigateur. Aucune donnée saisie n’est enregistrée ni transmise à nos serveurs."
        },
        {
          "question": "Puis-je utiliser ces outils sur mobile et tablette ?",
          "answer": "Oui. Chaque calculateur bénéficie d’une interface responsive pensée pour les écrans tactiles sur smartphone, tablette et ordinateur de bureau."
        },
        {
          "question": "Les résultats remplacent-ils un avis d’expert ?",
          "answer": "Non. Ces calculateurs constituent des outils d’aide à la décision basés sur des modèles mathématiques. Ils ne remplacent pas l’avis d’un conseiller fiscal, notaire, comptable ou médecin."
        },
        {
          "question": "Comment enregistrer ou imprimer un récapitulatif ?",
          "answer": "Un bouton dédié permet de générer instantanément un document PDF clair et structuré contenant vos saisies, les résultats et le tableau d’amortissement."
        }
      ]
    },
    "footer": {
      "brandDesc": "Calculateurs en ligne rapides, transparents et privés, avec exécution directe dans le navigateur et formules documentées.",
      "cloudflareVerified": "Vérifié sur Cloudflare Edge",
      "financeTitle": "Finance & Crédits",
      "healthTitle": "Santé & Forme",
      "mathTitle": "Mathématiques & Sciences",
      "everydayTitle": "Utilitaires du Quotidien",
      "globalTitle": "Éditions Internationales",
      "guides": "Guides",
      "about": "À Propos",
      "contact": "Contact",
      "terms": "Conditions d’Utilisation",
      "privacy": "Politique de Confidentialité",
      "rights": "Tous droits réservés."
    }
  },
  "de": {
    "seo": {
      "title": "Kostenlose Online-Rechner – Finanzen, Gesundheit & Mathe | Free Accurate Calculator",
      "description": "Kostenlose Online-Rechner für Finanzen, Gesundheit, Mathematik und Alltag. Schnelle, transparente Ergebnisse mit dokumentierten Formeln und Erklärungen.",
      "websiteName": "Free Accurate Calculator (Deutsch)",
      "websiteDesc": "Kostenlose, transparente und präzise Online-Rechner für Finanzen, Gesundheit, Mathematik und Alltag."
    },
    "hero": {
      "pillBadge": "100+ Kostenlose Online-Rechner • Dokumentierte Formeln",
      "h1Line1": "Kostenlose Online-Rechner",
      "h1Highlight": "Schnell, präzise & einfach",
      "subtitle": "Nutzen Sie kostenlose Online-Rechner für Finanzen, Gesundheit, Mathematik, Wirtschaft und alltägliche Berechnungen. Schnelle Ergebnisse, transparente Formeln und private Berechnungen direkt im Browser.",
      "metric1Value": "⚡ 100+ Rechner",
      "metric1Label": "Kostenloser Zugang",
      "metric2Value": "📐 Klare Formeln",
      "metric2Label": "Dokumentierte Methodik",
      "metric3Value": "🔒 Im Browser",
      "metric3Label": "Keine Datenübertragung"
    },
    "search": {
      "placeholder": "Rechner suchen (z. B. Kredit, BMI, Prozent, Zinsen)...",
      "ariaLabel": "Alle Rechner durchsuchen",
      "clearLabel": "Suche löschen",
      "ctrlK": "Strg K",
      "suggestedCount": "Rechner-Vorschläge",
      "openHint": "Eingabetaste ↵ zum Öffnen",
      "noResults": "Keine Rechner gefunden",
      "noResultsHint": "Versuchen Sie es mit \"Kredit\", \"Zins\", \"Prozent\", \"BMI\" oder \"Steuer\"",
      "verifiedBadge": "Geprüfte Rechner-Links",
      "navigateHint": "navigieren",
      "closeHint": "schließen",
      "openCalc": "Öffnen →",
      "typewriterPrompts": [
        "Suchen 🏦 Kreditrechner (Monatsrate)...",
        "Suchen 🩺 BMI-Rechner...",
        "Suchen 📈 Zinseszinsrechner...",
        "Suchen 📐 Prozentrechner...",
        "Suchen 🎂 Altersrechner...",
        "Suchen 🚗 Autokreditrechner...",
        "Suchen 📊 Sparplanrechner...",
        "Suchen 🔄 Einheitenumrechner...",
        "Suchen 💼 Gehaltsrechner Brutto Netto...",
        "Suchen ⏱️ Arbeitszeitrechner...",
        "Suchen 🔬 Wissenschaftlicher Rechner..."
      ]
    },
    "categoriesSection": {
      "heading": "Kategorien",
      "domainsCount": "21 Bereiche",
      "categories": {
        "finance": "Finanzen",
        "insurance": "Versicherung",
        "legal": "Recht & Familie",
        "business": "Wirtschaft",
        "construction": "Bau & Handwerk",
        "real-estate": "Immobilien",
        "technology": "Technologie & IT",
        "health": "Gesundheit & Fitness",
        "statistics": "Statistik",
        "marketing": "Marketing",
        "math": "Mathematik",
        "automotive": "Auto & Mobilität",
        "biology": "Biologie",
        "chemistry": "Chemie",
        "physics": "Physik",
        "food": "Ernährung & Kochen",
        "sports": "Sport & Training",
        "ecology": "Ökologie",
        "everyday": "Alltag & Nutzen",
        "converter": "Einheitenumrechner",
        "love": "Partnerschaft & Tests"
      },
      "descriptions": {
        "finance": "Berechnen Sie Kredite, Hypothekenzinsen, Renditen und private Finanzpläne.",
        "insurance": "Schätzen Sie Risikolebensversicherungen, Prämien und Absicherungsbedarf ab.",
        "legal": "Berechnen Sie Unterhaltsansprüche, Kindesunterhalt und gesetzliche Richtwerte.",
        "business": "Analysieren Sie ROI, Gewinnschwellen (Break-Even) und Gewinnspannen.",
        "construction": "Berechnen Sie Betonmengen, Farbbedarf und Baustoffabmessungen.",
        "real-estate": "Ermitteln Sie Mietrenditen, Annuitäten und Immobilienfinanzierungen.",
        "technology": "Schätzen Sie KI-Tokenkosten, Bandbreiten und Cloud-Speicherplatz ab.",
        "health": "Überwachen Sie BMI, Grundumsatz (BMR), Körperfett und Kalorienbedarf.",
        "statistics": "Ermitteln Sie Wahrscheinlichkeiten, Standardabweichungen und Stichproben.",
        "marketing": "Berechnen Sie Kundenakquisitionskosten (CAC), ROAS und Conversion-Raten.",
        "math": "Lösen Sie Prozentsätze, Brüche, geometrische Flächen und wissenschaftliche Gleichungen.",
        "automotive": "Kreditraten für Kfz, Spritkosten und Wertverlust präzise kalkulieren.",
        "biology": "Zellverdopplungszeiten, DNA-Konzentrationen und Wachstumsraten berechnen.",
        "chemistry": "Stoffmengenkonzentration (Molarität), Verdünnungen und Gasgesetze berechnen.",
        "physics": "Geschwindigkeit, Beschleunigung, kinetische Energie und Kräfte berechnen.",
        "food": "Passen Sie Rezeptmengen, Portionen und Nährwertanteile exakt an.",
        "sports": "Laufpace, Trainingspulszonen und sportliche Zielzeiten ermitteln.",
        "ecology": "Berechnen Sie CO₂-Kompensationen, Kompostverhältnisse und Umweltauswirkungen.",
        "everyday": "Schnelle Helfer für Alter, Datumdifferenzen, Stundenzettel und Passwörter.",
        "converter": "Längen, Gewichte, Temperaturen, Flächen, Volumina und Datenmengen umrechnen.",
        "love": "Sternzeichen-Harmonie, Partnertests und unterhaltsame Beziehungstools."
      }
    },
    "popularSection": {
      "heading": "Beliebte Rechner",
      "toolsCount": "33 Werkzeuge",
      "tools": {
        "percentage-calculator": "Prozentrechner",
        "bmi-calculator": "BMI-Rechner",
        "age-calculator": "Altersrechner",
        "love-calculator": "Liebesrechner",
        "scientific-calculator": "Wissenschaftlicher Rechner",
        "emi-calculator": "Kreditrechner (Rate)",
        "mortgage-calculator": "Hypothekenrechner",
        "loan-calculator": "Darlehensrechner",
        "time-calculator": "Zeitrechner",
        "date-calculator": "Datumsrechner",
        "salary-calculator": "Gehaltsrechner",
        "compound-interest-calculator": "Zinseszinsrechner",
        "conversion-calculator": "Einheitenumrechner",
        "body-fat-calculator": "Körperfettrechner",
        "bmr-calculator": "Grundumsatz-Rechner (BMR)",
        "sip-calculator": "Sparplanrechner",
        "auto-loan-calculator": "Autokredit-Rechner",
        "gpa-calculator": "Notendurchschnitt-Rechner",
        "roi-calculator": "ROI-Rechner",
        "tip-calculator": "Trinkgeldrechner",
        "income-tax-calculator": "Einkommensteuerrechner",
        "probability-calculator": "Wahrscheinlichkeitsrechner",
        "password-generator": "Passwort-Generator",
        "discount-calculator": "Rabattrechner",
        "ovulation-calculator": "Eisprungrechner",
        "ohms-law-calculator": "Ohmsches Gesetz",
        "pregnancy-due-date-calculator": "Geburtsterminrechner",
        "concrete-calculator": "Betonrechner",
        "paint-calculator": "Farbrechner",
        "amortization-calculator": "Tilgungsrechner",
        "inflation-calculator": "Inflationsrechner",
        "square-footage-calculator": "Flächenrechner (m²)",
        "ruler": "Online-Lineal"
      }
    },
    "regionsSection": {
      "heading": "Länder & Regionen",
      "economiesCount": "18 Volkswirtschaften",
      "countries": {
        "united-states": "Vereinigte Staaten",
        "india": "Indien",
        "united-kingdom": "Vereinigtes Königreich",
        "canada": "Kanada",
        "australia": "Australien",
        "germany": "Deutschland",
        "france": "Frankreich",
        "japan": "Japan",
        "brazil": "Brasilien",
        "italy": "Italien",
        "spain": "Spanien",
        "mexico": "Mexiko",
        "south-africa": "Südafrika",
        "saudi-arabia": "Saudi-Arabien",
        "uae": "Vereinigte Arabische Emirate",
        "singapore": "Singapur",
        "netherlands": "Niederlande",
        "nigeria": "Nigeria"
      }
    },
    "aboutSection": {
      "eyebrow": "METHODIK & ENTWICKLUNG",
      "h2": "Konzipiert für Geschwindigkeit, Vertrauen und mathematische Transparenz",
      "desc": "Free Accurate Calculator bietet verlässliche und transparente Online-Berechnungswerkzeuge, basierend auf dokumentierten Formeln und geschützter lokaler Browser-Ausführung.",
      "headerLeft": "Zentrale Rechensäulen",
      "headerRight": "Moderne Architektur",
      "pillar1Title": "Edge-Auslieferung",
      "pillar1Desc": "Statische HTML-Seiten auf Cloudflares weltweitem Edge-Netzwerk für schnellen und zuverlässigen Zugriff ohne Serververzögerungen.",
      "pillar2Title": "Regionale Anpassung",
      "pillar2Desc": "Anpassung an internationale Währungs- und Zahlenformate sowie dokumentierte Rechenstandards.",
      "pillar3Title": "Ausführung direkt im Browser",
      "pillar3Desc": "Berechnungen laufen lokal in Ihrem Browser ab. Ihre eingegebenen Finanz- und Personendaten werden zu keinem Zeitpunkt an Server übertragen.",
      "pillar4Title": "Standardisierte Rechenmodelle",
      "pillar4Desc": "Geschlossene mathematische Formeln und standardisierte JavaScript-Gleitkomma-Arithmetik mit klaren Rundungsregeln.",
      "pillar5Title": "Schrittweise Transparenz",
      "pillar5Desc": "Formeln, Variablen und Erläuterungen werden direkt bei jedem Berechnungsergebnis transparent dargestellt.",
      "pillar6Title": "PDF- & Druckfunktion",
      "pillar6Desc": "Erstellen Sie saubere, druckfertige PDF-Zusammenfassungen und Tilgungspläne direkt mit einem Klick.",
      "ctaButton": "Mehr Über Unsere Methodik"
    },
    "orphanSection": {
      "badge": "Geprüfter Regionalindex",
      "heading": "Regionale und Spezialisierte Finanzrechner",
      "subtext": "Mathematisch überprüfte Werkzeuge, abgestimmt auf länderspezifische Steuermodelle, Währungen und Rechtsnormen.",
      "exploreAll": "Alle Länder Anzeigen"
    },
    "howItWorksSection": {
      "eyebrow": "Methodik & Standards",
      "heading": "So funktionieren unsere Rechner",
      "desc": "Entwickelt für mathematische Transparenz, klare Annahmen und vollständigen Datenschutz.",
      "step1Title": "1. Dokumentierte Formeln",
      "step1Desc": "Jeder Rechner basiert auf anerkannten mathematischen Formeln und publizierten Fachstandards.",
      "step2Title": "2. Lokale Verarbeitung im Browser",
      "step2Desc": "Alle Berechnungen laufen auf Ihrem Endgerät. Es werden keine vertraulichen Eingaben oder Beträge an Server übertragen.",
      "step3Title": "3. Transparente Annahmen",
      "step3Desc": "Formeln, Variablen und Rundungsregeln werden offen dargelegt, damit Sie alle Schritte nachvollziehen können."
    },
    "faqSection": {
      "eyebrow": "Häufige Fragen",
      "heading": "Häufig gestellte Fragen zu unseren Rechnern",
      "desc": "Direkte Antworten zu Funktionsweise, Datenschutz und Genauigkeit unserer Rechenwerkzeuge.",
      "items": [
        {
          "question": "Sind alle Rechner auf dieser Website kostenlos nutzbar?",
          "answer": "Ja, alle Tools stehen uneingeschränkt kostenlos zur Verfügung. Es gibt weder Abonnements noch Bezahlschranken oder Pflichtanmeldungen."
        },
        {
          "question": "Wie werden die Berechnungen durchgeführt und geprüft?",
          "answer": "Unsere Rechner verwenden offengelegte Formeln und publizierte Standards. Neben jedem Ergebnis finden Sie die Berechnungsmethode zur Überprüfung."
        },
        {
          "question": "Sind meine persönlichen und finanziellen Daten geschützt?",
          "answer": "Ja. Die Berechnungen werden clientseitig im Arbeitsspeicher Ihres Browsers ausgeführt und nicht an externe Server übertragen."
        },
        {
          "question": "Funktionieren die Rechner auf Smartphones und Tablets?",
          "answer": "Ja. Alle Rechner sind vollständig für mobile Endgeräte optimiert, mit bequemen Touch-Bedienelementen und schneller Ergebnisausgabe."
        },
        {
          "question": "Können die Berechnungen eine professionelle Beratung ersetzen?",
          "answer": "Nein. Unsere Tools bieten fundierte Orientierungswerte auf mathematischer Basis, ersetzen jedoch keine zertifizierte Steuer-, Rechts- oder Finanzberatung."
        },
        {
          "question": "Wie kann ich Ergebnisse speichern oder ausdrucken?",
          "answer": "Jeder Rechner bietet eine Druck- und PDF-Exportfunktion, um Ergebnisse und Tilgungstabellen übersichtlich abzuspeichern."
        }
      ]
    },
    "footer": {
      "brandDesc": "Schnelle, transparente und private Online-Rechner mit direkter Ausführung im Browser und dokumentierten Formeln.",
      "cloudflareVerified": "Geprüft auf Cloudflare Edge",
      "financeTitle": "Finanzen & Kredite",
      "healthTitle": "Gesundheit & Fitness",
      "mathTitle": "Mathematik & Wissenschaft",
      "everydayTitle": "Alltagsrechner",
      "globalTitle": "Globale Versionen",
      "guides": "Leitfäden",
      "about": "Über Uns",
      "contact": "Kontakt",
      "terms": "Nutzungsbedingungen",
      "privacy": "Datenschutz",
      "rights": "Alle Rechte vorbehalten."
    }
  },
  "hi": {
    "seo": {
      "title": "मुफ़्त ऑनलाइन कैलकुलेटर – वित्त, स्वास्थ्य और गणित | Free Accurate Calculator",
      "description": "वित्त, स्वास्थ्य, गणित और दैनिक उपयोग के लिए मुफ़्त ऑनलाइन कैलकुलेटर। स्पष्ट सूत्रों और पारदर्शी गणनाओं के साथ तुरंत परिणाम प्राप्त करें।",
      "websiteName": "Free Accurate Calculator (हिंदी)",
      "websiteDesc": "व्यक्तिगत वित्त, स्वास्थ्य, गणित और रोज़मर्रा के उपयोग हेतु मुफ़्त एवं सटीक ऑनलाइन कैलकुलेटर।"
    },
    "hero": {
      "pillBadge": "100+ मुफ़्त ऑनलाइन कैलकुलेटर • प्रमाणित सूत्र • सुरक्षित गणना",
      "h1Line1": "मुफ़्त ऑनलाइन कैलकुलेटर",
      "h1Highlight": "तेज़, सटीक और उपयोग में आसान",
      "subtitle": "व्यक्तिगत वित्त, गणित, स्वास्थ्य, व्यवसाय और दैनिक कार्यों के लिए मुफ़्त ऑनलाइन कैलकुलेटर। बिना किसी सर्वर डेटा शेयरिंग के, पारदर्शी सूत्रों और चरणबद्ध व्याख्या के साथ अपने ब्राउज़र में सुरक्षित परिणाम पाएं।",
      "metric1Value": "⚡ 100+ टूल्स",
      "metric1Label": "मुफ़्त ऑनलाइन सुविधा",
      "metric2Value": "📐 प्रमाणित सूत्र",
      "metric2Label": "पारदर्शी गणना पद्धति",
      "metric3Value": "🔒 इन-ब्राउज़र",
      "metric3Label": "शून्य डेटा अपलोड"
    },
    "search": {
      "placeholder": "कैलकुलेटर खोजें (उदा. ईएमआई, एसआईपी, प्रतिशत, बीएमआई)...",
      "ariaLabel": "सभी कैलकुलेटर खोजें",
      "clearLabel": "खोज साफ़ करें",
      "ctrlK": "Ctrl K",
      "suggestedCount": "सुझाए गए कैलकुलेटर",
      "openHint": "खोलने के लिए enter ↵ दबाएं",
      "noResults": "कोई कैलकुलेटर नहीं मिला",
      "noResultsHint": "\"sip\", \"emi\", \"tax\", \"percentage\", या \"mortgage\" लिखकर खोजें",
      "verifiedBadge": "सत्यापित कैलकुलेटर लिंक",
      "navigateHint": "नेविगेट करें",
      "closeHint": "बंद करें",
      "openCalc": "खोलें →",
      "typewriterPrompts": [
        "खोजें 📈 एसआईपी कैलकुलेटर (SIP)...",
        "खोजें 🏦 ईएमआई कैलकुलेटर (EMI)...",
        "खोजें 🩺 बीएमआई कैलकुलेटर (BMI)...",
        "खोजें 🎂 सटीक उम्र कैलकुलेटर...",
        "खोजें 📐 प्रतिशत कैलकुलेटर...",
        "खोजें 📊 चक्रवृद्धि ब्याज कैलकुलेटर...",
        "खोजें 📑 आयकर कैलकुलेटर (Income Tax)...",
        "खोजें 🚗 कार लोन कैलकुलेटर...",
        "खोजें 🔄 इकाई परिवर्तक (Unit Converter)...",
        "खोजें 🔬 वैज्ञानिक कैलकुलेटर..."
      ]
    },
    "categoriesSection": {
      "heading": "कैलकुलेटर श्रेणियां",
      "domainsCount": "21 श्रेणियां",
      "categories": {
        "finance": "वित्त एवं ऋण",
        "insurance": "बीमा",
        "legal": "कानूनी व पारिवारिक",
        "business": "व्यापार व वाणिज्य",
        "construction": "निर्माण एवं सामग्री",
        "real-estate": "रियल एस्टेट",
        "technology": "तकनीक व एआई",
        "health": "स्वास्थ्य एवं फिटनेस",
        "statistics": "सांख्यिकी",
        "marketing": "मार्केटिंग",
        "math": "गणित",
        "automotive": "ऑटोमोबाइल",
        "biology": "जीव विज्ञान",
        "chemistry": "रसायन विज्ञान",
        "physics": "भौतिकी",
        "food": "आहार एवं पोषण",
        "sports": "खेलकूद एवं गति",
        "ecology": "पर्यावरण",
        "everyday": "दैनिक उपयोगिता",
        "converter": "इकाई परिवर्तक",
        "love": "प्रेम एवं अनुकूलता"
      },
      "descriptions": {
        "finance": "ऋण, ईएमआई, गृह ऋण, निवेश और व्यक्तिगत वित्तीय योजनाओं की गणना करें।",
        "insurance": "टर्म लाइफ इंश्योरेंस कवरेज, प्रीमियम और बीमा आवश्यकताओं का अनुमान लगाएं।",
        "legal": "गुजारा भत्ता, बाल सहायता और कानूनी वित्तीय दायित्वों का आकलन करें।",
        "business": "आरओआई (ROI), ब्रेक-इवन पॉइंट और व्यावसायिक लाभ मार्जिन की गणना करें।",
        "construction": "कंक्रीट का आयतन, पेंट का क्षेत्रफल और निर्माण सामग्री का सटीक माप निकालें।",
        "real-estate": "किराया प्रतिफल (रेंटल यील्ड), संपत्ति सामर्थ्य और ऋण परिशोधन जांचें।",
        "technology": "एआई टोकन लागत, नेटवर्क बैंडविड्थ और क्लाउड स्टोरेज की गणना करें।",
        "health": "बीएमआई, बीएमआर (चयापचय दर), शरीर की चर्बी और दैनिक कैलोरी ट्रैक करें।",
        "statistics": "प्रायिकता (प्रोबेबिलिटी), मानक विचलन और नमूना आकार की गणना करें।",
        "marketing": "ग्राहक अधिग्रहण लागत (CAC), विज्ञापन प्रतिफल (ROAS) और रूपांतरण दरें मापें।",
        "math": "प्रतिशत, भिन्न, ज्यामितीय क्षेत्रफल और वैज्ञानिक समीकरण हल करें।",
        "automotive": "कार लोन की मासिक किस्त, ईंधन खपत और वाहन मूल्यह्रास का हिसाब लगाएं।",
        "biology": "कोशिका गुणन समय, डीएनए सांद्रता और जैविक विकास दरों की गणना करें।",
        "chemistry": "मोलरता (मोलैरिटी), घोल का तनुकरण, गैस नियम और आणविक भार निकालें।",
        "physics": "गति, त्वरण, गतिज ऊर्जा, बल और मूलभूत भौतिक स्थिरांकों की गणना करें।",
        "food": "व्यंजनों की मात्रा, सर्विंग अनुपात और पोषक तत्वों का संतुलन साधें।",
        "sports": "दौड़ की गति (पेस), हृदय गति प्रशिक्षण क्षेत्र और खेल समय का विश्लेषण करें।",
        "ecology": "कार्बन फुटप्रिंट, कंपोस्ट अनुपात और पर्यावरणीय प्रभाव का आकलन करें।",
        "everyday": "उम्र, तारीखों का अंतर, कार्य समय और सुरक्षित पासवर्ड के लिए उपयोगी टूल्स।",
        "converter": "लंबाई, वजन, तापमान, क्षेत्रफल, आयतन और डिजिटल डेटा इकाइयों को बदलें।",
        "love": "राशि अनुकूलता, नाम मिलान और रोचक संबंध विश्लेषण का आनंद लें।"
      }
    },
    "popularSection": {
      "heading": "लोकप्रिय कैलकुलेटर",
      "toolsCount": "33 उपकरण",
      "tools": {
        "percentage-calculator": "प्रतिशत कैलकुलेटर",
        "bmi-calculator": "बीएमआई कैलकुलेटर",
        "age-calculator": "उम्र कैलकुलेटर",
        "love-calculator": "लव कैलकुलेटर",
        "scientific-calculator": "वैज्ञानिक कैलकुलेटर",
        "emi-calculator": "ईएमआई कैलकुलेटर",
        "mortgage-calculator": "होम लोन कैलकुलेटर",
        "loan-calculator": "ऋण कैलकुलेटर",
        "time-calculator": "समय कैलकुलेटर",
        "date-calculator": "तारीख कैलकुलेटर",
        "salary-calculator": "वेतन कैलकुलेटर",
        "compound-interest-calculator": "चक्रवृद्धि ब्याज कैलकुलेटर",
        "conversion-calculator": "इकाई परिवर्तक",
        "body-fat-calculator": "बॉडी फैट कैलकुलेटर",
        "bmr-calculator": "बीएमआर कैलकुलेटर",
        "sip-calculator": "एसआईपी कैलकुलेटर",
        "auto-loan-calculator": "कार लोन कैलकुलेटर",
        "gpa-calculator": "जीपीए कैलकुलेटर",
        "roi-calculator": "आरओआई कैलकुलेटर",
        "tip-calculator": "टिप कैलकुलेटर",
        "income-tax-calculator": "आयकर कैलकुलेटर",
        "probability-calculator": "प्रायिकता कैलकुलेटर",
        "password-generator": "पासवर्ड जनरेटर",
        "discount-calculator": "छूट कैलकुलेटर",
        "ovulation-calculator": "ओव्यूलेशन कैलकुलेटर",
        "ohms-law-calculator": "ओम का नियम कैलकुलेटर",
        "pregnancy-due-date-calculator": "डिलीवरी तारीख कैलकुलेटर",
        "concrete-calculator": "कंक्रीट कैलकुलेटर",
        "paint-calculator": "पेंट कैलकुलेटर",
        "amortization-calculator": "ऋण चुकौती तालिका",
        "inflation-calculator": "मुद्रास्फीति कैलकुलेटर",
        "square-footage-calculator": "वर्ग फुट कैलकुलेटर",
        "ruler": "ऑनलाइन स्केल (रूलर)"
      }
    },
    "regionsSection": {
      "heading": "समर्थित देश एवं क्षेत्र",
      "economiesCount": "18 अर्थव्यवस्थाएं",
      "countries": {
        "united-states": "संयुक्त राज्य अमेरिका",
        "india": "भारत",
        "united-kingdom": "यूनाइटेड किंगडम",
        "canada": "कनाडा",
        "australia": "ऑस्ट्रेलिया",
        "germany": "जर्मनी",
        "france": "फ्रांस",
        "japan": "जापान",
        "brazil": "ब्राजील",
        "italy": "इटली",
        "spain": "स्पेन",
        "mexico": "मेक्सिको",
        "south-africa": "दक्षिण अफ्रीका",
        "saudi-arabia": "सऊदी अरब",
        "uae": "संयुक्त अरब अमीरात",
        "singapore": "सिंगापुर",
        "netherlands": "नीदरलैंड",
        "nigeria": "नाइजीरिया"
      }
    },
    "aboutSection": {
      "eyebrow": "इंजीनियरिंग एवं कार्यप्रणाली",
      "h2": "गति, विश्वसनीयता और गणितीय पारदर्शिता के लिए निर्मित",
      "desc": "Free Accurate Calculator पारदर्शी, प्रामाणिक और निजी गणना टूल्स प्रदान करता है, जो स्पष्ट गणितीय सूत्रों और ब्राउज़र-आधारित प्रोसेसिंग पर आधारित हैं।",
      "headerLeft": "मूल गणना सिद्धांत",
      "headerRight": "आधुनिक वास्तुकला",
      "pillar1Title": "क्लाउडफ़्लेयर एज डिलीवरी",
      "pillar1Desc": "वैश्विक एज नेटवर्क पर प्री-रेंडर किया गया तेज़ HTML ताकि बिना किसी सर्वर विलंब के त्वरित परिणाम मिल सकें।",
      "pillar2Title": "क्षेत्रीय मानक और पद्धतियां",
      "pillar2Desc": "भारतीय आयकर स्लैब, लाख/करोड़ प्रणाली और पारदर्शी गणना पद्धति के अनुसार अनुकूलित।",
      "pillar3Title": "ब्राउज़र में सुरक्षित गणनाएं",
      "pillar3Desc": "सभी गणनाएं सीधे आपके ब्राउज़र में होती हैं। आपकी कोई भी वित्तीय जानकारी या इनपुट हमारे सर्वर पर नहीं भेजी जाती।",
      "pillar4Title": "मानक गणितीय मॉडल",
      "pillar4Desc": "स्पष्ट बीजगणितीय समीकरण, मानक फ़्लोटिंग-पॉइंट गणना और पारदर्शी राउंडिंग नियम।",
      "pillar5Title": "चरणबद्ध पारदर्शिता",
      "pillar5Desc": "सूत्र, चर और स्पष्टीकरण सीधे परिणामों के साथ प्रदर्शित होते हैं ताकि आप गणना की पुष्टि कर सकें।",
      "pillar6Title": "प्रिंट और पीडीएफ रिपोर्ट",
      "pillar6Desc": "साफ-सुथरे पीडीएफ सारांश और भुगतान सारणी को एक क्लिक में डाउनलोड व प्रिंट करें।",
      "ctaButton": "हमारी कार्यप्रणाली के बारे में जानें"
    },
    "orphanSection": {
      "badge": "प्रमाणित क्षेत्रीय सूचकांक",
      "heading": "क्षेत्रीय एवं विशिष्ट वित्तीय कैलकुलेटर",
      "subtext": "विभिन्न देशों के वित्तीय नियमों, मुद्राओं और मानकों के अनुसार अनुकूलित विश्वसनीय टूल्स।",
      "exploreAll": "सभी देश देखें"
    },
    "howItWorksSection": {
      "eyebrow": "सिद्धांत और मानक",
      "heading": "हमारे कैलकुलेटर कैसे काम करते हैं",
      "desc": "गणितीय स्पष्टता, प्रामाणिक सूत्रों और उपयोगकर्ता की गोपनीयता को ध्यान में रखकर तैयार किए गए टूल्स।",
      "step1Title": "1. प्रमाणित गणितीय सूत्र",
      "step1Desc": "प्रत्येक कैलकुलेटर मान्यता प्राप्त बीजगणितीय समीकरणों और मानक वित्तीय सूत्रों का पालन करता है।",
      "step2Title": "2. सुरक्षित इन-ब्राउज़र प्रोसेसिंग",
      "step2Desc": "सभी गणनाएं आपके डिवाइस के ब्राउज़र में ही पूरी होती हैं। कोई भी व्यक्तिगत आंकड़ा सर्वर पर नहीं भेजा जाता।",
      "step3Title": "3. पूर्णतः स्पष्ट नियम व मान्यताएं",
      "step3Desc": "हम परिणाम के साथ उपयोग में लाए गए सभी सूत्र और राउंडिंग नियम प्रदर्शित करते हैं ताकि आप हिसाब समझ सकें।"
    },
    "faqSection": {
      "eyebrow": "सामान्य प्रश्न",
      "heading": "अक्सर पूछे जाने वाले सवाल",
      "desc": "हमारे कैलकुलेटरों के उपयोग, डेटा गोपनीयता और सटीकता से जुड़े स्पष्ट उत्तर।",
      "items": [
        {
          "question": "क्या इस वेबसाइट के सभी कैलकुलेटर मुफ़्त हैं?",
          "answer": "हाँ, सभी कैलकुलेटर पूरी तरह से मुफ़्त हैं। इनके उपयोग या पीडीएफ रिपोर्ट डाउनलोड करने के लिए किसी सदस्यता या खाते की आवश्यकता नहीं है।"
        },
        {
          "question": "गणनाओं की प्रामाणिकता कैसे तय की जाती है?",
          "answer": "हमारे टूल्स प्रमाणित सूत्रों और स्पष्ट मान्यताओं के आधार पर परिणाम तैयार करते हैं। हर टूल के साथ उसकी गणना विधि दी गई है।"
        },
        {
          "question": "क्या मेरा वित्तीय डेटा सुरक्षित रहता है?",
          "answer": "हाँ। सभी गणनाएं आपके अपने कंप्यूटर या मोबाइल ब्राउज़र में स्थानीय रूप से होती हैं। आपकी कोई भी संख्यात्मक जानकारी हमारे सर्वर पर एकत्र नहीं की जाती।"
        },
        {
          "question": "क्या ये कैलकुलेटर मोबाइल पर ठीक से काम करते हैं?",
          "answer": "हाँ। सभी कैलकुलेटर स्मार्टफोन, टैबलेट और कंप्यूटर स्क्रीन के लिए पूरी तरह अनुकूलित और उत्तरदायी हैं।"
        },
        {
          "question": "क्या ये परिणाम किसी विशेषज्ञ की सलाह का विकल्प हैं?",
          "answer": "नहीं। ये कैलकुलेटर केवल शैक्षणिक और सामान्य मार्गदर्शन के लिए हैं। किसी बड़े वित्तीय, कानूनी या स्वास्थ्य निर्णय के लिए प्रमाणित विशेषज्ञ से परामर्श अवश्य लें।"
        },
        {
          "question": "मैं अपने गणना परिणामों को कैसे सहेज या प्रिंट कर सकता हूँ?",
          "answer": "प्रत्येक कैलकुलेटर में 1-क्लिक प्रिंट/पीडीएफ विकल्प मौजूद है, जिससे आप आसानी से अपना परिणाम और भुगतान तालिका सहेज सकते हैं।"
        }
      ]
    },
    "footer": {
      "brandDesc": "ब्राउज़र में सीधे चलने वाले तेज़, पारदर्शी और सुरक्षित ऑनलाइन कैलकुलेटर, जो प्रमाणित सूत्रों के आधार पर काम करते हैं।",
      "cloudflareVerified": "क्लाउडफ़्लेयर एज पर सत्यापित",
      "financeTitle": "वित्त एवं ऋण",
      "healthTitle": "स्वास्थ्य एवं फिटनेस",
      "mathTitle": "गणित एवं विज्ञान",
      "everydayTitle": "दैनिक उपयोगिता",
      "globalTitle": "वैश्विक संस्करण",
      "guides": "मार्गदर्शिका",
      "about": "हमारे बारे में",
      "contact": "संपर्क करें",
      "terms": "उपयोग की शर्तें",
      "privacy": "गोपनीयता नीति",
      "rights": "सर्वाधिकार सुरक्षित।"
    }
  },
  "pt": {
    "seo": {
      "title": "Calculadoras online gratuitas – Finanças, saúde e matemática | Free Accurate Calculator",
      "description": "Calculadoras online gratuitas para finanças, saúde, matemática e tarefas diárias. Obtenha resultados rápidos e transparentes com fórmulas documentadas.",
      "websiteName": "Free Accurate Calculator (Português)",
      "websiteDesc": "Calculadoras online gratuitas para finanças pessoais, saúde, matemática e utilidades cotidianas."
    },
    "hero": {
      "pillBadge": "100+ Calculadoras online gratuitas • Fórmulas documentadas",
      "h1Line1": "Calculadoras online gratuitas",
      "h1Highlight": "Rápidas, precisas e fáceis de usar",
      "subtitle": "Acesse calculadoras online gratuitas para finanças pessoais, saúde, matemática, negócios e rotinas do dia a dia. Obtenha resultados rápidos com fórmulas documentadas e processamento privado no seu navegador.",
      "metric1Value": "⚡ 100+ Ferramentas",
      "metric1Label": "Acesso online gratuito",
      "metric2Value": "📐 Fórmulas Claras",
      "metric2Label": "Metodologia documentada",
      "metric3Value": "🔒 No navegador",
      "metric3Label": "Sem envio de dados"
    },
    "search": {
      "placeholder": "Buscar calculadora (ex: financiamento, IMC, porcentagem, juros)...",
      "ariaLabel": "Pesquisar em todas as calculadoras",
      "clearLabel": "Limpar busca",
      "ctrlK": "Ctrl K",
      "suggestedCount": "Calculadoras Sugeridas",
      "openHint": "pressione enter ↵ para abrir",
      "noResults": "Nenhuma calculadora encontrada",
      "noResultsHint": "Tente buscar por \"empréstimo\", \"juros\", \"porcentagem\", \"imc\" ou \"salário\"",
      "verifiedBadge": "Links verificados",
      "navigateHint": "navegar",
      "closeHint": "fechar",
      "openCalc": "Abrir →",
      "typewriterPrompts": [
        "Buscar 🏦 Calculadora de Financiamento (EMI)...",
        "Buscar 🩺 Calculadora de IMC...",
        "Buscar 📈 Juros Compostos...",
        "Buscar 📐 Calculadora de Porcentagem...",
        "Buscar 🎂 Calculadora de Idade Exata...",
        "Buscar 🚗 Financiamento de Veículos...",
        "Buscar 📊 Calculadora de Investimentos...",
        "Buscar 🔄 Conversor de Unidades...",
        "Buscar 💼 Salário Líquido...",
        "Buscar ⏱️ Horas Trabalhadas...",
        "Buscar 🔬 Calculadora Científica..."
      ]
    },
    "categoriesSection": {
      "heading": "Categorias",
      "domainsCount": "21 Áreas",
      "categories": {
        "finance": "Finanças",
        "insurance": "Seguros",
        "legal": "Jurídico & Família",
        "business": "Negócios & Gestão",
        "construction": "Construção Civil",
        "real-estate": "Imobiliário",
        "technology": "Tecnologia & IA",
        "health": "Saúde & Bem-estar",
        "statistics": "Estatística",
        "marketing": "Marketing",
        "math": "Matemática",
        "automotive": "Automotivo",
        "biology": "Biologia",
        "chemistry": "Química",
        "physics": "Física",
        "food": "Alimentação & Culinária",
        "sports": "Esportes & Treino",
        "ecology": "Ecologia",
        "everyday": "Dia a Dia",
        "converter": "Conversores",
        "love": "Relacionamento & Testes"
      },
      "descriptions": {
        "finance": "Calcule parcelas de empréstimos, hipotecas, investimentos e planos financeiros.",
        "insurance": "Estime coberturas de seguro de vida, prêmios e apólices recomendadas.",
        "legal": "Calcule pensão alimentícia, partilhas e obrigações legais.",
        "business": "Analise retorno sobre investimento (ROI), ponto de equilíbrio e margens.",
        "construction": "Calcule volume de concreto, rendimento de tinta e materiais de obra.",
        "real-estate": "Calcule rentabilidade de aluguel, amortização e poder de compra.",
        "technology": "Estime custos de tokens de IA, largura de banda e armazenamento em nuvem.",
        "health": "Acompanhe IMC, taxa metabólica basal (TMB), gordura corporal e calorias.",
        "statistics": "Calcule probabilidades, desvio padrão, amostragem e distribuições.",
        "marketing": "Calcule custo de aquisição (CAC), retorno em anúncios (ROAS) e conversão.",
        "math": "Resolva porcentagens, frações, equações científicas e áreas geométricas.",
        "automotive": "Calcule financiamento de carros, consumo de combustível e depreciação.",
        "biology": "Tempo de duplicação celular, concentração de DNA e taxas de crescimento.",
        "chemistry": "Molaridade, diluição de soluções químicas, gases e massa molecular.",
        "physics": "Velocidade, aceleração, energia cinética, forças e fórmulas físicas.",
        "food": "Ajuste receitas, porções e valores nutricionais de alimentos.",
        "sports": "Ritmo de corrida (pace), zonas de frequência cardíaca e metas esportivas.",
        "ecology": "Pegada de carbono, proporções de compostagem e impacto ambiental.",
        "everyday": "Ferramentas práticas para idade exata, intervalo de datas, horas e senhas.",
        "converter": "Converta comprimento, peso, temperatura, área, volume e dados.",
        "love": "Compatibilidade de signos, testes de nomes e testes divertidos de casal."
      }
    },
    "popularSection": {
      "heading": "Calculadoras Populares",
      "toolsCount": "33 Ferramentas",
      "tools": {
        "percentage-calculator": "Calculadora de porcentagem",
        "bmi-calculator": "Calculadora de IMC",
        "age-calculator": "Calculadora de idade",
        "love-calculator": "Calculadora do amor",
        "scientific-calculator": "Calculadora científica",
        "emi-calculator": "Calculadora de parcelas (EMI)",
        "mortgage-calculator": "Calculadora de hipoteca",
        "loan-calculator": "Calculadora de empréstimos",
        "time-calculator": "Calculadora de tempo",
        "date-calculator": "Calculadora de datas",
        "salary-calculator": "Calculadora de salário",
        "compound-interest-calculator": "Calculadora de juros compostos",
        "conversion-calculator": "Conversor de unidades",
        "body-fat-calculator": "Gordura corporal",
        "bmr-calculator": "Taxa metabólica basal (TMB)",
        "sip-calculator": "Calculadora de investimentos",
        "auto-loan-calculator": "Financiamento de veículos",
        "gpa-calculator": "Calculadora de média escolar",
        "roi-calculator": "Calculadora de ROI",
        "tip-calculator": "Calculadora de gorjeta",
        "income-tax-calculator": "Imposto de renda",
        "probability-calculator": "Calculadora de probabilidade",
        "password-generator": "Gerador de senhas",
        "discount-calculator": "Calculadora de descontos",
        "ovulation-calculator": "Calculadora de ovulação",
        "ohms-law-calculator": "Lei de Ohm",
        "pregnancy-due-date-calculator": "Data prevista do parto",
        "concrete-calculator": "Calculadora de concreto",
        "paint-calculator": "Calculadora de tinta",
        "amortization-calculator": "Tabela de amortização",
        "inflation-calculator": "Calculadora de inflação",
        "square-footage-calculator": "Metros quadrados",
        "ruler": "Régua online"
      }
    },
    "regionsSection": {
      "heading": "Países e Regiões",
      "economiesCount": "18 Economias",
      "countries": {
        "united-states": "Estados Unidos",
        "india": "Índia",
        "united-kingdom": "Reino Unido",
        "canada": "Canadá",
        "australia": "Austrália",
        "germany": "Alemanha",
        "france": "França",
        "japan": "Japão",
        "brazil": "Brasil",
        "italy": "Itália",
        "spain": "Espanha",
        "mexico": "México",
        "south-africa": "África do Sul",
        "saudi-arabia": "Arábia Saudita",
        "uae": "Emirados Árabes",
        "singapore": "Singapura",
        "netherlands": "Países Baixos",
        "nigeria": "Nigéria"
      }
    },
    "aboutSection": {
      "eyebrow": "ENGENHARIA & METODOLOGIA",
      "h2": "Construído para Rapidez, Confiabilidade e Transparência Matemática",
      "desc": "O Free Accurate Calculator oferece ferramentas de cálculo confiáveis e transparentes, baseadas em fórmulas documentadas e execução privada no seu navegador.",
      "headerLeft": "Pilares de Cálculo",
      "headerRight": "Arquitetura Moderna",
      "pillar1Title": "Entrega Rápida na Edge",
      "pillar1Desc": "HTML estático pré-renderizado na rede global da Cloudflare para acesso imediato sem sobrecarga de servidor.",
      "pillar2Title": "Adaptação Regional",
      "pillar2Desc": "Ferramentas adaptadas a moedas internacionais, regras financeiras e formatação numérica transparente.",
      "pillar3Title": "Cálculos no seu Navegador",
      "pillar3Desc": "As operações são executadas localmente no seu navegador. Seus dados numéricos e valores não são enviados a servidores externos.",
      "pillar4Title": "Modelos Matemáticos Padrão",
      "pillar4Desc": "Equações algébricas fechadas e aritmética padrão de ponto flutuante em JavaScript com regras claras de arredondamento.",
      "pillar5Title": "Transparência Passo a Passo",
      "pillar5Desc": "Fórmulas, variáveis e passos explicativos disponíveis para conferência de cada cálculo.",
      "pillar6Title": "Exportação para PDF e Impressão",
      "pillar6Desc": "Gere resumos em PDF e tabelas de amortização limpas diretamente a partir dos seus resultados.",
      "ctaButton": "Conheça Nossa Metodologia"
    },
    "orphanSection": {
      "badge": "Índice Regional Verificado",
      "heading": "Calculadoras Regionais e Especializadas",
      "subtext": "Ferramentas matemáticas verificadas e configuradas para normas fiscais, moedas e padrões de cada país.",
      "exploreAll": "Ver Todos os Países"
    },
    "howItWorksSection": {
      "eyebrow": "Metodologia & Padrões",
      "heading": "Como Nossas Calculadoras Funcionam",
      "desc": "Projetadas para garantir transparência matemática, premissas claras e privacidade total.",
      "step1Title": "1. Fórmulas Documentadas",
      "step1Desc": "Cada ferramenta utiliza equações matemáticas consolidadas e algoritmos reconhecidos.",
      "step2Title": "2. Execução Local no Navegador",
      "step2Desc": "Os cálculos rodam inteiramente no seu dispositivo. Nenhum dado financeiro ou pessoal é transmitido.",
      "step3Title": "3. Premissas Transparentes",
      "step3Desc": "Exibimos as variáveis e os critérios de arredondamento para que você possa auditar os resultados."
    },
    "faqSection": {
      "eyebrow": "Perguntas Frequentes",
      "heading": "Dúvidas Frequentes sobre as Calculadoras",
      "desc": "Respostas diretas sobre funcionamento, precisão e privacidade das nossas ferramentas.",
      "items": [
        {
          "question": "As calculadoras são gratuitas?",
          "answer": "Sim, todas as ferramentas são totalmente gratuitas. Não é necessário criar conta, pagar assinaturas ou fornecer dados bancários."
        },
        {
          "question": "Como a precisão dos cálculos é garantida?",
          "answer": "Nossas calculadoras aplicam fórmulas matemáticas consagradas e parâmetros explícitos, detalhando a metodologia utilizada em cada ferramenta."
        },
        {
          "question": "Meus dados pessoais ou financeiros ficam salvos?",
          "answer": "Não. Todas as operações rodam na memória do seu navegador. Não coletamos nem armazenamos suas informações em servidores."
        },
        {
          "question": "Posso usar as ferramentas em celulares e tablets?",
          "answer": "Sim. Todas as calculadoras são responsivas e otimizadas para telas de toque em smartphones, tablets e computadores."
        },
        {
          "question": "Os resultados substituem uma consulta com especialista?",
          "answer": "Não. As calculadoras fornecem estimativas educativas e não substituem orientações profissionais contábeis, jurídicas ou médicas."
        },
        {
          "question": "Como salvar ou imprimir o resultado de um cálculo?",
          "answer": "Cada ferramenta disponibiliza a geração de um relatório limpo em PDF ou impressão direta com um único clique."
        }
      ]
    },
    "footer": {
      "brandDesc": "Calculadoras online rápidas, transparentes e privadas, com processamento no navegador e fórmulas documentadas.",
      "cloudflareVerified": "Verificado na Cloudflare Edge",
      "financeTitle": "Finanças & Crédito",
      "healthTitle": "Saúde & Bem-estar",
      "mathTitle": "Matemática & Ciências",
      "everydayTitle": "Utilitários Diários",
      "globalTitle": "Edições Internacionais",
      "guides": "Guias",
      "about": "Sobre Nós",
      "contact": "Contato",
      "terms": "Termos de Uso",
      "privacy": "Privacidade",
      "rights": "Todos os direitos reservados."
    }
  },
  "it": {
    "seo": {
      "title": "Calcolatori online gratuiti – Finanza, salute e matematica | Free Accurate Calculator",
      "description": "Calcolatori online gratuiti per finanza, salute, matematica e vita quotidiana. Risultati immediati e trasparenti con formule documentate e spiegazioni chiare.",
      "websiteName": "Free Accurate Calculator (Italiano)",
      "websiteDesc": "Calcolatori online gratuiti, trasparenti e accurati per finanza, salute, matematica e uso quotidiano."
    },
    "hero": {
      "pillBadge": "100+ Calcolatori gratuiti • Formule documentate • Calcoli protetti",
      "h1Line1": "Calcolatori online gratuiti",
      "h1Highlight": "Rapidi, precisi e facili da usare",
      "subtitle": "Accedi a calcolatori online gratuiti per finanza personale, salute, matematica, economia e attività quotidiane. Risultati immediati con formule trasparenti e calcoli eseguiti privatamente nel tuo browser.",
      "metric1Value": "⚡ 100+ Strumenti",
      "metric1Label": "Accesso gratuito",
      "metric2Value": "📐 Formule Chiare",
      "metric2Label": "Metodi documentati",
      "metric3Value": "🔒 Nel browser",
      "metric3Label": "Nessun invio dati"
    },
    "search": {
      "placeholder": "Cerca calcolatore (es. mutuo, IMC, percentuale, stipendio)...",
      "ariaLabel": "Cerca tra tutti i calcolatori",
      "clearLabel": "Cancella ricerca",
      "ctrlK": "Ctrl K",
      "suggestedCount": "Calcolatori Suggeriti",
      "openHint": "premi invio ↵ per aprire",
      "noResults": "Nessun calcolatore trovato",
      "noResultsHint": "Prova a cercare \"mutuo\", \"prestito\", \"percentuale\", \"imc\" o \"interessi\"",
      "verifiedBadge": "Link verificati",
      "navigateHint": "naviga",
      "closeHint": "chiudi",
      "openCalc": "Apri →",
      "typewriterPrompts": [
        "Cerca 🏦 Calcolatore Rata Finanziamento (EMI)...",
        "Cerca 🩺 Calcolatore IMC...",
        "Cerca 📈 Interesse Composto...",
        "Cerca 📐 Calcolatore Percentuale...",
        "Cerca 🎂 Calcolatore d’Età Esatta...",
        "Cerca 🚗 Prestito Auto...",
        "Cerca 📊 Piano di Accumulo (PAC)...",
        "Cerca 🔄 Convertitore Unità...",
        "Cerca 💼 Calcolo Stipendio Netto...",
        "Cerca ⏱️ Calcolo Ore Lavorative...",
        "Cerca 🔬 Calcolatrice Scientifica..."
      ]
    },
    "categoriesSection": {
      "heading": "Categorie",
      "domainsCount": "21 Aree",
      "categories": {
        "finance": "Finanza & Prestiti",
        "insurance": "Assicurazioni",
        "legal": "Legale & Famiglia",
        "business": "Azienda & Gestione",
        "construction": "Edilizia & Lavori",
        "real-estate": "Immobiliare",
        "technology": "Informatica & IA",
        "health": "Salute & Benessere",
        "statistics": "Statistica",
        "marketing": "Marketing",
        "math": "Matematica",
        "automotive": "Auto & Veicoli",
        "biology": "Biologia",
        "chemistry": "Chimica",
        "physics": "Fisica",
        "food": "Alimentazione & Cucina",
        "sports": "Sport & Fitness",
        "ecology": "Ecologia",
        "everyday": "Vita Quotidiana",
        "converter": "Convertitori",
        "love": "Amore & Affinità"
      },
      "descriptions": {
        "finance": "Calcola rate di mutui, prestiti personali, rendimenti e piani di risparmio.",
        "insurance": "Stima coperture assicurative sulla vita, premi e massimali consigliati.",
        "legal": "Calcola assegni di mantenimento, contributi per i figli e quote legali.",
        "business": "Analizza ritorno sull’investimento (ROI), punto di pareggio e margini.",
        "construction": "Calcola volumi di calcestruzzo, resa della vernice e materiali da costruzione.",
        "real-estate": "Calcola rendimento da locazione, piano di ammortamento e sostenibilità mutuo.",
        "technology": "Stima costi token di IA, consumo di banda e spazio di archiviazione.",
        "health": "Monitora IMC, metabolismo basale (BMR), percentuale di massa grassa e calorie.",
        "statistics": "Calcola probabilità, deviazione standard, campionamento e distribuzioni.",
        "marketing": "Misura costo di acquisizione (CAC), ritorno sulla spesa adv (ROAS) e conversioni.",
        "math": "Risolvi percentuali, frazioni, calcoli geometrici ed equazioni scientifiche.",
        "automotive": "Calcola rate per finanziamento auto, consumo carburante e svalutazione veicolo.",
        "biology": "Tempo di raddoppio cellulare, concentrazione DNA e cinetica di crescita.",
        "chemistry": "Calcola molarità, diluizione delle soluzioni, leggi dei gas e massa molecolare.",
        "physics": "Calcola velocità, accelerazione, energia cinetica, forza e costanti fisiche.",
        "food": "Adatta porzioni e ingredienti per ricette culinarie e piani nutrizionali.",
        "sports": "Passo di corsa, zone di frequenza cardiaca e tempi di gara previsti.",
        "ecology": "Calcola compensazione emissioni CO₂, proporzioni compostaggio e impatto green.",
        "everyday": "Strumenti pratici per età esatta, differenza tra date, ore lavorate e password.",
        "converter": "Converti lunghezza, peso, temperatura, area, volume e unità informatiche.",
        "love": "Compatibilità zodiacale, test di coppia e quiz relazionali divertenti."
      }
    },
    "popularSection": {
      "heading": "Calcolatori Più Usati",
      "toolsCount": "33 Strumenti",
      "tools": {
        "percentage-calculator": "Calcolatore percentuale",
        "bmi-calculator": "Calcolatore IMC",
        "age-calculator": "Calcolatore d’età",
        "love-calculator": "Calcolatore d’amore",
        "scientific-calculator": "Calcolatrice scientifica",
        "emi-calculator": "Calcolo rata finanziamento",
        "mortgage-calculator": "Calcolatore mutuo",
        "loan-calculator": "Calcolatore prestiti",
        "time-calculator": "Calcolatore del tempo",
        "date-calculator": "Calcolatore date",
        "salary-calculator": "Calcolatore stipendio",
        "compound-interest-calculator": "Interesse composto",
        "conversion-calculator": "Convertitore unità",
        "body-fat-calculator": "Massa grassa corporea",
        "bmr-calculator": "Metabolismo basale (BMR)",
        "sip-calculator": "Piano di accumulo (PAC)",
        "auto-loan-calculator": "Prestito auto",
        "gpa-calculator": "Calcolo media voti",
        "roi-calculator": "Calcolatore ROI",
        "tip-calculator": "Calcolo mancia",
        "income-tax-calculator": "Imposta sul reddito",
        "probability-calculator": "Calcolatore probabilità",
        "password-generator": "Generatore password",
        "discount-calculator": "Calcolatore sconti",
        "ovulation-calculator": "Calcolatore ovulazione",
        "ohms-law-calculator": "Legge di Ohm",
        "pregnancy-due-date-calculator": "Data presunta parto",
        "concrete-calculator": "Calcolo calcestruzzo",
        "paint-calculator": "Calcolatore vernice",
        "amortization-calculator": "Piano di ammortamento",
        "inflation-calculator": "Calcolatore inflazione",
        "square-footage-calculator": "Metri quadri (mq)",
        "ruler": "Righello online"
      }
    },
    "regionsSection": {
      "heading": "Paesi e Regioni",
      "economiesCount": "18 Economie",
      "countries": {
        "united-states": "Stati Uniti",
        "india": "India",
        "united-kingdom": "Regno Unito",
        "canada": "Canada",
        "australia": "Australia",
        "germany": "Germania",
        "france": "Francia",
        "japan": "Giappone",
        "brazil": "Brasile",
        "italy": "Italia",
        "spain": "Spagna",
        "mexico": "Messico",
        "south-africa": "Sudafrica",
        "saudi-arabia": "Arabia Saudita",
        "uae": "Emirati Arabi Uniti",
        "singapore": "Singapore",
        "netherlands": "Paesi Bassi",
        "nigeria": "Nigeria"
      }
    },
    "aboutSection": {
      "eyebrow": "INGEGNERIA & METODOLOGIA",
      "h2": "Progettato per Velocità, Affidabilità e Trasparenza Matematica",
      "desc": "Free Accurate Calculator offre calcolatori online affidabili e trasparenti, basati su formule documentate ed esecuzione locale protetta nel browser.",
      "headerLeft": "Pilastri del Calcolo",
      "headerRight": "Architettura Moderna",
      "pillar1Title": "Distribuzione Edge Rapida",
      "pillar1Desc": "HTML statico pre-renderizzato sulla rete globale di Cloudflare per caricamenti rapidi e affidabili.",
      "pillar2Title": "Adattamento Normativo e Regionale",
      "pillar2Desc": "Strumenti calibrati su valute, convenzioni contabili e modelli matematici riconosciuti.",
      "pillar3Title": "Calcoli nel tuo Browser",
      "pillar3Desc": "I calcoli vengono eseguiti localmente nel tuo browser. Le cifre e le informazioni personali non vengono caricate su server esterni.",
      "pillar4Title": "Modelli Matematici Standard",
      "pillar4Desc": "Equazioni algebriche chiuse e aritmetica a virgola mobile JavaScript con regole di arrotondamento esplicite.",
      "pillar5Title": "Trasparenza Passo dopo Passo",
      "pillar5Desc": "Formule, variabili e passaggi logici esposti in modo chiaro accanto a ciascun risultato.",
      "pillar6Title": "Pronto per Stampa e PDF",
      "pillar6Desc": "Crea report PDF puliti e piani di ammortamento completi direttamente dalla schermata dei risultati.",
      "ctaButton": "Scopri la Nostra Metodologia"
    },
    "orphanSection": {
      "badge": "Indice Regionale Verificato",
      "heading": "Calcolatori Finanziari Regionali e Specialistici",
      "subtext": "Strumenti matematici tarati su regimi fiscali, parametri monetari e standard dei singoli paesi.",
      "exploreAll": "Vedi Tutti i Paesi"
    },
    "howItWorksSection": {
      "eyebrow": "Metodologia & Standard",
      "heading": "Come Funzionano i Nostri Calcolatori",
      "desc": "Progettati per offrire trasparenza negli algoritmi, chiarezza nelle variabili e massima tutela della privacy.",
      "step1Title": "1. Formule Matematiche Verificate",
      "step1Desc": "Ogni calcolatore implementa equazioni matematiche riconosciute e standard di settore collaudati.",
      "step2Title": "2. Elaborazione Locale nel Browser",
      "step2Desc": "I calcoli avvengono interamente sul tuo dispositivo. Nessun dato personale o finanziario viene trasmesso.",
      "step3Title": "3. Assunzioni e Variabili Chiare",
      "step3Desc": "Mostriamo le formule applicate e le regole di arrotondamento affinché tu possa comprendere ogni passaggio."
    },
    "faqSection": {
      "eyebrow": "Domande Frequenti",
      "heading": "FAQ sui Nostri Calcolatori",
      "desc": "Risposte semplici e dirette sul funzionamento, la riservatezza e l’accuratezza degli strumenti.",
      "items": [
        {
          "question": "I calcolatori sono completamente gratuiti?",
          "answer": "Sì, tutti i calcolatori sono gratuiti e senza vincoli. Non sono richiesti abbonamenti, carte di credito o registrazioni."
        },
        {
          "question": "Come viene garantita la correttezza dei risultati?",
          "answer": "I nostri strumenti utilizzano formule algebriche documentate e parametri espliciti, spiegando chiaramente i metodi di calcolo adottati."
        },
        {
          "question": "I miei dati personali o finanziari vengono memorizzati?",
          "answer": "No. L’intera elaborazione viene svolta in locale nel tuo browser web. Non raccogliamo né memorizziamo le informazioni che inserisci."
        },
        {
          "question": "Posso utilizzare i calcolatori su smartphone e tablet?",
          "answer": "Sì. Tutti gli strumenti sono reattivi e ottimizzati per l’uso touch su telefoni cellulari, tablet e computer desktop."
        },
        {
          "question": "I risultati sostituiscono una consulenza specialistica?",
          "answer": "No. I calcolatori forniscono stime matematiche a scopo informativo ed educativo. Non sostituiscono il parere di commercialisti, legali o medici."
        },
        {
          "question": "Come posso salvare o stampare un riepilogo?",
          "answer": "Ogni calcolatore dispone di un pulsante dedicato per esportare o stampare immediatamente un riassunto chiaro in formato PDF."
        }
      ]
    },
    "footer": {
      "brandDesc": "Calcolatori online veloci, trasparenti e privati con esecuzione diretta nel browser e formule documentate.",
      "cloudflareVerified": "Verificato su Cloudflare Edge",
      "financeTitle": "Finanza & Prestiti",
      "healthTitle": "Salute & Benessere",
      "mathTitle": "Matematica & Scienza",
      "everydayTitle": "Utilità Quotidiane",
      "globalTitle": "Edizioni Internazionali",
      "guides": "Guide",
      "about": "Chi Siamo",
      "contact": "Contatti",
      "terms": "Termini di Servizio",
      "privacy": "Privacy Policy",
      "rights": "Tutti i diritti riservati."
    }
  },
  "ar": {
    "seo": {
      "title": "حاسبات مجانية عبر الإنترنت – مالية، رياضيات وصحة | Free Accurate Calculator",
      "description": "حاسبات مجانية عبر الإنترنت للمالية، الصحة، الرياضيات والاستخدام اليومي. نتائج سريعة وشفافة بالاعتماد على معادلات رياضية موثقة وحسابات محلية خاصة.",
      "websiteName": "Free Accurate Calculator (العربية)",
      "websiteDesc": "حاسبات مجانية دقيقة وموثوقة عبر الإنترنت للمالية والصحة والرياضيات والاستخدام اليومي."
    },
    "hero": {
      "pillBadge": "أكثر من 100 حاسبة مجانية • معادلات موثقة • خصوصية تامة",
      "h1Line1": "حاسبات مجانية عبر الإنترنت",
      "h1Highlight": "سريعة، دقيقة وسهلة الاستخدام",
      "subtitle": "مجموعة شاملة من الحاسبات المجانية عبر الإنترنت لإدارة الأموال الشخصية، الصحة، الرياضيات، والمهام اليومية. نتائج فورية وشفافة تعتمد على معادلات معلنة وحسابات تتم داخل متصفحك بأمان.",
      "metric1Value": "⚡ +100 أداة",
      "metric1Label": "استخدام مجاني تماماً",
      "metric2Value": "📐 معادلات واضحة",
      "metric2Label": "طرق حساب موثقة",
      "metric3Value": "🔒 داخل المتصفح",
      "metric3Label": "لا نرفع أي بيانات"
    },
    "search": {
      "placeholder": "ابحث عن حاسبة (مثل: القسط الشهري، كتلة الجسم، النسبة المئوية، الراتب)...",
      "ariaLabel": "البحث في جميع الحاسبات",
      "clearLabel": "مسح البحث",
      "ctrlK": "Ctrl K",
      "suggestedCount": "حاسبات مقترحة",
      "openHint": "اضغط Enter ↵ للفتح",
      "noResults": "لم يتم العثور على حاسبات",
      "noResultsHint": "جرب البحث عن \"قرض\"، \"تمويل\"، \"نسبة\"، \"عمر\" أو \"وزن\"",
      "verifiedBadge": "روابط حاسبات معتمدة",
      "navigateHint": "تنقل",
      "closeHint": "إغلاق",
      "openCalc": "فتح →",
      "typewriterPrompts": [
        "ابحث عن 🏦 حاسبة القسط الشهري (EMI)...",
        "ابحث عن 🩺 حاسبة كتلة الجسم (BMI)...",
        "ابحث عن 📈 حاسبة الفائدة المركبة...",
        "ابحث عن 📐 حاسبة النسبة المئوية...",
        "ابحث عن 🎂 حاسبة العمر الدقيق...",
        "ابحث عن 🚗 حاسبة تمويل السيارات...",
        "ابحث عن 📊 حاسبة الاستثمار الدوري...",
        "ابحث عن 🔄 محول الوحدات القياسية...",
        "ابحث عن 💼 حاسبة صافي الراتب...",
        "ابحث عن ⏱️ حاسبة ساعات العمل...",
        "ابحث عن 🔬 آلة حاسبة علمية..."
      ]
    },
    "categoriesSection": {
      "heading": "أقسام الحاسبات",
      "domainsCount": "21 تخصصاً",
      "categories": {
        "finance": "المالية والقروض",
        "insurance": "التأمين",
        "legal": "القانون والأسرة",
        "business": "الأعمال والشركات",
        "construction": "البناء والإنشاءات",
        "real-estate": "العقارات",
        "technology": "التقنية والذكاء الاصطناعي",
        "health": "الصحة والرشاقة",
        "statistics": "الإحصاء",
        "marketing": "التسويق",
        "math": "الرياضيات",
        "automotive": "السيارات والمركبات",
        "biology": "الأحياء والبيولوجيا",
        "chemistry": "الكيمياء",
        "physics": "الفيزياء",
        "food": "الغذاء والطبخ",
        "sports": "الرياضة واللياقة",
        "ecology": "البيئة والمناخ",
        "everyday": "الحياة اليومية",
        "converter": "محولات الوحدات",
        "love": "العلاقات والتوافق"
      },
      "descriptions": {
        "finance": "احسب أقساط القروض، التمويل العقاري، عوائد الاستثمار والميزانية الشخصية.",
        "insurance": "تقدير تكاليف التأمين على الحياة، الأقساط الشهرية والتغطية التأمينية.",
        "legal": "حساب النفقة الشرعية، نفقات الأطفال والالتزامات المالية القانونية.",
        "business": "تحليل العائد على الاستثمار (ROI)، نقطة التعادل، وهامش الربح التجاري.",
        "construction": "حساب كميات الخرسانة، مساحات الدهان وتكاليف مواد البناء.",
        "real-estate": "حساب العائد الإيجاري، جدول إهلاك التمويل والقدرة على الشراء.",
        "technology": "تقدير تكاليف رموز الذكاء الاصطناعي (Tokens)، سرعة نقل البيانات والتخزين.",
        "health": "متابعة مؤشر كتلة الجسم (BMI)، معدل الأيض (BMR)، ونسبة الدهون والسعرات.",
        "statistics": "حساب الاحتمالات، الانحراف المعياري، حجم العينات والتوزيعات الإحصائية.",
        "marketing": "قياس تكلفة اكتساب العميل (CAC)، العائد الإعلاني (ROAS)، ونسب التحويل.",
        "math": "حل مسائل النسب المئوية، الكسور، الحسابات الهندسية والمعادلات العلمية.",
        "automotive": "حساب قسط تمويل السيارة، استهلاك الوقود ومعدل انخفاض القيمة.",
        "biology": "حساب معدل انقسام الخلايا، تركيز الحمض النووي (DNA) والنمو الحيوي.",
        "chemistry": "حساب المولارية، تخفيف المحاليل الكيميائية، قوانين الغازات والكتلة المولية.",
        "physics": "حساب السرعة، التسارع، الطاقة الحركية، القوة والقوانين الفيزيائية.",
        "food": "تعديل مقادير الوصفات، عدد الحصص والنسب الغذائية الدقيقة.",
        "sports": "حساب سرعة الجري (Pace)، مناطق نبض القلب وأوقات السباقات المستهدفة.",
        "ecology": "حساب البصمة الكربونية، نسب التسميد العضوي والأثر البيئي.",
        "everyday": "أدوات سريعة لحساب العمر باليوم والساعة، فروق التواريخ وكلمات المرور.",
        "converter": "تحويل الأطوال، الأوزان، درجات الحرارة، المساحات والأحجام والبيانات.",
        "love": "توافق الأبراج، اختبارات الأسماء الترفيهية ومقاييس العلاقات."
      }
    },
    "popularSection": {
      "heading": "أشهر الحاسبات",
      "toolsCount": "33 أداة",
      "tools": {
        "percentage-calculator": "حاسبة النسبة المئوية",
        "bmi-calculator": "حاسبة كتلة الجسم (BMI)",
        "age-calculator": "حاسبة العمر",
        "love-calculator": "مقياس الحب",
        "scientific-calculator": "آلة حاسبة علمية",
        "emi-calculator": "حاسبة القسط الشهري",
        "mortgage-calculator": "حاسبة التمويل العقاري",
        "loan-calculator": "حاسبة القروض",
        "time-calculator": "حاسبة الوقت",
        "date-calculator": "حاسبة الفرق بين تاريخين",
        "salary-calculator": "حاسبة الراتب",
        "compound-interest-calculator": "حاسبة الفائدة المركبة",
        "conversion-calculator": "محول الوحدات القياسية",
        "body-fat-calculator": "حاسبة نسبة الدهون",
        "bmr-calculator": "معدل الحرق الأساسي (BMR)",
        "sip-calculator": "حاسبة الاستثمار الدوري",
        "auto-loan-calculator": "تمويل السيارات",
        "gpa-calculator": "حاسبة المعدل التراكمي",
        "roi-calculator": "العائد على الاستثمار (ROI)",
        "tip-calculator": "حاسبة الإكرامية",
        "income-tax-calculator": "حاسبة ضريبة الدخل",
        "probability-calculator": "حاسبة الاحتمالات",
        "password-generator": "مولد كلمات المرور",
        "discount-calculator": "حاسبة الخصم",
        "ovulation-calculator": "حاسبة التبويض",
        "ohms-law-calculator": "قانون أوم الكهربائي",
        "pregnancy-due-date-calculator": "حاسبة موعد الولادة",
        "concrete-calculator": "حاسبة حجم الخرسانة",
        "paint-calculator": "حاسبة كمية الطلاء",
        "amortization-calculator": "جدول سداد القرض",
        "inflation-calculator": "حاسبة التضخم",
        "square-footage-calculator": "حاسبة المساحة",
        "ruler": "مسطرة قياس تفاعلية"
      }
    },
    "regionsSection": {
      "heading": "الدول والمناطق",
      "economiesCount": "18 اقتصاداً",
      "countries": {
        "united-states": "الولايات المتحدة",
        "india": "الهند",
        "united-kingdom": "المملكة المتحدة",
        "canada": "كندا",
        "australia": "أستراليا",
        "germany": "ألمانيا",
        "france": "فرنسا",
        "japan": "اليابان",
        "brazil": "البرازيل",
        "italy": "إيطاليا",
        "spain": "إسبانيا",
        "mexico": "المكسيك",
        "south-africa": "جنوب أفريقيا",
        "saudi-arabia": "المملكة العربية السعودية",
        "uae": "الإمارات العربية المتحدة",
        "singapore": "سنغافورة",
        "netherlands": "هولندا",
        "nigeria": "نيجيريا"
      }
    },
    "aboutSection": {
      "eyebrow": "الهندسة والمنهجية",
      "h2": "صُممت من أجل السرعة، الأمان والشفافية الرياضية",
      "desc": "يقدم موقع Free Accurate Calculator أدوات حسابية موثوقة ومفتوحة، تعتمد على معادلات رياضية معتمدة وتتم معالجتها بالكامل داخل متصفحك.",
      "headerLeft": "ركائز الحساب الأساسية",
      "headerRight": "بنية تقنية حديثة",
      "pillar1Title": "استجابة فورية عبر شبكة Edge",
      "pillar1Desc": "صفحات HTML ثابتة ومجهزة مسبقاً عبر شبكة Cloudflare العالمية لضمان سرعة فائقة دون انتظار الخوادم.",
      "pillar2Title": "تطابق مع المعايير الإقليمية",
      "pillar2Desc": "أدوات مصممة لتلائم المعايير المالية، والعملات، وتنسيقات الأرقام بوضوح وشفافية.",
      "pillar3Title": "حسابات فورية داخل متصفحك",
      "pillar3Desc": "تتم جميع العمليات الحسابية داخل جهازك ومتصفحك مباشرة. بياناتك وأرقامك المالية لا تُرسل ولا تُحفظ في أي خوادم.",
      "pillar4Title": "نماذج رياضية ومعادلات معيارية",
      "pillar4Desc": "تعتمد الأدوات على معادلات جبرية واضحة وحسابات قياسية مع قواعد تقريب معلنة ومحددة.",
      "pillar5Title": "شفافية كاملة خطوة بخطوة",
      "pillar5Desc": "نعرض المعادلات الرياضية والمتغيرات بجانب كل نتيجة لمساعدتك في التحقق من دقة النتائج بنفسك.",
      "pillar6Title": "طباعة وتصدير PDF بسهولة",
      "pillar6Desc": "إمكانية إنشاء تقارير PDF منظمة وجداول سداد جاهزة للطباعة بنقرة واحدة من نتائج الحساب.",
      "ctaButton": "تعرف على منهجية الحساب"
    },
    "orphanSection": {
      "badge": "دليل إقليمي موثق",
      "heading": "حاسبات مالية إقليمية ومتخصصة",
      "subtext": "أدوات دقيقة تمت معايرتها لتناسب الأنظمة الضريبية والمالية والعملات المختلفة.",
      "exploreAll": "استعراض جميع الدول"
    },
    "howItWorksSection": {
      "eyebrow": "المنهجية والمعايير",
      "heading": "كيف تعمل حاسباتنا",
      "desc": "مبنية لتقديم أعلى درجات الشفافية الحسابية والوضوح في الافتراضات مع حماية خصوصيتك.",
      "step1Title": "1. معادلات رياضية موثقة",
      "step1Desc": "تعتمد كل حاسبة على صيغ رياضية قياسية وقواعد مالية معترف بها.",
      "step2Title": "2. معالجة محلية داخل المتصفح",
      "step2Desc": "تجري جميع الحسابات محلياً في متصفح جهازك دون إرسال أي أرقام إلى خوادمنا.",
      "step3Title": "3. افتراضات واضحة ومعلنة",
      "step3Desc": "نوضح القوانين وطرق التقريب المستخدمة لتمكينك من مراجعة خطوات الحل بسهولة."
    },
    "faqSection": {
      "eyebrow": "الأسئلة الشائعة",
      "heading": "أسئلة شائعة حول الحاسبات",
      "desc": "إجابات مباشرة وواضحة حول طريقة عمل الأدوات، دقتها وحماية خصوصية بياناتك.",
      "items": [
        {
          "question": "هل جميع الحاسبات على الموقع مجانية الاستخدام؟",
          "answer": "نعم، جميع الأدوات مجانية بالكامل دون أي اشتراكات أو رسوم أو حاجة لتسجيل حساب."
        },
        {
          "question": "كيف يتم التأكد من صحة الحسابات؟",
          "answer": "نعتمد على معادلات رياضية معلنة ومعايير واضحة، مع عرض المنهجية المتبعة بجانب كل حاسبة للمراجعة."
        },
        {
          "question": "هل يتم حفظ أو تسجيل بياناتي الشخصية أو المالية؟",
          "answer": "كلا. تتم الحسابات محلياً داخل ذاكرة متصفحك فقط، ولا يتم نقل أي أرقام أو تخزينها على خوادمنا."
        },
        {
          "question": "هل يمكن استخدام هذه الحاسبات عبر الهواتف الذكية؟",
          "answer": "نعم، الموقع مصمم ليعمل بسلاسة وسرعة فائقة على جميع أحجام الشاشات كالهواتف والأجهزة اللوحية والحواسيب."
        },
        {
          "question": "هل تغني هذه النتائج عن استشارة المختصين؟",
          "answer": "لا، هذه الأدوات تقدم تقديرات تعليمية وإرشادية مبنية على نماذج رياضية، ولا تغني عن استشارة الخبراء الماليين أو القانونيين أو الأطباء."
        },
        {
          "question": "كيف يمكنني حفظ النتيجة أو طباعتها؟",
          "answer": "توفر كل حاسبة زراً خاصاً لإنشاء تقرير PDF منسق أو طباعة جدول النتائج فوراً بنقرة واحدة."
        }
      ]
    },
    "footer": {
      "brandDesc": "حاسبات مجانية سريعة وشفافة تعمل مباشرة داخل المتصفح بالاعتماد على معادلات رياضية موثقة.",
      "cloudflareVerified": "موثق عبر شبكة Cloudflare Edge",
      "financeTitle": "المالية والقروض",
      "healthTitle": "الصحة والرشاقة",
      "mathTitle": "الرياضيات والعلوم",
      "everydayTitle": "أدوات يومية",
      "globalTitle": "الإصدارات الدولية",
      "guides": "الأدلة",
      "about": "من نحن",
      "contact": "اتصل بنا",
      "terms": "شروط الاستخدام",
      "privacy": "سياسة الخصوصية",
      "rights": "جميع الحقوق محفوظة."
    }
  },
  "ja": {
    "seo": {
      "title": "無料オンライン計算機 – 金融・健康・数学ツール | Free Accurate Calculator",
      "description": "金融、健康、数学、日常生活のための無料オンライン計算機。公開された計算式に基づき、ブラウザ上ですぐに透明性の高い計算結果を確認できます。",
      "websiteName": "Free Accurate Calculator (日本語)",
      "websiteDesc": "個人財務、健康管理、数学、日常生活のための高精度・完全無料のオンライン計算機群。"
    },
    "hero": {
      "pillBadge": "100+ 無料オンライン計算機 • 明確な計算式 • 安全なブラウザ内実行",
      "h1Line1": "無料オンライン計算機",
      "h1Highlight": "高速・高精度で使いやすい",
      "subtitle": "個人財務、ローン返済、健康管理、数学、日常生活に役立つ無料のオンライン計算機。外部サーバーへのデータ送信なしで、明確な公式とステップ解説に基づきブラウザ内で安全に計算できます。",
      "metric1Value": "⚡ 100+ ツール",
      "metric1Label": "完全無料アクセス",
      "metric2Value": "📐 明確な公式",
      "metric2Label": "透明な計算手法",
      "metric3Value": "🔒 ブラウザ内処理",
      "metric3Label": "データ送信なし"
    },
    "search": {
      "placeholder": "計算機を検索（例：ローン返済額、BMI、パーセント、利息）...",
      "ariaLabel": "すべての計算機を検索",
      "clearLabel": "検索をクリア",
      "ctrlK": "Ctrl K",
      "suggestedCount": "おすすめの計算機",
      "openHint": "Enter ↵ で開く",
      "noResults": "計算機が見つかりませんでした",
      "noResultsHint": "「ローン」「複利」「パーセント」「BMI」「税金」などで検索してください",
      "verifiedBadge": "検証済み計算機リンク",
      "navigateHint": "移動",
      "closeHint": "閉じる",
      "openCalc": "開く →",
      "typewriterPrompts": [
        "検索 🏦 ローン返済額計算機 (EMI)...",
        "検索 🩺 BMI（体格指数）計算機...",
        "検索 📈 複利シミュレーター...",
        "検索 📐 パーセント計算機...",
        "検索 🎂 年齢計算機...",
        "検索 🚗 マイカーローン計算機...",
        "検索 📊 積立投資シミュレーター...",
        "検索 🔄 単位換算ツール...",
        "検索 💼 給与・手取り計算機...",
        "検索 ⏱️ 勤務時間計算機...",
        "検索 🔬 関数電卓..."
      ]
    },
    "categoriesSection": {
      "heading": "カテゴリー一覧",
      "domainsCount": "21 分野",
      "categories": {
        "finance": "金融・マネー",
        "insurance": "保険",
        "legal": "法務・生活",
        "business": "ビジネス・経営",
        "construction": "建築・DIY",
        "real-estate": "不動産",
        "technology": "テクノロジー・IT",
        "health": "健康・フィットネス",
        "statistics": "統計学",
        "marketing": "マーケティング",
        "math": "数学・幾何",
        "automotive": "自動車・バイク",
        "biology": "生物学",
        "chemistry": "化学",
        "physics": "物理学",
        "food": "料理・栄養",
        "sports": "スポーツ・運動",
        "ecology": "環境・エコ",
        "everyday": "日常便利ツール",
        "converter": "単位換算",
        "love": "相性・診断"
      },
      "descriptions": {
        "finance": "各種ローン、住宅ローン、利息計算、資産運用シミュレーションを行います。",
        "insurance": "定期生命保険の必要保障額、保険料目安、満期試算を行います。",
        "legal": "養育費、婚姻費用、法的義務に関する目安額を試算します。",
        "business": "ROI（投資収益率）、損益分岐点、粗利益率、営業利益を分析します。",
        "construction": "生コンクリート容量、塗料の必要量、建築資材の必要量を算出します。",
        "real-estate": "表面/実質利回り、返済シミュレーション、購入可能額を計算します。",
        "technology": "AIトークン費用、通信帯域幅、クラウドストレージ容量を見積もります。",
        "health": "BMI、基礎代謝量（BMR）、体脂肪率、必要カロリーを測定します。",
        "statistics": "確率、標準偏差、必要サンプルサイズ、各種確率分布を計算します。",
        "marketing": "顧客獲得単価（CAC）、広告費用対効果（ROAS）、CVRを計測します。",
        "math": "パーセント、分数、方程式、面積や体積の幾何計算を瞬時に解きます。",
        "automotive": "自動車ローン返済額、ガソリン代、車両の減価償却費を算出します。",
        "biology": "細胞分裂増殖時間、DNA濃度、生物学的反応速度を計算します。",
        "chemistry": "モル濃度、希釈計算、気体の状態方程式、分子量を算出します。",
        "physics": "速度、加速度、運動エネルギー、力、各種物理定数の計算を行います。",
        "food": "料理レシピの分量変換、人数ごとの材料比率を調整します。",
        "sports": "ランニングペース、心拍トレーニングゾーン、目標タイムを割り出します。",
        "ecology": "CO₂排出量、コンポスト混合比、環境負荷を計算します。",
        "everyday": "満年齢、日数計算、労働時間集計、強固なパスワードを即座に作成します。",
        "converter": "長さ、重さ、温度、面積、体積、データ容量の各単位を相互変換します。",
        "love": "星座の相性、姓名判断、気軽な恋愛・人間関係テストを楽しめます。"
      }
    },
    "popularSection": {
      "heading": "人気の計算機",
      "toolsCount": "33ツール",
      "tools": {
        "percentage-calculator": "パーセント計算機",
        "bmi-calculator": "BMI（体格指数）計算機",
        "age-calculator": "年齢計算機",
        "love-calculator": "相性診断計算機",
        "scientific-calculator": "関数電卓",
        "emi-calculator": "ローン返済額計算機",
        "mortgage-calculator": "住宅ローン計算機",
        "loan-calculator": "融資・借入金計算機",
        "time-calculator": "時間・日数計算機",
        "date-calculator": "日付計算機",
        "salary-calculator": "給与・手取り計算機",
        "compound-interest-calculator": "複利シミュレーター",
        "conversion-calculator": "単位換算ツール",
        "body-fat-calculator": "体脂肪率計算機",
        "bmr-calculator": "基礎代謝量（BMR）計算機",
        "sip-calculator": "積立投資シミュレーター",
        "auto-loan-calculator": "マイカーローン計算機",
        "gpa-calculator": "GPA計算ツール",
        "roi-calculator": "投資利益率（ROI）計算機",
        "tip-calculator": "チップ計算機",
        "income-tax-calculator": "所得税計算機",
        "probability-calculator": "確率計算機",
        "password-generator": "パスワード生成ツール",
        "discount-calculator": "割引・セール計算機",
        "ovulation-calculator": "排卵日予測計算機",
        "ohms-law-calculator": "オームの法則計算機",
        "pregnancy-due-date-calculator": "出産予定日計算機",
        "concrete-calculator": "生コンクリート容量計算機",
        "paint-calculator": "塗料必要量計算機",
        "amortization-calculator": "元利均等返済スケジュール",
        "inflation-calculator": "インフレ率計算機",
        "square-footage-calculator": "面積・平米換算計算機",
        "ruler": "実寸大オンライン定規"
      }
    },
    "regionsSection": {
      "heading": "対応国・地域",
      "economiesCount": "18カ国",
      "countries": {
        "united-states": "アメリカ合衆国",
        "india": "インド",
        "united-kingdom": "イギリス",
        "canada": "カナダ",
        "australia": "オーストラリア",
        "germany": "ドイツ",
        "france": "フランス",
        "japan": "日本",
        "brazil": "ブラジル",
        "italy": "イタリア",
        "spain": "スペイン",
        "mexico": "メキシコ",
        "south-africa": "南アフリカ",
        "saudi-arabia": "サウジアラビア",
        "uae": "アラブ首長国連邦",
        "singapore": "シンガポール",
        "netherlands": "オランダ",
        "nigeria": "ナイジェリア"
      }
    },
    "aboutSection": {
      "eyebrow": "設計思想と数学的アプローチ",
      "h2": "高速性・信頼性・計算プロセスの透明性を追求",
      "desc": "Free Accurate Calculatorは、公開された数理モデルと安全なブラウザ内処理に基づき、高速で正確なオンライン計算ツールを提供します。",
      "headerLeft": "計算の基本原則",
      "headerRight": "最新のアーキテクチャ",
      "pillar1Title": "高速エッジ配信",
      "pillar1Desc": "Cloudflareのグローバルエッジネットワーク上で静的HTMLを事前生成し、待ち時間のない高速アクセスを実現します。",
      "pillar2Title": "地域基準と通貨への適応",
      "pillar2Desc": "各国の通貨単位や標準的な計算規則に柔軟に対応し、わかりやすい数値表記を提供します。",
      "pillar3Title": "ブラウザ内完結のプライベート計算",
      "pillar3Desc": "すべての計算はお使いのブラウザ内部で安全に実行されます。入力された数値や給与情報が外部サーバーへ送信・保存されることはありません。",
      "pillar4Title": "標準的な計算モデルと明確な計算式",
      "pillar4Desc": "標準的な代数方程式とJavaScriptの浮動小数点演算を採用し、明確な四捨五入ルールで計算を行います。",
      "pillar5Title": "計算ステップと透明性の確保",
      "pillar5Desc": "結果の確認と検算を容易にするため、使用された公式、変数、前提条件を結果とともに明示します。",
      "pillar6Title": "印刷およびPDFレポート出力",
      "pillar6Desc": "計算結果や返済シミュレーション表を、ワンクリックで印刷用PDFとして即座に出力・保存できます。",
      "ctaButton": "計算手法の詳細を見る"
    },
    "orphanSection": {
      "badge": "検証済み地域別インデックス",
      "heading": "地域別・専門分野向け計算機",
      "subtext": "各国の通貨、税制の考え方、会計慣行に合わせて調整された計算ツールです。",
      "exploreAll": "すべての国・地域を見る"
    },
    "howItWorksSection": {
      "eyebrow": "計算手法と基準",
      "heading": "当サイトの計算機の仕組み",
      "desc": "数学的な透明性、明快な計算根拠、そしてプライバシー保護を第一に考えて構築されています。",
      "step1Title": "1. 公開された標準数式",
      "step1Desc": "公認の代数方程式や確立された金融モデルを採用し、確かな計算手順を提供します。",
      "step2Title": "2. ブラウザ内でのローカル処理",
      "step2Desc": "計算はすべてユーザーの端末内で完結します。入力された数値がサーバーにアップロードされることはありません。",
      "step3Title": "3. 前提条件と四捨五入ルールの明示",
      "step3Desc": "結果の根拠を明確にするため、適用された公式や端数処理基準を分かりやすく表示します。"
    },
    "faqSection": {
      "eyebrow": "よくあるご質問",
      "heading": "計算機に関するFAQ",
      "desc": "ツールの使い方、データの安全性、計算精度に関する疑問にお答えします。",
      "items": [
        {
          "question": "当サイトの計算機はすべて無料で利用できますか？",
          "answer": "はい、すべての計算ツールを完全無料でご利用いただけます。登録や課金、アカウント作成などは一切不要です。"
        },
        {
          "question": "計算結果の正確性はどのように検証されていますか？",
          "answer": "一般に認められた数学公式や標準的な算定式を採用しており、各ツールの画面上で計算式や導出ロジックをご確認いただけます。"
        },
        {
          "question": "入力した個人情報や数値が保存されることはありますか？",
          "answer": "いいえ。すべての処理はご利用端末のブラウザ内メモリでのみ実行され、外部サーバーに入力データが保存・送信されることはありません。"
        },
        {
          "question": "スマートフォンやタブレットでも問題なく使えますか？",
          "answer": "はい。モバイル端末向けにレスポンシブデザインを採用しており、タップ操作や数字入力がスムーズに行えるよう最適化されています。"
        },
        {
          "question": "計算結果は専門家のアドバイスの代わりになりますか？",
          "answer": "いいえ。本ツールの結果は一般的な数理モデルに基づく参考値・概算です。正確な税務・法務・医療上の判断には必ず資格を有する専門家へご相談ください。"
        },
        {
          "question": "計算結果を保存したり印刷したりするには？",
          "answer": "各計算機に用意されたボタンから、結果や返済明細表を整形されたPDF形式で直接保存・印刷できます。"
        }
      ]
    },
    "footer": {
      "brandDesc": "ブラウザ内で安全に動作し、公開された計算式に基づき高速・正確な結果を提供する無料オンライン計算機群。",
      "cloudflareVerified": "Cloudflare Edge 検証済み",
      "financeTitle": "金融・ローン",
      "healthTitle": "健康・フィットネス",
      "mathTitle": "数学・科学",
      "everydayTitle": "日常の便利ツール",
      "globalTitle": "国際版",
      "guides": "ガイド一覧",
      "about": "運営者について",
      "contact": "お問い合わせ",
      "terms": "利用規約",
      "privacy": "プライバシーポリシー",
      "rights": "All rights reserved."
    }
  },
  "zh": {
    "seo": {
      "title": "免费在线计算器 – 财务、健康、数学及日常计算 | Free Accurate Calculator",
      "description": "涵盖财务、健康、数学和日常生活的免费在线计算器。公式公开透明，纯本地浏览器运算，快速获取准确清晰的计算结果。",
      "websiteName": "Free Accurate Calculator (简体中文)",
      "websiteDesc": "提供面向个人财务、健康管理、数学学习与日常生活场景的免费、精准在线计算工具。"
    },
    "hero": {
      "pillBadge": "100+ 免费在线计算器 • 公式透明 • 本地安全运算",
      "h1Line1": "免费在线计算器",
      "h1Highlight": "快速、精准、简单易用",
      "subtitle": "轻松使用面向个人理财、贷款还款、健康管理、数学科学和日常生活的一站式免费在线计算器。零数据上传，基于公开公式与清晰步骤，在您的浏览器本地安全计算。",
      "metric1Value": "⚡ 100+ 款工具",
      "metric1Label": "完全免费使用",
      "metric2Value": "📐 公式透明",
      "metric2Label": "推导步骤清晰",
      "metric3Value": "🔒 本地浏览器运行",
      "metric3Label": "零隐私数据上传"
    },
    "search": {
      "placeholder": "搜索计算器（例如：等额本息、房贷、BMI、百分比、复利）...",
      "ariaLabel": "搜索所有计算器",
      "clearLabel": "清空搜索词",
      "ctrlK": "Ctrl K",
      "suggestedCount": "推荐计算器",
      "openHint": "按回车 ↵ 直接打开",
      "noResults": "未找到相关计算器",
      "noResultsHint": "尝试搜索 \"房贷\"、\"利息\"、\"百分比\"、\"bmi\" 或 \"税\"",
      "verifiedBadge": "官方验证工具链接",
      "navigateHint": "选择",
      "closeHint": "关闭",
      "openCalc": "打开 →",
      "typewriterPrompts": [
        "搜索 🏦 等额本息还款计算器 (EMI)...",
        "搜索 🩺 BMI 身体质量指数计算器...",
        "搜索 📈 复利投资增值计算器...",
        "搜索 📐 百分比计算器...",
        "搜索 🎂 周岁年龄精准计算器...",
        "搜索 🚗 汽车分期车贷计算器...",
        "搜索 📊 基金定投复利计算器...",
        "搜索 🔄 常用单位换算工具...",
        "搜索 💼 税后工资与薪酬计算器...",
        "搜索 ⏱️ 工时考勤时间计算器...",
        "搜索 🔬 科学计算器..."
      ]
    },
    "categoriesSection": {
      "heading": "工具分类",
      "domainsCount": "21 个领域",
      "categories": {
        "finance": "财务与借贷",
        "insurance": "保险规划",
        "legal": "法务与抚养",
        "business": "商业与营运",
        "construction": "工程与装修",
        "real-estate": "房产置业",
        "technology": "科技与AI算力",
        "health": "健康与体能",
        "statistics": "统计分析",
        "marketing": "数字营销",
        "math": "数学与几何",
        "automotive": "汽车与出行",
        "biology": "生命科学",
        "chemistry": "化学计算",
        "physics": "物理力学",
        "food": "餐饮与烹饪",
        "sports": "运动与配速",
        "ecology": "环境与低碳",
        "everyday": "日常实用工具",
        "converter": "单位换算",
        "love": "契合度测试"
      },
      "descriptions": {
        "finance": "计算商业贷款、房贷月供、理财复利收益及个人财务规划方案。",
        "insurance": "测算人寿保险保额缺口、保费预算及保单收益率。",
        "legal": "测算抚养费标准、赡养补偿金及法定财务责任分配。",
        "business": "分析投资回报率 (ROI)、盈亏平衡点及企业销售毛利率。",
        "construction": "计算浇筑混凝土方量、涂料涂刷用量及工程材料配比。",
        "real-estate": "测算租金回报率、公积金/商业房贷还款计划及购房预算。",
        "technology": "估算大模型 AI Token 调用成本、网络带宽及云存储需求。",
        "health": "监测体质指数 (BMI)、基础代谢率 (BMR)、体脂率及每日热量。",
        "statistics": "计算概率、标准差、样本抽样容量及正态分布。",
        "marketing": "测算获客成本 (CAC)、广告支出回报率 (ROAS) 及转化率。",
        "math": "求解百分比增减、分数加减、三角函数及科学方程式。",
        "automotive": "计算汽车按揭分期、日常百公里油耗及二手车折旧率。",
        "biology": "测算细胞倍增时间、DNA 浓度及微生物对数生长期。",
        "chemistry": "计算摩尔浓度、溶液稀释配比、理想气体状态方程及相对分子质量。",
        "physics": "计算运动速度、加速度、动能功耗、作用力及常用物理常数。",
        "food": "缩放烹饪食谱配料比例、用餐份量及营养摄入分配。",
        "sports": "计算跑步配速 (Pace)、运动心率区间及耐力训练目标。",
        "ecology": "评估个人碳足迹、有机堆肥碳氮比及节能减排效益。",
        "everyday": "精准计算实岁年龄、两个日期间隔天数、考勤工时及随机密码。",
        "converter": "长度、重量、温度、面积、容积及计算机数据容量相互转换。",
        "love": "星座契合度测算、姓名配对测试及趣味人际互动工具。"
      }
    },
    "popularSection": {
      "heading": "热门计算工具",
      "toolsCount": "33 款工具",
      "tools": {
        "percentage-calculator": "百分比计算器",
        "bmi-calculator": "BMI 身体质量指数计算器",
        "age-calculator": "年龄周岁计算器",
        "love-calculator": "契合度配对测试器",
        "scientific-calculator": "科学计算器",
        "emi-calculator": "等额本息还款计算器",
        "mortgage-calculator": "房贷还款计算器",
        "loan-calculator": "借款利息计算器",
        "time-calculator": "时间加减计算器",
        "date-calculator": "日期间隔天数计算器",
        "salary-calculator": "税后工资与薪酬计算器",
        "compound-interest-calculator": "复利投资增值计算器",
        "conversion-calculator": "常用单位换算工具",
        "body-fat-calculator": "体脂率测算计算器",
        "bmr-calculator": "基础代谢率 (BMR) 计算器",
        "sip-calculator": "基金定投复利计算器",
        "auto-loan-calculator": "汽车车贷分期计算器",
        "gpa-calculator": "绩点 GPA 计算器",
        "roi-calculator": "投资回报率 (ROI) 计算器",
        "tip-calculator": "小费结算计算器",
        "income-tax-calculator": "个税所得税计算器",
        "probability-calculator": "概率统计计算器",
        "password-generator": "高强度随机密码生成器",
        "discount-calculator": "打折折扣减价计算器",
        "ovulation-calculator": "排卵期安全期预测计算器",
        "ohms-law-calculator": "欧姆定律电学计算器",
        "pregnancy-due-date-calculator": "预产期推算计算器",
        "concrete-calculator": "混凝土方量计算器",
        "paint-calculator": "油漆涂刷用量计算器",
        "amortization-calculator": "还款分摊明细表",
        "inflation-calculator": "通货膨胀贬值计算器",
        "square-footage-calculator": "平米与平方英尺换算",
        "ruler": "1:1 在线屏幕实物比例尺"
      }
    },
    "regionsSection": {
      "heading": "国家与地区支持",
      "economiesCount": "18 个经济体",
      "countries": {
        "united-states": "美国",
        "india": "印度",
        "united-kingdom": "英国",
        "canada": "加拿大",
        "australia": "澳大利亚",
        "germany": "德国",
        "france": "法国",
        "japan": "日本",
        "brazil": "巴西",
        "italy": "意大利",
        "spain": "西班牙",
        "mexico": "墨西哥",
        "south-africa": "南非",
        "saudi-arabia": "沙特阿拉伯",
        "uae": "阿拉伯联合酋长国",
        "singapore": "新加坡",
        "netherlands": "荷兰",
        "nigeria": "尼日利亚"
      }
    },
    "aboutSection": {
      "eyebrow": "工程理念与数学规范",
      "h2": "为快速响应、信赖保障与数学透明度而构建",
      "desc": "Free Accurate Calculator 提供可靠、透明且完全本地化的计算工具，所有逻辑均基于公开发表的解析公式并在您的浏览器端完成计算。",
      "headerLeft": "核心计算支柱",
      "headerRight": "现代化架构",
      "pillar1Title": "全球边缘网络即时分发",
      "pillar1Desc": "基于 Cloudflare 全球边缘节点进行纯静态 HTML 预渲染，消除服务器往返等待，实现即开即用。",
      "pillar2Title": "适应本地规则与国际货币",
      "pillar2Desc": "支持多种国家法定货币单位、不同借贷规则与清晰直观的数字展现方式。",
      "pillar3Title": "浏览器本地私密运算",
      "pillar3Desc": "全部计算逻辑直接在您的网页浏览器内独立运行。输入的薪资、金额等私密数值绝不会上传至任何云端服务器。",
      "pillar4Title": "标准数学模型与公开计算式",
      "pillar4Desc": "采用公认代数解析公式与 JavaScript 标准浮点数运算，辅以公开透明的精确舍入规则。",
      "pillar5Title": "计算过程步骤全透明",
      "pillar5Desc": "在计算结果旁完整展示公式推导、变量定义与示范示例，方便您随时对数据进行核对。",
      "pillar6Title": "一键导出 PDF 与打印支持",
      "pillar6Desc": "支持将计算明细与分期还款计划表一键导出为排版清晰的专业 PDF 报告，随时可供打印存档。",
      "ctaButton": "了解我们的计算方法"
    },
    "orphanSection": {
      "badge": "官方认证区域索引",
      "heading": "区域性与垂直领域专属计算器",
      "subtext": "经过严谨验证、针对不同国家地区税制规则与货币习惯进行校准的计算工具。",
      "exploreAll": "查看全部国家与地区"
    },
    "howItWorksSection": {
      "eyebrow": "计算规范与标准",
      "heading": "我们的计算器如何运作",
      "desc": "始终坚持严谨的数学推导、清晰的前提假设以及严格保护用户隐私。",
      "step1Title": "1. 采用公开发表的标准公式",
      "step1Desc": "每款计算工具均严格基于行业公认的闭式代数公式与标准数学算法。",
      "step2Title": "2. 纯客户端本地沙箱运算",
      "step2Desc": "所有数值计算均在您的设备本地完成，不向云端发送任何私密数值或个人数据。",
      "step3Title": "3. 明确的前提假设与舍入规则",
      "step3Desc": "在结果旁清晰标注利率计息方式、四舍五入规则及变量定义，方便随时复核验证。"
    },
    "faqSection": {
      "eyebrow": "常见问题解答",
      "heading": "关于计算器的常见疑问",
      "desc": "关于工具使用、隐私保护及算法精度的常见问题说明。",
      "items": [
        {
          "question": "本网站上的计算器完全免费吗？",
          "answer": "是的，所有计算工具均完全免费使用。无任何强制付费门槛、订阅要求或账户注册。"
        },
        {
          "question": "计算结果是如何推导并验证的？",
          "answer": "我们的计算器严格遵循学术界和金融界通用的代数公式与公布规则，并在工具页面展示具体公式供您核查。"
        },
        {
          "question": "我的个人财务数据安全吗？会被服务器保存吗？",
          "answer": "完全安全。所有的计算都在您的浏览器本地内存中执行，没有任何数值、收入数据或个人信息会被上传或存储到远程服务器。"
        },
        {
          "question": "可以在手机和平板电脑上顺畅使用吗？",
          "answer": "可以。所有计算器均采用移动端自适应设计，针对触控屏幕与数字软键盘进行了专项交互优化。"
        },
        {
          "question": "计算结果可以替代专业财务或法律意见吗？",
          "answer": "不能。计算器提供基于标准数理模型的参考估算与教育科普，无法代替持证执业律师、注册会计师或专业医生的正式咨询。"
        },
        {
          "question": "如何保存或打印我的计算清单与结果？",
          "answer": "每款计算工具都内置了快速打印与 PDF 导出功能，只需轻点一次即可生成整洁规范的报告摘要。"
        }
      ]
    },
    "footer": {
      "brandDesc": "公式透明、结果清晰的免费在线计算器，纯本地浏览器端高速运行，严格保障数据隐私。",
      "cloudflareVerified": "Cloudflare 边缘节点已验证",
      "financeTitle": "财务与借贷",
      "healthTitle": "健康与体能",
      "mathTitle": "数学与几何",
      "everydayTitle": "日常实用工具",
      "globalTitle": "国际版本",
      "guides": "深度指南",
      "about": "关于我们",
      "contact": "联系我们",
      "terms": "使用条款",
      "privacy": "隐私政策",
      "rights": "保留所有权利。"
    }
  },
  "nl": {
    "seo": {
      "title": "Gratis online rekenmachines – Financiën, gezondheid & wiskunde | Free Accurate Calculator",
      "description": "Gratis online rekenmachines voor financiën, gezondheid, wiskunde en dagelijks gebruik. Snelle en transparante resultaten met gedocumenteerde formules.",
      "websiteName": "Free Accurate Calculator (Nederlands)",
      "websiteDesc": "Gratis, transparante en nauwkeurige online rekenmachines voor persoonlijke financiën, gezondheid, wiskunde en dagelijks gebruik."
    },
    "hero": {
      "pillBadge": "100+ Gratis online rekenmachines • Gedocumenteerde formules",
      "h1Line1": "Gratis online rekenmachines",
      "h1Highlight": "Snel, nauwkeurig en eenvoudig",
      "subtitle": "Toegang tot gratis online rekenmachines voor persoonlijke financiën, leningen, gezondheid, wiskunde en zakelijke calculaties. Snelle resultaten met gedocumenteerde formules en veilige verwerking in uw eigen browser.",
      "metric1Value": "⚡ 100+ Rekentools",
      "metric1Label": "Gratis online toegang",
      "metric2Value": "📐 Heldere formules",
      "metric2Label": "Transparante wiskunde",
      "metric3Value": "🔒 In uw browser",
      "metric3Label": "Geen data verzonden"
    },
    "search": {
      "placeholder": "Zoek rekenmachine (bijv. hypotheek, BMI, percentage, lening)...",
      "ariaLabel": "Zoek in alle rekenmachines",
      "clearLabel": "Zoekopdracht wissen",
      "ctrlK": "Ctrl K",
      "suggestedCount": "Aanbevolen rekenmachines",
      "openHint": "druk op enter ↵ om te openen",
      "noResults": "Geen rekenmachines gevonden",
      "noResultsHint": "Probeer te zoeken op \"lening\", \"rente\", \"percentage\", \"bmi\" of \"salaris\"",
      "verifiedBadge": "Geverifieerde links",
      "navigateHint": "navigeren",
      "closeHint": "sluiten",
      "openCalc": "Openen →",
      "typewriterPrompts": [
        "Zoeken 🏦 Lening Rekenmachine (Maandlasten)...",
        "Zoeken 🩺 BMI Rekenmachine...",
        "Zoeken 📈 Samengestelde Rente...",
        "Zoeken 📐 Percentage Rekenmachine...",
        "Zoeken 🎂 Exacte Leeftijd Berekenen...",
        "Zoeken 🚗 Autolening Calculator...",
        "Zoeken 📊 Beleggingsplan Calculator...",
        "Zoeken 🔄 Eenheden Omrekenen...",
        "Zoeken 💼 Netto Salaris Berekenen...",
        "Zoeken ⏱️ Urenregistratie Calculator...",
        "Zoeken 🔬 Wetenschappelijke Rekenmachine..."
      ]
    },
    "categoriesSection": {
      "heading": "Categorieën",
      "domainsCount": "21 Domeinen",
      "categories": {
        "finance": "Financiën & Leningen",
        "insurance": "Verzekeringen",
        "legal": "Juridisch & Familie",
        "business": "Zakelijk & Bedrijf",
        "construction": "Bouw & Klussen",
        "real-estate": "Vastgoed & Wonen",
        "technology": "Technologie & IT",
        "health": "Gezondheid & Fitness",
        "statistics": "Statistiek",
        "marketing": "Marketing",
        "math": "Wiskunde",
        "automotive": "Auto & Vervoer",
        "biology": "Biologie",
        "chemistry": "Chemie",
        "physics": "Natuurkunde",
        "food": "Voeding & Koken",
        "sports": "Sport & Training",
        "ecology": "Milieu & Klimaat",
        "everyday": "Dagelijks Gebruik",
        "converter": "Omrekenen",
        "love": "Relaties & Tests"
      },
      "descriptions": {
        "finance": "Bereken leningen, hypotheeklasten, rente en persoonlijke financiële plannen.",
        "insurance": "Schat overlijdensrisicodekking, premies en verzekeringsbehoeften in.",
        "legal": "Bereken alimentatie, kinderalimentatie en wettelijke financiële verplichtingen.",
        "business": "Analyseer ROI (rendement), break-even punten en brutowinstmarges.",
        "construction": "Bereken betonvolumes, benodigde verfhoeveelheden en bouwmaterialen.",
        "real-estate": "Bereken huurrendement, hypotheekleningen en woningbetaalbaarheid.",
        "technology": "Schat kosten voor AI-tokens, netwerkbandbreedte en cloudopslag in.",
        "health": "Volg uw BMI, basaal metabolisme (BMR), vetpercentage en caloriebehoefte.",
        "statistics": "Bereken kansen, standaarddeviaties, steekproefgroottes en verdelingen.",
        "marketing": "Meet kosten per klant (CAC), rendement op advertenties (ROAS) en conversies.",
        "math": "Bereken percentages, breuken, geometrische oppervlaktes en vergelijkingen.",
        "automotive": "Bereken maandlasten voor autoleningen, brandstofverbruik en afschrijving.",
        "biology": "Verdubbelingstijd van cellen, DNA-concentratie en biologische groeisnelheid.",
        "chemistry": "Bereken molariteit, verdunningen van chemische oplossingen en gaswetten.",
        "physics": "Bereken snelheid, versnelling, kinetische energie, krachten en natuurkundige formules.",
        "food": "Schaal recepten, portiegroottes en voedingswaarde-ingrediënten nauwkeurig af.",
        "sports": "Looptempo (pace), hartslagzones en sportieve streeftijden berekenen.",
        "ecology": "Bereken CO₂-compensatie, compostverhoudingen en ecologische voetafdruk.",
        "everyday": "Handige tools voor exacte leeftijd, datumverschil, gewerkte uren en wachtwoorden.",
        "converter": "Zet lengte, gewicht, temperatuur, oppervlakte, volume en data-eenheden om.",
        "love": "Sterrenbeeld-compatibiliteit, naamtests en gezellige relatiequizzen."
      }
    },
    "popularSection": {
      "heading": "Populaire Rekenmachines",
      "toolsCount": "33 Rekentools",
      "tools": {
        "percentage-calculator": "Percentage rekenmachine",
        "bmi-calculator": "BMI rekenmachine",
        "age-calculator": "Leeftijd rekenmachine",
        "love-calculator": "Liefdesmeter",
        "scientific-calculator": "Wetenschappelijke rekenmachine",
        "emi-calculator": "Maandlasten calculator",
        "mortgage-calculator": "Hypotheek berekenen",
        "loan-calculator": "Lening calculator",
        "time-calculator": "Tijd rekenmachine",
        "date-calculator": "Datumverschil rekenmachine",
        "salary-calculator": "Salaris calculator",
        "compound-interest-calculator": "Samengestelde rente calculator",
        "conversion-calculator": "Eenheden omrekenen",
        "body-fat-calculator": "Vetpercentage berekenen",
        "bmr-calculator": "Basaal metabolisme (BMR)",
        "sip-calculator": "Beleggingsplan calculator",
        "auto-loan-calculator": "Autolening calculator",
        "gpa-calculator": "Cijfergemiddelde calculator",
        "roi-calculator": "ROI berekenen",
        "tip-calculator": "Fooi berekenen",
        "income-tax-calculator": "Inkomstenbelasting calculator",
        "probability-calculator": "Kansberekening calculator",
        "password-generator": "Veilige wachtwoord generator",
        "discount-calculator": "Kortingscalculator",
        "ovulation-calculator": "Ovulatie berekenen",
        "ohms-law-calculator": "Wet van Ohm",
        "pregnancy-due-date-calculator": "Uitgerekende datum berekenen",
        "concrete-calculator": "Beton calculator",
        "paint-calculator": "Verf calculator",
        "amortization-calculator": "Aflossingsschema",
        "inflation-calculator": "Inflatie calculator",
        "square-footage-calculator": "Vierkante meters berekenen",
        "ruler": "Online liniaal"
      }
    },
    "regionsSection": {
      "heading": "Ondersteunde Landen & Regio’s",
      "economiesCount": "18 Economieën",
      "countries": {
        "united-states": "Verenigde Staten",
        "india": "India",
        "united-kingdom": "Verenigd Koninkrijk",
        "canada": "Canada",
        "australia": "Australië",
        "germany": "Duitsland",
        "france": "Frankrijk",
        "japan": "Japan",
        "brazil": "Brazilië",
        "italy": "Italië",
        "spain": "Spanje",
        "mexico": "Mexico",
        "south-africa": "Zuid-Afrika",
        "saudi-arabia": "Saoedi-Arabië",
        "uae": "Verenigde Arabische Emiraten",
        "singapore": "Singapore",
        "netherlands": "Nederland",
        "nigeria": "Nigeria"
      }
    },
    "aboutSection": {
      "eyebrow": "METHODIEK & ONTWIKKELING",
      "h2": "Ontworpen voor Snelheid, Betrouwbaarheid en Transparantie",
      "desc": "Free Accurate Calculator biedt betrouwbare en transparante rekentools, gebaseerd op gedocumenteerde formules en beveiligde berekeningen in uw browser.",
      "headerLeft": "Belangrijkste Pijlers",
      "headerRight": "Moderne Architectuur",
      "pillar1Title": "Snelle Edge Levering",
      "pillar1Desc": "Statische HTML vooraf gerenderd op het wereldwijde edge-netwerk van Cloudflare voor directe toegang zonder serververtraging.",
      "pillar2Title": "Aanpassing aan Regionale Standaarden",
      "pillar2Desc": "Afgestemd op internationale valuta, financiële conventies en duidelijke getalnotaties.",
      "pillar3Title": "Berekeningen in uw Browser",
      "pillar3Desc": "Alle berekeningen worden lokaal in uw webbrowser uitgevoerd. Uw ingevoerde financiële gegevens worden nooit naar externe servers verzonden.",
      "pillar4Title": "Standaard Wiskundige Modellen",
      "pillar4Desc": "Gebaseerd op gesloten algebraïsche formules en standaard JavaScript drijvende-kommaberekeningen met duidelijke afrondingsregels.",
      "pillar5Title": "Transparantie van Berekeningen",
      "pillar5Desc": "Wiskundige formules, definities en toelichtingen worden direct getoond zodat u elke berekening kunt verifiëren.",
      "pillar6Title": "Klaar voor PDF & Afdrukken",
      "pillar6Desc": "Genereer met één klik een nette, printklare PDF-samenvatting van uw berekeningsresultaten en aflossingstabellen.",
      "ctaButton": "Meer Over Onze Werkwijze"
    },
    "orphanSection": {
      "badge": "Geverifieerde Regionale Index",
      "heading": "Regionale en Gespecialiseerde Financiële Tools",
      "subtext": "Wiskundig gecontroleerde rekentools, afgestemd op landspecifieke fiscale kaders, valuta en regels.",
      "exploreAll": "Bekijk Alle Landen"
    },
    "howItWorksSection": {
      "eyebrow": "Methodiek & Standaarden",
      "heading": "Hoe Onze Rekenmachines Werken",
      "desc": "Gebouwd om volledige wiskundige transparantie, duidelijke aannames en optimale privacy te waarborgen.",
      "step1Title": "1. Gedocumenteerde Formules",
      "step1Desc": "Elke tool maakt gebruik van algemeen erkende wiskundige formules en beproefde methodes.",
      "step2Title": "2. Lokale Verwerking in uw Browser",
      "step2Desc": "Alle berekeningen vinden plaats op uw eigen apparaat. Gevoelige bedragen worden nooit naar servers verzonden.",
      "step3Title": "3. Duidelijke Aannames en Afronding",
      "step3Desc": "We tonen de formules en afrondingsregels zodat u de achterliggende berekening eenvoudig kunt controleren."
    },
    "faqSection": {
      "eyebrow": "Veelgestelde Vragen",
      "heading": "Veelgestelde Vragen over de Tools",
      "desc": "Duidelijke antwoorden over de werking, privacy en betrouwbaarheid van onze rekenmachines.",
      "items": [
        {
          "question": "Zijn alle rekenmachines op deze website gratis te gebruiken?",
          "answer": "Ja, alle tools zijn volledig gratis. U heeft geen account, abonnement of betaalmethode nodig om berekeningen uit te voeren of PDF-rapporten op te slaan."
        },
        {
          "question": "Hoe wordt de nauwkeurigheid van de berekeningen gegarandeerd?",
          "answer": "Onze rekenmachines gebruiken gedocumenteerde wiskundige formules en heldere aannames. Bij elke tool wordt de methodiek toegelicht."
        },
        {
          "question": "Worden mijn persoonlijke of financiële gegevens opgeslagen?",
          "answer": "Nee. Alle calculaties vinden lokaal plaats in het geheugen van uw webbrowser. Wij slaan geen ingevoerde gegevens op."
        },
        {
          "question": "Kan ik de rekenmachines op mijn mobiel of tablet gebruiken?",
          "answer": "Ja. Alle tools zijn mobiel-geoptimaliseerd en reageren soepel op touchscreens op smartphones, tablets en computers."
        },
        {
          "question": "Vervangen de uitkomsten professioneel financieel of juridisch advies?",
          "answer": "Nee. De tools bieden informatieve en educatieve berekeningen op basis van modellen. Raadpleeg voor bindende beslissingen altijd een gecertificeerd adviseur."
        },
        {
          "question": "Hoe kan ik een berekening opslaan of printen?",
          "answer": "Elke rekenmachine bevat een handige knop waarmee u direct een verzorgd PDF-overzicht of een printbare tabel genereert."
        }
      ]
    },
    "footer": {
      "brandDesc": "Snelle, transparante en veilige online rekenmachines die direct in uw browser draaien op basis van gedocumenteerde formules.",
      "cloudflareVerified": "Geverifieerd op Cloudflare Edge",
      "financeTitle": "Financiën & Leningen",
      "healthTitle": "Gezondheid & Fitness",
      "mathTitle": "Wiskunde & Wetenschap",
      "everydayTitle": "Dagelijkse Tools",
      "globalTitle": "Internationale Versies",
      "guides": "Gidsen",
      "about": "Over Ons",
      "contact": "Contact",
      "terms": "Gebruiksvoorwaarden",
      "privacy": "Privacybeleid",
      "rights": "Alle rechten voorbehouden."
    }
  },
  "ru": {
    "seo": {
      "title": "Бесплатные онлайн-калькуляторы – Финансы, здоровье и математика | Free Accurate Calculator",
      "description": "Бесплатные онлайн-калькуляторы для финансов, здоровья, математики и повседневных расчетов. Быстрые прозрачные результаты с проверенными формулами.",
      "websiteName": "Free Accurate Calculator (Русский)",
      "websiteDesc": "Бесплатные, точные и конфиденциальные онлайн-калькуляторы для финансов, здоровья, математики и бытовых расчетов."
    },
    "hero": {
      "pillBadge": "100+ Бесплатных калькуляторов • Открытые формулы • Приватность",
      "h1Line1": "Бесплатные онлайн-калькуляторы",
      "h1Highlight": "Быстрые, точные и удобные",
      "subtitle": "Большой выбор бесплатных онлайн-калькуляторов для личных финансов, кредитов, здоровья, математики и решения повседневных задач. Быстрые результаты, понятные алгоритмы и безопасные вычисления в вашем браузере.",
      "metric1Value": "⚡ 100+ Инструментов",
      "metric1Label": "Полностью бесплатно",
      "metric2Value": "📐 Открытые формулы",
      "metric2Label": "Понятные алгоритмы",
      "metric3Value": "🔒 В браузере",
      "metric3Label": "Без передачи данных"
    },
    "search": {
      "placeholder": "Поиск калькулятора (например: ипотека, ИМТ, проценты, кредит)...",
      "ariaLabel": "Поиск по всем калькуляторам",
      "clearLabel": "Очистить поиск",
      "ctrlK": "Ctrl K",
      "suggestedCount": "Рекомендуемые калькуляторы",
      "openHint": "нажмите Enter ↵ для перехода",
      "noResults": "Калькуляторы не найдены",
      "noResultsHint": "Попробуйте найти \"кредит\", \"процент\", \"имт\", \"ипотека\" или \"зарплата\"",
      "verifiedBadge": "Проверенные калькуляторы",
      "navigateHint": "перейти",
      "closeHint": "закрыть",
      "openCalc": "Открыть →",
      "typewriterPrompts": [
        "Искать 🏦 Кредитный калькулятор (платеж)...",
        "Искать 🩺 Калькулятор ИМТ...",
        "Искать 📈 Сложные проценты...",
        "Искать 📐 Калькулятор процентов...",
        "Искать 🎂 Калькулятор точного возраста...",
        "Искать 🚗 Автокредитный калькулятор...",
        "Искать 📊 Инвестиционный калькулятор...",
        "Искать 🔄 Конвертер величин...",
        "Искать 💼 Калькулятор зарплаты на руки...",
        "Искать ⏱️ Калькулятор рабочего времени...",
        "Искать 🔬 Инженерный калькулятор..."
      ]
    },
    "categoriesSection": {
      "heading": "Категории калькуляторов",
      "domainsCount": "21 Направление",
      "categories": {
        "finance": "Финансы и кредиты",
        "insurance": "Страхование",
        "legal": "Право и семья",
        "business": "Бизнес и управление",
        "construction": "Строительство и ремонт",
        "real-estate": "Недвижимость",
        "technology": "Технологии и ИИ",
        "health": "Здоровье и фитнес",
        "statistics": "Статистика",
        "marketing": "Маркетинг",
        "math": "Математика",
        "automotive": "Авто и транспорт",
        "biology": "Биология",
        "chemistry": "Химия",
        "physics": "Физика",
        "food": "Кулинария и питание",
        "sports": "Спорт и тренировки",
        "ecology": "Экология",
        "everyday": "Бытовые расчеты",
        "converter": "Конвертеры величин",
        "love": "Совместимость и тесты"
      },
      "descriptions": {
        "finance": "Расчет платежей по кредитам, ипотеке, сложным процентам и инвестициям.",
        "insurance": "Оценка страховой суммы, страховых взносов и полисов страхования жизни.",
        "legal": "Расчет алиментов, выплат на содержание детей и правовых обязательств.",
        "business": "Анализ окупаемости инвестиций (ROI), точки безубыточности и маржинальности.",
        "construction": "Расчет расхода бетона, площади покраски и строительных материалов.",
        "real-estate": "Расчет доходности аренды, графиков платежей и доступности жилья.",
        "technology": "Оценка стоимости токенов ИИ, пропускной способности сети и облачного диска.",
        "health": "Контроль индекса массы тела (ИМТ), базального метаболизма (BMR) и калорий.",
        "statistics": "Расчет вероятностей, стандартного отклонения, размера выборки и распределений.",
        "marketing": "Расчет стоимости привлечения клиента (CAC), окупаемости рекламы (ROAS).",
        "math": "Решение процентов, дробей, геометрических площадей и научных уравнений.",
        "automotive": "Расчет автокредита, расхода топлива на 100 км и амортизации автомобиля.",
        "biology": "Время удвоения клеток, концентрация ДНК и биологическая кинетика.",
        "chemistry": "Молярность растворов, разбавление, газовые законы и молекулярная масса.",
        "physics": "Скорость, ускорение, кинетическая энергия, сила и физические константы.",
        "food": "Перерасчет пропорций ингредиентов и пищевой ценности в кулинарных рецептах.",
        "sports": "Темп бега (пейс), тренировочные пульсовые зоны и целевое время на дистанции.",
        "ecology": "Оценка углеродного следа, пропорции компоста и экологический баланс.",
        "everyday": "Точный возраст, разница между датами, учет отработанных часов и пароли.",
        "converter": "Перевод единиц длины, массы, температуры, площади, объема и объема данных.",
        "love": "Совместимость по знакам зодиака, тесты имен и увлекательные тесты для пар."
      }
    },
    "popularSection": {
      "heading": "Популярные калькуляторы",
      "toolsCount": "33 калькулятора",
      "tools": {
        "percentage-calculator": "Калькулятор процентов",
        "bmi-calculator": "Калькулятор ИМТ",
        "age-calculator": "Калькулятор возраста",
        "love-calculator": "Калькулятор совместимости",
        "scientific-calculator": "Инженерный калькулятор",
        "emi-calculator": "Кредитный калькулятор (платеж)",
        "mortgage-calculator": "Ипотечный калькулятор",
        "loan-calculator": "Калькулятор займа",
        "time-calculator": "Калькулятор времени",
        "date-calculator": "Калькулятор дат",
        "salary-calculator": "Калькулятор зарплаты",
        "compound-interest-calculator": "Калькулятор сложных процентов",
        "conversion-calculator": "Конвертер величин",
        "body-fat-calculator": "Калькулятор жира в организме",
        "bmr-calculator": "Базовый обмен веществ (BMR)",
        "sip-calculator": "Инвестиционный калькулятор",
        "auto-loan-calculator": "Автокредитный калькулятор",
        "gpa-calculator": "Калькулятор среднего балла",
        "roi-calculator": "Калькулятор окупаемости (ROI)",
        "tip-calculator": "Калькулятор чаевых",
        "income-tax-calculator": "Калькулятор подоходного налога",
        "probability-calculator": "Калькулятор вероятности",
        "password-generator": "Генератор надежных паролей",
        "discount-calculator": "Калькулятор скидок",
        "ovulation-calculator": "Калькулятор овуляции",
        "ohms-law-calculator": "Закон Ома",
        "pregnancy-due-date-calculator": "Калькулятор даты родов",
        "concrete-calculator": "Калькулятор бетона",
        "paint-calculator": "Калькулятор расхода краски",
        "amortization-calculator": "График платежей и амортизации",
        "inflation-calculator": "Калькулятор инфляции",
        "square-footage-calculator": "Калькулятор площади (кв. м)",
        "ruler": "Экранная линейка онлайн"
      }
    },
    "regionsSection": {
      "heading": "Страны и регионы",
      "economiesCount": "18 Стран",
      "countries": {
        "united-states": "США",
        "india": "Индия",
        "united-kingdom": "Великобритания",
        "canada": "Канада",
        "australia": "Австралия",
        "germany": "Германия",
        "france": "Франция",
        "japan": "Япония",
        "brazil": "Бразилия",
        "italy": "Италия",
        "spain": "Испания",
        "mexico": "Мексика",
        "south-africa": "ЮАР",
        "saudi-arabia": "Саудовская Аравия",
        "uae": "ОАЭ",
        "singapore": "Сингапур",
        "netherlands": "Нидерланды",
        "nigeria": "Нигерия"
      }
    },
    "aboutSection": {
      "eyebrow": "МЕТОДОЛОГИЯ И АРХИТЕКТУРА",
      "h2": "Создано для скорости, надежности и математической точности",
      "desc": "Free Accurate Calculator предоставляет прозрачные и быстрые онлайн-инструменты для расчетов, работающие на проверенных формулах прямо в вашем браузере.",
      "headerLeft": "Ключевые принципы",
      "headerRight": "Современная архитектура",
      "pillar1Title": "Мгновенная доставка с Edge-серверов",
      "pillar1Desc": "Статический HTML предварительно рендерится на глобальной сети Cloudflare для мгновенной загрузки без серверных задержек.",
      "pillar2Title": "Учет региональных стандартов",
      "pillar2Desc": "Адаптация к международным валютам, общепринятым финансовым правилам и удобным числовым форматам.",
      "pillar3Title": "Вычисления в вашем браузере",
      "pillar3Desc": "Все вычисления происходят локально в вашем веб-браузере. Введенные числа и финансовые данные никогда не передаются и не сохраняются на серверах.",
      "pillar4Title": "Стандартные математические модели",
      "pillar4Desc": "Точные алгебраические уравнения и стандартная арифметика с плавающей запятой в JavaScript с прозрачными правилами округления.",
      "pillar5Title": "Пошаговая прозрачность формул",
      "pillar5Desc": "Формулы, переменные и пояснения к расчетам отображаются рядом с результатами для легкой проверки.",
      "pillar6Title": "Готовность к печати и экспорт в PDF",
      "pillar6Desc": "Создание аккуратных PDF-отчетов и графиков платежей в один клик прямо из окна результатов.",
      "ctaButton": "Подробнее о методологии"
    },
    "orphanSection": {
      "badge": "Проверенный региональный индекс",
      "heading": "Региональные и специализированные калькуляторы",
      "subtext": "Математически выверенные инструменты, настроенные под региональные финансовые правила и валюты.",
      "exploreAll": "Все страны"
    },
    "howItWorksSection": {
      "eyebrow": "Методология и стандарты",
      "heading": "Как работают наши калькуляторы",
      "desc": "Разработано для обеспечения математической прозрачности, понятных исходных данных и полной конфиденциальности.",
      "step1Title": "1. Проверенные формулы",
      "step1Desc": "Каждый инструмент опирается на общепризнанные математические уравнения и финансовые методики.",
      "step2Title": "2. Локальные вычисления в браузере",
      "step2Desc": "Все математические операции выполняются на вашем устройстве без отправки приватных чисел на серверы.",
      "step3Title": "3. Понятные исходные параметры",
      "step3Desc": "Мы открыто показываем используемые формулы и правила округления, чтобы вы могли легко проверить любой результат."
    },
    "faqSection": {
      "eyebrow": "Частые вопросы",
      "heading": "Часто задаваемые вопросы о калькуляторах",
      "desc": "Ответы на популярные вопросы о работе, точности расчетов и безопасности данных.",
      "items": [
        {
          "question": "Все ли калькуляторы на сайте бесплатны?",
          "answer": "Да, все инструменты полностью бесплатны. Нет платных подписок, скрытых условий или обязательной регистрации."
        },
        {
          "question": "Как проверяется точность расчетов?",
          "answer": "Наши инструменты используют классические математические формулы и общепринятые финансовые правила, которые подробно описаны на странице каждого калькулятора."
        },
        {
          "question": "Сохраняются ли мои персональные или финансовые данные?",
          "answer": "Нет. Все расчеты производятся в оперативной памяти вашего веб-браузера. Мы не собираем и не храним вводимые вами суммы."
        },
        {
          "question": "Можно ли использовать калькуляторы на смартфонах и планшетах?",
          "answer": "Да. Все калькуляторы адаптированы для мобильных устройств, с удобными кнопками ввода и оптимизированным интерфейсом."
        },
        {
          "question": "Заменяют ли результаты консультацию специалиста?",
          "answer": "Нет. Результаты носят справочно-образовательный характер. Для принятия важных финансовых, медицинских или юридических решений проконсультируйтесь с профильным специалистом."
        },
        {
          "question": "Как сохранить или распечатать расчет?",
          "answer": "В каждом калькуляторе есть кнопка для формирования аккуратного PDF-документа или быстрой отправки таблицы на печать."
        }
      ]
    },
    "footer": {
      "brandDesc": "Быстрые, прозрачные и конфиденциальные онлайн-калькуляторы с прямым вычислением в браузере по открытым формулам.",
      "cloudflareVerified": "Проверено на Cloudflare Edge",
      "financeTitle": "Финансы и кредиты",
      "healthTitle": "Здоровье и фитнес",
      "mathTitle": "Математика и наука",
      "everydayTitle": "Бытовые расчеты",
      "globalTitle": "Международные выпуски",
      "guides": "Руководства",
      "about": "О проекте",
      "contact": "Контакты",
      "terms": "Условия использования",
      "privacy": "Политика конфиденциальности",
      "rights": "Все права защищены."
    }
  }
};

export function getHomepageStrings(locale: string = 'en'): HomepageStrings {
  const norm = (locale || 'en').toLowerCase() as SupportedLocale;
  return HOMEPAGE_TRANSLATIONS[norm] || HOMEPAGE_TRANSLATIONS.en;
}
