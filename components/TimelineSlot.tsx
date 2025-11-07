
import React from 'react';

interface TimelineSlotProps {
  onPlace: () => void;
  isEnabled: boolean;
}

const TimelineSlot: React.FC<TimelineSlotProps> = ({ onPlace, isEnabled }) => {
  const baseClasses = "h-56 w-10 flex items-center justify-center rounded-lg transition-all duration-200";
  const disabledClasses = "bg-transparent";
  const enabledClasses = "bg-green-800/50 hover:bg-green-700/70 cursor-pointer border-2 border-dashed border-green-500";

  return (
    <div
      onClick={isEnabled ? onPlace : undefined}
      className={`${baseClasses} ${isEnabled ? enabledClasses : disabledClasses}`}
      title={isEnabled ? "Placer la carte ici" : ""}
    >
      {isEnabled && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )}
    </div>
  );
};

export default TimelineSlot;
