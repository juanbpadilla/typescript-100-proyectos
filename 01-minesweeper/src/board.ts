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
  const n = dimensions.board_height
  const m = dimensions.board_width
  const x = game_state.mines
  
  board = Array.from({ length: dimensions.board_height }, () => {
    return Array.from({ length: dimensions.board_width }, () => new NewBox(0, false, false, 0))
  })

  // Crear todas las posiciones posibles
  const posiciones: [number, number][] = [];
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
          posiciones.push([i, j]);
      }
  }

  // Mezclar las posiciones aleatoriamente (Fisher-Yates Shuffle)
  for (let i = posiciones.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [posiciones[i], posiciones[j]] = [posiciones[j], posiciones[i]];
  }

  // Elegir las primeras x posiciones
  const minas = posiciones.slice(0, x);

  // Colocar las minas
  minas.forEach(([i, j]) => {
    board[i][j].setContent(game_utils.MINE_ICON);
  });

  minas.forEach(([i,j]) => {
    for (const [dy, dx] of directions) {
      const nx = j + dx
      const ny = i + dy

      if (
        nx >= 0 && nx < m
        && ny >= 0 && ny < n
        && board[ny][nx].content !== game_utils.MINE_ICON
      ){
        const aux = (board[ny][nx].content as number) + 1
        board[ny][nx].setContent(aux)
      }
    }
  })
}







