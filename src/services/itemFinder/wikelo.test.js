import snapshot from './__fixtures__/wikelo-contracts.json';
import { createMissionRewardIndex, groupMissionRewards } from './missionRewards';
import { createWikeloIndex, normalizeWikeloContract, rewardItems } from './wikelo';

const index = createWikeloIndex(snapshot);
const byTitle = (title) => index.contracts.find((contract) => contract.title === title);
const POLARIS_BIT = '4b697f15-c1e2-4b35-9b79-6bff5db9021b';
const WIKELO_FAVOR = '3b1cf59f-1e6b-4a91-9edb-f8c5ddf791ae';

test('ship trades list item inputs with counts and the ship as reward', () => {
  const polaris = byTitle('Now make Polaris. Short Time Deal.');

  expect(polaris).toMatchObject({ kind: 'ship', available: true, reputationGained: 1000, onceOnly: false });
  expect(polaris.inputs[0]).toEqual({ kind: 'item', id: WIKELO_FAVOR, name: 'Wikelo Favor', amount: 50, scu: null });
  expect(polaris.inputs.find((input) => input.id === POLARIS_BIT)).toMatchObject({ amount: 15 });
  expect(rewardItems(polaris).map((item) => item.name)).toEqual(['RSI Polaris Wikelo Special']);
  expect(polaris.prerequisites).toEqual(['Wikelo Arrive to System']);
});

test('currency trades take resources by SCU and are listed under the currency they give', () => {
  const bits = byTitle('Want Polaris? Need something special.');

  expect(bits.kind).toBe('currency');
  expect(bits.inputs).toEqual([
    { kind: 'resource', id: 'bde5a2c8-2ef4-46ac-9403-2fcb79e4016c', name: 'Quantainium', amount: null, scu: 24 },
  ]);
  expect(bits.stations).toContain('Wikelo Emporium Kinga Station');
  expect(index.giving(POLARIS_BIT).map((contract) => contract.title)).toEqual([
    'Want Polaris? Need something special.',
  ]);
  expect(index.giving(WIKELO_FAVOR).map((contract) => contract.title)).toEqual(['Turn Things to Favor']);
});

test('items used as inputs point back to the trades that need them', () => {
  expect(index.using(POLARIS_BIT).map((contract) => contract.title)).toEqual([
    'Now make Polaris. Short Time Deal.',
    'Special Idris For Killing',
  ]);
  expect(index.using(WIKELO_FAVOR).map((contract) => contract.title)).toContain('Special Idris For Killing');
});

test('blueprint rewards are indexed for the crafted item and keep their blueprint id', () => {
  const lmg = byTitle('Big Style LMG');

  expect(lmg.blueprints).toEqual([
    {
      itemId: 'ddb8eb6e-a55d-4846-90f3-5adda9ea8e9d',
      name: 'F55 "Shadowflux" LMG',
      blueprintId: 'd5e951bf-f079-4dfb-9b95-39676059fdf1',
      chancePercent: 100,
    },
  ]);
  // The LMG is also a plain reward here, so it counts under both lookups; blueprint-only trades do not count as giving.
  expect(index.giving('ddb8eb6e-a55d-4846-90f3-5adda9ea8e9d')).toEqual([lmg]);
  expect(index.givingBlueprint('ddb8eb6e-a55d-4846-90f3-5adda9ea8e9d')).toEqual([lmg]);

  const blueprintOnly = createWikeloIndex({
    contracts: [
      {
        uuid: 'clipper',
        title: 'Clipper Fight Now',
        released: true,
        hauling_orders: [{ kind: 'Entity', uuid: 'meta-152', name: 'Metamaterial Test #152', max_amount: 1 }],
        reward_items: [{ uuid: 'ship', name: 'Drake Clipper' }],
        blueprints: [{ drop_chance_percent: 100, items: [{ uuid: 'meta-152', name: 'Metamaterial Test #152' }] }],
      },
    ],
  });
  expect(blueprintOnly.giving('meta-152')).toEqual([]);
  expect(blueprintOnly.givingBlueprint('meta-152').map((contract) => contract.id)).toEqual(['clipper']);
  expect(blueprintOnly.using('meta-152').map((contract) => contract.id)).toEqual(['clipper']);
});

test('several reward groups mean one random set, and zero-weight sets are dropped', () => {
  const hungry = byTitle('Very Hungry');
  const raw = snapshot.contracts.find((contract) => contract.title === 'Very Hungry');

  expect(hungry.rewards.random).toBe(true);
  expect(hungry.rewards.sets).toHaveLength(raw.reward_groups.filter((group) => group.weight > 0).length);
  expect(hungry.kind).toBe('other');
});

test('reputation gates and retired contracts are reported', () => {
  expect(byTitle('Special Idris For Killing').minStanding).toEqual({ name: 'Very Best Customer', reputation: 999 });
  expect(byTitle('Test Armor').available).toBe(true);
  expect(
    normalizeWikeloContract({ uuid: 'x', title: 'Retired', released: false, not_for_release: true }).available
  ).toBe(false);
  expect(index.ladder.map((standing) => standing.reputation)).toEqual([0, 340, 999]);
  expect(normalizeWikeloContract({ uuid: 'x', title: 'Bare' })).toMatchObject({
    inputs: [],
    rewards: { random: false, sets: [[]] },
    blueprints: [],
    available: false,
  });
});

test('mission rewards group repeatable variants by title and giver', () => {
  const rewards = createMissionRewardIndex({
    missions: [
      {
        uuid: 'a',
        title: 'Purge ASD servers',
        giver: 'ASD',
        systems: ['Stanton'],
        rewards: [{ uuid: 'drive', amount: 5 }],
      },
      {
        uuid: 'b',
        title: 'Purge ASD servers',
        giver: 'ASD',
        systems: ['Pyro'],
        rewards: [{ uuid: 'drive', amount: 10 }],
      },
      { uuid: 'c', title: 'Other job', giver: null, systems: [], randomReward: true, rewards: [{ uuid: 'drive' }] },
    ],
  });

  expect(groupMissionRewards(rewards.missionsFor('drive'))).toEqual([
    {
      title: 'Purge ASD servers',
      giver: 'ASD',
      systems: ['Pyro', 'Stanton'],
      random: false,
      amountMin: 5,
      amountMax: 10,
      count: 2,
    },
    { title: 'Other job', giver: null, systems: [], random: true, amountMin: 1, amountMax: 1, count: 1 },
  ]);
  expect(rewards.missionsFor('unknown')).toEqual([]);
  expect(rewards.ready).toBe(true);
  expect(createMissionRewardIndex({ source: 'placeholder', missions: [] }).ready).toBe(false);
});
