import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SlideCube 3D – Infinite 3D Sliding Puzzle</title>
        <meta
          name="description"
          content="SlideCube 3D: infinite 3D sliding-tile puzzle built with Next.js, TypeScript, React Three Fiber & TailwindCSS."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content="SlideCube 3D" />
        <meta
          property="og:description"
          content="Infinite 3D sliding-tile puzzle with procedurally generated boards."
        />
        <meta property="og:type" content="game" />
        <meta property="og:url" content="https://slide-cube-3d.vercel.app" />
        <meta
          property="og:image"
          content="https://slide-cube-3d.vercel.app/assets/screenshot.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SlideCube 3D" />
        <meta
          name="twitter:description"
          content="Infinite 3D sliding-tile puzzle—slide, solve, share!"
        />
        <meta
          name="twitter:image"
          content="https://slide-cube-3d.vercel.app/assets/screenshot.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
