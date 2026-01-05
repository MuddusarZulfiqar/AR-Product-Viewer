import React, { useRef, useEffect } from 'react';
import { useGLTF, OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

interface Scene3DProps {
  modelUrl: string;
  autoRotate?: boolean;
}

const Model: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (modelRef.current) {
      // Center and scale the model
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2 / maxDim;
      
      modelRef.current.scale.setScalar(scale);
      modelRef.current.position.sub(center.multiplyScalar(scale));
    }
  }, [scene]);

  return <primitive ref={modelRef} object={scene} />;
};

const Scene3D: React.FC<Scene3DProps> = ({ modelUrl, autoRotate = true }) => {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Environment for reflections */}
      <Environment preset="studio" />
      
      {/* Model */}
      <React.Suspense fallback={null}>
        <Model url={modelUrl} />
      </React.Suspense>
      
      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={2}
        minDistance={2}
        maxDistance={10}
      />
    </Canvas>
  );
};

export default Scene3D;
