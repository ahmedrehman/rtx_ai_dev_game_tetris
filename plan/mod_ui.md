# Module: UI (Alpine.js + Tailwind)

## Game UI  [User Input]
Beautiful old-style Tetris look with game information panels.

## Game UI  [AI Feedback]
(empty — no issues)

## Game UI  [AI Implementation]
- **Layout**: 3-column (left panel | game canvas | right panel)
- **Left panel**: Score, Level, Lines, High Score (with neon glow effects)
- **Right panel**: Next piece preview (canvas), Controls guide, Game state buttons
- **Styling**: Retro arcade aesthetic — "Press Start 2P" font, neon colors, CRT scanlines, vignette effect
- **Alpine.js**: Reactive state for score/level/lines/highScore/gameState
- **High score**: Persisted to localStorage
- **Game states**: idle → playing → paused/gameover (with appropriate UI for each)
- **Sound settings**: Music ON/OFF and SFX ON/OFF toggle buttons in right panel
- **CSS import**: Tailwind CSS imported via JS (`import "./main.css"`) for proper Vite processing

## Game UI  [AI Todos]
- Mobile touch controls
- Starting level selector
- Fullscreen toggle
