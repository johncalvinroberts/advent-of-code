import { readFile } from '@utils';
import { runner } from '../part_one';
import { runner as partTwo } from '../part_two';
import path from 'path';

describe('--- Day 9: Encoding Error ---', () => {
  let example: string;
  let input: string;
  beforeAll(async () => {
    example = await readFile(path.resolve(__dirname, '../example.txt'));
    input = await readFile(path.resolve(__dirname, '../input.txt'));
  });

  describe('part one', () => {
    it('should work with the example', () => {
      const preambleSize = 5;
      const res = runner(example, preambleSize);
      expect(res).toEqual(127);
    });

    it('should work with the input', async () => {
      const preambleSize = 25;
      const res = runner(input, preambleSize);
      expect(res).toEqual(22406676);
    });
  });

  describe('part two', () => {
    it('should work with the example', () => {});

    it('should work with the input', () => {});
  });
});
