import path from 'path';
import { readFile } from '../utils';

// const countBranches = (
//   adapters: number[],
//   index: number,
//   max: number,
//   memo: Map<number, number> = new Map<number, number>(),
// ): number => {
//   const current = adapters[index];
//   if (current === max) {
//     return 1;
//   }
//   let result = 0;
//   for (let i = 0; i <= 3; i++) {
//     const next = adapters[index + i];
//     if (next - current <= 3) {
//       if (memo.has(index + i)) {
//         result += memo.get(index + i) || 0;
//       } else {
//         const branchResult = countBranches(adapters, index + i, max, memo);
//         memo.set(index + i, branchResult);
//         result += branchResult;
//       }
//     }
//   }
//   return result;
// };

const countBranches = (
  jolts: number[],
  index: number,
  builtIn: number,
  cache: Map<number, number> = new Map<number, number>(),
): number => {
  const current = jolts[index];
  if (current === builtIn) {
    return 1;
  }
  let result = 0;
  for (let i = 1; i <= 3; i++) {
    const next = jolts[index + i];
    if (next - current <= 3) {
      if (cache.has(index + i)) {
        result += cache.get(index + i) || 0;
      } else {
        const branchResult = countBranches(jolts, index + i, builtIn, cache);
        cache.set(index + i, branchResult);
        result += branchResult;
      }
    }
  }
  return result;
};

export const runner = (input: string): number => {
  const adapters = input
    .split('\n')
    .map((item) => parseInt(item))
    .sort((a, b) => a - b);
  const max = adapters[adapters.length - 1];
  return countBranches([0, ...adapters], 0, max);
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
