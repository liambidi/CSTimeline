import React from 'react';

interface ClaimEvidenceBoxProps {
  claim: {
    statement: string;
    evidence: string;
    source: string;
  };
}

const ClaimEvidenceBox: React.FC<ClaimEvidenceBoxProps> = ({ claim }) => {
  return (
    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 mt-4">
      <div className="mb-3">
        <p className="text-xs text-text-muted uppercase font-semibold">Affirmation</p>
        <p className="italic">"{claim.statement}"</p>
      </div>
      <div className="mb-3">
        <p className="text-xs text-text-muted uppercase font-semibold">Preuve / Indice</p>
        <p>{claim.evidence}</p>
      </div>
       <div>
        <p className="text-xs text-text-muted uppercase font-semibold">Source</p>
        <p className="text-sm">{claim.source}</p>
      </div>
    </div>
  );
};

export default ClaimEvidenceBox;
