import { useEffect } from 'react';

const useSmoothScroll = () => {
  useEffect(() => {
    // Native CSS smooth scroll is now handled in main.scss
    // This hook can be used for future scroll enhancements if needed
    return () => {
      // Cleanup if needed
    };
  }, []);
};

export default useSmoothScroll;
