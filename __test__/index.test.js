import path from 'path';
import genDiff from '../src';

const filetypes = ['json', 'yml', 'ini'];
const filetype = filetypes.flatMap((type) => type);

test.each(filetype)('find some difference %s', (type) => {
  const getPath = (filename) => path.join(__dirname, `__fixtures__/${filename}`);
  const before = getPath(`before.${type}`);
  const after = getPath(`after.${type}`);
  const result = `{ 
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
 }`;
  expect(genDiff(before, after)).toEqual(result);
});
