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
};
