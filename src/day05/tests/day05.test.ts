import { readFile } from '@utils';
import { runner, getSeatId } from '../part_one';
import { runner as partTwo } from '../part_two';
import path from 'path';

describe('--- Day 5: Binary Boarding ---', () => {
  let individualCase = 'FBFBBFFRLR';
  let example: string;
  let input: string;
  beforeAll(async () => {
    example = await readFile(path.resolve(__dirname, '../example.txt'));
    input = await readFile(path.resolve(__dirname, '../input.txt'));
  });

  describe('part one', () => {
    it('should get the seat ID', () => {
      const seatId = getSeatId(individualCase);
      expect(seatId).toEqual(357);
    });

    it('should work with the example', () => {
      const res = runner(example);
      expect(res).toBe(820);
    });

    it('should work with the input', async () => {
      const res = runner(input);
      expect(res).toBe(906);
    });
  });

  describe('part two', () => {
    it('should work with the example', () => {});

    it('should work with the input', () => {});
  });
});
