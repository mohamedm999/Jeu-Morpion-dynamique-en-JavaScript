document.addEventListener("DOMContentLoaded", () => {
 
    const gameBoard = document.querySelector(".game");
    let boardSize = document.getElementById("grid-size").value;
    let winningLength = document.getElementById("win-length").value;
    const settingsForm = document.getElementById("settings-form");
    let activePlayer = "X";

    function createGameBoard(boardSize, winningLength) {
        gameBoard.innerHTML = "";
        gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

        for(let cellIndex = 0; cellIndex < boardSize * boardSize; cellIndex++) {
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
        if(clickedCell.value === "") {
            clickedCell.value = activePlayer;
            activePlayer = activePlayer === "X" ? "O" : "X";
            document.getElementById("current-player").textContent = `Current Player: ${activePlayer}`;
        }
    }

    settingsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        createGameBoard(boardSize, winningLength);
    }); 
});