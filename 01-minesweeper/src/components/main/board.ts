import { dimensions } from "../../utils"





export const canvas: HTMLCanvasElement = document.createElement('canvas')
// canvas.setAttribute('id', 'background-layer')
export const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

canvas.width = dimensions.block_size * dimensions.board_width
canvas.height = dimensions.block_size * dimensions.board_height
// ctx.scale(dimensions.block_size, dimensions.block_size)
// app.setAttribute('style', `width: ${canvas.width}px; height: ${canvas.height}px`)

// export const gameLayer: HTMLCanvasElement = document.createElement('canvas')
// gameLayer.setAttribute('id', 'game-layer')
// export const gameLayerCtx: CanvasRenderingContext2D = gameLayer.getContext('2d')!

// gameLayer.width = dimensions.block_size * dimensions.board_width
// gameLayer.height = dimensions.block_size * dimensions.board_height

// app.appendChild(canvas)
// app.appendChild(gameLayer)