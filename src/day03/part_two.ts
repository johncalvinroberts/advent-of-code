import path from 'path';
import { readFile } from '../utils';

const calculateTreesForSlope = (slope: number[], rows: string[][]) => {
  const [right, down] = slope;
  const width = rows[0].length;
  let position = 0;
  let trees = 0;
  for (let index = 0; index < rows.length; index = index + down) {
    const current = rows[index];
    if (!current[position]) {
      position = position - width;
    }

    const isTree = current[position] === '#';
    if (isTree) {
      trees++;
    }
    position = position + right;
  }
  return trees;
};

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

export const runner = (input: string): number => {
  const rows: string[][] = input.split('\n').map((item) => item.split(''));

  const ret = slopes.reduce((memo, slope) => {
    const answer = calculateTreesForSlope(slope, rows);
    return memo * answer;
  }, 1);

  return ret;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
