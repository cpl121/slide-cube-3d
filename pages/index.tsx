'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>('random');
  const [isLoading, setIsLoading] = useState(false);

  const sizeOptions = [
    { value: 'random', label: 'Random' },
    { value: '2', label: '2x2' },
    { value: '3', label: '3x3' },
    { value: '4', label: '4x4' },
    { value: '5', label: '5x5' },
    { value: '6', label: '6x6' },
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-2">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Title */}
        <div className="mb-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            SlideCube 3D
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Description */}
        <div className="mb-4 flex flex-col space-y-4">
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">Slide. Solve. Repeat.</p>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover a new 3D sliding-tile puzzle every time you play. Navigate shifting cubes,
            sharpen your skills, and challenge friends to beat your time and move count.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-5">
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
          {/* Game Configuration */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 md:col-span-2">
            <h3 className="text-2xl font-semibold text-white">How to Play</h3>
            <p className="text-gray-300 my-4 text-sm">
              Watch this quick tutorial to learn the basics of 3D puzzle solving
            </p>
            <div className="relative">
              <video
                className="w-full max-h-96 rounded-lg shadow-2xl"
                autoPlay
                loop
                muted
                poster="/assets/slide_cube.mp4"
              >
                <source src="/assets/slide_cube.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-md mx-auto w-full flex flex-col justify-around">
            <h3 className="text-2xl font-semibold text-white mb-6">Choose Your Challenge</h3>

            {/* Board Size Dropdown */}
            <div className="mb-6">
              <label htmlFor="board-size" className="text-sm font-medium text-gray-300">
                Board Size
              </label>
              <select
                id="board-size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
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
                  ? 'A random board size will be selected'
                  : `Play on a ${selectedSize}×${selectedSize} grid`}
              </p>
            </div>

            {/* Start Game Button */}
            <button
              onClick={startNewGame}
              disabled={isLoading}
              className="group relative w-full p-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xl font-bold rounded-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
