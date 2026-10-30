import { useId, useState } from 'react';
import { formatNumber, formatScu } from '../../services/itemFinder/format';
import Icon from './icons';
import ItemImage from './ItemImage';
import OpenItemLink from './OpenItemLink';
import { tone } from './tone';
import { useItemFinderText } from './useItemFinderText';

const PREVIEW_INPUTS = 3;
const COLLAPSED_SETS = 4;

export function inputAmountLabel(input) {
  return input.kind === 'resource'
    ? formatScu(input.scu)
    : `×${formatNumber(input.amount, { maximumFractionDigits: 0 })}`;
}

// The highlighted chip is the item whose page this is, so it is plain text rather than a link to itself.
function RewardChip({ reward, highlight, blueprint }) {
  const { text, fmt } = useItemFinderText();
  const body = (
    <>
      {blueprint ? <Icon name="craft" className="h-3.5 w-3.5" /> : null}
      <span>{reward.name}</span>
      {blueprint ? <span className="text-base-content/60">{text.wikeloBlueprint}</span> : null}
      {reward.amount > 1 ? <span className="font-mono text-base-content/60">×{reward.amount}</span> : null}
    </>
  );
  const chipClass = 'inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs';

  return (
    <li>
      {highlight ? (
        <span className={`${chipClass} if-chip font-semibold`}>{body}</span>
      ) : (
        <OpenItemLink
          id={reward.id}
          title={fmt('wikeloOpenItem', { name: reward.name })}
          className={`${chipClass} border-base-300 bg-base-100 transition-colors hover:border-base-content/50`}
        >
          {body}
        </OpenItemLink>
      )}
    </li>
  );
}

// Inputs as one wrapping row of chips; clicking a chip opens its trace in a single panel underneath,
// so a trade with eleven inputs stays a few lines tall.
function InputChips({ inputs, renderTrace }) {
  const { text } = useItemFinderText();
  const [openId, setOpenId] = useState(null);
  const panelId = useId();
  const open = inputs.find((input) => input.id === openId) ?? null;

  return (
    <div>
      <ul className="flex flex-wrap gap-1.5">
        {inputs.map((input) => {
          const selected = input.id === openId;

          return (
            <li key={input.id}>
              <button
                type="button"
                aria-expanded={selected}
                aria-controls={selected ? panelId : undefined}
                onClick={() => setOpenId((current) => (current === input.id ? null : input.id))}
                style={tone(input.kind === 'resource' ? 'raw' : 'wikelo')}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors ${
                  selected ? 'if-chip font-semibold' : 'border-base-300 bg-base-100 hover:border-base-content/50'
                }`}
              >
                <span className="if-dot h-1.5 w-1.5 rounded-full" aria-hidden="true" />
                <span>{input.name}</span>
                <span className="font-mono text-base-content/60">{inputAmountLabel(input)}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {open ? (
        <div id={panelId} className="mt-3 rounded-lg border border-dashed border-base-300 bg-base-100 p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">
              {open.name} <span className="font-mono text-xs text-base-content/60">{inputAmountLabel(open)}</span>
            </p>
            <button type="button" className="btn btn-xs btn-ghost" onClick={() => setOpenId(null)}>
              {text.hideTrace}
            </button>
          </div>
          {renderTrace(open)}
        </div>
      ) : (
        <p className="mt-1.5 text-xs text-base-content/50">{text.wikeloTraceHint}</p>
      )}
    </div>
  );
}

function RewardSets({ contract, highlightId }) {
  const { text, fmt } = useItemFinderText();
  const [expanded, setExpanded] = useState(false);
  const { rewards } = contract;
  const sets = rewards.random && !expanded ? rewards.sets.slice(0, COLLAPSED_SETS) : rewards.sets;

  return (
    <div className="space-y-2">
      {rewards.random ? <p className="text-xs text-base-content/70">{text.wikeloRandomSet}</p> : null}
      {sets.map((set, index) => (
        <ul
          key={index}
          className={`flex flex-wrap gap-1.5 ${rewards.random ? 'rounded-lg border border-dashed border-base-300 p-1.5' : ''}`}
        >
          {set.map((reward, rewardIndex) => (
            <RewardChip key={`${reward.id}-${rewardIndex}`} reward={reward} highlight={reward.id === highlightId} />
          ))}
        </ul>
      ))}
      {rewards.random && rewards.sets.length > COLLAPSED_SETS ? (
        <button
          type="button"
          className="btn btn-xs btn-ghost"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? text.showFewerOffers : fmt('showAllOffers', { count: rewards.sets.length })}
        </button>
      ) : null}
      {contract.blueprints.length ? (
        <ul className="flex flex-wrap gap-1.5">
          {contract.blueprints.map((blueprint) => (
            <RewardChip
              key={`bp-${blueprint.itemId}`}
              reward={{ id: blueprint.itemId, name: blueprint.name, amount: 1 }}
              highlight={blueprint.itemId === highlightId}
              blueprint
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ContractBadges({ contract }) {
  const { text, fmt } = useItemFinderText();

  return (
    <span className="flex flex-wrap items-center gap-1.5 text-xs">
      {!contract.available ? (
        <span className="rounded-md border border-warning/50 px-2 py-0.5 text-warning">{text.wikeloRetired}</span>
      ) : null}
      {contract.minStanding ? (
        <span className="if-chip rounded-md border px-2 py-0.5">{fmt('wikeloMinStanding', contract.minStanding)}</span>
      ) : null}
      {contract.onceOnly ? (
        <span className="rounded-md border border-base-content/20 px-2 py-0.5">{text.wikeloOnce}</span>
      ) : null}
      {contract.reputationGained ? (
        <span className="rounded-md border border-base-content/20 px-2 py-0.5 font-mono">
          {fmt('wikeloRep', { amount: contract.reputationGained })}
        </span>
      ) : null}
    </span>
  );
}

// One line for a collapsed trade: what you get, and the first few things Wikelo wants.
export function contractSummary(contract, text, fmt) {
  const rewardLine = contract.rewards.random
    ? fmt('wikeloRandomSets', { count: contract.rewards.sets.length })
    : contract.rewards.sets[0]?.map((reward) => reward.name).join(', ') ||
      contract.blueprints[0]?.name ||
      text.noneShort;
  const shown = contract.inputs.slice(0, PREVIEW_INPUTS).map((input) => `${input.name} ${inputAmountLabel(input)}`);
  const more = contract.inputs.length - shown.length;

  return {
    rewardLine,
    inputLine: more > 0 ? `${shown.join(' · ')} · ${fmt('wikeloMoreInputs', { count: more })}` : shown.join(' · '),
  };
}

// renderTrace(input) returns what an input's trace shows; it comes from AcquisitionPanel, which owns tracing.
// collapsible: start as a one-line summary (used by the Emporium list, where 70 full cards would be too long).
// The picture shown for a trade: its first reward, or the first blueprint for blueprint-only trades.
function leadRewardId(contract) {
  return contract.rewards.sets[0]?.[0]?.id ?? contract.blueprints[0]?.itemId ?? null;
}

function WikeloContractCard({ contract, highlightId = null, renderTrace, collapsible = false, imageFor = () => null }) {
  const { text, fmt } = useItemFinderText();
  const [expanded, setExpanded] = useState(!collapsible);
  const bodyId = useId();
  const summary = contractSummary(contract, text, fmt);

  const body = (
    <div id={bodyId} className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
            {text.wikeloInputs}
          </p>
          <InputChips inputs={contract.inputs} renderTrace={renderTrace} />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
            {text.wikeloRewards}
          </p>
          <RewardSets contract={contract} highlightId={highlightId} />
        </div>
      </div>
      {contract.stations.length ? (
        <p className="flex items-start gap-1.5 text-xs text-base-content/60">
          <Icon name="pin" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {fmt('wikeloStations', { stations: contract.stations.join(', ') })}
        </p>
      ) : null}
    </div>
  );

  if (collapsible) {
    return (
      <article
        className={`if-tint rounded-box border ${contract.available ? '' : 'opacity-70'}`}
        style={tone('wikelo')}
      >
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={expanded ? bodyId : undefined}
          onClick={() => setExpanded((current) => !current)}
          className="flex w-full items-start gap-3 px-4 py-3 text-left"
        >
          {contract.rewards.random ? null : <ItemImage src={imageFor(leadRewardId(contract))} />}
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-semibold leading-tight">{contract.title}</span>
              <span className="if-text text-sm">→ {summary.rewardLine}</span>
            </span>
            <span className="mt-0.5 block truncate text-xs text-base-content/60">{summary.inputLine}</span>
          </span>
          <ContractBadges contract={contract} />
          <span
            className={`mt-0.5 text-base-content/60 transition-transform ${expanded ? 'rotate-90' : ''}`}
            aria-hidden="true"
          >
            ›
          </span>
        </button>
        {expanded ? <div className="border-t border-base-300 px-4 py-4">{body}</div> : null}
      </article>
    );
  }

  return (
    <article
      className={`if-tint space-y-4 rounded-box border p-4 ${contract.available ? '' : 'opacity-70'}`}
      style={tone('wikelo')}
    >
      <header className="flex flex-wrap items-start justify-between gap-2">
        {contract.rewards.random ? null : <ItemImage src={imageFor(leadRewardId(contract))} size="md" />}
        <div className="min-w-0 flex-1">
          <p className="if-text text-[0.7rem] uppercase tracking-[0.18em]">{text.wikeloKinds[contract.kind]}</p>
          <h4 className="font-semibold leading-tight">{contract.title}</h4>
        </div>
        <ContractBadges contract={contract} />
      </header>
      {body}
    </article>
  );
}

export default WikeloContractCard;
