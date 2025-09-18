document.addEventListener("DOMContentLoaded", () => {

    const gameBoard = document.querySelector(".game");
    const settingsForm = document.getElementById("settings-form");
    const resetButton = document.getElementById("reset");
    const resetScoresButton = document.getElementById("reset-scores");
    const currentPlayerDisplay = document.getElementById("current-player");
    
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
    
    function initGame() {
      
        boardSize = parseInt(document.getElementById("grid-size").value);
        winningLength = parseInt(document.getElementById("win-length").value);
        
    
        if (winningLength > boardSize) {
            winningLength = boardSize;
            document.getElementById("win-length").value = boardSize;
        }
        
      
        activePlayer = "X";
        gameOver = false;
        currentPlayerDisplay.textContent = `Current player: ${activePlayer}`;
        
  
        createGameBoard();
 
        updateScoreDisplay();
    }

    function createGameBoard() {
      
        gameBoard.innerHTML = "";
        
  
        gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
        
   
        gameState = Array(boardSize * boardSize).fill("");
        
  
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
            
          
            clickedCell.value = activePlayer;
            gameState[cellIndex] = activePlayer;
      
            if (checkWinner(cellIndex)) {
                handleGameEnd(`${activePlayer} wins! 🎉`);
                scores[activePlayer]++;
                updateScoreDisplay();
                return;
            }
       
            
            if (gameState.every(cell => cell !== "")) {
                handleGameEnd("It's a draw! 🤝");
                scores.draw++;
                updateScoreDisplay();
                return;
            }
            
      
            activePlayer = activePlayer === "X" ? "O" : "X";
            currentPlayerDisplay.textContent = `Current player: ${activePlayer}`;
        }
    }
    
    function handleGameEnd(message) {
        gameOver = true;
   
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

        return (
            checkDirection(player, row, col, 0, 1) ||
            checkDirection(player, row, col, 1, 0) ||
            checkDirection(player, row, col, 1, 1) || 
            checkDirection(player, row, col, 1, -1)   
        );
    }

    function checkDirection(player, startRow, startCol, rowDir, colDir) {
        let count = 1;  
        

        let streak = 0;
        for (let i = 1; i < winningLength; i++) {
            const checkRow = startRow + i * rowDir;
            const checkCol = startCol + i * colDir;
            
            if (checkRow >= 0 && checkRow < boardSize && 
                checkCol >= 0 && checkCol < boardSize && 
                gameState[checkRow * boardSize + checkCol] === player) {
                count++;
            } else {
                break; 
            }
        }
        

        for (let i = 1; i < winningLength; i++) {
            const checkRow = startRow - i * rowDir;
            const checkCol = startCol - i * colDir;
            
            if (checkRow >= 0 && checkRow < boardSize && 
                checkCol >= 0 && checkCol < boardSize && 
                gameState[checkRow * boardSize + checkCol] === player) {
                count++;
            } else {
                break; 
            }
        }
        
        return count >= winningLength;
    }

    settingsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        initGame();
    });
    
    resetButton.addEventListener("click", () => {
        initGame();
    });
    
    resetScoresButton.addEventListener("click", () => {
        scores = { X: 0, O: 0, draw: 0 };
        updateScoreDisplay();
        initGame();
    });
});