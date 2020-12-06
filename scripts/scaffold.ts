import path from 'path';
import { recursivelyCopy, rename } from '../src/utils';

(async () => {
  const day = process.argv.slice(2);
  const source = path.resolve(__dirname, '../template/day');
  const dest = `src/${day}`;
  await recursivelyCopy(source, dest);
  await rename(
    `${dest}/tests/template.test.ts`,
    `${dest}/tests/${day}.test.ts`,
  );
})();
