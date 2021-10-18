import { parse as YAMLparse } from 'yaml';

const parseToObject = (fileData) => {
  const { readData, format } = fileData;
  switch (format) {
    case 'json':
      return JSON.parse(readData);
    case 'yaml':
    case 'yml':
      return YAMLparse(readData);
    default:
      throw new Error(`parseObjects: invalid format type <${format}>`);
  }
};

export default parseToObject;
