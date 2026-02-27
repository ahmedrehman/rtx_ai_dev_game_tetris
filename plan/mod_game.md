# Module: Game (Phaser Tetris)

## Tetris Core  [User Input]
Classic Tetris game, beautiful old-style arcade look. Built with Phaser game engine.

## Tetris Core  [AI Feedback]
(empty — no issues)

## Tetris Core  [AI Implementation]
- **Board**: 10x20 grid, collision detection, line clearing, ghost piece projection
- **Pieces**: All 7 standard tetrominoes (I, O, T, S, Z, J, L) with NES-style neon colors
- **Rotation**: SRS (Super Rotation System) with wall kicks for both normal and I-piece
- **Scoring**: NES-style (100/300/500/800 × level), soft drop (+1/cell), hard drop (+2/cell)
- **Speed**: 21-level speed curve from 800ms to 30ms per drop
- **Controls**: Arrow keys (move/rotate), Space (hard drop), Z (CCW rotate), P/Esc (pause)
- **DAS**: Delayed Auto-Shift (170ms initial, 50ms repeat) for smooth horizontal movement
- **Lock delay**: 500ms with reset on move/rotate
- **Randomizer**: 7-bag system
- **Ghost piece**: Shows landing position at reduced opacity
- **Line clear animation**: Flash effect before clearing
- **Game over**: Detects when piece locks above board OR can't spawn
- **Music**: Korobeiniki (Theme A) synthesized via Web Audio API, square wave melody + triangle bass
- **SFX**: Move, rotate, hard drop, lock, line clear, Tetris (4-line), game over — all procedural
- **Settings**: Music ON/OFF and SFX ON/OFF toggles in UI, music pauses/resumes with game

## Tetris Core  [AI Todos]
- Hold piece functionality
- T-spin detection and scoring
- Combo scoring
- Statistics display (piece counts)
