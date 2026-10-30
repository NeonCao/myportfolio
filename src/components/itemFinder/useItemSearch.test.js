import { act, renderHook, waitFor } from '@testing-library/react';
import { wikiApi } from '../../services/itemFinder/wikiApi';
import { useItemSearch } from './useItemSearch';

jest.mock('../../services/itemFinder/wikiApi', () => ({
  wikiApi: { searchItems: jest.fn() },
}));

const item = (name) => ({ uuid: name, slug: name, name });
const page = (names, { total = names.length, lastPage = 1 } = {}) => ({
  total,
  lastPage,
  items: names.map(item),
});

function deferred() {
  let resolve;
  const promise = new Promise((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

afterEach(() => jest.resetAllMocks());

test('stays idle below the minimum query length', () => {
  const { result } = renderHook(() => useItemSearch({ query: 'a', category: '', baseOnly: false }));

  expect(result.current.status).toBe('idle');
  expect(result.current.enabled).toBe(false);
  expect(wikiApi.searchItems).not.toHaveBeenCalled();
});

test('a new query clears the old list right away so Load more cannot mix queries', async () => {
  wikiApi.searchItems.mockResolvedValueOnce(page(['hadanite-a', 'hadanite-b'], { total: 20, lastPage: 3 }));
  const { result, rerender } = renderHook((props) => useItemSearch(props), {
    initialProps: { query: 'hadanite', category: '', baseOnly: false },
  });

  await waitFor(() => expect(result.current.status).toBe('done'));
  expect(result.current.canLoadMore).toBe(true);

  const slow = deferred();
  wikiApi.searchItems.mockReturnValueOnce(slow.promise);
  rerender({ query: 'gallant', category: '', baseOnly: false });

  await waitFor(() => expect(result.current.status).toBe('loading'));
  expect(result.current.items).toEqual([]);
  expect(result.current.canLoadMore).toBe(false);

  await act(async () => slow.resolve(page(['gallant-a'], { total: 1, lastPage: 1 })));
  expect(result.current.items.map((entry) => entry.name)).toEqual(['gallant-a']);
  expect(wikiApi.searchItems).toHaveBeenLastCalledWith(expect.objectContaining({ query: 'gallant', page: 1 }));
});

test('responses from a superseded search are ignored', async () => {
  const first = deferred();
  const second = deferred();
  wikiApi.searchItems.mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);
  const { result, rerender } = renderHook((props) => useItemSearch(props), {
    initialProps: { query: 'rifle', category: '', baseOnly: false },
  });

  rerender({ query: 'rifle', category: 'armor', baseOnly: false });
  await act(async () => second.resolve(page(['armor-hit'])));
  await act(async () => first.resolve(page(['stale-hit'])));

  expect(result.current.items.map((entry) => entry.name)).toEqual(['armor-hit']);
});

test('Load more appends, and Retry after a failed Load more re-requests that same page', async () => {
  wikiApi.searchItems
    .mockResolvedValueOnce(page(['a1', 'a2'], { total: 6, lastPage: 3 }))
    .mockRejectedValueOnce(Object.assign(new Error('HTTP 429'), { status: 429 }))
    .mockResolvedValueOnce(page(['b1', 'b2'], { total: 6, lastPage: 3 }));
  const { result } = renderHook(() => useItemSearch({ query: 'rifle', category: '', baseOnly: false }));

  await waitFor(() => expect(result.current.status).toBe('done'));

  await act(async () => {
    await result.current.loadMore();
  });
  expect(result.current.error).toMatchObject({ status: 429 });
  expect(result.current.items.map((entry) => entry.name)).toEqual(['a1', 'a2']);

  await act(async () => {
    await result.current.retry();
  });
  expect(wikiApi.searchItems).toHaveBeenLastCalledWith(expect.objectContaining({ page: 2 }));
  expect(result.current.error).toBeNull();
  expect(result.current.items.map((entry) => entry.name)).toEqual(['a1', 'a2', 'b1', 'b2']);
});
