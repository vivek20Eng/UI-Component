'use client';

import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import ThreeJsVisualization from '../components/ThreeJsVisualization/ThreeJsVisualization';

const ThreePage = () => {
  return (
    <PageLayout title="Three.js Visualization">
      <ThreeJsVisualization />
    </PageLayout>
  );
};

export default ThreePage;