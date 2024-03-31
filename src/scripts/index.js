/*
 Event listeners
 */

//DOMContentLoaded event for initialising the game
document.addEventListener("DOMContentLoaded", controller().init);

// Click event for the game instructions begin button to start the game
view.gameInstructionBeginBtn.addEventListener("click", controller().startGame);

// Click event for the roll dice button to trigger dice rolling
view.rollDiceBtn.addEventListener("click", controller().rollDice);

// Click event for the new game button to trigger new game
view.newGameBtn.addEventListener("click", controller().newGame);
