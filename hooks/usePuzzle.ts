import { useState, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import seedrandom from 'seedrandom';
import { generateSolvedBoard, shuffleBoard, moveTile as moveTileOnBoard } from '../lib/puzzle';

export interface PuzzleHook {
  board: number[];
  moveCount: number;
  moveTile: (index: number) => void;
  undo: () => void;
  reset: () => void;
}

/**
 * Hook managing the sliding puzzle state.
 * It reinitializes whenever `size` or `seed` changes.
 */
export function usePuzzle(size: number, seed: number, setShouldUndo: Dispatch<SetStateAction<boolean>>): PuzzleHook {
  const [board, setBoard] = useState<number[]>([]);
  const [_, setHistory] = useState<number[][]>([]);
  const [moveCount, setMoveCount] = useState(0);

  const initialize = useCallback(() => {
    const prng = seed !== undefined ? seedrandom(seed.toString()) : Math.random;
    const initialBoard = shuffleBoard(generateSolvedBoard(size), prng);
    setBoard(initialBoard);
    setHistory([]);
    setMoveCount(0);
  }, [size, seed]);

  // Generate a fresh puzzle when the hook mounts or when size/seed change.
  useEffect(() => {
    initialize();
  }, [initialize]);

  const moveTile = useCallback(
    (index: number) => {
      setShouldUndo(false)
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
    setShouldUndo(true)
  }, []);

  const reset = useCallback(() => {
    initialize();
  }, [initialize]);

  return {
    board,
    moveCount,
    moveTile,
    undo,
    reset,
  };
}
