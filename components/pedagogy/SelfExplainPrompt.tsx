import React, { useState, useEffect } from 'react';

interface SelfExplainPromptProps {
  cardId: number;
}

const SelfExplainPrompt: React.FC<SelfExplainPromptProps> = ({ cardId }) => {
  const storageKey = `self-explain-${cardId}`;
  const [explanation, setExplanation] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedExplanation = localStorage.getItem(storageKey);
    if (savedExplanation) {
      setExplanation(savedExplanation);
    } else {
      setExplanation('');
    }
    setIsSaved(false); // Reset save status on card change
  }, [cardId, storageKey]);

  const handleSave = () => {
    localStorage.setItem(storageKey, explanation);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 mt-4">
      <h3 className="font-bold mb-2">Expliquez avec vos mots</h3>
      <p className="text-sm text-text-muted mb-3">En une phrase, que retenez-vous de cet événement ?</p>
      <textarea
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        rows={3}
        className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-primary focus:border-primary"
        placeholder="Votre explication ici..."
      />
      <div className="flex justify-end items-center mt-2">
        {isSaved && <p className="text-sm text-green-400 mr-4">Enregistré !</p>}
        <button onClick={handleSave} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-md text-sm">
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default SelfExplainPrompt;
