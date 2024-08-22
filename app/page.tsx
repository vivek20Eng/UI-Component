'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from './components/PageLayout/PageLayout';
import Card from './components/Card/Card';

// Define the structure of the card data
interface CardData {
  title: string;
  description: string;
  path: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardClick = (path: string) => {
    setActiveCard(path);
    router.push(path);
  };

  const cardData: CardData[] = [
    {
      title: 'Accordion',
      description: 'Click to view the accordion page',
      path: '/accordion',
    },
    {
      title: 'Three.js Visualization',
      description: 'Click to view the Three.js visualization',
      path: '/three-js',
    },
  ];

  return (
    <PageLayout title="Welcome to my Next.js App">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            isActive={activeCard === card.path}
            onClick={() => handleCardClick(card.path)}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default Home;
