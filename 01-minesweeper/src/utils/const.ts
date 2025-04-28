// export const BLOCK_SIZE = 40
// export const BOARD_WIDTH = 8
// export const BOARD_HEIGHT = 8

import { game_utils } from "./game_state"

export const dimensions = {
  block_size: 40,
  board_width: 9,
  board_height: 9
}

export const COLORS: string[] = [
  '#000',
  '#18B6D6',
  '#789F19',
  '#C7185F',
  '#1851B5',
  '#931110'
]

export const max = Math.floor(dimensions.block_size*0.9)
export const min = Math.floor(dimensions.block_size*0.05)
export const fontSize = Math.floor(dimensions.block_size*0.7)
// export const max = 36
// export const min = 2

export const BLOCK_STATE = {
  NONE: 0,
  FLAG_ICON: 1,
  QUESTION_MARK_ICON: 2,
} as const

export const FILTERS_BUTTONS = {
  [BLOCK_STATE.NONE]: {
    ICON: game_utils['NONE'],
    FONT: ``,
    FONT_SIZE: fontSize,
    SHADOW_COLOR: '',
    SHADOW_OFFSET_Y: 0,
    SHADOW_BLUR: 0,
    FILL_STYLE: ''
  },
  [BLOCK_STATE.FLAG_ICON]: {
    ICON: game_utils['FLAG_ICON'],
    FONT: `${fontSize*0.8}px system-ui`,
    FONT_SIZE: fontSize*0.9,
    SHADOW_COLOR: "#000",
    SHADOW_OFFSET_Y: 1,
    SHADOW_BLUR: 2,
    FILL_STYLE: ''
  },
  [BLOCK_STATE.QUESTION_MARK_ICON]: {
    ICON: game_utils['QUESTION_MARK_ICON'],
    FONT: `bold ${fontSize}px Verdana`,
    FONT_SIZE: fontSize,
    SHADOW_COLOR: "#fff",
    SHADOW_OFFSET_Y: 0,
    SHADOW_BLUR: 5,
    FILL_STYLE: '#427518'
  },
}