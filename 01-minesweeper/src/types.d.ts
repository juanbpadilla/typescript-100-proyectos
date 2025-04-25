export type State = 0 | 1 | 2;

export interface Box {
  content: string|number
  isVisible: boolean
  completed: boolean
  estado: State
}

export type ListOfBox = Box[]