import { readFile } from '@utils';
import { runner } from '../part_one';
import { runner as partTwo } from '../part_two';
import path from 'path';

describe('--- Day 7: Handy Haversacks ---', () => {
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
      expect(res).toEqual(4);
    });

    it('should work with the input', async () => {
      const res = runner(input);
      expect(res).toEqual(112);
    });
  });

  describe('part two', () => {
    it('should work with the example', () => {
      const res = partTwo(example2);
      expect(res).toBe(126);
    });

    it('should work with the input', () => {
      const res = partTwo(input);
      expect(res).toBe(6260);
    });
  });
});
