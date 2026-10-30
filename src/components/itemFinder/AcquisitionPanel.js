import { wikiApi } from '../../services/itemFinder/wikiApi';
import { formatDuration } from '../../services/itemFinder/format';
import {
  MAX_TRACE_DEPTH,
  describeBlueprintAccess,
  loadItemCrafting,
  summarizeItem,
} from '../../services/itemFinder/provenance';
import { rewardItems } from '../../services/itemFinder/wikelo';
import ApiErrorNotice from './ApiErrorNotice';
import BuyOffers from './BuyOffers';
import CommodityPanel from './CommodityPanel';
import Icon from './icons';
import LootPanel from './LootPanel';
import MissionRewards from './MissionRewards';
import MiningPlan from './MiningPlan';
import QualityPreview from './QualityPreview';
import TraceToggle from './TraceToggle';
import { tone } from './tone';
import { useAsync } from './useAsync';
import { useItemFinderText } from './useItemFinderText';
import { tradeSourceCounts } from './tradeSources';
import { useMissionRewardIndex, useWikeloIndex } from './useTradeIndexes';
import WikeloContractCard, { inputAmountLabel } from './WikeloContractCard';

const SECTION_TITLE_CLASS =
  'flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-base-content/70';

const ACCESS_BADGE = {
  default: {
    key: 'accessBadgeDefault',
    className: 'border-success/50 text-success',
  },
  missions: { key: 'accessBadgeMissions', className: 'border-base-content/40' },
  unknown: {
    key: 'accessBadgeUnknown',
    className: 'border-warning/50 text-warning',
  },
};

export const sectionId = (key) => `item-finder-${key}`;

function Section({ id, title, icon, nested, children }) {
  const Title = nested ? 'p' : 'h3';

  return (
    <section id={nested ? undefined : sectionId(id)} className={nested ? '' : 'scroll-mt-24'} style={tone(id)}>
      <Title className={`mb-3 ${SECTION_TITLE_CLASS} if-text`}>
        {icon ? (
          <span className="if-badge grid h-7 w-7 place-items-center rounded-lg">
            <Icon name={icon} />
          </span>
        ) : null}
        {title}
        {nested ? null : <span className="if-rule ml-2 h-px flex-1 opacity-50" aria-hidden="true" />}
      </Title>
      {children}
    </section>
  );
}

function AccessNote({ access }) {
  const { text } = useItemFinderText();

  if (access.kind === 'default') {
    return <p className="text-sm text-base-content/75">{text.accessDefault}</p>;
  }

  if (access.kind === 'unknown') {
    return <p className="text-sm text-base-content/75">{text.accessUnknown}</p>;
  }

  return (
    <div className="text-sm">
      <p className="text-base-content/75">{text.accessMissions}</p>
      <ul className="mt-1.5 divide-y divide-base-300 rounded-lg border border-base-300">
        {access.missions.map((mission) => (
          <li
            key={`${mission.title}-${mission.rewardScope}`}
            className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5"
          >
            {mission.url ? (
              <a href={mission.url} target="_blank" rel="noreferrer" className="link link-hover font-medium">
                {mission.title}
              </a>
            ) : (
              <span className="font-medium">{mission.title}</span>
            )}
            <span className="flex items-center gap-2 text-xs text-base-content/70">
              {mission.rewardScope ? (
                <span className="rounded-md border border-base-300 px-1.5 py-0.5">{mission.rewardScope}</span>
              ) : null}
              {mission.count > 1 ? <span className="font-mono">×{mission.count}</span> : null}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-base-content/60">{text.missionPoolNote}</p>
    </div>
  );
}

function ItemTrace({ id, depth, path }) {
  const state = useAsync(() => wikiApi.getItem(id), [id]);
  const { text } = useItemFinderText();

  if (state.status === 'loading') {
    return <p className="text-sm text-base-content/70">{text.loadingItem}</p>;
  }

  if (state.status === 'error') {
    return <ApiErrorNotice error={state.error} onRetry={state.retry} />;
  }

  return <AcquisitionPanel item={state.data} depth={depth} ancestors={path} />;
}

// What a trace opens to: a material's mining sources, or the full acquisition panel of an item,
// stopping on cycles (A needs B needs A) and at the depth limit.
export function InputTrace({ kind, id, name, depth, path }) {
  const { text } = useItemFinderText();

  if (kind === 'commodity' || kind === 'resource') {
    return <CommodityPanel id={id} ingredientName={name} />;
  }

  if (path.includes(id)) {
    return <p className="text-sm text-base-content/70">{text.traceCycle}</p>;
  }

  if (depth + 1 > MAX_TRACE_DEPTH) {
    return <p className="text-sm text-base-content/70">{text.traceDepth}</p>;
  }

  return <ItemTrace id={id} depth={depth + 1} path={path} />;
}

function IngredientRow({ ingredient, minQuality, depth, path }) {
  const { fmt } = useItemFinderText();
  const { ref } = ingredient;
  const body = <InputTrace kind={ref.type} id={ref.id} name={ingredient.name} depth={depth} path={path} />;

  const detail = [ingredient.quantityLabel, minQuality > 1 ? fmt('minQuality', { value: minQuality }) : null]
    .filter(Boolean)
    .join(' · ');

  return (
    <TraceToggle label={ingredient.name} detail={detail} tone={ref.type === 'commodity' ? 'raw' : 'craft'}>
      {body}
    </TraceToggle>
  );
}

function BlueprintCard({ blueprint, depth, path }) {
  const { text } = useItemFinderText();
  const access = describeBlueprintAccess(blueprint);
  const badge = ACCESS_BADGE[access.kind];
  const minQualityByName = new Map(
    blueprint.slots.flatMap((slot) => slot.ingredients.map((ingredient) => [ingredient.name, ingredient.minQuality]))
  );
  const hasModifiers = blueprint.slots.some((slot) => slot.modifiers.length);
  const craftTime =
    blueprint.craftTimeSeconds !== null ? formatDuration(blueprint.craftTimeSeconds) : blueprint.craftTimeLabel;

  return (
    <div className="if-tint space-y-4 rounded-box border p-4" style={tone('craft')}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold">{blueprint.name}</span>
        <span className="flex flex-wrap items-center gap-2 text-xs">
          {craftTime ? (
            <span className="rounded-md border border-base-content/20 px-2 py-1">
              {text.craftTime} <span className="ml-1 font-mono">{craftTime}</span>
            </span>
          ) : null}
          <span className={`rounded-md border px-2 py-1 ${badge.className}`}>{text[badge.key]}</span>
        </span>
      </div>

      <AccessNote access={access} />

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">{text.ingredients}</p>
        <ul className="mt-2 space-y-2">
          {blueprint.ingredients.map((ingredient, index) => (
            <IngredientRow
              key={`${ingredient.ref.id}-${index}`}
              ingredient={ingredient}
              minQuality={minQualityByName.get(ingredient.name) ?? null}
              depth={depth}
              path={path}
            />
          ))}
        </ul>
      </div>

      {depth === 0 && hasModifiers ? <QualityPreview slots={blueprint.slots} /> : null}
      {depth === 0 ? <MiningPlan blueprint={blueprint} /> : null}
    </div>
  );
}

function CraftBlueprints({ item, depth, path }) {
  const state = useAsync(() => loadItemCrafting(wikiApi, item), [item.uuid]);
  const { text } = useItemFinderText();

  if (state.status === 'loading') {
    return <p className="text-sm text-base-content/70">{text.loadingItem}</p>;
  }

  if (state.status === 'error') {
    return <ApiErrorNotice error={state.error} onRetry={state.retry} />;
  }

  return (
    <div className="space-y-3">
      {state.data.map((blueprint) => (
        <BlueprintCard key={blueprint.uuid} blueprint={blueprint} depth={depth} path={path} />
      ))}
    </div>
  );
}

function IndexState({ state, children }) {
  const { text } = useItemFinderText();

  if (state.status === 'loading') {
    return <p className="text-sm text-base-content/70">{text.indexLoading}</p>;
  }

  if (state.status === 'error') {
    return <ApiErrorNotice error={state.error} onRetry={state.retry} />;
  }

  return children(state.data);
}

function WikeloTrades({ item, depth, path, nested }) {
  const { text } = useItemFinderText();
  const state = useWikeloIndex();
  const renderTrace = (input) => (
    <InputTrace kind={input.kind} id={input.id} name={input.name} depth={depth} path={path} />
  );

  return (
    <IndexState state={state}>
      {(index) => {
        const giving = index.giving(item.uuid);
        const givingBlueprint = index.givingBlueprint(item.uuid);
        const using = nested ? [] : index.using(item.uuid);

        if (!giving.length && !givingBlueprint.length && !using.length) {
          return <p className="text-sm text-base-content/70">{text.wikeloNone}</p>;
        }

        const cards = (contracts, label) =>
          contracts.length ? (
            <div className="space-y-3">
              <p className="text-xs text-base-content/60">{label}</p>
              {contracts.map((contract) => (
                <WikeloContractCard
                  key={contract.id}
                  contract={contract}
                  highlightId={item.uuid}
                  renderTrace={renderTrace}
                  imageFor={index.imageFor}
                />
              ))}
            </div>
          ) : null;

        return (
          <div className="space-y-4">
            {cards(giving, text.wikeloGives)}
            {cards(givingBlueprint, text.wikeloGivesBlueprint)}
            {using.length ? <WikeloUses contracts={using} itemId={item.uuid} /> : null}
          </div>
        );
      }}
    </IndexState>
  );
}

function WikeloUses({ contracts, itemId }) {
  const { text, fmt } = useItemFinderText();

  return (
    <div>
      <p className="text-xs text-base-content/60">{text.wikeloUses}</p>
      <ul
        className="mt-1.5 divide-y divide-base-300 rounded-lg border border-base-300 bg-base-100"
        style={tone('wikelo')}
      >
        {contracts.map((contract) => {
          const input = contract.inputs.find((entry) => entry.id === itemId);
          const names = [
            ...new Set(rewardItems(contract).map((reward) => reward.name)),
            ...contract.blueprints.map((blueprint) => `${blueprint.name} (${text.wikeloBlueprint})`),
          ];
          // A random trade gives one of its sets, so its row names the number of sets instead of their union.
          const rewardLine = contract.rewards.random
            ? fmt('wikeloRandomSets', { count: contract.rewards.sets.length })
            : fmt('wikeloGivesReward', { names: names.join(', ') || text.noneShort });

          return (
            <li
              key={contract.id}
              className="if-bar flex flex-wrap items-baseline justify-between gap-2 px-3 py-2 pl-4 text-sm"
            >
              <span className="min-w-0">
                <span className="block font-medium">
                  {contract.title}
                  {!contract.available ? <span className="ml-2 text-xs text-warning">{text.wikeloRetired}</span> : null}
                </span>
                <span className="block text-xs text-base-content/60">{rewardLine}</span>
              </span>
              {input ? <span className="font-mono text-xs text-base-content/70">{inputAmountLabel(input)}</span> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MissionSources({ item, nested }) {
  const { text, fmt } = useItemFinderText();
  const state = useMissionRewardIndex();

  return (
    <IndexState state={state}>
      {(index) =>
        !index.ready ? (
          <p className="text-sm text-base-content/70">{text.missionsNotReady}</p>
        ) : (
          <>
            <MissionRewards missions={index.missionsFor(item.uuid)} />
            {nested || !index.gameVersion ? null : (
              <p className="mt-2 text-xs text-base-content/50">
                {fmt('missionsSnapshot', { version: index.gameVersion })}
              </p>
            )}
          </>
        )
      }
    </IndexState>
  );
}

// True once both indexes have loaded and no data source (shops, crafting, mining, loot, Wikelo, missions) lists the item.
function useNoKnownSource(item) {
  const counts = tradeSourceCounts(item, useWikeloIndex(), useMissionRewardIndex());

  // Unknown counts (still loading, failed, or mission data never built) are not evidence of "no source".
  if (counts.wikelo === null || counts.missions === null) {
    return false;
  }

  const summary = summarizeItem(item);
  return (
    !summary.offerCount &&
    !summary.craftable &&
    !summary.harvestable &&
    !summary.lootable &&
    counts.wikelo === 0 &&
    counts.missions === 0
  );
}

// Which sections a nested trace shows. The top-level page always shows every section; a trace keeps only
// the ones with something in them (unknown counts still show, so their loading state is visible).
function useVisibleSections(item, nested) {
  const wikelo = useWikeloIndex();
  const counts = tradeSourceCounts(item, wikelo, useMissionRewardIndex());
  const blueprintTrades = wikelo.status === 'done' ? wikelo.data.givingBlueprint(item.uuid).length : 0;
  const has = {
    buy: item.offers.length > 0,
    craft: item.isCraftable && item.blueprintIds.length > 0,
    loot: item.isLootable,
    wikelo: counts.wikelo !== 0 || blueprintTrades > 0,
    mission: counts.missions !== 0,
  };

  return Object.fromEntries(Object.entries(has).map(([key, value]) => [key, !nested || value]));
}

function AcquisitionPanel({ item, depth = 0, ancestors = [] }) {
  const { text, fmt } = useItemFinderText();
  const path = [...ancestors, item.uuid];
  const nested = depth > 0;
  const hasBlueprints = item.isCraftable && item.blueprintIds.length > 0;
  const noKnownSource = useNoKnownSource(item);
  const show = useVisibleSections(item, nested);
  const titles = {
    buy: text.buyTitle,
    craft: text.craftTitle,
    loot: text.lootTitle,
    wikelo: text.wikeloTitle,
    mission: text.missionsTitle,
  };
  const hidden = Object.keys(titles).filter((key) => !show[key]);

  return (
    <div role="group" aria-label={item.name} className={nested ? 'space-y-4' : 'space-y-8'}>
      {noKnownSource ? (
        <p className="rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-sm">{text.noKnownSource}</p>
      ) : null}
      {nested && hidden.length && !noKnownSource ? (
        <p className="text-xs text-base-content/50">
          {fmt('traceAbsent', { sections: hidden.map((key) => titles[key]).join(' · ') })}
        </p>
      ) : null}

      {show.buy ? (
        <Section id="buy" title={text.buyTitle} icon={nested ? null : 'buy'} nested={nested}>
          <BuyOffers offers={item.offers} />
        </Section>
      ) : null}

      {show.craft ? (
        <Section id="craft" title={text.craftTitle} icon={nested ? null : 'craft'} nested={nested}>
          {hasBlueprints ? (
            <CraftBlueprints item={item} depth={depth} path={path} />
          ) : (
            <p className="text-sm text-base-content/70">{text.craftEmpty}</p>
          )}
        </Section>
      ) : null}

      {item.composition.length ? (
        <Section id="raw" title={text.mineTitle} icon={nested ? null : 'raw'} nested={nested}>
          <ul className="space-y-2">
            {item.composition.map((commodity) => (
              <TraceToggle key={commodity.id} label={commodity.name ?? item.name} tone="raw" defaultOpen={!nested}>
                <CommodityPanel id={commodity.id} />
              </TraceToggle>
            ))}
          </ul>
        </Section>
      ) : null}

      {show.loot ? (
        <Section id="loot" title={text.lootTitle} icon={nested ? null : 'loot'} nested={nested}>
          <LootPanel item={item} />
        </Section>
      ) : null}

      {show.wikelo ? (
        <Section id="wikelo" title={text.wikeloTitle} icon={nested ? null : 'wikelo'} nested={nested}>
          <WikeloTrades item={item} depth={depth} path={path} nested={nested} />
        </Section>
      ) : null}

      {show.mission ? (
        <Section id="mission" title={text.missionsTitle} icon={nested ? null : 'mission'} nested={nested}>
          <MissionSources item={item} nested={nested} />
        </Section>
      ) : null}
    </div>
  );
}

export default AcquisitionPanel;
