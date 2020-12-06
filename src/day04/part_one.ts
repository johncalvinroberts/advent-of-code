import path from 'path';
import { readFile } from '@utils';

export const runner = (input: string): number => {
  const passports = input.split('\n\n');
  console.log({ passports, passortsLegnth: passports.length });
  return 0;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
