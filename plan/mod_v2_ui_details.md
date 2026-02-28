# V2 UI — Layout Details

## Mobile Layout Structure (360px reference width)

```
┌─────────────────────────────────────┐
│ TITLE BAR (shrink-0, ~40px)        │
│ [avatar 32px] [logo_compact] [⚙]   │
├─────────────────────────────────────┤
│ INFO BAR (shrink-0, ~36px)         │
│ [SCORE][LEVEL][LINES][NEXT]         │
│  panel_h.png as border-image bg    │
├─────────────────────────────────────┤
│                                     │
│ GAME AREA (flex-1 min-h-0)         │
│   ┌──────────────────────┐          │
│   │ Phaser Canvas         │          │
│   │ - board_texture tiled │          │
│   │ - board_frame overlay │          │
│   │ - sprite blocks       │          │
│   │ - character popup     │          │
│   │ - particle effects    │          │
│   └──────────────────────┘          │
│                                     │
├─────────────────────────────────────┤
│ TOUCH CONTROLS (shrink-0, ~48px)   │
│ [◀][▼][▶]         [↻][⏬][⏸]      │
│  btn_*.png images                   │
├─────────────────────────────────────┤
│ BOTTOM BAR (shrink-0, ~24px)       │
│ [═══ XP BAR ═══] [♫] [🔊]         │
│  xp_frame + xp_fill     icons      │
└─────────────────────────────────────┘
```

## Desktop Layout Structure (>640px)

```
┌─────────────────────────────────────────────┐
│ HEADER (shrink-0)                           │
│         [logo_full.png centered]             │
├──────────┬─────────────────┬────────────────┤
│ LEFT COL │ CENTER          │ RIGHT COL      │
│ (140px)  │ (flex-1)        │ (160px)        │
│          │                 │                │
│ char_    │ Phaser Canvas   │ [NEXT PIECE]   │
│ idle.png │ - board         │  frame_next    │
│ (110px)  │ - blocks        │  + block sprite│
│          │ - effects       │                │
│ "Knight" │                 │ [SCORE: 12400] │
│          │                 │ [LEVEL: 3]     │
│          │                 │ [LINES: 24]    │
│          │                 │                │
│          │                 │ [⚙] [♫] [🔊]  │
├──────────┴─────────────────┴────────────────┤
│ FOOTER: [══════ XP BAR ══════]              │
└─────────────────────────────────────────────┘
```

## Info Panel Styling

Each info box (SCORE, LEVEL, LINES, NEXT) uses:
- `panel_h.png` or `panel_sq.png` as CSS `border-image` (9-slice via CSS)
- Or as `background-image` with `border-image-slice` property
- Text rendered as HTML on top with themed font

```css
.v2-panel {
  border: 12px solid transparent;
  border-image: url('/assets/v2/panel_h.png') 24 fill stretch;
  /* 24 = corner size in pixels for 9-slice */
}
```

## Touch Button Layout

Mobile buttons arranged in two groups:
- Left group (flex-1): ◀ ▼ ▶ — movement, evenly spaced
- Right group: ↻ ⏬ ⏸ — actions, fixed width

Each button: `<img>` with `pointerdown` event, `clamp(36px, 10vw, 48px)` display size.
Touch feedback: CSS `transform: scale(0.9)` on `:active`.

## XP Bar

HTML implementation (not Phaser):
```html
<div class="xp-bar">
  <img src="/assets/v2/xp_frame.png" class="xp-frame"/>
  <div class="xp-fill-container">
    <img src="/assets/v2/xp_fill.png" class="xp-fill" :style="{ width: xpPercent + '%' }"/>
  </div>
</div>
```

XP fills on every line clear. Visual-only, resets each game. Purely for juice/satisfaction.

## Character Pop-up (Mobile)

When triggered by game events, a pop-up appears:
- Position: bottom-right of game area, above touch controls
- Size: clamp(60px, 18vw, 100px)
- Animation: scale 0→1 (150ms ease-out), hold 2s, scale 1→0 (200ms ease-in)
- Z-index above game canvas but below touch controls
- Uses HTML `<img>` positioned absolutely, NOT inside Phaser canvas
- Alpine.js controls visibility: `x-show` with CSS transition

## Color Variables (CSS)

```css
@theme {
  --color-v2-navy: #0D1B2A;
  --color-v2-royal: #1E3A8A;
  --color-v2-gold: #D4A017;
  --color-v2-gold-bright: #FFD700;
  --color-v2-wood: #5D4037;
  --color-v2-stone: #37474F;
  --color-v2-cyan: #00E5FF;
}
```
