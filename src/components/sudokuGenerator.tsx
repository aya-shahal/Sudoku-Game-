
 export type Cell = {
    value: number | null;
    isConflicting: boolean;
    editable: boolean;
  };
  
  function isValid(board: number[][], row: number, col: number, num: number): boolean {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  }
  
  function fillBoard(board: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
          for (const num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) return true; 
              board[row][col] = 0; 
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  export function generateCompleteBoard(): Cell[][] {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillBoard(board);
    return board.map((row) =>
      row.map((value) => ({
        value,
        isConflicting: false,
        editable: false,
      }))
    );
  }
  

  function solveWithBacktracking(board: number[][], solutionsCount: { count: number }): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solveWithBacktracking(board, solutionsCount)) {
                solutionsCount.count++;
                if (solutionsCount.count > 1) {
                  board[row][col] = 0; 
                  return false;
                }
              }
              board[row][col] = 0; 
            }
          }
          return false; 
        }
      }
    }
    return true; 
  }
  
  function hasUniqueSolution(board: number[][]): boolean {
    const solutionsCount = { count: 0 };
    solveWithBacktracking(board, solutionsCount);
    return solutionsCount.count === 1;
  }
  
  export function removeCells(board: Cell[][], level: "easy" | "medium" | "hard"): Cell[][] {
    let cellsToRemove;
    switch (level) {
      case "easy":
        cellsToRemove = 36;
        break;
      case "medium":
        cellsToRemove = 45;
        break;
      case "hard":
        cellsToRemove = 54;
        break;
    }
  
    const newBoard = board.map((row) => row.map((cell) => ({ ...cell }))); 
  
    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
  
      if (newBoard[row][col].value !== null) {
        const backup = newBoard[row][col].value; 
        newBoard[row][col] = { value: null, isConflicting: false, editable: true }; 
        const boardToValidate = newBoard.map((row) => row.map((cell) => cell.value ?? 0));
  
        if (hasUniqueSolution(boardToValidate)) {
          cellsToRemove--;
        } else {
          newBoard[row][col] = { value: backup, isConflicting: false, editable: false };
        }
      }
    }
  
    return newBoard;
  }
  