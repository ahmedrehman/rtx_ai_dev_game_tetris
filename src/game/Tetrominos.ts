export interface TetrominoShape {
  shape: number[][];
  color: number;
  glowColor: number;
  name: string;
}

// Classic Tetris color scheme with neon glow colors
export const TETROMINOS: Record<string, TetrominoShape> = {
  I: {
    name: "I",
    color: 0x00fff5,
    glowColor: 0x00cccc,
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  O: {
    name: "O",
    color: 0xffff00,
    glowColor: 0xcccc00,
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  T: {
    name: "T",
    color: 0x9b59b6,
    glowColor: 0x7d3c98,
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  S: {
    name: "S",
    color: 0x39ff14,
    glowColor: 0x2ecc10,
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
  },
  Z: {
    name: "Z",
    color: 0xff0040,
    glowColor: 0xcc0033,
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  },
  J: {
    name: "J",
    color: 0x4444ff,
    glowColor: 0x3333cc,
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  L: {
    name: "L",
    color: 0xff6600,
    glowColor: 0xcc5200,
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
};

export const TETROMINO_KEYS = Object.keys(TETROMINOS);

export function getRandomTetromino(): TetrominoShape {
  const key = TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)];
  return TETROMINOS[key];
}

export function rotateCW(shape: number[][]): number[][] {
  const size = shape.length;
  const rotated: number[][] = [];
  for (let y = 0; y < size; y++) {
    rotated[y] = [];
    for (let x = 0; x < size; x++) {
      rotated[y][x] = shape[size - 1 - x][y];
    }
  }
  return rotated;
}

export function rotateCCW(shape: number[][]): number[][] {
  const size = shape.length;
  const rotated: number[][] = [];
  for (let y = 0; y < size; y++) {
    rotated[y] = [];
    for (let x = 0; x < size; x++) {
      rotated[y][x] = shape[x][size - 1 - y];
    }
  }
  return rotated;
}
