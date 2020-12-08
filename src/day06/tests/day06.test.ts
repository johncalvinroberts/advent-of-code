import { readFile } from '@utils';
import { runner } from '../part_one';
import { runner as partTwo } from '../part_two';
import path from 'path';

describe('--- Day 6: Custom Customs ---', () => {
  let example: string;
  let input: string;
  beforeAll(async () => {
    example = await readFile(path.resolve(__dirname, '../example.txt'));
    input = await readFile(path.resolve(__dirname, '../input.txt'));
  });

  describe('part one', () => {
    it('should work with the example', () => {
      const res = runner(example);
      expect(res).toEqual(11);
    });

    it('should work with the input', async () => {
      const res = runner(input);
      expect(res).toEqual(6521);
    });
  });

  describe('part two', () => {
    it('should work with the example', () => {
      const res = partTwo(example);
      expect(res).toEqual(6);
    });

    it('should work with the input', () => {
      const res = partTwo(input);
      expect(res).toEqual(3305);
    });
  });
});
