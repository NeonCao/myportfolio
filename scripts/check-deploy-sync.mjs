// Runs before `npm run deploy`. The data workflow also deploys (from origin/master), so a manual deploy
// must not publish an older tree than what is on origin/master, or it would undo a data refresh.
import { execFileSync } from 'node:child_process';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

try {
  git('fetch', '--quiet', 'origin', 'master');
} catch (error) {
  console.warn(`Could not reach origin (${error.message.split('\n')[0]}); skipping the deploy sync check.`);
  process.exit(0);
}

const behind = Number(git('rev-list', '--count', 'HEAD..origin/master'));
if (behind > 0) {
  console.error(
    `Your branch is ${behind} commit(s) behind origin/master (the data refresh may have pushed new game data).\n` +
      'Run `git pull` first, then deploy again.'
  );
  process.exit(1);
}

const ahead = Number(git('rev-list', '--count', 'origin/master..HEAD'));
const dirty = git('status', '--porcelain') !== '';
if (ahead > 0 || dirty) {
  console.warn(
    'Deploying work that is not on origin/master yet. The next automatic data refresh deploys from origin/master, ' +
      'so push this work before then or it will be replaced on the live site.'
  );
}
