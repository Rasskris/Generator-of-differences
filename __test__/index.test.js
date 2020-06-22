import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const filetypes = ['json', 'yml', 'ini'];
const fileFormats = ['stylish', 'plain', 'json'];

const args = fileFormats.flatMap((format) => (
  filetypes.map((type) => [type, format])
));

test.each(args)('%s type files difference with %s output', (type, format) => {
  const getPath = (filename) => path.resolve('__test__', '__fixtures__', filename);
  const before = getPath(`before.${type}`);
  const after = getPath(`after.${type}`);
  const result = fs.readFileSync(getPath(format), 'utf-8');
  expect(genDiff(before, after, format)).toEqual(result);
});
