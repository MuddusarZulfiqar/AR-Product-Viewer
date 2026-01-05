import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import * as fs from 'fs';

// Create a scene
const scene = new THREE.Scene();

// Create a cube geometry with a nice material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x6366f1, // Purple-blue color matching the app theme
  metalness: 0.5,
  roughness: 0.3
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add a light to the scene
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Export to GLB
const exporter = new GLTFExporter();

exporter.parse(
  scene,
  (gltf) => {
    const output = Buffer.from(gltf as ArrayBuffer);
    fs.writeFileSync('test-models/cube.glb', output);
    console.log('Cube model created successfully at test-models/cube.glb');
  },
  (error) => {
    console.error('Error creating model:', error);
  },
  { binary: true }
);
