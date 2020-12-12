import path from 'path';
import { readFile } from '@utils';

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
  return 0;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
