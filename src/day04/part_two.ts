import path from 'path';
import { readFile } from '../utils';

/**
  byr (Birth Year) - four digits; at least 1920 and at most 2002.
  iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
  hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  pid (Passport ID) - a nine-digit number, including leading zeroes.
  cid (Country ID) - ignored, missing or not. 
 */

type Rule = {
  required: boolean;
  key: string;
  validate: (value: string) => boolean;
};

const keys: Rule[] = [
  {
    key: 'byr',
    required: true,
    validate: (value) => {
      const num = parseInt(value);
      return value.length === 4 && num >= 1920 && num <= 2002;
    },
  },
  {
    key: 'iyr',
    required: true,
    validate: (value) => {
      const num = parseInt(value);
      return value.length === 4 && num >= 2010 && num <= 2020;
    },
  },
  {
    key: 'eyr',
    required: true,
    validate: (value) => {
      const num = parseInt(value);
      return value.length === 4 && num >= 2020 && num <= 2030;
    },
  },
  {
    key: 'hgt',
    required: true,
    validate: (value) => {
      const map: Record<string, number[]> = {
        cm: [150, 193],
        in: [59, 76],
      };
      value = value.toLowerCase();
      const pattern = /\d(cm|in)$/i;
      const matchesPattern = pattern.test(value);
      if (!matchesPattern) return false;
      const [numericStringValue, unit] = value.split(/(cm|in)/);
      const numericValue = parseInt(numericStringValue);
      const [min, max] = map[unit];
      return numericValue >= min && numericValue <= max;
    },
  },
  {
    key: 'hcl',
    required: true,
    validate: (value) => {
      value = value.toUpperCase();
      const pattern = /^#[0-9A-F]{6}$/i;
      return pattern.test(value);
    },
  },
  {
    key: 'ecl',
    required: true,
    validate: (value) => {
      const acceptedValues = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
      return acceptedValues.includes(value);
    },
  },
  {
    key: 'pid',
    required: true,
    validate: (value) => {
      const pattern = /^[0-9]{9}$/i;
      return pattern.test(value);
    },
  },
  {
    key: 'cid',
    required: false,
    validate: () => {
      return true;
    },
  },
];

const validateField = (rule: Rule, value: string): boolean => {
  const { required, validate } = rule;
  if (required && !value) return false;
  return validate(value);
};

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
      const rule: Rule = keys[j];
      const { key } = rule;
      const isFieldValid = validateField(rule, passport[key]);
      if (!isFieldValid) {
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
