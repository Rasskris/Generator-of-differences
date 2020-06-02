import { has } from 'lodash';
import { getType, getContent } from './utils';
import parse from './parsers';

const genDiff = (filepath1, filepath2) => {
  const fileType1 = getType(filepath1);
  const fileType2 = getType(filepath2);

  const fileContant1 = getContent(filepath1);
  const fileContant2 = getContent(filepath2);

  const data1 = parse(fileType1, fileContant1);
  const data2 = parse(fileType2, fileContant2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqKeys = new Set(keys1.concat(keys2)).values();
  const allKeys = [...uniqKeys];

  const getDiff = allKeys.reduce((acc, key) => {
    if (has(data1, key) && has(data2, key)) {
      if (data1[key] === data2[key]) {
        return [...acc, `    ${key}: ${data2[key]}`];
      }
      return [...acc, `  + ${key}: ${data2[key]}`, `  - ${key}: ${data1[key]}`];
    }
    if (has(data1, key) && !has(data2, key)) {
      return [...acc, `  - ${key}: ${data1[key]}`];
    }
    return [...acc, `  + ${key}: ${data2[key]}`];
  }, []).join('\n');

  return `{ \n${getDiff}\n }`;
};

export default genDiff;
