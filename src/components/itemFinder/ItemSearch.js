import { formatPrice } from '../../services/itemFinder/format';
import { summarizeItem } from '../../services/itemFinder/provenance';
import ApiErrorNotice from './ApiErrorNotice';
import AvailabilityIcons from './AvailabilityIcons';
import ItemChips from './ItemChips';
import ItemImage from './ItemImage';
import { formatStat } from './statFormat';
import { itemTone } from './tone';
import { useItemFinderText } from './useItemFinderText';

export const ITEM_SIZES = Array.from({ length: 13 }, (_, size) => String(size));

function FilterSelect({ label, value, onChange, children }) {
  return (
    <label className="form-control block min-w-0">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-base-content/60">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="select select-bordered select-sm w-full"
      >
        {children}
      </select>
    </label>
  );
}

function ResultRow({ item, selected, onSelect }) {
  const { text, fmt } = useItemFinderText();
  const summary = summarizeItem(item);
  const headline = item.stats?.headline;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(item)}
      style={itemTone(item.stats)}
      className={`w-full rounded-lg border p-3 pl-4 text-left transition-colors ${
        selected
          ? 'if-selected bg-base-100'
          : 'if-bar border-base-300 bg-base-100/70 hover:border-base-content/30 hover:bg-base-100'
      }`}
    >
      <span className="flex items-start justify-between gap-3">
        <ItemImage src={item.image?.thumb} />
        <span className="min-w-0 flex-1">
          <span className="block font-semibold leading-tight">{item.name}</span>
          <span className="mt-0.5 block truncate text-xs text-base-content/70">
            {[item.typeLabel, item.subTypeLabel, item.manufacturer].filter(Boolean).join(' · ')}
          </span>
        </span>
        {headline ? (
          <span className="shrink-0 text-right">
            <span className="if-text block whitespace-nowrap font-mono text-sm font-semibold tabular-nums">
              {formatStat(headline)}
            </span>
            <span className="block text-[0.65rem] uppercase tracking-[0.12em] text-base-content/60">
              {text.stats[headline.key]}
            </span>
          </span>
        ) : null}
      </span>
      <span className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <ItemChips item={item} />
        <span className="ml-auto flex items-center gap-2">
          {summary.offerCount ? (
            <span className="whitespace-nowrap font-mono text-xs tabular-nums text-base-content/80">
              {fmt('cheapestFrom', {
                price: formatPrice(summary.cheapestPrice),
              })}
            </span>
          ) : null}
          <AvailabilityIcons item={item} />
        </span>
      </span>
    </button>
  );
}

function ItemSearch({
  draft,
  onDraftChange,
  category,
  onCategoryChange,
  itemSize,
  onItemSizeChange,
  sort,
  onSortChange,
  baseOnly,
  onBaseOnlyChange,
  search,
  isSelected,
  onSelect,
}) {
  const { text, fmt } = useItemFinderText();

  let statusLine = null;
  if (!search.enabled) {
    statusLine = text.minChars;
  } else if (search.status === 'loading') {
    statusLine = text.searching;
  } else if (search.status === 'done' && !search.items.length) {
    statusLine = text.noResults;
  } else if (search.status === 'done') {
    statusLine = fmt('resultsCount', {
      shown: search.items.length,
      total: search.total,
    });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4">
        <label className="form-control block">
          <span className="mb-1 block text-sm font-semibold">{text.searchLabel}</span>
          <input
            type="search"
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder={text.searchPlaceholder}
            className="input input-bordered w-full"
            autoComplete="off"
            spellCheck="false"
          />
        </label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          <FilterSelect label={text.categoryLabel} value={category} onChange={onCategoryChange}>
            {text.categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect label={text.sizeLabel} value={itemSize} onChange={onItemSizeChange}>
            <option value="">{text.sizeAny}</option>
            {ITEM_SIZES.map((size) => (
              <option key={size} value={size}>
                S{size}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect label={text.sortLabel} value={sort} onChange={onSortChange}>
            {text.sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterSelect>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            checked={baseOnly}
            onChange={(event) => onBaseOnlyChange(event.target.checked)}
          />
          <span>{text.baseOnlyLabel}</span>
        </label>
      </div>

      <p className="min-h-5 text-sm text-base-content/70" aria-live="polite">
        {statusLine}
      </p>

      {search.error ? <ApiErrorNotice error={search.error} onRetry={search.retry} /> : null}

      {search.items.length ? (
        <ul className="space-y-2">
          {search.items.map((item) => (
            <li key={item.uuid}>
              <ResultRow item={item} selected={isSelected(item)} onSelect={onSelect} />
            </li>
          ))}
        </ul>
      ) : null}

      {search.canLoadMore ? (
        <button
          type="button"
          className="btn btn-outline btn-sm w-full"
          onClick={search.loadMore}
          disabled={search.loadingMore}
        >
          {search.loadingMore ? text.searching : text.loadMore}
        </button>
      ) : null}
    </div>
  );
}

export default ItemSearch;
