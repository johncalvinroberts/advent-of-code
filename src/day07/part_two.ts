import path from 'path';
import { readFile } from '../utils';
import { transformRulesToDict, Rules } from './part_one';

// count how many total bags are inside a SHINY GOLD BAG

const countChildrenBags = (rules: Rules, color: string) => {
  const children = rules[color];
  let total = 0;
  for (const key of Object.keys(children)) {
    const childAmt = children[key];
    const childChildAmt = countChildrenBags(rules, key) * childAmt;
    total = total + childAmt + childChildAmt;
  }
  return total;
};

export const runner = (input: string): number => {
  const rules = transformRulesToDict(input);
  const totalChildrenBags = countChildrenBags(rules, 'shiny gold');
  return totalChildrenBags;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
