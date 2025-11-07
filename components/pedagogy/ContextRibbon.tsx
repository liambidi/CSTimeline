import React from 'react';

interface ContextRibbonProps {
  context: string;
}

const ContextRibbon: React.FC<ContextRibbonProps> = ({ context }) => {
  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-primary-dark">
      <h3 className="font-bold text-primary-light mb-2">Mise en contexte</h3>
      <p className="text-text-muted text-sm">{context}</p>
    </div>
  );
};

export default ContextRibbon;
