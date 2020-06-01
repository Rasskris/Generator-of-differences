import path from 'path';
import genDiff from '../src';

test('genDiff', () => {
  const getPath = (filename) => path.join(__dirname, `__fixtures__${filename}`);
  const before = getPath('before.json');
  const after = getPath('after.json');
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
