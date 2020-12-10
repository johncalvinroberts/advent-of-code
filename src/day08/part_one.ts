import path from 'path';
import { readFile } from '../utils';

/**
 * The input is "boot code" - executable machine instructions
 *
 * one instruction per line of text.
 * Each instruction consists of an operation (acc, jmp, or nop) and an argument (a signed number like +4 or -20).
 *
 * acc - increase the global "accumulator" .by the arg
 * jmp - jump to a new instruction, relative to its current position, aka jmp +2 jumps two lines forward
 * nop - noop
 *
 *
 * The goal: detect when infinite loop starts,
 * and find: immediately before any instruction is executed a second time, what value is in the accumulator?
 */

export enum Commands {
  nop = 'nop',
  acc = 'acc',
  jmp = 'jmp',
}

export const runner = (input: string): number => {
  const instructions = input.split('\n');
  let calls = new Set();
  let accumulator = 0;

  const execLine = (index: number) => {
    if (!calls.has(index)) {
      const line = instructions[index];
      const [command, value] = line.split(' ');
      let nextIndex = index + 1;

      switch (command) {
        case Commands.acc:
          accumulator = accumulator + parseInt(value);
          break;

        case Commands.jmp:
          nextIndex = index + parseInt(value);
          break;
        case Commands.nop:
        default:
          break;
      }

      calls.add(index);
      execLine(nextIndex);
    }
  };
  execLine(0);
  return accumulator;
};

if (require.main === module) {
  (async () => {
    const input = await readFile(path.resolve(__dirname, './input.txt'));
    const res = runner(input);
    console.log(`The result is: ${res}`);
  })();
}
