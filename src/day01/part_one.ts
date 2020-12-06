import path from 'path';
import { readFile } from '../utils';
/**
 *  Find the two entries that sum to 2020; what do you get if you multiply them together?
 */
export const runner = (expenseReport: string): number => {
  const list = expenseReport.split('\n').map((item) => parseInt(item));
  let ret: number = 0;
  for (const item of list) {
    for (const item2 of list) {
      const sum: number = item + item2;
      if (sum === 2020) {
        ret = item * item2;
        break;
      }
    }
    if (ret) {
      break;
    }
  }

  return ret;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './example.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
