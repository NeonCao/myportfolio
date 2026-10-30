import { wikiApi } from '../../services/itemFinder/wikiApi';
import { groupLocationsBySystem } from '../../services/itemFinder/provenance';
import ApiErrorNotice from './ApiErrorNotice';
import TraceToggle from './TraceToggle';
import { useAsync } from './useAsync';
import { systemLabel } from './statFormat';
import { systemTone } from './tone';
import { useItemFinderText } from './useItemFinderText';

function CommodityPanel({ id, ingredientName }) {
  const { text, fmt } = useItemFinderText();
  const state = useAsync(() => wikiApi.getCommodity(id), [id]);

  if (state.status === 'loading') {
    return <p className="text-sm text-base-content/70">{text.loadingItem}</p>;
  }

  if (state.status === 'error') {
    return <ApiErrorNotice error={state.error} onRetry={state.retry} />;
  }

  const commodity = state.data;
  const groups = groupLocationsBySystem(commodity.locations);
  const refinedFromRaw = !commodity.locations.length && commodity.rawVersions.length > 0;

  return (
    <div className="space-y-2 text-sm">
      {ingredientName && ingredientName !== commodity.name ? (
        <p className="text-base-content/75">{fmt('rawOre', { name: commodity.name })}</p>
      ) : null}

      {refinedFromRaw ? (
        <>
          <p className="font-semibold">{text.refinedFrom}</p>
          <ul className="space-y-2">
            {commodity.rawVersions.map((version) => (
              <TraceToggle key={version.id} label={version.name}>
                <CommodityPanel id={version.id} />
              </TraceToggle>
            ))}
          </ul>
        </>
      ) : (
        <p className="font-semibold">{commodity.locations.length ? text.mineIntro : text.mineNone}</p>
      )}

      {commodity.methods.length ? (
        <p className="text-base-content/70">{fmt('mineMethods', { methods: commodity.methods.join(', ') })}</p>
      ) : null}

      {groups.length ? (
        <div className="max-h-72 space-y-3 overflow-y-auto pr-2">
          {groups.map((group) => (
            <div key={group.system}>
              <p className="flex items-baseline justify-between gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
                <span className="if-text flex items-center gap-1.5" style={systemTone(group.system)}>
                  <span className="if-dot h-1.5 w-1.5 rounded-full" aria-hidden="true" />
                  {systemLabel(group.system, text)}
                </span>
                <span className="normal-case tracking-normal">
                  {fmt('systemLocations', { count: group.locations.length })}
                </span>
              </p>
              <ul className="mt-1 divide-y divide-base-300/70">
                {group.locations.map((location) => (
                  <li key={location.id} className="flex flex-wrap items-baseline justify-between gap-x-3 py-1">
                    <span>
                      {location.name}
                      {location.parent ? <span className="text-base-content/60"> · {location.parent}</span> : null}
                    </span>
                    {location.qualityMin !== null && location.qualityMax !== null ? (
                      <span className="font-mono text-xs tabular-nums text-base-content/70">
                        {fmt('quality', {
                          min: location.qualityMin,
                          max: location.qualityMax,
                        })}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default CommodityPanel;
