import { useState } from 'react';
import { groupMissionRewards } from '../../services/itemFinder/missionRewards';
import { systemTone, tone } from './tone';
import { useItemFinderText } from './useItemFinderText';

const COLLAPSED_COUNT = 5;

function amountLabel(group) {
  return group.amountMin === group.amountMax ? `×${group.amountMin}` : `×${group.amountMin}–${group.amountMax}`;
}

function MissionRewards({ missions }) {
  const { text, fmt } = useItemFinderText();
  const [expanded, setExpanded] = useState(false);
  const groups = groupMissionRewards(missions);

  if (!groups.length) {
    return <p className="text-sm text-base-content/70">{text.missionsNone}</p>;
  }

  const visible = expanded ? groups : groups.slice(0, COLLAPSED_COUNT);

  return (
    <div className="space-y-2">
      <ul className="divide-y divide-base-300 rounded-lg border border-base-300 bg-base-100" style={tone('mission')}>
        {visible.map((group) => (
          <li
            key={`${group.title}|${group.giver}`}
            className="if-bar flex flex-wrap items-start justify-between gap-2 px-3 py-2 pl-4 text-sm"
          >
            <span className="min-w-0">
              <span className="block font-medium">{group.title}</span>
              <span className="block text-xs text-base-content/60">
                {group.giver ?? text.missionGiverUnknown}
                {group.count > 1 ? ` · ${fmt('missionVariants', { count: group.count })}` : ''}
                {group.random ? ` · ${text.missionRandom}` : ''}
              </span>
            </span>
            <span className="flex flex-wrap items-center gap-1.5 text-xs">
              {group.systems.map((system) => (
                <span key={system} className="if-chip rounded-md border px-1.5 py-0.5" style={systemTone(system)}>
                  {system}
                </span>
              ))}
              <span className="font-mono text-base-content/70">{amountLabel(group)}</span>
            </span>
          </li>
        ))}
      </ul>
      {groups.length > COLLAPSED_COUNT ? (
        <button
          type="button"
          className="btn btn-xs btn-ghost"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? text.showFewerOffers : fmt('missionsMore', { count: groups.length })}
        </button>
      ) : null}
    </div>
  );
}

export default MissionRewards;
