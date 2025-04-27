import './style.css'
import { draw } from './logic/draw-logic'
import { canvasEvents } from './events/canvas-events'
import { addGameComponents } from './components/game_app'
import { board } from './board'
import { game_state } from './utils'

var raf: number;

function update() {
  draw(raf)
  raf = window.requestAnimationFrame(update)
}

// update()


addGameComponents()
console.log(board)
console.log(game_state.chances)

function initGame() {
  canvasEvents()
  raf = window.requestAnimationFrame(update)
}

initGame()

