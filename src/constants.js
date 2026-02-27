/**
 * constants.js — Single source of truth for all game rules and tunable values.
 * See PLANNING.md §3 for the full Business Rules table.
 */

export const BOARD_COLS = 10;
export const BOARD_ROWS = 20;
export const CELL_SIZE  = 30; // pixels

// Timing
export const INITIAL_DROP_INTERVAL_MS = 800;
export const SPEED_FACTOR             = 0.85; // multiplied each level
export const LOCK_DELAY_MS            = 500;
export const DAS_DELAY_MS             = 150;  // delayed auto-shift
export const ARR_MS                   = 50;   // auto-repeat rate

// Progression
export const LINES_PER_LEVEL = 10;

// Scoring (multiplied by current level)
export const SCORE_SINGLE           = 100;
export const SCORE_DOUBLE           = 300;
export const SCORE_TRIPLE           = 500;
export const SCORE_TETRIS           = 800;
export const SCORE_HARD_DROP_CELL   = 2;   // per cell dropped
export const SCORE_SOFT_DROP_CELL   = 1;   // per cell dropped

// Game status strings
export const STATUS = Object.freeze({
  IDLE:      'idle',
  PLAYING:   'playing',
  PAUSED:    'paused',
  GAME_OVER: 'game-over',
});
