
import React from 'react';
import IndogulfIPOBlog from '@/components/blog/indogulf-ipo/IndogulfIPOBlog';
import Layout from '@/components/Layout';

const IndogulfCropsciencesIPOBlogPage = () => {
  // FORENSIC SEO AUDIT - Page Level
  console.log('📄 INDOGULF PAGE SEO FORENSIC AUDIT V3:', {
    component: 'IndogulfCropsciencesIPOBlogPage',
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    'PAGE_RESPONSIBILITY': 'Wrapping IndogulfIPOBlog with Layout',
    'SEO_DELEGATION': 'All SEO handled by IndogulfIPOBlog component',
    'LAYOUT_BYPASS': 'Layout should skip SEO for this nuclear page'
  });

  return (
    <Layout>
      <IndogulfIPOBlog />
    </Layout>
  );
};

export default IndogulfCropsciencesIPOBlogPage;
