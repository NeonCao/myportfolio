import { summarizeItem } from '../../services/itemFinder/provenance';
import Icon from './icons';
import { tone } from './tone';
import { useItemFinderText } from './useItemFinderText';
import { tradeSourceCounts } from './tradeSources';
import { useMissionRewardIndex, useWikeloIndex } from './useTradeIndexes';

// Always the same slots in the same order, so rows line up and a missing source reads as a gap.
// counts comes from tradeSourceCounts; a null count renders as "not known yet" instead of "no".
export function availabilitySlots(item, counts = { wikelo: null, missions: null }) {
  const summary = summarizeItem(item);

  return [
    { key: 'buy', icon: 'buy', on: summary.offerCount > 0, label: 'iconBuy' },
    { key: 'craft', icon: 'craft', on: summary.craftable, label: 'iconCraft' },
    { key: 'raw', icon: 'raw', on: summary.harvestable, label: 'iconRaw' },
    { key: 'loot', icon: 'loot', on: summary.lootable, label: 'iconLoot' },
    { key: 'wikelo', icon: 'wikelo', on: counts.wikelo > 0, pending: counts.wikelo === null, label: 'iconWikelo' },
    {
      key: 'mission',
      icon: 'mission',
      on: counts.missions > 0,
      pending: counts.missions === null,
      label: 'iconMission',
    },
  ];
}

function AvailabilityIcons({ item }) {
  const { text } = useItemFinderText();
  const slots = availabilitySlots(item, tradeSourceCounts(item, useWikeloIndex(), useMissionRewardIndex()));
  const active = slots.filter((slot) => slot.on).map((slot) => text[slot.label]);

  return (
    <span className="flex items-center gap-1" role="img" aria-label={active.join(', ') || text.notSold}>
      {slots.map((slot) => (
        <span
          key={slot.key}
          title={text[slot.label]}
          style={slot.on ? tone(slot.key) : undefined}
          className={`grid h-6 w-6 place-items-center rounded-md border ${
            slot.on
              ? 'if-chip'
              : slot.pending
                ? 'border-dashed border-base-content/25 text-base-content/30'
                : 'border-base-300 text-base-content/20'
          }`}
        >
          <Icon name={slot.icon} className="h-3.5 w-3.5" />
        </span>
      ))}
    </span>
  );
}

export default AvailabilityIcons;
