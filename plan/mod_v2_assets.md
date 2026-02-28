# Module: V2 Asset Management

## Assets  [User Input]
49 PNG images from Ludo AI stored in `public/assets/v2/`. All loaded by Phaser preloader. Some used in HTML via direct `<img>` tags.

## Assets  [AI Feedback]
- Assets split into two usage categories:
  - **Phaser-managed**: blocks, board, particles, effects, character full body — loaded via `this.load.image()`
  - **HTML-managed**: buttons, icons, logo, panels, avatar, XP bar — used as `<img src>` or CSS backgrounds
- Phaser assets need preloading before scene starts; HTML assets load naturally
- A loading screen should show during Phaser preload (logo + progress bar)
- Consider a texture atlas for small repeated sprites (blocks, particles) to reduce draw calls
- Placeholder PNGs exist at `public/assets/v2/` for development — replace with Ludo output

## Assets  [AI Implementation]
- Placeholder PNGs generated for all 49 assets via `scripts/generate-placeholders.ts`
- Preview page at `public/v2-preview.html` shows all placeholders in V2 layout context
- Assets stored in `public/assets/v2/` (served as `/assets/v2/` by Vite)
- PreloaderV2 (`src/game/v2/PreloaderV2.ts`): loads all Phaser-managed textures with gold progress bar
- HTML assets loaded directly via `<img src="/assets/v2/...">` in index.html

## Assets  [AI Todos]
- [ ] Replace placeholders with Ludo AI generated art (49 images)
- [x] Phaser preloader scene: load all game textures with progress bar
- [ ] Consider texture atlas for blocks (7+1 sprites → single atlas = fewer draw calls)
- [ ] Consider texture atlas for particles (4 sprites → single atlas)
- [ ] Verify all assets render correctly at display sizes (especially blocks at 24x24)
- [ ] Test retina rendering on high-DPI mobile screens

## File Inventory

### Phaser-loaded (game textures)
```
block_i.png, block_o.png, block_t.png, block_s.png,
block_z.png, block_j.png, block_l.png, block_ghost.png
board_texture.png, board_frame.png
frame_next.png
char_idle.png, char_happy.png, char_excited.png,
char_worried.png, char_defeated.png
fx_lineclear.png, fx_tetris.png, fx_levelup.png, fx_combo_bg.png
particle_sparkle.png, particle_star.png,
particle_shard.png, particle_coin.png
```

### HTML-loaded (UI images)
```
avatar_idle.png, avatar_happy.png, avatar_excited.png,
avatar_worried.png, avatar_defeated.png
btn_left.png, btn_right.png, btn_down.png,
btn_rotate.png, btn_drop.png, btn_pause.png
icon_settings.png, icon_music_on.png, icon_music_off.png,
icon_sfx_on.png, icon_sfx_off.png
logo_full.png, logo_compact.png
panel_h.png, panel_sq.png
xp_frame.png, xp_fill.png
bg_pattern.png
icon_v2_512.png, icon_v2_64.png
```
