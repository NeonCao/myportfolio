import { createMissionIndex, filterContracts, groupContracts, planTrack, readableTitle, trackLabel } from './missions';
import { createWikiApi, normalizePorts } from './wikiApi';

const tiers = {
  trainee: { name: 'Security Trainee', rep: 1 },
  junior: { name: 'Jr. Security Contractor', rep: 5000 },
  senior: { name: 'Sr. Security Contractor', rep: 120000 },
};

const snapshot = {
  source: 'https://api.star-citizen.wiki',
  fetchedAt: '2026-11-10T00:00:00.000Z',
  gameVersion: '4.10.2-LIVE.12881860',
  missions: [
    // Two locations of the same starter contract.
    {
      id: 'a1',
      title: 'Clear Out Drugs',
      giver: 'BlacJac Security',
      faction: 'ArcCorp',
      track: 'Security',
      type: 'Security',
      systems: ['Stanton'],
      pay: 8000,
      rep: 500,
      tier: tiers.trainee,
      shareable: true,
    },
    {
      id: 'a2',
      title: 'Clear Out Drugs',
      giver: 'BlacJac Security',
      faction: 'ArcCorp',
      track: 'Security',
      type: 'Security',
      systems: ['Pyro'],
      pay: 12000,
      rep: 700,
      tier: tiers.trainee,
      shareable: true,
    },
    // Better pay, less reputation, and it stops being offered once you outrank it.
    {
      id: 'b',
      title: 'Escort the Courier',
      giver: 'BlacJac Security',
      faction: 'ArcCorp',
      track: 'Security',
      type: 'Security',
      systems: ['Stanton'],
      pay: 30000,
      rep: 300,
      tier: tiers.trainee,
      tierMax: tiers.trainee,
    },
    {
      id: 'c',
      title: 'Defend the Depot',
      giver: 'BlacJac Security',
      faction: 'ArcCorp',
      track: 'Security',
      type: 'Security',
      systems: ['Stanton'],
      rep: 2500,
      tier: tiers.junior,
      combat: true,
      blueprints: [
        {
          chance: 1,
          items: [
            { id: 'bp-1', name: 'Trawler Scraper Module' },
            { id: 'bp-2', name: 'Abrade Scraper Module' },
          ],
        },
      ],
    },
    // A one-off with a huge gain must not be recommended for grinding while repeatable work exists.
    {
      id: 'd',
      title: 'Prove Yourself',
      giver: 'BlacJac Security',
      faction: 'ArcCorp',
      track: 'Security',
      type: 'Security',
      systems: ['Stanton'],
      rep: 4000,
      tier: tiers.trainee,
      once: true,
    },
    {
      id: 'e',
      title: 'Top Secret Sweep',
      giver: 'BlacJac Security',
      faction: 'ArcCorp',
      track: 'Security',
      type: 'Security',
      systems: ['Stanton'],
      pay: 250000,
      rep: 20000,
      tier: tiers.senior,
    },
    { id: 'f', title: 'Smuggle the Goods', giver: 'Ruto', systems: ['Pyro'], illegal: true, cargo: ['Uncut SLAM'] },
  ],
};

describe('trackLabel', () => {
  test('spaces out the internal names', () => {
    expect(trackLabel('BountyHunter')).toBe('Bounty hunting');
    expect(trackLabel('HiredMuscle')).toBe('Hired Muscle');
    expect(trackLabel('FactionReputation')).toBe('Standing');
    expect(trackLabel('BountyHunter_BountyHuntersGuild')).toBe('Bounty hunting');
    expect(trackLabel('MissionProviderReputation_Battaglia')).toBe('Standing');
    expect(trackLabel(null)).toBeNull();
  });
});

describe('readableTitle', () => {
  test('turns an unfilled title token into words and leaves real titles alone', () => {
    expect(readableTitle('[Contractor|BountyTitleVeryHard]')).toBe('Bounty (very hard)');
    expect(readableTitle('[Contractor|DataHeistTitle_VE]')).toBe('Data Heist (very easy)');
    expect(readableTitle('[Contractor|RecoverItemTitle]')).toBe('Recover Item');
    expect(readableTitle('[Contractor]')).toBe('Contract');
    expect(readableTitle('[Destination] Errand')).toBe('[destination] Errand');
    expect(readableTitle('Active Bounty: [TargetName] (VLRT)')).toBe('Active Bounty: [target name] (VLRT)');
    expect(readableTitle('Clear Out Drugs')).toBe('Clear Out Drugs');
  });
});

describe('groupContracts', () => {
  const index = createMissionIndex(snapshot);

  test('merges the records of one contract into a line with ranges', () => {
    const drugs = index.contracts.find((contract) => contract.title === 'Clear Out Drugs');

    expect(index.contracts).toHaveLength(6);
    expect(drugs.count).toBe(2);
    expect(drugs.systems).toEqual(['Pyro', 'Stanton']);
    expect(drugs.pay).toEqual({ min: 8000, max: 12000 });
    expect(drugs.rep).toEqual({ min: 500, max: 700 });
  });

  test('keeps contracts apart when the standing differs', () => {
    const [low, high] = groupContracts([
      { ...snapshot.missions[0], blueprints: [], cargo: [], systems: [] },
      { ...snapshot.missions[0], tier: tiers.junior, blueprints: [], cargo: [], systems: [] },
    ]);

    expect(low.key).not.toBe(high.key);
  });

  test('fills in what the snapshot leaves out', () => {
    const smuggle = index.contracts.find((contract) => contract.title === 'Smuggle the Goods');

    expect(smuggle).toMatchObject({ pay: null, rep: null, tier: null, blueprints: [], illegal: true, once: false });
    expect(index.ready).toBe(true);
    expect(createMissionIndex({ source: 'placeholder', missions: [] }).ready).toBe(false);
  });
});

describe('planTrack', () => {
  const index = createMissionIndex(snapshot);
  const [track] = index.tracks;
  const plan = planTrack(track);

  test('builds one ladder per faction and kind of work, lowest rank first', () => {
    expect(index.tracks).toHaveLength(1);
    expect(track.label).toBe('ArcCorp · Security');
    expect(track.givers).toEqual(['BlacJac Security']);
    expect(track.tiers.map((tier) => tier.rep)).toEqual([1, 5000, 120000]);
  });

  test('ranks repeatable contracts by reputation and by pay at the first rank', () => {
    const [first] = plan;

    expect(first.offered.map((contract) => contract.title).sort()).toEqual([
      'Clear Out Drugs',
      'Escort the Courier',
      'Prove Yourself',
    ]);
    // The one-off is on offer but is not the grind recommendation.
    expect(first.bestReputation[0].title).toBe('Clear Out Drugs');
    expect(first.bestPay[0].title).toBe('Escort the Courier');
    expect(first.reputationToNext).toBe(4999);
    expect(first.runsToNext).toBe(Math.ceil(4999 / 700));
  });

  test('drops contracts you have outranked and adds the ones the rank unlocks', () => {
    const second = plan[1];

    expect(second.offered.map((contract) => contract.title)).not.toContain('Escort the Courier');
    expect(second.unlocked.map((contract) => contract.title)).toEqual(['Defend the Depot']);
    expect(second.bestReputation[0].title).toBe('Defend the Depot');
    expect(second.runsToNext).toBe(Math.ceil(115000 / 2500));
    // No fixed payout on the best contract: the pay ranking only lists the ones that have one.
    expect(second.bestPay.map((contract) => contract.title)).toEqual(['Clear Out Drugs']);
  });

  test('has nothing to climb to at the top rank', () => {
    const last = plan[2];

    expect(last.next).toBeNull();
    expect(last.runsToNext).toBeNull();
    expect(last.bestReputation[0].title).toBe('Top Secret Sweep');
  });
});

describe('filterContracts', () => {
  const { contracts, blueprintSources, factions, systems } = createMissionIndex(snapshot);
  const titles = (filters) => filterContracts(contracts, filters).map((contract) => contract.title);

  test('finds contracts by title, giver, cargo or blueprint name', () => {
    expect(titles({ query: 'courier' })).toEqual(['Escort the Courier']);
    expect(titles({ query: 'ruto' })).toEqual(['Smuggle the Goods']);
    expect(titles({ query: 'slam' })).toEqual(['Smuggle the Goods']);
    expect(titles({ query: 'scraper' })).toEqual(['Defend the Depot']);
  });

  test('filters by faction, system, legality and blueprints', () => {
    expect(titles({ legality: 'illegal' })).toEqual(['Smuggle the Goods']);
    expect(titles({ system: 'Pyro' })).toEqual(['Clear Out Drugs', 'Smuggle the Goods']);
    expect(titles({ blueprintsOnly: true })).toEqual(['Defend the Depot']);
    expect(titles({ faction: 'ArcCorp' })).toHaveLength(5);
    expect(factions).toEqual(['ArcCorp']);
    expect(systems).toEqual(['Pyro', 'Stanton']);
  });

  test('sorts by reputation or pay with unknown values last', () => {
    expect(titles({ sort: 'reputation' })[0]).toBe('Top Secret Sweep');
    expect(titles({ sort: 'reputation' }).at(-1)).toBe('Smuggle the Goods');
    expect(titles({ sort: 'pay' }).slice(0, 2)).toEqual(['Top Secret Sweep', 'Escort the Courier']);
  });

  test('answers which contracts award a blueprint', () => {
    const [source] = blueprintSources('bp-2');

    expect(source.contract.title).toBe('Defend the Depot');
    expect(source).toMatchObject({ chance: 1, poolSize: 2 });
    expect(blueprintSources('nothing')).toEqual([]);
  });
});

describe('item page additions', () => {
  test('normalizePorts counts numbered copies of a slot and keeps what is fitted', () => {
    const slots = normalizePorts([
      { display_name: 'Spare Weapon Magazine 1', sizes: { min: 1, max: 1 } },
      { display_name: 'Spare Weapon Magazine 2', sizes: { min: 1, max: 1 } },
      { display_name: 'Weapon (Primary)', sizes: { min: 2, max: 5 } },
      {
        display_name: 'Magazine Attach',
        sizes: { min: 1, max: 1 },
        equipped_item: { uuid: 'mag', name: 'P4-AR Magazine' },
      },
      { display_name: '' },
    ]);

    expect(slots.map((slot) => [slot.name, slot.count, slot.min, slot.max])).toEqual([
      ['Spare Weapon Magazine', 2, 1, 1],
      ['Weapon (Primary)', 1, 2, 5],
      ['Magazine Attach', 1, 1, 1],
    ]);
    expect(slots[2].fitted).toEqual({ uuid: 'mag', name: 'P4-AR Magazine' });
  });

  test('a "type:" category filters on the item type and can be browsed without a query', async () => {
    const calls = [];
    const api = createWikiApi({
      fetchImpl: async (url) => {
        calls.push(new URL(url));
        return { ok: true, json: async () => ({ data: [], meta: { total: 0, last_page: 1 } }) };
      },
    });

    await api.searchItems({ query: '', category: 'type:Cooler' });
    await api.searchItems({ query: 'laser', category: 'vehicle-weapons' });

    expect(calls[0].searchParams.get('filter[type]')).toBe('Cooler');
    expect(calls[0].searchParams.has('filter[category]')).toBe(false);
    expect(calls[0].searchParams.has('filter[name]')).toBe(false);
    expect(calls[1].searchParams.get('filter[category]')).toBe('vehicle-weapons');
    expect(calls[1].searchParams.has('filter[type]')).toBe(false);
  });

  test('an item carries its description, slots and other versions', async () => {
    const api = createWikiApi({
      fetchImpl: async (url) => {
        expect(new URL(url).searchParams.get('include')).toBe('variants');
        return {
          ok: true,
          json: async () => ({
            data: {
              uuid: 'u',
              slug: 's',
              name: 'P4-AR Rifle',
              description: { en_EN: ' A classic rifle. ', zh_CN: '经典步枪。' },
              ports: [{ display_name: 'Optics', sizes: { min: 1, max: 2 } }],
              variants: [
                { uuid: 'v2', name: 'P4-AR "Scorched" Rifle' },
                { uuid: 'v1', name: 'P4-AR "Blacklist" Rifle' },
                { name: 'no id' },
              ],
            },
          }),
        };
      },
    });
    const item = await api.getItem('s');

    expect(item.description).toEqual({ en: 'A classic rifle.', zh: '经典步枪。' });
    expect(item.slots).toHaveLength(1);
    expect(item.variants.map((variant) => variant.uuid)).toEqual(['v1', 'v2']);
  });
});
