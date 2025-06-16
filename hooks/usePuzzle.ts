import { useState, useCallback } from 'react';
import { generateSolvedBoard, shuffleBoard, moveTile as moveTileOnBoard } from '../lib/puzzle';

export interface PuzzleHook {
  board: number[];
  moveCount: number;
  moveTile: (index: number) => void;
  undo: () => void;
  reset: () => void;
}

export function usePuzzle(size: number, seed?: number): PuzzleHook {
  const createBoard = useCallback(() => {
    return shuffleBoard(generateSolvedBoard(size));
  }, [size]);

  const [board, setBoard] = useState<number[]>(createBoard);
  const [history, setHistory] = useState<number[][]>([]);
  const [moveCount, setMoveCount] = useState(0);

  const moveTile = useCallback(
    (index: number) => {
      setBoard((prevBoard) => {
        const nextBoard = moveTileOnBoard(prevBoard, index, size);
        if (nextBoard === prevBoard) return prevBoard;
        setHistory((prevHistory) => [...prevHistory, prevBoard]);
        setMoveCount((c) => c + 1);
        return nextBoard;
      });
    },
    [size],
  );

  const undo = useCallback(() => {
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) return prevHistory;
      const newHistory = prevHistory.slice(0, -1);
      const lastBoard = prevHistory[prevHistory.length - 1];
      setBoard(lastBoard);
      setMoveCount((c) => Math.max(0, c - 1));
      return newHistory;
    });
  }, []);

  const reset = useCallback(() => {
    const newBoard = createBoard();
    setBoard(newBoard);
    setHistory([]);
    setMoveCount(0);
  }, [createBoard]);

  return {
    board,
    moveCount,
    moveTile,
    undo,
    reset,
  };
}
