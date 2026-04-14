import { useEffect, useState } from 'react';
import { applyTheme, DARK_THEME, getActiveTheme, LIGHT_THEME } from '../utils/theme';

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
            <li><a href="#item1">Item 1</a></li>
            <li>
              <a href="#parent">Parent</a>
              <ul className="p-2">
                <li><a href="#submenu1">Submenu 1</a></li>
                <li><a href="#submenu2">Submenu 2</a></li>
              </ul>
            </li>
            <li><a href="#item3">Item 3</a></li>
          </ul>
        </div>
        <a href="#home" className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="#item1">Item 1</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-base-100 w-40 z-1">
                <li><a href="#submenu1">Submenu 1</a></li>
                <li><a href="#submenu2">Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a href="#item3">Item 3</a></li>
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
