class UI {
    constructor(gameLogic) {
        this.gameLogic = gameLogic;
        this.gameBoard = document.querySelector(".game");
        this.settingsForm = document.getElementById("settings-form");
        this.resetButton = document.getElementById("reset");
        this.resetScoresButton = document.getElementById("reset-scores");
        this.currentPlayerDisplay = document.getElementById("current-player");
        this.gridSizeInput = document.getElementById("grid-size");
        this.winLengthInput = document.getElementById("win-length");
        
        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        this.settingsForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.applySettings();
        });
        
        this.resetButton.addEventListener("click", () => {
            this.resetGame();
        });
        
        this.resetScoresButton.addEventListener("click", () => {
            this.resetScores();
        });
    }

    applySettings() {
        const boardSize = parseInt(this.gridSizeInput.value);
        const winningLength = parseInt(this.winLengthInput.value);
        
        const validatedWinLength = this.gameLogic.updateSettings(boardSize, winningLength);
        
      
        if (validatedWinLength !== winningLength) {
            this.winLengthInput.value = validatedWinLength;
        }
        
        this.createGameBoard();
        this.updateDisplay();
    }

    createGameBoard() {
     
        this.gameBoard.innerHTML = "";
        
     
        this.gameBoard.style.gridTemplateColumns = `repeat(${this.gameLogic.boardSize}, 1fr)`;
        this.gameBoard.style.gridTemplateRows = `repeat(${this.gameLogic.boardSize}, 1fr)`;
        
 
        for (let cellIndex = 0; cellIndex < this.gameLogic.boardSize * this.gameLogic.boardSize; cellIndex++) {
            const gameCell = document.createElement("input");
            gameCell.classList.add("cell");
            gameCell.type = "text";
            gameCell.dataset.index = cellIndex;
            gameCell.readOnly = true;
            gameCell.addEventListener("click", (event) => this.onCellClick(event));
            this.gameBoard.appendChild(gameCell);
        }
    }

    onCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.dataset.index);
        
        const result = this.gameLogic.makeMove(cellIndex);
        
        if (result) {
           
            clickedCell.value = this.gameLogic.gameState[cellIndex];
            
            if (result.gameEnd) {
                this.handleGameEnd(result);
            }
            
            this.updateDisplay();
        }
    }

    handleGameEnd(result) {
        let message;
        if (result.winner) {
            message = `${result.winner} wins! 🎉`;
        } else if (result.isDraw) {
            message = "It's a draw! 🤝";
        }
        
        this.currentPlayerDisplay.textContent = message;
    }

    updateDisplay() {
      
        if (!this.gameLogic.isGameOver()) {
            this.currentPlayerDisplay.textContent = `Current player: ${this.gameLogic.getCurrentPlayer()}`;
        }
  
        this.updateScoreDisplay();
    }

    updateScoreDisplay() {
        const scores = this.gameLogic.getScores();
        document.getElementById("player-x-score").textContent = `Player X: ${scores.X}`;
        document.getElementById("player-o-score").textContent = `Player O: ${scores.O}`;
        document.getElementById("draw-score").textContent = `Draws: ${scores.draw}`;
    }

    resetGame() {
        this.gameLogic.initializeGameState();
        this.createGameBoard();
        this.updateDisplay();
    }

    resetScores() {
        this.gameLogic.resetScores();
        this.updateScoreDisplay();
        this.resetGame();
    }
}