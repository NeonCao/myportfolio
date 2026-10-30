import { useState } from 'react';
import { ageInDays, formatPrice, freshnessTone } from '../../services/itemFinder/format';
import { groupOffersBySystem, locationTrail, summarizeOffers } from '../../services/itemFinder/provenance';
import { systemLabel } from './statFormat';
import { systemTone, tone } from './tone';
import { useItemFinderText } from './useItemFinderText';

const COLLAPSED_COUNT = 4;

const TONE_CLASS = {
  fresh: 'bg-success',
  ok: 'bg-base-content/40',
  stale: 'bg-warning',
  unknown: 'bg-base-content/15',
};

export function useAgeLabel() {
  const { text, fmt } = useItemFinderText();

  return (days) => {
    if (days === null) {
      return text.ageUnknown;
    }

    if (days === 0) {
      return text.ageToday;
    }

    return days < 60 ? fmt('ageDays', { n: days }) : fmt('ageMonths', { n: Math.floor(days / 30) });
  };
}

function SummaryTile({ label, value, emphasis }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 ${emphasis ? 'if-glow' : 'border-base-300 bg-base-200/40'}`}
      style={emphasis ? tone('buy') : undefined}
    >
      <p className={`text-[0.7rem] uppercase tracking-[0.18em] ${emphasis ? 'if-text' : 'text-base-content/60'}`}>
        {label}
      </p>
      <p className={`mt-0.5 font-mono tabular-nums ${emphasis ? 'text-lg font-bold' : 'text-base'}`}>{value}</p>
    </div>
  );
}

// Where the median sits between the cheapest and the most expensive shop.
function PriceRange({ summary }) {
  const { text } = useItemFinderText();

  if (summary.min === null || summary.max === null || summary.max <= summary.min) {
    return null;
  }

  const medianAt = ((summary.median - summary.min) / (summary.max - summary.min)) * 100;

  return (
    <div className="px-1" style={tone('buy')} aria-hidden="true">
      <div className="relative h-1.5 rounded-full bg-base-300">
        <div
          className="absolute inset-y-0 left-0 right-0 rounded-full opacity-80"
          style={{ backgroundImage: 'linear-gradient(90deg, var(--if-raw), var(--if-buy) 50%, var(--if-loot))' }}
        />
        <span
          className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-base-100 bg-base-content shadow"
          style={{ left: `${medianAt}%` }}
          title={text.priceMedian}
        />
      </div>
      <div className="mt-1 flex justify-between text-[0.65rem] uppercase tracking-[0.15em] text-base-content/50">
        <span>{text.priceLowest}</span>
        <span>{text.priceHighest}</span>
      </div>
    </div>
  );
}

function OfferRow({ offer, now }) {
  const { text } = useItemFinderText();
  const ageLabel = useAgeLabel();
  const days = ageInDays(offer.updatedAt, now);
  const tone = freshnessTone(days);

  return (
    <tr>
      <td className="font-medium">{offer.terminal}</td>
      <td className="text-base-content/75">{locationTrail([offer.place, offer.parent], offer.system)}</td>
      <td className="whitespace-nowrap text-right font-mono tabular-nums">{formatPrice(offer.price)}</td>
      <td className="whitespace-nowrap text-right text-base-content/70">
        <span
          className="inline-flex items-center gap-1.5"
          title={tone === 'stale' ? text.staleWarning : (offer.updatedAt ?? '')}
        >
          <span className={`h-2 w-2 rounded-full ${TONE_CLASS[tone]}`} aria-hidden="true" />
          {ageLabel(days)}
        </span>
      </td>
    </tr>
  );
}

function SystemGroup({ group, now, defaultOpen }) {
  const { text, fmt } = useItemFinderText();
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? group.offers : group.offers.slice(0, COLLAPSED_COUNT);

  return (
    <details
      open={defaultOpen}
      className="if-bar group overflow-hidden rounded-lg border border-base-300 bg-base-100"
      style={systemTone(group.system)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-2 pl-4 pr-3 text-sm">
        <span className="flex items-center gap-2 font-semibold">
          <span className="if-dot h-2 w-2 rounded-full" aria-hidden="true" />
          {systemLabel(group.system, text)}
        </span>
        <span className="text-base-content/70">
          {fmt('systemGroup', {
            count: group.count,
            price: formatPrice(group.min),
          })}
          <span className="ml-2 inline-block transition-transform group-open:rotate-90" aria-hidden="true">
            ›
          </span>
        </span>
      </summary>
      <div className="overflow-x-auto border-t border-base-300">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>{text.colTerminal}</th>
              <th>{text.colLocation}</th>
              <th className="text-right">{text.colPrice}</th>
              <th className="text-right">{text.colUpdated}</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((offer, index) => (
              <OfferRow key={`${offer.terminal}-${offer.price}-${index}`} offer={offer} now={now} />
            ))}
          </tbody>
        </table>
      </div>
      {group.offers.length > COLLAPSED_COUNT ? (
        <button
          type="button"
          className="btn btn-xs btn-ghost m-2"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? text.showFewerOffers : fmt('showAllOffers', { count: group.offers.length })}
        </button>
      ) : null}
    </details>
  );
}

function BuyOffers({ offers }) {
  const { text, fmt } = useItemFinderText();
  const ageLabel = useAgeLabel();
  const [now] = useState(() => Date.now());

  if (!offers.length) {
    return <p className="text-sm text-base-content/70">{text.buyEmpty}</p>;
  }

  const summary = summarizeOffers(offers);
  const groups = groupOffersBySystem(offers);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <SummaryTile label={text.priceLowest} value={formatPrice(summary.min)} emphasis />
        <SummaryTile label={text.priceMedian} value={formatPrice(summary.median)} />
        <SummaryTile label={text.priceHighest} value={formatPrice(summary.max)} />
        <SummaryTile label={text.priceShops} value={summary.count} />
      </div>
      <PriceRange summary={summary} />
      <p className="text-xs text-base-content/60">
        {text.buyCaveat} {fmt('lastReport', { age: ageLabel(ageInDays(summary.newest, now)) })}
      </p>
      <div className="space-y-2">
        {groups.map((group, index) => (
          <SystemGroup key={group.system} group={group} now={now} defaultOpen={index === 0} />
        ))}
      </div>
    </div>
  );
}

export default BuyOffers;
