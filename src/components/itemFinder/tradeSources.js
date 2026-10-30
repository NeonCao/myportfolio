import { groupMissionRewards } from '../../services/itemFinder/missionRewards';
import { liveTradesGiving } from '../../services/itemFinder/wikelo';

// How many live Wikelo trades and mission lines give the item. null means "not known yet": the index is
// still loading, failed, or (for missions) was never built. Tiles, icons and the no-source notice all read
// this, so they cannot disagree.
export function tradeSourceCounts(item, wikeloState, missionState) {
  return {
    wikelo: wikeloState.status === 'done' ? liveTradesGiving(wikeloState.data, item.uuid).length : null,
    missions:
      missionState.status === 'done' && missionState.data.ready
        ? groupMissionRewards(missionState.data.missionsFor(item.uuid)).length
        : null,
  };
}
