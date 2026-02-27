# Tetris Game — Planning Layer

> **Purpose**: This document is the *planning layer* for the AI-assisted Tetris implementation.  
> It defines the architecture, business rules, and module boundaries **before** any code is written,
> so every generated or reviewed piece of code can be traced back to a deliberate decision here.

---

## 1. Goal

Deliver a browser-based, single-player Tetris game that is:
- Fully playable without a back-end or build step (static HTML + JS + CSS).
- Split into clear, single-responsibility modules so each can be understood and reviewed independently.
- Driven by named business constants (no magic numbers buried in logic).

---

## 2. Architecture

```
index.html          ← entry point; mounts canvas and bootstraps modules
styles/
  main.css          ← layout & visual chrome only; no game logic
src/
  constants.js      ← ALL tunable values and business rules (single source of truth)
  tetrominos.js     ← shape matrices and colour map (data only)
  board.js          ← board state: collision detection, locking, line clearing
  game.js           ← game loop, state machine, score/level progression
  renderer.js       ← canvas drawing (reads state, writes pixels — no side-effects on state)
  input.js          ← keyboard and touch bindings (translates events → game actions)
tests/
  game.test.js      ← unit tests for board and game-logic rules
```

### Data flow (unidirectional)

```
input.js  ──action──▶  game.js  ──state──▶  renderer.js
                          │
                       board.js
                          │
                     constants.js / tetrominos.js
```

---

## 3. Business Rules

All rules below are implemented as **named constants** in `src/constants.js`.

| Rule | Constant | Default value |
|------|----------|---------------|
| Board width | `BOARD_COLS` | 10 columns |
| Board height | `BOARD_ROWS` | 20 rows |
| Cell size (px) | `CELL_SIZE` | 30 px |
| Starting drop interval | `INITIAL_DROP_INTERVAL_MS` | 800 ms |
| Drop speed-up per level | `SPEED_FACTOR` | 0.85 (×per level) |
| Lines per level | `LINES_PER_LEVEL` | 10 |
| Score: single line | `SCORE_SINGLE` | 100 |
| Score: double line | `SCORE_DOUBLE` | 300 |
| Score: triple line | `SCORE_TRIPLE` | 500 |
| Score: Tetris (4 lines) | `SCORE_TETRIS` | 800 |
| Score multiplier per level | `SCORE_LEVEL_MULTIPLIER` | level number |
| Lock delay (ms) | `LOCK_DELAY_MS` | 500 ms |
| Das (delayed auto-shift) ms | `DAS_DELAY_MS` | 150 ms |
| Auto-repeat rate ms | `ARR_MS` | 50 ms |

---

## 4. Module Responsibilities

### `src/constants.js`
- Exports frozen configuration objects.  
- **No logic** — pure data.

### `src/tetrominos.js`
- Defines the 7 standard tetrominoes (I, O, T, S, Z, J, L) as rotation matrices.  
- Associates a colour string with each type.  
- **No logic** — pure data.

### `src/board.js`
- Owns the 2-D grid array.  
- Exports: `createBoard()`, `isValidPosition()`, `lockPiece()`, `clearLines()`.  
- Has **no knowledge** of the game loop, score, or rendering.

### `src/game.js`
- Owns the game-state object: `{ board, currentPiece, nextPiece, score, level, lines, status }`.  
- Drives the `requestAnimationFrame` loop.  
- Calls `board.js` for collision / locking, updates score/level, publishes state to `renderer.js`.  
- State machine: `idle → playing → paused → game-over`.

### `src/renderer.js`
- Accepts a state snapshot and redraws the canvas.  
- **Never mutates** game state.

### `src/input.js`
- Maps `keydown` / touch events to action strings (`moveLeft`, `moveRight`, `rotate`, `softDrop`, `hardDrop`, `pause`).  
- Passes actions to `game.js` via a registered callback.

---

## 5. Acceptance Criteria

- [ ] Pieces spawn at the top-centre of the board.  
- [ ] Rotation uses wall-kick (basic left/right nudge).  
- [ ] Completed lines are cleared and score is updated correctly.  
- [ ] Level increases every 10 lines; drop speed increases accordingly.  
- [ ] Hard drop locks piece immediately and scores 2 pts per cell dropped.  
- [ ] Game-over is detected when a new piece cannot spawn.  
- [ ] Pause / resume works at any time during play.  
- [ ] Next-piece preview is displayed.  
- [ ] Score, level, and line count are displayed on screen.  
- [ ] Unit tests validate collision detection and line-clear scoring.

---

## 6. Out of Scope (v1)

- Multiplayer / networked play  
- Sound effects  
- Mobile layout  
- High-score persistence  
- Advanced SRS (Super Rotation System) wall-kicks  
