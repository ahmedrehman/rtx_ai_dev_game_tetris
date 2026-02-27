# Contracts

## GameScene ↔ Alpine.js (via callbacks)
```typescript
interface GameCallbacks {
  onScoreChange: (score: number) => void;
  onLevelChange: (level: number) => void;
  onLinesChange: (lines: number) => void;
  onStateChange: (state: GameState) => void;
  onNextPiece: (piece: TetrominoShape) => void;
}

type GameState = "idle" | "playing" | "paused" | "gameover";
```

## Alpine → Phaser (public methods)
- `GameScene.startGame()` — start/restart game

## Board API
- `isValidPosition(shape, x, y): boolean`
- `lockPiece(shape, x, y, color): void`
- `clearLines(): number`
- `getFullLines(): number[]`
- `getGhostY(shape, x, y): number`

## Server API
- `GET /api/health` → `{ status: "ok", game: "Tetris" }`
