import { getType, getContent } from './utils';
import parse from './parsers';
import buildDiff from './buildDiff';
import render from './formatters/index';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileType1 = getType(filepath1);
  const fileType2 = getType(filepath2);

  const fileContant1 = getContent(filepath1);
  const fileContant2 = getContent(filepath2);

  const data1 = parse(fileType1, fileContant1);
  const data2 = parse(fileType2, fileContant2);

  const diff = buildDiff(data1, data2);
  return render(diff, format);
};

export default genDiff;
