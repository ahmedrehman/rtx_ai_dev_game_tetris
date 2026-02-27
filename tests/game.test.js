/**
 * game.test.js — Unit tests for board logic and game business rules.
 * Covers: collision detection, line clearing, scoring per line count.
 */

import { createBoard, isValidPosition, lockPiece, clearLines } from '../src/board.js';
import {
  BOARD_COLS,
  BOARD_ROWS,
  SCORE_SINGLE,
  SCORE_DOUBLE,
  SCORE_TRIPLE,
  SCORE_TETRIS,
} from '../src/constants.js';

// ── createBoard ─────────────────────────────────────────────────────────────
describe('createBoard', () => {
  test('returns a board with BOARD_ROWS rows', () => {
    expect(createBoard().length).toBe(BOARD_ROWS);
  });

  test('every row has BOARD_COLS columns', () => {
    createBoard().forEach(row => expect(row.length).toBe(BOARD_COLS));
  });

  test('all cells are null (empty)', () => {
    createBoard().flat().forEach(cell => expect(cell).toBeNull());
  });
});

// ── isValidPosition ─────────────────────────────────────────────────────────
describe('isValidPosition', () => {
  const board  = createBoard();
  const single = [[1]]; // 1×1 piece

  test('centre of empty board is valid', () => {
    expect(isValidPosition(single, 5, 5, board)).toBe(true);
  });

  test('bottom row is valid', () => {
    expect(isValidPosition(single, BOARD_ROWS - 1, 0, board)).toBe(true);
  });

  test('below the floor is invalid', () => {
    expect(isValidPosition(single, BOARD_ROWS, 0, board)).toBe(false);
  });

  test('left wall is invalid', () => {
    expect(isValidPosition(single, 0, -1, board)).toBe(false);
  });

  test('right wall is invalid', () => {
    expect(isValidPosition(single, 0, BOARD_COLS, board)).toBe(false);
  });

  test('occupied cell is invalid', () => {
    const b = createBoard();
    b[5][5] = '#ff0000';
    expect(isValidPosition(single, 5, 5, b)).toBe(false);
  });

  test('above the top (row < 0) is valid — spawn area', () => {
    expect(isValidPosition(single, -1, 0, board)).toBe(true);
  });
});

// ── lockPiece ────────────────────────────────────────────────────────────────
describe('lockPiece', () => {
  test('stamps colour onto board at correct position', () => {
    const b      = createBoard();
    const matrix = [[1, 1], [1, 0]];
    lockPiece(matrix, 0, 0, '#00f', b);
    expect(b[0][0]).toBe('#00f');
    expect(b[0][1]).toBe('#00f');
    expect(b[1][0]).toBe('#00f');
    expect(b[1][1]).toBeNull();
  });

  test('does not stamp cells outside board boundaries', () => {
    const b = createBoard();
    lockPiece([[1]], -1, 0, '#f00', b); // row -1 is above board
    expect(b[0][0]).toBeNull();
  });
});

// ── clearLines ───────────────────────────────────────────────────────────────
describe('clearLines', () => {
  function filledRow() {
    return Array(BOARD_COLS).fill('#fff');
  }

  test('returns 0 when no lines are full', () => {
    expect(clearLines(createBoard())).toBe(0);
  });

  test('clears one full row and returns 1', () => {
    const b = createBoard();
    b[BOARD_ROWS - 1] = filledRow();
    expect(clearLines(b)).toBe(1);
    expect(b[BOARD_ROWS - 1].every(c => c === null)).toBe(true);
  });

  test('clears two full rows and returns 2', () => {
    const b = createBoard();
    b[BOARD_ROWS - 1] = filledRow();
    b[BOARD_ROWS - 2] = filledRow();
    expect(clearLines(b)).toBe(2);
  });

  test('shifts rows down after clearing', () => {
    const b = createBoard();
    b[BOARD_ROWS - 2][0] = '#abc'; // marker above full row
    b[BOARD_ROWS - 1]    = filledRow();
    clearLines(b);
    // marker should have shifted to the last row
    expect(b[BOARD_ROWS - 1][0]).toBe('#abc');
  });

  test('board size stays BOARD_ROWS after clearing', () => {
    const b = createBoard();
    b[BOARD_ROWS - 1] = filledRow();
    clearLines(b);
    expect(b.length).toBe(BOARD_ROWS);
  });

  test('clears 4 lines (Tetris) and returns 4', () => {
    const b = createBoard();
    for (let i = BOARD_ROWS - 4; i < BOARD_ROWS; i++) b[i] = filledRow();
    expect(clearLines(b)).toBe(4);
  });
});

// ── Score constants ───────────────────────────────────────────────────────────
describe('score constants', () => {
  test('values match planning doc', () => {
    expect(SCORE_SINGLE).toBe(100);
    expect(SCORE_DOUBLE).toBe(300);
    expect(SCORE_TRIPLE).toBe(500);
    expect(SCORE_TETRIS).toBe(800);
  });

  test('scoring increases with more lines cleared', () => {
    expect(SCORE_SINGLE).toBeLessThan(SCORE_DOUBLE);
    expect(SCORE_DOUBLE).toBeLessThan(SCORE_TRIPLE);
    expect(SCORE_TRIPLE).toBeLessThan(SCORE_TETRIS);
  });
});
