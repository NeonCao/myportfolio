import { useLocation } from 'react-router-dom';

function PageTransition({ children }) {
  const { pathname } = useLocation();

  return (
    <div key={pathname} className="page-shell fx-page-enter">
      {children}
    </div>
  );
}

export default PageTransition;
