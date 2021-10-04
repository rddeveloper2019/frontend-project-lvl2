import { parse as YAMLparse } from 'yaml';

const parseToObject = ({ data, type }) => {
  switch (type) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return YAMLparse(data);
    default:
      return {};
  }
};

export default parseToObject;
