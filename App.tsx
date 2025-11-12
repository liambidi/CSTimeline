import React, { useState, useCallback } from 'react';
import { GameState, Player, CardData } from './types';
import { EVENT_CARDS, INITIAL_HAND_SIZE } from './constants';
import GameSetup from './components/GameSetup';
import GameBoard from './components/GameBoard';

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.Setup);
  const [players, setPlayers] = useState<Player[]>([]);
  const [deck, setDeck] = useState<CardData[]>([]);
  const [timeline, setTimeline] = useState<CardData[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [message, setMessage] = useState<string>('');
  const [winner, setWinner] = useState<Player | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2500);
  };

  const handleStartGame = useCallback((numPlayers: number) => {
    const shuffledDeck = shuffleArray(EVENT_CARDS);
    
    const initialPlayers: Player[] = [];
    for (let i = 0; i < numPlayers; i++) {
      initialPlayers.push({
        id: i + 1,
        name: `Joueur ${i + 1}`,
        hand: shuffledDeck.splice(0, INITIAL_HAND_SIZE),
      });
    }

    const initialTimelineCard = shuffledDeck.pop();
    if (!initialTimelineCard) {
      console.error("Not enough cards to start the game.");
      return;
    }

    setPlayers(initialPlayers);
    setTimeline([initialTimelineCard]);
    setDeck(shuffledDeck);
    setCurrentPlayerIndex(0);
    setSelectedCard(null);
    setWinner(null);
    setGameState(GameState.Playing);
    showMessage(`Le jeu commence ! C'est au tour de ${initialPlayers[0].name}.`);
  }, []);
  
  const handleRestart = () => {
    setGameState(GameState.Setup);
    setPlayers([]);
    setDeck([]);
    setTimeline([]);
    setCurrentPlayerIndex(0);
    setSelectedCard(null);
    setWinner(null);
    setMessage('');
  };

  const handleSelectCard = (card: CardData) => {
    if (selectedCard?.id === card.id) {
      setSelectedCard(null); // Deselect if clicked again
    } else {
      setSelectedCard(card);
    }
  };

  const nextTurn = () => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    showMessage(`C'est au tour de ${players[nextPlayerIndex].name}.`);
  };

  const handlePlaceCard = (timelineIndex: number) => {
    if (!selectedCard) return;

    const cardToPlace = selectedCard;
    const currentPlayer = players[currentPlayerIndex];

    const cardInHand = currentPlayer.hand.find(c => c.id === cardToPlace.id);
    if (!cardInHand) {
      setSelectedCard(null);
      return;
    }

    const yearToPlace = cardToPlace.year;

    const leftCard = timeline[timelineIndex - 1];
    const rightCard = timeline[timelineIndex];

    const isCorrectPlacement =
      (!leftCard || yearToPlace >= leftCard.year) &&
      (!rightCard || yearToPlace <= rightCard.year);

    let newHand = [...currentPlayer.hand];
    const newDeck = [...deck];

    if (isCorrectPlacement) {
      // Correct placement
      showMessage("Correct !");
      newHand = newHand.filter(c => c.id !== cardToPlace.id);

      const newTimeline = [...timeline];
      newTimeline.splice(timelineIndex, 0, cardToPlace);
      setTimeline(newTimeline);

      if (newDeck.length > 0) {
        const drawnCard = newDeck.pop();
        if (drawnCard) {
          newHand.push(drawnCard);
        }
      }

      setDeck(newDeck);

      if (newHand.length === 0) {
        setWinner(currentPlayer);
        setGameState(GameState.Finished);
      } else {
        nextTurn();
      }
    } else {
      // Incorrect placement
      showMessage("Incorrect ! Vous piochez une carte de pénalité.");
      if (newDeck.length > 0) {
        const penaltyCard = newDeck.pop();
        if (penaltyCard) {
          newHand.push(penaltyCard);
        }
      }
      setDeck(newDeck);
      nextTurn();
    }
    
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex] = { ...currentPlayer, hand: newHand };
    setPlayers(updatedPlayers);
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col items-center p-4 font-sans">
      <header className="w-full text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-light tracking-wider font-serif">Jeu de Timeline Chronologique</h1>
      </header>
      
      <main className="w-full max-w-screen-2xl mx-auto flex-grow">
        {gameState === GameState.Setup && <GameSetup onStartGame={handleStartGame} />}
        
        {gameState === GameState.Playing && players.length > 0 && (
          <GameBoard 
            players={players}
            currentPlayer={players[currentPlayerIndex]}
            timeline={timeline}
            deckSize={deck.length}
            selectedCard={selectedCard}
            onSelectCard={handleSelectCard}
            onPlaceCard={handlePlaceCard}
            message={message}
          />
        )}

        {gameState === GameState.Finished && winner && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-background-surface rounded-lg shadow-2xl p-8 text-center border border-primary">
              <h2 className="text-4xl font-bold text-yellow-400 mb-4">Félicitations !</h2>
              <p className="text-2xl mb-6">{winner.name} a gagné la partie !</p>
              <button
                onClick={handleRestart}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
              >
                Rejouer
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
