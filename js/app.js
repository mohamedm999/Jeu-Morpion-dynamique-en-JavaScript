document.addEventListener("DOMContentLoaded", () => {
    
    const gameLogic = new GameLogic();
    
  
    const ui = new UI(gameLogic);
    

    ui.createGameBoard();
});