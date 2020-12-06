import { promisify } from 'util';
import { readFile as ogReadFile, rename as ogRename } from 'fs';
import ncp from 'ncp';

export const promisifiedReadFile = promisify(ogReadFile);

export const readFile = (fileName: string) =>
  promisifiedReadFile(fileName, 'utf-8');

export const recursivelyCopy = promisify(ncp);

export const rename = promisify(ogRename);
