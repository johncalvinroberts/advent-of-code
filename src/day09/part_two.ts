import path from 'path';
import { readFile } from '../utils';
import { runner as findInvalidNumber } from './part_one';

/**
 * Find a set of contiguous numbers in the input which add up to the invalid number.
 *
 *
 * Then, add together the smallest and largest number in this contiguous range.
 */

export const runner = (input: string, preambleSize: number = 25): number => {
  const [target, badIndex] = findInvalidNumber(input, preambleSize);
  const fullList = input.split('\n').map((item) => parseInt(item));
  const list = fullList.slice(0, badIndex);
  let answer = 0;
  for (let i = 0; i < list.length; i++) {
    const subarray = list.slice(i);
    for (let j = 0; j < subarray.length; j++) {
      const subarray2 = subarray.slice(0, subarray.length - j);
      const sum = subarray2.reduce((memo, current) => (memo += current), 0);

      if (sum === target) {
        const max = Math.max(...subarray2);
        const min = Math.min(...subarray2);
        answer = min + max;
      }

      if (answer) {
        break;
      }
    }
  }
  return answer;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
