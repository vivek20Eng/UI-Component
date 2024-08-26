'use client';

import React from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import Accordion from '../components/Accordion/Accordion';
import BreadCrumbLayout from '../components/layouts/BreadCrumbLayout'
const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Accordian', href: '/' },
];
const AccordionPage = () => {
  const accordionItems = [
    {
      title: 'Accordion Item 1',
      content: 'This is the content for Accordion Item 1.',
    },
    {
      title: 'Accordion Item 2',
      content: 'This is the content for Accordion Item 2.',
    },
    {
      title: 'Accordion Item 3',
      content: 'This is the content for Accordion Item 3.',
    },
  ];

  return (
    <PageLayout title="Accordion Page">
    <BreadCrumbLayout breadcrumbs={breadcrumbs}/>
      <Accordion items={accordionItems} />
    </PageLayout>
  );
};

export default AccordionPage;