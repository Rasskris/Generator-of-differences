import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const unionKey = _.union(Object.keys(data1), Object.keys(data2)).sort();
  return unionKey.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }
    if (data1[key] === data2[key]) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    return {
      key,
      type: 'changed',
      beforeValue: data1[key],
      afterValue: data2[key],
    };
  });
};

export default buildDiff;
