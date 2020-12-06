import { readFile } from '../../utils';
import { runner } from '../part_one';
import { runner as partTwo } from '../part_two';
import path from 'path';

describe('--- Day 1: Report Repair ---', () => {
  let example: string;
  let input: string;
  beforeAll(async () => {
    example = await readFile(path.resolve(__dirname, '../example.txt'));
    input = await readFile(path.resolve(__dirname, '../input.txt'));
  });

  describe('part one', () => {
    it('should work with the example', () => {
      const res = runner(example);
      expect(res).toEqual(514579);
    });

    it('should work with the input', async () => {
      const res = runner(input);
      expect(res).toEqual(618144);
    });
  });

  describe('part two', () => {
    it('should work with the example', () => {
      const res = partTwo(example);
      expect(res).toEqual(241861950);
    });

    it('should work with the input', () => {
      const res = partTwo(input);
      expect(res).toEqual(173538720);
    });
  });
});
