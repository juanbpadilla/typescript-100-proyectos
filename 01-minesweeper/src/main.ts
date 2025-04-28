import './style.css'
import { draw } from './logic/draw-logic'
import { canvasEvents } from './events/canvas-events'
import { addGameComponents } from './components/game_app'
import { board, generateBoard } from './board'
import { game_state, restoreState } from './utils'

var raf: number;

function update() {
  if (game_state.chances < 0) {
    window.cancelAnimationFrame(raf);
    window.alert("Game Over")
    initGame()
  } else {
    draw()
    raf = window.requestAnimationFrame(update)
  }
}

// update()


addGameComponents()

function initGame() {
  restoreState()
  generateBoard()
  canvasEvents()
  raf = window.requestAnimationFrame(update)
}

initGame()

const auxBoard = board.map((row) => {
  return row.map((col) => col.content.toString())
})

console.log(auxBoard)
console.log(game_state.chances)
const matchMedia = window.matchMedia("(prefers-color-scheme: dark)").matches
console.log(matchMedia)
