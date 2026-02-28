# Tetris Game Versions

---

## Version 1 — Classic Arcade (DONE)

The original retro-style Tetris. Pure nostalgia.

### Style
- NES-era pixel aesthetic
- "Press Start 2P" bitmap font
- Neon colors on dark background (cyan, green, pink, yellow)
- CRT scanline overlay + vignette
- Beveled 3D blocks with highlight/shadow
- Chiptune Korobeiniki music (Web Audio synthesis)

### Tech
- Phaser 3 graphics-only (no sprites, no images)
- All visuals drawn procedurally
- All audio synthesized via Web Audio API

### Status: Complete
- Full gameplay, SRS rotation, 7-bag, DAS, ghost piece
- Score/level/lines, high score (localStorage)
- Music + SFX with toggle settings
- Game over detection
- **Mobile-first responsive layout** — stacked on small screens, side-by-side on desktop
- Touch controls (move, rotate, hard drop, pause buttons)
- Dynamic game canvas scaling to fit mobile viewport
- `100dvh` + safe area insets for notched phones
- Mobile-optimized info bar (horizontal), next-piece preview inline

---

## Version 2 — Modern Battle Style (Clash Royale inspired)

A bold, vibrant, mobile-game-inspired Tetris with character presence, animated sprites, and polished UI.

### Visual Direction
Think **Clash Royale meets Tetris** — punchy, colorful, slightly cartoonish 3D-rendered style with:
- Thick outlines on everything
- Rich gradients and drop shadows
- Glossy/shiny material look on blocks
- Particle effects (sparkles, explosions on line clears)
- A hero character reacting to gameplay
- Animated UI elements (bouncy score numbers, shake on Tetris)

### Layout — Mobile (PRIMARY)
The phone is the main target. No room for a character column beside the board.
```
┌────────────────────────────┐
│ [Avatar] TETRIS ROYALE  ⚙ │  ← title bar: character head + logo + settings
├────────────────────────────┤
│ SCORE  LEVEL  LINES  NEXT │  ← info bar (horizontal, themed panels)
├────────────────────────────┤
│                            │
│      ┌──────────────┐      │
│      │              │      │
│      │  GAME BOARD  │      │  ← flex-1, fills remaining space
│      │  (gem blocks │      │
│      │   on stone)  │      │
│      │              │      │
│      └──────────────┘      │
│                            │
├────────────────────────────┤
│  ← ↓ →       ↻  ▼  ⏸     │  ← themed touch buttons
├────────────────────────────┤
│  [══════XP BAR══════]  ♫  │  ← XP bar + sound toggle
└────────────────────────────┘
```
- **Character shows as small avatar** (head only, ~40px) in title bar
- **Character reacts** via pop-up overlays on events (line clear, Tetris, danger, game over)
- All UI panels are **horizontal strips** that scale with viewport width

### Layout — Desktop
```
┌─────────────────────────────────────────┐
│  [Crown Logo]   TETRIS ROYALE           │
├──────────┬──────────────┬───────────────┤
│          │              │               │
│ CHARACTER│  GAME BOARD  │  NEXT PIECE   │
│ (full    │  (gem blocks │  SCORE        │
│  body,   │   on stone   │  COMBO        │
│  reacts) │   board)     │  LEVEL        │
│          │              │               │
│          │              │  [SETTINGS]   │
├──────────┴──────────────┴───────────────┤
│  [══════════ XP BAR ══════════]         │
└─────────────────────────────────────────┘
```
- Full character beside board (space is available)
- Vertical side panels for info

### Character
A "Tetris Knight" or "Block Mage":
- **Idle**: Slight bounce, blinking
- **Line clear (1-2)**: Nod / thumbs up
- **Tetris (4 lines)**: Victory pose, sparkle effects
- **Danger (stack high)**: Worried expression, sweating
- **Game over**: Defeated slump

---

## Assets to Order from Ludo AI

### Important: Size & Scale Rules

Our game board is **10×20 cells at 24px = 240×480px internal resolution**.
On mobile the canvas scales down to fit (~60-80% on small phones).
On retina displays (2x-3x), assets need enough detail to look sharp.

**Rule: Order all assets at 2x-3x the display size.** Phaser scales down smoothly.
- A block displayed at 24×24 → order at **128×128** (5x, future-proof)
- A character displayed at 120px tall → order at **512×512**
- UI elements: order **wide** so we can crop/scale, never stretch

**File format:** PNG with transparent background (unless noted).
**Style consistency:** Use the SAME style prompt base for EVERY asset. Inconsistent style = looks broken.

### Style Prompt Base

Use this as the base description appended to ALL asset requests:

> **"Clash Royale art style — vibrant cartoon 3D render, thick dark outlines, glossy materials, rich saturated colors, soft shadows, slightly exaggerated proportions, mobile game UI quality, transparent PNG background"**

---

### 1. Character — Full Body (5 states)

**Base prompt:**
> "A fantasy knight character, chibi proportions (large head, small body), glossy armor with blue and gold accents, friendly confident expression — [STYLE BASE]"

| State | Add to prompt | File |
|-------|---------------|------|
| Idle | "standing relaxed, slight smile, one hand on hip" | `char_idle.png` |
| Happy | "thumbs up, big grin, small sparkle effects" | `char_happy.png` |
| Excited | "victory pose, both arms raised, star effects" | `char_excited.png` |
| Worried | "nervous expression, sweat drop, hands clasped" | `char_worried.png` |
| Defeated | "slumped over, sad expression, small cloud above" | `char_defeated.png` |

**Size:** 512×512px each, transparent background
**Why 512:** Displayed at ~150px on desktop, ~80px in pop-ups. 512 gives 3x+ headroom for retina.

---

### 2. Character — Head/Avatar (5 states)

**For the mobile title bar.** Just head and shoulders, circular crop-friendly.

**Base prompt:**
> "Close-up portrait of a fantasy knight character, head and shoulders only, circular composition, glossy armor with blue and gold accents — [STYLE BASE]"

| State | Add to prompt | File |
|-------|---------------|------|
| Idle | "slight smile, friendly" | `avatar_idle.png` |
| Happy | "big grin, sparkle in eyes" | `avatar_happy.png` |
| Excited | "wide open mouth cheering, stars" | `avatar_excited.png` |
| Worried | "nervous frown, sweat drop" | `avatar_worried.png` |
| Defeated | "sad droopy eyes, small tear" | `avatar_defeated.png` |

**Size:** 128×128px each, transparent background
**Displayed at:** ~32-48px on mobile info bar. 128px = 3x retina safe.

---

### 3. Block Textures (7 colors)

**Base prompt:**
> "A single glossy gem-like square game block tile, thick dark outline, shiny reflective surface with inner highlight and soft drop shadow — [STYLE BASE]"

| Piece | Color addition | File |
|-------|---------------|------|
| I | "bright cyan / aqua blue crystal" | `block_i.png` |
| O | "golden yellow gem" | `block_o.png` |
| T | "royal purple amethyst" | `block_t.png` |
| S | "emerald green gem" | `block_s.png` |
| Z | "ruby red gem" | `block_z.png` |
| J | "sapphire dark blue" | `block_j.png` |
| L | "bright orange amber gem" | `block_l.png` |

**Size:** 128×128px each, transparent background
**Why 128:** Displayed at 24×24 in-game. 128 = 5x, looks crisp on any retina display.
**Also order:** 1 extra block in **gray/stone color** for the ghost piece → `block_ghost.png`

---

### 4. Game Board

Order **two separate assets** (not combined!) so we can size the board frame independently:

**4a. Board Inner Texture** (tileable stone surface):
> "Seamless dark gray-blue stone texture with subtle carved grid lines, medieval stone slab feel — [STYLE BASE], square tile, tileable"
>
> Size: **256×256px** (will tile to fill board area)
> File: `board_texture.png`

**4b. Board Frame** (9-slice border):
> "Ornate game board border frame in portrait orientation, thick gold trim with rivets and medieval stone edges, inner area is transparent/empty, designed as a UI border element — [STYLE BASE]"
>
> Size: **512×1024px**, transparent inner area
> File: `board_frame.png`
>
> **IMPORTANT for 9-slice:** The corners and edges must be distinct from the center.
> We'll slice this in Phaser so it stretches to any board size on any screen.

---

### 5. UI Panel Frame (9-slice)

We need this at **multiple aspect ratios** or as a 9-slice friendly asset.

**Prompt:**
> "A medieval wooden panel with gold trim border, ornate gold corner decorations, dark rich wood center area, designed as a 9-slice UI panel element — [STYLE BASE]"

**Order 2 variants:**

| Variant | Size | File | Use |
|---------|------|------|-----|
| Horizontal | 512×128px | `panel_h.png` | Mobile info boxes, XP bar |
| Square | 256×256px | `panel_sq.png` | Desktop side panels, next piece |

Transparent inner area so text/content shows through.

---

### 6. Title Logo

**Prompt:**
> "Game title text 'TETRIS ROYALE' in bold 3D metallic gold letters with thick dark outline, slight perspective tilt, sparkle effects, banner ribbon behind in royal blue — [STYLE BASE]"

**Order 2 sizes:**

| Variant | Size | File | Use |
|---------|------|------|-----|
| Full | 800×200px | `logo_full.png` | Desktop header |
| Compact | 400×100px | `logo_compact.png` | Mobile title bar |

---

### 7. Touch Control Buttons (6 buttons)

**Missing from original plan!** V1 uses plain CSS buttons. V2 needs themed sprites.

**Base prompt:**
> "A round game control button with embossed icon, stone and gold rim, glossy surface, designed as a mobile game touch button — [STYLE BASE]"

| Button | Icon addition | File |
|--------|--------------|------|
| Left | "left arrow icon carved into surface" | `btn_left.png` |
| Right | "right arrow icon carved into surface" | `btn_right.png` |
| Down | "down arrow icon carved into surface" | `btn_down.png` |
| Rotate | "circular rotate arrow icon" | `btn_rotate.png` |
| Hard Drop | "double down arrow / fast drop icon" | `btn_drop.png` |
| Pause | "two vertical bars / pause icon" | `btn_pause.png` |

**Size:** 128×128px each, transparent background
**Displayed at:** ~40-50px on mobile. 128 = 2.5x+ retina safe.

---

### 8. Effect Sprites

**8a. Line Clear Flash:**
> "Horizontal energy explosion wave, bright white and gold particle burst with sparkles and star shapes, cartoon shockwave — [STYLE BASE]"
>
> Size: **512×64px** | File: `fx_lineclear.png`

**8b. Tetris (4-line) Celebration:**
> "Large celebratory explosion effect, gold coins, stars, sparkles, confetti burst, radial energy wave — [STYLE BASE]"
>
> Size: **512×512px** | File: `fx_tetris.png`

**8c. Level Up Banner:**
> "Upward golden arrow with 'LEVEL UP' text, bold metallic letters, sparkle trail — [STYLE BASE]"
>
> Size: **512×256px** | File: `fx_levelup.png`

**8d. Combo Number Backdrop:**
> "A small explosive starburst shape in gold and orange, designed as a backdrop behind combo numbers, cartoon burst — [STYLE BASE]"
>
> Size: **256×256px** | File: `fx_combo_bg.png`

---

### 9. Particle Sprites (individual elements)

**For Phaser particle emitters.** Small individual sprites that get scattered/spawned in bulk.

| Particle | Prompt addition | Size | File |
|----------|----------------|------|------|
| Sparkle | "a single 4-pointed sparkle/twinkle, white and gold" | 64×64 | `particle_sparkle.png` |
| Star | "a single cartoon 5-pointed star, golden yellow" | 64×64 | `particle_star.png` |
| Gem shard | "a single small crystal shard fragment, cyan and white" | 64×64 | `particle_shard.png` |
| Coin | "a single small gold coin with crown stamp" | 64×64 | `particle_coin.png` |

---

### 10. XP / Progress Bar

**10a. Bar Frame:**
> "A horizontal progress bar frame, ornate gold and stone edges, empty/dark inside, medieval game UI element — [STYLE BASE]"
>
> Size: **512×64px** | File: `xp_frame.png`

**10b. Bar Fill:**
> "A horizontal glowing energy fill bar, bright blue-cyan gradient with sparkle particles, smooth rounded ends — [STYLE BASE]"
>
> Size: **512×48px** | File: `xp_fill.png`

---

### 11. Next Piece Frame

> "A small ornate display frame, stone and gold decorative square border with inner dark space, gem accents on corners — [STYLE BASE]"
>
> Size: **256×256px** | File: `frame_next.png`

(Doubled from 128 for retina.)

---

### 12. Settings / Sound Icons

| Icon | Prompt addition | Size | File |
|------|----------------|------|------|
| Settings gear | "a medieval stone gear/cog icon with gold accents" | 128×128 | `icon_settings.png` |
| Music on | "a golden musical note icon with sparkle" | 128×128 | `icon_music_on.png` |
| Music off | "a gray musical note icon with red X" | 128×128 | `icon_music_off.png` |
| Sound on | "a golden speaker icon with sound waves" | 128×128 | `icon_sfx_on.png` |
| Sound off | "a gray speaker icon with red X" | 128×128 | `icon_sfx_off.png` |

---

### 13. V2 App Icon / Favicon

**13a. App icon (square, for PWA/favicon):**
> "A square app icon for a Tetris game, dark blue background, golden crown on top of colorful gem tetris blocks (cyan, purple, green, red), ornate gold border frame — [STYLE BASE], NO transparent background, solid dark blue fill"
>
> Size: **512×512px** | File: `icon_v2_512.png`

**13b. Small favicon (simplified):**
> "A tiny simplified app icon, dark background with a single colorful gem T-tetromino shape and small golden crown, bold and readable at small sizes — [STYLE BASE], solid dark background"
>
> Size: **64×64px** | File: `icon_v2_64.png`

---

### 14. Background Pattern (optional but nice)

> "A dark navy blue subtle repeating diamond/argyle pattern with faint gold lines, medieval royal tapestry feel, seamless tileable — [STYLE BASE], NOT transparent, dark solid background"
>
> Size: **256×256px**, tileable | File: `bg_pattern.png`

Used as the page/body background behind the game UI.

---

### 15. Font

For text elements, look for a font that matches the Clash Royale style:
- **Supercell Magic** (the actual CR font) — or similar bold, rounded, cartoon-style
- Alternatives: **Luckiest Guy**, **Banger**, **Lilita One** (Google Fonts)
- Key traits: thick, bold, slightly rounded, high readability at small sizes, playful

---

### Summary Checklist

| # | Asset | Count | Size | Files |
|---|-------|-------|------|-------|
| 1 | Character full body | 5 | 512×512 | `char_*.png` |
| 2 | Character avatar (head) | 5 | 128×128 | `avatar_*.png` |
| 3 | Block textures | 7 + 1 ghost | 128×128 | `block_*.png` |
| 4a | Board inner texture | 1 | 256×256 tileable | `board_texture.png` |
| 4b | Board frame (9-slice) | 1 | 512×1024 | `board_frame.png` |
| 5 | UI panel frames | 2 | various | `panel_*.png` |
| 6 | Title logo | 2 (full + compact) | 800×200 / 400×100 | `logo_*.png` |
| 7 | Touch control buttons | 6 | 128×128 | `btn_*.png` |
| 8 | Effect sprites | 4 | various | `fx_*.png` |
| 9 | Particle sprites | 4 | 64×64 | `particle_*.png` |
| 10 | XP bar (frame + fill) | 2 | 512×64 / 512×48 | `xp_*.png` |
| 11 | Next piece frame | 1 | 256×256 | `frame_next.png` |
| 12 | Settings/sound icons | 5 | 128×128 | `icon_*.png` |
| 13 | App icon / favicon | 2 | 512×512 / 64×64 | `icon_v2_*.png` |
| 14 | Background pattern | 1 | 256×256 tileable | `bg_pattern.png` |
| 15 | Font | 1 (Google Fonts) | — | — |

**Total: ~46 images to generate**

---

## V2 — Lessons from V1 (Mobile-First Rules)

These rules come directly from building V1 and must be followed in V2:

1. **No fixed pixel sizes in CSS** — use `clamp(min, vw, max)` for all mobile text/padding
2. **Flex column layout on mobile** — title, info, game (flex-1), controls, bottom bar. All sections `shrink-0` except game area.
3. **Game area measures available space** — JS reads `#game-area` bounding rect, not a guessed pixel reserve
4. **Phaser Scale.FIT** handles canvas scaling — just size the container correctly
5. **Don't use `display: none` on Phaser's parent** — use `opacity: 0` for FOUC prevention
6. **Resize handler** — debounced, recalculates on orientation change
7. **Touch buttons need generous hit targets** — minimum 44×44px display size (Apple HIG)
8. **9-slice for all panels** — UI panels MUST stretch to any aspect ratio. Order assets with distinct corners/edges.
9. **Import CSS via JS** (`import "./main.css"`) — required for Tailwind 4 + Vite
10. **All assets in `public/`** — Vite copies them to build output, reference as `/filename.png`

---

## Version 2 — Implementation Notes

### What Changes from V1
- Replace procedural block drawing with sprite-based rendering (`this.add.image`)
- Replace grid background with board texture + frame (9-slice)
- Add character: full body on desktop, avatar + pop-up overlays on mobile
- Replace CSS panels with sprite-based UI frames (9-slice NinePatch)
- Add particle systems for line clear / Tetris effects (using particle sprites)
- Themed touch buttons with sprite images instead of CSS
- New music: orchestral/epic mobile game style (still Web Audio or load MP3)
- Screen shake on hard drop and Tetris
- Bouncy score animation (tween)
- XP/progression bar (visual only for now)
- V2-specific favicon and PWA icons

### What Stays the Same
- All game logic (Board, Tetrominos, rotation, scoring)
- Alpine.js ↔ Phaser callback architecture
- Server, Vite build, project structure
- Mobile-first responsive layout + touch controls
- `flex-1 min-h-0` game area + `calcGameSize()` measurement approach
- Both versions must work on mobile AND desktop

---

## Cross-Version Rule: Mobile + Web

**Both versions MUST be mobile-first and web-responsive.**
- Touch controls on all versions
- Responsive layout that adapts to screen size
- Dynamic canvas scaling via `calcGameSize()` + Phaser Scale.FIT
- No version is desktop-only
- Assets sized for retina (2x-3x minimum)
