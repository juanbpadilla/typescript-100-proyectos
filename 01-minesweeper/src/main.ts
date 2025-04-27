import './style.css'
import { draw } from './logic/draw-logic'
import { canvasEvents } from './events/canvas-events'
import { addGameComponents } from './components/game_app'

function update() {
  draw()
  window.requestAnimationFrame(update)
}

canvasEvents()
update()

addGameComponents()

