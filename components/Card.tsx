import React from 'react';
import { CardData } from '../types';

interface CardProps {
  card: CardData;
  isFaceUp: boolean;
  showYear?: boolean;
  isSelected?: boolean;
  isClickable?: boolean;
}

const Card: React.FC<CardProps> = ({ card, isFaceUp, showYear = true, isSelected = false, isClickable = false }) => {
  const baseClasses = "w-40 h-56 p-3 rounded-lg shadow-md flex flex-col justify-between transition-all duration-300 border-2";
  const clickableClasses = isClickable ? "cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-primary/20" : "";
  const selectedClasses = isSelected ? "ring-4 ring-yellow-400 scale-105 shadow-yellow-500/50" : "ring-2 ring-transparent";

  if (!isFaceUp) {
    return <div className={`${baseClasses} bg-primary-dark border-primary`}></div>;
  }

  return (
    <div className={`${baseClasses} ${clickableClasses} ${selectedClasses} bg-background-surface border-gray-700 text-text`}>
      <p className="text-sm font-light text-justify flex-grow">{card.description}</p>
      {showYear ? (
        <p className="text-2xl font-black text-center text-primary-light mt-2 font-serif">{card.year}</p>
      ) : (
        <p className="text-2xl font-black text-center text-primary-light mt-2 font-serif">????</p>
      )}
    </div>
  );
};

export default Card;
