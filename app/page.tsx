"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "./components/PageLayout/PageLayout";
import Card from "./components/Card/Card";
import ThreeJSBackground from "./components/ThreeJsBackground";

// Define the structure of the card data
interface CardData {
  id: number;
  title: string;
  description: string;
  path: string;
  imagePath?: string; // Optional image path
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
      id: 1,
      title: "Three.js Visualization",
      description: "Click to view the Three.js visualization",
      path: "/three-js",
      imagePath: "/cardPreviewImg/threejs.png", 
    },
    {
      id: 2,
      title: "Accordion",
      description: "Click to view the accordion page",
      path: "/accordion",
      imagePath: "", 
    },
  ];

  return (
    <div className="relative p-6">
      <div className="absolute inset-0 z-0">
        <ThreeJSBackground />
      </div>
      <div className="relative z-10">
        <PageLayout title="Components UI">
          <div className="flex flex-wrap gap-8">
            {cardData.map((card, index) => (
              <Card
                id={card.id}
                key={index}
                title={card.title}
                description={card.description}
                isActive={activeCard === card.path}
                onClick={() => handleCardClick(card.path)}
                imagePath={card.imagePath} // Pass the image path
              />
            ))}
          </div>
        </PageLayout>
      </div>
    </div>
  );
};

export default Home;
