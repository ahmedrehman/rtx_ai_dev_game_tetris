# Module: V2 Character System

## Character  [User Input]
A "Tetris Knight" chibi character that reacts to gameplay events. Full body on desktop, avatar + pop-up on mobile. 5 emotional states.

## Character  [AI Feedback]
- Character is purely visual — no gameplay impact
- State transitions should feel responsive (swap texture immediately, then tween in)
- On mobile, pop-ups must not block touch controls or the board
- Pop-up position: bottom-right corner of the board area, above touch controls
- Pop-up should auto-dismiss after 2-3s, with a quick scale-in/scale-out tween
- Desktop full body sits in a fixed position in the left column, just swaps texture
- Multiple rapid events (e.g. back-to-back line clears) should queue or override — don't stack popups

## Character  [AI Implementation]
Not started.

## Character  [AI Todos]
- [ ] Character state machine: idle, happy, excited, worried, defeated
- [ ] State transition rules:
  - idle → default, returns after 2-3s from happy/excited
  - happy → triggered by 1-2 line clear
  - excited → triggered by Tetris (3-4 lines) or combos
  - worried → persistent when stack > row 4
  - defeated → persistent on game over
- [ ] Desktop: full body Image in left column, swap texture on state change
- [ ] Mobile: avatar Image in title bar area (always shows idle or current state)
- [ ] Mobile pop-up: full body Image overlay with scale tween (0→1→0 over 2-3s)
- [ ] Pop-up positioning: anchored to bottom-right of game area, responsive
- [ ] Event integration: hook into GameScene events (lineClear, tetris, danger, gameOver)
