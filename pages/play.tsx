import dynamic from 'next/dynamic';
import type { NextPage } from 'next';

const Canvas = dynamic(() => import('@react-three/fiber').then((mod) => mod.Canvas), { ssr: false });

export const PlayPage: NextPage = () => (
  <div className="w-screen h-screen">
    <Canvas className="w-full h-full">
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  </div>
);

export default PlayPage;
