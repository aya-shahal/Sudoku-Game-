import React from 'react';
import './App.css';
import SudokuBoard from './components/SudokuBoard';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <SudokuBoard />
    </div>
  );
};

export default App;
