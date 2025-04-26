import './style.css'
import { board } from './board'
import { draw } from './logic/draw-logic'
import { canvasEvents } from './events/canvas-events'
import { addGameComponents } from './components/game_app'

function update() {
  // layer_draw()
  draw()
  window.requestAnimationFrame(update)
}

canvasEvents()
update()

addGameComponents()

console.log(board)
