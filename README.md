# Sudoku Game

A Sudoku puzzle game built using React and TypeScript. This project includes functionality for generating, solving, and validating Sudoku boards, with adjustable difficulty levels. The user interface is designed for an interactive experience, allowing players to solve puzzles with the ability to check solutions and get hints.

## Features

- **Sudoku Puzzle Generation**: Generate random puzzles with varying difficulty levels (easy, medium, hard).
- **Puzzle Validation**: Check if the current state of the puzzle is valid.
- **Hints and Solution**: Get a hint for the next step or automatically solve the puzzle.
- **Difficulty Levels**: Choose between easy, medium, or hard difficulty settings.
  
## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and clarity.
- **CSS**: For basic styling (or CSS framework, if used).
- **Custom Sudoku Algorithm**: For puzzle generation and solving.

## Approach

1. **Initial Setup**:
   - Started by setting up a React app using `create-react-app` with TypeScript.
   - Implemented the basic structure of the Sudoku board with cells and editable values.
  
2. **Sudoku Puzzle Generation**:
   - Developed a function to generate a complete valid Sudoku board.
   - Implemented a random removal of cells to create the puzzle for different difficulty levels.
  
3. **Solving Algorithm**:
   - Created a backtracking algorithm to solve the puzzle programmatically.
   - Implemented a check to validate board states to ensure correctness during gameplay.

4. **User Interface**:
   - Designed an interactive board where users can input values and get feedback on conflicts.
   - Added buttons for features like checking the solution, providing hints, and solving the puzzle.

5. **Validation & Error Handling**:
   - Implemented real-time validation to highlight conflicts when the user inputs incorrect values.
   - Used a `validateBoard` function to check for row, column, and 3x3 box conflicts.

## Challenges Encountered

- **Difficulty Levels**: Balancing the difficulty levels was challenging. I had to adjust the number of cells removed based on the desired difficulty, while ensuring that the puzzle remained solvable.
- **Backtracking Algorithm**: Implementing the solving algorithm was tricky, especially when considering efficiency and avoiding unnecessary recursion.


## Solutions Implemented

- **Puzzle Generation Optimization**: Used a recursive backtracking approach to generate a complete board and remove cells strategically for each difficulty level.



