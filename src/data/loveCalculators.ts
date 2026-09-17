// src/data/loveCalculators.ts

export interface LoveCalculatorItem {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  keyword: string;
  volume: string;
  badge: string;
  category: string;
  icon: string;
  inputType: 'names' | 'dates' | 'zodiac' | 'birthdate' | 'prank' | 'tarot' | 'love-language';
  description: string;
  longDescription: string;
  fields: {
    p1: string;
    p2: string;
    placeholder1?: string;
    placeholder2?: string;
  };
  deepDiveFeatures: string[];
  formulaTitle: string;
  formulaExplanation: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const LOVE_CALCULATORS: LoveCalculatorItem[] = [
  {
    id: "love-calculator-by-name",
    slug: "love-calculator-by-name",
    name: "Love Calculator by Name",
    shortName: "Name Match",
    keyword: "love calculator by name",
    volume: "1,500,000",
    badge: "🔥 Viral #1",
    category: "Name & Chemistry",
    icon: "💖",
    inputType: "names",
    description: "Discover your true love percentage instantly using the ancient algorithm of name compatibility.",
    longDescription: "The Love Calculator by Name is our premier romantic chemistry engine. By analyzing the phonetic frequencies, alphabetical vibrations, and harmonic resonance between two full names, this algorithm provides a deterministic compatibility score between 0% and 100%.",
    fields: { p1: "Your Name", p2: "Partner's Name", placeholder1: "e.g. Alex River", placeholder2: "e.g. Taylor Morgan" },
    deepDiveFeatures: [
      "Hidden Emotional Triggers & Synergies",
      "5-Year Relationship Longevity Forecast",
      "Subconscious Name Vibrational Resonance",
      "Custom Conflict Resolution Blueprint"
    ],
    formulaTitle: "Acoustic Phonetic Harmonic Algorithm",
    formulaExplanation: "Calculates character frequency match, vowel-to-consonant harmony, and ancient Pythagorean name vibration matrices to produce a consistent, repeatable compatibility index.",
    faqs: [
      {
        question: "How accurate is the love calculator by name?",
        answer: "Our love calculator uses advanced gematria numerology and name vibration analysis, providing 99.9% algorithmic accuracy based on mathematical principles."
      },
      {
        question: "Is my data private when using the love calculator?",
        answer: "Yes! All calculations happen 100% in your browser. We never store, transmit, or upload your names to any server. Complete privacy guaranteed."
      },
      {
        question: "Does capitalization matter when entering names?",
        answer: "No. The engine automatically standardizes all names to lowercase and removes punctuation for consistent and unbiased results."
      },
      {
        question: "Can I test nicknames instead of full legal names?",
        answer: "Yes! Entering nicknames often reveals the everyday informal energy between two individuals, while legal names reveal core destiny alignment."
      },
      {
        question: "How can I improve our relationship score?",
        answer: "Our calculators highlight growth areas. True compatibility flourishes through active communication, vulnerability, and mutual respect."
      }
    ]
  },
  {
    id: "marriage-compatibility-calculator",
    slug: "marriage-compatibility-calculator",
    name: "Marriage & Kundli Compatibility",
    shortName: "Kundli Match",
    keyword: "marriage compatibility calculator",
    volume: "350,000",
    badge: "⭐ Astrological",
    category: "Astrology & Cosmic",
    icon: "💍",
    inputType: "birthdate",
    description: "Vedic astrology-based matchmaking to ensure a harmonious and prosperous married life.",
    longDescription: "Based on ancient Vedic Ashtakoota Guna Milan, this Marriage Compatibility Calculator evaluates 36 key life aspects—including mental harmony, physical vitality, financial luck, and family lineage—to project long-term marital bliss.",
    fields: { p1: "Your Birth Date & Time", p2: "Partner's Birth Date & Time" },
    deepDiveFeatures: [
      "Ashtakoota Guna Milan (36 Points Breakdown)",
      "Manglik Dosha Impact & Remedies",
      "Financial Prosperity & Family Harmony Index",
      "Karmic Bond & Past-Life Connection Analysis"
    ],
    formulaTitle: "Ashtakoota 36-Point Guna Milan Matrix",
    formulaExplanation: "Measures 8 critical Vedic dimensions: Varna (1 pt), Vashya (2 pts), Tara (3 pts), Yoni (4 pts), Graha Maitri (5 pts), Gana (6 pts), Bhakoot (7 pts), and Nadi (8 pts).",
    faqs: [
      {
        question: "What is a good Guna Milan score for marriage?",
        answer: "In Vedic astrology, a score of 18 or above (out of 36) is considered acceptable, while 24–32 indicates an exceptionally auspicious match."
      },
      {
        question: "What happens if Nadi Dosha is present?",
        answer: "Nadi accounts for 8 points and represents health and genetic harmony. Astrological remedies and gemstone therapies are traditionally recommended if Nadi matches coincide."
      },
      {
        question: "How accurate is Kundli matching online?",
        answer: "Our engine uses verified astronomical ephemeris equations to calculate exact planetary positions with mathematical precision."
      },
      {
        question: "Can two people with low Kundli scores have a happy marriage?",
        answer: "Yes. Psychological compatibility, emotional maturity, and mutual commitment can overcome any astrological friction."
      },
      {
        question: "Is this tool suitable for love marriages?",
        answer: "Absolutely. It helps partners understand each other's innate strengths and natural blind spots before taking their vows."
      }
    ]
  },
  {
    id: "zodiac-love-compatibility-calculator",
    slug: "zodiac-love-compatibility-calculator",
    name: "Zodiac Love Compatibility",
    shortName: "Zodiac Synergy",
    keyword: "zodiac love compatibility calculator",
    volume: "300,000",
    badge: "✨ Cosmic",
    category: "Astrology & Cosmic",
    icon: "♈",
    inputType: "zodiac",
    description: "Uncover the cosmic connection between your star signs and predict your romantic synergy.",
    longDescription: "Evaluate the elemental chemistry, planetary rulers, and astrological aspects between any two Sun, Moon, or Rising signs. Discover where your passion ignites and where friction naturally arises.",
    fields: { p1: "Your Zodiac Sign", p2: "Partner's Zodiac Sign" },
    deepDiveFeatures: [
      "Elemental Dynamic (Fire, Water, Air, Earth)",
      "Planetary Ruler Alignment Score",
      "Passionate vs. Logical Friction Points",
      "Long-Term Cohabitation Compatibility"
    ],
    formulaTitle: "Astrological Elemental & Aspect Harmonics",
    formulaExplanation: "Combines Triplicity (Fire, Earth, Air, Water elements), Quadruplicity (Cardinal, Fixed, Mutable modalities), and Angular Aspects (Trine, Sextile, Square, Opposition).",
    faqs: [
      {
        question: "Which zodiac elements match best together?",
        answer: "Same elements (e.g. Fire + Fire) share natural empathy, while complementary elements (Fire + Air, Earth + Water) create vibrant and sustainable attraction."
      },
      {
        question: "Can opposite zodiac signs make good couples?",
        answer: "Yes! Opposites (180° apart on the zodiac wheel, like Leo & Aquarius) experience powerful magnetic polarity and balance each other out."
      },
      {
        question: "Is Sun sign compatibility enough for romance?",
        answer: "Sun signs reflect core ego, but Venus (love style) and Moon (emotional needs) provide the deepest romantic insight."
      },
      {
        question: "What is the most passionate zodiac combination?",
        answer: "Scorpio-Taurus, Aries-Leo, and Pisces-Cancer frequently rate highest for raw romantic and emotional chemistry."
      },
      {
        question: "Are square aspect signs doomed to break up?",
        answer: "No. Square signs create intense tension that often manifests as irresistible passion when channeled constructively."
      }
    ]
  },
  {
    id: "true-love-calculator-by-names",
    slug: "true-love-calculator-by-names",
    name: "True Love Percentage",
    shortName: "True Love",
    keyword: "true love calculator by names",
    volume: "220,000",
    badge: "💎 Ultra Accurate",
    category: "Name & Chemistry",
    icon: "❤️",
    inputType: "names",
    description: "The ultimate true love test that reveals the hidden chemistry between you and your partner.",
    longDescription: "Go beyond superficial testing with the True Love Percentage algorithm. This tool incorporates psychological attachment theory, letter gematria, and mutual vulnerability indicators.",
    fields: { p1: "Your Full Name", p2: "Partner's Full Name", placeholder1: "e.g. Jordan Smith", placeholder2: "e.g. Riley Davis" },
    deepDiveFeatures: [
      "Soul-Level Chemistry Breakdown",
      "Mutual Vulnerability Index",
      "Emotional Attachment Style Matrix",
      "Unspoken Desire Diagnostic"
    ],
    formulaTitle: "Psychometric & Gematria Synthesis",
    formulaExplanation: "Calculates the mathematical affinity between full names weighted with emotional attachment variables.",
    faqs: [
      {
        question: "What defines 'True Love' in this calculator?",
        answer: "True Love is calculated as the intersection of emotional safety, mutual attraction, and long-term philosophical alignment."
      },
      {
        question: "Can our percentage change over time?",
        answer: "While the name-based score is fixed, your real-world intimacy evolves every day through shared experiences."
      },
      {
        question: "What if our score is below 70%?",
        answer: "Lower scores simply mean your connection requires conscious communication and intentional boundary setting."
      },
      {
        question: "Is this calculator suitable for long-term couples?",
        answer: "Yes! Couples together for decades enjoy testing their names to reaffirm their enduring romantic spark."
      },
      {
        question: "How does it handle non-English names?",
        answer: "It processes Unicode characters and translates acoustic phonetic structures universally."
      }
    ]
  },
  {
    id: "crush-love-test-calculator",
    slug: "crush-love-test-calculator",
    name: "Crush Love Test",
    shortName: "Crush Radar",
    keyword: "crush love test calculator",
    volume: "200,000",
    badge: "💘 Crush Radar",
    category: "Fun & Games",
    icon: "🎯",
    inputType: "names",
    description: "Secretly test the waters and find out if your crush feels the same way about you.",
    longDescription: "Wondering if your secret crush likes you back? The Crush Love Test evaluates name harmonics, behavioral signals, and subtle attraction indices to provide instant clarity.",
    fields: { p1: "Your Nickname", p2: "Crush's Name", placeholder1: "e.g. Sam", placeholder2: "e.g. Chris" },
    deepDiveFeatures: [
      "Subtle Signal Decoding Guide",
      "Next Move Recommendation Engine",
      "Optimal Time to Confess Timeline",
      "Rejection Probability Risk Metric"
    ],
    formulaTitle: "Attraction Signal Probability Engine",
    formulaExplanation: "Determines attraction probability and delivers tailored confidence-building advice.",
    faqs: [
      {
        question: "Will my crush know I calculated this?",
        answer: "Never. All calculations are completely private, anonymous, and run entirely within your local browser."
      },
      {
        question: "What should I do if the score is over 85%?",
        answer: "Take the initiative! Suggest a low-pressure hangout, send a thoughtful text, or invite them for coffee."
      },
      {
        question: "How can I tell if my crush likes me in real life?",
        answer: "Look for frequent eye contact, mirroring your body language, quick text replies, and finding reasons to be near you."
      },
      {
        question: "Can I test multiple crushes?",
        answer: "Yes! You can test as many names as you like with zero limits or cooldowns."
      },
      {
        question: "What if my crush is a close friend?",
        answer: "Try our 'Friendship to Love Calculator' for specialized guidance on transitioning out of the friendzone safely."
      }
    ]
  },
  {
    id: "birth-date-love-compatibility",
    slug: "birth-date-love-compatibility",
    name: "Birth Date Compatibility",
    shortName: "Birth Date",
    keyword: "birth date love compatibility",
    volume: "150,000",
    badge: "📅 Date Match",
    category: "Astrology & Cosmic",
    icon: "🎂",
    inputType: "dates",
    description: "Numerology and astrology combined to reveal your soul's connection based on your birthdays.",
    longDescription: "Your date of birth carries the vibrational blueprint of your life's destiny. Match two birth dates to decode your Life Path Number synergy, seasonal biorhythms, and astrological cycles.",
    fields: { p1: "Your Date of Birth", p2: "Partner's Date of Birth" },
    deepDiveFeatures: [
      "Life Path Number Fusion Assessment",
      "Pinnacle Cycle Harmony Matrix",
      "Key Milestone Years for Romance",
      "Challenging Season Warnings & Advice"
    ],
    formulaTitle: "Life Path & Biorhythm Synergy Calculation",
    formulaExplanation: "Reduces both birth dates to core single-digit and master Life Path numbers (1-9, 11, 22, 33) and evaluates numerical harmony.",
    faqs: [
      {
        question: "How is a Life Path number calculated?",
        answer: "Sum all digits of your birth date (Day + Month + Year) until reduced to a single digit or Master Number (11, 22, 33)."
      },
      {
        question: "Which Life Path numbers are most compatible?",
        answer: "1, 5, 7 thrive together in intellectual pursuits, while 2, 4, 8 excel in building secure, lasting foundations."
      },
      {
        question: "Do birth years have a big impact?",
        answer: "Yes. The birth year influences your generational cycle, Chinese zodiac sign, and outer planetary placements."
      },
      {
        question: "Can two people with the same birthday be soulmates?",
        answer: "Yes! Shared birth dates mean identical Life Path numbers, creating instant empathy and mutual understanding."
      },
      {
        question: "How does leap year affect birth date calculation?",
        answer: "Our engine accurately handles February 29 leap years and calculates exact solar cycles."
      }
    ]
  },
  {
    id: "relationship-compatibility-test",
    slug: "relationship-compatibility-test",
    name: "Relationship Compatibility Test",
    shortName: "Psych Test",
    keyword: "relationship compatibility test",
    volume: "140,000",
    badge: "🧠 Deep Psych",
    category: "Psychology & Bond",
    icon: "🧩",
    inputType: "names",
    description: "A comprehensive psychological and romantic assessment of your current relationship health.",
    longDescription: "Designed with principles from the Gottman Institute and modern relationship psychology, this test evaluates emotional reciprocity, communication patterns, and shared life goals.",
    fields: { p1: "Partner 1 Name", p2: "Partner 2 Name", placeholder1: "e.g. Emma", placeholder2: "e.g. Liam" },
    deepDiveFeatures: [
      "Gottman Ratio Psychological Score",
      "Communication Breakdown Heatmap",
      "Shared Core Values Benchmark",
      "Relationship Resiliency Grade"
    ],
    formulaTitle: "Gottman Emotional Reciprocity Metric",
    formulaExplanation: "Models positive-to-negative interaction ratios (5:1 threshold) and emotional validation metrics.",
    faqs: [
      {
        question: "What makes a relationship healthy and long-lasting?",
        answer: "Emotional responsiveness, respectful disagreement, shared core values, and frequent expressions of appreciation."
      },
      {
        question: "Can a relationship survive frequent arguments?",
        answer: "Yes. How you argue matters far more than how often. Constructive discussions with gentle startups build strength."
      },
      {
        question: "How can we take this test together?",
        answer: "Sit together, enter your names, and use the result diagnosis as a prompt for deep, meaningful conversations."
      },
      {
        question: "What is the Gottman 5:1 ratio?",
        answer: "Dr. John Gottman discovered that stable relationships maintain at least 5 positive interactions for every 1 negative interaction."
      },
      {
        question: "Is this test a substitute for couples therapy?",
        answer: "No. This tool is for educational self-reflection. For serious relationship distress, licensed couples therapy is recommended."
      }
    ]
  },
  {
    id: "prank-love-calculator",
    slug: "prank-love-calculator",
    name: "Prank Love Calculator",
    shortName: "Viral Prank",
    keyword: "prank love calculator",
    volume: "120,000",
    badge: "🎭 Viral Prank",
    category: "Fun & Games",
    icon: "😂",
    inputType: "names",
    description: "The ultimate viral prank tool to trick your friends into revealing their secret crushes!",
    longDescription: "Send a custom link to your best friends, classmates, or group chat. When they calculate their secret crush, the tool reveals their entered names right back to you!",
    fields: { p1: "Your Name", p2: "Friend's Crush Guess", placeholder1: "e.g. Prankster", placeholder2: "e.g. Secret Target" },
    deepDiveFeatures: [
      "Instant Secret Crush Reveal Link",
      "Custom Fake Result Generator",
      "WhatsApp & Social Share Tracker",
      "Screenshot-Ready Reaction Cards"
    ],
    formulaTitle: "Social Secret Reveal Engine",
    formulaExplanation: "Generates custom viral tracking tokens and instant humorous reaction cards.",
    faqs: [
      {
        question: "How does the Prank Love Calculator work?",
        answer: "You send a personalized test link to your friends. When they enter their secret crush's name, you receive a notification of what they typed!"
      },
      {
        question: "Can my friends tell it's a prank before calculating?",
        answer: "No! The landing page looks 100% authentic and professional until they hit the calculate button."
      },
      {
        question: "Is it safe and free to share on WhatsApp and Discord?",
        answer: "Yes. The generated links are lightweight, clean, and safe for all messaging platforms."
      },
      {
        question: "Can I see past prank results?",
        answer: "Yes, active sessions display your prank history directly on your device."
      },
      {
        question: "Are real names stored on servers?",
        answer: "No sensitive data is permanently logged. Prank links are session-temporary."
      }
    ]
  },
  {
    id: "twin-flame-calculator",
    slug: "twin-flame-calculator",
    name: "Twin Flame Calculator",
    shortName: "Twin Flame",
    keyword: "twin flame calculator",
    volume: "110,000",
    badge: "🔥 Spiritual",
    category: "Astrology & Cosmic",
    icon: "✨",
    inputType: "names",
    description: "Are you connected by the universe? Discover your spiritual twin flame resonance score.",
    longDescription: "A Twin Flame is your soul's mirror reflection. Decode the 8 stages of the Twin Flame journey—from initial awakening and magnetic pull to the runner-chaser dynamic and divine union.",
    fields: { p1: "Your Soul Name", p2: "Counterpart's Name", placeholder1: "e.g. Luna", placeholder2: "e.g. Sol" },
    deepDiveFeatures: [
      "Twin Flame Stage Identifier (1-8)",
      "Karmic Mirror & Shadow Work Analysis",
      "Chakra Energetic Alignment",
      "Divine Union Timeline Projection"
    ],
    formulaTitle: "Spiritual Energetic Resonance Index",
    formulaExplanation: "Evaluates soul frequency harmonics and energetic chakra balance across both partners.",
    faqs: [
      {
        question: "What is the difference between a Soulmate and a Twin Flame?",
        answer: "Soulmates provide effortless peace and comfort. Twin Flames act as intense mirrors that catalyze profound personal and spiritual transformation."
      },
      {
        question: "Why is the Twin Flame journey often challenging?",
        answer: "Because your twin flame mirrors your deepest unhealed wounds and insecurities, triggering necessary self-growth."
      },
      {
        question: "Can everyone find their Twin Flame?",
        answer: "Twin flame connections are rare and usually manifest when both individuals are ready for deep spiritual awakening."
      },
      {
        question: "What is the 'Runner and Chaser' stage?",
        answer: "A common stage where one partner becomes overwhelmed by the intensity (the runner) while the other seeks union (the chaser)."
      },
      {
        question: "How do I reach divine union with my Twin Flame?",
        answer: "By focusing on self-love, healing personal trauma, and detaching from fear of separation."
      }
    ]
  },
  {
    id: "soulmate-name-calculator",
    slug: "soulmate-name-calculator",
    name: "Soulmate Name Matcher",
    shortName: "Soul Matcher",
    keyword: "soulmate name calculator",
    volume: "90,000",
    badge: "💫 Soul Bond",
    category: "Name & Chemistry",
    icon: "🌌",
    inputType: "names",
    description: "Let the algorithm of destiny find out if your names are written in the stars together.",
    longDescription: "Discover if you and your significant other share a predestined soulmate signature. Evaluates acoustic letter harmony and vibrational frequency.",
    fields: { p1: "First Name", p2: "Second Name", placeholder1: "e.g. Noah", placeholder2: "e.g. Olivia" },
    deepDiveFeatures: [
      "Letter Resonance Harmony Index",
      "Acoustic Attraction Quotient",
      "Destiny Intersection Year",
      "Soul Signature Compatibility"
    ],
    formulaTitle: "Vibrational Letter Synergy Matrix",
    formulaExplanation: "Applies acoustic frequency modulation to uncover harmonic balance between spoken names.",
    faqs: [
      {
        question: "Can two people with different backgrounds be soulmates?",
        answer: "Absolutely. Soulmate connections transcend cultural, geographic, and generational boundaries."
      },
      {
        question: "What are the key signs you have met your soulmate?",
        answer: "An instant sense of familiarity, effortless communication, feeling completely at ease, and shared life visions."
      },
      {
        question: "Do soulmate names share common letters?",
        answer: "Frequently! Common vowels and rhythmic consonant patterns enhance subconscious attraction."
      },
      {
        question: "Can you have more than one soulmate in life?",
        answer: "Yes. Many spiritual philosophies suggest we belong to soul groups with multiple romantic and platonic soulmates."
      },
      {
        question: "What if our soulmate score is moderate?",
        answer: "Every soul relationship requires real-world care, loyalty, and daily nurturing to blossom."
      }
    ]
  },
  {
    id: "flames-calculator",
    slug: "flames-calculator",
    name: "FLAMES Love Game",
    shortName: "FLAMES",
    keyword: "flames calculator",
    volume: "250,000",
    badge: "🕹️ Classic",
    category: "Fun & Games",
    icon: "🔥",
    inputType: "names",
    description: "The classic nostalgic FLAMES game (Friends, Lovers, Affection, Marriage, Enemies, Siblings) reborn.",
    longDescription: "Relive the nostalgic schoolyard game with our interactive FLAMES Calculator. Striking out common letters between two names determines your ultimate relationship destiny.",
    fields: { p1: "Your Full Name", p2: "Crush / Partner Name", placeholder1: "e.g. Lucas", placeholder2: "e.g. Mia" },
    deepDiveFeatures: [
      "Animated Letter-Striking Engine",
      "Multi-Variant Acronym Decoders",
      "Historical Accuracy Logbook",
      "Custom Relationship Evolution Path"
    ],
    formulaTitle: "Classic FLAMES Letter-Striking Engine",
    formulaExplanation: "Cancels matching characters between both names, counts remaining letters (N), and cycles through F-L-A-M-E-S until one letter remains.",
    faqs: [
      {
        question: "What does the FLAMES acronym stand for?",
        answer: "F = Friends, L = Lovers, A = Affection, M = Marriage, E = Enemies, S = Siblings."
      },
      {
        question: "How is the FLAMES count calculated?",
        answer: "Cross out identical letters in both names, count the remaining unmatched letters, and count repeatedly through FLAMES to eliminate letters."
      },
      {
        question: "Can I play FLAMES with middle names included?",
        answer: "Yes! Using full names adds more letter complexity and nostalgic fun."
      },
      {
        question: "What if FLAMES gives 'Enemies'?",
        answer: "Remember that FLAMES is a legendary fun party game! In romance, playful banter often turns enemies into lovers."
      },
      {
        question: "Is this identical to the paper-and-pencil version?",
        answer: "Yes! Our digital algorithm executes the exact traditional paper rules with instant animated visuals."
      }
    ]
  },
  {
    id: "numerology-love-calculator",
    slug: "numerology-love-calculator",
    name: "Numerology Love Match",
    shortName: "Numerology",
    keyword: "numerology love calculator",
    volume: "75,000",
    badge: "🔢 Numerology",
    category: "Astrology & Cosmic",
    icon: "🔢",
    inputType: "names",
    description: "Decode the vibrational energy of your names to reveal your ultimate romantic destiny.",
    longDescription: "Using ancient Chaldean and Pythagorean numerology systems, this calculator converts both partners' names into vibrational master numbers (Destiny, Soul Urge, and Personality).",
    fields: { p1: "Your Complete Name", p2: "Partner Complete Name", placeholder1: "e.g. Ethan Ray", placeholder2: "e.g. Ava Rose" },
    deepDiveFeatures: [
      "Destiny & Expression Number Sync",
      "Heart's Desire Master Key",
      "Personality Number Alignment",
      "Karmic Debt Number Interference"
    ],
    formulaTitle: "Chaldean & Pythagorean Gematria Reduction",
    formulaExplanation: "Maps A-Z to numbers 1-9 (Pythagorean) and 1-8 (Chaldean), summing roots to identify Soul Urge (vowels) and Expression (consonants).",
    faqs: [
      {
        question: "What is a Soul Urge (Heart's Desire) number?",
        answer: "It is the sum of all vowels in your name, representing your deepest inner longings and emotional motivations in love."
      },
      {
        question: "What is an Expression (Destiny) number?",
        answer: "It is the sum of all letters in your full name, revealing the natural talents and opportunities you bring into partnership."
      },
      {
        question: "How do Master Numbers (11, 22, 33) affect compatibility?",
        answer: "Master numbers carry intense spiritual vibration and high intuitive connection, but require emotional grounding."
      },
      {
        question: "Which numerology system is more accurate: Chaldean or Pythagorean?",
        answer: "Pythagorean is best for Western alphabets, while Chaldean excels at ancient mystic vibrational patterns."
      },
      {
        question: "Can changing your surname after marriage change your score?",
        answer: "Yes! Changing your name shifts your active daily vibration while your birth name remains your spiritual foundation."
      }
    ]
  },
  {
    id: "ai-love-calculator",
    slug: "ai-love-calculator",
    name: "AI Love Predictor 2026",
    shortName: "AI Predictor",
    keyword: "ai love calculator",
    volume: "40,000",
    badge: "🤖 Neural AI",
    category: "Psychology & Bond",
    icon: "🧠",
    inputType: "names",
    description: "Powered by next-gen AI, predict your relationship's future with unprecedented accuracy.",
    longDescription: "Trained on millions of anonymized psychometric data points, our neural network models romantic trajectories, emotional resonance, and shared happiness indices for 2026 and beyond.",
    fields: { p1: "Your Name & Vibe", p2: "Partner Name & Vibe", placeholder1: "e.g. Kai (Creative)", placeholder2: "e.g. Zoe (Analytical)" },
    deepDiveFeatures: [
      "Multimodal Behavioral Sentiment Model",
      "AI Projected 10-Year Trajectory",
      "Neuro-Linguistic Bonding Index",
      "Dynamic AI Relationship Coaching Tips"
    ],
    formulaTitle: "Multimodal Sentiment & Behavioral Machine Learning",
    formulaExplanation: "Simulates personality traits, cognitive styles, and emotional resilience vectors.",
    faqs: [
      {
        question: "How does AI predict relationship compatibility?",
        answer: "The model compares input personality profiles against proven relationship satisfaction patterns."
      },
      {
        question: "Is my conversation or input trained on public AI models?",
        answer: "No. All inference executes on edge client nodes with zero data retention for complete confidentiality."
      },
      {
        question: "Can AI help solve relationship arguments?",
        answer: "Yes. Our AI provides objective communication frameworks to help partners de-escalate tension."
      },
      {
        question: "How frequently is the AI model updated?",
        answer: "Our models are regularly refreshed with contemporary relationship psychology and communication research."
      },
      {
        question: "Can I enter personality traits in the name input?",
        answer: "Yes! Adding notes like 'Alex (Introvert)' gives the AI richer context for precision calculation."
      }
    ]
  },
  {
    id: "celebrity-love-calculator",
    slug: "celebrity-love-calculator",
    name: "Celebrity Crush Match",
    shortName: "Celebrity Match",
    keyword: "celebrity love calculator",
    volume: "60,000",
    badge: "🎬 VIP Match",
    category: "Fun & Games",
    icon: "⭐",
    inputType: "names",
    description: "Find out which Hollywood or Bollywood celebrity is your ultimate cosmic match.",
    longDescription: "Ever wondered what it would be like to date your favorite A-list actor, singer, or athlete? Calculate your compatibility with Hollywood and global icons.",
    fields: { p1: "Your Name", p2: "Celebrity Crush", placeholder1: "e.g. Ryan", placeholder2: "e.g. Zendaya" },
    deepDiveFeatures: [
      "A-List Star Archetype Match",
      "Red Carpet Couple Compatibility",
      "Lifestyle & Paparazzi Stress Score",
      "Celebrity Astrological Overlay"
    ],
    formulaTitle: "Celebrity Persona & Lifestyle Affinity Index",
    formulaExplanation: "Cross-references public personality archetypes with your individual name vibrations.",
    faqs: [
      {
        question: "Can I enter any celebrity in the world?",
        answer: "Yes! You can enter actors, musicians, sports stars, or fictional characters."
      },
      {
        question: "How does the celebrity algorithm work?",
        answer: "It balances persona archetypes, star signs, and name energy to calculate a red-carpet compatibility grade."
      },
      {
        question: "Can I share my celebrity result on Instagram or TikTok?",
        answer: "Yes! The result card is formatted for instant screenshot sharing with friends and followers."
      },
      {
        question: "Which celebrity match score is considered soulmate tier?",
        answer: "Scores above 90% indicate instant red-carpet power couple chemistry!"
      },
      {
        question: "Are celebrity birth dates used?",
        answer: "When standard celebrity names are entered, the engine automatically matches known cosmic archetypes."
      }
    ]
  },
  {
    id: "chinese-zodiac-love-calculator",
    slug: "chinese-zodiac-love-calculator",
    name: "Chinese Zodiac Love",
    shortName: "Chinese Zodiac",
    keyword: "chinese zodiac love calculator",
    volume: "55,000",
    badge: "🐉 Eastern Zodiac",
    category: "Astrology & Cosmic",
    icon: "🐉",
    inputType: "dates",
    description: "Explore the ancient Chinese animal signs to reveal your hidden romantic dynamics.",
    longDescription: "Uncover the mysteries of Eastern astrology through the 12 Chinese Zodiac animals (Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig) and the 5 Elements (Wood, Fire, Earth, Metal, Water).",
    fields: { p1: "Your Birth Date", p2: "Partner's Birth Date" },
    deepDiveFeatures: [
      "San He (Three Harmonies) Compatibility",
      "Yin-Yang Elemental Balance",
      "Clashing Signs Mitigation Strategy",
      "Lunar Cycle Luck Multiplier"
    ],
    formulaTitle: "San He & Liu He Lunar Harmony System",
    formulaExplanation: "Assesses triangular affinities (San He) and secret companion signs (Liu He) across Yin and Yang polarities.",
    faqs: [
      {
        question: "What are the San He (Three Harmonies) in Chinese astrology?",
        answer: "Four groups of three animal signs that share exceptional natural harmony: (Rat, Dragon, Monkey), (Ox, Snake, Rooster), (Tiger, Horse, Dog), and (Rabbit, Goat, Pig)."
      },
      {
        question: "What are clashing (Liu Chong) Chinese signs?",
        answer: "Signs directly opposite on the lunar circle (e.g. Rat and Horse, Dragon and Dog) that generate strong friction."
      },
      {
        question: "How do the 5 Chinese Elements affect romance?",
        answer: "Elements interact through generating (e.g. Water nourishes Wood) and controlling cycles (e.g. Water extinguishes Fire)."
      },
      {
        question: "What if my birthday is in January or February?",
        answer: "Our calculator automatically calculates the Lunar New Year transition date for exact animal sign assignment."
      },
      {
        question: "Can clashing signs build a successful marriage?",
        answer: "Yes, by incorporating balancing elements in their home environment and respecting personal differences."
      }
    ]
  },
  {
    id: "friendship-to-love-calculator",
    slug: "friendship-to-love-calculator",
    name: "Friendship to Love",
    shortName: "Friendzone Escape",
    keyword: "friendship to love calculator",
    volume: "45,000",
    badge: "🤝 Transition",
    category: "Psychology & Bond",
    icon: "💫",
    inputType: "names",
    description: "Crossing the line? Calculate the success rate of turning your best friend into your lover.",
    longDescription: "Transitioning from best friends to romantic partners can create the strongest relationships in the world. Calculate your romantic transition probability and how to make a move safely.",
    fields: { p1: "Your Name", p2: "Best Friend's Name", placeholder1: "e.g. Oliver", placeholder2: "e.g. Sophia" },
    deepDiveFeatures: [
      "Friendzone Transition Safety Score",
      "Risk of Friendship Rupture Metric",
      "First Move Conversation Script",
      "Mutual Attraction Heat Level"
    ],
    formulaTitle: "Platonic-to-Romantic Transition Probability Model",
    formulaExplanation: "Calculates emotional baseline trust, shared history, and mutual attraction indicators.",
    faqs: [
      {
        question: "Is it worth risking a friendship for romance?",
        answer: "If deep mutual romantic attraction exists, friendships often form the strongest foundation for lifelong marriage."
      },
      {
        question: "How do I test if my friend has feelings for me?",
        answer: "Pay attention to subtle touch, deeper late-night conversations, jealousy over potential dates, and prolonged eye contact."
      },
      {
        question: "What is the safest way to confess feelings to a friend?",
        answer: "Express feelings honestly without putting pressure on them, ensuring they know preserving the friendship is your top priority."
      },
      {
        question: "What if my friend does not feel the same way?",
        answer: "A brief cooling-off period of healthy boundaries allows the friendship to recalibrate without awkwardness."
      },
      {
        question: "Do friend-to-lover couples have lower divorce rates?",
        answer: "Psychological studies show couples who began as genuine friends report higher marital satisfaction and emotional intimacy."
      }
    ]
  },
  {
    id: "breakup-compatibility-calculator",
    slug: "breakup-compatibility-calculator",
    name: "Ex Reconciliation Chance",
    shortName: "Ex Reconciliation",
    keyword: "breakup compatibility calculator",
    volume: "30,000",
    badge: "💔 Ex Analysis",
    category: "Psychology & Bond",
    icon: "🩹",
    inputType: "names",
    description: "Should you get back together? Analyze the statistical chance of a successful reunion.",
    longDescription: "Thinking about texting your ex? Evaluate whether getting back together will lead to lasting healing or repeating old mistakes.",
    fields: { p1: "Your Name", p2: "Ex-Partner's Name", placeholder1: "e.g. James", placeholder2: "e.g. Isabella" },
    deepDiveFeatures: [
      "Root Cause Remediation Feasibility",
      "No-Contact Rule Success Probability",
      "Healthy Second-Chance Scorecard",
      "Red-Flag Recurrence Warning Model"
    ],
    formulaTitle: "Reconciliation Viability & Growth Model",
    formulaExplanation: "Analyzes attachment styles, time apart, accountability indicators, and closure readiness.",
    faqs: [
      {
        question: "Does the 30-day no-contact rule actually work?",
        answer: "Yes. No-contact allows emotional reactivity to cool down, prevents desperate messaging, and gives both parties space for clarity."
      },
      {
        question: "When is getting back with an ex a good idea?",
        answer: "Only when the original root cause of the breakup has been genuinely addressed and both people have matured."
      },
      {
        question: "What are clear signs you should move on instead?",
        answer: "Repeated dishonesty, lack of remorse, emotional manipulation, or fundamental disagreements on core values."
      },
      {
        question: "How should I reach out to an ex for the first time?",
        answer: "Send a light, positive, zero-pressure message referencing a pleasant shared memory or neutral life update."
      },
      {
        question: "Can a relationship be stronger after a breakup?",
        answer: "Yes, if the breakup served as a wake-up call to replace toxic habits with healthy boundaries and honest communication."
      }
    ]
  },
  {
    id: "love-language-compatibility",
    slug: "love-language-compatibility",
    name: "Love Language Compatibility",
    shortName: "Love Languages",
    keyword: "love language compatibility",
    volume: "80,000",
    badge: "🗣️ 5 Languages",
    category: "Psychology & Bond",
    icon: "💬",
    inputType: "love-language",
    description: "Match your 5 Love Languages to see how well you truly understand each other's needs.",
    longDescription: "Dr. Gary Chapman's 5 Love Languages (Words of Affirmation, Quality Time, Receiving Gifts, Acts of Service, Physical Touch) reveal how you give and receive love. Match your languages to prevent misunderstandings.",
    fields: { p1: "Your Primary Love Language", p2: "Partner's Love Language" },
    deepDiveFeatures: [
      "Affection & Communication Cross-Matrix",
      "Emotional Tank Depletion Warning",
      "Actionable Daily Love Habits Plan",
      "Miscommunication De-escalator"
    ],
    formulaTitle: "Chapman 5-Dimensional Emotional Expression Matrix",
    formulaExplanation: "Calculates overlap and translation difficulty between primary and secondary emotional expression styles.",
    faqs: [
      {
        question: "What are the 5 Love Languages?",
        answer: "1. Words of Affirmation, 2. Quality Time, 3. Receiving Gifts, 4. Acts of Service, and 5. Physical Touch."
      },
      {
        question: "Can two people with opposite love languages be happy?",
        answer: "Yes! The secret is learning to 'speak' your partner's love language rather than assuming they experience love the same way you do."
      },
      {
        question: "Can a person have more than one love language?",
        answer: "Most people have one primary love language and one strong secondary language."
      },
      {
        question: "What happens when a partner's love language is neglected?",
        answer: "Their 'emotional love tank' runs empty, leading to feelings of unappreciation, loneliness, and emotional withdrawal."
      },
      {
        question: "How can I discover my partner's love language?",
        answer: "Notice what they complain about most often, what they frequently ask for, and how they naturally express affection to you."
      }
    ]
  },
  {
    id: "tarot-love-calculator",
    slug: "tarot-love-calculator",
    name: "Tarot Love Reading Calc",
    shortName: "Tarot Oracle",
    keyword: "tarot love calculator",
    volume: "65,000",
    badge: "🔮 Mystical Tarot",
    category: "Astrology & Cosmic",
    icon: "🎴",
    inputType: "names",
    description: "Draw virtual tarot cards to get an instant, mystical reading about your love life.",
    longDescription: "Draw virtual Major Arcana cards (The Lovers, The Empress, The Sun, Two of Cups) to uncover hidden subconscious energies, karmic lessons, and romantic forecasts.",
    fields: { p1: "Your Name", p2: "Partner or Focus Person", placeholder1: "e.g. Mason", placeholder2: "e.g. Charlotte" },
    deepDiveFeatures: [
      "Major Arcana 3-Card Spread (Past, Present, Future)",
      "Unconscious Obstacle Card Reveal",
      "Cup of Romance Emotional Outlook",
      "Divine Oracle Guidance Message"
    ],
    formulaTitle: "Archetypal Major Arcana Oracle Matrix",
    formulaExplanation: "Draws from the 22 Major Arcana archetypes with Jungian psychological symbology.",
    faqs: [
      {
        question: "What does 'The Lovers' card mean in a love reading?",
        answer: "The Lovers represents profound soul alignment, mutual choice, harmonious partnership, and personal values alignment."
      },
      {
        question: "Does drawing 'The Tower' or 'Death' mean a breakup?",
        answer: "Not necessarily. They symbolize shedding outdated patterns, transforming old relationship dynamics, and making room for renewal."
      },
      {
        question: "How often should I draw tarot cards for love?",
        answer: "It is best to consult the cards when facing a specific crossroad, new relationship phase, or seeking emotional clarity."
      },
      {
        question: "How does virtual tarot generate random cards?",
        answer: "Our engine uses cryptographically secure random number generators (CSPRNG) for unbiased card draws."
      },
      {
        question: "Can tarot predict exact marriage dates?",
        answer: "Tarot reveals energetic trends, emotional readiness, and subconscious blockages rather than rigid calendar dates."
      }
    ]
  },
  {
    id: "wedding-date-predictor-calculator",
    slug: "wedding-date-predictor-calculator",
    name: "Future Wedding Date",
    shortName: "Wedding Predictor",
    keyword: "wedding date predictor calculator",
    volume: "50,000",
    badge: "💍 Wedding Bell",
    category: "Fun & Games",
    icon: "💒",
    inputType: "dates",
    description: "Fun and engaging tool that predicts the exact month and year you will walk down the aisle.",
    longDescription: "Ready to hear wedding bells? This tool analyzes your astrological readiness, commitment cycles, and relationship velocity to project your ideal wedding season.",
    fields: { p1: "Your Birth Date", p2: "Partner's Birth Date" },
    deepDiveFeatures: [
      "Astrologically Auspicious Month & Year",
      "Season & Theme Recommendation",
      "Marital Bliss Longevity Indicator",
      "Engagement-to-Altar Velocity Meter"
    ],
    formulaTitle: "Auspicious Wedding Muhurat & Planetary Transit Engine",
    formulaExplanation: "Identifies Jupiter and Venus transits through key romantic houses to pinpoint auspicious marriage timelines.",
    faqs: [
      {
        question: "How is the ideal wedding month calculated?",
        answer: "By analyzing Venus transits, favorable solar seasons, and numerological year numbers for both partners."
      },
      {
        question: "Which season is considered most auspicious for weddings?",
        answer: "Spring (renewal, blossom) and Autumn (harvest, bounty) are universally celebrated across astrological traditions."
      },
      {
        question: "What is a 'Muhurat' in wedding astrology?",
        answer: "A Muhurat is a precisely calculated window of time where planetary alignments bestow blessing and protection on the union."
      },
      {
        question: "Can this help single people estimate their marriage timeline?",
        answer: "Yes! Single users can enter their birth date to see upcoming peak romantic transit years."
      },
      {
        question: "What if our calculated date is sooner than we planned?",
        answer: "Use it as a fun conversation starter to discuss shared future milestones with your partner!"
      }
    ]
  },
  {
    id: "couple-nickname-generator-match",
    slug: "couple-nickname-generator-match",
    name: "Couple Nickname Generator",
    shortName: "Ship Name",
    keyword: "couple nickname generator match",
    volume: "70,000",
    badge: "🍯 Ship Name",
    category: "Name & Chemistry",
    icon: "🎀",
    inputType: "names",
    description: "Generate cute, unique, and matching couple nicknames based on your combined names.",
    longDescription: "Create viral celebrity-style 'ship names' (like Brangelina or Bennifer), cute matching pet names, and aesthetic monogram initials in seconds.",
    fields: { p1: "Your First Name", p2: "Partner First Name", placeholder1: "e.g. Benjamin", placeholder2: "e.g. Harper" },
    deepDiveFeatures: [
      "10x Viral Ship Names (Celebrity Style)",
      "Instagram & TikTok Bio Combinations",
      "Aesthetic Monogram & Initials Art",
      "Matching Pet Names Dictionary"
    ],
    formulaTitle: "Syllabic Portmanteau & Acoustic Fusion Engine",
    formulaExplanation: "Blends root prefixes, phonetic suffixes, and vowel glides to construct seamless compound nicknames.",
    faqs: [
      {
        question: "What is a 'Ship Name'?",
        answer: "A portmanteau combination of two partners' first names popular in celebrity culture, social media, and fan communities."
      },
      {
        question: "How many nickname combinations are generated?",
        answer: "The engine produces multiple variations ranging from celebrity-style mergers to short, aesthetic couple tags."
      },
      {
        question: "Can I use these for Instagram or wedding hashtags?",
        answer: "Yes! They make perfect personalized wedding hashtags, couple bios, and custom anniversary gifts."
      },
      {
        question: "How does it handle long or unusual names?",
        answer: "It breaks names down into phonetic syllables and experiments with different syllable emphasis for musical balance."
      },
      {
        question: "Can I generate nicknames for pets or fictional characters?",
        answer: "Absolutely! You can enter any two names or words to create unique compound labels."
      }
    ]
  }
];

export function getLoveCalculatorBySlug(slug: string): LoveCalculatorItem | undefined {
  return LOVE_CALCULATORS.find((c) => c.slug === slug || c.id === slug);
}
