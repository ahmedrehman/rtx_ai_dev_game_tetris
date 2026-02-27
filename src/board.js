/**
 * board.js — Board state management.
 * Responsibilities: create the grid, collision detection, piece locking,
 * and line clearing.  No knowledge of the game loop, score, or rendering.
 */

import { BOARD_COLS, BOARD_ROWS } from './constants.js';

/**
 * Creates and returns a fresh empty board.
 * @returns {Array<Array<string|null>>} 2-D array [row][col], null = empty.
 */
export function createBoard() {
  return Array.from({ length: BOARD_ROWS }, () => Array(BOARD_COLS).fill(null));
}

/**
 * Tests whether the given piece matrix fits at (pieceRow, pieceCol) on board.
 * @param {Array<Array<number>>} matrix - Rotation matrix of the piece.
 * @param {number} pieceRow
 * @param {number} pieceCol
 * @param {Array<Array<string|null>>} board
 * @returns {boolean}
 */
export function isValidPosition(matrix, pieceRow, pieceCol, board) {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (!matrix[r][c]) continue; // empty cell in matrix
      const boardRow = pieceRow + r;
      const boardCol = pieceCol + c;
      if (boardRow < 0) continue; // above board top is fine during spawn
      if (boardRow >= BOARD_ROWS) return false; // below floor
      if (boardCol < 0 || boardCol >= BOARD_COLS) return false; // out of sides
      if (board[boardRow][boardCol] !== null) return false; // cell occupied
    }
  }
  return true;
}

/**
 * Stamps the current piece onto the board (mutates the board in place).
 * @param {Array<Array<number>>} matrix
 * @param {number} pieceRow
 * @param {number} pieceCol
 * @param {string} color
 * @param {Array<Array<string|null>>} board
 */
export function lockPiece(matrix, pieceRow, pieceCol, color, board) {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (!matrix[r][c]) continue;
      const boardRow = pieceRow + r;
      const boardCol = pieceCol + c;
      if (boardRow >= 0 && boardRow < BOARD_ROWS) {
        board[boardRow][boardCol] = color;
      }
    }
  }
}

/**
 * Scans the board for full rows, removes them, and shifts remaining rows down.
 * @param {Array<Array<string|null>>} board - mutated in place
 * @returns {number} count of lines cleared
 */
export function clearLines(board) {
  let cleared = 0;
  for (let r = BOARD_ROWS - 1; r >= 0; r--) {
    if (board[r].every(cell => cell !== null)) {
      board.splice(r, 1);
      board.unshift(Array(BOARD_COLS).fill(null));
      cleared++;
      r++; // re-check same row index after shift
    }
  }
  return cleared;
}
