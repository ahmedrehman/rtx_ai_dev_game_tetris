# Ludo AI — Asset Order for Tetris Royale

## Output Format

All assets are **2D PNG sprite images** with a **3D-looking art style**.
"3D render" in the prompts describes the visual look (glossy, shaded, depth) — NOT the output format.
Ludo AI always outputs flat 2D images. Each prompt = one PNG file.

## Ordering Tips

- **One prompt per generation** — copy-paste a single prompt into Ludo
- **Set the size** listed for each prompt in Ludo's generation settings
- **If Ludo doesn't support exact sizes** — generate larger (e.g. 512x512) and scale down afterward. Downscaling looks better than upscaling
- **Generate 2-3 variations** per prompt, pick the best one
- **For the block set** (prompts 11-18) — generate all in one session so the style stays consistent
- **Transparent background** — most prompts require it. If the result has a visible background, remove it with remove.bg or similar tool
- **Save as PNG** — always, even for opaque images (JPG compression ruins sharp edges)
- **Use the exact filename** listed for each prompt (e.g. `block_i.png`)

## Orientation & Alignment Rules

AI image generators tend to tilt, rotate, or add perspective to objects. For game assets this breaks tiling and alignment. Add these rules mentally when reviewing Ludo output:

| Asset Type | Required Orientation | Reject If... |
|-----------|---------------------|-------------|
| **Blocks** (11-18) | Perfectly straight, flat front-facing, edges aligned to canvas edges, NO rotation, NO perspective, NO isometric tilt | Tilted, diamond-shaped, 3/4 view, rotated even slightly |
| **Buttons** (25-30) | Perfectly circular, centered, icon pointing exactly in the described direction | Oval, tilted, icon off-center |
| **Panels** (21-22) | Edges perfectly parallel to canvas edges, corners at exact 90 degrees | Perspective, trapezoid shape, tilted |
| **XP bars** (39-40) | Perfectly horizontal, edges aligned to canvas edges | Curved, wavy, tilted |
| **Board frame** (20) | Edges straight and parallel to canvas, corners square | Perspective, barrel distortion |
| **Icons** (42-46) | Centered, upright, symmetrical | Tilted, off-center |
| **Particles/FX** (31-38) | Free — angle doesn't matter | n/a |
| **Characters** (1-10) | Upright, feet at bottom, centered | Falling over, extreme angle |
| **Logos** (23-24) | Text horizontal and level, readable left to right | Wavy, arched, rotated |
| **Background** (49) | Pattern aligned to canvas grid, tileable | Pattern at angle to canvas |

**Key phrases to add if Ludo keeps tilting things:**
- "perfectly straight, no rotation, no tilt, no perspective"
- "edges aligned exactly to the image borders"
- "flat front-on orthographic view, not isometric"
- "no 3D perspective, no vanishing point"

## Color Palette Reference

Use these exact color descriptions in prompts for consistency across all assets:

| Role | Color Name | Hex | Prompt Description |
|------|-----------|-----|-------------------|
| Primary UI | Royal Blue | #1E3A8A | deep royal cobalt blue |
| Accent Gold | Warm Gold | #D4A017 | warm burnished gold, like polished brass |
| Highlight | Bright Gold | #FFD700 | bright shiny gold, metallic yellow |
| Block I | Cyan | #00E5FF | electric cyan, aquamarine blue crystal |
| Block O | Yellow | #FFD600 | warm golden yellow, amber topaz |
| Block T | Purple | #9C27B0 | deep royal purple, amethyst violet |
| Block S | Green | #4CAF50 | vivid emerald green, jade crystal |
| Block Z | Red | #F44336 | fiery ruby red, deep crimson gem |
| Block J | Blue | #1565C0 | deep sapphire blue, midnight cobalt |
| Block L | Orange | #FF9800 | bright tangerine orange, warm amber |
| Ghost | Gray | #78909C | smoky gray-blue, translucent slate |
| Wood/Panel | Brown | #5D4037 | rich dark mahogany, warm chocolate brown |
| Stone | Dark Gray | #37474F | charcoal slate gray, dark weathered stone |
| Neon Glow | White-Cyan | #E0F7FA | soft white-cyan glow, icy shimmer |
| Background | Navy | #0D1B2A | very dark midnight navy, almost black-blue |

## Style Base

**Append to EVERY prompt:**
> Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick 2-3px dark outlines around all shapes, glossy plastic-like materials with specular highlights, rich saturated colors, soft diffused shadows underneath, top-left warm lighting, slightly exaggerated chunky proportions, clean vector-like edges, high-quality mobile game UI asset, centered on canvas, transparent PNG background

---

## 1. Character — Full Body (5 images)

**Size:** 512x512px | **Format:** PNG, transparent background

**Prompt 1 — `char_idle.png`:**
> A cute fantasy knight character in chibi proportions with an oversized round head and small stubby body, wearing polished glossy armor in deep royal cobalt blue with warm burnished gold trim and rivets, a small golden crown sits slightly crooked on the helmet, large expressive round eyes with white specular highlights, small friendly smile, one hand resting casually on hip, the other arm relaxed at the side, soft warm top-left lighting casting a gentle shadow to the bottom-right, the armor has visible brushstroke-like reflections in lighter blue and white, feet are small rounded boots with gold buckles, overall feel is friendly and inviting like a Clash Royale troop card. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick 2-3px dark outlines around all shapes, glossy plastic-like materials with specular highlights, rich saturated colors, soft diffused shadows underneath, slightly exaggerated chunky proportions, clean vector-like edges, high-quality mobile game UI asset, centered on canvas, transparent PNG background

**Prompt 2 — `char_happy.png`:**
> A cute fantasy knight character in chibi proportions with an oversized round head and small stubby body, wearing polished glossy armor in deep royal cobalt blue with warm burnished gold trim and rivets, a small golden crown on the helmet, big wide grin showing teeth, eyes squeezed into happy crescents, giving a confident thumbs up with right hand, left fist on hip in a power pose, two small bright gold sparkle stars floating near the face, slight lean forward with excitement, warm top-left lighting with a soft shadow underneath, the blue armor catches light with white-cyan specular streaks, gold trim glows warmly, cheerful celebratory energy. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick 2-3px dark outlines around all shapes, glossy plastic-like materials with specular highlights, rich saturated colors, soft diffused shadows underneath, slightly exaggerated chunky proportions, clean vector-like edges, high-quality mobile game UI asset, centered on canvas, transparent PNG background

**Prompt 3 — `char_excited.png`:**
> A cute fantasy knight character in chibi proportions with an oversized round head and small stubby body, wearing polished glossy armor in deep royal cobalt blue with warm burnished gold trim and rivets, a small golden crown on the helmet, ecstatic victory pose with both arms raised high above head fists clenched, mouth wide open yelling in triumph, eyes sparkling with star-shaped highlights, small golden stars and sparkle particles floating around the character in a burst pattern, slight jump pose with feet slightly off ground, dynamic energy lines radiating outward, bright warm top-left lighting, the armor gleams with intense white specular highlights on the chest and shoulders. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick 2-3px dark outlines around all shapes, glossy plastic-like materials with specular highlights, rich saturated colors, soft diffused shadows underneath, slightly exaggerated chunky proportions, clean vector-like edges, high-quality mobile game UI asset, centered on canvas, transparent PNG background

**Prompt 4 — `char_worried.png`:**
> A cute fantasy knight character in chibi proportions with an oversized round head and small stubby body, wearing polished glossy armor in deep royal cobalt blue with warm burnished gold trim and rivets, a small golden crown slightly tilted on the helmet, nervous anxious expression with eyebrows raised and tilted upward in worry, mouth as a small wobbly frown, a large cartoon sweat drop on the right side of the head in light blue, both hands clasped together in front of the chest in a pleading or worried gesture, shoulders hunched slightly inward, overall posture tense and uncertain, the armor appears slightly less shiny with more muted reflections to match the worried mood, softer more diffused lighting. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick 2-3px dark outlines around all shapes, glossy plastic-like materials with specular highlights, rich saturated colors, soft diffused shadows underneath, slightly exaggerated chunky proportions, clean vector-like edges, high-quality mobile game UI asset, centered on canvas, transparent PNG background

**Prompt 5 — `char_defeated.png`:**
> A cute fantasy knight character in chibi proportions with an oversized round head and small stubby body, wearing polished glossy armor in deep royal cobalt blue with warm burnished gold trim and rivets, a small golden crown drooping to one side on the helmet, slumped over posture with shoulders drooped down, arms hanging loose, head tilted downward, sad droopy eyes with small eyebrows angled down, tiny frown mouth, a small dark gray-blue cartoon rain cloud hovering just above the head with tiny rain lines, the armor reflections are dimmer and cooler in tone with blue-gray tints, overall desaturated feel compared to the happy poses, subdued top lighting. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick 2-3px dark outlines around all shapes, glossy plastic-like materials with specular highlights, rich saturated colors, soft diffused shadows underneath, slightly exaggerated chunky proportions, clean vector-like edges, high-quality mobile game UI asset, centered on canvas, transparent PNG background

---

## 2. Character — Head/Avatar (5 images)

**Size:** 128x128px | **Format:** PNG, transparent background

**Prompt 6 — `avatar_idle.png`:**
> Close-up head and shoulders portrait of a cute fantasy knight character, large round head filling most of the frame, circular composition, polished glossy armor collar and shoulder plates visible in deep royal cobalt blue with warm burnished gold trim, a small golden crown sits on top of the helmet, large expressive round eyes with big white specular highlight dots, small friendly smile, skin has warm peachy tones with soft pink cheeks, the gold crown catches bright specular highlights from top-left warm lighting, background is completely empty and transparent, designed to fit inside a circular avatar frame in a mobile game UI. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick 2-3px dark outlines around all shapes, glossy plastic-like materials with specular highlights, rich saturated colors, soft diffused shadows underneath, slightly exaggerated chunky proportions, clean vector-like edges, high-quality mobile game UI asset, centered on canvas, transparent PNG background

**Prompt 7 — `avatar_happy.png`:**
> Close-up head and shoulders portrait of a cute fantasy knight character, large round head filling most of the frame, circular composition, polished glossy armor collar in deep royal cobalt blue with warm burnished gold trim, golden crown on helmet, big wide joyful grin showing small white teeth, eyes squeezed into happy crescent shapes, small bright gold sparkle stars near the cheeks, warm peachy skin with rosy pink cheeks flushed with happiness, the gold trim and crown glow warmly under bright top-left lighting, energetic happy mood, designed for circular avatar frame in mobile game UI. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick 2-3px dark outlines around all shapes, glossy plastic-like materials with specular highlights, rich saturated colors, soft diffused shadows underneath, slightly exaggerated chunky proportions, clean vector-like edges, high-quality mobile game UI asset, centered on canvas, transparent PNG background

**Prompt 8 — `avatar_excited.png`:**
> Close-up head and shoulders portrait of a cute fantasy knight character, large round head filling most of the frame, circular composition, polished glossy armor collar in deep royal cobalt blue with warm burnished gold trim, golden crown on helmet, mouth wide open in an excited yell of joy, eyes wide with star-shaped sparkle highlights, small golden stars and confetti particles bursting around the head, warm peachy skin with bright pink excited cheeks, the crown has extra bright specular highlights as if glowing, high energy celebratory expression, designed for circular avatar frame in mobile game UI. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick 2-3px dark outlines around all shapes, glossy plastic-like materials with specular highlights, rich saturated colors, soft diffused shadows underneath, slightly exaggerated chunky proportions, clean vector-like edges, high-quality mobile game UI asset, centered on canvas, transparent PNG background

**Prompt 9 — `avatar_worried.png`:**
> Close-up head and shoulders portrait of a cute fantasy knight character, large round head filling most of the frame, circular composition, polished glossy armor collar in deep royal cobalt blue with warm burnished gold trim, golden crown slightly tilted nervously on helmet, worried anxious expression with upward-angled eyebrows and small wobbly frown, a cartoon sweat drop on the right temple in pale blue, eyes looking slightly upward with concern, warm peachy skin with slightly pale worried cheeks, the lighting is softer and more diffused to match the anxious mood, designed for circular avatar frame in mobile game UI. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick 2-3px dark outlines around all shapes, glossy plastic-like materials with specular highlights, rich saturated colors, soft diffused shadows underneath, slightly exaggerated chunky proportions, clean vector-like edges, high-quality mobile game UI asset, centered on canvas, transparent PNG background

**Prompt 10 — `avatar_defeated.png`:**
> Close-up head and shoulders portrait of a cute fantasy knight character, large round head filling most of the frame, circular composition, polished glossy armor collar in deep royal cobalt blue with warm burnished gold trim, golden crown drooping sadly to one side on helmet, sad expression with droopy downcast eyes and small downturned mouth, tiny cartoon tear drop on one cheek in light blue, warm peachy skin with slightly gray-tinted desaturated cheeks, the armor and crown appear less shiny with cooler blue-gray reflections, overall muted and melancholic mood, designed for circular avatar frame in mobile game UI. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick 2-3px dark outlines around all shapes, glossy plastic-like materials with specular highlights, rich saturated colors, soft diffused shadows underneath, slightly exaggerated chunky proportions, clean vector-like edges, high-quality mobile game UI asset, centered on canvas, transparent PNG background

---

## 3. Block Textures (8 images)

**Size:** 128x128px | **Format:** PNG, transparent background

**Important:** Generate all 8 blocks in one session for style consistency. Each block is a single square tile that will be tiled on the game board at 24x24px display size (128px is for retina sharpness).

**Prompt 11 — `block_i.png`:**
> A single square game block tile, perfectly straight flat front-on orthographic view with NO rotation NO tilt NO perspective NO isometric angle, edges perfectly aligned to the image borders horizontally and vertically, shaped like a polished crystal gem cube, electric cyan aquamarine color (#00E5FF), the surface has a glossy glass-like reflective finish with a bright white specular highlight streak in the upper-left corner and a softer secondary highlight in the center, the edges catch light creating a bright cyan-white rim glow, the bottom and right sides are darker teal shadow tones for depth, thick 2-3px dark navy outline around the entire square shape, a tiny inner bevel line separates the top face from the sides giving a slight 3D cube feel, small soft shadow cast underneath on the transparent ground, the overall look is like a polished gem or candy piece from a premium mobile puzzle game. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy materials, rich saturated colors, soft shadows, clean edges, centered on canvas, transparent PNG background

**Prompt 12 — `block_o.png`:**
> A single square game block tile, perfectly straight flat front-on orthographic view with NO rotation NO tilt NO perspective NO isometric angle, edges perfectly aligned to the image borders horizontally and vertically, shaped like a polished crystal gem cube, warm golden yellow amber topaz color (#FFD600), the surface has a glossy honey-like reflective finish with a bright white specular highlight streak in the upper-left corner and a warm golden secondary highlight in the center, the edges catch light creating a bright yellow-white rim glow, the bottom and right sides are deeper amber-orange shadow tones for depth, thick 2-3px dark outline around the entire square shape, a tiny inner bevel line separates the top face from the sides giving a slight 3D cube feel, small soft shadow cast underneath, looks like a polished topaz gem or golden candy piece. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy materials, rich saturated colors, soft shadows, clean edges, centered on canvas, transparent PNG background

**Prompt 13 — `block_t.png`:**
> A single square game block tile, perfectly straight flat front-on orthographic view with NO rotation NO tilt NO perspective NO isometric angle, edges perfectly aligned to the image borders horizontally and vertically, shaped like a polished crystal gem cube, deep royal purple amethyst violet color (#9C27B0), the surface has a glossy grape-like reflective finish with a bright white-pink specular highlight streak in the upper-left corner and a lighter lavender secondary highlight in the center, the edges catch light creating a bright purple-white rim glow, the bottom and right sides are deeper plum-magenta shadow tones for depth, thick 2-3px dark outline around the entire square shape, a tiny inner bevel line separates the top face from the sides giving a slight 3D cube feel, small soft shadow cast underneath, looks like a polished amethyst gem or purple candy piece. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy materials, rich saturated colors, soft shadows, clean edges, centered on canvas, transparent PNG background

**Prompt 14 — `block_s.png`:**
> A single square game block tile, perfectly straight flat front-on orthographic view with NO rotation NO tilt NO perspective NO isometric angle, edges perfectly aligned to the image borders horizontally and vertically, shaped like a polished crystal gem cube, vivid emerald green jade color (#4CAF50), the surface has a glossy glass-like reflective finish with a bright white specular highlight streak in the upper-left corner and a lighter mint green secondary highlight in the center, the edges catch light creating a bright green-white rim glow, the bottom and right sides are deeper forest green shadow tones for depth, thick 2-3px dark outline around the entire square shape, a tiny inner bevel line separates the top face from the sides giving a slight 3D cube feel, small soft shadow cast underneath, looks like a polished emerald gem or green candy piece. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy materials, rich saturated colors, soft shadows, clean edges, centered on canvas, transparent PNG background

**Prompt 15 — `block_z.png`:**
> A single square game block tile, perfectly straight flat front-on orthographic view with NO rotation NO tilt NO perspective NO isometric angle, edges perfectly aligned to the image borders horizontally and vertically, shaped like a polished crystal gem cube, fiery ruby red deep crimson color (#F44336), the surface has a glossy garnet-like reflective finish with a bright white-pink specular highlight streak in the upper-left corner and a warm rose secondary highlight in the center, the edges catch light creating a bright red-white rim glow, the bottom and right sides are deeper dark burgundy-maroon shadow tones for depth, thick 2-3px dark outline around the entire square shape, a tiny inner bevel line separates the top face from the sides giving a slight 3D cube feel, small soft shadow cast underneath, looks like a polished ruby gem or red candy piece. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy materials, rich saturated colors, soft shadows, clean edges, centered on canvas, transparent PNG background

**Prompt 16 — `block_j.png`:**
> A single square game block tile, perfectly straight flat front-on orthographic view with NO rotation NO tilt NO perspective NO isometric angle, edges perfectly aligned to the image borders horizontally and vertically, shaped like a polished crystal gem cube, deep sapphire blue midnight cobalt color (#1565C0), the surface has a glossy polished stone-like reflective finish with a bright white-blue specular highlight streak in the upper-left corner and a lighter sky blue secondary highlight in the center, the edges catch light creating a bright blue-white rim glow, the bottom and right sides are deeper navy-indigo shadow tones for depth, thick 2-3px dark outline around the entire square shape, a tiny inner bevel line separates the top face from the sides giving a slight 3D cube feel, small soft shadow cast underneath, looks like a polished sapphire gem or blue candy piece. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy materials, rich saturated colors, soft shadows, clean edges, centered on canvas, transparent PNG background

**Prompt 17 — `block_l.png`:**
> A single square game block tile, perfectly straight flat front-on orthographic view with NO rotation NO tilt NO perspective NO isometric angle, edges perfectly aligned to the image borders horizontally and vertically, shaped like a polished crystal gem cube, bright tangerine orange warm amber color (#FF9800), the surface has a glossy caramel-like reflective finish with a bright white-yellow specular highlight streak in the upper-left corner and a warm peach secondary highlight in the center, the edges catch light creating a bright orange-white rim glow, the bottom and right sides are deeper burnt sienna-brown shadow tones for depth, thick 2-3px dark outline around the entire square shape, a tiny inner bevel line separates the top face from the sides giving a slight 3D cube feel, small soft shadow cast underneath, looks like a polished amber gem or orange candy piece. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy materials, rich saturated colors, soft shadows, clean edges, centered on canvas, transparent PNG background

**Prompt 18 — `block_ghost.png`:**
> A single square game block tile, perfectly straight flat front-on orthographic view with NO rotation NO tilt NO perspective NO isometric angle, edges perfectly aligned to the image borders horizontally and vertically, shaped like a translucent ghostly crystal cube, smoky gray-blue slate color (#78909C) with a semi-transparent see-through quality, the surface has a very subtle matte frosted-glass finish with a faint white specular highlight in the upper-left corner, the edges have a thin pale white-blue outline glow like a hologram, the overall opacity feels around 40-50% like looking through smoked glass, no strong shadows, very faint thin dark outline around the shape, a barely visible inner bevel line hints at the 3D cube form, this block should look distinctly different from the colored gems — ghostly, ethereal, and transparent, like a placeholder or shadow piece. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy materials, soft shadows, clean edges, centered on canvas, transparent PNG background

---

## 4. Game Board (2 images)

**Prompt 19 — `board_texture.png`:**
> A seamless tileable dark stone texture for a game board background, charcoal slate gray color (#37474F) with subtle variation between darker and slightly lighter gray-blue patches, faint carved grid lines etched into the stone surface in slightly darker gray creating a subtle square cell pattern, the stone has a weathered medieval castle floor feel with very fine surface grain texture, not perfectly smooth but not overly rough, occasional tiny speck highlights in lighter gray to suggest stone mineral flecks, the overall feel is dark and moody but not black — like the inside of a medieval tower floor, must tile seamlessly in all directions with no visible seams or repeating patterns. Supercell Clash Royale mobile game art style, hand-painted texture look, muted dark tones, subtle surface detail, seamless tileable pattern, NOT transparent — solid dark stone fill

**Size:** 256x256px

**Prompt 20 — `board_frame.png`:**
> An ornate decorative border frame in portrait orientation designed to surround a game board, perfectly straight with all edges aligned exactly parallel to the image borders, corners at precise 90-degree angles, NO perspective NO tilt NO barrel distortion, the frame is made of thick medieval stone blocks in charcoal gray (#37474F) with a polished warm burnished gold (#D4A017) inner trim running along the inside edge, the four corners have ornate gold filigree decorations with small gem accents in cyan and purple, the outer edge has subtle carved rune-like decorative patterns in the stone, the gold trim has visible brushstroke-like specular highlights catching warm top-left light, rivets and bolts in darker bronze along the stone edges, the entire inner area is completely empty and transparent — only the border frame itself is drawn, the frame width is approximately 20-30px on each side relative to the image dimensions, designed to be placed over a game board as an overlay frame. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy gold materials, rich colors, soft shadows, transparent PNG inner area

**Size:** 512x1024px

---

## 5. UI Panel Frames (2 images)

**9-slice note:** These panels must have distinct corner decorations and uniform repeatable edge strips so they can be stretched to any size via 9-slice/NinePatch in Phaser. Keep the corners visually interesting but ensure the center and edges are simple enough to tile.

**Prompt 21 — `panel_h.png`:**
> A horizontal rectangular UI panel frame for a mobile game, perfectly straight with all edges aligned exactly parallel to the image borders, corners at precise 90-degree angles, NO perspective NO tilt NO rotation, made of rich dark mahogany brown wood (#5D4037) with visible wood grain texture running horizontally, the border is a thick warm burnished gold (#D4A017) ornate trim with small decorative rivets spaced evenly, the four corners have distinct ornate gold filigree rosette decorations that are larger and more detailed than the edge trim, the gold trim has glossy specular white-yellow highlights from top-left warm lighting, the wood center area is dark rich chocolate brown with subtle lighter grain lines, the inside of the panel has a slight inner shadow creating a recessed inset look, the overall design is chunky and bold with thick 2-3px dark outlines around all elements, designed to be used as a stretchable 9-slice UI panel — the corners must be distinct from the edge strips which must be uniform and repeatable. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy materials, rich saturated colors, soft shadows, clean edges, high-quality mobile game UI asset, transparent PNG background

**Size:** 512x128px

**Prompt 22 — `panel_sq.png`:**
> A square UI panel frame for a mobile game, perfectly straight with all edges aligned exactly parallel to the image borders, corners at precise 90-degree angles, NO perspective NO tilt NO rotation, made of rich dark mahogany brown wood (#5D4037) with visible wood grain texture, the border is a thick warm burnished gold (#D4A017) ornate trim with small decorative rivets, the four corners have distinct ornate gold filigree rosette decorations that are larger and more detailed than the edge trim, the gold trim has glossy specular white-yellow highlights from top-left warm lighting, the wood center area is dark rich chocolate brown with subtle lighter grain lines, slight inner shadow for a recessed inset look, chunky bold design with thick 2-3px dark outlines, this is the square version of the panel used for next-piece display and stat boxes, designed as a stretchable 9-slice UI panel — corners distinct from edges. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy materials, rich saturated colors, soft shadows, clean edges, high-quality mobile game UI asset, transparent PNG background

**Size:** 256x256px

---

## 6. Title Logo (2 images)

**Prompt 23 — `logo_full.png`:**
> Game title text reading exactly 'TETRIS ROYALE' in bold chunky 3D extruded metallic gold letters, text must be perfectly horizontal and level reading left to right, NO arc NO wave NO rotation NO diagonal (#FFD700 bright gold face with #D4A017 warm gold sides), each letter has thick 3px dark outlines and a dark brown-gold shadow on the right and bottom sides giving strong 3D depth, the text has a slight upward perspective tilt, bright white specular sparkle star effects on the letters T R and E, behind the text is a flowing royal blue banner ribbon (#1E3A8A deep blue with lighter blue highlight stripes), the ribbon curls at both ends with small tassels, the gold letters have a hammered metallic texture with warm highlights, overall composition is wide horizontal with the text as the main focus, designed as a game title logo for a splash screen. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy metallic materials, rich saturated colors, soft shadows, clean edges, high-quality mobile game asset, transparent PNG background

**Size:** 800x200px

**Prompt 24 — `logo_compact.png`:**
> Game title text reading exactly 'TETRIS ROYALE' in bold chunky 3D metallic gold letters, text must be perfectly horizontal and level reading left to right, NO arc NO wave NO rotation (#FFD700 face with #D4A017 sides), compact tight horizontal layout optimized for small mobile screens, thick dark outlines on each letter, dark shadow on right and bottom sides for 3D depth, small sparkle star effects on letters, a simplified shorter royal blue banner ribbon (#1E3A8A) behind the text, the gold has warm specular highlights, designed to be readable and impactful even at small display sizes around 200px wide, every letter must be clearly legible with no overlapping. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy metallic materials, rich colors, soft shadows, clean edges, mobile game asset, transparent PNG background

**Size:** 400x100px

---

## 7. Touch Control Buttons (6 images)

**Size:** 128x128px | **Format:** PNG, transparent background

**Style note for all buttons:** Generate these in one session. They should all look like they belong to the same button set — same stone material, same gold rim, same lighting angle.

**Prompt 25 — `btn_left.png`:**
> A perfectly circular round game control button seen from directly above in flat front-on orthographic view with NO perspective NO tilt NO oval distortion, the button must be a perfect circle centered on the canvas, the button face is smooth polished charcoal gray stone (#546E7A) with a subtle stone grain texture, a bold left-pointing arrow chevron icon (◀) is carved into the center of the button face in a lighter embossed stone with a thin bright gold (#FFD700) outline around the arrow shape, the button has a thick raised rim ring in warm burnished gold (#D4A017) with small evenly-spaced rivets, the gold rim has glossy white-yellow specular highlights from top-left lighting, the button casts a soft shadow underneath suggesting it's raised and pressable, the stone face has a subtle lighter gray highlight in the upper portion and darker in the lower portion to suggest curvature, thick 2-3px dark outline around the entire circular button shape. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, glossy materials, rich colors, soft shadows, clean edges, mobile game touch control asset, centered on canvas, transparent PNG background

**Prompt 26 — `btn_right.png`:**
> A perfectly circular round game control button seen from directly above in flat front-on orthographic view with NO perspective NO tilt NO oval distortion, the button must be a perfect circle centered on the canvas, the button face is smooth polished charcoal gray stone (#546E7A) with a subtle stone grain texture, a bold right-pointing arrow chevron icon (▶) is carved into the center of the button face in a lighter embossed stone with a thin bright gold (#FFD700) outline around the arrow shape, the button has a thick raised rim ring in warm burnished gold (#D4A017) with small evenly-spaced rivets, the gold rim has glossy white-yellow specular highlights from top-left lighting, the button casts a soft shadow underneath suggesting it's raised and pressable, the stone face has a subtle lighter gray highlight in the upper portion and darker in the lower portion to suggest curvature, thick 2-3px dark outline around the entire circular button shape. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, glossy materials, rich colors, soft shadows, clean edges, mobile game touch control asset, centered on canvas, transparent PNG background

**Prompt 27 — `btn_down.png`:**
> A perfectly circular round game control button seen from directly above in flat front-on orthographic view with NO perspective NO tilt NO oval distortion, the button must be a perfect circle centered on the canvas, the button face is smooth polished charcoal gray stone (#546E7A) with a subtle stone grain texture, a bold downward-pointing arrow chevron icon (▼) is carved into the center of the button face in a lighter embossed stone with a thin bright gold (#FFD700) outline around the arrow shape, the button has a thick raised rim ring in warm burnished gold (#D4A017) with small evenly-spaced rivets, the gold rim has glossy white-yellow specular highlights from top-left lighting, the button casts a soft shadow underneath suggesting it's raised and pressable, thick 2-3px dark outline around the entire circular button shape. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, glossy materials, rich colors, soft shadows, clean edges, mobile game touch control asset, centered on canvas, transparent PNG background

**Prompt 28 — `btn_rotate.png`:**
> A perfectly circular round game control button seen from directly above in flat front-on orthographic view with NO perspective NO tilt NO oval distortion, the button must be a perfect circle centered on the canvas, the button face is smooth polished charcoal gray stone (#546E7A) with a subtle stone grain texture, a bold circular clockwise rotation arrow icon (↻) is carved into the center of the button face in a lighter embossed stone with a thin bright gold (#FFD700) outline around the arrow shape, the rotation arrow curves in a circle with a pointed arrowhead tip, the button has a thick raised rim ring in warm burnished gold (#D4A017) with small evenly-spaced rivets, the gold rim has glossy white-yellow specular highlights from top-left lighting, the button casts a soft shadow underneath, thick 2-3px dark outline around the entire circular button shape. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, glossy materials, rich colors, soft shadows, clean edges, mobile game touch control asset, centered on canvas, transparent PNG background

**Prompt 29 — `btn_drop.png`:**
> A perfectly circular round game control button seen from directly above in flat front-on orthographic view with NO perspective NO tilt NO oval distortion, the button must be a perfect circle centered on the canvas, the button face is smooth polished charcoal gray stone (#546E7A) with a subtle stone grain texture, a bold double downward-pointing chevron icon (⏬ two stacked down arrows) is carved into the center of the button face in a lighter embossed stone with a thin bright gold (#FFD700) outline around the arrow shapes, the double arrows indicate fast drop action, the button has a thick raised rim ring in warm burnished gold (#D4A017) with small evenly-spaced rivets, the gold rim has glossy white-yellow specular highlights from top-left lighting, the button casts a soft shadow underneath, thick 2-3px dark outline around the entire circular button shape. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, glossy materials, rich colors, soft shadows, clean edges, mobile game touch control asset, centered on canvas, transparent PNG background

**Prompt 30 — `btn_pause.png`:**
> A perfectly circular round game control button seen from directly above in flat front-on orthographic view with NO perspective NO tilt NO oval distortion, the button must be a perfect circle centered on the canvas, the button face is smooth polished charcoal gray stone (#546E7A) with a subtle stone grain texture, two bold vertical parallel bars pause icon (⏸ two thick vertical rectangles side by side) are carved into the center of the button face in a lighter embossed stone with a thin bright gold (#FFD700) outline around each bar, the button has a thick raised rim ring in warm burnished gold (#D4A017) with small evenly-spaced rivets, the gold rim has glossy white-yellow specular highlights from top-left lighting, the button casts a soft shadow underneath, thick 2-3px dark outline around the entire circular button shape. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, glossy materials, rich colors, soft shadows, clean edges, mobile game touch control asset, centered on canvas, transparent PNG background

---

## 8. Effect Sprites (4 images)

**Prompt 31 — `fx_lineclear.png`:**
> A wide horizontal energy explosion shockwave effect for a line clear in a puzzle game, the effect is a bright burst spreading left and right from the center, bright white core energy in the center fading to warm golden yellow (#FFD700) and then to hot orange at the outer edges, small bright white sparkle stars and diamond-shaped particles scattered throughout the burst, tiny bright cyan (#00E5FF) energy motes mixed in, the explosion has a slight motion blur stretch horizontally suggesting rapid expansion, the top and bottom edges of the effect fade to transparent with soft feathered edges, small golden coin-like particles flying outward, overall very bright festive and rewarding feel, the effect should be thin and wide to overlay a single row on the game board. Supercell Clash Royale mobile game art style, vibrant cartoon effect, bright glowing colors, transparent PNG background

**Size:** 512x64px

**Prompt 32 — `fx_tetris.png`:**
> A large celebratory radial explosion effect for a 4-line Tetris clear, massive burst of particles exploding outward from center, bright golden (#FFD700) energy core with radiating light rays, dozens of small golden coins spinning outward, bright white and cyan star sparkles, colorful confetti pieces in purple red green and blue, rainbow-tinted energy ring expanding outward, small gem fragments in various tetris colors (cyan red purple green yellow orange blue) flying in all directions, light streak speed lines radiating from center, the entire effect is extremely festive and rewarding like winning a jackpot, bright warm lighting with golden glow, feathered transparent edges all around. Supercell Clash Royale mobile game art style, vibrant cartoon celebration effect, bright saturated colors, transparent PNG background

**Size:** 512x512px

**Prompt 33 — `fx_levelup.png`:**
> A dynamic upward-moving level up announcement effect, a large bold upward-pointing golden arrow in the center with bright metallic gold (#FFD700) fill and thick dark outline, the text 'LEVEL UP' written in bold chunky white letters with gold outline stacked above the arrow, sparkle trail particles in bright cyan (#00E5FF) and gold streaming upward behind the arrow like a rocket trail, small star shapes and diamond sparkles scattered around, the arrow has a bright white glow aura around it suggesting energy and power, warm golden lighting, the bottom edge fades to transparent suggesting upward movement. Supercell Clash Royale mobile game art style, vibrant cartoon effect with bold text, bright glowing colors, transparent PNG background

**Size:** 512x256px

**Prompt 34 — `fx_combo_bg.png`:**
> A small explosive starburst shape designed as a backdrop behind combo multiplier numbers, the shape is an irregular spiky star burst with 8-12 points, the center is bright hot orange (#FF6D00) fading to warm golden yellow (#FFD700) at the tips of the spikes, a thin bright white glow outline around the entire shape, small sparkle dots at the tips of the longer spikes, the overall feel is like a comic book "POW" explosion shape but without text, thick 2px dark outline around the outer edge of the burst shape, designed to have numbers like "x2" "x3" overlaid on top in the center, cartoon impact starburst. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon effect, bright saturated warm colors, soft glow, transparent PNG background

**Size:** 256x256px

---

## 9. Particle Sprites (4 images)

**Size:** 64x64px | **Format:** PNG, transparent background

**Prompt 35 — `particle_sparkle.png`:**
> A single small 4-pointed sparkle twinkle star shape centered on the canvas, the sparkle has four thin elongated diamond-shaped points radiating from a bright white center core, the points fade from white at the center to warm golden yellow (#FFD700) at the tips, a soft warm glow aura around the entire sparkle in pale gold, the horizontal and vertical points are slightly longer than the diagonal points creating a classic twinkle effect, very clean sharp shape with smooth anti-aliased edges, designed as a tiny decorative particle effect for a mobile game, no outline needed for this one — the glow IS the shape. Supercell Clash Royale mobile game art style, bright glowing particle effect, clean simple shape, transparent PNG background

**Prompt 36 — `particle_star.png`:**
> A single small cartoon 5-pointed star shape centered on the canvas, the star is bright golden yellow (#FFD700) with a slightly darker golden orange (#E6AC00) stroke outline, the center of the star has a bright white specular highlight dot, each point of the star has a tiny white highlight at the tip, the star has a subtle warm golden glow aura around it, chunky cartoon proportions with slightly rounded points rather than perfectly sharp, thick 2px dark outline around the entire star shape, designed as a small reward or celebration particle for a mobile game. Supercell Clash Royale mobile game art style, vibrant cartoon shape, glossy golden material, clean edges, transparent PNG background

**Prompt 37 — `particle_shard.png`:**
> A single small crystal shard fragment centered on the canvas, an irregular angular polygon shape like a broken piece of crystal or ice, electric cyan aquamarine color (#00E5FF) with lighter white-cyan highlights along the sharp edges, the center has a subtle inner glow in pale cyan, slight transparency suggesting a glass-like material, a thin bright white edge highlight on the upper-left facets catching the light, small cool-toned cyan glow aura around the shard, the shape should look like it broke off from a larger gem, slightly elongated vertically with 5-6 angular facets, thin dark outline. Supercell Clash Royale mobile game art style, vibrant crystal effect, glossy translucent material, clean edges, transparent PNG background

**Prompt 38 — `particle_coin.png`:**
> A single small gold coin centered on the canvas shown at a slight 3/4 angle tilt, bright polished gold (#FFD700) face with a tiny embossed crown symbol in the center in darker gold (#D4A017), the rim edge of the coin is visible showing thickness in darker burnished gold, a bright white specular highlight on the upper-left of the coin face, the coin has a warm golden glow aura around it, thick 2px dark outline around the entire coin shape, designed as a small collectible particle for score rewards in a mobile game, the coin should look chunky and satisfying with clear readable detail even at small sizes. Supercell Clash Royale mobile game art style, vibrant cartoon coin, glossy metallic gold material, clean edges, transparent PNG background

---

## 10. XP / Progress Bar (2 images)

**Prompt 39 — `xp_frame.png`:**
> A wide horizontal progress bar frame designed for XP or level progress, perfectly straight and horizontal with edges aligned exactly parallel to the image borders, NO curve NO tilt NO perspective, the frame is a rounded rectangle capsule shape, the outer border is thick warm burnished gold (#D4A017) trim with small decorative rivets at each end, the inner area is dark charcoal stone (#37474F) creating an empty recessed trough where a fill bar would go, the gold trim has glossy white-yellow specular highlights from top-left lighting, small ornate gold filigree decorations at the left and right ends of the bar, the top edge of the gold has a bright highlight and the bottom edge has a darker shadow for 3D depth, thick 2px dark outline around the entire shape, the inner trough area is darker than the frame to create contrast with any fill bar placed inside. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, glossy metallic gold material, clean edges, high-quality mobile game UI asset, transparent PNG background

**Size:** 512x64px

**Prompt 40 — `xp_fill.png`:**
> A wide horizontal energy fill bar designed to go inside a progress bar frame, perfectly straight and horizontal with edges aligned exactly parallel to the image borders, NO curve NO tilt NO perspective, rounded capsule shape with smooth rounded ends, the fill is a bright glowing gradient from electric cyan (#00E5FF) on the left fading to bright sky blue (#40C4FF) on the right, the surface has a glossy liquid-like sheen with a long white specular highlight streak running along the upper third of the bar, tiny bright white sparkle particle dots scattered along the fill surface suggesting magical energy, the bottom edge has a slightly darker teal shadow, the fill bar has a subtle bright white-cyan outer glow aura, the right end of the bar has a brighter concentrated glow as if the energy is flowing rightward, no dark outlines on this one — the glow defines the shape. Supercell Clash Royale mobile game art style, bright glowing energy effect, smooth gradient, high-quality mobile game UI asset, transparent PNG background

**Size:** 512x48px

---

## 11. Next Piece Frame (1 image)

**Prompt 41 — `frame_next.png`:**
> A small ornate square display frame designed to showcase the next tetris piece, perfectly straight with edges aligned exactly to the image borders, corners at precise 90-degree angles, NO perspective NO tilt in a game UI, the frame is made of polished charcoal gray stone (#37474F) blocks with thick warm burnished gold (#D4A017) inner trim, the four corners each have a small colorful gem accent — top-left is cyan (#00E5FF), top-right is purple (#9C27B0), bottom-left is green (#4CAF50), bottom-right is red (#F44336), each corner gem has a tiny white specular highlight dot, the gold trim has glossy highlights from top-left lighting, small decorative gold filigree between the corner gems along the edges, the inner display area is very dark navy (#0D1B2A) suggesting depth like looking into a recessed display case, thick 2px dark outline around the outer frame edge, designed as a UI element where a tetris piece preview will be drawn inside. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, glossy materials, rich colors, soft shadows, clean edges, high-quality mobile game UI asset, transparent PNG background

**Size:** 256x256px

---

## 12. Settings / Sound Icons (5 images)

**Size:** 128x128px | **Format:** PNG, transparent background

**Prompt 42 — `icon_settings.png`:**
> A medieval-styled settings gear cog icon centered on the canvas, perfectly symmetrical and upright with NO tilt NO rotation, the gear is made of polished charcoal gray stone (#546E7A) with 8 rounded teeth around the circumference, a circular hole in the center, the entire gear shape has a thick warm burnished gold (#D4A017) outline trim with small rivet dots on each gear tooth, the stone surface has subtle grain texture with a lighter gray specular highlight on the upper-left catching top-left warm lighting, small ornate gold filigree details between the gear teeth, the center hole is dark suggesting depth, thick 2-3px dark outline around the entire shape, the gear looks chunky and tactile like a physical medieval mechanism. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, glossy materials, rich colors, soft shadows, clean edges, mobile game UI icon, centered on canvas, transparent PNG background

**Prompt 43 — `icon_music_on.png`:**
> A musical eighth note icon centered on the canvas in enabled active state, perfectly upright and centered with NO tilt NO rotation, the note is bright shiny gold (#FFD700) with a thick polished metallic finish, the round note head has a bright white specular highlight, the stem and flag have subtle gold gradient from lighter to darker gold, two small bright white sparkle stars floating near the note suggesting it's active and playing music, a soft warm golden glow aura around the entire note, thick 2px dark outline around the note shape, the overall mood is bright warm and inviting indicating music is ON. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, glossy metallic gold material, bright warm colors, clean edges, mobile game UI icon, centered on canvas, transparent PNG background

**Prompt 44 — `icon_music_off.png`:**
> A musical eighth note icon centered on the canvas in disabled muted state, perfectly upright and centered with NO tilt NO rotation, the note is dull flat gray (#9E9E9E) with no shine or specular highlights, the surface looks matte and lifeless compared to the enabled version, a bold red (#F44336) X cross shape is drawn over the note with thick 3px strokes, the red X has a slight dark outline, no glow no sparkles, the overall mood is muted and inactive indicating music is OFF, the gray note has subtle darker gray shading for minimal depth, thick 2px dark outline around the note shape. Supercell Clash Royale mobile game art style, hand-painted cartoon look, muted desaturated colors for disabled state, clean edges, mobile game UI icon, centered on canvas, transparent PNG background

**Prompt 45 — `icon_sfx_on.png`:**
> A speaker audio icon centered on the canvas in enabled active state, perfectly upright and centered with NO tilt NO rotation, the speaker shape is bright shiny gold (#FFD700) with a thick polished metallic finish, the speaker cone points to the right with two curved sound wave arcs radiating outward to the right in bright cyan (#00E5FF) energy lines, the speaker body has a bright white specular highlight, small sparkle stars near the sound waves suggesting active playback, a soft warm golden glow aura around the speaker, the cyan sound waves have a subtle glow effect, thick 2px dark outline around all shapes, the overall mood is bright and energetic indicating sound effects are ON. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, glossy metallic gold material, bright colors, clean edges, mobile game UI icon, centered on canvas, transparent PNG background

**Prompt 46 — `icon_sfx_off.png`:**
> A speaker audio icon centered on the canvas in disabled muted state, perfectly upright and centered with NO tilt NO rotation, the speaker shape is dull flat gray (#9E9E9E) with no shine or specular highlights, matte lifeless surface, no sound wave arcs visible, a bold red (#F44336) X cross shape is drawn over the speaker with thick 3px strokes, the red X has a slight dark outline, no glow no sparkles no sound waves, the overall mood is muted and silent indicating sound effects are OFF, the gray speaker has subtle darker gray shading for minimal depth, thick 2px dark outline around the speaker shape. Supercell Clash Royale mobile game art style, hand-painted cartoon look, muted desaturated colors for disabled state, clean edges, mobile game UI icon, centered on canvas, transparent PNG background

---

## 13. App Icon / Favicon (2 images)

**Prompt 47 — `icon_v2_512.png`:**
> A square mobile app icon for a Tetris puzzle game, the background is a rich gradient from very dark midnight navy (#0D1B2A) at the bottom to dark royal blue (#1E3A8A) at the top, in the center are four colorful glossy gem tetris block cubes arranged in a T-tetromino shape — one cyan (#00E5FF) on top-left, one purple (#9C27B0) on top-center, one green (#4CAF50) on top-right, and one red (#F44336) below the purple, each block has the same gem-like specular highlights as the game blocks, sitting on top of the T-shape is a small ornate golden crown (#FFD700) with tiny gem accents, the entire composition has a thick ornate gold (#D4A017) decorative border frame with corner filigree around the square edges, warm top-left lighting, the blocks cast subtle shadows downward, designed as a recognizable app store icon. Supercell Clash Royale mobile game art style, vibrant hand-painted cartoon 3D render look, thick dark outlines, glossy materials, rich saturated colors, soft shadows. NOT transparent — solid dark blue gradient background fill

**Size:** 512x512px

**Prompt 48 — `icon_v2_64.png`:**
> A tiny simplified square app icon for a Tetris puzzle game optimized for very small display sizes like browser favicons, dark midnight navy background (#0D1B2A), a single bold colorful T-tetromino shape in the center made of 4 chunky bright purple (#9C27B0) gem blocks, a tiny golden crown (#FFD700) sitting on top, very thick dark outlines on everything for readability at small sizes, minimal detail — just the T-shape crown and background, the purple blocks have simple white specular highlight dots, the crown is simplified to basic shape, everything must be clearly readable and recognizable at 16x16px display size. Supercell Clash Royale mobile game art style, bold simplified cartoon, extra thick outlines, solid dark background, NOT transparent

**Size:** 64x64px

---

## 14. Background Pattern (1 image)

**Prompt 49 — `bg_pattern.png`:**
> A seamless tileable background pattern texture with pattern lines aligned to the image grid horizontally and vertically NOT at random angles, very dark midnight navy base color (#0D1B2A) with a subtle repeating diamond argyle pattern created by thin faint lines in slightly lighter navy-blue (#1A2744), where the diamond lines intersect there are tiny dot accents in very faint gold (#D4A017 at about 15% opacity), the overall pattern has a medieval royal tapestry feel, very subtle and understated — the pattern should be barely noticeable and never distracting, it's a background that sits behind the game UI, occasional very faint tiny fleur-de-lis or cross shapes at the diamond intersections instead of dots for variety, must tile seamlessly in all four directions with zero visible seams or edge artifacts. Dark moody medieval atmosphere, extremely subtle pattern, NOT transparent — solid dark navy fill

**Size:** 256x256px, tileable

---

## Quick Reference

| # | File | Size | Category |
|---|------|------|----------|
| 1 | `char_idle.png` | 512x512 | Character |
| 2 | `char_happy.png` | 512x512 | Character |
| 3 | `char_excited.png` | 512x512 | Character |
| 4 | `char_worried.png` | 512x512 | Character |
| 5 | `char_defeated.png` | 512x512 | Character |
| 6 | `avatar_idle.png` | 128x128 | Avatar |
| 7 | `avatar_happy.png` | 128x128 | Avatar |
| 8 | `avatar_excited.png` | 128x128 | Avatar |
| 9 | `avatar_worried.png` | 128x128 | Avatar |
| 10 | `avatar_defeated.png` | 128x128 | Avatar |
| 11 | `block_i.png` | 128x128 | Block (Cyan) |
| 12 | `block_o.png` | 128x128 | Block (Yellow) |
| 13 | `block_t.png` | 128x128 | Block (Purple) |
| 14 | `block_s.png` | 128x128 | Block (Green) |
| 15 | `block_z.png` | 128x128 | Block (Red) |
| 16 | `block_j.png` | 128x128 | Block (Blue) |
| 17 | `block_l.png` | 128x128 | Block (Orange) |
| 18 | `block_ghost.png` | 128x128 | Block (Ghost) |
| 19 | `board_texture.png` | 256x256 | Board |
| 20 | `board_frame.png` | 512x1024 | Board |
| 21 | `panel_h.png` | 512x128 | UI Panel |
| 22 | `panel_sq.png` | 256x256 | UI Panel |
| 23 | `logo_full.png` | 800x200 | Logo |
| 24 | `logo_compact.png` | 400x100 | Logo |
| 25 | `btn_left.png` | 128x128 | Button |
| 26 | `btn_right.png` | 128x128 | Button |
| 27 | `btn_down.png` | 128x128 | Button |
| 28 | `btn_rotate.png` | 128x128 | Button |
| 29 | `btn_drop.png` | 128x128 | Button |
| 30 | `btn_pause.png` | 128x128 | Button |
| 31 | `fx_lineclear.png` | 512x64 | Effect |
| 32 | `fx_tetris.png` | 512x512 | Effect |
| 33 | `fx_levelup.png` | 512x256 | Effect |
| 34 | `fx_combo_bg.png` | 256x256 | Effect |
| 35 | `particle_sparkle.png` | 64x64 | Particle |
| 36 | `particle_star.png` | 64x64 | Particle |
| 37 | `particle_shard.png` | 64x64 | Particle |
| 38 | `particle_coin.png` | 64x64 | Particle |
| 39 | `xp_frame.png` | 512x64 | XP Bar |
| 40 | `xp_fill.png` | 512x48 | XP Bar |
| 41 | `frame_next.png` | 256x256 | Frame |
| 42 | `icon_settings.png` | 128x128 | Icon |
| 43 | `icon_music_on.png` | 128x128 | Icon |
| 44 | `icon_music_off.png` | 128x128 | Icon |
| 45 | `icon_sfx_on.png` | 128x128 | Icon |
| 46 | `icon_sfx_off.png` | 128x128 | Icon |
| 47 | `icon_v2_512.png` | 512x512 | App Icon |
| 48 | `icon_v2_64.png` | 64x64 | Favicon |
| 49 | `bg_pattern.png` | 256x256 | Background |

**Total: 49 images**
