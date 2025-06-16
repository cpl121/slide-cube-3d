import { useState, useRef, useEffect, useCallback } from 'react';

export interface TimerHook {
  timeElapsed: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer(): TimerHook {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
  }, []);

  const pause = useCallback(() => {
    clear();
  }, [clear]);

  const reset = useCallback(() => {
    clear();
    setTimeElapsed(0);
  }, [clear]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return { timeElapsed, start, pause, reset };
}
