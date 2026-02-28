# Tetris — AI-Developed Game

A fully playable Tetris game built entirely with AI (Claude). Features two visual versions sharing the same game engine, demonstrating AI-driven software development with a structured planning layer.

## Play

```bash
npm install
npm run dev
```

- **V1 — Classic Arcade**: [http://localhost:3131/](http://localhost:3131/)
- **V2 — Tetris Royale**: [http://localhost:3131/modern/](http://localhost:3131/modern/)

## Versions

### V1 — Classic Arcade
NES-inspired retro Tetris with neon glow aesthetics. Procedural rendering via Phaser Graphics API.

- CRT scanline and vignette effects
- Chiptune Korobeiniki music (Web Audio synthesis)
- Mobile-first responsive layout with touch controls

### V2 — Tetris Royale
Clash Royale-inspired modern take with sprite-based rendering. Uses placeholder art (pending Ludo AI generation).

- Sprite-based block rendering via Phaser RenderTexture
- Themed UI with 9-slice panels, character avatar, XP bar
- Gold/navy/wood color palette with Bungee font
- Same core gameplay, completely different visual identity

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Server | Node.js + Express + TypeScript |
| Frontend | Vite + Alpine.js + Tailwind CSS 4 |
| Game Engine | Phaser 3 |
| Asset Generation | Ludo AI (V2 sprites) |

## Architecture

Both versions share core game logic with zero duplication:

```
src/game/
├── Board.ts        # Grid logic, collision, line clearing
├── Tetrominos.ts   # Piece shapes, SRS rotation, wall kicks
├── config.ts       # Cell size, speeds, scoring, DAS settings
├── Audio.ts        # Korobeiniki music + SFX (Web Audio)
├── GameScene.ts    # V1 — procedural rendering
└── v2/
    ├── PreloaderV2.ts  # V2 — asset preloader with progress bar
    └── GameSceneV2.ts  # V2 — sprite-based rendering
```

V1 renders blocks with `graphics.fillRect()` and beveled highlights. V2 uses a `RenderTexture` for locked blocks (redrawn only on lock/clear) and reusable `Image` sprites for the active and ghost pieces.

## Game Features

- **SRS rotation** with wall kicks (standard + I-piece offsets)
- **DAS** (Delayed Auto-Shift) for held movement keys
- **Lock delay** with reset on successful move/rotation
- **7-bag randomizer** for fair piece distribution
- **NES-style scoring** (100/300/500/800 × level multiplier)
- **Soft drop** (1 point per cell) and **hard drop** (2 points per cell)
- **Ghost piece** preview showing landing position
- **Keyboard + touch** input on all screen sizes

## Controls

| Action | Keyboard | Mobile |
|--------|----------|--------|
| Move | Arrow Left / Right | Directional buttons |
| Soft Drop | Arrow Down | Down button |
| Hard Drop | Space | Drop button |
| Rotate CW | Arrow Up / X | Rotate button |
| Rotate CCW | Z | — |
| Pause | P / Esc | Pause button |

## Scripts

```bash
npm run dev      # Vite dev server (port 3131)
npm run build    # Production build (client + server)
npm run server   # Run Express server
npm start        # Build + run
```

## Project Planning

This project uses a structured AI planning methodology. Module plans live in `plan/` with tagged sections (`[User Input]`, `[AI Feedback]`, `[AI Implementation]`, `[AI Todos]`) that track requirements, decisions, implementation status, and remaining work. See `plan/planning.md` for the full overview.
