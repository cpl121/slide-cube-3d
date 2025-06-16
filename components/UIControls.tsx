import { formatTime } from '@/lib/puzzle';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export interface UIControlsProps {
  moveCount: number;
  timeElapsed: number; // seconds
  onShuffle(): void;
  onUndo(): void;
  shouldUndo: boolean;
}

const UIControls: React.FC<UIControlsProps> = ({
  moveCount,
  timeElapsed,
  onShuffle,
  onUndo,
  shouldUndo,
}) => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white flex items-center gap-4 p-4 z-10">
      <button
        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
        onClick={() => router.push('/')}
      >
        Go Home
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
        onClick={onShuffle}
      >
        Shuffle
      </button>
      <button
        className="bg-blue-500 enabled:hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onUndo}
        disabled={shouldUndo}
      >
        Undo
      </button>
      <div className="ml-auto flex gap-4">
        <span>Moves: {moveCount / 2}</span>
        <span>Time: {formatTime(timeElapsed)}</span>
      </div>
    </div>
  );
};

export default UIControls;
