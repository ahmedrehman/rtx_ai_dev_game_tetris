# Tetris Game - Project Overview

## Tech Stack
- **Server**: Node.js + Express + TypeScript
- **Frontend**: Vite + Alpine.js + Tailwind CSS 4
- **Game Engine**: Phaser 3
- **Styling**: Retro arcade aesthetic (NES-era inspired)

## Project Structure
```
src/
├── server/index.ts         # Express server (production)
├── client/
│   ├── index.html          # Main page (Alpine.js + Tailwind)
│   └── main.ts             # Entry: wires Alpine ↔ Phaser
├── game/
│   ├── GameScene.ts        # Main Phaser scene (game loop)
│   ├── Board.ts            # Tetris board logic
│   ├── Tetrominos.ts       # Piece shapes, rotation, colors
│   └── config.ts           # Constants, speeds, scoring
└── styles/
    └── main.css            # Tailwind 4 + retro CSS
```

## Development
- `npm run dev` — Vite dev server (port 3000)
- `npm run build` — Build client + server
- `npm run server` — Run Express server (port 3001)

## Status: MVP Complete
Core Tetris gameplay implemented with retro styling.
