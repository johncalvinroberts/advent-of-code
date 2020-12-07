import path from 'path';
import { readFile } from '../utils';

/**
 * Count the number of valid passports - those that have all required fields.
 * Treat cid as optional. In your batch file, how many passports are valid?
 *
 *
 * byr (Birth Year)
 * iyr (Issue Year)
 * eyr (Expiration Year)
 * hgt (Height)
 * hcl (Hair Color)
 * ecl (Eye Color)
 * pid (Passport ID)
 * cid (Country ID)
 */

const keys = [
  { key: 'byr', required: true },
  { key: 'iyr', required: true },
  { key: 'eyr', required: true },
  { key: 'hgt', required: true },
  { key: 'hcl', required: true },
  { key: 'ecl', required: true },
  { key: 'pid', required: true },
  { key: 'cid', required: false },
];

export const runner = (input: string): number => {
  const passports: Record<string, string>[] = input.split('\n\n').map((item) =>
    item.split(/\s/).reduce((memo, current) => {
      const [key, value] = current.split(':');
      return { ...memo, [key]: value };
    }, {}),
  );
  let valids = 0;
  for (let i = 0; i < passports.length; i++) {
    const passport = passports[i];
    let invalid = false;
    for (let j = 0; j < keys.length; j++) {
      const { key, required } = keys[j];
      // console.log({ [key]: passport[key], required, i });
      if (!passport[key] && required) {
        invalid = true;
        break;
      }
    }
    if (!invalid) valids++;
  }
  return valids;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
