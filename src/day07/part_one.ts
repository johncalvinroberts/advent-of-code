import path from 'path';
import { readFile } from '@utils';

/**
 *
 * How many bag colors can eventually contain at least one shiny gold bag?
 *
 * aka, how many parent bags can have an ancestor (of any depth) that is shiny gold bag
 */

export const runner = (input: string): number => {
  const rules = input.split('\n');
  console.log(rules);
  return 0;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
