import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import { applyTheme, DARK_THEME, getActiveTheme, LIGHT_THEME } from '../utils/theme';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
];

function navLinkClass({ isActive }) {
  return isActive ? 'active' : '';
}

function Header() {
  const [theme, setTheme] = useState(getActiveTheme);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setTheme(getActiveTheme());

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const isDarkTheme = theme === DARK_THEME;
  const nextTheme = isDarkTheme ? LIGHT_THEME : DARK_THEME;
  const handleThemeToggle = () => {
    applyTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <HeaderBreadcrumbs />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <label
          className="toggle text-base-content"
          aria-label={`Switch to ${nextTheme} theme`}
          title={`Switch to ${nextTheme} theme`}
        >
          <input
            type="checkbox"
            value={DARK_THEME}
            className="theme-controller"
            checked={isDarkTheme}
            onChange={handleThemeToggle}
            aria-label="Toggle color theme"
          />
          <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>
          <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
      </div>
    </div>
  );
}

export default Header;
