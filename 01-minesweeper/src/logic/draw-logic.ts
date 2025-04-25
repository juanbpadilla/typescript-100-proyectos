import { board } from "../board"
import { ctx, gameLayerCtx } from "../components/board"
import { dimensions, fontSize, max, min } from "../utils"

const half = dimensions.block_size/2

export function draw() {
  // ctx.fillStyle = 'red'
  // ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  // ctx.font = "50px serif";
  // ctx.fillStyle = '#000'
  // ctx.fillText("Hello world", 50, 90, 140);
  
  board.forEach((row, y) => {
    const boardY = y*dimensions.block_size
    row.forEach((col,x) => {
      const value = col.content
      const boardX = x*dimensions.block_size
      if (col.isVisible) {
        ctx.fillStyle = '#fff'
        
        drawRoundedRect(ctx, boardX + min, boardY + min, max, max, min*2)
        if (value !== 0) {
          if (typeof value !== "number") {ctx.fillStyle = '#000'}
          else if (value === 1) {ctx.fillStyle = '#18B6D6'}
          else if (value === 2) {ctx.fillStyle = '#789F19'}
          else if (value === 3) {ctx.fillStyle = '#C7185F'}
          else {ctx.fillStyle = '#1851B5'}
          ctx.font = `bold ${fontSize}px system-ui`;
          ctx.textAlign = "center";
          ctx.shadowColor = "#000";
          ctx.shadowOffsetY = 1;
          ctx.shadowBlur = 2;
          // ctx.fillStyle = '#18B6D6'
          ctx.fillText(value.toString(), boardX + half, boardY + fontSize + min);
        }
        // Restablecer las sombras después de fillText
        ctx.shadowColor = "transparent";
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = '#63B3FF'
        
        drawRoundedRect(ctx, boardX + min, boardY + min, max, max, min*2)
      }
    })
  })
}

export function layer_draw() {
  board.forEach((row, y) => {
    const boardY = y*dimensions.block_size
    row.forEach((col,x) => {
      // const value = col.content
      if (!col.isVisible) {
        const boardX = x*dimensions.block_size
        gameLayerCtx.fillStyle = '#63B3FF'
        
        drawRoundedRect(gameLayerCtx, boardX + min, boardY + min, max, max, min*2)
        // if (value !== 0) {
        //   if (typeof value !== "number") {gameLayerCtx.fillStyle = '#000'}
        //   else if (value === 1) {gameLayerCtx.fillStyle = '#18B6D6'}
        //   else if (value === 2) {gameLayerCtx.fillStyle = '#789F19'}
        //   else if (value === 3) {gameLayerCtx.fillStyle = '#C7185F'}
        //   else {gameLayerCtx.fillStyle = '#1851B5'}
        //   gameLayerCtx.font = `bold ${fontSize}px system-ui`;
        //   gameLayerCtx.textAlign = "center";
        //   gameLayerCtx.shadowColor = "#000";
        //   gameLayerCtx.shadowOffsetY = 1;
        //   gameLayerCtx.shadowBlur = 2;
        //   // gameLayerCtx.fillStyle = '#18B6D6'
        //   gameLayerCtx.fillText(value.toString(), boardX + half, boardY + fontSize + min);
        // }
        // gameLayerCtx.shadowColor = "transparent";
        // gameLayerCtx.shadowOffsetY = 0;
        // gameLayerCtx.shadowBlur = 0;
      }
    })
  })
}

function drawRoundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.arcTo(x + width, y, x + width, y + radius, radius);
  context.lineTo(x + width, y + height - radius);
  context.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  context.lineTo(x + radius, y + height);
  context.arcTo(x, y + height, x, y + height - radius, radius);
  context.lineTo(x, y + radius);
  context.arcTo(x, y, x + radius, y, radius);
  context.closePath();
  context.fill();
  // context.stroke();
}