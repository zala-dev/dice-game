/* Model */
const model = {
  // Intial state of the game model
  activePlayer: "player",
  playerCurrentScore: 0,
  playerRoundWon: 0,
  computerCurrentScore: 0,
  computerRoundWon: 0,
  currentRoundNumber: 1,
  totalRound: 3,
};

/* View */
const view = {
  // DOM elements used in the game / UI variables
  gameRulesScreen: document.querySelector(".game-rules"),
  gameInstructionBeginBtn: document.querySelector(".btn-begin"),
  playerRoundWinScoreEl: document.querySelector(".player-win-score"),
  playerScoreEl: document.querySelector(".player-current-score"),
  playerContainer: document.querySelector(".player-container"),
  computerRoundWinScoreEl: document.querySelector(".computer-win-score"),
  computerScoreEl: document.querySelector(".computer-current-score"),
  computerContainer: document.querySelector(".computer-container"),
  roundNumberEl: document.querySelector(".round-number"),
  newGameBtn: document.querySelector(".btn-new"),
  dice1El: document.querySelector(".dice-1"),
  dice2El: document.querySelector(".dice-2"),
  rollDiceBtn: document.querySelector(".btn-roll"),
  winnerEl: document.querySelector(".winner"),
  playerCurrentTurn: document.querySelector(".player-container .current-turn"),
  computerCurrentTurn: document.querySelector(
    ".computer-container .current-turn"
  ),
  updateRoundNumber: (round) => {
    view.roundNumberEl.textContent = round;
  },

  updatePlayerCurrentScore: (playerScore = 0) => {
    view.playerScoreEl.textContent = playerScore;
  },

  updateComputerCurrentScore: (computerScore = 0) => {
    view.computerScoreEl.textContent = computerScore;
  },

  updatePlayerRoundWon: (playerRoundWon = 0) => {
    view.playerRoundWinScoreEl.textContent = playerRoundWon;
  },

  updateComputerRoundWon: (computerRoundWon = 0) => {
    view.computerRoundWinScoreEl.textContent = computerRoundWon;
  },

  renderCurrentTurn: (player) => {
    const playerEl = view.playerCurrentTurn;
    const computerEl = view.computerCurrentTurn;

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
};
