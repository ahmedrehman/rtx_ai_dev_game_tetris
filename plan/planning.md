# Tetris Game - Project Overview

## Tech Stack
- **Server**: Node.js + Express + TypeScript
- **Frontend**: Vite + Alpine.js + Tailwind CSS 4
- **Game Engine**: Phaser 3
- **Asset Generation**: Ludo AI (V2 sprites)

## Project Structure
```
src/
├── server/index.ts         # Express server (serves V1 + V2)
├── client/
│   ├── index.html          # V1 — Classic Arcade
│   ├── main.ts             # V1 entry: wires Alpine ↔ Phaser
│   ├── main.css            # V1 styles (retro neon)
│   ├── modern/
│   │   ├── index.html      # V2 — Tetris Royale
│   │   ├── main.ts         # V2 entry: wires Alpine ↔ Phaser (themed)
│   │   └── main.css        # V2 styles (Clash Royale theme)
├── game/
│   ├── GameScene.ts        # V1 Phaser scene (procedural rendering)
│   ├── Board.ts            # Tetris board logic (SHARED)
│   ├── Tetrominos.ts       # Piece shapes, rotation, colors (SHARED)
│   ├── config.ts           # Constants, speeds, scoring (SHARED)
│   ├── Audio.ts            # Web Audio music + SFX (SHARED)
│   ├── v2/
│   │   ├── GameSceneV2.ts  # V2 Phaser scene (sprite rendering)
│   │   └── PreloaderV2.ts  # V2 asset preloader scene
public/
├── favicon.svg             # V1 favicon
├── assets/v2/              # V2 Ludo AI generated sprites (49 PNGs)
├── v2-preview.html         # V2 design preview page
plan/
├── planning.md             # This file
├── versions.md             # V1 status + V2 design spec + asset list
├── ludo_order.md           # 49 copy-paste prompts for Ludo AI
├── mod_game.md             # V1 game logic module
├── mod_ui.md               # V1 UI module
├── mod_server.md           # Server module
├── mod_v2_overview.md      # V2 phases, architecture, scope
├── mod_v2_rendering.md     # V2 sprite rendering (blocks, board)
├── mod_v2_character.md     # V2 character system (reactions)
├── mod_v2_effects.md       # V2 effects & particles
├── mod_v2_ui.md            # V2 UI layout (mobile + desktop)
├── mod_v2_ui_details.md    # V2 UI specifics (CSS, HTML, positions)
├── mod_v2_assets.md        # V2 asset management (loading, inventory)
├── contracts.md            # Module interfaces
├── data_ownership.md       # Data ownership
scripts/
├── generate-placeholders.ts # Generates 49 colored placeholder PNGs
```

## Development
- `npm run dev` — Vite dev server (port 3131)
- `npm run build` — Build client + server
- `npm run server` — Run Express server
- V1: `http://localhost:3131/` (classic arcade)
- V2: `http://localhost:3131/modern/` (Tetris Royale)
- Preview: `http://localhost:3131/v2-preview.html` (design mockup)

## Versions

### V1 — Classic Arcade: COMPLETE
- Full Tetris gameplay, NES retro style, procedural rendering
- Mobile-first responsive layout with touch controls
- See `mod_game.md` and `mod_ui.md`

### V2 — Tetris Royale: PLAYABLE
- Clash Royale-inspired sprite-based rendering
- Full Tetris gameplay using placeholder sprites
- Mobile + desktop responsive layout with themed UI
- Phases 1, 2, 5 complete. Phases 3 (character reactions), 4 (particles), 6 (audio) pending
- Waiting for Ludo AI art to replace 49 placeholder PNGs

## Shared Between Versions
Both V1 and V2 share these modules (no duplication):
- `Board.ts` — grid logic, collision, line clearing
- `Tetrominos.ts` — piece definitions, SRS rotation, wall kicks
- `config.ts` — cell size, speeds, scoring tables, DAS settings
- `Audio.ts` — Korobeiniki music + SFX (Web Audio)
- Express server (serves both versions)
- Vite build (multi-page: both entry points)
