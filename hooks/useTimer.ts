import { useState, useEffect, useRef } from 'react';

export function useTimer() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runningRef = useRef(false);

  const start = () => {
    if (!runningRef.current) {
      runningRef.current = true;
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
  };

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      runningRef.current = true;
    }
  };

  const reset = () => {
    pause();
    runningRef.current = false;
    setTimeElapsed(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { timeElapsed, start, pause, reset };
}
