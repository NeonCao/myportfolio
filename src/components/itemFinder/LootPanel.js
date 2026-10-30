import Icon from './icons';
import { tone } from './tone';
import { useItemFinderText } from './useItemFinderText';

export function lootPoolLabel(tag, text) {
  return text.lootPools[tag] ?? tag;
}

function LootFact({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="if-dot mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

function LootPanel({ item }) {
  const { text, fmt } = useItemFinderText();
  const { loot } = item;

  if (!item.isLootable) {
    return (
      <>
        <p className="text-sm text-base-content/75">{text.lootNo}</p>
        <p className="mt-1 text-sm text-base-content/60">{text.salvageNote}</p>
      </>
    );
  }

  if (!loot?.tagsKnown) {
    return (
      <>
        <p className="text-sm text-base-content/75">{text.lootYes}</p>
        <p className="mt-1 text-sm text-base-content/60">{text.salvageNote}</p>
      </>
    );
  }

  return (
    <div className="space-y-3 text-sm" style={tone('loot')}>
      {loot.pools.length ? (
        <div>
          <p className="text-xs text-base-content/60">{text.lootPoolLabel}</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {loot.pools.map((tag) => (
              <li
                key={tag}
                className="if-chip inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-semibold"
              >
                <Icon name="pin" className="h-3.5 w-3.5" />
                {lootPoolLabel(tag, text)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <ul className="space-y-1 text-base-content/80">
        {loot.inContainers === true ? <LootFact>{text.lootInContainers}</LootFact> : null}
        {loot.inContainers === false ? <LootFact>{text.lootNotInContainers}</LootFact> : null}
        {loot.fromNpcs ? <LootFact>{text.lootFromNpcs}</LootFact> : null}
        {item.rarity ? (
          <LootFact>{fmt('lootRarity', { rarity: text.lootRarities[item.rarity] ?? item.rarity })}</LootFact>
        ) : null}
      </ul>

      <p className="text-xs text-base-content/60">{loot.pools.length ? text.lootPoolNote : text.lootNoPool}</p>
      <p className="text-xs text-base-content/60">{text.salvageNote}</p>
    </div>
  );
}

export default LootPanel;
