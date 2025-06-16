'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>('random');
  const [isLoading, setIsLoading] = useState(false);

  const sizeOptions = [
    { value: 'random', label: 'Random' },
    { value: '3', label: '3×3' },
    { value: '4', label: '4×4' },
    { value: '5', label: '5×5' },
    { value: '6', label: '6×6' },
  ];

  const startNewGame = () => {
    setIsLoading(true);

    let size: number;
    if (selectedSize === 'random') {
      size = Math.floor(Math.random() * 4) + 3; // Random size between 3-6
    } else {
      size = Number.parseInt(selectedSize);
    }

    const seed = Math.floor(Math.random() * 1000000); // Random seed
    router.push(`/play?size=${size}&seed=${seed}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Title */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            SlideCube 3D
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
            Experience the ultimate 3D sliding-tile puzzle challenge
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Every playthrough generates a brand new random board. Slide, rotate, and solve your way
            through infinite puzzles in stunning 3D.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            <div className="text-4xl mb-3">🎲</div>
            <h3 className="text-xl font-semibold text-white mb-2">Infinite Puzzles</h3>
            <p className="text-gray-300">Every game is unique with procedurally generated boards</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            <div className="text-4xl mb-3">🎮</div>
            <h3 className="text-xl font-semibold text-white mb-2">3D Experience</h3>
            <p className="text-gray-300">Immersive three-dimensional puzzle solving</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Instant Play</h3>
            <p className="text-gray-300">No downloads required - play directly in your browser</p>
          </div>
        </div>

        {/* Game Configuration */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-6">Choose Your Challenge</h3>

            {/* Board Size Dropdown */}
            <div className="mb-6">
              <label htmlFor="board-size" className="block text-sm font-medium text-gray-300 mb-3">
                Board Size
              </label>
              <select
                id="board-size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
              >
                {sizeOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-gray-800 text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-2">
                {selectedSize === 'random'
                  ? 'A random board size will be selected for you'
                  : `Play on a ${selectedSize}×${selectedSize} grid`}
              </p>
            </div>

            {/* Start Game Button */}
            <button
              onClick={startNewGame}
              disabled={isLoading}
              className="group relative w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xl font-bold rounded-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10">
                {isLoading ? 'Generating Puzzle...' : 'Start New Game'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
