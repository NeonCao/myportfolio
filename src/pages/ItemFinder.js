import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { wikiApi } from '../services/itemFinder/wikiApi';
import { MISSING, formatPrice } from '../services/itemFinder/format';
import { summarizeItem } from '../services/itemFinder/provenance';
import AcquisitionPanel, { sectionId } from '../components/itemFinder/AcquisitionPanel';
import ApiErrorNotice from '../components/itemFinder/ApiErrorNotice';
import FanDisclaimer from '../components/itemFinder/FanDisclaimer';
import Icon from '../components/itemFinder/icons';
import ItemChips from '../components/itemFinder/ItemChips';
import ItemImage from '../components/itemFinder/ItemImage';
import ItemSearch, { ITEM_SIZES } from '../components/itemFinder/ItemSearch';
import { lootPoolLabel } from '../components/itemFinder/LootPanel';
import RelatedTools from '../components/itemFinder/RelatedTools';
import StatsPanel from '../components/itemFinder/StatsPanel';
import { formatStat } from '../components/itemFinder/statFormat';
import { tradeSourceCounts } from '../components/itemFinder/tradeSources';
import { useMissionRewardIndex, useWikeloIndex } from '../components/itemFinder/useTradeIndexes';
import WikeloEmporium from '../components/itemFinder/WikeloEmporium';
import { itemTone, tone } from '../components/itemFinder/tone';
import { useAsync } from '../components/itemFinder/useAsync';
import { useItemFinderText } from '../components/itemFinder/useItemFinderText';
import { useItemSearch } from '../components/itemFinder/useItemSearch';

const SEARCH_DEBOUNCE_MS = 350;
const SINGLE_COLUMN_QUERY = '(max-width: 1023px)';
const SOURCE_LEGEND = [
  { key: 'buy', label: 'glanceBuy' },
  { key: 'craft', label: 'glanceCraft' },
  { key: 'raw', label: 'glanceRaw' },
  { key: 'loot', label: 'glanceLoot' },
  { key: 'wikelo', label: 'glanceWikelo' },
  { key: 'mission', label: 'glanceMissions' },
];
const VIEWS = ['items', 'wikelo'];

function useDebounced(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// Tiles jump to their section; a tile whose section is not rendered (no raw material) stays static.
function GlanceTile({ icon, label, value, active, target }) {
  const Tile = target ? 'button' : 'div';
  const interactive = target
    ? {
        type: 'button',
        onClick: () =>
          document.getElementById(sectionId(target))?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      }
    : {};

  return (
    <Tile
      {...interactive}
      style={tone(icon)}
      className={`rounded-lg border px-3 py-2 text-left transition-[transform,border-color] ${
        target ? 'hover:-translate-y-0.5' : ''
      } ${active ? 'if-glow' : 'border-base-300 bg-base-100/60 text-base-content/50'}`}
    >
      <span
        className={`flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.18em] ${
          active ? 'if-text' : 'text-base-content/50'
        }`}
      >
        <span className={`grid h-5 w-5 place-items-center rounded-md ${active ? 'if-badge' : ''}`}>
          <Icon name={icon} className="h-3.5 w-3.5" />
        </span>
        {label}
      </span>
      <span className="mt-0.5 block truncate text-sm font-semibold">{value}</span>
    </Tile>
  );
}

// A known loot pool is more useful at a glance than a plain "Lootable".
function lootGlance(item, summary, text) {
  if (!summary.lootable) {
    return text.lootNoShort;
  }

  const pools = item.loot?.pools ?? [];
  return pools.length ? pools.map((tag) => lootPoolLabel(tag, text)).join(', ') : text.badgeLootable;
}

// null counts are unknown: show loading or a dash rather than a false "None".
function countLabel(count, status, key, text, fmt) {
  if (count === null) {
    return status === 'loading' ? text.pendingShort : MISSING;
  }

  return count ? fmt(key, { count }) : text.noneShort;
}

function CopyLinkButton() {
  const { text } = useItemFinderText();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = () => {
    navigator.clipboard?.writeText(window.location.href).then(
      () => setCopied(true),
      () => setCopied(false)
    );
  };

  return (
    <button type="button" className="btn btn-xs btn-ghost gap-1" onClick={copy} aria-live="polite">
      <Icon name={copied ? 'check' : 'link'} className="h-3.5 w-3.5" />
      {copied ? text.linkCopied : text.copyLink}
    </button>
  );
}

// Rendered with key={slug}, so a new item always starts from a fresh loading state.
function SelectedItem({ slug, focusRequested, onFocusHandled, onLoaded }) {
  const { text, fmt } = useItemFinderText();
  const state = useAsync(() => wikiApi.getItem(slug), [slug]);
  const wikelo = useWikeloIndex();
  const missions = useMissionRewardIndex();
  const headingRef = useRef(null);

  useEffect(() => {
    onLoaded(state.status === 'done' ? state.data : null);
  }, [state.status, state.data, onLoaded]);

  useEffect(() => () => onLoaded(null), [onLoaded]);

  // Focus only answers an explicit selection, never a remount from Back/Forward.
  useEffect(() => {
    if (state.status !== 'done' || !focusRequested) {
      return;
    }

    onFocusHandled();
    const heading = headingRef.current;

    if (heading) {
      heading.focus({ preventScroll: true });
      const { top } = heading.getBoundingClientRect();

      if (window.matchMedia?.(SINGLE_COLUMN_QUERY).matches || top < 0 || top > window.innerHeight) {
        heading.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  }, [state.status, focusRequested, onFocusHandled]);

  if (state.status === 'loading') {
    return <p className="text-sm text-base-content/70">{text.loadingItem}</p>;
  }

  if (state.status === 'error') {
    return <ApiErrorNotice error={state.error} onRetry={state.retry} />;
  }

  const item = state.data;
  const summary = summarizeItem(item);
  const headline = item.stats.headline;
  const counts = tradeSourceCounts(item, wikelo, missions);

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <ItemImage src={item.image?.thumb} size="lg" className="w-full sm:w-56" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="text-xs uppercase tracking-[0.25em] text-base-content/60">
              {[item.typeLabel, item.subTypeLabel].filter(Boolean).join(' · ')}
            </p>
            <h2 ref={headingRef} tabIndex={-1} className="scroll-mt-24 text-3xl font-bold leading-tight outline-none">
              {item.name}
            </h2>
            <p className="text-sm text-base-content/75">
              {[item.manufacturer, item.rarity].filter(Boolean).join(' · ')}
            </p>
            <ItemChips item={item} className="pt-1" />
          </div>
          {headline ? (
            <div className="if-glow rounded-lg border px-4 py-3 text-right" style={itemTone(item.stats)}>
              <p className="font-mono text-2xl font-bold tabular-nums">{formatStat(headline)}</p>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-base-content/60">
                {text.stats[headline.key]}
              </p>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <GlanceTile
            icon="buy"
            target="buy"
            label={text.glanceBuy}
            active={summary.offerCount > 0}
            value={
              summary.offerCount
                ? fmt('cheapestFrom', {
                    price: formatPrice(summary.cheapestPrice),
                  })
                : text.notSold
            }
          />
          <GlanceTile
            icon="craft"
            target="craft"
            label={text.glanceCraft}
            active={summary.craftable}
            value={summary.craftable ? text.badgeCraftable : text.noBlueprint}
          />
          <GlanceTile
            icon="raw"
            target={summary.harvestable ? 'raw' : null}
            label={text.glanceRaw}
            active={summary.harvestable}
            value={summary.harvestable ? text.rawYes : MISSING}
          />
          <GlanceTile
            icon="loot"
            target="loot"
            label={text.glanceLoot}
            active={summary.lootable}
            value={lootGlance(item, summary, text)}
          />
          <GlanceTile
            icon="wikelo"
            target="wikelo"
            label={text.glanceWikelo}
            active={counts.wikelo > 0}
            value={countLabel(counts.wikelo, wikelo.status, 'tradesCount', text, fmt)}
          />
          <GlanceTile
            icon="mission"
            target="mission"
            label={text.glanceMissions}
            active={counts.missions > 0}
            value={countLabel(counts.missions, missions.status, 'missionsCount', text, fmt)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-base-300 pt-3 text-xs text-base-content/60">
          {item.className ? (
            <span>
              {text.classNameLabel} <span className="font-mono text-base-content/80">{item.className}</span>
            </span>
          ) : null}
          <span>
            {text.uuidLabel} <span className="break-all font-mono text-base-content/80">{item.uuid}</span>
          </span>
          {item.version ? (
            <span className="rounded-md border border-base-300 px-1.5 py-0.5">
              {fmt('gameBuild', { version: item.version })}
            </span>
          ) : null}
          <span className="ml-auto flex items-center gap-1">
            <CopyLinkButton />
            {item.webUrl ? (
              <a href={item.webUrl} target="_blank" rel="noreferrer" className="btn btn-xs btn-ghost gap-1">
                <Icon name="external" className="h-3.5 w-3.5" />
                {text.openWiki}
              </a>
            ) : null}
          </span>
        </div>
      </header>

      {item.stats.groups.length ? (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-base-content/70">
            {text.statsTitle}
          </h3>
          <StatsPanel stats={item.stats} />
        </section>
      ) : null}

      <AcquisitionPanel key={item.uuid} item={item} />
    </div>
  );
}

// Hand-edited links fall back to the defaults instead of sending unknown filters to the API.
function allowed(value, options, fallback) {
  return options.includes(value) ? value : fallback;
}

function ItemFinder() {
  const { text, fmt } = useItemFinderText();
  const [params, setParams] = useSearchParams();
  const urlQuery = params.get('q') ?? '';
  const category = allowed(
    params.get('cat'),
    text.categories.map((option) => option.value),
    ''
  );
  const baseOnly = params.get('base') === '1';
  const itemSize = allowed(params.get('size'), ITEM_SIZES, '');
  const sort = allowed(
    params.get('sort'),
    text.sortOptions.map((option) => option.value),
    'name'
  );
  const selectedSlug = params.get('item');
  const view = allowed(params.get('view'), VIEWS, 'items');

  const [draft, setDraft] = useState(urlQuery);
  const debouncedDraft = useDebounced(draft, SEARCH_DEBOUNCE_MS);
  const [selectedItem, setSelectedItem] = useState(null);
  const [focusTarget, setFocusTarget] = useState(null);
  const clearFocusTarget = useCallback(() => setFocusTarget(null), []);
  const writtenQuery = useRef(urlQuery);

  const updateParams = useCallback(
    (changes, { replace = true } = {}) => {
      setParams(
        (previous) => {
          const next = new URLSearchParams(previous);

          Object.entries(changes).forEach(([key, value]) => {
            if (value === null || value === '' || value === false) {
              next.delete(key);
            } else {
              next.set(key, value === true ? '1' : value);
            }
          });

          return next;
        },
        { replace }
      );
    },
    [setParams]
  );

  // Typing -> URL (debounced). Only writes when the typed query actually changed.
  useEffect(() => {
    const next = debouncedDraft.trim();

    if (next === writtenQuery.current) {
      return;
    }

    writtenQuery.current = next;
    updateParams({ q: next });
  }, [debouncedDraft, updateParams]);

  // URL -> input, for browser back/forward and edited links.
  useEffect(() => {
    if (urlQuery !== writtenQuery.current) {
      writtenQuery.current = urlQuery;
      setDraft(urlQuery);
    }
  }, [urlQuery]);

  // ?item= holds a slug (picked from the list) or a uuid (opened from a trade card); both mean the same item.
  const isSelected = useCallback(
    (item) =>
      Boolean(selectedSlug) &&
      (item.slug === selectedSlug ||
        item.uuid === selectedSlug ||
        (selectedItem && (item.uuid === selectedItem.uuid || item.slug === selectedItem.slug))),
    [selectedSlug, selectedItem]
  );

  // Links from trade cards pass { focusItem } in the navigation state so they focus like a list pick.
  const location = useLocation();
  useEffect(() => {
    if (location.state?.focusItem) {
      setFocusTarget(location.state.focusItem);
    }
  }, [location.key, location.state]);

  const handleSelect = useCallback(
    (item) => {
      if (!isSelected(item)) {
        updateParams({ item: item.slug }, { replace: false });
        setFocusTarget(item.slug);
      } else {
        setFocusTarget(selectedSlug);
      }
    },
    [isSelected, selectedSlug, updateParams]
  );

  const search = useItemSearch({
    query: debouncedDraft,
    category,
    baseOnly,
    itemSize,
    sort,
  });
  const version = selectedItem?.version ?? search.items[0]?.version ?? null;

  return (
    <main className="item-finder min-h-screen bg-base-200">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-10 max-w-3xl">
          <p
            className="if-chip inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em]"
            style={tone('energy')}
          >
            <span className="if-dot h-1.5 w-1.5 animate-pulse rounded-full" aria-hidden="true" />
            {text.eyebrow}
          </p>
          <h1 className="if-title mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">{text.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-base-content/75 sm:text-lg">{text.intro}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={text.legendLabel}>
            {SOURCE_LEGEND.map((source) => (
              <li
                key={source.key}
                className="if-chip inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm"
                style={tone(source.key)}
              >
                <Icon name={source.key} className="h-4 w-4" />
                {text[source.label]}
              </li>
            ))}
          </ul>
        </div>

        <div role="group" aria-label={text.viewLabel} className="mb-6 flex flex-wrap gap-2">
          {VIEWS.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={view === value}
              onClick={() => {
                if (value !== view) {
                  updateParams({ view: value === 'items' ? null : value }, { replace: false });
                }
              }}
              style={tone(value === 'wikelo' ? 'wikelo' : 'energy')}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                view === value ? 'if-chip' : 'border-base-300 bg-base-100/70 hover:border-base-content/40'
              }`}
            >
              <Icon name={value === 'wikelo' ? 'wikelo' : 'buy'} className="h-4 w-4" />
              {value === 'wikelo' ? text.viewWikelo : text.viewItems}
            </button>
          ))}
        </div>

        {view === 'wikelo' ? (
          <WikeloEmporium />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start">
            <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1">
              <ItemSearch
                draft={draft}
                onDraftChange={setDraft}
                category={category}
                onCategoryChange={(value) => updateParams({ cat: value })}
                itemSize={itemSize}
                onItemSizeChange={(value) => updateParams({ size: value })}
                sort={sort}
                onSortChange={(value) => updateParams({ sort: value === 'name' ? null : value })}
                baseOnly={baseOnly}
                onBaseOnlyChange={(value) => updateParams({ base: value })}
                search={search}
                isSelected={isSelected}
                onSelect={handleSelect}
              />
            </div>

            <div className="min-h-[16rem] rounded-box border border-base-300 bg-base-100 p-5 shadow-xl sm:p-7">
              <p className="sr-only" aria-live="polite">
                {selectedSlug && selectedItem ? fmt('itemLoaded', { name: selectedItem.name }) : ''}
              </p>
              {selectedSlug ? (
                <SelectedItem
                  key={selectedSlug}
                  slug={selectedSlug}
                  focusRequested={focusTarget === selectedSlug}
                  onFocusHandled={clearFocusTarget}
                  onLoaded={setSelectedItem}
                />
              ) : (
                <p className="text-base-content/70">{text.selectPrompt}</p>
              )}
            </div>
          </div>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <RelatedTools />
          <FanDisclaimer version={version} />
        </div>
      </section>
    </main>
  );
}

export default ItemFinder;
