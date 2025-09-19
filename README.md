# Tic-Tac-Toe Game

A modern, responsive tic-tac-toe game built with vanilla JavaScript, HTML, and CSS. Features customizable board sizes, winning conditions, and persistent score tracking.

## Features

- **Customizable Board Size**: Play on grids from 3x3 up to 15x15
- **Variable Win Conditions**: Set custom winning length (k-in-a-row)
- **Persistent Scoring**: Scores are saved using localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Dynamic player turn indicators and game status
- **Reset Options**: Reset individual games or clear all scores

## Live Demo

[Play the game here](your-demo-link)

## Technologies Used

- **HTML5**: Semantic markup and form controls
- **CSS3**: Grid layout, flexbox, and responsive design
- **Vanilla JavaScript**: ES6 classes and modern JavaScript features
- **LocalStorage**: Client-side data persistence

## Project Structure

```
tic-tac-toe/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Stylesheet
├── js/
│   ├── app.js          # Application entry point
│   ├── gameLogic.js    # Game mechanics and logic
│   ├── ui.js           # User interface management
│   └── storage.js      # LocalStorage utilities
└── README.md           # Project documentation
```

## Architecture

### Modular Design

The application follows a modular architecture with separated concerns:

#### `app.js` - Application Entry Point
- Initializes the game when DOM is loaded
- Creates instances of GameLogic and UI classes
- Sets up the initial game board

#### `gameLogic.js` - Game Mechanics
- **GameLogic Class**: Core game functionality
  - Board state management
  - Player turn handling
  - Win condition checking
  - Score tracking
  - Settings validation

#### `ui.js` - User Interface
- **UI Class**: DOM manipulation and event handling
  - Dynamic board generation
  - Event listeners for user interactions
  - Display updates and visual feedback
  - Form handling for game settings

#### `storage.js` - Data Persistence
- **Storage Class**: LocalStorage operations
  - Save/load game scores
  - Save/load game state
  - Clear stored data

## 📚 Function Documentation

Detailed documentation for all functions is available in the [`docs/`](./docs/) folder:

- **[Complete Function Reference](./docs/index.md)** - Overview of all documented functions
- **[App Functions](./docs/app.md)** - Application initialization and entry point
- **[Game Logic Functions](./docs/gameLogic.md)** - Core game mechanics and business logic  
- **[UI Functions](./docs/ui.md)** - User interface management and DOM manipulation
- **[Storage Functions](./docs/storage.md)** - Data persistence and localStorage utilities

### Quick Function Reference

| Function | Class | Description |
|----------|-------|-------------|
| `makeMove(cellIndex)` | GameLogic | Process player moves and update game state |
| `checkWinner(lastMoveIndex)` | GameLogic | Detect winning conditions |
| `updateSettings(boardSize, winningLength)` | GameLogic | Apply new game settings |
| `createGameBoard()` | UI | Generate dynamic game grid |
| `updateDisplay()` | UI | Refresh UI elements |
| `saveScoresToLocalStorage(scores)` | Storage | Persist game scores |

## Game Rules

1. **Objective**: Be the first player to get k symbols in a row (horizontally, vertically, or diagonally)
2. **Default Settings**: 3x3 board with 3-in-a-row to win
3. **Customization**: Adjust board size (n×n) and winning length (k)
4. **Validation**: Winning length cannot exceed board size
5. **Turn System**: Players alternate between X and O

## Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Open in browser**
   - Double-click `index.html`, or
   - Use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the game**
   - Direct file: `file:///path/to/tic-tac-toe/index.html`
   - Local server: `http://localhost:8000`

## Usage

### Basic Gameplay
1. Click any empty cell to place your symbol (X or O)
2. Players alternate turns automatically
3. First to achieve the winning pattern wins
4. Scores are tracked and persist between sessions

### Customizing Game Settings
1. Use the settings panel on the right
2. Adjust **Grid Size** (3-15) for board dimensions
3. Set **Win Length** (3-15) for symbols needed to win
4. Click **Apply Settings** to start a new game with new rules

### Game Controls
- **Reset Game**: Start a new game with current settings
- **Reset Scores**: Clear all saved scores and start fresh

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

### Code Style
- Use ES6+ JavaScript features
- Follow consistent naming conventions
- Maintain modular architecture
- Add comments for complex logic

### Testing
- Test on multiple browsers
- Verify responsive design on different screen sizes
- Test edge cases (maximum board size, various win conditions)

## Future Enhancements

- [ ] AI opponent with difficulty levels
- [ ] Online multiplayer support
- [ ] Game replay/history feature
- [ ] Custom themes and animations
- [ ] Tournament mode
- [ ] Mobile app version

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the classic tic-tac-toe game
- Built as a learning project for modern JavaScript development
- Thanks to the web development community for best practices and inspiration

---

**Enjoy playing! 🎮**
