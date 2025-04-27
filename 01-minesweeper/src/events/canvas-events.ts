import { board } from "../board";
import { canvas } from "../components/main/board";
import { lavel } from "../components/nav/nav";
import { dimensions, game_state } from "../utils";

export function canvasEvents() {
  if (game_state.chances > 0) {
    canvas.addEventListener('click', handleClickListener);
    canvas.addEventListener('contextmenu', handleContextmenuListener);
  } else {
    canvas.removeEventListener('click', handleClickListener);
    canvas.removeEventListener('contextmenu', handleContextmenuListener);
  }

}

function discoverGaps(positionx: number, positiony: number) {
  const n = board.length
  
  const directions = [
    [0,1],
    [0,-1],
    [1,0],
    [-1,0],
  ]
  
  let start = [positiony, positionx];
  
  const queue = [[ ...start ]];  
  const visited = new Set();
  // visited.add(`${start[0]},${start[1]}`);
  
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;
    const [y, x] = current;
    
    for (const [dy, dx] of directions) {
      const nx = x + dx
      const ny = y + dy
      
      if (
        nx >= 0 && nx < board[0].length && 
        ny >= 0 && ny < n && 
        !visited.has(`${ny},${nx}`) 
        && (board[ny][nx].content === 0 
        || board[y][x].content === 0)
      ){
        visited.add(`${ny},${nx}`);
        queue.push([ny, nx])
        board[ny][nx].setVisible(true)
        if (board[ny][nx].content === 0) {
          comprobate(ny, nx)
        }
      }
    }
  }
}

function comprobate(y: number, x: number) {
  const directions = [
    [-1,-1],
    [-1,1],
    [1,-1],
    [1,1]
  ]

  for (const [dy, dx] of directions) {
    const ny = y + dy
    const nx = x + dx
    board[ny]?.[nx]?.setVisible(true)
  }
}

function handleClickListener(event: MouseEvent) {
  const positionx = Math.trunc(event.offsetX / dimensions.block_size)
  const positiony = Math.trunc(event.offsetY / dimensions.block_size)

  const cell = board[positiony][positionx]
  if (cell.isVisible || cell.state > 0) return
  cell.setVisible(true)
  // console.log("isMine:", cell.isMine())
  if (cell.isMine()) {
    game_state.chances--
    game_state.mines--
    lavel.innerHTML = `${game_state.mines}`
  }
  if (cell.content === 0) {discoverGaps(positionx, positiony)}
}

function handleContextmenuListener(event: MouseEvent) {
  event.preventDefault();
  const positionx = Math.trunc(event.offsetX / dimensions.block_size)
  const positiony = Math.trunc(event.offsetY / dimensions.block_size)
  if (board[positiony][positionx].isVisible) return
  board[positiony][positionx].setState();
}