
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

const IndogulfCropsciencesIPOBlogPage = () => {
  const [shouldRenderIndogulfBlog, setShouldRenderIndogulfBlog] = useState(false);
  const [IndogulfBlogComponent, setIndogulfBlogComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Only check and load Indogulf blog after component mounts
    const currentPath = window.location.pathname;
    const isIndogulfPage = currentPath === '/blog/indogulf-cropsciences-ipo-complete-analysis-2024';

    console.log('📄 INDOGULF PAGE V7 - MOUNT CHECK:', {
      component: 'IndogulfCropsciencesIPOBlogPage',
      timestamp: new Date().toISOString(),
      currentPath,
      isIndogulfPage,
      'DYNAMIC_IMPORT_STATUS': isIndogulfPage ? 'WILL_LOAD_BLOG' : 'BLOCKED_BLOG'
    });

    if (isIndogulfPage) {
      // Dynamic import to prevent loading Indogulf blog on other pages
      import('@/components/blog/indogulf-ipo/IndogulfIPOBlog').then((module) => {
        setIndogulfBlogComponent(() => module.default);
        setShouldRenderIndogulfBlog(true);
      });
    }
  }, []);

  return (
    <Layout>
      {/* Only render Indogulf blog if we're on the correct page and component is loaded */}
      {shouldRenderIndogulfBlog && IndogulfBlogComponent && <IndogulfBlogComponent />}
    </Layout>
  );
};

export default IndogulfCropsciencesIPOBlogPage;
