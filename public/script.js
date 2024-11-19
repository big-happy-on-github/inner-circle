import * as THREE from 'three';

// Initialize Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Table
const tableGeometry = new THREE.CylinderGeometry(5, 5, 0.2, 32);
const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const table = new THREE.Mesh(tableGeometry, tableMaterial);
scene.add(table);

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 0);
scene.add(light);

// Characters
const characters = [];
const characterCount = 8;
const radius = 6;
for (let i = 0; i < characterCount; i++) {
  const angle = (i / characterCount) * Math.PI * 2;

  // Character body
  const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.5, 1, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

  // Character position
  body.position.set(radius * Math.cos(angle), 0.5, radius * Math.sin(angle));
  body.lookAt(0, 0.5, 0);

  // Character head
  const headGeometry = new THREE.SphereGeometry(0.4, 16, 16);
  const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99 });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(0, 1.2, 0);
  body.add(head);

  // Add character to scene
  scene.add(body);
  characters.push(body);
}

// Camera position
camera.position.set(0, 10, 10);
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Responsive handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
