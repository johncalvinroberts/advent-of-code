import path from 'path';
import { readFile } from '../utils';

export const runner = (input: string): number => {
  const groupCounts = input.split('\n\n').map((group) => {
    const groupCount = group.split('\n').length;
    const unaninimous = group
      .replace(/\n|\r\n|\r/g, '')
      .split('')
      .reduce(
        (memo: Record<string, number>, current: string) => {
          memo[current] = memo[current] ? memo[current] + 1 : 1;
          if (memo[current] === groupCount) {
            memo.count = memo.count + 1;
          }
          return memo;
        },
        { count: 0 },
      );
    return unaninimous.count;
  });

  return groupCounts.reduce((memo, current) => memo + current, 0);
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
