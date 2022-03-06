'use strict';
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const playerElementArray = [player0Element, player1Element];

const scoreElement1 = document.querySelector('#score--0');
const scoreElement2 = document.querySelector('#score--1');
const scoreElementArray = [scoreElement1, scoreElement2];

const currentScoreElement1 = document.querySelector('#current--0');
const currentScoreElement2 = document.querySelector('#current--1');
const currentScoreElementArray = [currentScoreElement1, currentScoreElement2];

const diceElement = document.querySelector('.dice');

const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

class Dice {
  static roll() {
    return Math.trunc(Math.random() * 6) + 1;
  }
}

class Player {
  constructor() {
    this.globalScore = 0;
    this.currentScore = 0;
  }

  addCurrentScore(scores) {
    this.currentScore += scores;
  }

  hold() {
    this.globalScore += this.currentScore;
    this.resetCurrentScore();
    console.log(this);
  }
  resetCurrentScore() {
    this.currentScore = 0;
  }
}

class PigGame {
  constructor(players) {
    this.players = players;
    this.numberOfPlayers = players.length;
    this.activePlayerIdx = 0;
  }
  get activePlayer() {
    return this.players[this.activePlayerIdx];
  }

  isWinTheGame() {
    return this.activePlayer.globalScore >= 100;
  }

  diceChecker(diceRoll) {
    if (diceRoll === 1) {
      this.activePlayer.resetCurrentScore();
      this.resetActivePlayerCurrentScoreOnHTML();
      this.switchPlayer();
      this.swithPlayerOnHTML();
      console.log(this.activePlayer);
    } else {
      this.activePlayer.currentScore += diceRoll;
      console.log(this.activePlayer);
      this.resetActivePlayerCurrentScoreOnHTML();
    }
  }

  switchPlayer() {
    if (this.activePlayerIdx == this.numberOfPlayers - 1) {
      this.activePlayerIdx = 0;
    } else {
      this.activePlayerIdx += 1;
    }
    // this.activePlayer =
    //   this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  // handling HTML
  resetActivePlayerCurrentScoreOnHTML() {
    currentScoreElementArray[this.activePlayerIdx].textContent =
      this.activePlayer.currentScore;
  }

  displayHoldScoreOnHTML() {
    scoreElementArray[this.activePlayerIdx].textContent =
      this.activePlayer.globalScore;
  }
  swithPlayerOnHTML() {
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
  }

  displayWinnerOnHTML() {
    playerElementArray[this.activePlayerIdx].classList.add('player--winner');
    playerElementArray[this.activePlayerIdx].classList.remove('player--active');
  }
  eraseDiceOnHTML() {
    diceElement.classList.add('hidden');
  }
}

let player1 = new Player();
let player2 = new Player();
let pigGame = new PigGame([player1, player2]);

btnRoll.addEventListener('click', function () {
  if (pigGame.isWinTheGame()) {
    pigGame.displayWinnerOnHTML();
    pigGame.eraseDiceOnHTML();
  }
  // generate a random dice roll
  const currentRoll = Dice.roll();
  // display the dice
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${currentRoll}.png`;

  // check the dice every for every single push
  pigGame.diceChecker(currentRoll);
});

btnHold.addEventListener('click', function () {
  if (pigGame.isWinTheGame()) {
    pigGame.displayWinnerOnHTML();
    pigGame.eraseDiceOnHTML();
  }

  pigGame.activePlayer.hold();
  pigGame.resetActivePlayerCurrentScoreOnHTML();
  pigGame.displayHoldScoreOnHTML();
  pigGame.switchPlayer();
  pigGame.swithPlayerOnHTML();
});

btnNewGame.addEventListener('click', function () {
  location.reload();
});
