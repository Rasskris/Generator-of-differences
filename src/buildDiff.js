import { has, isObject, union } from 'lodash';

const nodes = [
  {
    check: (key, data1, data2) => data1[key] === data2[key],
    process: (key, value) => ({ key, type: 'unchanged', value }),
  },
  {
    check: (key, data1) => !has(data1, key),
    process: (key, _value1, value2) => ({ key, type: 'added', value2 }),
  },
  {
    check: (key, _data1, data2) => !has(data2, key),
    process: (key, value) => ({ key, type: 'removed', value }),
  },
  {
    check: (key, data1, data2) => data1[key] !== data2[key],
    process: (key, value1, value2) => ({
      key,
      type: 'changed',
      valueBefore: value1,
      valueAfter: value2,
    }),
  },
  {
    check: (key, data1, data2) => isObject(data1[key]) && isObject(data2[key]),
    process: (key, value1, value2, fn) => ({ key, type: 'nested', children: fn(value1, value2) }),
  },
];

const getNode = (key, data1, data2) => nodes.find(({ check }) => check(key, data1, data2));

const buildDiff = (data1, data2) => {
  const keys = union(Object.keys(data1), Object.keys(data2));
  return keys.map((key) => {
    const { process } = getNode(key, data1, data2);
    return process(key, data1[key], data2[key]);
  });
};

export default buildDiff;
