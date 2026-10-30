import { formatPill, formatStat } from './statFormat';
import { groupTone, tone } from './tone';
import { useItemFinderText } from './useItemFinderText';

function StatGroup({ group, dominantDamageType }) {
  const { text } = useItemFinderText();
  const rows = group.rows.filter((row) => row.value !== null);

  return (
    <div
      className="if-bar overflow-hidden rounded-lg border border-base-300 bg-base-100/80 p-4"
      style={groupTone(group.key, dominantDamageType)}
    >
      <p className="if-text flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
        <span className="if-dot h-1.5 w-1.5 rounded-full" aria-hidden="true" />
        {text.statGroups[group.key]}
      </p>
      {rows.length ? (
        <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
          {rows.map((row) => (
            <div
              key={row.key}
              className="flex items-baseline justify-between gap-3 border-b border-dashed border-base-300 pb-1"
            >
              <dt className="text-base-content/70">{text.stats[row.key] ?? row.key}</dt>
              <dd className="whitespace-nowrap font-mono tabular-nums">{formatStat(row)}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {group.pills.length ? (
        <div className="mt-3">
          <p className="text-xs text-base-content/60">{text.pillGroups[group.pillsKey]}</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {group.pills.map((pill) => (
              <li
                key={pill.key}
                className="if-chip flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs"
                style={tone(pill.key)}
              >
                <span className="if-dot h-1.5 w-1.5 rounded-full" aria-hidden="true" />
                <span>{text.damageTypes[pill.key] ?? pill.key}</span>
                <span className="font-mono tabular-nums text-base-content">{formatPill(pill)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function StatsPanel({ stats }) {
  if (!stats.groups.length) {
    return null;
  }

  return (
    <div className="grid gap-3 xl:grid-cols-2">
      {stats.groups.map((group) => (
        <StatGroup key={group.key} group={group} dominantDamageType={stats.dominantDamageType} />
      ))}
    </div>
  );
}

export default StatsPanel;
