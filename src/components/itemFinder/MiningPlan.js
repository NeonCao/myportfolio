import { useState } from 'react';
import { wikiApi } from '../../services/itemFinder/wikiApi';
import { buildMiningPlan, locationTrail, refKey, resolveMiningSource } from '../../services/itemFinder/provenance';
import ApiErrorNotice from './ApiErrorNotice';
import Icon from './icons';
import { systemLabel } from './statFormat';
import { systemTone, tone } from './tone';
import { useAsync } from './useAsync';
import { useItemFinderText } from './useItemFinderText';

async function loadPlan(ingredients) {
  const unique = [...new Map(ingredients.map((ingredient) => [refKey(ingredient.ref), ingredient])).values()];
  const settled = await Promise.allSettled(unique.map((ingredient) => resolveMiningSource(wikiApi, ingredient)));
  const failures = settled.filter((result) => result.status === 'rejected');

  // One failed lookup only marks that ingredient as missing; the plan fails only when nothing loaded.
  if (failures.length && failures.length === settled.length) {
    throw failures[0].reason;
  }

  return buildMiningPlan(
    unique.map((ingredient, index) => ({
      name: ingredient.name,
      commodity: settled[index].status === 'fulfilled' ? settled[index].value : null,
    }))
  );
}

function PlanBody({ blueprint }) {
  const { text, fmt } = useItemFinderText();
  const state = useAsync(() => loadPlan(blueprint.ingredients), [blueprint.uuid]);

  if (state.status === 'loading') {
    return <p className="text-sm text-base-content/70">{text.miningLoading}</p>;
  }

  if (state.status === 'error') {
    return <ApiErrorNotice error={state.error} onRetry={state.retry} />;
  }

  const plan = state.data;

  if (!plan.systems.length) {
    return <p className="text-sm text-base-content/70">{text.miningNone}</p>;
  }

  return (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-xs text-base-content/60">{text.miningSystems}</p>
        <ul className="mt-2 space-y-2">
          {plan.systems.map((system) => (
            <li key={system.system} style={systemTone(system.system)}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="flex items-center gap-2 font-semibold">
                  <span className="if-dot h-2 w-2 rounded-full" aria-hidden="true" />
                  {systemLabel(system.system, text)}
                </span>
                <span className="font-mono tabular-nums text-base-content/70">
                  {system.covered}/{plan.total}
                </span>
              </div>
              <progress className="if-meter progress h-1.5 w-full" value={system.covered} max={plan.total} />
              <p className="text-xs text-base-content/60">{system.resources.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs text-base-content/60">{text.miningSpots}</p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {plan.spots.map((spot) => (
            <li
              key={spot.id}
              className="if-bar rounded-lg border border-base-300 bg-base-100 p-3 pl-4"
              style={systemTone(spot.system)}
            >
              <p className="flex items-start gap-1.5 font-semibold leading-tight">
                <Icon name="pin" className="if-text mt-0.5 h-3.5 w-3.5 shrink-0" />
                {spot.name}
              </p>
              <p className="mt-0.5 text-xs text-base-content/60">
                {[locationTrail([spot.parent], spot.system), systemLabel(spot.system, text)]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              <p className="mt-2 flex flex-wrap gap-1">
                {spot.resources.map((name) => (
                  <span key={name} className="if-chip rounded-md border px-1.5 py-0.5 text-xs" style={tone('raw')}>
                    {name}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {plan.missing.length ? (
        <p className="text-xs text-base-content/60">{fmt('miningMissing', { names: plan.missing.join(', ') })}</p>
      ) : null}
    </div>
  );
}

function MiningPlan({ blueprint }) {
  const { text } = useItemFinderText();
  const [requested, setRequested] = useState(false);

  if (!blueprint.ingredients.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-base-300 bg-base-100 p-4" style={tone('raw')}>
      <p className="if-text text-xs font-semibold uppercase tracking-[0.2em]">{text.miningTitle}</p>
      <div className="mt-3">
        {requested ? (
          <PlanBody blueprint={blueprint} />
        ) : (
          <button type="button" className="if-chip btn btn-sm border" onClick={() => setRequested(true)}>
            <Icon name="raw" />
            {text.miningButton}
          </button>
        )}
      </div>
    </div>
  );
}

export default MiningPlan;
