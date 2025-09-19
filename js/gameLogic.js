class GameLogic {
    constructor(boardSize = 3, winningLength = 3) {
        this.boardSize = boardSize;
        this.winningLength = winningLength;
        this.gameState = [];
        this.activePlayer = "X";
        this.gameOver = false;
        this.scores = Storage.loadScoresFromLocalStorage();
        this.initializeGameState();
    }

    initializeGameState() {
        this.gameState = Array(this.boardSize * this.boardSize).fill("");
        this.activePlayer = "X";
        this.gameOver = false;
    }

    validateSettings(boardSize, winningLength) {
        if (winningLength > boardSize) {
            return boardSize;
        }
        return winningLength;
    }

    updateSettings(boardSize, winningLength) {
        this.boardSize = boardSize;
        this.winningLength = this.validateSettings(boardSize, winningLength);
        this.initializeGameState();
        return this.winningLength;
    }

    makeMove(cellIndex) {
        if (this.gameState[cellIndex] === "" && !this.gameOver) {
            this.gameState[cellIndex] = this.activePlayer;
            
            const result = this.checkGameEnd(cellIndex);
            if (result.gameEnd) {
                this.gameOver = true;
                if (result.winner) {
                    this.scores[this.activePlayer]++;
                } else {
                    this.scores.draw++;
                }
                Storage.saveScoresToLocalStorage(this.scores);
                return result;
            }
            
            this.switchPlayer();
            return { gameEnd: false, winner: null, isDraw: false };
        }
        return null;
    }

    switchPlayer() {
        this.activePlayer = this.activePlayer === "X" ? "O" : "X";
    }

    checkGameEnd(lastMoveIndex) {
        if (this.checkWinner(lastMoveIndex)) {
            return { gameEnd: true, winner: this.activePlayer, isDraw: false };
        }
        
        if (this.gameState.every(cell => cell !== "")) {
            return { gameEnd: true, winner: null, isDraw: true };
        }
        
        return { gameEnd: false, winner: null, isDraw: false };
    }

    checkWinner(lastMoveIndex) {
        const row = Math.floor(lastMoveIndex / this.boardSize);
        const col = lastMoveIndex % this.boardSize;
        const player = this.gameState[lastMoveIndex];
        
        return (
            this.checkDirection(player, row, col, 0, 1) || 
            this.checkDirection(player, row, col, 1, 0) || 
            this.checkDirection(player, row, col, 1, 1) || 
            this.checkDirection(player, row, col, 1, -1)   
        );
    }

    checkDirection(player, startRow, startCol, rowDir, colDir) {
        let count = 1;
        
        
        for (let i = 1; i < this.winningLength; i++) {
            const checkRow = startRow + i * rowDir;
            const checkCol = startCol + i * colDir;
            
            if (checkRow >= 0 && checkRow < this.boardSize && 
                checkCol >= 0 && checkCol < this.boardSize && 
                this.gameState[checkRow * this.boardSize + checkCol] === player) {
                count++;
            } else {
                break;
            }
        }
        
   
        for (let i = 1; i < this.winningLength; i++) {
            const checkRow = startRow - i * rowDir;
            const checkCol = startCol - i * colDir;
            
            if (checkRow >= 0 && checkRow < this.boardSize && 
                checkCol >= 0 && checkCol < this.boardSize && 
                this.gameState[checkRow * this.boardSize + checkCol] === player) {
                count++;
            } else {
                break;
            }
        }
        
        return count >= this.winningLength;
    }

    resetScores() {
        this.scores = { X: 0, O: 0, draw: 0 };
        Storage.saveScoresToLocalStorage(this.scores);
    }

    getScores() {
        return this.scores;
    }

    getCurrentPlayer() {
        return this.activePlayer;
    }

    isGameOver() {
        return this.gameOver;
    }
}