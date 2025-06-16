'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const startNewGame = () => {
    setIsLoading(true);
    const size = Math.floor(Math.random() * 4) + 3; // Random size between 3-5
    const seed = Math.floor(Math.random() * 1000000); // Random seed
    router.push(`/play?size=${size}&seed=${seed}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Title */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              SlideCube
            </span>
            <span className="block text-6xl md:text-7xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
              3D
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
            Experience the ultimate 3D sliding-tile puzzle challenge
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Every playthrough generates a brand new random board. Slide, rotate, and solve your way
            through infinite puzzles in stunning 3D.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl mb-3">🎲</div>
            <h3 className="text-xl font-semibold text-white mb-2">Infinite Puzzles</h3>
            <p className="text-gray-300">Every game is unique with procedurally generated boards</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl mb-3">🎮</div>
            <h3 className="text-xl font-semibold text-white mb-2">3D Experience</h3>
            <p className="text-gray-300">Immersive three-dimensional puzzle solving</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Instant Play</h3>
            <p className="text-gray-300">No downloads required - play directly in your browser</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-4">
          <button
            onClick={startNewGame}
            disabled={isLoading}
            className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span className="relative z-10">{isLoading ? 'Loading...' : 'Start New Game'}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </button>
          <p className="text-sm text-gray-400">
            Click to generate a random puzzle and begin your challenge
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            Built with Next.js, TypeScript, React Three Fiber & TailwindCSS
          </p>
        </div>
      </div>
    </div>
  );
}
