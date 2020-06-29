import _ from 'lodash';

const getOutputValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getPlain = (diff) => {
  const iter = (innerDiff, path) => innerDiff
    .filter(({ type }) => type !== 'unchanged')
    .map(({
      key,
      type,
      value,
      beforeValue,
      afterValue,
      children,
    }) => {
      const newPath = path.length <= 1 ? key : [path, key].join('.');
      switch (type) {
        case 'added':
          return `Property '${newPath}' was added with value: ${getOutputValue(value)}`;
        case 'removed':
          return `Property '${newPath}' was removed`;
        case 'changed':
          return `Property '${newPath}' was changed from ${getOutputValue(beforeValue)} to ${getOutputValue(afterValue)}`;
        case 'nested':
          return iter(children, newPath);
        default:
          throw new Error(`Unexpected type: '${type}'.`);
      }
    }).join('\n');
  return iter(diff, []);
};
export default getPlain;
