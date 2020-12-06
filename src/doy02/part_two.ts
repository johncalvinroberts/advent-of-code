import path from 'path';
import { readFile } from '../utils';

//How many passwords are valid according to their policies?
export const runner = (rawPasswords: string) => {
  const list = rawPasswords.split('\n').map((item) => item.split(': '));
  const valid = list.reduce((memo: number, current: string[]) => {
    const [policy, password] = current;
    const [amtStr, letter] = policy.split(' ');
    const [idx1, idx2] = amtStr.split('-').map((item) => parseInt(item) - 1);
    const hasAtLeastOne =
      password[idx1] === letter || password[idx2] === letter;
    const hasBoth = password[idx1] === letter && password[idx2] === letter;
    if (hasAtLeastOne && !hasBoth) {
      memo++;
    }
    return memo;
  }, 0);
  return valid;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './example.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
