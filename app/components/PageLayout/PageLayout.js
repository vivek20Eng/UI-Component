import React from 'react';

const PageLayout = ({ title, children }) => {
  return (
    <div className="container py-8 m-2">
      <h1 className="text-3xl font-bold sm:mb-6 sm:text-left">{title}</h1>
      {children}
    </div>
  );
};

export default PageLayout;