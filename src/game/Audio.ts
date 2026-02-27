// Korobeiniki (Tetris Theme A) - note frequencies and durations
// Programmatic chiptune synthesis using Web Audio API

const NOTE_FREQ: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25,
};

type NoteEntry = [string, number]; // [note, beats]

// Korobeiniki melody (Theme A) - simplified
const MELODY: NoteEntry[] = [
  ["E5", 1], ["B4", 0.5], ["C5", 0.5], ["D5", 1], ["C5", 0.5], ["B4", 0.5],
  ["A4", 1], ["A4", 0.5], ["C5", 0.5], ["E5", 1], ["D5", 0.5], ["C5", 0.5],
  ["B4", 1.5], ["C5", 0.5], ["D5", 1], ["E5", 1],
  ["C5", 1], ["A4", 1], ["A4", 2],

  ["D5", 1.5], ["F4", 0.5], ["A4", 1], ["G4", 0.5], ["F4", 0.5],
  ["E4", 1.5], ["C5", 0.5], ["E5", 1], ["D5", 0.5], ["C5", 0.5],
  ["B4", 1.5], ["C5", 0.5], ["D5", 1], ["E5", 1],
  ["C5", 1], ["A4", 1], ["A4", 2],

  // Part B
  ["E4", 2], ["C4", 2],
  ["D4", 2], ["B3", 2],
  ["C4", 2], ["A3", 2],
  ["B3", 2], ["E4", 2],

  ["E4", 2], ["C4", 2],
  ["D4", 2], ["B3", 2],
  ["C4", 1], ["E4", 1], ["A4", 2],
  ["G4", 2], ["G4", 2],
];

// Bass line
const BASS: NoteEntry[] = [
  ["E3", 2], ["A3", 2], ["E3", 2], ["A3", 2],
  ["E3", 2], ["A3", 2], ["E3", 2], ["A3", 2],
  ["D3", 2], ["A3", 2], ["E3", 2], ["A3", 2],
  ["D3", 2], ["A3", 2], ["E3", 2], ["A3", 2],
  // Part B bass
  ["A3", 2], ["E3", 2], ["A3", 2], ["E3", 2],
  ["A3", 2], ["E3", 2], ["A3", 2], ["E3", 2],
  ["A3", 2], ["E3", 2], ["A3", 2], ["E3", 2],
  ["A3", 2], ["E3", 2], ["A3", 2], ["E3", 2],
];

export class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  private musicPlaying = false;
  private musicTimeout: number | null = null;
  private currentMelodyOsc: OscillatorNode | null = null;
  private currentBassOsc: OscillatorNode | null = null;

  private _musicEnabled = true;
  private _sfxEnabled = true;

  get musicEnabled(): boolean { return this._musicEnabled; }
  get sfxEnabled(): boolean { return this._sfxEnabled; }

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.3;
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.4;
      this.sfxGain.connect(this.masterGain);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  setMusicEnabled(enabled: boolean): void {
    this._musicEnabled = enabled;
    if (this.musicGain) {
      this.musicGain.gain.value = enabled ? 0.3 : 0;
    }
    if (!enabled) {
      this.stopMusic();
    }
  }

  setSfxEnabled(enabled: boolean): void {
    this._sfxEnabled = enabled;
    if (this.sfxGain) {
      this.sfxGain.gain.value = enabled ? 0.4 : 0;
    }
  }

  startMusic(): void {
    if (!this._musicEnabled) return;
    this.ensureContext();
    if (this.musicPlaying) return;
    this.musicPlaying = true;
    this.playMusicLoop();
  }

  stopMusic(): void {
    this.musicPlaying = false;
    if (this.musicTimeout !== null) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
    if (this.currentMelodyOsc) {
      try { this.currentMelodyOsc.stop(); } catch {}
      this.currentMelodyOsc = null;
    }
    if (this.currentBassOsc) {
      try { this.currentBassOsc.stop(); } catch {}
      this.currentBassOsc = null;
    }
  }

  private playMusicLoop(): void {
    if (!this.musicPlaying || !this.ctx || !this.musicGain) return;

    const bpm = 140;
    const beatDur = 60 / bpm;
    const now = this.ctx.currentTime;

    // Schedule melody
    const melodyOsc = this.ctx.createOscillator();
    const melodyEnv = this.ctx.createGain();
    melodyOsc.type = "square";
    melodyOsc.connect(melodyEnv);
    melodyEnv.connect(this.musicGain);

    let melTime = now;
    for (const [note, beats] of MELODY) {
      const freq = NOTE_FREQ[note] || 440;
      const dur = beats * beatDur;
      melodyOsc.frequency.setValueAtTime(freq, melTime);
      melodyEnv.gain.setValueAtTime(0.6, melTime);
      melodyEnv.gain.setValueAtTime(0.3, melTime + dur * 0.1);
      melodyEnv.gain.setValueAtTime(0, melTime + dur - 0.01);
      melTime += dur;
    }
    melodyOsc.start(now);
    melodyOsc.stop(melTime);
    this.currentMelodyOsc = melodyOsc;

    // Schedule bass
    const bassOsc = this.ctx.createOscillator();
    const bassEnv = this.ctx.createGain();
    bassOsc.type = "triangle";
    bassOsc.connect(bassEnv);
    bassEnv.connect(this.musicGain);

    let bassTime = now;
    for (const [note, beats] of BASS) {
      const freq = NOTE_FREQ[note] || 110;
      const dur = beats * beatDur;
      bassOsc.frequency.setValueAtTime(freq, bassTime);
      bassEnv.gain.setValueAtTime(0.4, bassTime);
      bassEnv.gain.setValueAtTime(0, bassTime + dur - 0.01);
      bassTime += dur;
    }
    bassOsc.start(now);
    bassOsc.stop(bassTime);
    this.currentBassOsc = bassOsc;

    // Loop
    const totalDur = melTime - now;
    this.musicTimeout = window.setTimeout(() => {
      if (this.musicPlaying) {
        this.playMusicLoop();
      }
    }, totalDur * 1000);
  }

  // --- Sound Effects ---

  playMove(): void {
    this.playSfx(200, 0.05, "square", 0.15);
  }

  playRotate(): void {
    this.playSfx(300, 0.08, "square", 0.2);
  }

  playDrop(): void {
    this.playSweep(150, 60, 0.12, "square", 0.3);
  }

  playLock(): void {
    this.playSfx(100, 0.1, "triangle", 0.25);
  }

  playLineClear(): void {
    const ctx = this.ensureContext();
    if (!this.sfxGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.connect(gain);
    gain.connect(this.sfxGain);

    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.linearRampToValueAtTime(1000, now + 0.15);
    osc.frequency.linearRampToValueAtTime(800, now + 0.3);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.35);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playTetris(): void {
    // Special 4-line clear sound
    const ctx = this.ensureContext();
    if (!this.sfxGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.connect(gain);
      gain.connect(this.sfxGain!);

      const t = ctx.currentTime + i * 0.08;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.linearRampToValueAtTime(0, t + 0.2);
      osc.start(t);
      osc.stop(t + 0.2);
    });
  }

  playGameOver(): void {
    const ctx = this.ensureContext();
    if (!this.sfxGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.connect(gain);
    gain.connect(this.sfxGain);

    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.8);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0, now + 1.0);

    osc.start(now);
    osc.stop(now + 1.0);
  }

  private playSfx(freq: number, duration: number, type: OscillatorType, vol: number): void {
    const ctx = this.ensureContext();
    if (!this.sfxGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(this.sfxGain);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.linearRampToValueAtTime(0, now + duration);
    osc.start(now);
    osc.stop(now + duration);
  }

  private playSweep(startFreq: number, endFreq: number, duration: number, type: OscillatorType, vol: number): void {
    const ctx = this.ensureContext();
    if (!this.sfxGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.connect(gain);
    gain.connect(this.sfxGain);

    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.linearRampToValueAtTime(endFreq, now + duration);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.linearRampToValueAtTime(0, now + duration);
    osc.start(now);
    osc.stop(now + duration);
  }

  dispose(): void {
    this.stopMusic();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

// Singleton
export const audio = new AudioManager();
