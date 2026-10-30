// Small stroke icons drawn for this page, so no game artwork is used.
const PATHS = {
  buy: 'M3 4h2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2M9.5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  craft: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3.6 17.4a1.4 1.4 0 0 0 2 2l5.7-5.7a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-.5-.5-2 2.5-2.5Z',
  raw: 'M12 3 4 8.5 6.5 19h11L20 8.5 12 3Zm0 0v16M4 8.5l8 3.5 8-3.5',
  loot: 'M4 9h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9Zm0 0 2-4h12l2 4M10 13h4',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  wikelo: 'M4 8h13l-3-3M20 16H7l3 3M17 8l-3 3M7 16l3-3',
  mission: 'M6 21V4m0 0h10l-2 4 2 4H6',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  pin: 'M12 21s-6-5.6-6-11a6 6 0 1 1 12 0c0 5.4-6 11-6 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
};

function Icon({ name, className = 'h-4 w-4', title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path d={PATHS[name]} />
    </svg>
  );
}

export default Icon;
