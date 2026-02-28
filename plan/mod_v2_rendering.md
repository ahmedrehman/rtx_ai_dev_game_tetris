# Module: V2 Rendering (Sprite-Based)

## Sprite Rendering  [User Input]
Replace V1's procedural Graphics drawing with sprite-based rendering using Ludo AI assets. Gem-like glossy blocks, stone board texture, ornate gold frame.

## Sprite Rendering  [AI Feedback]
- Block sprites are 128x128 source, displayed at 24x24 (CELL_SIZE) via `setDisplaySize(24, 24)`
- Board texture tiles via `this.add.tileSprite()` — covers the 240x480 board area
- Board frame: simple `Image` overlay at 0.5 alpha (not NineSlice — simpler and sufficient)
- Ghost piece: `block_ghost.png` at `setAlpha(0.3)` for all piece types
- **RenderTexture approach**: locked blocks drawn to a RenderTexture (redrawn only on lock/clear), active + ghost use individual reusable sprites

## Sprite Rendering  [AI Implementation]
Implemented in `src/game/v2/GameSceneV2.ts`:
- `COLOR_TO_BLOCK_TEXTURE` map: converts Board hex colors (0x00fff5 etc.) to sprite keys (block_i etc.)
- Hidden stamp sprites (one per block type) used for RenderTexture.draw()
- `boardRT`: RenderTexture cleared and redrawn only when `boardDirty` flag is set (on lock/clear)
- `activeSprites[4]`: reusable Image sprites repositioned each frame for current piece
- `ghostSprites[4]`: reusable `block_ghost` Image sprites at 0.3 alpha
- TileSprite background with `board_texture`
- Graphics grid lines at 0.3 alpha
- Board frame overlay at 0.5 alpha

## Sprite Rendering  [AI Todos]
- [x] Asset preloader: load all block textures, board texture, board frame
- [x] Board background: TileSprite with `board_texture.png`
- [x] Board frame: Image overlay with `board_frame.png`
- [x] Locked blocks: RenderTexture that redraws on lock/line clear
- [x] Active piece: 4 Image sprites that move with the piece
- [x] Ghost piece: 4 Image sprites with `block_ghost.png` at 0.3 alpha
- [x] Grid lines: subtle Graphics overlay
- [ ] Next piece preview using block sprites (currently uses canvas 2D like V1)
