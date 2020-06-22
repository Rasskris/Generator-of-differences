import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};
export default (type, content) => parser[type](content);
