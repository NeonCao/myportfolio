import { tone } from './tone';
import { useItemFinderText } from './useItemFinderText';

const CHIP_CLASS =
  'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[0.7rem] leading-none';

export function itemChips(item, text) {
  const damageType = item.stats?.dominantDamageType;

  return [
    item.size !== null && item.size !== undefined ? { key: 'size', label: `S${item.size}` } : null,
    item.grade ? { key: 'grade', label: `${text.stats.grade} ${item.grade}` } : null,
    item.itemClass ? { key: 'class', label: item.itemClass } : null,
    damageType ? { key: 'damage', label: text.damageTypes[damageType] ?? damageType, tone: damageType } : null,
  ].filter(Boolean);
}

function ItemChips({ item, className = '' }) {
  const { text } = useItemFinderText();
  const chips = itemChips(item, text);

  if (!chips.length) {
    return null;
  }

  return (
    <span className={`flex flex-wrap gap-1 ${className}`}>
      {chips.map((chip) =>
        chip.tone ? (
          <span key={chip.key} className={`${CHIP_CLASS} if-chip`} style={tone(chip.tone)}>
            <span className="if-dot h-1.5 w-1.5 rounded-full" aria-hidden="true" />
            {chip.label}
          </span>
        ) : (
          <span key={chip.key} className={`${CHIP_CLASS} border-base-content/20`}>
            {chip.label}
          </span>
        )
      )}
    </span>
  );
}

export default ItemChips;
