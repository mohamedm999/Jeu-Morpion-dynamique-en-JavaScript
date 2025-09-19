document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const gameBoard = document.querySelector(".game");
    const settingsForm = document.getElementById("settings-form");
    const resetButton = document.getElementById("reset");
    const resetScoresButton = document.getElementById("reset-scores");
    const currentPlayerDisplay = document.getElementById("current-player");
    
    // Game state variables
    let activePlayer = "X";
    let gameState = [];
    let gameOver = false;
    let boardSize = 3;
    let winningLength = 3;
    let scores = {
        X: 0,
        O: 0,
        draw: 0
    };

    // Load scores from localStorage if available
    loadScoresFromLocalStorage();
   
    
    function initGame() {
        // Get initial settings from form
        boardSize = parseInt(document.getElementById("grid-size").value);
        winningLength = parseInt(document.getElementById("win-length").value);
        
        // Validate win length against board size
        if (winningLength > boardSize) {
            winningLength = boardSize;
            document.getElementById("win-length").value = boardSize;
        }
        
        // Reset game state
        activePlayer = "X";
        gameOver = false;
        currentPlayerDisplay.textContent = `Current player: ${activePlayer}`;
        
        // Create the game board
        createGameBoard();
        
        // Update score display
        updateScoreDisplay();
    }

    // Functions for localStorage
    function saveScoresToLocalStorage() {
        localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
    }

    function loadScoresFromLocalStorage() {
        const savedScores = localStorage.getItem('ticTacToeScores');
        if (savedScores) {
            scores = JSON.parse(savedScores);
        }
    }

    function createGameBoard() {
        // Clear previous game board
        gameBoard.innerHTML = "";
        
        // Set grid layout based on board size
        gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
        
        // Initialize empty game state array
        gameState = Array(boardSize * boardSize).fill("");
        
        // Create cells for the game board
        for (let cellIndex = 0; cellIndex < boardSize * boardSize; cellIndex++) {
            const gameCell = document.createElement("input");
            gameCell.classList.add("cell");
            gameCell.type = "text";
            gameCell.dataset.index = cellIndex;
            gameCell.readOnly = true;
            gameCell.addEventListener("click", onCellClick);
            gameBoard.appendChild(gameCell);
        }
    }

    function onCellClick(event) {
        const clickedCell = event.target;
        if (clickedCell.value === "" && !gameOver) {
            const cellIndex = parseInt(clickedCell.dataset.index);
            
            // Update UI and game state
            clickedCell.value = activePlayer;
            gameState[cellIndex] = activePlayer;
            
            // Check for win or draw
            if (checkWinner(cellIndex)) {
                handleGameEnd(`${activePlayer} wins! 🎉`);
                scores[activePlayer]++;
                updateScoreDisplay();
                saveScoresToLocalStorage(); // Save scores when updated
                return;
            }
            
            // Check for draw
            if (gameState.every(cell => cell !== "")) {
                handleGameEnd("It's a draw! 🤝");
                scores.draw++;
                updateScoreDisplay();
                saveScoresToLocalStorage(); // Save scores when updated
                return;
            }
            
            // Switch to next player
            activePlayer = activePlayer === "X" ? "O" : "X";
            currentPlayerDisplay.textContent = `Current player: ${activePlayer}`;
        }
    }
    
    function handleGameEnd(message) {
        gameOver = true;
        // Display message in the current player element
        currentPlayerDisplay.textContent = message;
    }
    
    function updateScoreDisplay() {
        document.getElementById("player-x-score").textContent = `Player X: ${scores.X}`;
        document.getElementById("player-o-score").textContent = `Player O: ${scores.O}`;
        document.getElementById("draw-score").textContent = `Draws: ${scores.draw}`;
    }

    function checkWinner(lastMoveIndex) {
        const row = Math.floor(lastMoveIndex / boardSize);
        const col = lastMoveIndex % boardSize;
        const player = gameState[lastMoveIndex];
        
        // Check all four directions from the last move
        return (
            checkDirection(player, row, col, 0, 1) || // Horizontal
            checkDirection(player, row, col, 1, 0) || // Vertical
            checkDirection(player, row, col, 1, 1) || // Diagonal (top-left to bottom-right)
            checkDirection(player, row, col, 1, -1)   // Diagonal (top-right to bottom-left)
        );
    }

    function checkDirection(player, startRow, startCol, rowDir, colDir) {
        let count = 1;  // Start with 1 for the current position
        
        // Check in the positive direction
        for (let i = 1; i < winningLength; i++) {
            const checkRow = startRow + i * rowDir;
            const checkCol = startCol + i * colDir;
            
            if (checkRow >= 0 && checkRow < boardSize && 
                checkCol >= 0 && checkCol < boardSize && 
                gameState[checkRow * boardSize + checkCol] === player) {
                count++;
            } else {
                break; // Stop if we hit a different mark or edge
            }
        }
        
        // Check in the negative direction
        for (let i = 1; i < winningLength; i++) {
            const checkRow = startRow - i * rowDir;
            const checkCol = startCol - i * colDir;
            
            if (checkRow >= 0 && checkRow < boardSize && 
                checkCol >= 0 && checkCol < boardSize && 
                gameState[checkRow * boardSize + checkCol] === player) {
                count++;
            } else {
                break; // Stop if we hit a different mark or edge
            }
        }
        
        return count >= winningLength;
    }
    
    // Event listeners
    settingsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        initGame();
    });
    
    resetButton.addEventListener("click", () => {
        initGame();
    });
    
    resetScoresButton.addEventListener("click", () => {
        scores = { X: 0, O: 0, draw: 0 };
        saveScoresToLocalStorage(); // Save scores when reset
        updateScoreDisplay();
        initGame();
    });
});