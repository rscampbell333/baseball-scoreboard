import { useEffect, useState } from "react"

export const useInterval = <T,>(fn: () => T, time: number) => {
  const [result, setResult] = useState<T | undefined>();

  useEffect(() => {
    const result = fn();
    setResult(result);

    const interval = setInterval(() => {
      const result = fn();
      setResult(result);
    }, time);

    return () => clearInterval(interval);
  }, [fn, time]);

  return result;
}

export const useIntervalAsync = <T,>(fn: () => Promise<T>, time: number) => {
  const [result, setResult] = useState<T | undefined>();

  useEffect(() => {
    const result = fn();
    result
      .then(r => setResult(r))
      .catch(e => console.error(e));

    const interval = setInterval(() => {
      const result = fn();
      result
        .then(r => setResult(r))
        .catch(e => console.error(e));
    }, time);

    return () => clearInterval(interval);
  }, [fn, time]);

  return result;
}