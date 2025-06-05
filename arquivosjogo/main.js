import * as THREE from 'three';
import { Player } from './player.js';
import { LineManager } from './lineManager.js';
import { GameManager } from './gameManager.js';
import { UI } from './ui.js';

class LineDodgeGame {
  constructor() {
    this.container = document.getElementById('gameContainer');
    this.init();
    this.setupEventListeners();
    this.animate();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x7a6b8a);

    // Camera setup (orthographic for 2D feel)
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 20;
    this.camera = new THREE.OrthographicCamera(
      -frustumSize * aspect / 2, frustumSize * aspect / 2,
      frustumSize / 2, -frustumSize / 2,
      1, 1000
    );
    this.camera.position.z = 10;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // Game components
    this.player = new Player(this.scene);
    this.lineManager = new LineManager(this.scene, this.camera);
    this.gameManager = new GameManager();
    this.ui = new UI();

    // Lighting for glow effects
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff6b9d, 0.8, 100);
    pointLight.position.set(0, 0, 5);
    this.scene.add(pointLight);

    this.clock = new THREE.Clock();
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.onWindowResize());
    
    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyR' && this.gameManager.gameOver) {
        this.restart();
      }
    });
  }

  onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 20;
    
    this.camera.left = -frustumSize * aspect / 2;
    this.camera.right = frustumSize * aspect / 2;
    this.camera.top = frustumSize / 2;
    this.camera.bottom = -frustumSize / 2;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  restart() {
    // Reset game state
    this.gameManager.restart();
    this.player.reset();
    this.lineManager.reset();
    this.ui.hideGameOver();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.gameManager.gameOver) {
      this.renderer.render(this.scene, this.camera);
      return;
    }

    const deltaTime = this.clock.getDelta();

    // Update game components
    this.player.update(deltaTime);
    this.lineManager.update(deltaTime);

    // Check collisions
    const playerBox = this.player.getBoundingBox();
    const lines = this.lineManager.getLines();
    
    for (let line of lines) {
      const lineBox = line.getBoundingBox();
      if (playerBox.intersectsBox(lineBox) && !this.player.isImmune()) {
        this.gameManager.gameOver = true;
        this.ui.showGameOver(this.gameManager.score);
        break;
      }
    }

    // Update score based on lines passed
    const newScore = this.lineManager.getScore();
    if (newScore > this.gameManager.score) {
      this.gameManager.score = newScore;
    }

    // Update UI
    this.ui.updateScore(this.gameManager.score);
    this.ui.updateImmuneStatus(this.player.isImmune(), this.player.getImmuneTimeLeft());

    this.renderer.render(this.scene, this.camera);
  }
}

// Start the game
new LineDodgeGame();
