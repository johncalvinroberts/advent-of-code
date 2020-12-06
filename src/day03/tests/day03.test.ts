import { readFile } from '@utils';
import { runner } from '../part_one';
import { runner as partTwo } from '../part_two';
import path from 'path';

describe('--- Day 1: Report Repair ---', () => {
  let example: string;
  let example2: string;
  let input: string;
  beforeAll(async () => {
    example = await readFile(path.resolve(__dirname, '../example.txt'));
    example2 = await readFile(path.resolve(__dirname, '../example2.txt'));
    input = await readFile(path.resolve(__dirname, '../input.txt'));
  });

  describe('part one', () => {
    it('should work with the example', () => {
      const res = runner(example);
      expect(res).toEqual(7);
    });

    it('should work when repeating the right pattern', () => {
      const res = runner(example2);
      expect(res).toEqual(28);
    });

    it('should work with the input', async () => {
      const res = runner(input);
      expect(res).toEqual(164);
    });
  });

  describe('part two', () => {
    it('should work with the example', () => {
      const res = partTwo(example);
      expect(res).toEqual(336);
    });

    it('should work with the input', () => {});
  });
});
