import _ from 'lodash';

const indentStep = 2;
const getSpaces = (depth) => ' '.repeat(depth + indentStep);

const stringify = (key, value, depth) => {
  const firstIndent = getSpaces(depth);

  if (!_.isObject(value)) {
    return [firstIndent, `${key}: ${value}`].join('');
  }

  const lastIndent = getSpaces(depth + 2);
  const nestedValue = Object
    .entries(value)
    .map(([curKey, curValue]) => {
      if (_.isObject(curValue)) {
        return stringify(curKey, curValue, depth + 8);
      }
      const curFirstIndent = getSpaces(depth + 6);
      return [curFirstIndent, `${curKey}: ${curValue}`].join('');
    })
    .join('\n');

  return [`${firstIndent}${key}: {`, nestedValue, `${lastIndent}}`].join('\n');
};

const getStylish = (diff) => {
  const stylish = (data, depth = 0) => data
    .map(({
      key,
      type,
      value,
      beforeValue,
      afterValue,
      children,
    }) => {
      switch (type) {
        case 'added':
          return stringify(`+ ${key}`, value, depth);
        case 'removed':
          return stringify(`- ${key}`, value, depth);
        case 'unchanged':
          return stringify(`  ${key}`, value, depth);
        case 'changed':
          return `${stringify(`- ${key}`, beforeValue, depth)}\n${stringify(`+ ${key}`, afterValue, depth)}`;
        case 'nested':
          return `${getSpaces(depth)}  ${key}: {\n${stylish(children, depth + 4)}\n${getSpaces(depth)}  }`;
        default:
          throw new Error(`Unexpected type: ${type}.`);
      }
    }).join('\n');
  return `{\n${stylish(diff)}\n}`;
};

export default getStylish;
