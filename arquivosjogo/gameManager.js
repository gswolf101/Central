import * as THREE from 'three';

export class GameManager {
  constructor() {
    this.score = 0;
    this.gameOver = false;
    this.startTime = Date.now();
  }

  restart() {
    this.score = 0;
    this.gameOver = false;
    this.startTime = Date.now();
  }

  getPlayTime() {
    return (Date.now() - this.startTime) / 1000;
  }
}
