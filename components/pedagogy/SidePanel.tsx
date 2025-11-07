import React from 'react';
import { CardData } from '../../types';
import ContextRibbon from './ContextRibbon';
import ClaimEvidenceBox from './ClaimEvidenceBox';
import MicroQuiz from './MicroQuiz';
import SelfExplainPrompt from './SelfExplainPrompt';

interface SidePanelProps {
  card: CardData | null;
  onClose: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ card, onClose }) => {
  const [activeTab, setActiveTab] = React.useState('context');

  const renderContent = () => {
    if (!card) return null;
    switch (activeTab) {
      case 'context':
        return (
          <div className="space-y-4">
            {card.context && <ContextRibbon context={card.context} />}
            {card.claim && <ClaimEvidenceBox claim={card.claim} />}
          </div>
        );
      case 'quiz':
        return card.quiz ? <MicroQuiz quiz={card.quiz} /> : <p>Pas de quiz pour cette carte.</p>;
      case 'explain':
        return <SelfExplainPrompt cardId={card.id} />;
      default:
        return null;
    }
  };

  if (!card) {
    return <div className="hidden lg:block lg:w-1/3 xl:w-1/4"></div>; // Placeholder for alignment
  }

  const tabs = [
    { id: 'context', label: 'Contexte' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'explain', label: 'Expliquer' },
  ];

  return (
    <>
      {/* Side Panel for Desktop */}
      <aside className="hidden lg:flex flex-col w-1/3 xl:w-1/4 bg-background-surface border border-gray-700 rounded-lg shadow-lg">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary-light font-serif">{card.year} - {card.description}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">&times;</button>
        </div>
        <div className="p-4 border-b border-gray-700">
          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-1 text-sm rounded-md ${activeTab === tab.id ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {renderContent()}
        </div>
      </aside>

      {/* Modal for Mobile */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center p-4">
        <div className="bg-background-surface border border-gray-700 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-primary-light font-serif">{card.year}</h2>
            <button onClick={onClose} className="text-2xl p-1 rounded-full hover:bg-gray-700">&times;</button>
          </div>
          <div className="p-4 border-b border-gray-700">
             <div className="flex space-x-1">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-1 text-sm rounded-md ${activeTab === tab.id ? 'bg-primary text-white' : 'hover:bg-gray-700'}`}>
                    {tab.label}
                  </button>
                ))}
            </div>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
