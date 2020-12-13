import path from 'path';
import { readFile } from '../utils';

/**
 * Your device works at the joltage of your highest adapter + 3.
 *
 * Adapters can only connect to a source 1-3 jolts lower than its rating.
 *
 * Find a chain that uses all of your adapters to connect the charging outlet
 * to your device's built-in adapter and count the joltage differences between the charging outlet,
 * the adapters, and your device.
 *
 * What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?
 */

export const runner = (input: string): number => {
  const adapters = input.split('\n').map((item) => parseInt(item));
  let previousJoltage = 0;
  let unusedAdapters = [...adapters].sort((a, b) => a - b);
  let counts = [0, 1];

  while (unusedAdapters.length > 0) {
    for (let i = 0; i < unusedAdapters.length; i++) {
      const diff = unusedAdapters[i] - previousJoltage;
      if (diff > 0 && diff < 4) {
        previousJoltage = unusedAdapters[i];
        if (diff === 1) {
          counts[0]++;
        }
        if (diff === 3) {
          counts[1]++;
        }
        unusedAdapters.splice(i, 1);
        break;
      }
    }
  }
  return counts[0] * counts[1];
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
