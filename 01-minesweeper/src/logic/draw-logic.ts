import { board } from "../board"
import { ctx } from "../components/main/board"
import { COLORS, dimensions, FILTERS_BUTTONS, fontSize, game_state, game_utils, max, min } from "../utils"

const half = dimensions.block_size/2

export function draw() {
  // console.log('se dibuja')

  

  board.forEach((row, y) => {
    const boardY = y*dimensions.block_size
    row.forEach((col,x) => {
      const value = col.content
      const boardX = x*dimensions.block_size
      if (col.isVisible) {
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

        ctx.font = FILTERS_BUTTONS[col.state].FONT;
        ctx.textAlign = "center";
        ctx.shadowColor = FILTERS_BUTTONS[col.state].SHADOW_COLOR;
        ctx.shadowOffsetY = FILTERS_BUTTONS[col.state].SHADOW_OFFSET_Y;
        ctx.shadowBlur = FILTERS_BUTTONS[col.state].SHADOW_BLUR;
        ctx.fillStyle = FILTERS_BUTTONS[col.state].FILL_STYLE
        ctx.fillText(FILTERS_BUTTONS[col.state].ICON, boardX + half, boardY + FILTERS_BUTTONS[col.state].FONT_SIZE + min);
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