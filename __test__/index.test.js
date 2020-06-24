import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const types = ['json', 'yml', 'ini'];

const getPath = (filename) => path.resolve('__test__', '__fixtures__', filename);

let stylish;
let plain;
let json;
beforeAll(() => {
  stylish = fs.readFileSync(getPath('stylish'), 'utf-8');
  plain = fs.readFileSync(getPath('plain'), 'utf-8');
  json = fs.readFileSync(getPath('json'), 'utf-8');
});

test.each(types)('compare two %s type files difference', (type) => {
  const before = getPath(`before.${type}`);
  const after = getPath(`after.${type}`);
  expect(genDiff(before, after)).toEqual(stylish);
  expect(genDiff(before, after, 'plain')).toEqual(plain);
  expect(genDiff(before, after, 'json')).toEqual(json);
});
