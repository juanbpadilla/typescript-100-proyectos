import { BLOCK_STATE } from "./utils"

// export type State = 0 | 1 | 2;
export type State = typeof BLOCK_STATE[keyof typeof BLOCK_STATE]

export interface Box {
  content: string|number
  isVisible: boolean
  completed: boolean
  estado: State
}

export type ListOfBox = Box[]