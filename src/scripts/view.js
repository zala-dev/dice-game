/* View */
// the view of the game, including DOM elements and UI update functions.
const view = {
  // DOM elements used in the game / UI variables
  gameRulesScreen: document.querySelector(".game-rules"),
  gameInstructionBeginBtn: document.querySelector(".btn-begin"),
  currentScoreEls: document.querySelectorAll(".current-score"),
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
  currentTurnEl: document.querySelector(".current-turn"),

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

    if (player === "player") {
      if (playerEl && playerEl.classList.contains("current-turn")) {
        playerEl.classList.add("player");
        computerEl.classList.remove("computer");
        return;
      }
    }

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
    view.dice1El.classList.remove("hidden");
    view.dice2El.classList.remove("hidden");
    if (dice1 && dice2) {
      view.dice1El.src = `assets/images/dice-${dice1}.png`;
      view.dice2El.src = `assets/images/dice-${dice2}.png`;
    }
  },

  // Function to render the winner of the game on the UI
  renderWinner: (winner) => {
    // hide player turn UI
    view.currentTurnEl.classList.remove("player");

    // hide dice images
    view.diceContainer.style.visibility = "hidden";

    // hide roll btn
    view.rollDiceBtn.style.visibility = "hidden";

    // hide current round number display
    view.roundNumberContainer.style.visibility = "hidden";

    // delay hide score
    setTimeout(() => {
      view.currentScoreEls.forEach((el) => (el.style.visibility = "hidden"));
    }, 2000);

    // check the winner and update UI
    if (winner === "player") {
      view.winnerEl.classList.add("player");
    } else {
      view.winnerEl.classList.add("computer");
    }
  },
};
