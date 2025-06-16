import React, { useRef } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text, Sky, Environment } from '@react-three/drei';
import * as THREE from 'three';

export interface GameCanvasProps {
  board: number[];
  size: number;
  onTileClick: (index: number) => void;
}

interface TileProps {
  index: number;
  value: number;
  size: number;
  cubeSize: number;
  onClick: (index: number) => void;
}

const Tile: React.FC<TileProps> = ({ index, value, size, cubeSize, onClick }) => {
  if (value === 0) return null;
  const x = index % size;
  const y = Math.floor(index / size);
  const position: [number, number, number] = [
    (x - size / 2 + 0.5) * cubeSize,
    0,
    (y - size / 2 + 0.5) * cubeSize,
  ];
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onClick(index);
  };
  return (
    <mesh position={position} onPointerDown={handlePointerDown}>
      <boxGeometry args={[cubeSize - 0.05, cubeSize - 0.05, cubeSize - 0.05]} />
      <meshStandardMaterial color="orange" />
      <Text
        position={[0, cubeSize / 2 + 0.01, 0]}
        rotation={[Math.PI / 2, Math.PI, Math.PI]}
        fontSize={cubeSize * 0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value.toString()}
      </Text>
    </mesh>
  );
};

const Scene: React.FC<GameCanvasProps> = ({ board, size, onTileClick }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const cubeSize = 1; // Use a fixed cube size so tiles fill the grid consistently
  const boardSize = cubeSize * size;

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
        position={[boardSize * 1.5, boardSize * 1.5, boardSize * 1.5]}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 2]} intensity={0.7} />
      <group>
        {board.map((value, index) => (
          <Tile
            key={index}
            index={index}
            value={value}
            size={size}
            cubeSize={cubeSize}
            onClick={onTileClick}
          />
        ))}
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -cubeSize / 2 - 0.01, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <OrbitControls dampingFactor={0.05} enablePan={false} />
    </>
  );
};

export const GameCanvas: React.FC<GameCanvasProps> = ({ board, size, onTileClick }) => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }} gl={{ preserveDrawingBuffer: true }}>
      <color attach="background" args={['#e0f7fa']} />
      <Sky distance={450000} sunPosition={[1, 2, 3]} inclination={0.6} azimuth={0.25} />
      <Environment preset="sunset" />
      <Scene board={board} size={size} onTileClick={onTileClick} />
    </Canvas>
  );
};

export default GameCanvas;
