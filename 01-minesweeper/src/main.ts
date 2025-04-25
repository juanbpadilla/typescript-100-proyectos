import './style.css'
import { board } from './board'
import { draw } from './logic/draw-logic'
import { fontSize, max, min } from './utils'

function update() {
  // layer_draw()
  draw()
  window.requestAnimationFrame(update)
}

// draw()
update()
console.log({board})
console.log(min, max, fontSize)
