
import React from 'react';
import Layout from '@/components/Layout';
import VeedaBlogSEO from '@/components/blog/veeda-ipo/VeedaBlogSEO';
import VeedaBlogLayout from '@/components/blog/veeda-ipo/VeedaBlogLayout';
import VeedaBlogContent from '@/components/blog/veeda-ipo/VeedaBlogContent';

const VeedaClinicalResearchIPOBlog = () => {
  return (
    <Layout>
      <VeedaBlogSEO />
      <VeedaBlogLayout>
        <VeedaBlogContent />
      </VeedaBlogLayout>
    </Layout>
  );
};

export default VeedaClinicalResearchIPOBlog;
