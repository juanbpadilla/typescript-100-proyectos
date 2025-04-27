import { dimensions, game_state, game_utils } from "./utils";
import { State } from "./types";
import { lavel } from "./components/nav/nav";

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

  setVisible(isVisible: boolean){
    this.isVisible = isVisible
  }

  public setState(): State {
    if (this.state === 0) {
      game_state.mines--
      lavel.innerHTML = `${game_state.mines}`
    } else if (this.state === 1) {
      game_state.mines++
      lavel.innerHTML = `${game_state.mines}`
    }
    return (this.state = ((this.state + 1) % 3) as State);
  }

  public isMine(): boolean {
    return (this.isVisible && (this.content === game_utils.MINE_ICON))
  }
}

const directions = [
  [-1,-1],
  [-1,0],
  [-1,1],
  [0,-1],
  [0,1],
  [1,-1],
  [1,0],
  [1,1]
]

export let board: Array<Array<NewBox>>;

// const posMin = [[0,1], [0,3], [1,8], [2,4], [4,1], [5,3], [6,3], [7,0], [7,3], [8,4]]

export const generateBoard = () => {
  board = Array.from({ length: dimensions.board_height }, () => {
    return Array.from({ length: dimensions.board_width }, () => new NewBox(0, false, false, 0))
  })

  for (let i = 0; i < game_state.mines; i++) {
    generateMine(Math.floor(Math.random() * dimensions.board_width), Math.floor(Math.random() * dimensions.board_height))
  }

  board.forEach((row, y) => {
    row.forEach((value, x) =>{
      let count = 0
      if (value.content !== game_utils.MINE_ICON) {
        for (const [dy, dx] of directions) {
          const nx = x + dx
          const ny = y + dy
  
          if (
            // nx >= 0 && nx < board[0].length && 
            // ny >= 0 && ny < board.length && 
            board[ny]?.[nx]?.content === game_utils.MINE_ICON
          ) {
            count++
          }
        }
        board[y][x].setContent(count)
      }
    })
  })
}

// generateBoard();



function generateMine(x: number, y: number) {

  if (board[y][x].content === game_utils.MINE_ICON) {
    return generateMine(Math.floor(Math.random() * dimensions.board_width), Math.floor(Math.random() * dimensions.board_height))
  }
  board[y][x].setContent(game_utils.MINE_ICON)
}






