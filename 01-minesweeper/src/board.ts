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
}

// export const board: Array<Array<NewBox>> = Array.from({ length: dimensions.board_height }, () => {
//   return Array.from({ length: dimensions.board_width }, () => new NewBox(0, false, false, 0))
// })
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

export const generateBoard = (): Array<Array<NewBox>> => {
  const genBoard = Array.from({ length: dimensions.board_height }, () => {
    return Array.from({ length: dimensions.board_width }, () => new NewBox(0, false, false, 0))
  })

  for (let i = 0; i < game_state.mines; i++) {
    const [x, y] = generateMine(genBoard)
    genBoard[y][x].setContent(game_utils.MINE_ICON)
  }

  genBoard.forEach((row, y) => {
    row.forEach((value, x) =>{
      let count = 0
      if (value.content !== game_utils.MINE_ICON) {
        for (const [dy, dx] of directions) {
          const nx = x + dx
          const ny = y + dy
  
          if (
            nx >= 0 && nx < genBoard[0].length && 
            ny >= 0 && ny < genBoard.length && 
            genBoard[ny][nx].content === game_utils.MINE_ICON
          ) {
            count++
          }
        }
        genBoard[y][x].setContent(count)
      }
    })
  })
  
  return genBoard
}

export const board = generateBoard()

function generateMine(auxBoard: Array<Array<NewBox>>): [number, number] {
  const x = Math.floor(Math.random() * dimensions.board_width)
  const y = Math.floor(Math.random() * dimensions.board_height)

  if (auxBoard[y][x].content === game_utils.MINE_ICON) {
    return generateMine(auxBoard)
  }

  return [x, y]
}


  



