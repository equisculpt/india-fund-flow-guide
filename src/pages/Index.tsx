import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  console.log('Index page is rendering');

  return (
    <Layout>
      <HeroSection />
    </Layout>
  );
};

export default Index;