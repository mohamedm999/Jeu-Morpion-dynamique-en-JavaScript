# Storage Functions Documentation

This file documents all functions in `storage.js` - data persistence and localStorage utilities.

## Storage Class

### Constructor

#### `constructor()`

Initializes a new Storage instance for localStorage operations.

**Parameters:** None

**Return Value:** `Storage` instance

**Example:**
```javascript
const storage = new Storage();
```

### Score Management

#### `saveScoresToLocalStorage(scores)`

Saves player scores to browser's localStorage.

**Parameters:**
- `scores` (object): Score object with X and O properties
  - `scores.X` (number): Player X score
  - `scores.O` (number): Player O score

**Return Value:** `void`

**Description:**
- Converts scores object to JSON string
- Stores in localStorage under key 'ticTacToeScores'
- Handles storage errors gracefully

**Example:**
```javascript
const scores = { X: 3, O: 2 };
storage.saveScoresToLocalStorage(scores);
```

#### `loadScoresFromLocalStorage()`

Retrieves saved scores from localStorage.

**Parameters:** None

**Return Value:** `object` - Scores object with X and O properties, or default {X: 0, O: 0}

**Description:**
- Retrieves JSON string from localStorage
- Parses JSON to object
- Returns default scores if no saved data exists
- Handles parsing errors gracefully

**Example:**
```javascript
const savedScores = storage.loadScoresFromLocalStorage();
console.log(`X: ${savedScores.X}, O: ${savedScores.O}`);
```

### Game State Management

#### `saveGameStateToLocalStorage(gameState)`

Saves current game state to localStorage for game persistence.

**Parameters:**
- `gameState` (object): Complete game state object
  - `gameState.board` (Array): Current board state
  - `gameState.currentPlayer` (string): Current player ('X' or 'O')
  - `gameState.gameFinished` (boolean): Game completion status
  - `gameState.boardSize` (number): Board dimensions
  - `gameState.winningLength` (number): Win condition length
  - `gameState.scores` (object): Current scores

**Return Value:** `void`

**Description:**
- Converts complete game state to JSON
- Stores in localStorage under key 'ticTacToeGameState'
- Enables game resumption after browser reload

**Example:**
```javascript
const gameState = {
    board: ['X', 'O', '', 'X', '', '', '', '', ''],
    currentPlayer: 'O',
    gameFinished: false,
    boardSize: 3,
    winningLength: 3,
    scores: { X: 1, O: 0 }
};
storage.saveGameStateToLocalStorage(gameState);
```

#### `loadGameStateFromLocalStorage()`

Retrieves saved game state from localStorage.

**Parameters:** None

**Return Value:** `object|null` - Game state object if exists, `null` if no saved state

**Description:**
- Retrieves game state JSON from localStorage
- Parses JSON to object
- Returns null if no saved state exists
- Handles parsing errors gracefully

**Example:**
```javascript
const savedState = storage.loadGameStateFromLocalStorage();
if (savedState) {
    console.log('Resuming saved game');
    // Restore game state
} else {
    console.log('Starting new game');
}
```

### Data Management

#### `clearAllStoredData()`

Removes all game-related data from localStorage.

**Parameters:** None

**Return Value:** `void`

**Description:**
- Removes scores from localStorage
- Removes saved game state from localStorage
- Effectively resets all persistent data

**Example:**
```javascript
storage.clearAllStoredData(); // Clear all saved data
```

#### `hasStoredScores()`

Checks if scores are saved in localStorage.

**Parameters:** None

**Return Value:** `boolean` - `true` if scores exist, `false` otherwise

**Example:**
```javascript
if (storage.hasStoredScores()) {
    console.log('Found saved scores');
}
```

#### `hasStoredGameState()`

Checks if game state is saved in localStorage.

**Parameters:** None

**Return Value:** `boolean` - `true` if game state exists, `false` otherwise

**Example:**
```javascript
if (storage.hasStoredGameState()) {
    console.log('Found saved game state');
}
```

## Storage Keys

The Storage class uses the following localStorage keys:

| Key | Purpose | Data Type |
|-----|---------|-----------|
| `ticTacToeScores` | Player scores | JSON string |
| `ticTacToeGameState` | Complete game state | JSON string |

## Error Handling

All storage functions include error handling for:

- **Storage not available**: When localStorage is disabled
- **Storage quota exceeded**: When storage limit is reached
- **JSON parsing errors**: When saved data is corrupted
- **Access denied**: When localStorage access is blocked

**Example Error Handling:**
```javascript
try {
    storage.saveScoresToLocalStorage(scores);
} catch (error) {
    console.warn('Could not save scores:', error.message);
    // Application continues without saving
}
```

## Browser Compatibility

- ✅ All modern browsers support localStorage
- ✅ Graceful degradation when localStorage is unavailable
- ✅ No errors thrown when storage fails

## Data Persistence Lifecycle

1. **Game Start**: Load existing scores and game state
2. **During Game**: Save game state after significant moves (optional)
3. **Game End**: Save updated scores
4. **Settings Change**: Clear saved game state (new game starts)
5. **Manual Reset**: Clear scores or all data as requested

## Privacy Considerations

- Data is stored locally in user's browser only
- No external servers or tracking
- User can clear data through browser settings
- Data persists until manually cleared or browser data is reset
