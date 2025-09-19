# Game Logic Functions Documentation

This file documents all functions in `gameLogic.js` - the core game mechanics.

## GameLogic Class

### Constructor

#### `constructor(ui, storage)`

Initializes a new GameLogic instance with UI and Storage dependencies.

**Parameters:**
- `ui` (UI): Instance of the UI class for display updates
- `storage` (Storage): Instance of the Storage class for data persistence

**Return Value:** `GameLogic` instance

**Example:**
```javascript
const gameLogic = new GameLogic(uiInstance, storageInstance);
```

### Game State Management

#### `initializeGameState()`

Resets the game to its initial state with empty board and default settings.

**Parameters:** None

**Return Value:** `void`

**Description:**
- Resets board array to empty state
- Sets current player to 'X'
- Marks game as not finished
- Resets current winner to null

**Example:**
```javascript
gameLogic.initializeGameState();
```

### Player Moves

#### `makeMove(cellIndex)`

Processes a player's move if the cell is empty and game is active.

**Parameters:**
- `cellIndex` (number): Index of the cell to place the symbol (0 to boardSize²-1)

**Return Value:** `boolean` - `true` if move was successful, `false` otherwise

**Description:**
- Validates if the cell is empty and game is not finished
- Places current player's symbol in the specified cell
- Checks for win condition after the move
- Switches to the next player if game continues
- Updates UI display

**Example:**
```javascript
const moveSuccessful = gameLogic.makeMove(4); // Place symbol in center of 3x3 board
if (moveSuccessful) {
    console.log('Move placed successfully');
}
```

#### `switchPlayer()`

Switches the current player between 'X' and 'O'.

**Parameters:** None

**Return Value:** `void`

**Example:**
```javascript
gameLogic.switchPlayer(); // X becomes O, or O becomes X
```

### Win Detection

#### `checkWinner(lastMoveIndex)`

Checks if the last move resulted in a winning condition.

**Parameters:**
- `lastMoveIndex` (number): Index of the last placed symbol

**Return Value:** `boolean` - `true` if a winner is found, `false` otherwise

**Description:**
- Checks horizontal, vertical, and diagonal lines through the last move
- Uses the current winning length setting
- Sets game as finished if winner is found
- Updates scores if game is won

**Example:**
```javascript
const hasWinner = gameLogic.checkWinner(4);
if (hasWinner) {
    console.log(`Player ${gameLogic.currentWinner} wins!`);
}
```

#### `checkDirection(row, col, deltaRow, deltaCol, player)`

Checks for consecutive symbols in a specific direction from a given position.

**Parameters:**
- `row` (number): Starting row position
- `col` (number): Starting column position
- `deltaRow` (number): Row direction (-1, 0, or 1)
- `deltaCol` (number): Column direction (-1, 0, or 1)
- `player` (string): Player symbol to check for ('X' or 'O')

**Return Value:** `number` - Count of consecutive symbols in the direction

**Example:**
```javascript
const consecutiveCount = gameLogic.checkDirection(1, 1, 0, 1, 'X'); // Check horizontal right from (1,1)
```

### Utility Functions

#### `getCellValue(row, col)`

Gets the symbol at a specific board position.

**Parameters:**
- `row` (number): Row index (0 to boardSize-1)
- `col` (number): Column index (0 to boardSize-1)

**Return Value:** `string` - Symbol at the position ('X', 'O', or empty string)

**Example:**
```javascript
const symbol = gameLogic.getCellValue(1, 2); // Get symbol at row 1, column 2
```

#### `indexToPosition(index)`

Converts a linear cell index to row/column coordinates.

**Parameters:**
- `index` (number): Linear index (0 to boardSize²-1)

**Return Value:** `object` - Object with `row` and `col` properties

**Example:**
```javascript
const position = gameLogic.indexToPosition(4); // Returns {row: 1, col: 1} for 3x3 board
```

### Settings Management

#### `updateSettings(boardSize, winningLength)`

Updates game settings and validates the new configuration.

**Parameters:**
- `boardSize` (number): New board size (3-15)
- `winningLength` (number): New winning length (3-15)

**Return Value:** `boolean` - `true` if settings are valid and applied, `false` otherwise

**Description:**
- Validates that winning length doesn't exceed board size
- Updates internal settings if valid
- Reinitializes game state with new settings

**Example:**
```javascript
const settingsApplied = gameLogic.updateSettings(5, 4); // 5x5 board, 4 in a row to win
```

### Score Management

#### `updateScores()`

Updates the score for the current winner and saves to storage.

**Parameters:** None

**Return Value:** `void`

**Description:**
- Increments score for the winning player
- Saves updated scores to localStorage via Storage class

**Example:**
```javascript
gameLogic.updateScores(); // Called automatically when game is won
```

## State Properties

| Property | Type | Description |
|----------|------|-------------|
| `board` | Array | Current game board state |
| `currentPlayer` | string | Current player ('X' or 'O') |
| `gameFinished` | boolean | Whether the game has ended |
| `currentWinner` | string | Winner of current game |
| `boardSize` | number | Current board dimensions |
| `winningLength` | number | Symbols needed in a row to win |
| `scores` | object | Player scores {X: number, O: number} |
