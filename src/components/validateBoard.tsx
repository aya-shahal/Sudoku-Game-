type SudokuCell = {
  value: number | null;
  isConflicting: boolean;
  editable: boolean;
};

type SudokuBoard = Array<Array<SudokuCell>>;

interface ValidationResult {
  board: SudokuBoard;
  errorMessage: string | null;
}

const markConflicts = (
  cells: Array<[number, number]>,
  newBoard: SudokuBoard
) => {
  cells.forEach(([row, col]) => {
    newBoard[row][col].isConflicting = true;
  });
};

// Main validation function
export const validateBoard = (board: SudokuBoard): ValidationResult => {
  let hasConflicts = false;
  const newBoard = board.map((row) =>
    row.map((cell) => ({ ...cell, isConflicting: false }))
  );

  for (let i = 0; i < 9; i++) {
    const rowValues = new Map<number, Array<[number, number]>>();
    const colValues = new Map<number, Array<[number, number]>>();

    for (let j = 0; j < 9; j++) {
      const rowValue = board[i][j].value;
      const colValue = board[j][i].value;

      if (rowValue !== null) {
        if (!rowValues.has(rowValue)) rowValues.set(rowValue, []);
        rowValues.get(rowValue)!.push([i, j]);
      }

      if (colValue !== null) {
        if (!colValues.has(colValue)) colValues.set(colValue, []);
        colValues.get(colValue)!.push([j, i]);
      }
    }

    rowValues.forEach((cells) => {
      if (cells.length > 1) {
        markConflicts(cells, newBoard);
        hasConflicts = true;
      }
    });
    colValues.forEach((cells) => {
      if (cells.length > 1) {
        markConflicts(cells, newBoard);
        hasConflicts = true;
      }
    });
  }

  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const boxValues = new Map<number, Array<[number, number]>>();

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const row = boxRow * 3 + i;
          const col = boxCol * 3 + j;
          const value = board[row][col].value;

          if (value !== null) {
            if (!boxValues.has(value)) boxValues.set(value, []);
            boxValues.get(value)!.push([row, col]);
          }
        }
      }
      boxValues.forEach((cells) => {
        if (cells.length > 1) {
          markConflicts(cells, newBoard);
          hasConflicts = true;
        }
      });
    }
  }
  const errorMessage = hasConflicts
    ? "Error: Conflicting values detected in the Sudoku board."
    : null;

  return {
    board: newBoard,
    errorMessage: errorMessage,
  };
};
