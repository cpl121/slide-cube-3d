'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const GameCanvas = dynamic(() => import('../components/GameCanvas'), { ssr: false });
import { UIControls } from '../components';
import { usePuzzle, useTimer } from '../hooks';
import { isSolved } from '../lib/puzzle';

const PlayPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  const size = parseInt(query.size as string) || 4;
  const seed = query.seed ? parseInt(query.seed as string) : '0';

  const [shouldUndo, setShouldUndo] = useState(true);
  const {
    board,
    moveCount,
    moveTile,
    undo,
    reset: resetPuzzle,
  } = usePuzzle(size, Number(seed), setShouldUndo);
  const { start, pause, reset, timeElapsed } = useTimer();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    reset();
    start();
  }, [size, seed]);

  useEffect(() => {
    if (isSolved(board)) {
      pause();
      setShowModal(true);
    }
  }, [board]);

  const fullReset = () => {
    resetPuzzle();
    reset();
    setShouldUndo(true);
  };

  const closeModal = () => {
    setShowModal(false);
    fullReset();
    start();
  };

  return (
    <div className="flex flex-col h-screen">
      <UIControls
        moveCount={moveCount}
        timeElapsed={timeElapsed}
        onShuffle={() => {
          fullReset();
          start();
        }}
        onUndo={() => {
          undo();
          start();
        }}
        shouldUndo={shouldUndo}
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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-8 text-center">🎉 Congratulations! 🥳</h2>
            <div className="text-center flex flex-col space-y-2">
              <p className="text-2xl font-semibold">
                You solved this puzzle in <span className="text-blue-600">{timeElapsed}s</span> and{' '}
                <span className="text-blue-600">{moveCount}</span> moves!
              </p>
              <span className="font-semibold">
                Share your victory and challenge friends to beat your score! 🚀
              </span>
            </div>
            <div className="flex justify-center w-full space-x-2 mt-8">
              <button
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-300 w-full"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'SlideCube 3D Result',
                      text: `I solved SlideCube 3D in ${timeElapsed}s and ${moveCount} moves!`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
              >
                Share Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayPage;
