# Module: V2 UI Layout

## V2 UI  [User Input]
Clash Royale-inspired mobile game UI. Themed panels, sprite buttons, character avatar, XP bar. Mobile-first layout with desktop expansion.

## V2 UI  [AI Feedback]
- V2 UI is a mix of Phaser (game board, effects) and HTML/Alpine.js (outer layout, responsive shell)
- Touch buttons: HTML `<img>` buttons — simpler hit targets and accessibility
- NineSlice panels: CSS `border-image` with panel PNGs for HTML elements
- bg_pattern.png as CSS `background-image` tiled on body
- FOUC: same `opacity: 0` / `x-cloak` approach as V1

## V2 UI  [AI Implementation]
Implemented in `src/client/modern/`:
- `index.html`: Full themed layout with mobile + desktop responsive design
- `main.css`: Tailwind 4 with V2 theme variables (navy, royal, gold, wood, stone)
- `main.ts`: `tetrisRoyaleApp()` Alpine function with Phaser init
- Mobile layout: title bar (avatar + logo_compact + settings) → info bar (panel_h 9-slice) → game → touch controls (btn_*.png) → XP bar + sound toggles
- Desktop layout: header (logo_full) → 3-column (character | game | info panels) → footer XP bar
- Background: `bg_pattern.png` tiled 64x64 on body
- Touch buttons: `<img src="/assets/v2/btn_*.png">` with `@pointerdown`
- Sound toggles: reactive Alpine `musicOn`/`sfxOn` swapping icon_music/sfx on/off
- XP bar: xp_frame + xp_fill, width controlled by `:style="{ width: xpPercent + '%' }"`
- Game state overlays: START (gold gradient button, pulse animation), PAUSED (gold text), GAME OVER (red text + score + retry button)
- FOUC prevention: `[x-cloak] { opacity: 0 }` + `body { background-color: #0D1B2A }`

## V2 UI  [AI Todos]
- [x] V2 HTML entry page (`src/client/modern/index.html`)
- [x] V2 main.ts entry (same Alpine↔Phaser pattern as V1)
- [x] V2 CSS with themed variables
- [x] Mobile layout: title bar → info bar → game → controls → XP bar
- [x] Desktop layout: header → 3-column → XP bar
- [x] Background: `bg_pattern.png` tiled on body
- [x] Title bar: avatar + compact logo + settings icon
- [x] Info panels: panel_h.png as border-image
- [x] Touch buttons: `btn_*.png` images with pointer events
- [x] Sound toggles: icon_music/sfx on/off swap
- [x] XP bar: frame + fill, Alpine-controlled width
- [x] Game state overlays: START / PAUSED / GAME OVER
