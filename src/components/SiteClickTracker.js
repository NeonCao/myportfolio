import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { recordClick } from '../utils/clickAnalytics';

function SiteClickTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    function handleDocumentClick() {
      recordClick(pathname);
    }

    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [pathname]);

  return null;
}

export default SiteClickTracker;
