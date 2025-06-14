import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  const startNewGame = () => {
    const size = Math.floor(Math.random() * 4) + 3;
    const seed = Math.floor(Math.random() * 100000);
    router.push(`/play?size=${size}&seed=${seed}`);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={startNewGame}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        Start New Game
      </button>
    </div>
  );
};

export default HomePage;
