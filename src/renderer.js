/**
 * renderer.js — Canvas drawing.
 * Reads state, writes pixels.  Never mutates game state.
 */

import { BOARD_COLS, BOARD_ROWS, CELL_SIZE } from './constants.js';
import { TETROMINOES }                        from './tetrominos.js';
import { STATUS }                             from './constants.js';

const GRID_COLOR      = '#1a1a2e';
const BORDER_COLOR    = '#e0e0e0';
const GHOST_ALPHA     = 0.25;
const PREVIEW_CELLS   = 4; // preview canvas size in cells
const PREVIEW_CELL_PX = 28;

/**
 * Initialise the renderer against two canvas elements.
 * @param {HTMLCanvasElement} boardCanvas
 * @param {HTMLCanvasElement} previewCanvas
 * @returns {{ render }}
 */
export function createRenderer(boardCanvas, previewCanvas) {
  const ctx     = boardCanvas.getContext('2d');
  const prevCtx = previewCanvas.getContext('2d');

  boardCanvas.width   = BOARD_COLS * CELL_SIZE;
  boardCanvas.height  = BOARD_ROWS * CELL_SIZE;
  previewCanvas.width  = PREVIEW_CELLS * PREVIEW_CELL_PX;
  previewCanvas.height = PREVIEW_CELLS * PREVIEW_CELL_PX;

  // ── Drawing helpers ───────────────────────────────────────────────────────

  function drawCell(context, col, row, color, cellPx, alpha = 1) {
    context.globalAlpha = alpha;
    context.fillStyle   = color;
    context.fillRect(col * cellPx, row * cellPx, cellPx - 1, cellPx - 1);

    // Highlight / shadow bevel
    context.fillStyle   = 'rgba(255,255,255,0.25)';
    context.fillRect(col * cellPx, row * cellPx, cellPx - 1, 3);
    context.fillStyle   = 'rgba(0,0,0,0.25)';
    context.fillRect(col * cellPx, row * cellPx + cellPx - 4, cellPx - 1, 3);

    context.globalAlpha = 1;
  }

  function drawBoard(board) {
    ctx.fillStyle = GRID_COLOR;
    ctx.fillRect(0, 0, boardCanvas.width, boardCanvas.height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth   = 0.5;
    for (let c = 0; c < BOARD_COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * CELL_SIZE, 0);
      ctx.lineTo(c * CELL_SIZE, boardCanvas.height);
      ctx.stroke();
    }
    for (let r = 0; r < BOARD_ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * CELL_SIZE);
      ctx.lineTo(boardCanvas.width, r * CELL_SIZE);
      ctx.stroke();
    }

    // Locked cells
    for (let r = 0; r < BOARD_ROWS; r++) {
      for (let c = 0; c < BOARD_COLS; c++) {
        if (board[r][c]) {
          drawCell(ctx, c, r, board[r][c], CELL_SIZE);
        }
      }
    }
  }

  function ghostRow(matrix, pieceRow, pieceCol, board) {
    const { isValidPosition } = getIsValid();
    let row = pieceRow;
    while (isValidPosition(matrix, row + 1, pieceCol, board)) row++;
    return row;
  }

  function drawPiece(matrix, pieceRow, pieceCol, color, alpha = 1) {
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c]) {
          drawCell(ctx, pieceCol + c, pieceRow + r, color, CELL_SIZE, alpha);
        }
      }
    }
  }

  function drawPreview(nextKey) {
    prevCtx.fillStyle = GRID_COLOR;
    prevCtx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
    if (!nextKey) return;
    const t      = TETROMINOES[nextKey];
    const matrix = t.rotations[0];
    const offC   = Math.floor((PREVIEW_CELLS - matrix[0].length) / 2);
    const offR   = Math.floor((PREVIEW_CELLS - matrix.length)    / 2);
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c]) {
          drawCell(prevCtx, offC + c, offR + r, t.color, PREVIEW_CELL_PX);
        }
      }
    }
  }

  function drawOverlay(text) {
    ctx.fillStyle    = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, boardCanvas.width, boardCanvas.height);
    ctx.fillStyle    = '#ffffff';
    ctx.font         = 'bold 22px monospace';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, boardCanvas.width / 2, boardCanvas.height / 2);
  }

  // Lazy import of isValidPosition to avoid circular concern
  let _isValid = null;
  function getIsValid() {
    if (!_isValid) {
      // Import is resolved at call time (modules are cached)
      const mod = { isValidPosition: null };
      import('./board.js').then(m => { mod.isValidPosition = m.isValidPosition; });
      _isValid = mod;
    }
    return _isValid;
  }

  // ── Main render ───────────────────────────────────────────────────────────
  /**
   * @param {{ board, currentPiece, nextPieceKey, score, level, lines, status }} state
   */
  function render(state) {
    const { board, currentPiece, nextPieceKey, status: gameStatus } = state;

    drawBoard(board);

    if (currentPiece) {
      // Ghost piece
      const valid = getIsValid();
      if (valid.isValidPosition) {
        const gr = ghostRow(currentPiece.matrix, currentPiece.row, currentPiece.col, board);
        if (gr !== currentPiece.row) {
          drawPiece(currentPiece.matrix, gr, currentPiece.col, currentPiece.color, GHOST_ALPHA);
        }
      }
      // Active piece
      drawPiece(currentPiece.matrix, currentPiece.row, currentPiece.col, currentPiece.color);
    }

    drawPreview(nextPieceKey);

    if (gameStatus === STATUS.PAUSED)    drawOverlay('PAUSED');
    if (gameStatus === STATUS.GAME_OVER) drawOverlay('GAME OVER');
    if (gameStatus === STATUS.IDLE)      drawOverlay('Press ENTER to start');
  }

  return { render };
}
