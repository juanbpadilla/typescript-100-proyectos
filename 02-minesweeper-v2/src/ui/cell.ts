import { numberColors } from "../core/services/config";
import { Minesweeper } from "../core/services/Minesweeper";
import { renderBoard } from "./board";

/**
 * Crea y devuelve un elemento de celda para el tablero.
 */
export function renderCell(game: Minesweeper, row: number, col: number): HTMLElement {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.row = row.toString();
  cell.dataset.col = col.toString();

  const cellContent = document.createElement('div');
  cellContent.classList.add('cell-content')

  cell.appendChild(cellContent)

  const cellData = game.board[row][col];

  // Aplicar clases según el estado de la celda
  if (cellData.state === "covered") {
    cell.classList.add('covered');
  } else if (cellData.state === "flagged") {
    cell.classList.add('flagged');
    // cell.textContent = "🚩";
    cellContent.textContent = "🚩";
  } else if (cellData.state === "questioned") {
    cell.classList.add('questioned');
    cellContent.textContent = "?";
  } else if (cellData.state === "uncovered") {
    if (cellData.hasMine) {
      cell.classList.add('mine');
      // cell.textContent = "💣";
      cellContent.textContent = "💣";
    } else if (cellData.adjacentMines > 0) {
      cell.classList.add('number');
      
      const value = cellData.adjacentMines
      // cell.textContent = value.toString();
      cellContent.textContent = value.toString();

      const color = numberColors[value] || "#000";
      cell.style.color = color
    } else {
      cell.classList.add('empty');
    }
  }

  // Agregar eventos
  cell.addEventListener('click', () => {
    game.uncoverCell(row, col);
    renderBoard(game); // Re-renderizamos el tablero después de la acción
  });

  cell.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    game.toggleFlag(row, col);
    renderBoard(game); // Re-renderizamos el tablero después de la acción
  });

  return cell;
}
