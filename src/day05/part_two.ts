import path from 'path';
import { readFile } from '../utils';
import { getSeatId } from './part_one';

export const runner = (input: string): number => {
  const boardingPasses: string[] = input.split('\n');
  const ids = boardingPasses.map((item) => getSeatId(item));
  const unclaimedSeats = Array.from(
    { length: ids.length },
    (_, i) => i + 1,
  ).filter(
    (seatNumber) =>
      ids.indexOf(seatNumber) === -1 &&
      ids.indexOf(seatNumber + 1) > -1 &&
      ids.indexOf(seatNumber - 1) > -1,
  );
  console.log(unclaimedSeats);
  return unclaimedSeats[0];
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
