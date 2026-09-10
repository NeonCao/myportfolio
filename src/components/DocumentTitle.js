import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';
import { translateProjectPhrase } from '../i18n/projectPhraseTranslations';
import { getGalleryPhotoBySlug } from '../data/galleryPhotos';
import { projectPageNames } from './HeaderBreadcrumbs';

const SITE_NAME = 'Neon Cao';
const HOME_TITLE = `${SITE_NAME} — Portfolio`;
const NOT_FOUND_TITLE = `Page Not Found — ${SITE_NAME}`;

function getPageTitle(pathname, t, language) {
  if (pathname === '/') {
    return HOME_TITLE;
  }

  if (pathname === '/projects') {
    return `${t('header.projects')} — ${SITE_NAME}`;
  }

  if (pathname === '/analytics') {
    return `${t('header.analytics')} — ${SITE_NAME}`;
  }

  if (pathname === '/gallery') {
    return `${t('header.gallery')} — ${SITE_NAME}`;
  }

  if (pathname.startsWith('/gallery/')) {
    const photoSlug = pathname.split('/')[2];
    const photo = getGalleryPhotoBySlug(photoSlug);

    return photo ? `${photo.baseName} — ${t('header.gallery')} — ${SITE_NAME}` : NOT_FOUND_TITLE;
  }

  if (pathname.startsWith('/projects/')) {
    const projectName = projectPageNames[pathname];

    return projectName ? `${translateProjectPhrase(projectName, language)} — ${SITE_NAME}` : NOT_FOUND_TITLE;
  }

  return NOT_FOUND_TITLE;
}

function DocumentTitle() {
  const { pathname } = useLocation();
  const { language, t } = useTranslation();

  useEffect(() => {
    document.title = getPageTitle(pathname, t, language);
  }, [pathname, t, language]);

  return null;
}

export default DocumentTitle;
