import { getType, getContent } from './utils.js';
import parser from './parsers.js';
import buildDiff from './buildDiff.js';
import render from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileType1 = getType(filepath1);
  const fileType2 = getType(filepath2);

  const fileContant1 = getContent(filepath1);
  const fileContant2 = getContent(filepath2);

  const data1 = parser(fileType1, fileContant1);
  const data2 = parser(fileType2, fileContant2);

  const diff = buildDiff(data1, data2);
  return render(diff, format);
};

export default genDiff;
