'use client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const GameCanvas = dynamic(() => import('../components/GameCanvas'), { ssr: false });
import { UIControls, VictoryPopup } from '../components';
import { usePuzzle, useTimer } from '../hooks';
import { isSolved } from '../lib/puzzle';

const PlayPage: NextPage = () => {
  const { query } = useRouter();

  const size = parseInt(query.size as string) || 4;
  const seed = query.seed ? parseInt(query.seed as string) : undefined;

  const { board, moveCount, moveTile, undo, reset } = usePuzzle(size, seed);
  const { timeElapsed, start, pause, reset: resetTimer } = useTimer();
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (isSolved(board)) {
      pause();
      setShowVictory(true);
    }
  }, [board]);

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
      {showVictory && (
        <VictoryPopup
          moveCount={moveCount}
          timeElapsed={timeElapsed}
          onClose={() => setShowVictory(false)}
        />
      )}
    </div>
  );
};

export default PlayPage;
