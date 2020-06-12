import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const filetypes = ['json', 'yml', 'ini'];
const fileFormats = ['stylish'];

const args = fileFormats.flatMap((format) => (
  filetypes.map((type) => [type, format])
));

test.each(args)('find some difference %s', (type, format) => {
  const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);
  const before = getPath(`before.${type}`);
  const after = getPath(`after.${type}`);
  const result = fs.readFileSync(getPath(format), 'utf-8');
  expect(genDiff(before, after)).toEqual(result);
});
