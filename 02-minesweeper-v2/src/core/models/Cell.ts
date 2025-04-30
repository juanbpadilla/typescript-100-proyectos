export interface Cell {
  value: number | 'M'; // 'M' for mine, or number of adjacent mines
  state: 'covered' | 'flagged' | 'questioned' | 'uncovered';
  hasMine: boolean;
  adjacentMines: number;
}