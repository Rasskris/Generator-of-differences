import pkg from 'lodash';

const { isObject } = pkg;

const getOutputValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const getPlain = (diff, path = '') => diff
  .filter(({ type }) => type !== 'unchanged')
  .map(({
    key,
    type,
    value,
    beforeValue,
    afterValue,
    children,
  }) => {
    const newPath = path === '' ? key : `${path}.${key}`;
    switch (type) {
      case 'added':
        return `Property '${newPath}' was added with value: ${getOutputValue(value)}`;
      case 'removed':
        return `Property '${newPath}' was removed`;
      case 'changed':
        return `Property '${newPath}' was changed from ${getOutputValue(beforeValue)} to ${getOutputValue(afterValue)}`;
      case 'nested':
        return getPlain(children, newPath);
      default:
        throw new Error(`Unexpected type: '${type}'.`);
    }
  }).join('\n');

export default getPlain;
