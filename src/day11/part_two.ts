import path from 'path';
import { readFile } from '../utils';
import { PositionTypeEnum } from './part_one';

const isSeatOccupied = (value: string) => value === PositionTypeEnum.occupied;

const look = (
  i: number,
  j: number,
  rows: string[][],
  direction: 'vertical' | 'horizontal',
): string[] => {
  let lengthOfLook = direction === 'vertical' ? rows.length : rows[i].length;
  // console.log({ lengthOfLook });
  const lookupArray: string[] =
    direction === 'vertical' ? rows.map((item) => item[j]) : rows[i];
  let frontSeat;
  let behindSeat;
  for (let k = 1; k < lengthOfLook / 2; k++) {
    const forward = lookupArray[j + k];
    const backward = lookupArray[j - k];
    // console.log({ forward, backward });
    if (isSeatOccupied(forward) && !frontSeat) {
      frontSeat = forward;
    }

    if (isSeatOccupied(backward) && !behindSeat) {
      behindSeat = backward;
    }

    if (frontSeat && behindSeat) {
      break;
    }
  }
  let ret = [];
  if (frontSeat) ret.push(frontSeat);
  if (behindSeat) ret.push(behindSeat);
  return ret;
};

const alternateUntilEqualized = (rows: string[][]): number => {
  let ret: string[][] = [];
  let totalOccupied: number = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const nextRow: string[] = [];
    for (let j = 0; j < row.length; j++) {
      const current = row[j];
      let next = current;

      if (current !== PositionTypeEnum.floor) {
        const visibleOccupied = [
          ...look(i, j, rows, 'vertical'),
          ...look(i, j, rows, 'horizontal'),
        ];
        console.log({ visibleOccupied });
        if (
          current === PositionTypeEnum.empty &&
          visibleOccupied.length === 0
        ) {
          next = PositionTypeEnum.occupied;
        }

        if (
          current === PositionTypeEnum.occupied &&
          visibleOccupied.length >= 5
        ) {
          next = PositionTypeEnum.empty;
        }
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
    // const input = await readFile(path.resolve(__dirname, './input.txt'));
    const input = await readFile(path.resolve(__dirname, './example.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
