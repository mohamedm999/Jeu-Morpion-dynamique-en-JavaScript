# UI Functions Documentation

This file documents all functions in `ui.js` - user interface management and DOM manipulation.

## UI Class

### Constructor

#### `constructor(gameLogic)`

Initializes a new UI instance with GameLogic dependency.

**Parameters:**
- `gameLogic` (GameLogic): Instance of the GameLogic class for game state management

**Return Value:** `UI` instance

**Example:**
```javascript
const ui = new UI(gameLogicInstance);
```

### Board Management

#### `createGameBoard()`

Dynamically creates the game board grid based on current board size.

**Parameters:** None

**Return Value:** `void`

**Description:**
- Clears existing board content
- Creates grid with boardSize × boardSize cells
- Sets up CSS grid layout
- Attaches click event listeners to each cell
- Assigns unique index to each cell

**Example:**
```javascript
ui.createGameBoard(); // Creates new board with current settings
```

### Event Handling

#### `onCellClick(event)`

Handles click events on game board cells.

**Parameters:**
- `event` (Event): The click event object

**Return Value:** `void`

**Description:**
- Extracts cell index from clicked element
- Calls GameLogic to process the move
- Prevents interaction with non-cell elements

**Example:**
```javascript
// Called automatically when a cell is clicked
// No direct calling needed - attached as event listener
```

#### `applySettings(event)`

Processes settings form submission and applies new game configuration.

**Parameters:**
- `event` (Event): The form submit event

**Return Value:** `void`

**Description:**
- Prevents default form submission
- Extracts board size and winning length from form
- Validates input ranges (3-15)
- Updates GameLogic settings if valid
- Creates new game board with new settings
- Shows validation errors if inputs are invalid

**Example:**
```javascript
// Called when settings form is submitted
// Attached as event listener to settings form
```

### Display Updates

#### `updateDisplay()`

Updates all UI elements to reflect current game state.

**Parameters:** None

**Return Value:** `void`

**Description:**
- Updates board cells with current symbols
- Refreshes current player indicator
- Updates game status message
- Refreshes score display
- Shows winner message if game is finished

**Example:**
```javascript
ui.updateDisplay(); // Called after each move or state change
```

#### `updateCurrentPlayerDisplay()`

Updates the current player indicator in the UI.

**Parameters:** None

**Return Value:** `void`

**Description:**
- Shows which player's turn it is
- Updates the "Current Player" text element

**Example:**
```javascript
ui.updateCurrentPlayerDisplay(); // Updates player turn indicator
```

#### `updateGameStatusDisplay()`

Updates the game status message based on current game state.

**Parameters:** None

**Return Value:** `void`

**Description:**
- Shows "Game in progress" for active games
- Shows winner announcement when game is finished
- Updates the game status text element

**Example:**
```javascript
ui.updateGameStatusDisplay(); // Updates status message
```

#### `updateScoreDisplay()`

Updates the score display for both players.

**Parameters:** None

**Return Value:** `void`

**Description:**
- Shows current scores for Player X and Player O
- Updates score text elements in the UI

**Example:**
```javascript
ui.updateScoreDisplay(); // Refreshes score counters
```

### Game Controls

#### `resetGame()`

Resets the current game while keeping scores and settings.

**Parameters:** None

**Return Value:** `void`

**Description:**
- Calls GameLogic to initialize new game state
- Updates display to reflect reset state
- Keeps current board size and winning length settings

**Example:**
```javascript
ui.resetGame(); // Start new game with same settings
```

#### `resetScores()`

Clears all saved scores and resets to zero.

**Parameters:** None

**Return Value:** `void`

**Description:**
- Resets scores to {X: 0, O: 0}
- Saves cleared scores to localStorage
- Updates score display

**Example:**
```javascript
ui.resetScores(); // Clear all scores
```

### Initialization

#### `initialize()`

Sets up initial UI state and event listeners.

**Parameters:** None

**Return Value:** `void`

**Description:**
- Creates initial game board
- Sets up event listeners for buttons and forms
- Calls initial display update

**Example:**
```javascript
ui.initialize(); // Called once during app initialization
```

## DOM Element References

The UI class works with the following HTML elements:

| Element ID | Purpose |
|------------|---------|
| `game-board` | Container for game grid |
| `current-player` | Shows current player turn |
| `game-status` | Shows game status messages |
| `score-x` | Displays Player X score |
| `score-o` | Displays Player O score |
| `reset-game-btn` | Button to reset current game |
| `reset-scores-btn` | Button to clear all scores |
| `settings-form` | Form for game settings |
| `board-size` | Input for board size |
| `winning-length` | Input for winning length |

## Event Listeners

| Event | Element | Handler | Description |
|-------|---------|---------|-------------|
| `click` | Game board cells | `onCellClick` | Process player moves |
| `click` | Reset game button | `resetGame` | Start new game |
| `click` | Reset scores button | `resetScores` | Clear scores |
| `submit` | Settings form | `applySettings` | Apply new settings |

## CSS Classes Used

- `game-board` - Grid container styling
- `cell` - Individual cell styling
- `cell.taken` - Styling for occupied cells
