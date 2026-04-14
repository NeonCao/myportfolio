import { fireEvent, render, screen } from '@testing-library/react';
import Header from './components/Header';
import { DARK_THEME } from './utils/theme';

jest.mock(
  'react-router-dom',
  () => ({
    Link: ({ children, ...props }) => <a {...props}>{children}</a>,
    NavLink: ({ children, className, ...props }) => (
      <a {...props} className={typeof className === 'function' ? className({ isActive: false }) : className}>
        {children}
      </a>
    ),
  }),
  { virtual: true }
);

test('renders the header theme switch and toggles the theme', () => {
  window.localStorage.clear();
  document.documentElement.removeAttribute('data-theme');

  render(<Header />);

  const toggleInput = screen.getByRole('checkbox', { name: /toggle color theme/i });
  expect(toggleInput).toBeInTheDocument();

  fireEvent.click(toggleInput);

  expect(document.documentElement.getAttribute('data-theme')).toBe(DARK_THEME);
  expect(window.localStorage.getItem('theme')).toBe(DARK_THEME);
});
