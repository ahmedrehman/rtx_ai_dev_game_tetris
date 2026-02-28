# Module: V2 Effects & Particles

## Effects  [User Input]
Juicy game feel: particle explosions on line clears, screen shake, bouncy score numbers, level up banners, combo indicators.

## Effects  [AI Feedback]
- Phaser's particle system (`this.add.particles()`) handles sparkle/star/shard/coin emitters
- Screen shake via `this.cameras.main.shake(duration, intensity)`
- Score bounce via `this.tweens.add()` on the score text — scale up then back
- Line clear effect: position `fx_lineclear.png` sprite at each cleared row, flash + fade out
- Tetris effect: center `fx_tetris.png`, radial scale tween + particle burst
- All effects should be short (0.3-1.5s) and non-blocking — game continues during effects
- Level up banner: fly in from bottom, hold 1s, fly out top
- Combo backdrop: scale in behind combo text, pulse, scale out

## Effects  [AI Implementation]
Not started.

## Effects  [AI Todos]
- [ ] Line clear effect: flash sprite per row, 0.3s fade, particle burst
- [ ] Tetris effect: centered burst sprite + screen shake + massive particle shower
- [ ] Level up banner: tween from bottom to center, hold, fly out top
- [ ] Combo backdrop: starburst behind "x2" "x3" text, pulse tween
- [ ] Particle emitters: configure sparkle, star, shard, coin with appropriate speeds/lifespans
- [ ] Screen shake: small on hard drop (50ms, 0.003), big on Tetris (200ms, 0.01)
- [ ] Score bounce tween: scale 1→1.3→1 over 200ms on score change
- [ ] Hard drop impact: small particle burst at landing position
