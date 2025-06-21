
import React from 'react';
import VeedaBlogSEO from '@/components/blog/veeda-ipo/VeedaBlogSEO';
import VeedaBlogLayout from '@/components/blog/veeda-ipo/VeedaBlogLayout';
import VeedaBlogContent from '@/components/blog/veeda-ipo/VeedaBlogContent';

const VeedaClinicalResearchIPOBlog = () => {
  return (
    <>
      <VeedaBlogSEO />
      <VeedaBlogLayout>
        <VeedaBlogContent />
      </VeedaBlogLayout>
    </>
  );
};

export default VeedaClinicalResearchIPOBlog;
