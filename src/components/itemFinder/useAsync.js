import { useCallback, useEffect, useRef, useState } from 'react';

export function useAsync(factory, deps) {
  const [state, setState] = useState({
    status: 'loading',
    data: null,
    error: null,
  });
  const [attempt, setAttempt] = useState(0);
  const factoryRef = useRef(factory);
  factoryRef.current = factory;

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', data: null, error: null });

    Promise.resolve()
      .then(() => factoryRef.current())
      .then(
        (data) => {
          if (!cancelled) {
            setState({ status: 'done', data, error: null });
          }
        },
        (error) => {
          if (!cancelled) {
            setState({ status: 'error', data: null, error });
          }
        }
      );

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const retry = useCallback(() => setAttempt((current) => current + 1), []);

  return { ...state, retry };
}
