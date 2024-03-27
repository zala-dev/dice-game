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
    view.roundNumberEl.textContent = round++;
  },

  updatePlayerCurrentScore: (playerScore = 0) => {
    view.playerScoreEl.textContent = playerScore;
    model.playerCurrentScore = playerScore;
  },

  updateComputerCurrentScore: (computerScore = 0) => {
    view.computerScoreEl.textContent = computerScore;
    model.computerCurrentScore = computerScore;
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

  renderDice: (dice1, dice2) => {
    if (dice1 && dice2) {
      view.dice1El.src = `/assets/images/dice-${dice1}.png`;
      view.dice2El.src = `/assets/images/dice-${dice2}.png`;

      view.dice1El.classList.remove("hidden");
      view.dice2El.classList.remove("hidden");
    }
  },

  renderWinner: (winner) => {
    if (winner === "player") {
      view.winnerEl.classList.add("player");
    } else {
      view.winnerEl.classList.add("computer");
    }
  },
};

/* Controller */
function controller() {
  const init = () => {
    model.activePlayer;
    model.currentRoundNumber;
    model.playerCurrentScore;
    model.computerCurrentScore;
    model.playerRoundWon;
    model.computerRoundWon;

    // view.gameRulesScreen.classList.toggle("hide");
    view.updateRoundNumber(model.currentRoundNumber);
    view.updatePlayerCurrentScore();
    view.updateComputerCurrentScore();
    view.updatePlayerRoundWon();
    view.updateComputerRoundWon();
    view.renderCurrentTurn(model.activePlayer);
  };

  const startGame = () => {
    view.gameRulesScreen.classList.toggle("hide");
  };

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

  const resetScores = () => {
    model.playerCurrentScore = 0;
    model.computerCurrentScore = 0;
    view.updatePlayerCurrentScore();
    view.updateComputerCurrentScore();
  };

  const rollDice = async () => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    // if (dice1 === dice2) {
    //   dice2 = Math.floor(Math.random() * 6) + 1;
    // }

    const combination1 = dice1.toString() + dice2.toString();
    const combination2 = dice2.toString() + dice1.toString();

    const maximum = combination1 > combination2 ? combination1 : combination2;

    view.renderDice(dice1, dice2);

    if (model.activePlayer === "player") {
      // update player score
      view.updatePlayerCurrentScore(maximum);
    }
    if (model.activePlayer === "computer") {
      // update computer score
      view.updateComputerCurrentScore(maximum);
    }
    // switch player
    switchPlayer();

    // check who won the round
    // check if the current socre is greater than 0
    if (model.playerCurrentScore > 0 && model.computerCurrentScore > 0) {
      if (model.playerCurrentScore > model.computerCurrentScore) {
        model.playerRoundWon++;
        view.updatePlayerRoundWon(model.playerRoundWon);
      }

      if (model.computerCurrentScore > model.playerCurrentScore) {
        model.computerRoundWon++;
        view.updateComputerRoundWon(model.computerRoundWon);
      }

      setTimeout(() => {
        resetScores();
      }, 2000);

      if (model.currentRoundNumber <= model.totalRound) {
        model.currentRoundNumber++;
        view.updateRoundNumber(model.currentRoundNumber);
      }

      if (model.playerRoundWon === model.totalRound) {
        console.log("Winner, Player!!");
        return;
      }

      if (model.computerRoundWon === model.totalRound) {
        console.log("Winner, Computer!!");
        return;
      }
    }
  };

  return { init, startGame, rollDice };
}

// Event Listeners
document.addEventListener("DOMContentLoaded", controller().init);
view.gameInstructionBeginBtn.addEventListener("click", controller().startGame);
view.rollDiceBtn.addEventListener("click", controller().rollDice);
