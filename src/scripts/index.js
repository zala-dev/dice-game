/* Constant */

//the total number of rounds in the game
const TOTAL_ROUNDS = 3;

/* Model */
//the model of the game, containing various game state properties.
const model = {
  // Intial state of the game model
  activePlayer: "player",
  playerCurrentScore: 0,
  playerRoundWon: 0,
  computerCurrentScore: 0,
  computerRoundWon: 0,
  currentRoundNumber: 1,
};

/* View */
// the view of the game, including DOM elements and UI update functions.
const view = {
  // DOM elements used in the game / UI variables
  gameRulesScreen: document.querySelector(".game-rules"),
  gameInstructionBeginBtn: document.querySelector(".btn-begin"),
  currentScoreContainer: document.querySelectorAll(".current-score"),
  playerRoundWinScoreEl: document.querySelector(".player-win-score"),
  playerScoreEl: document.querySelector(".player-current-score"),
  playerContainer: document.querySelector(".player-container"),
  computerRoundWinScoreEl: document.querySelector(".computer-win-score"),
  computerScoreEl: document.querySelector(".computer-current-score"),
  computerContainer: document.querySelector(".computer-container"),
  roundNumberEl: document.querySelector(".round-number"),
  roundNumberContainer: document.querySelector(".round-display"),
  newGameBtn: document.querySelector(".btn-new"),
  diceContainer: document.querySelector(".dice-container"),
  dice1El: document.querySelector(".dice-1"),
  dice2El: document.querySelector(".dice-2"),
  rollDiceBtn: document.querySelector(".btn-roll"),
  winnerEl: document.querySelector(".winner"),
  playerCurrentTurnEl: document.querySelector(
    ".player-container .current-turn"
  ),
  computerCurrentTurnEl: document.querySelector(
    ".computer-container .current-turn"
  ),
  curentTurnEl: document.querySelector(".current-turn"),
  // Function to update the round number displayed on the UI
  updateRoundNumber: (round) => {
    view.roundNumberEl.textContent = round;
  },
  // Function to update the player's current score displayed on the UI
  updatePlayerCurrentScore: (playerScore = 0) => {
    view.playerScoreEl.textContent = playerScore;
  },
  // Function to update the computer's current score displayed on the UI
  updateComputerCurrentScore: (computerScore = 0) => {
    view.computerScoreEl.textContent = computerScore;
  },
  // Function to update the number of rounds won by the player displayed on the UI
  updatePlayerRoundWon: (playerRoundWon = 0) => {
    view.playerRoundWinScoreEl.textContent = playerRoundWon;
  },
  // Function to update the computer's round won by the computer displayed on the UI.
  updateComputerRoundWon: (computerRoundWon = 0) => {
    view.computerRoundWinScoreEl.textContent = computerRoundWon;
  },
  // Function to render the current turn, highlighting the active player's turn on the UI.
  renderCurrentTurn: (player) => {
    const playerEl = view.playerCurrentTurnEl;
    const computerEl = view.computerCurrentTurnEl;

    if (!playerEl || !computerEl) {
      return;
    }
    // check if current player
    if (player === "player") {
      if (playerEl && playerEl.classList.contains("current-turn")) {
        playerEl.classList.add("player");
        computerEl.classList.remove("computer");
        return;
      }
    }

    // check if current computer
    if (player === "computer") {
      if (computerEl && computerEl.classList.contains("current-turn")) {
        computerEl.classList.add("computer");
        playerEl.classList.remove("player");
        return;
      }
    }
  },
  // Function to render the dice rolls on the UI
  renderDice: (dice1, dice2) => {
    if (dice1 && dice2) {
      view.dice1El.src = `/assets/images/dice-${dice1}.png`;
      view.dice2El.src = `/assets/images/dice-${dice2}.png`;

      view.dice1El.classList.toggle("hidden");
      view.dice2El.classList.toggle("hidden");
    }
  },
  // Function to render the winner of the game on the UI
  renderWinner: (winner) => {
    // hide score UI
    // hide current turn UI
    view.curentTurnEl.style.visibility = "hidden";

    // hide dice images
    view.diceContainer.style.visibility = "hidden";

    // delay hide score
    setTimeout(() => {
      view.currentScoreContainer.forEach(
        (el) => (el.style.visibility = "hidden")
      );
    }, 2000);

    // check the winner and update UI
    if (winner === "player") {
      view.winnerEl.classList.add("player");
      view.roundNumberContainer.innerHTML =
        "<h2 class='round-text'>Player Won</h2>";
    } else {
      view.winnerEl.classList.add("computer");
      view.roundNumberContainer.innerHTML =
        "<h2 class='round-text'>Computer Won</h2>";
    }
  },
};

/* Controller */
// the controller of the game, handling game logic and interactions
function controller() {
  // Function to initialize the game state and UI
  const init = () => {
    // Initialize game state
    model.activePlayer;
    model.currentRoundNumber;
    model.playerCurrentScore;
    model.computerCurrentScore;
    model.playerRoundWon;
    model.computerRoundWon;

    // Update UI
    view.gameRulesScreen.classList.toggle("hide");
    view.updateRoundNumber(model.currentRoundNumber);
    view.updatePlayerCurrentScore();
    view.updateComputerCurrentScore();
    view.updatePlayerRoundWon();
    view.updateComputerRoundWon();
    view.renderCurrentTurn(model.activePlayer);
    view.rollDiceBtn.removeAttribute("disabled");
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
        view.renderCurrentTurn(model.activePlayer);
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
    }, 1000);
  };

  // Function to roll a single dice
  const rollSingleDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  // Function to roll two dice and ensure they are different
  const rollTwoDice = () => {
    let dice1 = rollSingleDice();
    let dice2 = rollSingleDice();

    if (dice1 === dice2) {
      dice2 = rollSingleDice();
    }

    return [dice1, dice2];
  };

  // Function to get the maximum combination of two dice
  const getMaxCombination = (dice1, dice2) => {
    const combination1 = dice1.toString() + dice2.toString();
    const combination2 = dice2.toString() + dice1.toString();

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
      view.rollDiceBtn.setAttribute("disabled", true);
      if (model.playerRoundWon > model.computerRoundWon) {
        view.renderWinner("player");
      } else {
        view.renderWinner("computer");
      }
    }
  };

  // Function to roll the dice and update scores accordingly and check for winner
  const rollDice = () => {
    const [dice1, dice2] = rollTwoDice();
    const maximum = getMaxCombination(dice1, dice2);

    view.renderDice(dice1, dice2);
    updateScoreActivePlayer(maximum);
    switchPlayer();

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

  return { init, startGame, rollDice };
}

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
view.newGameBtn.addEventListener("click", () => location.reload());
