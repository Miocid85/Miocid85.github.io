import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if smooth scrolling is supported
    const supportsSmoothScrolling = 'scrollBehavior' in document.documentElement.style;
    
    if (supportsSmoothScrolling) {
      // Use smooth scrolling for better UX on desktop
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      // Fallback for older browsers or immediate scroll for mobile
      window.scrollTo(0, 0);
    }
    
    // Additional mobile-specific handling
    if ('ontouchstart' in window) {
      // For mobile devices, also ensure the body scrolls to top
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }, [pathname]);

  return null; // This component doesn't render anything
};