import confetti from "canvas-confetti";

import { Minesweeper } from "../core/services/Minesweeper";
import { renderCell } from "./cell";
import { boardConfig } from "../core/services/config";
// import { boardConfig } from "../utils/helpers";



/**
 * Renderiza el tablero en el DOM basado en el estado actual del juego.
*/
export function renderBoard(game: Minesweeper) {
  const boardElement = document.getElementById('board');
  
  if (!boardElement) {
    throw new Error("No se encontró el elemento #board en el HTML.");
  }
  // Limpiar tablero anterior si existía
  boardElement.innerHTML = '';

  

  // Establecer el estilo de la grilla
  boardElement.style.width = `${game.cols * boardConfig.blockSize}px`
  boardElement.style.height = `${game.rows * boardConfig.blockSize}px`
  boardElement.style.display = "grid";
  boardElement.style.gridTemplateRows = `repeat(${game.rows}, 1fr)`;
  boardElement.style.gridTemplateColumns = `repeat(${game.cols}, 1fr)`;
  // boardElement.style.gap = `${gapSize}px`

  if (game.isVictory) {
    boardElement.classList.add('victory')
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  // console.log(game.board.map((row) => {
  //   return row.map((col) => col.value.toString())
  // }))

  // Renderizar cada celda
  for (let row = 0; row < game.rows; row++) {
    for (let col = 0; col < game.cols; col++) {
      const cellElement = renderCell(game, row, col);
      boardElement.appendChild(cellElement);
    }
  }
}
