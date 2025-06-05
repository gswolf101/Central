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

    // Create arena borders with different colors
    this.createArenaBorders();

    this.clock = new THREE.Clock();
  }

  createArenaBorders() {
    const borderWidth = 0.2; // Largura das bordas
    const arenaSize = 18; // Tamanho total da arena (de -9 a 9)

    // Top border (red)
    const topGeometry = new THREE.BoxGeometry(arenaSize, borderWidth, 0.1);
    const topMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Vermelho
    const topBorder = new THREE.Mesh(topGeometry, topMaterial);
    topBorder.position.set(0, 9 + borderWidth / 2, 0);
    this.scene.add(topBorder);

    // Bottom border (blue)
    const bottomGeometry = new THREE.BoxGeometry(arenaSize, borderWidth, 0.1);
    const bottomMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Azul
    const bottomBorder = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottomBorder.position.set(0, -9 - borderWidth / 2, 0);
    this.scene.add(bottomBorder);

    // Left border (green)
    const leftGeometry = new THREE.BoxGeometry(borderWidth, arenaSize, 0.1);
    const leftMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Verde
    const leftBorder = new THREE.Mesh(leftGeometry, leftMaterial);
    leftBorder.position.set(-9 - borderWidth / 2, 0, 0);
    this.scene.add(leftBorder);

    // Right border (yellow)
    const rightGeometry = new THREE.BoxGeometry(borderWidth, arenaSize, 0.1);
    const rightMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }); // Amarelo
    const rightBorder = new THREE.Mesh(rightGeometry, rightMaterial);
    rightBorder.position.set(9 + borderWidth / 2, 0, 0);
    this.scene.add(rightBorder);
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
      const lineBox = line.getBoundingBox --

System: I notice that the code snippet for `main.js` was cut off in the middle of a line. Below, I’ve completed the `main.js` file with the added `createArenaBorders` function to include colored borders for the arena, ensuring the rest of the file remains unchanged. I’ll also include the other files (`player.js`, `lineManager.js`, `gameManager.js`, `ui.js`) as they were, since they don’t need modifications. Each file is wrapped in an `<xaiArtifact>` tag as per the guidelines, with unique UUIDs for new artifacts and the same UUID for `index.html` since it’s unchanged.

### Explicação da Modificação
- **Onde a mudança foi feita**: Adicionei a função `createArenaBorders` na função `init` do `main.js` para criar quatro bordas visuais (retângulos) ao redor da arena, com base nos limites definidos em `player.js` (`x: ±9`, `y: ±9`).
- **Cores das bordas**:
  - Topo: Vermelho (`0xff0000`)
  - Baixo: Azul (`0x0000ff`)
  - Esquerda: Verde (`0x00ff00`)
  - Direita: Amarelo (`0xffff00`)
- **Detalhes técnicos**:
  - Usei `BoxGeometry` para criar retângulos finos (0.2 de largura/altura) posicionados logo fora dos limites da arena.
  - As bordas são estáticas e não interagem com o jogador ou as linhas, servindo apenas como indicadores visuais.
  - A função `createArenaBorders` é chamada durante a inicialização para garantir que as bordas estejam presentes desde o início.

### Arquivos do Código

#### Arquivo 1: `index.html` (sem alterações)
<xaiArtifact artifact_id="5837c934-4cc5-4441-bb6c-9abfdc3d8959" artifact_version_id="30151113-186b-47c5-8e99-e193dfc5e306" title="index.html" contentType="text/html">
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Line Dodge Challenge</title>
    <script type="importmap">
      {
        "imports": {
          "three": "https://esm.sh/three@0.160.0?dev",
          "three/": "https://esm.sh/three@0.160.0&dev/"
        }
      }
    </script>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #7a6b8a 0%, #9b8ba3 100%);
        font-family: 'Arial', sans-serif;
        overflow: hidden;
      }
      
      #gameContainer {
        position: relative;
        width: 100vw;
        height: 100vh;
      }
      
      #ui {
        position: absolute;
        top: 20px;
        left: 20px;
        color: #ffffff;
        font-size: 24px;
        font-weight: bold;
        z-index: 100;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      }
      
      #gameOver {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
        display: none;
        z-index: 200;
        border: 2px solid #ff6b9d;
      }
      
      #instructions {
        position: absolute;
        bottom: 20px;
        left: 20px;
        color: #ffffff;
        font-size: 14px;
        opacity: 0.8;
        z-index: 100;
      }
    </style>
  </head>

  <body>
    <div id="gameContainer">
      <div id="ui">
        <div>SCORE: <span id="score">0</span></div>
        <div id="immuneStatus" style="display: none; color: #ff6b9d;">IMMUNE: <span id="immuneTime">0.0</span>s</div>
      </div>
      
      <div id="gameOver">
        <h2 style="color: #ff6b9d; margin-top: 0;">GAME OVER</h2>
        <p>Final Score: <span id="finalScore">0</span></p>
        <p style="font-size: 14px; opacity: 0.8;">Press R to restart</p>
      </div>
      
      <div id="instructions">
        <div>WASD: Move | SPACE: Shield (10% bigger + immune)</div>
      </div>
    </div>
    
    <script type="module" src="main.js"></script>
    <script src="https://storage.googleapis.com/rosebud_staticfiles/ScriptsLoader-Universal.js"></script>
    <script src="https://storage.googleapis.com/rosebud_staticfiles/ChatManager.js"></script>
    <script src="https://storage.googleapis.com/rosebud_staticfiles/ImageGenerator.js"></script>
    <script src="https://storage.googleapis.com/rosebud_staticfiles/ProgressLogger.js"></script>
    <script src="https://storage.googleapis.com/rosebud_staticfiles/OGP.js"></script>
  </body>
</html>
