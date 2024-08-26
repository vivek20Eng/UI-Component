import React from 'react';

const PageLayout = ({ title, children }) => {
  return (
    <div className="container py-0 sm:py-8 m-2">
      <h1 className="text-3xl font-bold sm:mb-6 sm:text-left mb-6">{title}</h1>
      {children}
    </div>
  );
};

export default PageLayout;