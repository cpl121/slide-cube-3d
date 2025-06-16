import { formatTime } from '@/lib/puzzle';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

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
    <div className="fixed top-0 left-0 w-full text-white flex items-center gap-4 p-6 z-10">
      <button onClick={() => router.push('/')}>
        <Image
          className="rounded-lg"
          src={'/assets/slide-cube.png'}
          alt="slide cube"
          width={40}
          height={40}
        />
      </button>
      <div className="h-8 w-px bg-gray-500" />
      <button
        className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-1 px-3 rounded"
        onClick={onShuffle}
      >
        Init 🔁
      </button>
      <button
        className="bg-cyan-600 enabled:hover:bg-cyan-500 text-white font-semibold py-1 px-3 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onUndo}
        disabled={shouldUndo}
      >
        Undo ↩️
      </button>
      <div className="ml-auto flex gap-4">
        <span className="md:text-lg">Moves: {moveCount}</span>
        <span className="md:text-lg">Time: {formatTime(timeElapsed)}</span>
      </div>
    </div>
  );
};

export default UIControls;
