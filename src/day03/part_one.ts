import path from 'path';
import { readFile } from '../utils';

/**
 * The toboggan can only follow a few specific slopes (you opted for a cheaper model that prefers rational numbers);
 * start by counting all the trees you would encounter for the slope right 3, down 1:
 */
export const runner = (input: string): number => {
  const rows: string[][] = input.split('\n').map((item) => item.split(''));
  const width = rows[0].length;
  let position = 0;
  const trees = rows.reduce((memo, current) => {
    if (!current[position]) {
      position = position - width;
    }

    const isTree = current[position] === '#';
    if (isTree) {
      memo = memo + 1;
    }

    position = position + 3;
    return memo;
  }, 0);
  return trees;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
