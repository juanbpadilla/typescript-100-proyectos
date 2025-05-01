import { boardConfig } from "../core/services/config";
import { Minesweeper } from "../core/services/Minesweeper";

export function calculateDimension(game: Minesweeper) {
  const root = document.querySelector(':root') as HTMLElement;
  // const root = document.querySelector('html');
  if (!root) return;

  const maxWidth = window.innerWidth * boardConfig.maxWidthRatio;
  const maxHeight = window.innerHeight * boardConfig.maxHeightRatio;

  const blockWidth = Math.floor(maxWidth / game.cols);
  const blockHeight = Math.floor(maxHeight / game.rows);
  
  // Elegimos el más pequeño y lo limitamos entre min y max
  const calcultedSize = Math.min(blockWidth, blockHeight);
  console.log('\ncalcultedSize: ' + calcultedSize)
  boardConfig.blockSize = Math.max(
    boardConfig.minBlockSize,
    Math.min(calcultedSize, boardConfig.maxBlockSize)
  );
  console.log('blockSize: ' + boardConfig.blockSize)

  const fontSize = Math.round(boardConfig.blockSize * boardConfig.fontScale)
  const borderRadius = Math.round(boardConfig.blockSize * 0.1)
  root.style.setProperty('--fontSize', `${fontSize}px`);
  root.style.setProperty('--border-radius', `${borderRadius}px`);
  // const rs = getComputedStyle(root)
  // console.log("The value of --fontSize is: " + rs.getPropertyValue('--fontSize'))
  // console.log("The value of --border-radius is: " + rs.getPropertyValue('--border-radius'))
}