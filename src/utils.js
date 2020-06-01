import fs from 'fs';
import path from 'path';
import process from 'process';

const getContent = (fileToPath) => fs.readFileSync(path.resolve(process.cwd(), fileToPath), 'utf-8');

export default getContent;
