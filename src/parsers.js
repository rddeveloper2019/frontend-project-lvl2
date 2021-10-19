import { parse as YAMLparse } from 'yaml';

const parseToObject = (fileData) => {
  const { data, format } = fileData;
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return YAMLparse(data);
    default:
      throw new Error(`parseObjects: invalid format type <${format}>`);
  }
};

export default parseToObject;
