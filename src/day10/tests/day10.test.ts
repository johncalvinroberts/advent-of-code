import { readFile } from '@utils';
import { runner } from '../part_one';
import { runner as partTwo } from '../part_two';
import path from 'path';

describe('--- Day 10: Adapter Array ---', () => {
  let example: string;
  let simpleExample: string;
  let input: string;
  beforeAll(async () => {
    example = await readFile(path.resolve(__dirname, '../example.txt'));
    simpleExample = await readFile(
      path.resolve(__dirname, '../simple_example.txt'),
    );
    input = await readFile(path.resolve(__dirname, '../input.txt'));
  });

  describe('part one', () => {
    it('should work with the example', () => {
      const res = runner(example);
      expect(res).toEqual(220);
    });

    it('should work with the input', async () => {
      const res = runner(input);
      expect(res).toEqual(2240);
    });
  });

  describe('part two', () => {
    it('should work with the simple example', () => {
      const res = partTwo(simpleExample);
      expect(res).toEqual(8);
    });

    it('should work with the example', () => {
      const res = partTwo(example);
      expect(res).toEqual(19208);
    });

    it('should work with the input', () => {
      const res = partTwo(input);
      expect(res).toEqual(99214346656768);
    });
  });
});
