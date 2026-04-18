import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function normalizeBasename(basename) {
  if (!basename || basename === '/') {
    return '';
  }

  return basename.replace(/\/$/, '');
}

function isExternalHref(href, basename) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  try {
    const currentUrl = new URL(window.location.href);
    const targetUrl = new URL(href, currentUrl);

    if (targetUrl.protocol !== 'http:' && targetUrl.protocol !== 'https:') {
      return false;
    }

    if (targetUrl.origin !== currentUrl.origin) {
      return true;
    }

    const normalizedBasename = normalizeBasename(basename);
    if (!normalizedBasename) {
      return false;
    }

    return targetUrl.pathname !== normalizedBasename && !targetUrl.pathname.startsWith(`${normalizedBasename}/`);
  } catch {
    return false;
  }
}

function NavigationEffects({ basename }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const links = document.querySelectorAll('a[href]');

    links.forEach((link) => {
      const href = link.getAttribute('href');

      if (isExternalHref(href, basename)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noreferrer');
      } else if (href?.startsWith('#') || href?.startsWith('/')) {
        if (link.getAttribute('target') === '_blank') {
          link.removeAttribute('target');
        }

        if (link.getAttribute('rel') === 'noreferrer') {
          link.removeAttribute('rel');
        }
      }
    });
  }, [pathname, basename]);

  return null;
}

export default NavigationEffects;
