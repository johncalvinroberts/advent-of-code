import path from 'path';
import { readFile } from '../utils';
/**
 * All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:
 * -If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
 * - If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
 * - Otherwise, the seat's state does not change.
 * Floor (.) never changes; seats don't move, and nobody sits on the floor.
 *
 * How many seats end up occupied when everything stops changing?
 */

export enum PositionTypeEnum {
  floor = '.',
  occupied = '#',
  empty = 'L',
}

const alternateUntilEqualized = (rows: string[][]): number => {
  let ret: string[][] = [];
  let totalOccupied: number = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const nextRow: string[] = [];
    const backRow = rows[i - 1] || [];
    const frontRow = rows[i + 1] || [];
    for (let j = 0; j < row.length; j++) {
      const current = row[j];
      let next = current;
      const adjacentOccupied = [
        backRow[j - 1],
        backRow[j],
        backRow[j + 1],
        row[j - 1],
        row[j + 1],
        frontRow[j - 1],
        frontRow[j],
        frontRow[j + 1],
      ].filter((item) => item === PositionTypeEnum.occupied);

      if (current === PositionTypeEnum.empty && adjacentOccupied.length === 0) {
        next = PositionTypeEnum.occupied;
      }

      if (
        current === PositionTypeEnum.occupied &&
        adjacentOccupied.length >= 4
      ) {
        next = PositionTypeEnum.empty;
      }
      if (next === PositionTypeEnum.occupied) totalOccupied++;
      nextRow.push(next);
    }
    ret.push(nextRow);
  }
  const isEqual = JSON.stringify(ret) === JSON.stringify(rows);
  return isEqual ? totalOccupied : alternateUntilEqualized(ret);
};

export const runner = (input: string): number => {
  const rows = input.split('\n').map((item) => item.split(''));
  const count = alternateUntilEqualized(rows);
  return count;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
