import React from 'react';

const PageLayout = ({ title, children }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">{title}</h1>
      {children}
    </div>
  );
};

export default PageLayout;