import path from 'path';
import { readFile } from '../utils';
import { Commands } from './part_one';

export const runner = (input: string): number => {
  const instructions = input.split('\n').map((item, index) => {
    const [command, valueStr] = item.split(' ');
    const value = parseInt(valueStr);
    return { command, value, index };
  });

  const allInstructions = instructions
    .filter(
      (item) => item.command === Commands.nop || item.command === Commands.jmp,
    )
    .map(({ command, value, index }) => {
      const originals = [...instructions];
      originals[index] = {
        value,
        index,
        command: command === Commands.nop ? Commands.jmp : Commands.nop,
      };
      return originals;
    });

  let calls = new Set<number>();
  let accumulator = 0;

  const execLine = (
    index: number,
    instructionSet: { command: string; value: number; index: number }[],
  ): boolean => {
    const line = instructionSet[index];
    if (!line) return true;
    if (calls.has(index)) {
      calls.clear();
      accumulator = 0;
      return false;
    }
    calls.add(index);

    const { command, value } = line;

    let nextIndex = index + 1;
    switch (command) {
      case Commands.acc:
        accumulator = accumulator + value;
        break;

      case Commands.jmp:
        nextIndex = index + value;
        break;
      case Commands.nop:
      default:
        break;
    }

    return execLine(nextIndex, instructionSet);
  };
  for (const instructionSet of allInstructions) {
    const ok = execLine(0, instructionSet);
    if (ok) break;
  }
  return accumulator;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
