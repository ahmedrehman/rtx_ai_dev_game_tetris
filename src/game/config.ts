import { BOARD_WIDTH, BOARD_HEIGHT } from "./Board";

export const CELL_SIZE = 24;
export const GRID_LINE_WIDTH = 1;
export const GRID_LINE_COLOR = 0x1a1a3e;
export const GRID_LINE_ALPHA = 0.5;

export const GAME_WIDTH = BOARD_WIDTH * CELL_SIZE;
export const GAME_HEIGHT = BOARD_HEIGHT * CELL_SIZE;

// Scoring (NES-style)
export const SCORE_TABLE: Record<number, number> = {
  1: 100,
  2: 300,
  3: 500,
  4: 800,
};

// Speed: ms per drop, indexed by level (NES-style curve)
export const LEVEL_SPEEDS: number[] = [
  800,  // Level 0
  720,  // Level 1
  630,  // Level 2
  550,  // Level 3
  470,  // Level 4
  380,  // Level 5
  300,  // Level 6
  220,  // Level 7
  130,  // Level 8
  100,  // Level 9
  80,   // Level 10
  80,   // Level 11
  80,   // Level 12
  70,   // Level 13
  70,   // Level 14
  70,   // Level 15
  50,   // Level 16
  50,   // Level 17
  50,   // Level 18
  30,   // Level 19
  30,   // Level 20+
];

export function getDropSpeed(level: number): number {
  if (level >= LEVEL_SPEEDS.length) {
    return LEVEL_SPEEDS[LEVEL_SPEEDS.length - 1];
  }
  return LEVEL_SPEEDS[level];
}

export const LINES_PER_LEVEL = 10;
export const SOFT_DROP_SPEED = 50;
export const LOCK_DELAY = 500;
export const DAS_DELAY = 170;   // Delayed auto-shift initial delay
export const DAS_REPEAT = 50;   // Delayed auto-shift repeat rate
