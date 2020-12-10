import path from 'path';
import { readFile } from '../utils';

/**
 *
 * How many bag colors can eventually contain at least one shiny gold bag?
 *
 * aka, how many parent color bags can have an ancestor (of any depth) that is shiny gold bag
 */

const getCanContainColor = (
  rules: Record<string, any>,
  currentColor: string,
  desiredColor: string,
): boolean => {
  let canContain = false;

  const rule = rules[currentColor];
  const { [desiredColor]: childPolicyForDesiredColor, ...rest } = rule;
  if (childPolicyForDesiredColor && childPolicyForDesiredColor > 0) {
    canContain = true;
  }

  for (const key of Object.keys(rest)) {
    const childCanContain = getCanContainColor(rules, key, desiredColor);
    if (childCanContain) {
      canContain = true;
      break;
    }
  }

  return canContain;
};

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
  let count = 0;
  for (const key of Object.keys(rules)) {
    const canContainShinyGold = getCanContainColor(rules, key, 'shiny gold');
    if (canContainShinyGold) count++;
  }
  return count;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
