import Phaser from "phaser";
import { Board, BOARD_WIDTH, BOARD_HEIGHT } from "./Board";
import {
  TetrominoShape,
  getRandomTetromino,
  rotateCW,
  rotateCCW,
} from "./Tetrominos";
import {
  CELL_SIZE,
  GAME_WIDTH,
  GAME_HEIGHT,
  GRID_LINE_COLOR,
  GRID_LINE_ALPHA,
  SCORE_TABLE,
  getDropSpeed,
  LINES_PER_LEVEL,
  SOFT_DROP_SPEED,
  LOCK_DELAY,
  DAS_DELAY,
  DAS_REPEAT,
} from "./config";
import { audio } from "./Audio";

// Wall kick offsets for SRS (Super Rotation System)
const WALL_KICKS: number[][][] = [
  [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
];

const I_WALL_KICKS: number[][][] = [
  [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
  [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
  [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
  [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
];

export type GameState = "idle" | "playing" | "paused" | "gameover";

interface GameCallbacks {
  onScoreChange: (score: number) => void;
  onLevelChange: (level: number) => void;
  onLinesChange: (lines: number) => void;
  onStateChange: (state: GameState) => void;
  onNextPiece: (piece: TetrominoShape) => void;
}

export class GameScene extends Phaser.Scene {
  private board!: Board;
  private boardGraphics!: Phaser.GameObjects.Graphics;
  private pieceGraphics!: Phaser.GameObjects.Graphics;
  private ghostGraphics!: Phaser.GameObjects.Graphics;
  private flashGraphics!: Phaser.GameObjects.Graphics;

  private currentPiece!: TetrominoShape;
  private currentShape!: number[][];
  private pieceX!: number;
  private pieceY!: number;
  private rotationState!: number;

  private nextPiece!: TetrominoShape;
  private bag: TetrominoShape[] = [];

  private score = 0;
  private level = 0;
  private lines = 0;
  private gameState: GameState = "idle";

  private dropTimer = 0;
  private lockTimer = 0;
  private isLocking = false;

  private softDropping = false;

  // DAS (Delayed Auto-Shift) state
  private dasDirection: number = 0;
  private dasTimer: number = 0;
  private dasActive: boolean = false;

  private callbacks!: GameCallbacks;

  constructor() {
    super({ key: "GameScene" });
  }

  init(data: { callbacks: GameCallbacks }): void {
    this.callbacks = data.callbacks;
  }

  create(): void {
    this.board = new Board();

    // Create graphics layers
    this.boardGraphics = this.add.graphics();
    this.ghostGraphics = this.add.graphics();
    this.pieceGraphics = this.add.graphics();
    this.flashGraphics = this.add.graphics();

    this.drawGrid();
    this.setupInput();
  }

  private drawGrid(): void {
    const g = this.add.graphics();
    g.lineStyle(1, GRID_LINE_COLOR, GRID_LINE_ALPHA);

    // Vertical lines
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      g.lineBetween(x * CELL_SIZE, 0, x * CELL_SIZE, GAME_HEIGHT);
    }
    // Horizontal lines
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      g.lineBetween(0, y * CELL_SIZE, GAME_WIDTH, y * CELL_SIZE);
    }
  }

  private setupInput(): void {
    if (!this.input.keyboard) return;

    // Rotation
    this.input.keyboard.on("keydown-UP", () => this.tryRotate(1));
    this.input.keyboard.on("keydown-X", () => this.tryRotate(1));
    this.input.keyboard.on("keydown-Z", () => this.tryRotate(-1));

    // Hard drop
    this.input.keyboard.on("keydown-SPACE", () => this.hardDrop());

    // Pause
    this.input.keyboard.on("keydown-P", () => this.togglePause());
    this.input.keyboard.on("keydown-ESC", () => this.togglePause());

    // Movement with DAS
    this.input.keyboard.on("keydown-LEFT", () => {
      if (this.gameState !== "playing") return;
      if (this.movePiece(-1, 0)) audio.playMove();
      this.dasDirection = -1;
      this.dasTimer = 0;
      this.dasActive = false;
    });

    this.input.keyboard.on("keydown-RIGHT", () => {
      if (this.gameState !== "playing") return;
      if (this.movePiece(1, 0)) audio.playMove();
      this.dasDirection = 1;
      this.dasTimer = 0;
      this.dasActive = false;
    });

    this.input.keyboard.on("keyup-LEFT", () => {
      if (this.dasDirection === -1) this.dasDirection = 0;
    });

    this.input.keyboard.on("keyup-RIGHT", () => {
      if (this.dasDirection === 1) this.dasDirection = 0;
    });

    // Soft drop
    this.input.keyboard.on("keydown-DOWN", () => {
      this.softDropping = true;
    });

    this.input.keyboard.on("keyup-DOWN", () => {
      this.softDropping = false;
    });
  }

  startGame(): void {
    this.board.reset();
    this.score = 0;
    this.level = 0;
    this.lines = 0;
    this.dropTimer = 0;
    this.lockTimer = 0;
    this.isLocking = false;
    this.softDropping = false;
    this.dasDirection = 0;
    this.bag = [];

    this.callbacks.onScoreChange(0);
    this.callbacks.onLevelChange(0);
    this.callbacks.onLinesChange(0);

    this.gameState = "playing";
    this.callbacks.onStateChange("playing");

    audio.startMusic();

    this.nextPiece = this.getNextFromBag();
    this.spawnPiece();
  }

  private getNextFromBag(): TetrominoShape {
    if (this.bag.length === 0) {
      this.bag = this.generateBag();
    }
    return this.bag.pop()!;
  }

  private generateBag(): TetrominoShape[] {
    const pieces = [
      getRandomTetromino(),
      getRandomTetromino(),
      getRandomTetromino(),
      getRandomTetromino(),
      getRandomTetromino(),
      getRandomTetromino(),
      getRandomTetromino(),
    ];
    // Fisher-Yates shuffle
    for (let i = pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    return pieces;
  }

  private spawnPiece(): void {
    this.currentPiece = this.nextPiece;
    this.currentShape = this.currentPiece.shape.map((row) => [...row]);
    this.rotationState = 0;

    // Center piece horizontally, start just above board
    this.pieceX = Math.floor((BOARD_WIDTH - this.currentShape[0].length) / 2);
    this.pieceY = 0;

    this.nextPiece = this.getNextFromBag();
    this.callbacks.onNextPiece(this.nextPiece);

    this.isLocking = false;
    this.lockTimer = 0;

    // Game over: if new piece overlaps existing blocks at spawn position
    if (!this.board.isValidPosition(this.currentShape, this.pieceX, this.pieceY)) {
      this.gameOver();
    }
  }

  private movePiece(dx: number, dy: number): boolean {
    if (this.gameState !== "playing") return false;

    const newX = this.pieceX + dx;
    const newY = this.pieceY + dy;

    if (this.board.isValidPosition(this.currentShape, newX, newY)) {
      this.pieceX = newX;
      this.pieceY = newY;

      // Reset lock delay on successful move
      if (this.isLocking && dy === 0) {
        this.lockTimer = 0;
      }

      return true;
    }
    return false;
  }

  private tryRotate(direction: number): void {
    if (this.gameState !== "playing") return;

    const newShape = direction === 1
      ? rotateCW(this.currentShape)
      : rotateCCW(this.currentShape);

    const isIPiece = this.currentPiece.name === "I";
    const kicks = isIPiece ? I_WALL_KICKS : WALL_KICKS;
    const kickIndex = direction === 1 ? this.rotationState : ((this.rotationState + 3) % 4);

    for (const [dx, dy] of kicks[kickIndex]) {
      if (this.board.isValidPosition(newShape, this.pieceX + dx, this.pieceY - dy)) {
        this.currentShape = newShape;
        this.pieceX += dx;
        this.pieceY -= dy;
        this.rotationState = (this.rotationState + (direction === 1 ? 1 : 3)) % 4;

        // Reset lock delay on successful rotation
        if (this.isLocking) {
          this.lockTimer = 0;
        }
        audio.playRotate();
        return;
      }
    }
  }

  private hardDrop(): void {
    if (this.gameState !== "playing") return;

    let dropDistance = 0;
    while (this.board.isValidPosition(this.currentShape, this.pieceX, this.pieceY + 1)) {
      this.pieceY++;
      dropDistance++;
    }

    // Award 2 points per cell dropped
    this.addScore(dropDistance * 2);
    audio.playDrop();
    this.lockPiece();
  }

  private lockPiece(): void {
    // Check if any part of the piece is above the board - game over
    for (let y = 0; y < this.currentShape.length; y++) {
      for (let x = 0; x < this.currentShape[y].length; x++) {
        if (this.currentShape[y][x] !== 0 && this.pieceY + y < 0) {
          this.gameOver();
          return;
        }
      }
    }

    this.board.lockPiece(this.currentShape, this.pieceX, this.pieceY, this.currentPiece.color);
    audio.playLock();

    // Check for line clears
    const fullLines = this.board.getFullLines();
    if (fullLines.length > 0) {
      if (fullLines.length === 4) {
        audio.playTetris();
      } else {
        audio.playLineClear();
      }
      this.flashLines(fullLines, () => {
        const cleared = this.board.clearLines();
        this.awardLineClear(cleared);
        this.spawnPiece();
      });
    } else {
      this.spawnPiece();
    }
  }

  private flashLines(lineRows: number[], onComplete: () => void): void {
    let flashes = 0;
    const maxFlashes = 4;
    const flashInterval = 60;

    const timer = this.time.addEvent({
      delay: flashInterval,
      callback: () => {
        flashes++;
        this.flashGraphics.clear();

        if (flashes % 2 === 1) {
          this.flashGraphics.fillStyle(0xffffff, 0.8);
          for (const row of lineRows) {
            this.flashGraphics.fillRect(0, row * CELL_SIZE, GAME_WIDTH, CELL_SIZE);
          }
        }

        if (flashes >= maxFlashes) {
          timer.destroy();
          this.flashGraphics.clear();
          onComplete();
        }
      },
      loop: true,
    });
  }

  private awardLineClear(linesCleared: number): void {
    if (linesCleared === 0) return;

    const points = (SCORE_TABLE[linesCleared] || 0) * (this.level + 1);
    this.addScore(points);

    this.lines += linesCleared;
    this.callbacks.onLinesChange(this.lines);

    // Level up
    const newLevel = Math.floor(this.lines / LINES_PER_LEVEL);
    if (newLevel > this.level) {
      this.level = newLevel;
      this.callbacks.onLevelChange(this.level);
    }
  }

  private addScore(points: number): void {
    this.score += points;
    this.callbacks.onScoreChange(this.score);
  }

  private togglePause(): void {
    if (this.gameState === "playing") {
      this.gameState = "paused";
      this.callbacks.onStateChange("paused");
      audio.stopMusic();
    } else if (this.gameState === "paused") {
      this.gameState = "playing";
      this.callbacks.onStateChange("playing");
      audio.startMusic();
    }
  }

  private gameOver(): void {
    this.gameState = "gameover";
    this.callbacks.onStateChange("gameover");
    audio.stopMusic();
    audio.playGameOver();
  }

  update(_time: number, delta: number): void {
    if (this.gameState !== "playing") {
      this.renderBoard();
      return;
    }

    // DAS (Delayed Auto-Shift)
    if (this.dasDirection !== 0) {
      this.dasTimer += delta;
      if (!this.dasActive && this.dasTimer >= DAS_DELAY) {
        this.dasActive = true;
        this.dasTimer = 0;
      }
      if (this.dasActive && this.dasTimer >= DAS_REPEAT) {
        if (this.movePiece(this.dasDirection, 0)) audio.playMove();
        this.dasTimer = 0;
      }
    }

    // Gravity / drop
    const speed = this.softDropping ? SOFT_DROP_SPEED : getDropSpeed(this.level);
    this.dropTimer += delta;

    if (this.dropTimer >= speed) {
      this.dropTimer = 0;

      if (!this.movePiece(0, 1)) {
        // Can't move down - start lock delay
        if (!this.isLocking) {
          this.isLocking = true;
          this.lockTimer = 0;
        }
      } else {
        // Successfully moved down
        if (this.softDropping) {
          this.addScore(1);
        }
        this.isLocking = false;
        this.lockTimer = 0;
      }
    }

    // Lock delay
    if (this.isLocking) {
      this.lockTimer += delta;
      if (this.lockTimer >= LOCK_DELAY) {
        if (!this.board.isValidPosition(this.currentShape, this.pieceX, this.pieceY + 1)) {
          this.lockPiece();
        }
        this.isLocking = false;
        this.lockTimer = 0;
      }
    }

    this.renderBoard();
  }

  private renderBoard(): void {
    this.boardGraphics.clear();
    this.pieceGraphics.clear();
    this.ghostGraphics.clear();

    // Draw locked blocks
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        const color = this.board.grid[y][x];
        if (color !== null) {
          this.drawBlock(this.boardGraphics, x, y, color, 1);
        }
      }
    }

    if (this.gameState !== "playing" && this.gameState !== "paused") return;

    // Draw ghost piece
    if (this.currentShape) {
      const ghostY = this.board.getGhostY(this.currentShape, this.pieceX, this.pieceY);
      if (ghostY !== this.pieceY) {
        for (let y = 0; y < this.currentShape.length; y++) {
          for (let x = 0; x < this.currentShape[y].length; x++) {
            if (this.currentShape[y][x] === 0) continue;
            const drawY = ghostY + y;
            if (drawY < 0) continue;
            this.drawBlock(this.ghostGraphics, this.pieceX + x, drawY, this.currentPiece.color, 0.2);
          }
        }
      }

      // Draw current piece
      for (let y = 0; y < this.currentShape.length; y++) {
        for (let x = 0; x < this.currentShape[y].length; x++) {
          if (this.currentShape[y][x] === 0) continue;
          const drawY = this.pieceY + y;
          if (drawY < 0) continue;
          this.drawBlock(this.pieceGraphics, this.pieceX + x, drawY, this.currentPiece.color, 1);
        }
      }
    }
  }

  private drawBlock(graphics: Phaser.GameObjects.Graphics, x: number, y: number, color: number, alpha: number): void {
    const px = x * CELL_SIZE;
    const py = y * CELL_SIZE;
    const inset = 1;
    const size = CELL_SIZE - inset * 2;

    // Main block fill
    graphics.fillStyle(color, alpha);
    graphics.fillRect(px + inset, py + inset, size, size);

    // Highlight (top-left bevel)
    const highlight = Phaser.Display.Color.IntegerToColor(color);
    const lighter = Phaser.Display.Color.GetColor(
      Math.min(255, highlight.red + 60),
      Math.min(255, highlight.green + 60),
      Math.min(255, highlight.blue + 60)
    );
    graphics.fillStyle(lighter, alpha * 0.6);
    graphics.fillRect(px + inset, py + inset, size, 3);
    graphics.fillRect(px + inset, py + inset, 3, size);

    // Shadow (bottom-right bevel)
    const darker = Phaser.Display.Color.GetColor(
      Math.max(0, highlight.red - 80),
      Math.max(0, highlight.green - 80),
      Math.max(0, highlight.blue - 80)
    );
    graphics.fillStyle(darker, alpha * 0.6);
    graphics.fillRect(px + inset, py + inset + size - 3, size, 3);
    graphics.fillRect(px + inset + size - 3, py + inset, 3, size);

    // Inner glow
    graphics.fillStyle(0xffffff, alpha * 0.15);
    graphics.fillRect(px + inset + 4, py + inset + 4, size - 8, size - 8);
  }
}
