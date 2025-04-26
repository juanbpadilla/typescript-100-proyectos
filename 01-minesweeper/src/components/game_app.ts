import { header } from "./header/header"
import { main } from "./main/main"
import { nav } from "./nav/nav"

export const app = document.querySelector<HTMLDivElement>('#app')!

export function addGameComponents() {
  app.appendChild(header)
  app.appendChild(nav)
  app.appendChild(main)
}