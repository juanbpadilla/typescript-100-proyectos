import { board } from "../board"
import { ctx } from "../components/board"
import { dimensions, fontSize, max, min } from "../utils"

const half = dimensions.block_size/2

export function draw() {
  
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
        if (col.state === 0) {
          ctx.fillStyle = '#63B3FF'
          drawRoundedRect(ctx, boardX + min, boardY + min, max, max, min*2)
        } else if (col.state === 1) {
          ctx.fillStyle = '#F7D237'
          drawRoundedRect(ctx, boardX + min, boardY + min, max, max, min*2)
          ctx.font = `${fontSize*0.8}px system-ui`;
          ctx.textAlign = "center";
          ctx.shadowColor = "#000";
          ctx.shadowOffsetY = 1;
          ctx.shadowBlur = 2;
          // ctx.fillStyle = '#18B6D6'
          ctx.fillText('🚩', boardX + half, boardY + fontSize*0.9 + min);
        } else {
          ctx.fillStyle = '#91C952'
          drawRoundedRect(ctx, boardX + min, boardY + min, max, max, min*2)
          ctx.font = `bold ${fontSize}px Verdana`;
          ctx.textAlign = "center";
          ctx.shadowColor = "#fff";
          ctx.shadowBlur = 5;
          ctx.fillStyle = '#427518'
          ctx.fillText('?', boardX + half, boardY + fontSize + min);
        }
        ctx.shadowColor = "transparent";
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
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