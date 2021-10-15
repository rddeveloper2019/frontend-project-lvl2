import { parse as YAMLparse } from 'yaml';

const parseToObject = (data, parserType) => {
  switch (parserType) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return YAMLparse(data);
    default:
      throw new Error(`parseObjects: invalid parser type <${parserType}>`);
  }
};

export default parseToObject;
