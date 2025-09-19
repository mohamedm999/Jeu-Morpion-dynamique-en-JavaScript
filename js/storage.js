class Storage {
    static saveScoresToLocalStorage(scores) {
        localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
    }

    static loadScoresFromLocalStorage() {
        const savedScores = localStorage.getItem('ticTacToeScores');
        return savedScores ? JSON.parse(savedScores) : { X: 0, O: 0, draw: 0 };
    }

    static saveGameStateToLocalStorage(gameState) {
        localStorage.setItem('ticTacToeGameState', JSON.stringify(gameState));
    }

    static loadGameStateFromLocalStorage() {
        const savedState = localStorage.getItem('ticTacToeGameState');
        return savedState ? JSON.parse(savedState) : null;
    }

    static clearGameStateFromLocalStorage() {
        localStorage.removeItem('ticTacToeGameState');
    }
}