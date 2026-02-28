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

### Layout Concept
```
┌─────────────────────────────────────────┐
│  [Crown Logo]   TETRIS ROYALE           │
├──────────┬──────────────┬───────────────┤
│          │              │               │
│ CHARACTER│  GAME BOARD  │  NEXT PIECE   │
│ (idle/   │  (themed     │  SCORE        │
│  react/  │   blocks     │  COMBO        │
│  cheer/  │   on stone   │  LEVEL        │
│  worry)  │   board)     │               │
│          │              │  [ABILITIES]  │
│          │              │               │
├──────────┴──────────────┴───────────────┤
│  [XP BAR]                [SETTINGS]     │
└─────────────────────────────────────────┘
```

### Character
A "Tetris Knight" or "Block Mage" standing beside the board:
- **Idle**: Slight bounce, blinking
- **Line clear (1-2)**: Nod / thumbs up
- **Tetris (4 lines)**: Victory pose, sparkle effects
- **Danger (stack high)**: Worried expression, sweating
- **Game over**: Defeated slump

---

## Assets to Order from Ludo AI

### Style Prompt Base
Use this as the base style description for ALL asset requests:

> **"Clash Royale art style — vibrant cartoon 3D render, thick dark outlines, glossy materials, rich saturated colors, soft shadows, slightly exaggerated proportions, mobile game UI quality, transparent PNG background"**

---

### 1. Character Sprite Sheet

**Prompt:**
> "A fantasy knight character in Clash Royale art style — vibrant cartoon 3D render, thick dark outlines, glossy armor with blue and gold accents, friendly confident expression, chibi proportions (large head, small body), transparent PNG background"

**Variations needed (order each as separate image or sprite sheet):**

| State | Description for prompt |
|-------|----------------------|
| Idle | "standing relaxed, slight smile, one hand on hip" |
| Happy | "thumbs up, big grin, small sparkle effects" |
| Excited | "victory pose, both arms raised, celebratory, star effects around" |
| Worried | "nervous expression, sweat drop, hands clasped together" |
| Defeated | "slumped over, sad expression, small cloud above head" |

**Size:** 256×256px per frame, transparent background

---

### 2. Block Textures (Tetromino Pieces)

**Prompt:**
> "A single glossy gem-like game block tile in Clash Royale art style — thick dark outline, shiny reflective surface, inner highlight, soft drop shadow, square shape, transparent PNG background"

**Order 7 color variants:**

| Piece | Color prompt addition |
|-------|----------------------|
| I | "bright cyan / aqua blue crystal" |
| O | "golden yellow gem" |
| T | "royal purple amethyst" |
| S | "emerald green gem" |
| Z | "ruby red gem" |
| J | "sapphire dark blue" |
| L | "bright orange amber gem" |

**Size:** 64×64px each, transparent background

---

### 3. Game Board Background

**Prompt:**
> "A stone game board background texture in Clash Royale art style — medieval stone slab with subtle carved grid lines, dark gray-blue stone, slight moss/wear on edges, thick border frame with gold trim and rivets, portrait orientation, game UI element"

**Size:** 512×1024px (will be scaled to board dimensions)

---

### 4. UI Frame / Panel Background

**Prompt:**
> "A medieval wooden panel with gold trim border in Clash Royale art style — dark rich wood texture, ornate gold corner decorations, thick dark outline, glossy finish, game UI panel element, transparent PNG background"

**Size:** 512×256px, transparent background

---

### 5. Logo / Title

**Prompt:**
> "Game title text 'TETRIS ROYALE' in Clash Royale art style — bold 3D metallic gold letters with thick dark outline, slight perspective tilt, sparkle effects on letters, banner ribbon behind text in royal blue, transparent PNG background"

**Size:** 800×200px, transparent background

---

### 6. Effect Sprites

**Line Clear Effect:**
> "Horizontal energy explosion wave in Clash Royale art style — bright white and gold particle burst, sparkles and star shapes, cartoon shockwave, transparent PNG background"
>
> Size: 512×64px

**Tetris (4-line) Effect:**
> "Large celebratory explosion effect in Clash Royale art style — gold coins, stars, sparkles, confetti burst, radial energy wave, transparent PNG background"
>
> Size: 256×256px

**Level Up Effect:**
> "Upward arrow with 'LEVEL UP' text in Clash Royale art style — glowing golden arrow, bold metallic text, sparkle trail, transparent PNG background"
>
> Size: 256×128px

---

### 7. Next Piece Frame

**Prompt:**
> "A small ornate display frame in Clash Royale art style — stone and gold decorative square frame with inner dark space, thick outline, gem accents on corners, game UI element, transparent PNG background"

**Size:** 128×128px, transparent background

---

### 8. Font

For text elements, look for a font that matches the Clash Royale style:
- **Supercell Magic** (the actual CR font) — or similar bold, rounded, cartoon-style
- Alternatives: **Luckiest Guy**, **Banger**, **Lilita One** (Google Fonts)
- Key traits: thick, bold, slightly rounded, high readability, playful

---

### Summary Checklist

| # | Asset | Count | Size |
|---|-------|-------|------|
| 1 | Character states | 5 images | 256×256 each |
| 2 | Block textures | 7 colors | 64×64 each |
| 3 | Board background | 1 | 512×1024 |
| 4 | UI panel | 1 | 512×256 |
| 5 | Title logo | 1 | 800×200 |
| 6 | Effect sprites | 3 types | various |
| 7 | Next piece frame | 1 | 128×128 |
| 8 | Font | 1 (Google Fonts) | — |

**Total: ~19 images to generate**

---

## Version 2 — Implementation Notes

### What Changes from V1
- Replace procedural block drawing with sprite-based rendering (Phaser `this.add.image`)
- Replace grid background with board texture
- Add character sprite with animation state machine
- Replace CSS panels with sprite-based UI frames
- Add particle systems for line clear / Tetris effects
- New music: orchestral/epic mobile game style (still Web Audio or load MP3)
- Screen shake on hard drop and Tetris
- Bouncy score animation (tween)
- XP/progression bar (visual only for now)

### What Stays the Same
- All game logic (Board, Tetrominos, rotation, scoring)
- Alpine.js ↔ Phaser callback architecture
- Server, Vite build, project structure
- Mobile-first responsive layout + touch controls
- Both versions must work on mobile AND desktop

---

## Cross-Version Rule: Mobile + Web

**Both versions MUST be mobile-first and web-responsive.**
- Touch controls on all versions
- Responsive layout that adapts to screen size
- Dynamic canvas scaling
- No version is desktop-only
