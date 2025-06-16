import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { UIControls } from '../components';
import { usePuzzle, useTimer } from '../hooks';
import { isSolved } from '../lib/puzzle';

const GameCanvas = dynamic(() => import('../components/GameCanvas'), {
  ssr: false,
});

const PlayPage = () => {
  const { query } = useRouter();

  const size = parseInt(query.size as string) || 4;
  const seed = query.seed ? parseInt(query.seed as string) : undefined;

  const { board, moveCount, moveTile, undo, reset: shuffle } = usePuzzle(
    size,
    seed,
  );
  const { timeElapsed, start, pause, reset: resetTimer } = useTimer();

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (isSolved(board)) {
      pause();
    }
  }, [board, pause]);

  const onShuffle = () => {
    shuffle();
    resetTimer();
    start();
  };

  const onUndo = () => {
    undo();
  };

  return (
    <div className="flex flex-col h-screen">
      <UIControls
        onShuffle={onShuffle}
        onUndo={onUndo}
        moveCount={moveCount}
        timeElapsed={timeElapsed}
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
