
import { useNavigate } from 'react-router-dom';

export const useFundDetailsNavigation = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    console.log('Back button clicked, navigating to funds section');
    
    // Navigate to home page and scroll to funds section
    navigate('/', { replace: true });
    
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const fundsSection = document.getElementById('funds');
      if (fundsSection) {
        fundsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return { handleBackClick };
};
