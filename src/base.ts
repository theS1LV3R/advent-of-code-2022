import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const getLines = <T extends string>(dir: ImportMeta['url']) =>
  readFileSync(resolve(dirname(fileURLToPath(dir)), 'input.txt'))
    .toString()
    .split('\n') as T[];
