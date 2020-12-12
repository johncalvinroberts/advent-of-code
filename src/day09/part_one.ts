import path from 'path';
import { readFile } from '../utils';

export const runner = (input: string, preambleSize: number = 25): number => {
  const list = input.split('\n');
  let badNumber = 0;
  for (let i = preambleSize; i < list.length; i++) {
    const item = parseInt(list[i]);
    const slice = list.slice(i - preambleSize, i);
    let match = false;

    for (let j = 0; j < slice.length; j++) {
      for (let k = 0; k < slice.length; k++) {
        if (parseInt(slice[k]) + parseInt(slice[j]) === item) {
          match = true;
          break;
        }
        if (match) break;
      }
      if (match) break;
    }
    if (!match) {
      badNumber = item;
      break;
    }
  }
  return badNumber;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input, 25);
    console.log(`The result is: ${res}`);
  })();
}
