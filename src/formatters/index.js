import getStylish from './stylish.js';
import getPlain from './plain.js';

const render = {
  stylish: getStylish,
  json: JSON.stringify,
  plain: getPlain,
};

export default (data, format) => render[format](data);
