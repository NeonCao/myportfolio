import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const ENGLISH = 'en';
export const CHINESE = 'zh';

const LANGUAGE_STORAGE_KEY = 'portfolioLanguage';

const translations = {
  [ENGLISH]: {
    header: {
      home: 'Home',
      breadcrumbHome: "Neon's Home",
      projects: 'Projects',
      gallery: 'Gallary',
      analytics: 'Analytics',
      photo: 'Photo',
      project: 'Project',
      languageToggle: 'Switch language to Chinese',
      languageControl: 'Toggle language',
    },
    hero: {
      eyebrow: 'Portfolio',
      introPrefix: "Hello, I'm Neon Cao, a ",
      roles: ['UX Designer', 'Programmer', 'Developer', 'Researcher'],
      summary:
        'I build thoughtful digital experiences across UX, front/backend development, mixed reality, AI integration, and data structures, with a focus on making technology feel easy-accessible, ai-driven, and worth exploring.',
      projectsButton: 'My Projects',
      linkedInButton: 'My LinkedIn',
      githubButton: 'My GitHub',
      historyButton: 'See My Personal History',
      siteCredit: 'This whole site was designed and built by me using React.',
    },
    history: {
      eyebrow: 'Personal History',
      heading: 'Recent Personal History',
      education: 'Education',
      work: 'Work',
      relatedWork: 'Related Work',
      toggleItem: 'Toggle {title}',
      logoFallback: 'Icon',
    },
  },
  [CHINESE]: {
    header: {
      home: '首页',
      breadcrumbHome: 'Neon 的首页',
      projects: '项目',
      gallery: '相册',
      analytics: '数据分析',
      photo: '照片',
      project: '项目',
      languageToggle: '切换语言为英文',
      languageControl: '切换语言',
    },
    hero: {
      eyebrow: '作品集',
      introPrefix: '你好，我是 Neon Cao，一名',
      roles: ['用户体验设计师', '程序员', '开发者', '研究者'],
      summary:
        '我专注于打造有温度的数字体验，涵盖用户体验、前后端开发、混合现实、AI 集成和数据结构，让技术更易用、更智能，也更值得探索。',
      projectsButton: '我的项目',
      linkedInButton: '我的 LinkedIn',
      githubButton: '我的 GitHub',
      historyButton: '查看个人经历',
      siteCredit: '整个网站由我使用 React 设计并开发。',
    },
    history: {
      eyebrow: '个人经历',
      heading: '近期个人经历',
      education: '教育',
      work: '工作',
      relatedWork: '相关作品',
      toggleItem: '切换 {title}',
      logoFallback: '图标',
    },
  },
};

const LanguageContext = createContext(null);

function getInitialLanguage() {
  if (typeof window === 'undefined') {
    return ENGLISH;
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  return savedLanguage === CHINESE ? CHINESE : ENGLISH;
}

function getNestedValue(source, key) {
  return key.split('.').reduce((current, part) => current?.[part], source);
}

export function translate(language, key, fallback = key) {
  const activeLanguage = language === CHINESE ? CHINESE : ENGLISH;
  const translatedValue = getNestedValue(translations[activeLanguage], key);

  if (translatedValue !== undefined) {
    return translatedValue;
  }

  return getNestedValue(translations[ENGLISH], key) ?? fallback;
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language === CHINESE ? 'zh-CN' : 'en';
  }, [language]);

  const value = useMemo(() => {
    const t = (key, fallback) => translate(language, key, fallback);
    const toggleLanguage = () => setLanguage((current) => (current === ENGLISH ? CHINESE : ENGLISH));

    return {
      language,
      setLanguage,
      t,
      toggleLanguage,
      isChinese: language === CHINESE,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useTranslation must be used inside a LanguageProvider');
  }

  return context;
}
