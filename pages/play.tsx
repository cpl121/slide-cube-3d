import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GameCanvas from '@/components/GameCanvas';
import UIControls from '@/components/UIControls';
import { usePuzzle } from '@/hooks/usePuzzle';
import { isSolved } from '@/lib/puzzle';
import { useTimer } from '@/hooks';

const PlayPage: NextPage = () => {
  const router = useRouter();
  const { size: qSize, seed: qSeed } = router.query as { size?: string; seed?: string };
  const size = qSize ? parseInt(qSize, 10) : 4;
  const seed = qSeed ? parseInt(qSeed, 10) : undefined;

  const { board, moveCount, moveTile, undo, reset } = usePuzzle(size, seed);
  const { timeElapsed, start, pause, reset: resetTimer } = useTimer();

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (isSolved(board)) {
      pause();
    }
  }, [board, pause]);

  return (
    <div className="flex flex-col h-screen">
      <UIControls
        moveCount={moveCount}
        timeElapsed={timeElapsed}
        onShuffle={() => {
          reset();
          resetTimer();
          start();
        }}
        onUndo={() => {
          undo();
          start();
        }}
      />
      <div className="flex-1">
        <GameCanvas
          size={size}
          board={board}
          onTileClick={(index) => {
            moveTile(index);
            start();
          }}
        />
      </div>
    </div>
  );
};

export default PlayPage;
