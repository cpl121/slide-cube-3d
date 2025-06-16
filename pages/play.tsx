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
  const { board, moveCount, moveTile, undo, reset } = usePuzzle(size, Number(seed), setShouldUndo);
  const { timeElapsed, start, pause, reset: resetTimer } = useTimer();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (isSolved(board)) {
      pause();
      setShowModal(true);
    }
  }, [board]);

  const fullReset = () => {
    reset()
    resetTimer()
    setShouldUndo(true)
  }

  const closeModal = () => {
    setShowModal(false)
    fullReset()
  }

  return (
    <div className="flex flex-col h-screen">
      <UIControls
        moveCount={moveCount}
        timeElapsed={timeElapsed}
        onShuffle={() => {
          fullReset()
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
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="mb-6">
              You solved it in {timeElapsed} seconds and {moveCount / 2} moves.
            </p>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'SlideCube 3D Result',
                      text: `I solved SlideCube 3D in ${timeElapsed}s and ${moveCount / 2} moves!`,
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
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayPage;
