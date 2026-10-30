import { useId, useState } from 'react';
import { MISSING, formatNumber, formatPercent } from '../../services/itemFinder/format';
import { describeEffect, modifierAtQuality } from '../../services/itemFinder/provenance';
import { tone } from './tone';
import { useItemFinderText } from './useItemFinderText';

const VERDICT_CLASS = {
  better: 'text-success',
  worse: 'text-error',
  neutral: 'text-base-content/70',
  unknown: 'text-base-content/50',
};

function qualityTier(quality, max) {
  const share = max > 0 ? quality / max : 0;

  if (share < 0.25) {
    return 'poor';
  }

  if (share < 0.5) {
    return 'fair';
  }

  return share < 0.75 ? 'good' : 'excellent';
}

function signedDelta(multiplier) {
  return multiplier === null ? null : formatPercent(multiplier - 1, { signed: true, maximumFractionDigits: 1 });
}

function QualityPreview({ slots }) {
  const { text, fmt } = useItemFinderText();
  const sliderId = useId();
  const rows = slots.flatMap((slot) =>
    slot.modifiers.map((modifier, index) => ({
      slot,
      modifier,
      key: `${slot.key}-${index}`,
    }))
  );
  const qualityMin = Math.min(...rows.map((row) => row.modifier.qualityMin));
  const qualityMax = Math.max(...rows.map((row) => row.modifier.qualityMax));
  const [quality, setQuality] = useState(() => Math.round((qualityMin + qualityMax) / 2));

  if (!rows.length) {
    return null;
  }

  const tier = qualityTier(quality - qualityMin, qualityMax - qualityMin);

  return (
    <div className="rounded-lg border border-base-300 bg-base-100 p-4" style={tone('craft')}>
      <p className="if-text text-xs font-semibold uppercase tracking-[0.2em]">{text.qualityTitle}</p>
      <p className="mt-1 text-sm text-base-content/70">{text.qualityIntro}</p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label htmlFor={sliderId} className="text-sm font-medium">
          {text.qualityLabel}
        </label>
        <input
          id={sliderId}
          type="range"
          min={qualityMin}
          max={qualityMax}
          step={10}
          value={quality}
          onChange={(event) => setQuality(Number(event.target.value))}
          className="if-meter range range-xs min-w-40 flex-1"
        />
        <span className="w-28 whitespace-nowrap text-right font-mono text-sm tabular-nums">
          {formatNumber(quality)} · {text.qualityTiers[tier]}
        </span>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>{text.colSlot}</th>
              <th>{text.colStat}</th>
              <th className="text-right">{text.colEffect}</th>
              <th className="text-right">
                {fmt('colRange', {
                  min: formatNumber(qualityMin),
                  max: formatNumber(qualityMax),
                })}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ slot, modifier, key }) => {
              const effect = describeEffect(modifier, modifierAtQuality(modifier, quality));

              return (
                <tr key={key}>
                  <td>
                    <span className="font-medium">{slot.name}</span>
                    <span className="block text-xs text-base-content/60">
                      {slot.ingredients.map((ingredient) => ingredient.name).join(', ')}
                    </span>
                  </td>
                  <td>{modifier.label}</td>
                  <td
                    className={`whitespace-nowrap text-right font-mono tabular-nums ${VERDICT_CLASS[effect.verdict]}`}
                  >
                    {effect.delta === null ? MISSING : signedDelta(1 + effect.delta)}
                  </td>
                  <td className="whitespace-nowrap text-right font-mono text-xs tabular-nums text-base-content/60">
                    {fmt('effectRange', {
                      min: signedDelta(modifier.atMin) ?? MISSING,
                      max: signedDelta(modifier.atMax) ?? MISSING,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QualityPreview;
