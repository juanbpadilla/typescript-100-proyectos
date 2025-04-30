import { Cell } from "../models/Cell";

export class Minesweeper {
  rows: number;
  cols: number;
  totalMines: number;
  board: Cell[][];
  isGameOver: boolean;
  isVictory: boolean;

  constructor(rows: number, cols: number, totalMines: number) {
    this.rows = rows;
    this.cols = cols;
    this.totalMines = totalMines;
    this.board = this.createBoard();
    this.placeMines();
    this.calculateAdjacentMines();
    this.isGameOver = false;
    this.isVictory = false;
  }

  private createBoard(): Cell[][] {
    const board: Cell[][] = [];

    for (let row = 0; row < this.rows; row++) {
      const newRow: Cell[] = [];
      for (let col = 0; col < this.cols; col++) {
        newRow.push({
          value: 0,
          hasMine: false,
          adjacentMines: 0,
          state: "covered",
        });
      }
      board.push(newRow);
    }

    return board;
  }

  private shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private placeMines(): void {
    const positions: [number, number][] = [];
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            positions.push([i, j]);
        }
    }

    const shuffled = this.shuffle(positions);
    const mines = shuffled.slice(0, this.totalMines);

    mines.forEach(([row, col]) => {
        this.board[row][col].value = 'M';
        this.board[row][col].hasMine = true;
    });

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [ 0, -1],          [ 0, 1],
        [ 1, -1], [ 1, 0], [ 1, 1]
    ];

    mines.forEach(([row, col]) => {
      for (const [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;
          if (
              this.isValidPosition(newRow, newCol) &&
              this.board[newRow][newCol].value !== 'M'
          ) {
              this.board[newRow][newCol].value = (this.board[newRow][newCol].value as number) + 1;
          }
      }
    });

    // let minesPlaced = 0;

    // while (minesPlaced < this.totalMines) {
    //   const row = Math.floor(Math.random() * this.rows);
    //   const col = Math.floor(Math.random() * this.cols);

    //   if (!this.board[row][col].hasMine) {
    //     this.board[row][col].hasMine = true;
    //     minesPlaced++;
    //   }
    // }
  }

  private calculateAdjacentMines(): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col].hasMine) continue;

        let count = 0;
        this.forEachNeighbor(row, col, (neighbor) => {
          if (neighbor.hasMine) count++;
        });
        this.board[row][col].adjacentMines = count;
      }
    }
  }

  private forEachNeighbor(row: number, col: number, callback: (cell: Cell, row?: number, col?: number) => void): void {
    for (let dRow = -1; dRow <= 1; dRow++) {
      for (let dCol = -1; dCol <= 1; dCol++) {
        if (dRow === 0 && dCol === 0) continue; // no incluir la propia celda
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (this.isValidPosition(newRow, newCol)) {
          callback(this.board[newRow][newCol], newRow, newCol);
        }
      }
    }
  }

  private isValidPosition(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  /**
   * Descubre una celda.
   */
  uncoverCell(row: number, col: number): void {
    if (!this.isValidPosition(row, col) || this.isGameOver) return;
    const cell = this.board[row][col];

    if (cell.state !== "covered") return; // Solo podemos descubrir celdas cubiertas

    cell.state = "uncovered";

    if (cell.hasMine) {
      // Aquí podrías manejar la lógica de "Game Over"
      this.isGameOver = true;
      this.revealAllMines();
      console.log("💥 Game Over!");
      return;
    } else if (cell.adjacentMines === 0) {
      // Descubrir en cascada
      this.forEachNeighbor(row, col, (neighbor, nRow, nCol) => {
        // const nRow = this.board.indexOf(neighbor);
        // const nCol = neighbor ? neighbor.adjacentMines : -1;
        if (neighbor && neighbor.state === "covered") {
          this.uncoverCell(nRow!, nCol!);  // NOTA: este lookup hay que mejorarlo (te lo corrijo abajo)
        }
      });
    }

    this.checkVictory();
  }

  /**
   * Alterna la bandera o signo de pregunta en una celda.
   */
  toggleFlag(row: number, col: number): void {
    if (!this.isValidPosition(row, col)) return;
    const cell = this.board[row][col];

    if (cell.state === "covered") {
      cell.state = "flagged";
    } else if (cell.state === "flagged") {
      cell.state = "questioned";
    } else if (cell.state === "questioned") {
      cell.state = "covered";
    }
  }

  private revealAllMines(): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.board[row][col];
        if (cell.hasMine) {
          cell.state = "uncovered";
        }
      }
    }
  }
  
  private checkVictory(): void {
    let uncoveredCount = 0;
  
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.board[row][col];
        if (cell.state === "uncovered" && !cell.hasMine) {
          uncoveredCount++;
        }
      }
    }
  
    const totalSafeCells = this.rows * this.cols - this.totalMines;
  
    if (uncoveredCount === totalSafeCells) {
      this.isVictory = true;
      this.isGameOver = true;
      console.log("🎉 You Win!");
      this.revealAllMines(); // opcional: mostrar todas las minas al ganar
    }
  }
  
}