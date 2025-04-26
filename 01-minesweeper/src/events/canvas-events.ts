import { board } from "../board";
import { canvas } from "../components/main/board";
import { dimensions } from "../utils";

export function canvasEvents() {
  canvas.addEventListener('click', (event) => {
    const positionx = Math.trunc(event.offsetX / dimensions.block_size)
    const positiony = Math.trunc(event.offsetY / dimensions.block_size)
    if (board[positiony][positionx].isVisible || board[positiony][positionx].state > 0) return
    // console.log({positionx}, {positiony})
    board[positiony][positionx].setVisible(true)
    if (board[positiony][positionx].content === 0) {discoverGaps(positionx, positiony)}    
  });
  canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const positionx = Math.trunc(event.offsetX / dimensions.block_size)
    const positiony = Math.trunc(event.offsetY / dimensions.block_size)
    if (board[positiony][positionx].isVisible) return
    // console.log({positionx}, {positiony})
    board[positiony][positionx].cambiarEstado();
  });
}

function discoverGaps(x: number, y: number) {
  const n = board.length
  
  const directions = [
    [0,1],
    [1,0],
    [-1,0],
    [0,-1]
  ]
  
  let start = [y, x];
  
  const queue = [[ ...start, 0 ]];  
  const visited = new Set();
  visited.add(`${start[0]},${start[1]}`);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;
    const [y, x, steps] = current;
    
    for (const [dy, dx] of directions) {
      const nx = x + dx
      const ny = y + dy
      
      if (
        nx >= 0 && nx < board[0].length && 
        ny >= 0 && ny < n && 
        !visited.has(`${ny},${nx}`) 
        && (board[ny][nx].content === 0 
        || (typeof board[ny][nx].content === 'number' &&
          board[y][x].content === 0)
        )
      ){
        visited.add(`${ny},${nx}`);
        queue.push([ny, nx, steps + 1])
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