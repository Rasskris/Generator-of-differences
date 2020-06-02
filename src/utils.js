import fs from 'fs';
import path from 'path';
import process from 'process';

export const getType = (filepath) => path.extname(filepath).slice(1);
export const getContent = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
