import { Minesweeper } from './core/services/Minesweeper';
import './style.css'
import { renderBoard } from './ui/board';

const rows = 10;
const cols = 10;
const mines = 20;

const game = new Minesweeper(rows, cols, mines);
renderBoard(game);
