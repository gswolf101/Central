import * as THREE from 'three';

export class LineManager {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.lines = [];
    this.spawnTimer = 0;
    this.spawnInterval = 2.0; // Start with 2 seconds between spawns
    this.minSpawnInterval = 0.8;
    this.lineSpeed = 6;
    this.linesDestroyed = 0;
  }

  createLine(startPos, direction, isVertical) {
    const lineLength = isVertical ? 20 : 20;
    const lineWidth = 0.3;
    
    const geometry = isVertical 
      ? new THREE.BoxGeometry(lineWidth, lineLength, 0.1)
      : new THREE.BoxGeometry(lineLength, lineWidth, 0.1);
    
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xff6b9d,
      emissive: 0xff1155,
      emissiveIntensity: 0.5
    });
    
    const line = new THREE.Mesh(geometry, material);
    line.position.copy(startPos);
    line.userData = {
      direction: direction.clone(),
      isVertical: isVertical,
      hasPassedPlayer: false
    };
    
    this.scene.add(line);
    this.lines.push(line);
    
    return line;
  }

  spawnRandomLine() {
    const spawnSide = Math.floor(Math.random() * 4); // 0=top, 1=bottom, 2=left, 3=right
    let startPos, direction, isVertical;
    
    switch(spawnSide) {
      case 0: // Top
        startPos = new THREE.Vector3(Math.random() * 16 - 8, 12, 0);
        direction = new THREE.Vector3(0, -1, 0);
        isVertical = false; // Horizontal line moving vertically
        break;
      case 1: // Bottom
        startPos = new THREE.Vector3(Math.random() * 16 - 8, -12, 0);
        direction = new THREE.Vector3(0, 1, 0);
        isVertical = false; // Horizontal line moving vertically
        break;
      case 2: // Left
        startPos = new THREE.Vector3(-12, Math.random() * 16 - 8, 0);
        direction = new THREE.Vector3(1, 0, 0);
        isVertical = true; // Vertical line moving horizontally
        break;
      case 3: // Right
        startPos = new THREE.Vector3(12, Math.random() * 16 - 8, 0);
        direction = new THREE.Vector3(-1, 0, 0);
        isVertical = true; // Vertical line moving horizontally
        break;
    }
    
    this.createLine(startPos, direction, isVertical);
  }

  update(deltaTime) {
    // Spawn new lines
    this.spawnTimer += deltaTime;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnRandomLine();
      this.spawnTimer = 0;
      
      // Gradually increase difficulty
      if (this.spawnInterval > this.minSpawnInterval) {
        this.spawnInterval = Math.max(this.minSpawnInterval, this.spawnInterval - 0.05);
      }
    }

    // Update existing lines
    for (let i = this.lines.length - 1; i >= 0; i--) {
      const line = this.lines[i];
      const userData = line.userData;
      
      // Move line
      const movement = userData.direction.clone().multiplyScalar(this.lineSpeed * deltaTime);
      line.position.add(movement);
      
      // Check if line has passed through center (player area) for scoring
      if (!userData.hasPassedPlayer) {
        const distanceFromCenter = line.position.distanceTo(new THREE.Vector3(0, 0, 0));
        if (distanceFromCenter < 15 && this.isLinePastPlayer(line)) {
          userData.hasPassedPlayer = true;
          this.linesDestroyed++;
        }
      }
      
      // Remove lines that are off-screen
      if (this.isLineOffScreen(line)) {
        this.scene.remove(line);
        line.geometry.dispose();
        line.material.dispose();
        this.lines.splice(i, 1);
      }
    }
  }

  isLinePastPlayer(line) {
    const userData = line.userData;
    
    // Check if line has moved past the center area where player can be
    if (userData.isVertical) {
      // Vertical lines moving horizontally
      return (userData.direction.x > 0 && line.position.x > 2) || 
             (userData.direction.x < 0 && line.position.x < -2);
    } else {
      // Horizontal lines moving vertically  
      return (userData.direction.y > 0 && line.position.y > 2) || 
             (userData.direction.y < 0 && line.position.y < -2);
    }
  }

  isLineOffScreen(line) {
    return Math.abs(line.position.x) > 15 || Math.abs(line.position.y) > 15;
  }

  getLines() {
    return this.lines;
  }

  getScore() {
    return this.linesDestroyed;
  }

  reset() {
    // Remove all lines
    for (let line of this.lines) {
      this.scene.remove(line);
      line.geometry.dispose();
      line.material.dispose();
    }
    this.lines = [];
    this.spawnTimer = 0;
    this.spawnInterval = 2.0;
    this.linesDestroyed = 0;
  }
}
