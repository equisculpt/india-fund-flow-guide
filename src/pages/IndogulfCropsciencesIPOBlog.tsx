
import React from 'react';
import Layout from '@/components/Layout';
import IndogulfIPOBlog from '@/components/blog/indogulf-ipo/IndogulfIPOBlog';

const IndogulfCropsciencesIPOBlogPage = () => {
  console.log('✅ INDOGULF PAGE V13 - ROUTER-LEVEL LAZY LOADING - ONLY LOADS ON CORRECT ROUTE:', {
    component: 'IndogulfCropsciencesIPOBlogPage',
    route: '/blog/indogulf-cropsciences-ipo-complete-analysis-2024',
    timestamp: new Date().toISOString()
  });

  return (
    <Layout>
      <IndogulfIPOBlog />
    </Layout>
  );
};

export default IndogulfCropsciencesIPOBlogPage;
