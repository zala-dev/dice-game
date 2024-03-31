/* Controller */
// the controller of the game, handling game logic and interactions
function controller() {
  // Function to initialize the game state and UI
  const init = () => {
    // Initialize game state
    initialiseGameState();

    // Reset / initiate game UI
    resetGameUI();
  };

  // Function to start a new game and reset all state
  const newGame = () => {
    // Reset game state
    resetGameState();

    // Reset game UI
    resetGameUI();
  };

  // Function to initialise game state
  const initialiseGameState = () => {
    model.activePlayer;
    model.currentRoundNumber;
    model.playerCurrentScore;
    model.computerCurrentScore;
    model.playerRoundWon;
    model.computerRoundWon;
  };

  // Function to reset game state
  const resetGameState = () => {
    model.activePlayer = "player";
    model.currentRoundNumber = 1;
    model.playerRoundWon = 0;
    model.playerCurrentScore = 0;
    model.computerCurrentScore = 0;
    model.computerRoundWon = 0;
  };

  // function to reset / initiate game UI
  const resetGameUI = () => {
    view.gameRulesScreen.classList.toggle("hide");
    view.updateRoundNumber(model.currentRoundNumber);
    view.rollDiceBtn.removeAttribute("disabled");
    view.roundNumberContainer.style.visibility = "visible";
    view.diceContainer.style.visibility = "visible";
    view.rollDiceBtn.style.visibility = "visible";
    view.currentScoreEls.forEach((el) => (el.style.visibility = "visible"));
    view.winnerEl.classList.remove("player");
    view.winnerEl.classList.remove("computer");
    view.dice1El.classList.add("hidden");
    view.dice2El.classList.add("hidden");
    view.renderCurrentTurn(model.activePlayer);
    view.updatePlayerCurrentScore();
    view.updateComputerCurrentScore();
    view.updatePlayerRoundWon();
    view.updateComputerRoundWon();
  };

  // Function to start the game by displaying game instructions
  const startGame = () => {
    view.gameRulesScreen.classList.toggle("hide");
  };
  // Function to switch the active player nd triggers dice rolling on computer's turn
  const switchPlayer = () => {
    model.activePlayer =
      model.activePlayer === "player" ? "computer" : "player";

    view.renderCurrentTurn(model.activePlayer);

    if (model.activePlayer === "computer") {
      setTimeout(() => {
        rollDice();
        model.activePlayer = "player";
      }, 2000);
    }
  };
  // Function to reset the player and computer scores
  const resetScores = () => {
    model.playerCurrentScore = 0;
    model.computerCurrentScore = 0;
    view.updatePlayerCurrentScore();
    view.updateComputerCurrentScore();
  };

  // Function to reset scores with delay of 1 sec
  const resetScoreWithDelay = () => {
    setTimeout(() => {
      resetScores();
      view.dice1El.classList.toggle("hidden");
      view.dice2El.classList.toggle("hidden");
      view.rollDiceBtn.removeAttribute("disabled");
      view.newGameBtn.removeAttribute("disabled");
    }, 2000);
  };

  // Function to roll a single dice
  const rollSingleDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  // Function to roll two dice and ensure they are different
  const rollTwoDice = () => {
    let dice1 = rollSingleDice();
    let dice2 = rollSingleDice();

    while (dice1 === dice2) {
      dice2 = rollSingleDice();
    }

    return [dice1, dice2];
  };

  // Function to get the maximum combination of two dice
  const getMaxCombination = (dice1, dice2) => {
    const combination1 = dice1.toString() + dice2.toString();
    let combination2 = dice2.toString() + dice1.toString();

    if (combination2 === combination1) {
      combination2 += "0";
    }

    return combination1 > combination2 ? combination1 : combination2;
  };

  // Function to update the score based on the active player
  const updateScoreActivePlayer = (maximum) => {
    if (model.activePlayer === "player") {
      view.updatePlayerCurrentScore(maximum);
      model.playerCurrentScore = maximum;
    } else {
      view.updateComputerCurrentScore(maximum);
      model.computerCurrentScore = maximum;
    }
  };

  // Function to check winner of each round
  const checkRoundWinner = () => {
    if (model.playerCurrentScore > model.computerCurrentScore) {
      model.playerRoundWon++;
      view.updatePlayerRoundWon(model.playerRoundWon);
    } else if (model.computerCurrentScore > model.playerCurrentScore) {
      model.computerRoundWon++;
      view.updateComputerRoundWon(model.computerRoundWon);
    }
  };

  // Function to check winner of the game
  const checkGameWinner = () => {
    if (model.currentRoundNumber > TOTAL_ROUNDS) {
      if (model.playerRoundWon > model.computerRoundWon) {
        view.renderWinner("player");
      } else {
        view.renderWinner("computer");
      }
    }
  };

  // Function to roll the dice and update scores accordingly and check for winner
  const rollDice = () => {
    // Rolls two dice on the UI
    const [dice1, dice2] = rollTwoDice();
    const maximum = getMaxCombination(dice1, dice2);

    // Renders the dice on the UI
    view.renderDice(dice1, dice2);

    // Updates the score of the active player based on the maximum combination
    updateScoreActivePlayer(maximum);

    // Switches the active player
    switchPlayer();

    // Disable dice and new game btn until dice roll for both players is complete
    view.rollDiceBtn.setAttribute("disabled", true);
    view.newGameBtn.setAttribute("disabled", true);

    // Checks for a round winner, reset scores with delay, updates round number, and check for the game winner
    if (model.playerCurrentScore > 0 && model.computerCurrentScore > 0) {
      checkRoundWinner();
      resetScoreWithDelay();

      if (model.currentRoundNumber <= TOTAL_ROUNDS) {
        model.currentRoundNumber++;
        view.updateRoundNumber(model.currentRoundNumber);
      }

      checkGameWinner();
    }
  };

  return { init, startGame, rollDice, newGame };
}
