import { parse as YAMLparse } from 'yaml';

const parseToObject = ({ data, type }) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return YAMLparse(data);
    default:
      throw new Error(`parseObjects: invalid parser type <${type}>`);
  }
};

export default parseToObject;
