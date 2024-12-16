// SudokuCell.tsx
import React from 'react';

interface SudokuCellProps {
  value: number | null;
  isConflicting: boolean;
  onValueChange: (newValue: number | null) => void;
  editable: boolean;
}

const SudokuCell: React.FC<SudokuCellProps> = ({ value, isConflicting, onValueChange, editable }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newValue = inputValue === '' ? null : parseInt(inputValue, 10);
    if (newValue === null || (newValue >= 1 && newValue <= 9)) {
      onValueChange(newValue);
    }
  };

  return (
    <input
      type="text"
      value={value ?? ''}
      onChange={handleChange}
      disabled={!editable}
      className={`sudoku-cell ${isConflicting ? 'conflicting' : ''}`}
    />
  );
};

export default SudokuCell;
