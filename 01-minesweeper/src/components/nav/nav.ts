import { game_state, game_utils } from "../../utils"

export const nav: HTMLElement = document.createElement('nav')

nav.innerHTML = `
  <div class="emoji">😀</div>
  <div class="mine-info">
    <div class="flag-count">${game_utils.MINE_ICON} <span id="lavel">${game_state.mines}</span></div>
  </div>
`

export const lavel = nav.querySelector("#lavel")!