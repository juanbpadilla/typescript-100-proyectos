import './style.css'
import { Minesweeper } from './core/services/Minesweeper';
import { renderBoard } from './ui/board';
import { calculateDimension } from './ui/calculateDimension';

let resizeTimeout: number | null = null;

const cols = 9
const rows = 9
const mines = 9
const game = new Minesweeper(rows, cols, mines);

calculateDimension(game);
renderBoard(game);

// 🔁 Recalcular cuando el tamaño de ventana cambie
window.addEventListener('resize', () => {
  if (resizeTimeout !== null) {
    clearTimeout(resizeTimeout);
  }
  resizeTimeout = window.setTimeout(() => {
    calculateDimension(game);
    renderBoard(game)
  }, 150); // espera 150ms después del último cambio
});
