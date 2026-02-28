import Phaser from "phaser";
import { Board, BOARD_WIDTH, BOARD_HEIGHT } from "../Board";
import {
  TetrominoShape,
  getRandomTetromino,
  rotateCW,
  rotateCCW,
} from "../Tetrominos";
import {
  CELL_SIZE,
  GAME_WIDTH,
  GAME_HEIGHT,
  SCORE_TABLE,
  getDropSpeed,
  LINES_PER_LEVEL,
  SOFT_DROP_SPEED,
  LOCK_DELAY,
  DAS_DELAY,
  DAS_REPEAT,
} from "../config";
import { audio } from "../Audio";

// Map Board hex colors to sprite texture keys
export const COLOR_TO_BLOCK_TEXTURE: Record<number, string> = {
  0x00fff5: "block_i",
  0xffff00: "block_o",
  0x9b59b6: "block_t",
  0x39ff14: "block_s",
  0xff0040: "block_z",
  0x4444ff: "block_j",
  0xff6600: "block_l",
};

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

export class GameSceneV2 extends Phaser.Scene {
  private board!: Board;

  // Sprite-based rendering
  private boardRT!: Phaser.GameObjects.RenderTexture;
  private stampSprites: Map<string, Phaser.GameObjects.Image> = new Map();
  private activeSprites: Phaser.GameObjects.Image[] = [];
  private ghostSprites: Phaser.GameObjects.Image[] = [];
  private boardDirty = true;

  // Flash effect
  private flashGraphics!: Phaser.GameObjects.Graphics;

  // Game state
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

  // DAS (Delayed Auto-Shift)
  private dasDirection: number = 0;
  private dasTimer: number = 0;
  private dasActive: boolean = false;

  private callbacks!: GameCallbacks;

  constructor() {
    super({ key: "GameSceneV2" });
  }

  init(data: { callbacks: GameCallbacks }): void {
    this.callbacks = data.callbacks;
  }

  create(): void {
    this.board = new Board();

    // Board background - tiled texture
    this.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, "board_texture")
      .setOrigin(0, 0);

    // Grid lines (subtle)
    const gridGfx = this.add.graphics();
    gridGfx.lineStyle(1, 0x1a1a3e, 0.3);
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      gridGfx.lineBetween(x * CELL_SIZE, 0, x * CELL_SIZE, GAME_HEIGHT);
    }
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      gridGfx.lineBetween(0, y * CELL_SIZE, GAME_WIDTH, y * CELL_SIZE);
    }

    // RenderTexture for locked blocks
    this.boardRT = this.add.renderTexture(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.boardRT.setOrigin(0, 0);

    // Create hidden stamp sprites for each block type (used for RenderTexture drawing)
    const blockTextures = ["block_i", "block_o", "block_t", "block_s", "block_z", "block_j", "block_l", "block_ghost"];
    for (const key of blockTextures) {
      const stamp = this.add.image(0, 0, key);
      stamp.setDisplaySize(CELL_SIZE, CELL_SIZE);
      stamp.setOrigin(0, 0);
      stamp.setVisible(false);
      this.stampSprites.set(key, stamp);
    }

    // Create reusable active piece sprites (max 4 blocks per piece)
    for (let i = 0; i < 4; i++) {
      const sprite = this.add.image(0, 0, "block_i");
      sprite.setDisplaySize(CELL_SIZE, CELL_SIZE);
      sprite.setOrigin(0, 0);
      sprite.setVisible(false);
      this.activeSprites.push(sprite);

      const ghost = this.add.image(0, 0, "block_ghost");
      ghost.setDisplaySize(CELL_SIZE, CELL_SIZE);
      ghost.setOrigin(0, 0);
      ghost.setVisible(false);
      ghost.setAlpha(0.3);
      this.ghostSprites.push(ghost);
    }

    // Flash effect layer (on top)
    this.flashGraphics = this.add.graphics();

    // Board frame overlay (decorative, on top of everything)
    const frame = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "board_frame");
    frame.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    frame.setAlpha(0.5);

    this.setupInput();
  }

  private setupInput(): void {
    if (!this.input.keyboard) return;

    this.input.keyboard.on("keydown-UP", () => this.tryRotate(1));
    this.input.keyboard.on("keydown-X", () => this.tryRotate(1));
    this.input.keyboard.on("keydown-Z", () => this.tryRotate(-1));

    this.input.keyboard.on("keydown-SPACE", () => this.hardDrop());

    this.input.keyboard.on("keydown-P", () => this.togglePause());
    this.input.keyboard.on("keydown-ESC", () => this.togglePause());

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

    this.input.keyboard.on("keydown-DOWN", () => {
      this.softDropping = true;
    });

    this.input.keyboard.on("keyup-DOWN", () => {
      this.softDropping = false;
    });
  }

  handleTouch(action: string): void {
    switch (action) {
      case "left":
        if (this.gameState !== "playing") return;
        if (this.movePiece(-1, 0)) audio.playMove();
        break;
      case "right":
        if (this.gameState !== "playing") return;
        if (this.movePiece(1, 0)) audio.playMove();
        break;
      case "down":
        if (this.gameState !== "playing") return;
        this.movePiece(0, 1);
        break;
      case "rotate":
        this.tryRotate(1);
        break;
      case "drop":
        this.hardDrop();
        break;
      case "pause":
        this.togglePause();
        break;
    }
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
    this.boardDirty = true;

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

    this.pieceX = Math.floor((BOARD_WIDTH - this.currentShape[0].length) / 2);
    this.pieceY = 0;

    this.nextPiece = this.getNextFromBag();
    this.callbacks.onNextPiece(this.nextPiece);

    this.isLocking = false;
    this.lockTimer = 0;

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

    this.addScore(dropDistance * 2);
    audio.playDrop();
    this.lockPiece();
  }

  private lockPiece(): void {
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
    this.boardDirty = true;

    const fullLines = this.board.getFullLines();
    if (fullLines.length > 0) {
      if (fullLines.length === 4) {
        audio.playTetris();
      } else {
        audio.playLineClear();
      }
      this.flashLines(fullLines, () => {
        const cleared = this.board.clearLines();
        this.boardDirty = true;
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
          this.flashGraphics.fillStyle(0xffd700, 0.6);
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
    // Redraw locked blocks if board changed
    if (this.boardDirty) {
      this.redrawBoardRT();
      this.boardDirty = false;
    }

    if (this.gameState !== "playing") {
      this.hideActiveSprites();
      return;
    }

    // DAS
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
        if (!this.isLocking) {
          this.isLocking = true;
          this.lockTimer = 0;
        }
      } else {
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

    this.renderActivePiece();
  }

  /** Redraw the RenderTexture with all locked blocks */
  private redrawBoardRT(): void {
    this.boardRT.clear();

    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        const color = this.board.grid[y][x];
        if (color !== null) {
          const textureKey = COLOR_TO_BLOCK_TEXTURE[color] || "block_i";
          const stamp = this.stampSprites.get(textureKey);
          if (stamp) {
            stamp.setPosition(x * CELL_SIZE, y * CELL_SIZE);
            this.boardRT.draw(stamp);
          }
        }
      }
    }
  }

  /** Position active piece and ghost sprites */
  private renderActivePiece(): void {
    if (!this.currentShape) {
      this.hideActiveSprites();
      return;
    }

    const textureKey = COLOR_TO_BLOCK_TEXTURE[this.currentPiece.color] || "block_i";
    const ghostY = this.board.getGhostY(this.currentShape, this.pieceX, this.pieceY);
    const showGhost = ghostY !== this.pieceY;

    let spriteIdx = 0;

    for (let y = 0; y < this.currentShape.length; y++) {
      for (let x = 0; x < this.currentShape[y].length; x++) {
        if (this.currentShape[y][x] === 0) continue;
        if (spriteIdx >= 4) break;

        // Active piece sprite
        const drawY = this.pieceY + y;
        const sprite = this.activeSprites[spriteIdx];
        if (drawY >= 0) {
          sprite.setTexture(textureKey);
          sprite.setPosition((this.pieceX + x) * CELL_SIZE, drawY * CELL_SIZE);
          sprite.setDisplaySize(CELL_SIZE, CELL_SIZE);
          sprite.setVisible(true);
          sprite.setAlpha(1);
        } else {
          sprite.setVisible(false);
        }

        // Ghost sprite
        const ghost = this.ghostSprites[spriteIdx];
        if (showGhost) {
          const ghostDrawY = ghostY + y;
          if (ghostDrawY >= 0) {
            ghost.setPosition((this.pieceX + x) * CELL_SIZE, ghostDrawY * CELL_SIZE);
            ghost.setDisplaySize(CELL_SIZE, CELL_SIZE);
            ghost.setVisible(true);
          } else {
            ghost.setVisible(false);
          }
        } else {
          ghost.setVisible(false);
        }

        spriteIdx++;
      }
    }

    // Hide unused sprites
    for (let i = spriteIdx; i < 4; i++) {
      this.activeSprites[i].setVisible(false);
      this.ghostSprites[i].setVisible(false);
    }
  }

  private hideActiveSprites(): void {
    for (let i = 0; i < 4; i++) {
      this.activeSprites[i]?.setVisible(false);
      this.ghostSprites[i]?.setVisible(false);
    }
  }
}
