import pkg from 'lodash';

const { has, isObject, union } = pkg;

const buildDiff = (data1, data2) => {
  const unionKey = union(Object.keys(data1), Object.keys(data2)).sort();
  return unionKey.map((key) => {
    if (!has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (isObject(data1[key]) && isObject(data2[key])) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }
    if (data1[key] === data2[key]) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    return {
      key,
      type: 'changed',
      valueBefore: data1[key],
      valueAfter: data2[key],
    };
  });
};

export default buildDiff;
