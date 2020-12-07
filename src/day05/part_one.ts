import path from 'path';
import { readFile } from '@utils';

/**
  
  Find the 
 
  There are 128 (0-127) rows, and a boarding pass ID is encoded like:
  FBFBBFFRLR 
  where F means "front", B means "back", L means "left", and R means "right".

  There are still some rules on top of this encoding, it composes:
  7 characters of F or B
  * The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane;
  * Each letter in that first 7 characters is a binary slice, e.g. F -> first half, followed by another F, means first quarter of the plane.
  * AkA, [firstHalf, secondHalf] -> F -> firstHalf -> divide firstHalf by two, then repeat
  The last 3 Characters of L or R
  * these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7).
  * The same process as above proceeds again, this time with only three steps. 
  * L means to keep the lower half, while R means to keep the upper half.
  So, decoding FBFBBFFRLR reveals that it is the seat at row 44, column 5.

  Seat ID = {row} * 8 + {column}

  The input is a list of boarding passes, find> what is the highest seat ID on a boarding pass?
 */

const ROWS = 127;
const COLUMNS = 7;

const mappings: Record<string, string[]> = {
  columns: ['F', 'B'],
  rows: ['L', 'R'],
};

const search = (string: string, initial: number, map: string[]) => {
  let stack = Array.from({ length: initial }, (_, i) => i);
  for (let index = 0; index < string.length; index++) {
    const letter = string[index];
    const halfIndex = Math.floor(stack.length / 2);
    // const
  }
};

export const getSeatId = (boardingPass: string): number => {
  console.log('boardingPass', boardingPass);
  const rows = boardingPass.slice(0, 6);
  const columns = boardingPass.slice(6);

  return 0;
};

export const runner = (input: string): number => {
  return 0;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
