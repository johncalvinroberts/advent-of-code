import path from 'path';
import { readFile } from '@utils';

/**
 *
 * How many bag colors can eventually contain at least one shiny gold bag?
 *
 * aka, how many parent bags can have an ancestor (of any depth) that is shiny gold bag
 */

export const runner = (input: string): number => {
  const rules = input
    .split('\n')
    .reduce((memo: Record<string, unknown>, item: string) => {
      let [color, childrenString] = item
        .split('contain')
        .map((item) => item.replace(/(bags|bag)/g, '').trim());
      const children = childrenString
        .replace('.', '')
        .split(',')
        .reduce((memo2: Record<string, number>, current: string) => {
          current = current.trim();
          if (current === 'no other') {
            return memo2;
          }
          const [numberStr, ...colorStrings] = current.split(/\s/);
          const number = parseInt(numberStr);
          const color = colorStrings.join(' ');
          memo2[color] = number;
          return memo2;
        }, {});
      memo[color] = children;
      return memo;
    }, {});
  console.dir(rules);
  return 0;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
