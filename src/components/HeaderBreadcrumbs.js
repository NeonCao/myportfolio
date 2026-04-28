import { Link, useLocation } from 'react-router-dom';
import { getGalleryPhotoBySlug } from '../data/galleryPhotos';

const projectPageNames = {
  '/projects/interactive-piggy-bank': 'Interactive Piggy Bank',
  '/projects/telling-overtown-stories': 'Telling Overtown Stories',
  '/projects/auto-espresso': 'Project Lifehack - Espresso Helper',
  '/projects/periodic-table-of-mixology': 'Periodic Table of Mixology',
  '/projects/um-campus-xplorer': 'UM Campus Xplorer',
  '/projects/ar-calorie-visualizer': 'AR Calorie Visualizer',
  '/projects/the-stellar-life-cycle': 'The Stellar Life Cycle',
  '/projects/design-student-note-taking': 'Research Case Study: Note-Taking for Design Students',
  '/projects/um-card-sorting-study': 'Card Sorting Study for UM Interactive Media Site',
  '/projects/about-myself': 'Project About Myself',
  '/projects/memory-graden': 'Memory Graden',
  '/projects/lexilearn': 'LexiLearn',
  '/projects/5-star-host-web-page-redesign': 'Case Study: 5-Star Host web page redesign',
};

function FolderIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4 stroke-current">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      ></path>
    </svg>
  );
}

function getBreadcrumbItems(pathname) {
  const home = { to: '/', label: "Neon's Home" };

  if (pathname === '/') {
    return [home];
  }

  if (pathname === '/projects') {
    return [home, { to: '/projects', label: 'Projects' }];
  }

  if (pathname === '/gallery') {
    return [home, { to: '/gallery', label: 'Gallary' }];
  }

  if (pathname === '/analytics') {
    return [home, { to: '/analytics', label: 'Analytics' }];
  }

  if (pathname.startsWith('/gallery/')) {
    const photoSlug = pathname.split('/')[2];
    const photo = getGalleryPhotoBySlug(photoSlug);

    return [
      home,
      { to: '/gallery', label: 'Gallary' },
      { to: pathname, label: photo?.baseName || 'Photo' },
    ];
  }

  if (pathname.startsWith('/projects/')) {
    return [
      home,
      { to: '/projects', label: 'Projects' },
      { to: pathname, label: projectPageNames[pathname] || 'Project' },
    ];
  }

  return [home];
}

function HeaderBreadcrumbs() {
  const { pathname } = useLocation();
  const items = getBreadcrumbItems(pathname);

  return (
    <div className="breadcrumbs max-w-[calc(100vw-11rem)] overflow-x-auto text-sm">
      <ul className="whitespace-nowrap">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="inline-flex items-center gap-2 font-medium">
              <FolderIcon />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeaderBreadcrumbs;
