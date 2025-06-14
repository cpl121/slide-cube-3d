import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { NextPage } from 'next';

const Box = () => (
  <mesh rotation={[0.4, 0.2, 0]}> 
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="orange" />
  </mesh>
);

const Home: NextPage = () => (
  <div className="w-screen h-screen">
    <Canvas camera={{ position: [2, 2, 2] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box />
      <OrbitControls />
    </Canvas>
  </div>
);

export default Home;
