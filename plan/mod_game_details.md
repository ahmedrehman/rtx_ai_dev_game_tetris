# Game Details

## Board Configuration
- Width: 10 cells, Height: 20 cells
- Cell size: 28px
- Canvas: 280×560px

## Block Rendering
Each block is drawn with a 3D bevel effect:
- Main fill color
- Top-left highlight (+60 RGB, 60% opacity)
- Bottom-right shadow (-80 RGB, 60% opacity)
- Inner glow (white, 15% opacity)
- Ghost piece: same shape at 20% opacity

## Color Scheme
| Piece | Color | Hex |
|-------|-------|-----|
| I | Cyan | #00fff5 |
| O | Yellow | #ffff00 |
| T | Purple | #9b59b6 |
| S | Green | #39ff14 |
| Z | Red | #ff0040 |
| J | Blue | #4444ff |
| L | Orange | #ff6600 |

## Speed Curve (ms per drop)
Level 0: 800ms → Level 5: 380ms → Level 10: 80ms → Level 19+: 30ms
