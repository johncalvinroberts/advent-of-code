import path from 'path';
import { readFile } from '../utils';

export const runner = (input: string): number => {
  return input
    .split('\n\n')
    .map((item) => new Set(item.replace(/\n|\r\n|\r/g, '').split('')))
    .reduce((memo, current) => memo + current.size, 0);
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
