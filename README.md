# Tic Tac Toe Game

A browser-based implementation of a customizable Tic Tac Toe game with n×n grid size and k-in-a-row winning condition.

## Features

- Customizable grid size (n×n)
- Adjustable winning condition (k-in-a-row)
- Game state saved in localStorage between sessions
- Score tracking for multiple games
- Responsive design for different devices
- Optimized winning check algorithm

## How to Play

1. Choose your grid size (n) and winning condition (k) in the settings
2. Players take turns clicking on empty squares to place their marks (X or O)
3. The first player to get k of their marks in a row (horizontally, vertically, or diagonally) wins
4. If all squares are filled and no player has won, the game is a draw
5. Click "Reset Game" to start over with the same settings
6. Use "Reset Scores" to clear the score history

## Technical Details

The game uses a modular architecture with separate components:

- `gameLogic.js`: Core game mechanics and win detection
- `ui.js`: User interface management and event handling
- `storage.js`: Local storage functionality for saving/loading game state
- `app.js`: Main application initialization

### Win Detection Algorithm

Instead of checking the entire board after each move, the game uses an optimized algorithm that only checks from the position of the last move in all four directions (horizontal, vertical, and both diagonals).

## Accessibility

The game includes ARIA labels and focuses on accessibility by providing:

- Clear visual feedback for current player
- Highlight of the last move made
- Well-contrasted colors
- Responsive design for all devices
