import { useEffect, useSyncExternalStore } from 'react';
import { loadMissionRewardIndex } from '../../services/itemFinder/missionRewards';
import { loadWikeloIndex } from '../../services/itemFinder/wikelo';

// One shared state per static index, so every row, tile and section sees the same loading/error state
// and a single Retry recovers all of them.
function createSharedResource(load) {
  let state = { status: 'loading', data: null, error: null };
  let started = false;
  const listeners = new Set();

  const set = (next) => {
    state = next;
    listeners.forEach((listener) => listener());
  };

  const start = () => {
    started = true;
    load().then(
      (data) => set({ status: 'done', data, error: null }),
      (error) => set({ status: 'error', data: null, error })
    );
  };

  const retry = () => {
    set({ status: 'loading', data: null, error: null });
    start();
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return function useSharedResource() {
    const snapshot = useSyncExternalStore(subscribe, () => state);

    useEffect(() => {
      if (!started) {
        start();
      }
    }, []);

    return { ...snapshot, retry };
  };
}

export const useWikeloIndex = createSharedResource(loadWikeloIndex);
export const useMissionRewardIndex = createSharedResource(loadMissionRewardIndex);
