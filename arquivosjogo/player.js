import * as THREE from 'three';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.moveSpeed = 8;
    this.originalScale = 1;
    this.powerUpScale = 1.1;
    this.immuneDuration = 1.5;
    
    this.keys = {};
    this.isImmuneActive = false;
    this.immuneTimeLeft = 0;
    this.canActivatePower = true;
    
    this.createPlayer();
    this.setupInput();
  }

createPlayer() {
  console.log('Creating player...'); // Adicione esta linha
  // Main player cube
  const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.2);
  const material = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    emissive: 0x111111
  });
  this.mesh = new THREE.Mesh(geometry, material);
  this.mesh.position.set(0, 0, 0);
  console.log('Player mesh created at position:', this.mesh.position); // Adicione esta linha
  this.scene.add(this.mesh);
    
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 0, 0);
    this.scene.add(this.mesh);

    // Shield effect (invisible by default)
    const shieldGeometry = new THREE.RingGeometry(0.8, 1.0, 32);
    const shieldMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff6b9d,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    
    this.shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    this.shield.position.copy(this.mesh.position);
    this.scene.add(this.shield);
  }

  setupInput() {
    document.addEventListener('keydown', (event) => {
      this.keys[event.code] = true;
      
      if (event.code === 'Space' && this.canActivatePower && !this.isImmuneActive) {
        this.activatePowerUp();
        event.preventDefault();
      }
    });

    document.addEventListener('keyup', (event) => {
      this.keys[event.code] = false;
    });
  }

  activatePowerUp() {
    this.isImmuneActive = true;
    this.immuneTimeLeft = this.immuneDuration;
    this.canActivatePower = false;
    
    // Scale up player
    this.mesh.scale.setScalar(this.powerUpScale);
    
    // Activate shield visual
    this.shield.material.opacity = 0.6;
    this.shield.scale.setScalar(this.powerUpScale);
    
    // Player glow effect
    this.mesh.material.emissive.setHex(0x333333);
  }

  deactivatePowerUp() {
    this.isImmuneActive = false;
    this.immuneTimeLeft = 0;
    
    // Scale back to normal
    this.mesh.scale.setScalar(this.originalScale);
    
    // Deactivate shield visual
    this.shield.material.opacity = 0;
    this.shield.scale.setScalar(this.originalScale);
    
    // Remove glow
    this.mesh.material.emissive.setHex(0x111111);
    
    // Cooldown before next power-up
    setTimeout(() => {
      this.canActivatePower = true;
    }, 500);
  }

  update(deltaTime) {
    // Handle movement
    const moveVector = new THREE.Vector3();
    
    if (this.keys['KeyW']) moveVector.y += 1;
    if (this.keys['KeyS']) moveVector.y -= 1;
    if (this.keys['KeyA']) moveVector.x -= 1;
    if (this.keys['KeyD']) moveVector.x += 1;
    
    if (moveVector.length() > 0) {
      moveVector.normalize();
      moveVector.multiplyScalar(this.moveSpeed * deltaTime);
      this.mesh.position.add(moveVector);
      
      // Keep player within bounds
      this.mesh.position.x = Math.max(-9, Math.min(9, this.mesh.position.x));
      this.mesh.position.y = Math.max(-9, Math.min(9, this.mesh.position.y));
    }

    // Update shield position
    this.shield.position.copy(this.mesh.position);

    // Handle immunity timer
    if (this.isImmuneActive) {
      this.immuneTimeLeft -= deltaTime;
      
      // Pulse effect during immunity
      const pulseScale = this.powerUpScale + Math.sin(Date.now() * 0.01) * 0.05;
      this.shield.scale.setScalar(pulseScale);
      
      if (this.immuneTimeLeft <= 0) {
        this.deactivatePowerUp();
      }
    }
  }

  getBoundingBox() {
    const box = new THREE.Box3();
    box.setFromObject(this.mesh);
    return box;
  }

  isImmune() {
    return this.isImmuneActive;
  }

  getImmuneTimeLeft() {
    return Math.max(0, this.immuneTimeLeft);
  }

  reset() {
    this.mesh.position.set(0, 0, 0);
    this.shield.position.set(0, 0, 0);
    this.deactivatePowerUp();
    this.canActivatePower = true;
    this.keys = {};
  }
}
