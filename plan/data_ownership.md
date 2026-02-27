# Data Ownership

## Game State (owned by: GameScene)
- Board grid, current piece, next piece, rotation state
- Score, level, lines
- Drop timer, lock timer, DAS state
- Game state (idle/playing/paused/gameover)

## UI State (owned by: Alpine.js app)
- Display copies of score/level/lines (updated via callbacks)
- High score (localStorage)
- Game state (for UI rendering)

## Next Piece Preview (owned by: main.ts drawNextPiece)
- Renders on a separate canvas using callback data from GameScene
