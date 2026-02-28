# V2 — Tetris Royale: Project Overview

## Scope  [User Input]
Transform V1 classic arcade Tetris into a modern Clash Royale-inspired mobile game with sprite-based rendering, character reactions, particle effects, and polished UI. Mobile-first, works on desktop too.

## Architecture  [AI Feedback]
- V2 shares V1's game logic (Board, Tetrominos, rotation, scoring, DAS) — no duplication
- V2 has its own Phaser scenes (`PreloaderV2`, `GameSceneV2`) and entry files at `src/client/modern/`
- Both versions coexist: V1 at `/`, V2 at `/modern/`
- Touch buttons implemented as HTML `<img>` elements (simpler hit targets, accessibility) not Phaser sprites
- Info panels use CSS `border-image` with panel PNGs for 9-slice stretching
- XP bar is visual-only (no backend persistence)

## Implementation Phases  [AI Implementation]

### Phase 1: Foundation — COMPLETE
- V2 file structure: `src/client/modern/` (HTML, CSS, main.ts) + `src/game/v2/` (PreloaderV2, GameSceneV2)
- Vite multi-page build: `vite.config.ts` with `rollupOptions.input` for both entry points
- Express server: `/modern` route before `*` SPA fallback
- V2 entry: `tetrisRoyaleApp()` Alpine function, same pattern as V1
- Phaser config: scenes added manually via `game.scene.add()`, PreloaderV2 → GameSceneV2

### Phase 2: Core Rendering — COMPLETE
- GameSceneV2 uses sprite-based rendering with RenderTexture for locked blocks
- `COLOR_TO_BLOCK_TEXTURE` map converts Board hex colors to texture keys
- Locked blocks: RenderTexture redrawn only on lock/clear (not every frame)
- Active piece: 4 reusable Image sprites repositioned each frame
- Ghost piece: 4 reusable `block_ghost` sprites at 0.3 alpha
- Board background: TileSprite with `board_texture`, grid lines via Graphics
- Board frame overlay: `board_frame` at 0.5 alpha on top

### Phase 3: Character System — PARTIAL
- Avatar display: HTML `<img>` with Alpine-reactive `charState` (idle/defeated)
- Full character display in desktop left column
- Character state machine reactions (happy on line clear, excited on Tetris, worried on danger) not yet implemented

### Phase 4: Effects & Particles — NOT STARTED
- Line clear flash: gold-colored flash effect (basic, no particle sprites yet)

### Phase 5: UI Polish — COMPLETE
- Touch controls: `btn_*.png` sprite images with `@pointerdown` events
- Info panels: `panel_h.png` as CSS `border-image` for 9-slice
- XP bar: `xp_frame.png` + `xp_fill.png`, width controlled by Alpine state
- Sound toggles: `icon_music_on/off.png`, `icon_sfx_on/off.png`
- Logo: `logo_full.png` (desktop), `logo_compact.png` (mobile)
- Background: `bg_pattern.png` tiled on body
- Game state overlays: START / PAUSED / GAME OVER with V2 theme
- Settings icon in mobile title bar

### Phase 6: Audio & Final Polish — NOT STARTED
- Currently reuses V1's Korobeiniki music and Web Audio SFX

## V2 Todos  [AI Todos]
- [x] Phase 1: Create V2 file structure and entry points
- [x] Phase 2: Sprite-based rendering with RenderTexture
- [x] Phase 5: UI layout with sprite assets
- [ ] Phase 3: Character reactions state machine (happy/excited/worried triggers)
- [ ] Phase 4: Particle effects (sparkle, star, shard, coin emitters)
- [ ] Phase 4: Screen shake on hard drop and Tetris
- [ ] Phase 4: Score bounce tween
- [ ] Phase 6: Decide on new music or enhanced Korobeiniki
- [ ] Replace placeholder PNGs with Ludo AI art (49 images)
