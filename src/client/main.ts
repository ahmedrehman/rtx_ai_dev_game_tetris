import "./main.css";
import Phaser from "phaser";
import Alpine from "alpinejs";
import { GameScene, GameState } from "../game/GameScene";
import { TetrominoShape } from "../game/Tetrominos";
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from "../game/config";
import { audio } from "../game/Audio";

// Detect mobile
function isMobile(): boolean {
  return window.innerWidth < 640;
}

// Calculate game scale to fit available space dynamically
function calcGameSize(): { width: number; height: number; scale: number } {
  if (!isMobile()) {
    return { width: GAME_WIDTH, height: GAME_HEIGHT, scale: 1 };
  }

  // Measure actual available space from the flex container
  const gameArea = document.getElementById("game-area");
  if (gameArea) {
    const rect = gameArea.getBoundingClientRect();
    if (rect.height > 50 && rect.width > 50) {
      const maxH = rect.height - 8;
      const maxW = rect.width - 8;
      const scaleH = maxH / GAME_HEIGHT;
      const scaleW = maxW / GAME_WIDTH;
      const scale = Math.min(scaleH, scaleW, 1);
      return {
        width: Math.floor(GAME_WIDTH * scale),
        height: Math.floor(GAME_HEIGHT * scale),
        scale,
      };
    }
  }

  // Fallback: viewport percentage-based
  const maxH = window.innerHeight * 0.58;
  const maxW = window.innerWidth - 16;
  const scaleH = maxH / GAME_HEIGHT;
  const scaleW = maxW / GAME_WIDTH;
  const scale = Math.min(scaleH, scaleW, 1);
  return {
    width: Math.floor(GAME_WIDTH * scale),
    height: Math.floor(GAME_HEIGHT * scale),
    scale,
  };
}

// Apply calculated size to game wrapper and container
function applyGameSize(): void {
  const gameSize = calcGameSize();
  const wrapper = document.getElementById("game-wrapper");
  const container = document.getElementById("game-container");
  if (wrapper && container) {
    wrapper.style.width = gameSize.width + "px";
    wrapper.style.height = gameSize.height + "px";
    container.style.width = gameSize.width + "px";
    container.style.height = gameSize.height + "px";
  }
}

// Next piece canvas renderer
function drawNextPiece(piece: TetrominoShape): void {
  // Draw on both desktop and mobile canvases
  const canvasIds = ["next-piece-canvas", "next-piece-canvas-mobile"];
  for (const id of canvasIds) {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (!canvas) continue;
    const ctx = canvas.getContext("2d");
    if (!ctx) continue;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const shape = piece.shape;
    const blockSize = canvas.width > 60 ? 16 : 10;

    // Calculate bounds of the actual blocks
    let minX = shape[0].length, maxX = 0, minY = shape.length, maxY = 0;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
    }

    const pieceW = (maxX - minX + 1) * blockSize;
    const pieceH = (maxY - minY + 1) * blockSize;
    const offsetX = (canvas.width - pieceW) / 2;
    const offsetY = (canvas.height - pieceH) / 2;

    const color = "#" + piece.color.toString(16).padStart(6, "0");
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] === 0) continue;

        const px = offsetX + (x - minX) * blockSize;
        const py = offsetY + (y - minY) * blockSize;

        ctx.fillStyle = color;
        ctx.fillRect(px + 1, py + 1, blockSize - 2, blockSize - 2);

        ctx.fillStyle = `rgba(${Math.min(255, r + 60)}, ${Math.min(255, g + 60)}, ${Math.min(255, b + 60)}, 0.6)`;
        ctx.fillRect(px + 1, py + 1, blockSize - 2, 2);
        ctx.fillRect(px + 1, py + 1, 2, blockSize - 2);

        ctx.fillStyle = `rgba(${Math.max(0, r - 80)}, ${Math.max(0, g - 80)}, ${Math.max(0, b - 80)}, 0.6)`;
        ctx.fillRect(px + 1, py + blockSize - 3, blockSize - 2, 2);
        ctx.fillRect(px + blockSize - 3, py + 1, 2, blockSize - 2);
      }
    }
  }
}

// Alpine.js app
interface TetrisApp {
  score: number;
  level: number;
  lines: number;
  highScore: number;
  gameState: GameState;
  musicOn: boolean;
  sfxOn: boolean;
  game: Phaser.Game | null;
  init(): void;
  startGame(): void;
  toggleMusic(): void;
  toggleSfx(): void;
  touchAction(action: string): void;
}

document.addEventListener("alpine:init", () => {
  Alpine.data("tetrisApp", (): TetrisApp => ({
    score: 0,
    level: 0,
    lines: 0,
    highScore: parseInt(localStorage.getItem("tetris_highscore") || "0", 10),
    gameState: "idle" as GameState,
    musicOn: true,
    sfxOn: true,
    game: null,

    init() {
      const app = this;
      applyGameSize();

      const container = document.getElementById("game-container");

      const callbacks = {
        onScoreChange: (score: number) => {
          app.score = score;
          if (score > app.highScore) {
            app.highScore = score;
            localStorage.setItem("tetris_highscore", score.toString());
          }
        },
        onLevelChange: (level: number) => {
          app.level = level;
        },
        onLinesChange: (lines: number) => {
          app.lines = lines;
        },
        onStateChange: (state: GameState) => {
          app.gameState = state;
        },
        onNextPiece: (piece: TetrominoShape) => {
          drawNextPiece(piece);
        },
      };

      this.game = new Phaser.Game({
        type: Phaser.AUTO,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        parent: "game-container",
        backgroundColor: "#0a0a0a",
        scene: [],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.NO_CENTER,
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
        },
        render: {
          pixelArt: false,
          antialias: true,
        },
        input: {
          touch: true,
        },
      });

      this.game.events.once("ready", () => {
        this.game!.scene.add("GameScene", GameScene, true, { callbacks });
      });

      // Prevent default touch behaviors on game area
      container?.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

      // Resize handler for orientation changes and viewport resizes
      let resizeTimer: ReturnType<typeof setTimeout>;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          applyGameSize();
          app.game?.scale.refresh();
        }, 150);
      });
    },

    startGame() {
      const scene = this.game?.scene.getScene("GameScene") as GameScene;
      if (scene) {
        scene.startGame();
      }
    },

    toggleMusic() {
      this.musicOn = !this.musicOn;
      audio.setMusicEnabled(this.musicOn);
      if (this.musicOn && this.gameState === "playing") {
        audio.startMusic();
      }
    },

    toggleSfx() {
      this.sfxOn = !this.sfxOn;
      audio.setSfxEnabled(this.sfxOn);
    },

    touchAction(action: string) {
      const scene = this.game?.scene.getScene("GameScene") as GameScene | undefined;
      if (!scene) return;

      switch (action) {
        case "left":
          scene.handleTouch("left");
          break;
        case "right":
          scene.handleTouch("right");
          break;
        case "down":
          scene.handleTouch("down");
          break;
        case "rotate":
          scene.handleTouch("rotate");
          break;
        case "drop":
          scene.handleTouch("drop");
          break;
        case "pause":
          scene.handleTouch("pause");
          break;
      }
    },
  }));
});

Alpine.start();
