/**
 * game.js — Game loop, state machine, and score/level orchestration.
 * State machine: idle → playing ↔ paused → game-over
 */

import {
  BOARD_COLS,
  INITIAL_DROP_INTERVAL_MS,
  LINES_PER_LEVEL,
  LOCK_DELAY_MS,
  SCORE_HARD_DROP_CELL,
  SCORE_SINGLE,
  SCORE_DOUBLE,
  SCORE_TRIPLE,
  SCORE_TETRIS,
  SCORE_SOFT_DROP_CELL,
  SPEED_FACTOR,
  STATUS,
} from './constants.js';
import { createBoard, isValidPosition, lockPiece, clearLines } from './board.js';
import { TETROMINOES, TETROMINO_KEYS } from './tetrominos.js';

// ─── Score table ─────────────────────────────────────────────────────────────
const LINE_SCORE = [0, SCORE_SINGLE, SCORE_DOUBLE, SCORE_TRIPLE, SCORE_TETRIS];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function randomKey() {
  return TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)];
}

function spawnPiece(key) {
  const tetromino = TETROMINOES[key];
  const matrix    = tetromino.rotations[0];
  return {
    key,
    color:        tetromino.color,
    matrix,
    rotationIndex: 0,
    row:          -1, // start just above visible board
    col:          Math.floor((BOARD_COLS - matrix[0].length) / 2),
  };
}

function dropInterval(level) {
  return INITIAL_DROP_INTERVAL_MS * Math.pow(SPEED_FACTOR, level - 1);
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Creates a new game instance.
 * @param {Function} onStateChange - called each frame with the current state snapshot.
 * @returns {{ start, pause, resume, action, getState }}
 */
export function createGame(onStateChange) {
  let board        = createBoard();
  let currentPiece = null;
  let nextPieceKey = randomKey();
  let score        = 0;
  let level        = 1;
  let lines        = 0;
  let status       = STATUS.IDLE;
  let rafId        = null;
  let lastTime     = null;
  let dropAccum    = 0;
  let lockTimer    = null;

  // ── State snapshot ────────────────────────────────────────────────────────
  function getState() {
    return { board, currentPiece, nextPieceKey, score, level, lines, status };
  }

  function notify() {
    onStateChange(getState());
  }

  // ── Piece movement helpers ────────────────────────────────────────────────
  function tryMove(dRow, dCol) {
    const p = currentPiece;
    if (isValidPosition(p.matrix, p.row + dRow, p.col + dCol, board)) {
      p.row += dRow;
      p.col += dCol;
      return true;
    }
    return false;
  }

  function tryRotate() {
    const p    = currentPiece;
    const t    = TETROMINOES[p.key];
    const next = (p.rotationIndex + 1) % t.rotations.length;
    const mat  = t.rotations[next];
    // Try normal position, then wall-kick left and right
    for (const kick of [0, 1, -1, 2, -2]) {
      if (isValidPosition(mat, p.row, p.col + kick, board)) {
        p.matrix        = mat;
        p.rotationIndex = next;
        p.col           += kick;
        return true;
      }
    }
    return false;
  }

  function atBottom() {
    const p = currentPiece;
    return !isValidPosition(p.matrix, p.row + 1, p.col, board);
  }

  function lock() {
    lockPiece(currentPiece.matrix, currentPiece.row, currentPiece.col, currentPiece.color, board);
    const cleared = clearLines(board);
    if (cleared > 0) {
      const base = LINE_SCORE[cleared] ?? SCORE_TETRIS;
      score += base * level;
      lines += cleared;
      level  = Math.floor(lines / LINES_PER_LEVEL) + 1;
    }
    spawnNext();
  }

  function spawnNext() {
    const key    = nextPieceKey;
    nextPieceKey = randomKey();
    currentPiece = spawnPiece(key);
    if (!isValidPosition(currentPiece.matrix, currentPiece.row, currentPiece.col, board)) {
      status = STATUS.GAME_OVER;
      cancelAnimationFrame(rafId);
    }
  }

  // ── Game loop ─────────────────────────────────────────────────────────────
  function loop(timestamp) {
    if (status !== STATUS.PLAYING) return;
    if (lastTime === null) lastTime = timestamp;
    const delta = timestamp - lastTime;
    lastTime    = timestamp;

    dropAccum += delta;
    const interval = dropInterval(level);

    if (dropAccum >= interval) {
      dropAccum -= interval;
      if (!tryMove(1, 0)) {
        // Piece has landed — start lock delay
        if (lockTimer === null) {
          lockTimer = setTimeout(() => {
            lockTimer = null;
            if (status === STATUS.PLAYING) {
              lock();
              notify();
            }
          }, LOCK_DELAY_MS);
        }
      } else if (lockTimer !== null) {
        // Piece moved down successfully — cancel pending lock
        clearTimeout(lockTimer);
        lockTimer = null;
      }
    }

    notify();
    rafId = requestAnimationFrame(loop);
  }

  // ── Public methods ────────────────────────────────────────────────────────
  function start() {
    board        = createBoard();
    score        = 0;
    level        = 1;
    lines        = 0;
    nextPieceKey = randomKey();
    status       = STATUS.PLAYING;
    lastTime     = null;
    dropAccum    = 0;
    spawnNext();
    rafId = requestAnimationFrame(loop);
  }

  function pause() {
    if (status !== STATUS.PLAYING) return;
    status = STATUS.PAUSED;
    cancelAnimationFrame(rafId);
    if (lockTimer !== null) { clearTimeout(lockTimer); lockTimer = null; }
    notify();
  }

  function resume() {
    if (status !== STATUS.PAUSED) return;
    status   = STATUS.PLAYING;
    lastTime = null;
    rafId    = requestAnimationFrame(loop);
    notify();
  }

  /**
   * Handle a game action from the input layer.
   * @param {string} action - one of: moveLeft, moveRight, rotate, softDrop,
   *                          hardDrop, pause
   */
  function action(act) {
    if (status === STATUS.PAUSED && act === 'pause') { resume(); return; }
    if (status !== STATUS.PLAYING) return;

    switch (act) {
      case 'moveLeft':  tryMove(0, -1); break;
      case 'moveRight': tryMove(0,  1); break;
      case 'rotate':    tryRotate();    break;
      case 'softDrop':
        if (tryMove(1, 0)) {
          score      += SCORE_SOFT_DROP_CELL;
          dropAccum   = 0; // reset gravity timer
        }
        break;
      case 'hardDrop': {
        let dropped = 0;
        while (tryMove(1, 0)) dropped++;
        score += dropped * SCORE_HARD_DROP_CELL;
        if (lockTimer !== null) { clearTimeout(lockTimer); lockTimer = null; }
        lock();
        break;
      }
      case 'pause': pause(); break;
    }
    notify();
  }

  return { start, pause, resume, action, getState };
}
