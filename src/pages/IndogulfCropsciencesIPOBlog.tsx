
import React from 'react';
import IndogulfIPOBlog from '@/components/blog/indogulf-ipo/IndogulfIPOBlog';
import Layout from '@/components/Layout';

const IndogulfCropsciencesIPOBlogPage = () => {
  // CRITICAL: Only proceed if we're on the correct path
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isIndogulfPage = currentPath === '/blog/indogulf-cropsciences-ipo-complete-analysis-2024';

  console.log('📄 INDOGULF PAGE V6 - ULTRA STRICT:', {
    component: 'IndogulfCropsciencesIPOBlogPage',
    timestamp: new Date().toISOString(),
    currentPath,
    isIndogulfPage,
    'PAGE_RENDER_STATUS': isIndogulfPage ? 'FULL_RENDER' : 'MINIMAL_RENDER',
    'SEO_DELEGATION': 'All SEO handled by IndogulfIPOBlog component with strict guards'
  });

  return (
    <Layout>
      {/* IndogulfIPOBlog has its own strict path checking and will return null if not on correct page */}
      <IndogulfIPOBlog />
    </Layout>
  );
};

export default IndogulfCropsciencesIPOBlogPage;
