
import React, { useState } from 'react';

interface GameSetupProps {
  onStartGame: (numPlayers: number) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(numPlayers);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-cyan-300">Configuration de la partie</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6 w-full max-w-xs">
        <div>
          <label htmlFor="numPlayers" className="block text-lg font-medium mb-2">Nombre de joueurs :</label>
          <select
            id="numPlayers"
            value={numPlayers}
            onChange={(e) => setNumPlayers(parseInt(e.target.value))}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-md"
        >
          Commencer à jouer
        </button>
      </form>
    </div>
  );
};

export default GameSetup;
