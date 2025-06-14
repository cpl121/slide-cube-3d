import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export interface GameCanvasProps {
  board: number[];
  size: number;
  onTileClick: (index: number) => void;
}

const Tile: React.FC<{
  index: number;
  value: number;
  size: number;
  onClick: (index: number) => void;
}> = ({ index, value, size, onClick }) => {
  if (value === 0) return null;
  const x = index % size;
  const y = Math.floor(index / size);
  return (
    <mesh position={[x - size / 2 + 0.5, 0, y - size / 2 + 0.5]} onClick={() => onClick(index)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const Scene: React.FC<GameCanvasProps> = ({ board, size, onTileClick }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[size * 1.5, size * 1.5, size * 1.5]}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={0.7} />
      <group>
        {board.map((value, index) => (
          <Tile key={index} index={index} value={value} size={size} onClick={onTileClick} />
        ))}
      </group>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
};

export const GameCanvas: React.FC<GameCanvasProps> = ({ board, size, onTileClick }) => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <Scene board={board} size={size} onTileClick={onTileClick} />
    </Canvas>
  );
};

export default GameCanvas;
