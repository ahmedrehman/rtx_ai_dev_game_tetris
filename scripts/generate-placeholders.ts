/**
 * Generate placeholder PNG images for all V2 Tetris Royale assets.
 * Each image has the correct dimensions, a representative color fill,
 * and a centered text label with the filename.
 *
 * Usage: npx tsx scripts/generate-placeholders.ts
 */
import sharp from "sharp";
import { mkdirSync, existsSync } from "fs";
import { join } from "path";

const OUT_DIR = join(import.meta.dirname, "..", "public", "assets", "v2");

interface Asset {
  file: string;
  w: number;
  h: number;
  color: string; // hex without #
  label: string;
  transparent?: boolean;
}

const assets: Asset[] = [
  // 1. Character — Full Body
  { file: "char_idle.png", w: 512, h: 512, color: "1E3A8A", label: "CHAR\nIDLE" },
  { file: "char_happy.png", w: 512, h: 512, color: "1565C0", label: "CHAR\nHAPPY" },
  { file: "char_excited.png", w: 512, h: 512, color: "1976D2", label: "CHAR\nEXCITED" },
  { file: "char_worried.png", w: 512, h: 512, color: "0D47A1", label: "CHAR\nWORRIED" },
  { file: "char_defeated.png", w: 512, h: 512, color: "263238", label: "CHAR\nDEFEATED" },

  // 2. Character — Avatar
  { file: "avatar_idle.png", w: 128, h: 128, color: "1E3A8A", label: "AVA\nIDLE" },
  { file: "avatar_happy.png", w: 128, h: 128, color: "1565C0", label: "AVA\nHAPPY" },
  { file: "avatar_excited.png", w: 128, h: 128, color: "1976D2", label: "AVA\nEXCITED" },
  { file: "avatar_worried.png", w: 128, h: 128, color: "0D47A1", label: "AVA\nWORRIED" },
  { file: "avatar_defeated.png", w: 128, h: 128, color: "263238", label: "AVA\nDEFEATED" },

  // 3. Block Textures
  { file: "block_i.png", w: 128, h: 128, color: "00E5FF", label: "I", transparent: true },
  { file: "block_o.png", w: 128, h: 128, color: "FFD600", label: "O", transparent: true },
  { file: "block_t.png", w: 128, h: 128, color: "9C27B0", label: "T", transparent: true },
  { file: "block_s.png", w: 128, h: 128, color: "4CAF50", label: "S", transparent: true },
  { file: "block_z.png", w: 128, h: 128, color: "F44336", label: "Z", transparent: true },
  { file: "block_j.png", w: 128, h: 128, color: "1565C0", label: "J", transparent: true },
  { file: "block_l.png", w: 128, h: 128, color: "FF9800", label: "L", transparent: true },
  { file: "block_ghost.png", w: 128, h: 128, color: "78909C", label: "G", transparent: true },

  // 4. Game Board
  { file: "board_texture.png", w: 256, h: 256, color: "37474F", label: "BOARD\nTEXTURE" },
  { file: "board_frame.png", w: 512, h: 1024, color: "D4A017", label: "BOARD\nFRAME", transparent: true },

  // 5. UI Panels
  { file: "panel_h.png", w: 512, h: 128, color: "5D4037", label: "PANEL H", transparent: true },
  { file: "panel_sq.png", w: 256, h: 256, color: "5D4037", label: "PANEL\nSQ", transparent: true },

  // 6. Logo
  { file: "logo_full.png", w: 800, h: 200, color: "D4A017", label: "TETRIS ROYALE", transparent: true },
  { file: "logo_compact.png", w: 400, h: 100, color: "D4A017", label: "TETRIS ROYALE", transparent: true },

  // 7. Touch Buttons
  { file: "btn_left.png", w: 128, h: 128, color: "546E7A", label: "◀", transparent: true },
  { file: "btn_right.png", w: 128, h: 128, color: "546E7A", label: "▶", transparent: true },
  { file: "btn_down.png", w: 128, h: 128, color: "546E7A", label: "▼", transparent: true },
  { file: "btn_rotate.png", w: 128, h: 128, color: "546E7A", label: "↻", transparent: true },
  { file: "btn_drop.png", w: 128, h: 128, color: "546E7A", label: "⏬", transparent: true },
  { file: "btn_pause.png", w: 128, h: 128, color: "546E7A", label: "⏸", transparent: true },

  // 8. Effect Sprites
  { file: "fx_lineclear.png", w: 512, h: 64, color: "FFD700", label: "FX LINE CLEAR", transparent: true },
  { file: "fx_tetris.png", w: 512, h: 512, color: "FFD700", label: "FX\nTETRIS!", transparent: true },
  { file: "fx_levelup.png", w: 512, h: 256, color: "FFD700", label: "LEVEL UP", transparent: true },
  { file: "fx_combo_bg.png", w: 256, h: 256, color: "FF6D00", label: "COMBO\nBG", transparent: true },

  // 9. Particles
  { file: "particle_sparkle.png", w: 64, h: 64, color: "FFFFFF", label: "✦", transparent: true },
  { file: "particle_star.png", w: 64, h: 64, color: "FFD700", label: "★", transparent: true },
  { file: "particle_shard.png", w: 64, h: 64, color: "00E5FF", label: "◆", transparent: true },
  { file: "particle_coin.png", w: 64, h: 64, color: "FFD700", label: "$", transparent: true },

  // 10. XP Bar
  { file: "xp_frame.png", w: 512, h: 64, color: "D4A017", label: "XP FRAME", transparent: true },
  { file: "xp_fill.png", w: 512, h: 48, color: "00E5FF", label: "XP FILL", transparent: true },

  // 11. Next Piece Frame
  { file: "frame_next.png", w: 256, h: 256, color: "37474F", label: "NEXT\nPIECE", transparent: true },

  // 12. Icons
  { file: "icon_settings.png", w: 128, h: 128, color: "546E7A", label: "⚙", transparent: true },
  { file: "icon_music_on.png", w: 128, h: 128, color: "FFD700", label: "♫", transparent: true },
  { file: "icon_music_off.png", w: 128, h: 128, color: "9E9E9E", label: "♫✕", transparent: true },
  { file: "icon_sfx_on.png", w: 128, h: 128, color: "FFD700", label: "🔊", transparent: true },
  { file: "icon_sfx_off.png", w: 128, h: 128, color: "9E9E9E", label: "🔇", transparent: true },

  // 13. App Icon
  { file: "icon_v2_512.png", w: 512, h: 512, color: "0D1B2A", label: "APP\nICON" },
  { file: "icon_v2_64.png", w: 64, h: 64, color: "0D1B2A", label: "FAV" },

  // 14. Background
  { file: "bg_pattern.png", w: 256, h: 256, color: "0D1B2A", label: "BG\nPATTERN" },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

function contrastColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#222222" : "#FFFFFF";
}

function createSvgPlaceholder(asset: Asset): string {
  const { w, h, color, label, transparent, file } = asset;
  const textColor = contrastColor(color);
  const bgOpacity = transparent ? 0.85 : 1;
  const fontSize = Math.max(10, Math.min(w, h) / 6);
  const smallFontSize = Math.max(8, fontSize * 0.45);

  // Split label into lines
  const lines = label.split("\n");
  const lineHeight = fontSize * 1.2;
  const totalTextHeight = lines.length * lineHeight;
  const startY = h / 2 - totalTextHeight / 2 + fontSize * 0.35;

  // For blocks: draw a rounded square with a bevel effect
  const isBlock = file.startsWith("block_");
  const isButton = file.startsWith("btn_");
  const isParticle = file.startsWith("particle_");

  let shapeSvg: string;

  if (isBlock) {
    const margin = w * 0.08;
    const inner = w - margin * 2;
    const { r, g, b } = hexToRgb(color);
    const lighter = `rgb(${Math.min(255, r + 60)},${Math.min(255, g + 60)},${Math.min(255, b + 60)})`;
    const darker = `rgb(${Math.max(0, r - 50)},${Math.max(0, g - 50)},${Math.max(0, b - 50)})`;
    shapeSvg = `
      <rect x="${margin}" y="${margin}" width="${inner}" height="${inner}" rx="8" fill="#${color}" stroke="#222" stroke-width="3"/>
      <rect x="${margin + 4}" y="${margin + 4}" width="${inner - 8}" height="${inner / 2 - 4}" rx="4" fill="${lighter}" opacity="0.3"/>
      <rect x="${margin}" y="${margin + inner / 2}" width="${inner}" height="${inner / 2}" rx="4" fill="${darker}" opacity="0.2"/>
      <circle cx="${margin + inner * 0.25}" cy="${margin + inner * 0.25}" r="${inner * 0.08}" fill="white" opacity="0.6"/>
    `;
  } else if (isButton) {
    const cx = w / 2;
    const cy = h / 2;
    const r = w * 0.42;
    shapeSvg = `
      <circle cx="${cx}" cy="${cy}" r="${r + 4}" fill="#D4A017" stroke="#222" stroke-width="3"/>
      <circle cx="${cx}" cy="${cy}" r="${r - 2}" fill="#${color}"/>
      <circle cx="${cx}" cy="${cy - r * 0.15}" r="${r - 6}" fill="white" opacity="0.08"/>
    `;
  } else if (isParticle) {
    const cx = w / 2;
    const cy = h / 2;
    const r = w * 0.3;
    shapeSvg = `
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#${color}" opacity="0.9"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.5}" fill="white" opacity="0.4"/>
    `;
  } else if (file.startsWith("board_frame")) {
    // Draw as a frame with transparent center
    const frameW = 24;
    shapeSvg = `
      <rect width="${w}" height="${h}" fill="#37474F" rx="4" stroke="#222" stroke-width="2"/>
      <rect x="${frameW}" y="${frameW}" width="${w - frameW * 2}" height="${h - frameW * 2}" fill="#1a1a2e" rx="2"/>
      <rect x="2" y="2" width="${w - 4}" height="${h - 4}" fill="none" stroke="#D4A017" stroke-width="4" rx="4"/>
    `;
  } else if (file.startsWith("panel_")) {
    const bw = 8;
    const { r, g, b } = hexToRgb(color);
    const darker = `rgb(${Math.max(0, r - 20)},${Math.max(0, g - 20)},${Math.max(0, b - 20)})`;
    shapeSvg = `
      <rect width="${w}" height="${h}" rx="6" fill="${darker}" stroke="#222" stroke-width="2"/>
      <rect x="${bw}" y="${bw}" width="${w - bw * 2}" height="${h - bw * 2}" rx="3" fill="#${color}"/>
      <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="6" fill="none" stroke="#D4A017" stroke-width="3"/>
      <circle cx="8" cy="8" r="4" fill="#D4A017"/>
      <circle cx="${w - 8}" cy="8" r="4" fill="#D4A017"/>
      <circle cx="8" cy="${h - 8}" r="4" fill="#D4A017"/>
      <circle cx="${w - 8}" cy="${h - 8}" r="4" fill="#D4A017"/>
    `;
  } else if (file.startsWith("xp_")) {
    const isFrame = file.includes("frame");
    shapeSvg = `
      <rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="${h / 2 - 4}" fill="${isFrame ? '#37474F' : '#' + color}" stroke="${isFrame ? '#D4A017' : 'none'}" stroke-width="${isFrame ? 3 : 0}"/>
      ${!isFrame ? `<rect x="8" y="8" width="${w - 16}" height="${(h - 16) * 0.4}" rx="4" fill="white" opacity="0.2"/>` : ''}
    `;
  } else if (file.startsWith("logo_")) {
    shapeSvg = `
      <rect x="4" y="${h * 0.2}" width="${w - 8}" height="${h * 0.6}" rx="8" fill="#1E3A8A" opacity="0.7"/>
      <rect x="2" y="2" width="${w - 4}" height="${h - 4}" fill="none"/>
    `;
  } else {
    // Default rectangle
    shapeSvg = `<rect width="${w}" height="${h}" fill="#${color}" opacity="${bgOpacity}" rx="4"/>`;
  }

  // Build text lines
  const textLines = lines
    .map(
      (line, i) =>
        `<text x="${w / 2}" y="${startY + i * lineHeight}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="${fontSize}" fill="${textColor}" stroke="#000" stroke-width="1" paint-order="stroke">${escapeXml(line)}</text>`
    )
    .join("\n    ");

  // Filename at bottom
  const filenameText = `<text x="${w / 2}" y="${h - smallFontSize * 0.5}" text-anchor="middle" font-family="monospace" font-size="${smallFontSize}" fill="${textColor}" opacity="0.7">${escapeXml(file)}</text>`;

  // Size label at top
  const sizeText = `<text x="${w / 2}" y="${smallFontSize + 2}" text-anchor="middle" font-family="monospace" font-size="${smallFontSize}" fill="${textColor}" opacity="0.5">${w}x${h}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  ${shapeSvg}
  ${textLines}
  ${filenameText}
  ${sizeText}
</svg>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log(`Generating ${assets.length} placeholder images in ${OUT_DIR}...\n`);

  for (const asset of assets) {
    const svg = createSvgPlaceholder(asset);
    const outPath = join(OUT_DIR, asset.file);

    await sharp(Buffer.from(svg)).png().toFile(outPath);

    console.log(`  ✓ ${asset.file.padEnd(28)} ${String(asset.w).padStart(4)}x${String(asset.h).padEnd(4)}`);
  }

  console.log(`\nDone! ${assets.length} placeholders generated.`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
