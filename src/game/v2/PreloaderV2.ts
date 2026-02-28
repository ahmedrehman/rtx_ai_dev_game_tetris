import Phaser from "phaser";

export class PreloaderV2 extends Phaser.Scene {
  private passData: Record<string, unknown> = {};

  constructor() {
    super({ key: "PreloaderV2" });
  }

  init(data: Record<string, unknown>): void {
    this.passData = data;
  }

  preload(): void {
    // Progress bar
    const { width, height } = this.scale;
    const barW = Math.min(width - 40, 200);
    const barH = 16;
    const barX = (width - barW) / 2;
    const barY = height / 2 + 20;

    // "Loading..." text
    const loadText = this.add.text(width / 2, height / 2 - 10, "Loading...", {
      fontSize: "14px",
      color: "#D4A017",
      fontFamily: "Bungee, Impact, sans-serif",
    });
    loadText.setOrigin(0.5);

    // Background bar
    const bgBar = this.add.graphics();
    bgBar.fillStyle(0x1e3a8a, 0.5);
    bgBar.fillRect(barX, barY, barW, barH);

    // Fill bar
    const fillBar = this.add.graphics();
    this.load.on("progress", (value: number) => {
      fillBar.clear();
      fillBar.fillStyle(0xd4a017, 1);
      fillBar.fillRect(barX + 2, barY + 2, (barW - 4) * value, barH - 4);
    });

    // Load all Phaser-managed textures
    const base = "/assets/v2";

    // Block sprites
    const blocks = ["block_i", "block_o", "block_t", "block_s", "block_z", "block_j", "block_l", "block_ghost"];
    for (const b of blocks) {
      this.load.image(b, `${base}/${b}.png`);
    }

    // Board
    this.load.image("board_texture", `${base}/board_texture.png`);
    this.load.image("board_frame", `${base}/board_frame.png`);
    this.load.image("frame_next", `${base}/frame_next.png`);

    // Character
    const chars = ["char_idle", "char_happy", "char_excited", "char_worried", "char_defeated"];
    for (const c of chars) {
      this.load.image(c, `${base}/${c}.png`);
    }

    // Effects
    const effects = ["fx_lineclear", "fx_tetris", "fx_levelup", "fx_combo_bg"];
    for (const e of effects) {
      this.load.image(e, `${base}/${e}.png`);
    }

    // Particles
    const particles = ["particle_sparkle", "particle_star", "particle_shard", "particle_coin"];
    for (const p of particles) {
      this.load.image(p, `${base}/${p}.png`);
    }
  }

  create(): void {
    this.scene.start("GameSceneV2", this.passData);
  }
}
