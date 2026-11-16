import { useId, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MISSING, formatDuration, formatNumber, formatPercent, formatPrice } from '../../services/itemFinder/format';
import { CONTRACT_SORTS, filterContracts, planTrack, trackLabel } from '../../services/itemFinder/missions';
import ApiErrorNotice from './ApiErrorNotice';
import Icon from './icons';
import OpenItemLink from './OpenItemLink';
import { systemTone, tone } from './tone';
import { useItemFinderText } from './useItemFinderText';
import { useMissionIndex } from './useTradeIndexes';

const PAGE_SIZE = 30;
const WIKI_MISSION_URL = 'https://api.star-citizen.wiki/missions/';
const EMPTY_FILTERS = {
  query: '',
  faction: '',
  track: '',
  system: '',
  type: '',
  legality: '',
  blueprintsOnly: false,
  sort: 'reputation',
};

const span = (value, format) => {
  if (!value) {
    return null;
  }

  return value.min === value.max ? format(value.max) : `${format(value.min)} – ${format(value.max)}`;
};

const count = (value) => formatNumber(value, { maximumFractionDigits: 0 });

function payLabel(contract, text) {
  if (!contract.pay) {
    return text.grinderPayVaries;
  }

  return contract.currency === 'aUEC'
    ? span(contract.pay, formatPrice)
    : `${span(contract.pay, count)} ${contract.currency}`;
}

function tierName(tier, text, fmt) {
  if (!tier) {
    return text.grinderNoStanding;
  }

  return tier.name ?? fmt('grinderTierUnnamed', { rep: count(tier.rep) });
}

function Chip({ children, toneName, style }) {
  return (
    <span
      className="if-chip inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
      style={style ?? tone(toneName)}
    >
      {children}
    </span>
  );
}

function FilterSelect({ label, value, onChange, children }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">{label}</span>
      <select
        className="select select-bordered select-sm w-full"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </select>
    </label>
  );
}

// One line of a tier's shortlist: a contract, what it gives, and a button that finds it in the list below.
function PlanLine({ contract, onShow, text }) {
  return (
    <li className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
      <button type="button" onClick={() => onShow(contract)} className="link link-hover min-w-0 text-left text-sm">
        {contract.title}
      </button>
      <span className="font-mono text-xs tabular-nums text-base-content/70">
        {contract.rep ? `+${span(contract.rep, count)} ${text.grinderRepUnit}` : null}
        {contract.rep && contract.pay ? ' · ' : null}
        {contract.pay ? payLabel(contract, text) : null}
      </span>
    </li>
  );
}

function TierCard({ step, onShow }) {
  const { text, fmt } = useItemFinderText();
  const fastest = step.bestReputation[0];

  return (
    <li className="if-bar space-y-3 rounded-lg border border-base-300 bg-base-100 p-4" style={tone('mission')}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-base font-semibold">{tierName(step.tier, text, fmt)}</h4>
        <p className="font-mono text-xs tabular-nums text-base-content/60">
          {fmt('grinderTierFrom', { rep: count(step.tier.rep) })} ·{' '}
          {fmt('grinderOffered', { count: step.offered.length, unlocked: step.unlocked.length })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">
            {text.grinderBestRep}
          </p>
          {step.bestReputation.length ? (
            <ul className="space-y-1">
              {step.bestReputation.map((contract) => (
                <PlanLine key={contract.key} contract={contract} onShow={onShow} text={text} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-base-content/60">{text.grinderNothing}</p>
          )}
        </div>
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">
            {text.grinderBestPay}
          </p>
          {step.bestPay.length ? (
            <ul className="space-y-1">
              {step.bestPay.map((contract) => (
                <PlanLine key={contract.key} contract={contract} onShow={onShow} text={text} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-base-content/60">{text.grinderNoFixedPay}</p>
          )}
        </div>
      </div>

      {step.next && fastest ? (
        <p className="border-t border-base-300 pt-2 text-sm text-base-content/75">
          {fmt('grinderRunsToNext', {
            runs: count(step.runsToNext),
            title: fastest.title,
            next: tierName(step.next, text, fmt),
            rep: count(step.reputationToNext),
          })}
        </p>
      ) : null}
      {!step.next ? (
        <p className="border-t border-base-300 pt-2 text-sm text-base-content/60">{text.grinderTopTier}</p>
      ) : null}
    </li>
  );
}

function ContractRow({ contract, open, onToggle }) {
  const { text, fmt } = useItemFinderText();
  const panelId = useId();
  const facts = [
    contract.minutes ? [text.grinderTimeLimit, span(contract.minutes, (value) => formatDuration(value * 60))] : null,
    contract.cooldown ? [text.grinderCooldown, span(contract.cooldown, formatDuration)] : null,
    contract.enemies ? [text.grinderEnemies, span(contract.enemies, count)] : null,
    contract.cargo.length ? [text.grinderCargo, contract.cargo.join(', ')] : null,
    contract.tierMax ? [text.grinderOfferedUntil, tierName(contract.tierMax, text, fmt)] : null,
  ].filter(Boolean);

  return (
    <li className="rounded-lg border border-base-300 bg-base-100">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full flex-wrap items-start justify-between gap-x-4 gap-y-2 p-3 text-left sm:p-4"
      >
        <span className="min-w-0 flex-1 space-y-1.5">
          <span className="block text-base font-semibold leading-snug">
            {contract.title}
            {contract.count > 1 ? (
              <span className="ml-2 text-xs font-normal text-base-content/60">
                {fmt('grinderVariants', { count: contract.count })}
              </span>
            ) : null}
          </span>
          <span className="block text-sm text-base-content/70">
            {[contract.giver, contract.faction && contract.faction !== contract.giver ? contract.faction : null]
              .filter(Boolean)
              .join(' · ') || text.grinderNoGiver}
          </span>
          <span className="flex flex-wrap gap-1.5">
            <Chip toneName="mission">{tierName(contract.tier, text, fmt)}</Chip>
            {contract.type ? <Chip toneName="neutral">{contract.type}</Chip> : null}
            {contract.systems.map((system) => (
              <Chip key={system} style={systemTone(system)}>
                {system}
              </Chip>
            ))}
            {contract.illegal ? <Chip toneName="thermal">{text.grinderIllegal}</Chip> : null}
            {contract.blueprints.length ? <Chip toneName="craft">{text.grinderBlueprint}</Chip> : null}
            {contract.once ? <Chip toneName="loot">{text.grinderOnce}</Chip> : null}
            {contract.chain ? <Chip toneName="wikelo">{text.grinderChain}</Chip> : null}
            {contract.shareable ? <Chip toneName="buy">{text.grinderShareable}</Chip> : null}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className="block font-mono text-sm font-semibold tabular-nums">{payLabel(contract, text)}</span>
          <span className="block font-mono text-xs tabular-nums text-base-content/70">
            {contract.rep ? `+${span(contract.rep, count)} ${text.grinderRepUnit}` : text.grinderNoRep}
          </span>
        </span>
      </button>

      {open ? (
        <div id={panelId} className="space-y-3 border-t border-base-300 p-3 text-sm sm:p-4">
          {contract.blueprints.map((pool, index) => (
            <div key={index}>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/60">
                {fmt(pool.items.length > 1 ? 'grinderBlueprintPool' : 'grinderBlueprintSingle', {
                  chance: pool.chance === null ? MISSING : formatPercent(pool.chance),
                  count: pool.items.length,
                })}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {pool.items.map((item) => (
                  <li key={item.id}>
                    <OpenItemLink
                      id={item.id}
                      className="if-chip inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs hover:underline"
                      style={tone('craft')}
                    >
                      <Icon name="craft" className="h-3 w-3" />
                      {item.name}
                    </OpenItemLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {facts.length ? (
            <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
              {facts.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-3 border-b border-dashed border-base-300 py-1">
                  <dt className="text-base-content/70">{label}</dt>
                  <dd className="text-right font-mono text-xs tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {contract.slug ? (
            <a
              href={`${WIKI_MISSION_URL}${encodeURIComponent(contract.slug)}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-xs btn-ghost gap-1"
            >
              <Icon name="external" className="h-3.5 w-3.5" />
              {text.grinderWiki}
            </a>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

// Looks up contracts: which ones move a reputation track fastest at each tier, what they pay, and which
// blueprints they can award.
function MissionGrinder() {
  const { text, fmt } = useItemFinderText();
  const state = useMissionIndex();
  const index = state.status === 'done' ? state.data : null;
  const [trackKey, setTrackKey] = useState('');
  const [params] = useSearchParams();
  // An item page can send its name along (?mq=) to list the contracts that award its blueprint.
  const [filters, setFilters] = useState(() => {
    const query = params.get('mq') ?? '';
    return { ...EMPTY_FILTERS, query, blueprintsOnly: Boolean(query) };
  });
  const [shown, setShown] = useState(PAGE_SIZE);
  const [openKey, setOpenKey] = useState(null);
  const listRef = useRef(null);
  const searchId = useId();

  const track = useMemo(
    () => index?.tracks.find((entry) => entry.key === trackKey) ?? index?.tracks[0] ?? null,
    [index, trackKey]
  );
  const plan = useMemo(() => (track ? planTrack(track) : []), [track]);
  const results = useMemo(() => (index ? filterContracts(index.contracts, filters) : []), [index, filters]);

  if (state.status === 'loading') {
    return <p className="text-sm text-base-content/70">{text.indexLoading}</p>;
  }

  if (state.status === 'error') {
    return <ApiErrorNotice error={state.error} onRetry={state.retry} />;
  }

  if (!index.ready) {
    return <p className="text-sm text-base-content/70">{text.grinderNotBuilt}</p>;
  }

  const update = (changes) => {
    setFilters((current) => ({ ...current, ...changes }));
    setShown(PAGE_SIZE);
  };

  const showContract = (contract) => {
    update({ ...EMPTY_FILTERS, query: contract.title, faction: contract.faction ?? '', track: contract.track ?? '' });
    setOpenKey(contract.key);
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filtered = Object.entries(filters).some(([key, value]) => key !== 'sort' && value);

  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-2">
        <p className="text-base leading-relaxed text-base-content/75">{text.grinderIntro}</p>
        <p className="text-xs text-base-content/50">
          {fmt('grinderSnapshot', {
            contracts: count(index.contracts.length),
            missions: count(index.missionCount),
            version: index.gameVersion ?? MISSING,
            date: index.fetchedAt ? index.fetchedAt.slice(0, 10) : MISSING,
          })}
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-base-content/70">
              {text.grinderPlanTitle}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-base-content/70">{text.grinderPlanIntro}</p>
          </div>
          <div className="w-full sm:w-80">
            <FilterSelect label={text.grinderTrack} value={track?.key ?? ''} onChange={setTrackKey}>
              {index.tracks.map((entry) => (
                <option key={entry.key} value={entry.key}>
                  {fmt('grinderTrackOption', { label: entry.label, count: entry.contracts.length })}
                </option>
              ))}
            </FilterSelect>
          </div>
        </div>

        {track ? (
          <>
            {track.givers.length ? (
              <p className="text-sm text-base-content/70">
                {fmt('grinderGivers', { givers: track.givers.join(', ') })}
              </p>
            ) : null}
            <ol className="space-y-3">
              {plan.map((step) => (
                <TierCard key={step.tier.rep} step={step} onShow={showContract} />
              ))}
            </ol>
            <p className="text-xs leading-relaxed text-base-content/60">{text.grinderPlanNote}</p>
          </>
        ) : (
          <p className="text-sm text-base-content/70">{text.grinderNoTracks}</p>
        )}
      </section>

      <section ref={listRef} className="scroll-mt-24 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-base-content/70">
          {text.grinderListTitle}
        </h3>

        <div className="space-y-3 rounded-box border border-base-300 bg-base-100 p-4">
          <label htmlFor={searchId} className="block text-sm font-semibold">
            {text.grinderSearch}
          </label>
          <input
            id={searchId}
            type="search"
            value={filters.query}
            onChange={(event) => update({ query: event.target.value })}
            placeholder={text.grinderSearchPlaceholder}
            className="input input-bordered w-full"
            autoComplete="off"
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <FilterSelect
              label={text.grinderFaction}
              value={filters.faction}
              onChange={(value) => update({ faction: value, track: '' })}
            >
              <option value="">{text.grinderAny}</option>
              {index.factions.map((faction) => (
                <option key={faction} value={faction}>
                  {faction}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect
              label={text.grinderSystem}
              value={filters.system}
              onChange={(value) => update({ system: value })}
            >
              <option value="">{text.grinderAny}</option>
              {index.systems.map((system) => (
                <option key={system} value={system}>
                  {system}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect label={text.grinderType} value={filters.type} onChange={(value) => update({ type: value })}>
              <option value="">{text.grinderAny}</option>
              {index.types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </FilterSelect>
            <FilterSelect
              label={text.grinderLegality}
              value={filters.legality}
              onChange={(value) => update({ legality: value })}
            >
              <option value="">{text.grinderAny}</option>
              <option value="legal">{text.grinderLegal}</option>
              <option value="illegal">{text.grinderIllegal}</option>
            </FilterSelect>
            <FilterSelect label={text.grinderSort} value={filters.sort} onChange={(value) => update({ sort: value })}>
              {CONTRACT_SORTS.map((sort) => (
                <option key={sort} value={sort}>
                  {text.grinderSorts[sort]}
                </option>
              ))}
            </FilterSelect>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={filters.blueprintsOnly}
                onChange={(event) => update({ blueprintsOnly: event.target.checked })}
              />
              {text.grinderBlueprintsOnly}
            </label>
            {filters.track ? (
              <Chip toneName="mission">{fmt('grinderTrackFilter', { track: trackLabel(filters.track) })}</Chip>
            ) : null}
            {filtered ? (
              <button type="button" className="btn btn-xs btn-ghost" onClick={() => update(EMPTY_FILTERS)}>
                {text.grinderClear}
              </button>
            ) : null}
          </div>
        </div>

        <p className="text-sm text-base-content/70" aria-live="polite">
          {fmt('grinderResults', { shown: Math.min(shown, results.length), total: results.length })}
        </p>

        {results.length ? (
          <ul className="space-y-2">
            {results.slice(0, shown).map((contract) => (
              <ContractRow
                key={contract.key}
                contract={contract}
                open={openKey === contract.key}
                onToggle={() => setOpenKey((current) => (current === contract.key ? null : contract.key))}
              />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-base-content/70">{text.grinderNoResults}</p>
        )}

        {shown < results.length ? (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setShown((value) => value + PAGE_SIZE)}
          >
            {text.loadMore}
          </button>
        ) : null}
      </section>
    </div>
  );
}

export default MissionGrinder;
