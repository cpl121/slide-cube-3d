import { useState, useCallback, useEffect } from 'react';
import seedrandom from 'seedrandom';
import {
  generateSolvedBoard,
  shuffleBoard,
  moveTile as moveTileOnBoard,
  canMove,
} from '../lib/puzzle';

/**
 * Return type of the usePuzzle hook.
 */
export interface PuzzleHook {
  board: number[];
  moveCount: number;
  moveTile(index: number): boolean;
  undo(): void;
  reset(): void;
}

/**
 * Hook managing the sliding puzzle state. A new puzzle is created whenever
 * `size` or `seed` changes.
 */
export function usePuzzle(size: number, seed?: number): PuzzleHook {
  const [board, setBoard] = useState<number[]>([]);
  const [history, setHistory] = useState<number[][]>([]);
  const [moveCount, setMoveCount] = useState(0);

  // Initialize the puzzle using the provided size and seed.
  const initialize = useCallback(() => {
    const prng = seed !== undefined ? seedrandom(seed.toString()) : Math.random;
    const initialBoard = shuffleBoard(generateSolvedBoard(size), prng);
    setBoard(initialBoard);
    setHistory([]);
    setMoveCount(0);
  }, [size, seed]);

  // Recreate the puzzle whenever size or seed change.
  useEffect(() => {
    initialize();
  }, [initialize]);

  /**
   * Attempt to move the tile at the given index. Returns true when a move was
   * performed and false otherwise.
   */
  const moveTile = useCallback(
    (index: number): boolean => {
      let moved = false;
      setBoard(prevBoard => {
        if (!canMove(prevBoard, index, size)) {
          return prevBoard;
        }
        const nextBoard = moveTileOnBoard(prevBoard, index, size);
        setHistory(prevHistory => [...prevHistory, prevBoard]);
        moved = true;
        return nextBoard;
      });
      if (moved) {
        setMoveCount(prev => prev + 1);
      }
      return moved;
    },
    [size],
  );

  /** Undo the last move if possible. */
  const undo = useCallback(() => {
    setHistory(prevHistory => {
      if (prevHistory.length === 0) return prevHistory;
      const newHistory = prevHistory.slice(0, -1);
      const lastBoard = prevHistory[prevHistory.length - 1];
      setBoard(lastBoard);
      setMoveCount(prev => Math.max(0, prev - 1));
      return newHistory;
    });
  }, []);

  /** Reset the puzzle to a new shuffled state. */
  const reset = useCallback(() => {
    initialize();
  }, [initialize]);

  return { board, moveCount, moveTile, undo, reset };
}
