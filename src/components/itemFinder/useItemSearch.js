import { useCallback, useEffect, useRef, useState } from 'react';
import { wikiApi } from '../../services/itemFinder/wikiApi';

export const MIN_QUERY_LENGTH = 2;

// Offset pages can overlap when the server order shifts between requests; keep the first copy of each item.
function mergeByUuid(existing, incoming) {
  const seen = new Set(existing.map((item) => item.uuid));
  return [...existing, ...incoming.filter((item) => !seen.has(item.uuid))];
}

const IDLE_STATE = {
  status: 'idle',
  items: [],
  total: 0,
  page: 1,
  lastPage: 1,
  error: null,
  loadingMore: false,
};

export function useItemSearch({ query, category, baseOnly, itemSize = '', sort = 'name' }) {
  const trimmed = query.trim();
  const enabled = trimmed.length >= MIN_QUERY_LENGTH;
  const [state, setState] = useState(IDLE_STATE);
  const latestRequest = useRef(0);
  const lastRun = useRef({ page: 1, append: false });

  const run = useCallback(
    async (page, append) => {
      const requestId = ++latestRequest.current;
      lastRun.current = { page, append };

      // A fresh search drops the previous list at once, so "Load more" can never
      // request a page of the old query's results with the new query's filters.
      setState((current) =>
        append ? { ...current, loadingMore: true, error: null } : { ...IDLE_STATE, status: 'loading' }
      );

      try {
        const result = await wikiApi.searchItems({
          query: trimmed,
          category,
          baseOnly,
          itemSize,
          sort,
          page,
        });

        if (requestId !== latestRequest.current) {
          return;
        }

        setState((current) => ({
          status: 'done',
          items: append ? mergeByUuid(current.items, result.items) : result.items,
          total: result.total,
          page,
          lastPage: result.lastPage,
          error: null,
          loadingMore: false,
        }));
      } catch (error) {
        if (requestId !== latestRequest.current) {
          return;
        }

        setState((current) =>
          append ? { ...current, loadingMore: false, error } : { ...IDLE_STATE, status: 'error', error }
        );
      }
    },
    [trimmed, category, baseOnly, itemSize, sort]
  );

  useEffect(() => {
    if (!enabled) {
      latestRequest.current += 1;
      setState(IDLE_STATE);
      return;
    }

    run(1, false);
  }, [enabled, run]);

  const loadMore = useCallback(() => run(state.page + 1, true), [run, state.page]);
  const retry = useCallback(() => run(lastRun.current.page, lastRun.current.append), [run]);

  return {
    ...state,
    enabled,
    canLoadMore: state.status === 'done' && !state.loadingMore && state.page < state.lastPage,
    loadMore,
    retry,
  };
}
