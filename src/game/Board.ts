export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export type CellColor = number | null;

export class Board {
  grid: CellColor[][];

  constructor() {
    this.grid = this.createEmptyGrid();
  }

  private createEmptyGrid(): CellColor[][] {
    const grid: CellColor[][] = [];
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      grid[y] = new Array(BOARD_WIDTH).fill(null);
    }
    return grid;
  }

  reset(): void {
    this.grid = this.createEmptyGrid();
  }

  isValidPosition(shape: number[][], offsetX: number, offsetY: number): boolean {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] === 0) continue;

        const boardX = offsetX + x;
        const boardY = offsetY + y;

        // Out of bounds
        if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
          return false;
        }

        // Above the board is ok (for spawning)
        if (boardY < 0) continue;

        // Collision with existing block
        if (this.grid[boardY][boardX] !== null) {
          return false;
        }
      }
    }
    return true;
  }

  lockPiece(shape: number[][], offsetX: number, offsetY: number, color: number): void {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] === 0) continue;

        const boardX = offsetX + x;
        const boardY = offsetY + y;

        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          this.grid[boardY][boardX] = color;
        }
      }
    }
  }

  clearLines(): number {
    let linesCleared = 0;

    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (this.isLineFull(y)) {
        this.removeLine(y);
        linesCleared++;
        y++; // Recheck this row since lines shifted down
      }
    }

    return linesCleared;
  }

  getFullLines(): number[] {
    const lines: number[] = [];
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      if (this.isLineFull(y)) {
        lines.push(y);
      }
    }
    return lines;
  }

  private isLineFull(y: number): boolean {
    return this.grid[y].every((cell) => cell !== null);
  }

  private removeLine(y: number): void {
    // Remove the full line
    this.grid.splice(y, 1);
    // Add empty line at top
    this.grid.unshift(new Array(BOARD_WIDTH).fill(null));
  }

  getGhostY(shape: number[][], offsetX: number, offsetY: number): number {
    let ghostY = offsetY;
    while (this.isValidPosition(shape, offsetX, ghostY + 1)) {
      ghostY++;
    }
    return ghostY;
  }
}
