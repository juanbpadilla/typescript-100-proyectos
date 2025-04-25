import './style.css'
import { board } from './board'
import { draw } from './logic/draw-logic'
import { fontSize, max, min } from './utils'
import { canvasEvents } from './events/canvas-events'

function update() {
  // layer_draw()
  draw()
  window.requestAnimationFrame(update)
}

canvasEvents()
// draw()
update()
console.log({board})
console.log(min, max, fontSize)
