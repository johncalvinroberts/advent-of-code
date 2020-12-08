import path from 'path';
import { readFile } from '../utils';

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

export enum BoardingPassEncodings {
  front = 'F',
  back = 'B',
  left = 'L',
  right = 'R',
}

export const lowerHalf = (l: number, u: number): [number, number] => [
  l,
  u - (u - l + 1) / 2,
];
export const upperHalf = (l: number, u: number): [number, number] => [
  l + (u - l + 1) / 2,
  u,
];

export const getSeatId = (boardingPass: string): number => {
  let rowsMax = 127;
  let row = 0;
  let columnsMax = 7;
  let column = 0;
  for (let index = 0; index < boardingPass.length; index++) {
    const letter = boardingPass[index];
    switch (letter) {
      case BoardingPassEncodings.front:
        [row, rowsMax] = lowerHalf(row, rowsMax);
        break;
      case BoardingPassEncodings.back:
        [row, rowsMax] = upperHalf(row, rowsMax);
        break;
      case BoardingPassEncodings.left:
        [column, columnsMax] = lowerHalf(column, columnsMax);
        break;
      case BoardingPassEncodings.right:
        [column, columnsMax] = upperHalf(column, columnsMax);
        break;
      default:
        break;
    }
  }
  return row * 8 + column;
};

export const runner = (input: string): number => {
  const boardingPasses: string[] = input.split('\n');
  const ids = boardingPasses.map((item) => getSeatId(item));
  const max = ids.reduce(
    (memo, current) => (current > memo ? current : memo),
    0,
  );
  return max;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
