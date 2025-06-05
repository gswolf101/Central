export class UI {
  constructor() {
    this.scoreElement = document.getElementById('score');
    this.gameOverElement = document.getElementById('gameOver');
    this.finalScoreElement = document.getElementById('finalScore');
    this.immuneStatusElement = document.getElementById('immuneStatus');
    this.immuneTimeElement = document.getElementById('immuneTime');
  }

  updateScore(score) {
    this.scoreElement.textContent = score;
  }

  updateImmuneStatus(isImmune, timeLeft) {
    if (isImmune) {
      this.immuneStatusElement.style.display = 'block';
      this.immuneTimeElement.textContent = timeLeft.toFixed(1);
    } else {
      this.immuneStatusElement.style.display = 'none';
    }
  }

  showGameOver(finalScore) {
    this.finalScoreElement.textContent = finalScore;
    this.gameOverElement.style.display = 'block';
  }

  hideGameOver() {
    this.gameOverElement.style.display = 'none';
  }
}
