import { board } from "../board";
import { canvas } from "../components/board";
import { dimensions } from "../utils";

export function canvasEvents() {
  canvas.addEventListener('click', (event) => {
    const positionx = Math.trunc(event.offsetX / dimensions.block_size)
    const positiony = Math.trunc(event.offsetY / dimensions.block_size)
    if (board[positiony][positionx].isVisible || board[positiony][positionx].state > 0) return
    // console.log({positionx}, {positiony})
    board[positiony][positionx].setVisible(true)
    // console.log(board)
  });
  canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const positionx = Math.trunc(event.offsetX / dimensions.block_size)
    const positiony = Math.trunc(event.offsetY / dimensions.block_size)
    if (board[positiony][positionx].isVisible) return
    // console.log({positionx}, {positiony})
    board[positiony][positionx].cambiarEstado();
    // console.log(board[positiony][positionx].state)
  });
}
