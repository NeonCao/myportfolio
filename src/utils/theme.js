export const LIGHT_THEME = 'cupcake';
export const DARK_THEME = 'abyss';

function normalizeTheme(theme) {
  if (theme === 'dark') {
    return DARK_THEME;
  }

  if (theme === 'light') {
    return LIGHT_THEME;
  }

  if (theme === LIGHT_THEME || theme === DARK_THEME) {
    return theme;
  }

  return null;
}

export function getSavedTheme() {
  if (typeof window === 'undefined') {
    return null;
  }

  return normalizeTheme(window.localStorage.getItem('theme'));
}

export function getPreferredTheme() {
  if (typeof window === 'undefined') {
    return LIGHT_THEME;
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
}

export function getActiveTheme() {
  if (typeof document === 'undefined') {
    return LIGHT_THEME;
  }

  return normalizeTheme(document.documentElement.getAttribute('data-theme')) || getSavedTheme() || getPreferredTheme();
}

export function applyTheme(theme) {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  const nextTheme = normalizeTheme(theme) || LIGHT_THEME;

  document.documentElement.setAttribute('data-theme', nextTheme);
  window.localStorage.setItem('theme', nextTheme);
}
