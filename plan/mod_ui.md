# Module: UI (Alpine.js + Tailwind)

## Game UI  [User Input]
Beautiful old-style Tetris look with game information panels.

## Game UI  [AI Feedback]
(empty — no issues)

## Game UI  [AI Implementation]
- **Desktop layout**: 3-column (left panel | game canvas | right panel)
- **Mobile layout**: Stacked flex column filling 100dvh — title, info bar, game (flex-1), touch controls, bottom bar
- **Left panel (desktop)**: Score, Level, Lines, High Score (with neon glow effects)
- **Right panel (desktop)**: Next piece preview (canvas), Controls guide, Sound settings, Game state buttons
- **Mobile info bar**: Horizontal compact row — Score, Level, Lines, High, Next piece (all inline)
- **Mobile touch controls**: Arrow buttons (left/down/right) + action buttons (rotate/drop)
- **Mobile bottom bar**: Start/Pause/Resume + Music/SFX toggles
- **Styling**: Retro arcade aesthetic — "Press Start 2P" font, neon colors, CRT scanlines, vignette effect
- **Alpine.js**: Reactive state for score/level/lines/highScore/gameState
- **High score**: Persisted to localStorage
- **Game states**: idle → playing → paused/gameover (with appropriate UI for each)
- **Sound settings**: Music ON/OFF and SFX ON/OFF toggle buttons
- **CSS import**: Tailwind CSS imported via JS (`import "./main.css"`) for proper Vite processing
- **FOUC prevention**: `x-cloak` + inline `<style>` hides content until Alpine initializes
- **Flexible scaling**: Game area uses `flex-1 min-h-0` in CSS; JS measures actual available space from `#game-area` element instead of guessing fixed pixel reserves
- **Resize handling**: Debounced resize listener recalculates game size on orientation/viewport changes

## Game UI  [AI Todos]
- Starting level selector
- Fullscreen toggle
