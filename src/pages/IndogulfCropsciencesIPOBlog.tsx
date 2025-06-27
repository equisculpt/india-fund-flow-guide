
import React from 'react';
import Layout from '@/components/Layout';

const IndogulfCropsciencesIPOBlogPage = () => {
  // Only load components if we're definitely on the Indogulf page
  const isIndogulfPage = typeof window !== 'undefined' && window.location.pathname === '/blog/indogulf-cropsciences-ipo-complete-analysis-2024';

  console.log('📄 INDOGULF PAGE V9 - PATH CHECK:', {
    component: 'IndogulfCropsciencesIPOBlogPage',
    currentPath: typeof window !== 'undefined' ? window.location.pathname : 'SSR',
    isIndogulfPage,
    timestamp: new Date().toISOString()
  });

  // Import and render Indogulf blog only when confirmed on Indogulf page
  const IndogulfBlogComponent = React.useMemo(() => {
    if (!isIndogulfPage) return null;
    
    // Dynamic import that only happens when we're on Indogulf page
    const IndogulfIPOBlog = React.lazy(() => import('@/components/blog/indogulf-ipo/IndogulfIPOBlog'));
    return <React.Suspense fallback={null}><IndogulfIPOBlog /></React.Suspense>;
  }, [isIndogulfPage]);

  return (
    <Layout>
      {/* Only render Indogulf blog when absolutely confirmed on Indogulf page */}
      {isIndogulfPage && IndogulfBlogComponent}
    </Layout>
  );
};

export default IndogulfCropsciencesIPOBlogPage;
