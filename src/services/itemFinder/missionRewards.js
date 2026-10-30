// Index over src/data/missionRewards.json (built by scripts/fetch-mission-rewards.mjs).
export function createMissionRewardIndex(snapshot) {
  const byItem = new Map();

  (snapshot.missions ?? []).forEach((mission) => {
    mission.rewards.forEach((reward) => {
      if (!byItem.has(reward.uuid)) {
        byItem.set(reward.uuid, []);
      }

      byItem.get(reward.uuid).push({
        id: mission.uuid,
        title: mission.title,
        giver: mission.giver,
        systems: mission.systems ?? [],
        random: Boolean(mission.randomReward),
        amount: reward.amount ?? 1,
      });
    });
  });

  return {
    // False for the placeholder committed before the first `npm run data:missions`, so the page does not
    // claim "no mission gives this" from data that was never built.
    ready: snapshot.source !== 'placeholder' && Array.isArray(snapshot.missions),
    gameVersion: snapshot.gameVersion ?? null,
    fetchedAt: snapshot.fetchedAt ?? null,
    missionsFor: (itemId) => byItem.get(itemId) ?? [],
  };
}

// Groups repeatable variants of the same contract ("Assassination" x 40) into one line per title and giver.
export function groupMissionRewards(missions) {
  const groups = new Map();

  missions.forEach((mission) => {
    const key = `${mission.title}|${mission.giver ?? ''}`;
    const existing = groups.get(key);

    if (existing) {
      existing.count += 1;
      existing.systems = [...new Set([...existing.systems, ...mission.systems])].sort();
      existing.random = existing.random && mission.random;
      existing.amountMin = Math.min(existing.amountMin, mission.amount);
      existing.amountMax = Math.max(existing.amountMax, mission.amount);
    } else {
      groups.set(key, {
        title: mission.title,
        giver: mission.giver,
        systems: [...mission.systems].sort(),
        random: mission.random,
        amountMin: mission.amount,
        amountMax: mission.amount,
        count: 1,
      });
    }
  });

  return [...groups.values()].sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));
}

let indexPromise = null;

export function loadMissionRewardIndex() {
  if (!indexPromise) {
    indexPromise = import('../../data/missionRewards.json')
      .then((module) => createMissionRewardIndex(module.default ?? module))
      .catch((error) => {
        indexPromise = null;
        throw error;
      });
  }

  return indexPromise;
}
