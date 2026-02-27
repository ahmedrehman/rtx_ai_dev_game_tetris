import "./main.css";
import Phaser from "phaser";
import Alpine from "alpinejs";
import { GameScene, GameState } from "../game/GameScene";
import { TetrominoShape } from "../game/Tetrominos";
import { GAME_WIDTH, GAME_HEIGHT, CELL_SIZE } from "../game/config";
import { audio } from "../game/Audio";

// Next piece canvas renderer
function drawNextPiece(piece: TetrominoShape): void {
  const canvas = document.getElementById("next-piece-canvas") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const shape = piece.shape;
  const blockSize = 16;

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

      // Main block
      ctx.fillStyle = color;
      ctx.fillRect(px + 1, py + 1, blockSize - 2, blockSize - 2);

      // Highlight
      ctx.fillStyle = `rgba(${Math.min(255, r + 60)}, ${Math.min(255, g + 60)}, ${Math.min(255, b + 60)}, 0.6)`;
      ctx.fillRect(px + 1, py + 1, blockSize - 2, 2);
      ctx.fillRect(px + 1, py + 1, 2, blockSize - 2);

      // Shadow
      ctx.fillStyle = `rgba(${Math.max(0, r - 80)}, ${Math.max(0, g - 80)}, ${Math.max(0, b - 80)}, 0.6)`;
      ctx.fillRect(px + 1, py + blockSize - 3, blockSize - 2, 2);
      ctx.fillRect(px + blockSize - 3, py + 1, 2, blockSize - 2);
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
          mode: Phaser.Scale.NONE,
          autoCenter: Phaser.Scale.NO_CENTER,
        },
        render: {
          pixelArt: false,
          antialias: true,
        },
      });

      this.game.events.once("ready", () => {
        this.game!.scene.add("GameScene", GameScene, true, { callbacks });
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
  }));
});

Alpine.start();
