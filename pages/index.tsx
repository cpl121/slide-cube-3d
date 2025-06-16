import { useRouter } from 'next/router';
import Head from 'next/head';

const HomePage = () => {
  const router = useRouter();

  const startNewGame = () => {
    const size = Math.floor(Math.random() * 4) + 3;
    const seed = Math.floor(Math.random() * 100000);
    router.push(`/play?size=${size}&seed=${seed}`);
  };

  return (
    <>
      <Head>
        <title>SlideCube 3D</title>
        <meta name="description" content="A 3D Sliding-Tile Puzzle with infinite challenges." />
      </Head>
      <div className="h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center overflow-hidden">
        <h1 className="text-5xl font-bold text-white mb-4">SlideCube 3D</h1>
        <p className="text-lg text-white mb-8">
          A 3D Sliding-Tile Puzzle with infinite challenges.
        </p>
        <button
          onClick={startNewGame}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl rounded-xl shadow-lg hover:shadow-2xl transition"
        >
          Start New Game
        </button>
      </div>
    </>
  );
};

export default HomePage;
