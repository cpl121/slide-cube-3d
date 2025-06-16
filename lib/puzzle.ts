// Utility functions and puzzle logic for the sliding puzzle
// Each board is represented as a flat array of numbers where 0 is the empty tile.
import seedrandom from 'seedrandom';

/**
 * Generate a solved puzzle board for a square grid of the given size.
 * The board will contain numbers from 1 to size*size - 1 with 0 as the last tile.
 */
export function generateSolvedBoard(size: number): number[] {
  const last = size * size;
  // create an array [1, 2, ..., last - 1, 0]
  const board = Array.from({ length: last - 1 }, (_, i) => i + 1);
  board.push(0);
  return board;
}

/** Count the number of inversions in the board (ignoring the zero tile). */
function countInversions(board: number[]): number {
  let inversions = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === 0) continue;
    for (let j = i + 1; j < board.length; j++) {
      if (board[j] !== 0 && board[i] > board[j]) inversions++;
    }
  }
  return inversions;
}

/** Determine whether a board configuration is solvable. */
function isSolvable(board: number[], size: number): boolean {
  const inversions = countInversions(board);
  if (size % 2 === 1) {
    // Odd sized boards are solvable if the inversion count is even.
    return inversions % 2 === 0;
  }
  // Even grid: use blank row counting from the bottom (starting at 1).
  const blankIndex = board.indexOf(0);
  const blankRowFromBottom = size - Math.floor(blankIndex / size);
  if (blankRowFromBottom % 2 === 0) {
    return inversions % 2 === 1;
  }
  return inversions % 2 === 0;
}

/**
 * Shuffle the board with a random permutation that is guaranteed to be solvable.
 * The returned array is a new instance.
 */
export function shuffleBoard(board: number[], prng: () => number): number[] {
  const size = Math.sqrt(board.length);
  if (!Number.isInteger(size)) {
    throw new Error('Board length must be a perfect square');
  }
  let result: number[] = [];
  do {
    result = [...board];
    // Fisher–Yates shuffle
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(prng() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
  } while (!isSolvable(result, size) || isSolved(result));
  return result;
}

/**
 * Check whether the tile at the given index can move into the empty space.
 */
export function canMove(board: number[], index: number, size: number): boolean {
  const zeroIndex = board.indexOf(0);
  const row = Math.floor(index / size);
  const col = index % size;
  const zeroRow = Math.floor(zeroIndex / size);
  const zeroCol = zeroIndex % size;
  // Manhattan distance of 1 means the tile is adjacent to the blank
  return Math.abs(row - zeroRow) + Math.abs(col - zeroCol) === 1;
}

/**
 * Move the tile at the given index if it can move; otherwise return the board unchanged.
 * Returns a new board array when the move is possible.
 */
export function moveTile(board: number[], index: number, size: number): number[] {
  if (!canMove(board, index, size)) return board;
  const zeroIndex = board.indexOf(0);
  const newBoard = [...board];
  [newBoard[index], newBoard[zeroIndex]] = [newBoard[zeroIndex], newBoard[index]];
  return newBoard;
}

/** Determine whether the board is in a solved state. */
export function isSolved(board: number[]): boolean {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== i + 1) return false;
  }
  return board[board.length - 1] === 0;
}

export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};
