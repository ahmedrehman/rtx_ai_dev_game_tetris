/**
 * input.js — Keyboard bindings.
 * Translates DOM events to action strings and forwards them to the game.
 */

import { DAS_DELAY_MS, ARR_MS } from './constants.js';

const KEY_MAP = {
  ArrowLeft:  'moveLeft',
  ArrowRight: 'moveRight',
  ArrowUp:    'rotate',
  KeyX:       'rotate',
  ArrowDown:  'softDrop',
  Space:      'hardDrop',
  KeyP:       'pause',
  Escape:     'pause',
  Enter:      'start',
};

/**
 * Attaches keyboard listeners to window.
 * @param {{ action: Function, start: Function }} game
 * @returns {{ destroy }} - call destroy() to remove listeners
 */
export function attachInput(game) {
  const held     = new Set();
  const dasTimer = {};
  const arrTimer = {};

  function dispatch(key) {
    const act = KEY_MAP[key];
    if (!act) return;
    if (act === 'start') { game.start(); return; }
    game.action(act);
  }

  function startRepeat(key) {
    if (key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'ArrowDown') return;
    dasTimer[key] = setTimeout(() => {
      arrTimer[key] = setInterval(() => {
        if (held.has(key)) dispatch(key);
        else stopRepeat(key);
      }, ARR_MS);
    }, DAS_DELAY_MS);
  }

  function stopRepeat(key) {
    clearTimeout(dasTimer[key]);
    clearInterval(arrTimer[key]);
    delete dasTimer[key];
    delete arrTimer[key];
  }

  function onKeyDown(e) {
    if (held.has(e.code)) return; // ignore key-repeat from OS
    if (KEY_MAP[e.code]) e.preventDefault();
    held.add(e.code);
    dispatch(e.code);
    startRepeat(e.code);
  }

  function onKeyUp(e) {
    held.delete(e.code);
    stopRepeat(e.code);
  }

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup',   onKeyUp);

  return {
    destroy() {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup',   onKeyUp);
      Object.keys(dasTimer).forEach(stopRepeat);
    },
  };
}
