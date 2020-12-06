import path from 'path';
import { readFile } from '../utils';

// find three numbers that equal 2020, add them
export const runner = (expenseReport: string): number => {
  const list = expenseReport.split('\n').map((item) => parseInt(item));
  let ret: number = 0;
  for (const item of list) {
    for (const item2 of list) {
      for (const item3 of list) {
        const sum: number = item + item2 + item3;
        if (sum === 2020) {
          ret = item * item2 * item3;
          break;
        }
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
