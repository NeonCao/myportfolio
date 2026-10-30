import { useCallback } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { itemFinderContent } from '../../content/itemFinder';

function format(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (values[key] !== undefined ? String(values[key]) : match));
}

export function useItemFinderText() {
  const { language } = useTranslation();
  const text = itemFinderContent[language] || itemFinderContent.en;
  const fmt = useCallback((key, values) => format(text[key] ?? key, values), [text]);

  return { text, fmt };
}
