import path from 'path';
import { readFile } from '@utils';
import { runner } from '../part_one';
import { runner as runner2 } from '../part_two';

describe('--- Day 2: Password Philosophy ---', () => {
  let example: string;
  let input: string;
  beforeAll(async () => {
    example = await readFile(path.resolve(__dirname, '../example.txt'));
    input = await readFile(path.resolve(__dirname, '../input.txt'));
  });

  describe('part one', () => {
    it('should find the correct amount of valid passwords with example', () => {
      const res = runner(example);
      expect(res).toBe(2);
    });

    it('should find the correct amount of valid passwords with input', () => {
      const res = runner(input);
      expect(res).toBe(638);
    });
  });

  describe('part two', () => {
    it('should find the correct amount of valid passwords with example', () => {
      const res = runner2(example);
      expect(res).toBe(1);
    });

    it('should find the correct amount of valid passwords with input', () => {
      const res = runner2(input);
      expect(res).toBe(699);
    });
  });
});
