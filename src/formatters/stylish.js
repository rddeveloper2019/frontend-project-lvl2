import _ from 'lodash';
import stringifyArray from '../services/stringifyArray.js';
import { getMarker } from '../services/markers.js';

const addSpaces = (spacesCount) => {
  const blank = [];
  blank.length = 4 * spacesCount - 2;
  return blank.fill(' ').join('');
};
console.log('null');

const generateLine = (depth, status, key, value) => {
  const part1 = `${addSpaces(depth)}${getMarker(status)} ${key}:`;
  const part2 = ` ${value}\n`;
  if (value === undefined) return part1;
  return part1 + part2;
};

const printLastNode = (lastNode) => {
  const {
    key, depth, status,
  } = lastNode;

  let { oldValue, value } = lastNode;

  //! for Arrays
  if (_.isArray(oldValue)) {
    oldValue = stringifyArray(oldValue);
  }

  if (_.isArray(value)) {
    value = stringifyArray(value);
  }

  if (status === 'UPDATED') {
    const previousLine = generateLine(depth, status, key, oldValue);
    const nextLine = generateLine(depth, 'ADDED', key, value);
    return `${previousLine}${nextLine}`;
  }

  return generateLine(depth, status, key, value);
};

const stylish = (diffsWithMeta) => {
  const printAll = (values) => {
    const lines = values.map((item) => {
      const {
        key, depth, status, value,
      } = item;

      let { children } = item;

      if (!_.isPlainObject(value)) {
        return printLastNode(item);
      }

      const tempStatus = status !== 'UPDATED' ? status : 'BLANK';

      //! removing unnecessary markers;

      if (status !== 'UPDATED') {
        children = children.map((oldChild) => {
          const child = _.cloneDeep(oldChild);
          child.status = 'BLANK';
          return child;
        });
      }

      const line = `${generateLine(depth, tempStatus, key)} {\n${printAll(children)} ${addSpaces(depth)} }\n`;
      return line;
    });

    return lines.join('');
  };
  const result = printAll(diffsWithMeta);
  return `{\n${result}}`;
};

export default stylish;
