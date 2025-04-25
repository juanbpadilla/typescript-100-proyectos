import { dimensions, game_state } from "./utils";
import { State } from "./types";

// class NewBox {
//   constructor(content, )
// }
// type Estado = 'activo' | 'inactivo' | 'pendiente';

class NewBox {
  content: string|number
  isVisible: boolean
  completed: boolean
  state: State

  constructor(content: string|number, isVisible: boolean, completed: boolean, state: State) {
    this.content = content;
    this.isVisible = isVisible;
    this.completed = completed;
    this.state = state;
  }

  setContent(content: string|number){
    this.content = content
  }
}

export const board: Array<Array<NewBox>> = Array.from({ length: dimensions.board_height }, () => {
  return Array.from({ length: dimensions.board_width }, () => new NewBox(0, false, false, 0))
})
// export const board: Array<Array<string|number>>  = [
//   [0,0,0,"💥",0,"💥",0,0],
//   [0,"💥",0,0,0,0,0,0],
//   [0,0,0,"💥",0,0,"💥",0],
//   [0,0,0,0,0,0,"💥",0],
//   [0,"💥",0,0,0,0,0,0],
//   [0,0,0,"💥",0,"💥",0,0],
//   [0,0,0,0,0,0,0,0],
//   [0,"💥",0,0,0,0,0,0]
// ]

for (let i = 0; i < game_state.mines; i++) {
  generateMine(Math.floor(Math.random() * dimensions.board_width), Math.floor(Math.random() * dimensions.board_height))
}

board.forEach((row, y) => {
  row.forEach((value, x) =>{
    // console.log(value.content)
    let count = 0
    if (value.content !== "💥") {
      if (board[y-1]?.[x-1]?.content === "💥") {count++}
      if (board[y-1]?.[x]?.content === "💥") {count++}
      if (board[y-1]?.[x+1]?.content === "💥") {count++}

      if (board[y+1]?.[x-1]?.content === "💥") {count++}
      if (board[y+1]?.[x]?.content === "💥") {count++}
      if (board[y+1]?.[x+1]?.content === "💥") {count++}

      if (board[y][x-1]?.content === "💥") {count++}
      if (board[y][x+1]?.content === "💥") {count++}
      board[y][x].setContent(count)
    }
  })
})

function generateMine(x: number, y: number) {
  if (board[y][x].content === "💥") {
    return generateMine(Math.floor(Math.random() * dimensions.board_width), Math.floor(Math.random() * dimensions.board_height))
  }
  board[y][x].setContent("💥")
}