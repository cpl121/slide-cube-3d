'use client';

import React from 'react';

export interface VictoryPopupProps {
  moveCount: number;
  timeElapsed: number;
  onClose: () => void;
}

const VictoryPopup: React.FC<VictoryPopupProps> = ({ moveCount, timeElapsed, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg p-6 text-center max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="mb-6">
          You solved the puzzle in {timeElapsed} seconds and {moveCount} moves.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VictoryPopup;
