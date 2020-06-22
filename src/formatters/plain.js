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

const getPlain = (diff, concatedKey = '') => diff
  .filter(({ type }) => type !== 'unchanged')
  .map(({
    key,
    type,
    value,
    valueBefore,
    valueAfter,
    children,
  }) => {
    const newKey = concatedKey === '' ? key : `${concatedKey}.${key}`;
    switch (type) {
      case 'added':
        return `Property '${newKey}' was added with value: ${getOutputValue(value)}`;
      case 'removed':
        return `Property '${newKey}' was removed`;
      case 'changed':
        return `Property '${newKey}' was changed from ${getOutputValue(valueBefore)} to ${getOutputValue(valueAfter)}`;
      case 'nested':
        return getPlain(children, newKey);
      default:
        throw new Error(`Unexpected type: '${type}'.`);
    }
  }).join('\n');

export default getPlain;
