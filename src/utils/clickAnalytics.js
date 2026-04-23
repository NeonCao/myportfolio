const CLICK_ANALYTICS_KEY = 'portfolioClickAnalytics:v1';
const MAX_CLICK_EVENTS = 20000;

export const trackedPages = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/projects/lexilearn', label: 'Lexi Learn' },
  { path: '/projects/periodic-table-of-mixology', label: 'Periodic Table of Mixology' },
  { path: '/projects/auto-espresso', label: 'Project Lifehack - Espresso Helper' },
  { path: '/projects/interactive-piggy-bank', label: 'Interactive Piggy Bank' },
  { path: '/projects/telling-overtown-stories', label: 'Telling Overtown Stories' },
  { path: '/projects/um-campus-xplorer', label: 'UM Campus Xplorer' },
  { path: '/projects/ar-calorie-visualizer', label: 'AR Calorie Visualizer' },
  { path: '/projects/the-stellar-life-cycle', label: 'The Stellar Life Cycle' },
  { path: '/projects/design-student-note-taking', label: 'Research Case Study: Note-Taking for Design Students' },
  { path: '/projects/um-card-sorting-study', label: 'Card Sorting Study for UM Interactive Media Site' },
  { path: '/projects/about-myself', label: 'Project About Myself' },
  { path: '/projects/memory-graden', label: 'Memory Graden' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/gallery/:photoSlug', label: 'Gallery Photo Detail' },
  { path: '/analytics', label: 'Analytics Dashboard' },
];

const trackedPageMap = new Map(trackedPages.map((page) => [page.path, page.label]));

export function normalizeAnalyticsPath(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  const normalizedPath = pathname.replace(/\/$/, '') || '/';

  if (normalizedPath.startsWith('/gallery/')) {
    return '/gallery/:photoSlug';
  }

  return normalizedPath;
}

export function getAnalyticsPageLabel(pathname) {
  const normalizedPath = normalizeAnalyticsPath(pathname);
  return trackedPageMap.get(normalizedPath) || normalizedPath;
}

export function readClickEvents() {
  try {
    const rawEvents = window.localStorage.getItem(CLICK_ANALYTICS_KEY);
    const parsedEvents = rawEvents ? JSON.parse(rawEvents) : [];

    return Array.isArray(parsedEvents) ? parsedEvents : [];
  } catch {
    return [];
  }
}

export function recordClick(pathname) {
  const timestamp = Date.now();
  const path = normalizeAnalyticsPath(pathname);
  const event = {
    path,
    label: getAnalyticsPageLabel(path),
    timestamp,
  };
  const events = [...readClickEvents(), event].slice(-MAX_CLICK_EVENTS);

  window.localStorage.setItem(CLICK_ANALYTICS_KEY, JSON.stringify(events));
  window.dispatchEvent(new CustomEvent('portfolio-click-analytics-updated'));
}

export function clearClickEvents() {
  window.localStorage.removeItem(CLICK_ANALYTICS_KEY);
  window.dispatchEvent(new CustomEvent('portfolio-click-analytics-updated'));
}

export function summarizeClickEvents(events = readClickEvents(), now = Date.now()) {
  const windows = {
    sevenDays: 7 * 24 * 60 * 60 * 1000,
    thirtyDays: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000,
  };

  const summaries = new Map(
    trackedPages.map((page) => [
      page.path,
      {
        path: page.path,
        label: page.label,
        total: 0,
        sevenDays: 0,
        thirtyDays: 0,
        year: 0,
      },
    ])
  );

  events.forEach((event) => {
    const path = normalizeAnalyticsPath(event.path);
    const timestamp = Number(event.timestamp);

    if (!Number.isFinite(timestamp)) {
      return;
    }

    if (!summaries.has(path)) {
      summaries.set(path, {
        path,
        label: getAnalyticsPageLabel(path),
        total: 0,
        sevenDays: 0,
        thirtyDays: 0,
        year: 0,
      });
    }

    const summary = summaries.get(path);
    const age = now - timestamp;
    summary.total += 1;

    if (age <= windows.sevenDays) {
      summary.sevenDays += 1;
    }

    if (age <= windows.thirtyDays) {
      summary.thirtyDays += 1;
    }

    if (age <= windows.year) {
      summary.year += 1;
    }
  });

  return [...summaries.values()].sort((a, b) => b.total - a.total || a.label.localeCompare(b.label));
}
