import { readFile } from '@utils';
import { runner } from '../part_one';
import { runner as partTwo } from '../part_two';
import path from 'path';

describe('--- Day 4: Passport Processing ---', () => {
  let example: string;
  let input: string;
  let partTwoExample: string;
  beforeAll(async () => {
    example = await readFile(path.resolve(__dirname, '../example.txt'));
    partTwoExample = await readFile(
      path.resolve(__dirname, '../part_two_example.txt'),
    );
    input = await readFile(path.resolve(__dirname, '../input.txt'));
  });

  describe('part one', () => {
    it('should work with the example', () => {
      const res = runner(example);
      expect(res).toEqual(2);
    });

    it('should work with the input', async () => {
      const res = runner(input);
      expect(res).toEqual(202);
    });
  });

  describe('part two', () => {
    it('should work with the example', () => {
      const res = partTwo(partTwoExample);
      expect(res).toEqual(4);
    });

    it('should work with the input', () => {
      const res = partTwo(input);
      expect(res).toEqual(137);
    });
  });
});
