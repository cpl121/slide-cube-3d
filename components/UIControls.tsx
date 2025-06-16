import React from 'react';

export interface UIControlsProps {
  moveCount: number;
  timeElapsed: number; // seconds
  onShuffle(): void;
  onUndo(): void;
}

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};

const UIControls: React.FC<UIControlsProps> = ({ moveCount, timeElapsed, onShuffle, onUndo }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white flex items-center gap-4 p-4 z-10">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
        onClick={onShuffle}
      >
        Shuffle
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded disabled:opacity-50"
        onClick={onUndo}
        disabled={moveCount === 0}
      >
        Undo
      </button>
      <div className="ml-auto flex gap-4">
        <span>Moves: {moveCount}</span>
        <span>Time: {formatTime(timeElapsed)}</span>
      </div>
    </div>
  );
};

export default UIControls;
