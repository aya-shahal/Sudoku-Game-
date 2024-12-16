import React, { useState, useEffect } from "react";
import SudokuCell from "./SudokuCell";
import { generateCompleteBoard, removeCells, Cell } from "./sudokuGenerator";
import { validateBoard } from "./validateBoard";

const SudokuBoard: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>(generateCompleteBoard());
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");

  // Use useEffect to generate the puzzle for the initial "easy" level
  useEffect(() => {
    generatePuzzle("easy");
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleValueChange = (
    row: number,
    col: number,
    newValue: number | null
  ) => {
    const updatedBoard = board.map((r: Cell[], rowIndex: number) =>
      r.map((cell: Cell, colIndex: number) => {
        if (rowIndex === row && colIndex === col) {
          return { ...cell, value: newValue };
        }
        return cell;
      })
    );
    const validationResult = validateBoard(updatedBoard);
    setBoard(validationResult.board);
  };

  const checkSolution = () => {
    const validationResult = validateBoard(board);
    setBoard(validationResult.board);

    const isComplete = board.every((row) =>
      row.every((cell) => cell.value !== null && !cell.isConflicting)
    );

    if (isComplete) {
      alert(
        "🎉 Congratulations! You've successfully completed the Sudoku puzzle! 🎉"
      );
    } else if (validationResult.errorMessage) {
      alert(validationResult.errorMessage);
    } else {
      alert("The board isn't complete yet or has errors. Keep going!");
    }
  };

  const generatePuzzle = (level: "easy" | "medium" | "hard") => {
    const completeBoard = generateCompleteBoard();
    const puzzleBoard = removeCells(completeBoard, level);
    setBoard(puzzleBoard);
  };

  const handleDifficultyChange = (
    newDifficulty: "easy" | "medium" | "hard"
  ) => {
    setDifficulty(newDifficulty);
    generatePuzzle(newDifficulty);
  };

  const solveBoard = () => {
    const solvedBoard = solveSudoku(board);
    setBoard(solvedBoard);
  };

  const solveSudoku = (board: Cell[][]): Cell[][] => {
    const newBoard = JSON.parse(JSON.stringify(board));
    const b = newBoard.map((row: Cell[]) =>
      row.map((cell: Cell) => (cell.value === null ? 0 : cell.value))
    );

    const solve = (b: number[][]): boolean => {
      const emptyCell = findEmptyCell(b);
      if (!emptyCell) return true;
      const [row, col] = emptyCell;

      for (let num = 1; num <= 9; num++) {
        if (isValid(b, row, col, num)) {
          b[row][col] = num;
          if (solve(b)) return true;
          b[row][col] = 0;
        }
      }
      return false;
    };

    if (solve(b)) {
      return newBoard.map((row: Cell[], rIdx: number) =>
        row.map((cell: Cell, cIdx: number) => ({
          ...cell,
          value: b[rIdx][cIdx] !== 0 ? b[rIdx][cIdx] : null,
        }))
      );
    }

    return board;
  };

  const findEmptyCell = (board: number[][]): [number, number] | null => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  };

  const isValid = (
    board: number[][],
    row: number,
    col: number,
    num: number
  ): boolean => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
    }
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  };

  const provideHint = () => {
    const hintBoard: Cell[][] = board.map((row) =>
      row.map((cell) => ({ ...cell })))
    ;

    const emptyCell = findEmptyCell(
      hintBoard.map((row) =>
        row.map((cell) => (cell.value === null ? 0 : cell.value)))
    );

    if (emptyCell) {
      const [row, col] = emptyCell;
      const solvedBoard = solveSudokuForSingleCell(board, row, col);
      const hintValue = solvedBoard[row][col].value;
      hintBoard[row][col] = { ...hintBoard[row][col], value: hintValue };
      setBoard(hintBoard);
    }
  };

  const solveSudokuForSingleCell = (
    board: Cell[][],
    row: number,
    col: number
  ): Cell[][] => {
    const newBoard: number[][] = board.map((row) =>
      row.map((cell) => (cell.value === null ? 0 : cell.value))
    );

    const solve = (b: number[][], row: number, col: number): boolean => {
      for (let num = 1; num <= 9; num++) {
        if (isValid(b, row, col, num)) {
          b[row][col] = num;
          return true;
        }
      }
      return false;
    };

    if (solve(newBoard, row, col)) {
      return newBoard.map((row, rIdx) =>
        row.map((cellValue, cIdx) => ({
          ...board[rIdx][cIdx],
          value: cellValue !== 0 ? cellValue : null,
        }))
      );
    }

    return board;
  };

  return (
    <div>
      <div className="sudoku-board">
        {board.map((row: Cell[], rowIndex: number) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell: Cell, colIndex: number) => (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cell.value}
                isConflicting={cell.isConflicting}
                onValueChange={(newValue) =>
                  handleValueChange(rowIndex, colIndex, newValue)
                }
                editable={cell.editable}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="difficulty-buttons">
        <button onClick={() => handleDifficultyChange("easy")}>Easy</button>
        <button onClick={() => handleDifficultyChange("medium")}>Medium</button>
        <button onClick={() => handleDifficultyChange("hard")}>Hard</button>
        <button onClick={provideHint}>Hint</button>
        <button onClick={solveBoard}>Solve</button>
        <button onClick={checkSolution}>Check Solution</button>
      </div>
    </div>
  );
};

export default SudokuBoard;
