import { useId, useMemo, useState } from 'react';
import { rewardItems } from '../../services/itemFinder/wikelo';
import ApiErrorNotice from './ApiErrorNotice';
import { InputTrace } from './AcquisitionPanel';
import Icon from './icons';
import OpenItemLink from './OpenItemLink';
import { tone } from './tone';
import { useItemFinderText } from './useItemFinderText';
import { useWikeloIndex } from './useTradeIndexes';
import WikeloContractCard, { inputAmountLabel } from './WikeloContractCard';

const KIND_ORDER = ['ship', 'vehicle', 'gear', 'currency', 'other'];

function matches(contract, query) {
  if (!query) {
    return true;
  }

  const haystack = [
    contract.title,
    ...rewardItems(contract).map((item) => item.name),
    ...contract.blueprints.map((blueprint) => blueprint.name),
    ...contract.inputs.map((input) => input.name),
  ]
    .join(' ')
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

// What Wikelo hands out for the "Favours" trades (Wikelo Favor, Polaris Bit...), with how to earn and spend each.
export function wikeloCurrencies(index) {
  const currencies = new Map();

  index.contracts
    .filter((contract) => contract.kind === 'currency' && contract.available)
    .forEach((contract) => {
      rewardItems(contract).forEach((item) => {
        if (!currencies.has(item.id)) {
          currencies.set(item.id, { id: item.id, name: item.name });
        }
      });
    });

  return [...currencies.values()].map((currency) => ({
    ...currency,
    earn: index.giving(currency.id).filter((contract) => contract.available),
    spend: index.using(currency.id).filter((contract) => contract.available),
  }));
}

// End labels hang inward from their marker so they never stick out of the card on narrow screens.
function labelPosition(share) {
  if (share <= 0.1) {
    return 'left-0 text-left';
  }

  return share >= 0.9 ? 'right-0 text-right' : 'left-1/2 -translate-x-1/2';
}

function ReputationLadder({ ladder }) {
  const { text } = useItemFinderText();
  const top = Math.max(...ladder.map((standing) => standing.reputation), 1);

  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-5" style={tone('wikelo')}>
      <h3 className="if-text text-sm font-semibold uppercase tracking-[0.25em]">{text.wikeloLadderTitle}</h3>
      <p className="mt-1 text-sm text-base-content/60">{text.wikeloLadderNote}</p>
      <div className="relative mx-2 mt-8 mb-10 h-1.5 rounded-full bg-base-300">
        <div className="if-dot absolute inset-y-0 left-0 right-0 rounded-full opacity-60" />
        {ladder.map((standing) => (
          <div
            key={standing.name}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: `${(standing.reputation / top) * 100}%` }}
          >
            <span className="if-dot mx-auto block h-3.5 w-3.5 rounded-full border-2 border-base-100" />
            <span className={`absolute top-5 w-28 text-xs leading-tight ${labelPosition(standing.reputation / top)}`}>
              <span className="block font-semibold">{standing.name}</span>
              <span className="font-mono text-base-content/60">{standing.reputation}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CurrencyCard({ currency }) {
  const { text, fmt } = useItemFinderText();

  return (
    <article className="if-tint rounded-box border p-4" style={tone('wikelo')}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <OpenItemLink id={currency.id} className="if-text link link-hover font-semibold">
          {currency.name}
        </OpenItemLink>
        <span className="text-xs text-base-content/60">
          {fmt('wikeloCurrencySpend', { count: currency.spend.length })}
        </span>
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
        {text.wikeloCurrencyEarn}
      </p>
      <ul className="mt-1.5 space-y-1 text-sm">
        {currency.earn.map((contract) => (
          <li key={contract.id} className="flex flex-wrap items-baseline justify-between gap-2">
            <span>{contract.title}</span>
            <span className="font-mono text-xs text-base-content/70">
              {contract.inputs.map((input) => `${input.name} ${inputAmountLabel(input)}`).join(' + ')}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function WikeloEmporium() {
  const { text, fmt } = useItemFinderText();
  const state = useWikeloIndex();
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('');
  const [showRetired, setShowRetired] = useState(false);
  const filterId = useId();
  const index = state.status === 'done' ? state.data : null;

  const filtered = useMemo(
    () =>
      (index?.contracts ?? []).filter(
        (contract) =>
          (showRetired || contract.available) && (!kind || contract.kind === kind) && matches(contract, query.trim())
      ),
    [index, showRetired, kind, query]
  );

  if (state.status === 'loading') {
    return <p className="text-sm text-base-content/70">{text.indexLoading}</p>;
  }

  if (state.status === 'error') {
    return <ApiErrorNotice error={state.error} onRetry={state.retry} />;
  }

  const visibleTotal = index.contracts.filter((contract) => showRetired || contract.available).length;
  const intro = index.contracts.find((contract) => contract.kind === 'other' && contract.onceOnly);
  const renderTrace = (input) => <InputTrace kind={input.kind} id={input.id} name={input.name} depth={0} path={[]} />;
  const fetchedDate = index.fetchedAt ? index.fetchedAt.slice(0, 10) : '—';

  return (
    <div className="space-y-6">
      <div className="max-w-3xl space-y-2">
        <p className="text-base leading-relaxed text-base-content/75">{text.wikeloIntroText}</p>
        {intro ? <p className="text-sm text-base-content/60">{fmt('wikeloIntro', { title: intro.title })}</p> : null}
        <p className="text-xs text-base-content/50">
          {fmt('wikeloSnapshot', { version: index.gameVersion ?? '—', date: fetchedDate })}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <ReputationLadder ladder={index.ladder} />
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-base-content/70">
            {text.wikeloCurrencyTitle}
          </h3>
          {wikeloCurrencies(index).map((currency) => (
            <CurrencyCard key={currency.id} currency={currency} />
          ))}
        </section>
      </div>

      <div className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4">
        <label htmlFor={filterId} className="block text-sm font-semibold">
          {text.wikeloFilter}
        </label>
        <input
          id={filterId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={text.wikeloFilterPlaceholder}
          className="input input-bordered w-full"
          autoComplete="off"
        />
        <div className="flex flex-wrap items-center gap-2">
          {['', ...KIND_ORDER].map((value) => (
            <button
              key={value || 'all'}
              type="button"
              aria-pressed={kind === value}
              onClick={() => setKind(value)}
              style={tone('wikelo')}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                kind === value ? 'if-chip font-semibold' : 'border-base-300 hover:border-base-content/40'
              }`}
            >
              {value ? text.wikeloKinds[value] : text.wikeloKindAll}
            </button>
          ))}
          <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={showRetired}
              onChange={(event) => setShowRetired(event.target.checked)}
            />
            {text.wikeloShowRetired}
          </label>
        </div>
        <p className="text-sm text-base-content/60" aria-live="polite">
          {fmt('wikeloCount', { shown: filtered.length, total: visibleTotal })}
        </p>
      </div>

      {filtered.length ? (
        KIND_ORDER.map((group) => {
          const contracts = filtered.filter((contract) => contract.kind === group);

          return contracts.length ? (
            <section key={group} className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-base-content/70">
                <Icon name="wikelo" />
                {text.wikeloKinds[group]}
                <span className="font-mono text-xs normal-case tracking-normal text-base-content/50">
                  {contracts.length}
                </span>
              </h3>
              <div className="space-y-2">
                {contracts.map((contract) => (
                  <WikeloContractCard
                    key={contract.id}
                    contract={contract}
                    renderTrace={renderTrace}
                    imageFor={index.imageFor}
                    collapsible
                  />
                ))}
              </div>
            </section>
          ) : null;
        })
      ) : (
        <p className="text-sm text-base-content/70">{text.wikeloEmpty}</p>
      )}
    </div>
  );
}

export default WikeloEmporium;
