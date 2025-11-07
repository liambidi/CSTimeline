import React, { useState } from 'react';
import { Player, CardData } from '../types';
import Card from './Card';
import TimelineSlot from './TimelineSlot';
import SidePanel from './pedagogy/SidePanel';

interface GameBoardProps {
  players: Player[];
  currentPlayer: Player;
  timeline: CardData[];
  deckSize: number;
  selectedCard: CardData | null;
  onSelectCard: (card: CardData) => void;
  onPlaceCard: (timelineIndex: number) => void;
  message: string;
}

const GameBoard: React.FC<GameBoardProps> = ({
  players,
  currentPlayer,
  timeline,
  deckSize,
  selectedCard,
  onSelectCard,
  onPlaceCard,
  message,
}) => {
  const [infoCard, setInfoCard] = useState<CardData | null>(null);
  const otherPlayers = players.filter(p => p.id !== currentPlayer.id);

  const handleTimelineCardClick = (card: CardData) => {
    if (infoCard?.id === card.id) {
      setInfoCard(null); // Toggle off
    } else {
      setInfoCard(card);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full space-y-4 lg:space-y-0 lg:space-x-4">
      <div className="flex-grow flex flex-col space-y-4">
        {/* Opponents and Deck Info */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col items-center space-y-2">
              <div className="w-24 h-36 bg-blue-900/50 border-2 border-primary-dark rounded-lg flex flex-col items-center justify-center shadow-lg">
                  <p className="font-bold text-3xl">{deckSize}</p>
                  <p className="text-sm">Pioche</p>
              </div>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {otherPlayers.map(player => (
              <div key={player.id} className="bg-background-surface p-2 rounded-lg text-center border border-gray-700">
                <div className="font-semibold">{player.name}</div>
                <div className="text-sm text-text-muted">{player.hand.length} carte(s)</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-grow bg-background-surface/50 p-4 rounded-lg overflow-x-auto min-h-[250px] flex items-center border border-gray-700">
          <div className="flex items-center space-x-2 p-4 h-full">
            <TimelineSlot onPlace={() => onPlaceCard(0)} isEnabled={!!selectedCard} />
            {timeline.map((card, index) => (
              <React.Fragment key={card.id}>
                <div onClick={() => handleTimelineCardClick(card)}>
                  <Card card={card} isFaceUp={true} isClickable={true} isSelected={infoCard?.id === card.id} />
                </div>
                <TimelineSlot onPlace={() => onPlaceCard(index + 1)} isEnabled={!!selectedCard} />
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Game Message */}
        {message && (
          <div className="w-full text-center py-2 bg-black/30 rounded-lg absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <p className="text-lg font-semibold text-yellow-300 animate-pulse">{message}</p>
          </div>
        )}

        {/* Current Player's Hand */}
        <div className="bg-background-surface p-4 rounded-lg shadow-inner border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-primary-light">{currentPlayer.name} (Votre tour)</h3>
          {currentPlayer.hand.length > 0 ? (
            <div className="flex justify-center items-center gap-2 flex-wrap">
              {currentPlayer.hand.map(card => (
                <div key={card.id} onClick={() => onSelectCard(card)}>
                  <Card 
                    card={card} 
                    isFaceUp={true} 
                    showYear={false}
                    isSelected={selectedCard?.id === card.id}
                    isClickable={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-muted">Vous n'avez plus de cartes !</p>
          )}
        </div>
      </div>

      {/* Side Panel for Pedagogical Content */}
      <SidePanel card={infoCard} onClose={() => setInfoCard(null)} />
    </div>
  );
};

export default GameBoard;