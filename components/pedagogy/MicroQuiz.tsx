import React, { useState } from 'react';

interface MicroQuizProps {
  quiz: {
    question: string;
    options: string[];
    answer: string;
  };
}

const MicroQuiz: React.FC<MicroQuizProps> = ({ quiz }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return "bg-gray-700 hover:bg-gray-600";
    }
    if (option === quiz.answer) {
      return "bg-green-500 text-white";
    }
    if (option === selectedOption && option !== quiz.answer) {
      return "bg-red-500 text-white";
    }
    return "bg-gray-800 text-gray-500";
  };

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="font-bold mb-3">Testez vos connaissances</h3>
      <p className="mb-4">{quiz.question}</p>
      <div className="flex flex-col space-y-2">
        {quiz.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={isAnswered}
            className={`w-full text-left p-3 rounded-md transition-colors ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && (
        <div className="mt-4 text-center p-2 rounded-md bg-black/30">
          {selectedOption === quiz.answer ? (
            <p className="text-green-400 font-semibold">Bonne réponse !</p>
          ) : (
            <p className="text-red-400">Incorrect. La bonne réponse était : {quiz.answer}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MicroQuiz;
