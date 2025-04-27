import { board } from "../board"
import { ctx } from "../components/main/board"
import { COLORS, dimensions, fontSize, game_state, game_utils, max, min } from "../utils"

const half = dimensions.block_size/2

export function draw() {
  // console.log('se dibuja')

  

  board.forEach((row, y) => {
    const boardY = y*dimensions.block_size
    row.forEach((col,x) => {
      const value = col.content
      const boardX = x*dimensions.block_size
      if (!col.isVisible) {
        ctx.fillStyle = col.isMine() ? '#313031' : '#fff'
        drawRoundedRect(ctx, boardX + min, boardY + min, max, max, min*2)
        
        if (value !== 0) {
          ctx.fillStyle = typeof value !== "number" ? '#000' : COLORS[value]
          ctx.font = `bold ${fontSize}px system-ui`;
          ctx.textAlign = "center";
          ctx.shadowColor = "#000";
          ctx.shadowOffsetY = 1;
          ctx.shadowBlur = 2;
          ctx.fillText(value.toString(), boardX + half, boardY + fontSize + min);
        }
      } else {
        ctx.fillStyle = game_utils.COLORS.STATE_BACKGROUND[col.state]
        drawRoundedRect(ctx, boardX + min, boardY + min, max, max, min*2)

        if (col.state === 1) {
          ctx.font = `${fontSize*0.8}px system-ui`;
          ctx.textAlign = "center";
          ctx.shadowColor = "#000";
          ctx.shadowOffsetY = 1;
          ctx.shadowBlur = 2;
          ctx.fillText(game_utils.FLAG_ICON, boardX + half, boardY + fontSize*0.9 + min);
        } else if (col.state > 1) {
          ctx.font = `bold ${fontSize}px Verdana`;
          ctx.textAlign = "center";
          ctx.shadowColor = "#fff";
          ctx.shadowBlur = 5;
          ctx.fillStyle = '#427518'
          ctx.fillText(game_utils.QUESTION_MARK_ICON, boardX + half, boardY + fontSize + min);
        }
      }
      ctx.shadowColor = "transparent";
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
    })
  })

  if (game_state.chances < 1) {
    game_state.chances--
  }
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
}