// src/i18n/ui.ts

export const languages = {
  en: { code: 'en', label: 'English', short: 'EN', dir: 'ltr', flag: '🇺🇸', name: 'English' },
  es: { code: 'es', label: 'Español', short: 'ES', dir: 'ltr', flag: '🇪🇸', name: 'Spanish' },
  fr: { code: 'fr', label: 'Français', short: 'FR', dir: 'ltr', flag: '🇫🇷', name: 'French' },
  hi: { code: 'hi', label: 'हिन्दी', short: 'HI', dir: 'ltr', flag: '🇮🇳', name: 'Hindi' },
  de: { code: 'de', label: 'Deutsch', short: 'DE', dir: 'ltr', flag: '🇩🇪', name: 'German' },
  ar: { code: 'ar', label: 'العربية', short: 'AR', dir: 'rtl', flag: '🇸🇦', name: 'Arabic' }, // RTL Enabled
  nl: { code: 'nl', label: 'Nederlands', short: 'NL', dir: 'ltr', flag: '🇳🇱', name: 'Dutch' },
  pt: { code: 'pt', label: 'Português', short: 'PT', dir: 'ltr', flag: '🇵🇹', name: 'Portuguese' },
  it: { code: 'it', label: 'Italiano', short: 'IT', dir: 'ltr', flag: '🇮🇹', name: 'Italian' },
  ru: { code: 'ru', label: 'Русский', short: 'RU', dir: 'ltr', flag: '🇷🇺', name: 'Russian' },
  ja: { code: 'ja', label: '日本語', short: 'JA', dir: 'ltr', flag: '🇯🇵', name: 'Japanese' },
  zh: { code: 'zh', label: '中文', short: 'ZH', dir: 'ltr', flag: '🇨🇳', name: 'Chinese' },
} as const;

export type SupportedLanguage = keyof typeof languages;
export const defaultLang: SupportedLanguage = 'en';

export const ui = {
  en: {
    'nav.finance': 'Finance', 'nav.health': 'Health', 'nav.math': 'Math', 'nav.everyday': 'Everyday', 'nav.guides': 'Guides',
    'action.calculate': 'Calculate', 'action.share': 'Share Result', 'action.copied': 'Link Copied!',
    'action.history': 'Recent History (Private)', 'action.clear_history': 'Clear', 'action.no_history': 'No history yet.',
    'label.advertisement': 'Advertisement', 'label.formula': 'Formula', 'label.example': 'Step-by-Step Example',
    'label.faq': 'FAQ', 'label.presets': 'Presets:', 'label.notation': 'Notation:', 'label.unit_system': 'Units:',
    'unit.metric': 'Metric (kg, cm)', 'unit.imperial': 'Imperial (lbs, ft)',
    'footer.disclaimer': 'Calculations are for educational purposes only and do not constitute professional financial or medical advice.',
    'footer.rights': 'All rights reserved.',
  },
  hi: {
    'nav.finance': 'वित्त', 'nav.health': 'स्वास्थ्य', 'nav.math': 'गणित', 'nav.everyday': 'दैनिक', 'nav.guides': 'गाइड',
    'action.calculate': 'गणना करें', 'action.share': 'शेयर करें', 'action.copied': 'लिंक कॉपी हो गया!',
    'action.history': 'हालिया इतिहास (निजी)', 'action.clear_history': 'मिटाएं', 'action.no_history': 'अभी तक कोई इतिहास नहीं।',
    'label.advertisement': 'विज्ञापन', 'label.formula': 'सूत्र', 'label.example': 'चरण-दर-चरण उदाहरण',
    'label.faq': 'अक्सर पूछे जाने वाले प्रश्न', 'label.presets': 'त्वरित विकल्प:', 'label.notation': 'संख्या प्रारूप:', 'label.unit_system': 'इकाई:',
    'unit.metric': 'मीट्रिक (किग्रा, सेमी)', 'unit.imperial': 'इंपीरियल (पाउंड, फीट)',
    'footer.disclaimer': 'गणनाएं केवल शैक्षणिक उद्देश्यों के लिए हैं और पेशेवर वित्तीय या चिकित्सा सलाह नहीं हैं।',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
  },
  es: {
    'nav.finance': 'Finanzas', 'nav.health': 'Salud', 'nav.math': 'Matemáticas', 'nav.everyday': 'Cotidiano', 'nav.guides': 'Guías',
    'action.calculate': 'Calcular', 'action.share': 'Compartir', 'action.copied': '¡Enlace Copiado!',
    'action.history': 'Historial (Privado)', 'action.clear_history': 'Borrar', 'action.no_history': 'Sin historial aún.',
    'label.advertisement': 'Publicidad', 'label.formula': 'Fórmula', 'label.example': 'Ejemplo Paso a Paso',
    'label.faq': 'Preguntas Frecuentes', 'label.presets': 'Preajustes:', 'label.notation': 'Notación:', 'label.unit_system': 'Unidades:',
    'unit.metric': 'Métrico (kg, cm)', 'unit.imperial': 'Imperial (lbs, ft)',
    'footer.disclaimer': 'Todos los cálculos proporcionados por Free Accurate Calculator tienen fines educativos, informativos y de planificación general únicamente.',
    'footer.rights': 'Todos los derechos reservados.',
  },
  fr: {
    'nav.finance': 'Finance', 'nav.health': 'Santé', 'nav.math': 'Mathématiques', 'nav.everyday': 'Quotidien', 'nav.guides': 'Guides',
    'action.calculate': 'Calculer', 'action.share': 'Partager', 'action.copied': 'Lien Copié !',
    'action.history': 'Historique (Privé)', 'action.clear_history': 'Effacer', 'action.no_history': 'Aucun historique.',
    'label.advertisement': 'Publicité', 'label.formula': 'Formule', 'label.example': 'Exemple Étape par Étape',
    'label.faq': 'FAQ', 'label.presets': 'Préréglages :', 'label.notation': 'Notation :', 'label.unit_system': 'Unités :',
    'unit.metric': 'Métrique (kg, cm)', 'unit.imperial': 'Impérial (lbs, ft)',
    'footer.disclaimer': 'Tous les calculs sont uniquement destinés à des fins éducatives et ne constituent pas des conseils financiers ou médicaux.',
    'footer.rights': 'Tous droits réservés.',
  },
  de: {
    'nav.finance': 'Finanzen', 'nav.health': 'Gesundheit', 'nav.math': 'Mathematik', 'nav.everyday': 'Alltag', 'nav.guides': 'Ratgeber',
    'action.calculate': 'Berechnen', 'action.share': 'Ergebnis teilen', 'action.copied': 'Link kopiert!',
    'action.history': 'Verlauf (Lokal & Privat)', 'action.clear_history': 'Löschen', 'action.no_history': 'Noch kein Verlauf.',
    'label.advertisement': 'Werbung', 'label.formula': 'Formel', 'label.example': 'Schritt-für-Schritt Beispiel',
    'label.faq': 'Häufig gestellte Fragen', 'label.presets': 'Voreinstellungen:', 'label.notation': 'Zahlenformat:', 'label.unit_system': 'Einheiten:',
    'unit.metric': 'Metrisch (kg, cm)', 'unit.imperial': 'Imperial (lbs, ft)',
    'footer.disclaimer': 'Alle Berechnungen dienen ausschließlich Bildungszwecken und stellen keine formelle Beratung dar.',
    'footer.rights': 'Alle Rechte vorbehalten.',
  },
  ar: {
    'nav.finance': 'تمويل', 'nav.health': 'صحة', 'nav.math': 'رياضيات', 'nav.everyday': 'يومي', 'nav.guides': 'أدلة',
    'action.calculate': 'حساب', 'action.share': 'مشاركة النتيجة', 'action.copied': 'تم نسخ الرابط!',
    'action.history': 'سجل الحسابات (خاص)', 'action.clear_history': 'مسح', 'action.no_history': 'لا يوجد سجل بعد.',
    'label.advertisement': 'إعلان', 'label.formula': 'القاعدة الرياضية', 'label.example': 'مثال توضيحي',
    'label.faq': 'الأسئلة الشائعة', 'label.presets': 'خيارات سريعة:', 'label.notation': 'تنسيق الأرقام:', 'label.unit_system': 'نظام الوحدات:',
    'unit.metric': 'متري (كجم، سم)', 'unit.imperial': 'إمبراطوري (رطل، قدم)',
    'footer.disclaimer': 'جميع الحسابات لأغراض تعليمية وإعلامية وتخطيط عام فقط ولا تشكل مشورة مهنية.',
    'footer.rights': 'جميع الحقوق محفوظة.',
  },
  nl: {
    'nav.finance': 'Financiën', 'nav.health': 'Gezondheid', 'nav.math': 'Wiskunde', 'nav.everyday': 'Dagelijks', 'nav.guides': 'Gidsen',
    'action.calculate': 'Berekenen', 'action.share': 'Resultaat delen', 'action.copied': 'Link gekopieerd!',
    'action.history': 'Geschiedenis (Privé)', 'action.clear_history': 'Wissen', 'action.no_history': 'Nog geen geschiedenis.',
    'label.advertisement': 'Advertentie', 'label.formula': 'Formule', 'label.example': 'Stapsgewijs Voorbeeld',
    'label.faq': 'Veelgestelde Vragen', 'label.presets': 'Voorinstellingen:', 'label.notation': 'Notatie:', 'label.unit_system': 'Eenheden:',
    'unit.metric': 'Metrisch (kg, cm)', 'unit.imperial': 'Imperiaal (lbs, ft)',
    'footer.disclaimer': 'Alle berekeningen zijn uitsluitend bedoeld voor educatieve doeleinden en vormen geen formeel advies.',
    'footer.rights': 'Alle rechten voorbehouden.',
  },
  pt: {
    'nav.finance': 'Finanças', 'nav.health': 'Saúde', 'nav.math': 'Matemática', 'nav.everyday': 'Cotidiano', 'nav.guides': 'Guias',
    'action.calculate': 'Calcular', 'action.share': 'Compartilhar', 'action.copied': 'Link Copiado!',
    'action.history': 'Histórico Recente (Privado)', 'action.clear_history': 'Limpar', 'action.no_history': 'Sem histórico ainda.',
    'label.advertisement': 'Publicidade', 'label.formula': 'Fórmula', 'label.example': 'Exemplo Passo a Passo',
    'label.faq': 'Perguntas Frequentes', 'label.presets': 'Predefinições:', 'label.notation': 'Notação:', 'label.unit_system': 'Unidades:',
    'unit.metric': 'Métrico (kg, cm)', 'unit.imperial': 'Imperial (lbs, ft)',
    'footer.disclaimer': 'Todos os cálculos são apenas para fins educacionais e não constituem aconselhamento profissional.',
    'footer.rights': 'Todos os direitos reservados.',
  },
  it: {
    'nav.finance': 'Finanza', 'nav.health': 'Salute', 'nav.math': 'Matematica', 'nav.everyday': 'Quotidiano', 'nav.guides': 'Guide',
    'action.calculate': 'Calcola', 'action.share': 'Condividi', 'action.copied': 'Link Copiato!',
    'action.history': 'Cronologia (Privata)', 'action.clear_history': 'Cancella', 'action.no_history': 'Nessuna cronologia.',
    'label.advertisement': 'Pubblicità', 'label.formula': 'Formula', 'label.example': 'Esempio Passo dopo Passo',
    'label.faq': 'Domande Frequenti', 'label.presets': 'Preimpostazioni:', 'label.notation': 'Notazione:', 'label.unit_system': 'Unità:',
    'unit.metric': 'Metrico (kg, cm)', 'unit.imperial': 'Imperiale (lbs, ft)',
    'footer.disclaimer': 'Tutti i calcoli sono intesi esclusivamente a scopo didattico e non costituiscono consulenza professionale.',
    'footer.rights': 'Tutti i diritti riservati.',
  },
  ru: {
    'nav.finance': 'Финансы', 'nav.health': 'Здоровье', 'nav.math': 'Математика', 'nav.everyday': 'Повседневные', 'nav.guides': 'Руководства',
    'action.calculate': 'Рассчитать', 'action.share': 'Поделиться', 'action.copied': 'Ссылка скопирована!',
    'action.history': 'История расчетов (Приватно)', 'action.clear_history': 'Очистить', 'action.no_history': 'Истории пока нет.',
    'label.advertisement': 'Реклама', 'label.formula': 'Формула', 'label.example': 'Пошаговый пример',
    'label.faq': 'Частые вопросы (FAQ)', 'label.presets': 'Шаблоны:', 'label.notation': 'Формат чисел:', 'label.unit_system': 'Единицы:',
    'unit.metric': 'Метрические (кг, см)', 'unit.imperial': 'Имперские (фунты, футы)',
    'footer.disclaimer': 'Все расчеты предназначены только для образовательных целей и не являются профессиональной консультацией.',
    'footer.rights': 'Все права защищены.',
  },
  ja: {
    'nav.finance': '金融・投資', 'nav.health': '健康・医療', 'nav.math': '数学・計算', 'nav.everyday': '日常・生活', 'nav.guides': 'ガイド',
    'action.calculate': '計算する', 'action.share': '結果を共有', 'action.copied': 'リンクをコピーしました！',
    'action.history': '履歴（端末保存・非公開）', 'action.clear_history': '削除', 'action.no_history': '計算履歴はありません。',
    'label.advertisement': '広告', 'label.formula': '計算式・計算根拠', 'label.example': '計算例・ステップ解説',
    'label.faq': 'よくある質問', 'label.presets': 'プリセット:', 'label.notation': '数値表記:', 'label.unit_system': '単位系:',
    'unit.metric': 'メートル法 (kg, cm)', 'unit.imperial': 'ヤード・ポンド法 (lbs, ft)',
    'footer.disclaimer': 'すべての計算結果は教育および参考情報提供のみを目的としており、専門的な助言ではありません。',
    'footer.rights': '無断転載を禁じます。',
  },
  zh: {
    'nav.finance': '财务金融', 'nav.health': '健康医疗', 'nav.math': '数学计算', 'nav.everyday': '日常生活', 'nav.guides': '使用指南',
    'action.calculate': '立即计算', 'action.share': '分享结果', 'action.copied': '链接已复制！',
    'action.history': '计算历史（本地私密）', 'action.clear_history': '清除', 'action.no_history': '暂无计算历史。',
    'label.advertisement': '广告', 'label.formula': '计算公式', 'label.example': '逐步演算示例',
    'label.faq': '常见问题', 'label.presets': '快速预设:', 'label.notation': '数字格式:', 'label.unit_system': '单位制:',
    'unit.metric': '公制 (kg, cm)', 'unit.imperial': '英制 (lbs, ft)',
    'footer.disclaimer': '所有计算结果仅用于教育与规划参考，不构成专业财务或医疗建议。',
    'footer.rights': '版权所有。',
  },
} as const;

/**
 * Universal hook for obtaining a translation function for a given locale.
 * Fallback chain: Target Language Key -> English Key -> Raw Key string.
 */
export function useTranslations(lang: string = defaultLang) {
  const active = (lang in ui ? lang : defaultLang) as SupportedLanguage;
  const activeDict = (ui[active] || ui[defaultLang]) as Record<string, string>;
  const fallbackDict = ui[defaultLang] as Record<string, string>;

  return function t(key: keyof (typeof ui)[typeof defaultLang] | string): string {
    return activeDict[key as string] || fallbackDict[key as string] || (key as string);
  };
}
