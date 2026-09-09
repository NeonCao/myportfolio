import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CHINESE, useTranslation } from '../i18n/LanguageContext';
import { normalizeProjectPhrase, translateProjectPhrase } from '../i18n/projectPhraseTranslations';

const originalTextByNode = new WeakMap();
const ignoredTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'CANVAS', 'TEXTAREA', 'INPUT']);

function shouldTranslateNode(node) {
  const parent = node.parentElement;

  if (!parent || ignoredTags.has(parent.tagName)) {
    return false;
  }

  return normalizeProjectPhrase(node.textContent).length > 1;
}

function applyStepLabelTranslation(text, language) {
  const normalizedText = normalizeProjectPhrase(text);
  const stepMatch = normalizedText.match(/^Step\s+(.+)$/i);
  const storyboardMatch = normalizedText.match(/^Storyboard step\s+(.+)$/i);

  if (language === CHINESE) {
    if (stepMatch) {
      return `步骤 ${stepMatch[1]}`;
    }

    if (storyboardMatch) {
      return `故事板步骤 ${storyboardMatch[1]}`;
    }
  }

  if (normalizedText.match(/^步骤\s+(.+)$/)) {
    return text.replace(/^步骤\s+/, 'Step ');
  }

  if (normalizedText.match(/^故事板步骤\s+(.+)$/)) {
    return text.replace(/^故事板步骤\s+/, 'Storyboard step ');
  }

  return text;
}

function translateTextNode(node, language) {
  if (!shouldTranslateNode(node)) {
    return;
  }

  if (!originalTextByNode.has(node)) {
    originalTextByNode.set(node, node.textContent);
  }

  const originalText = originalTextByNode.get(node);
  const textForLookup = language === CHINESE ? originalText : node.textContent;
  const translatedText = applyStepLabelTranslation(
    translateProjectPhrase(textForLookup, language),
    language
  );

  if (translatedText !== node.textContent) {
    node.textContent = translatedText;
  }
}

function translateVisibleProjectText(language) {
  const root = document.querySelector('main') || document.querySelector('.min-h-screen') || document.body;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let currentNode = walker.nextNode();

  while (currentNode) {
    translateTextNode(currentNode, language);
    currentNode = walker.nextNode();
  }
}

function ProjectPageTranslator() {
  const { pathname } = useLocation();
  const { language } = useTranslation();

  useEffect(() => {
    if (!pathname.startsWith('/projects')) {
      return undefined;
    }

    window.requestAnimationFrame(() => translateVisibleProjectText(language));

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(() => translateVisibleProjectText(language));
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [language, pathname]);

  return null;
}

export default ProjectPageTranslator;
