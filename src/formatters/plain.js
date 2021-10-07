import _ from 'lodash';
import stringifyArray from '../services/stringifyArray.js';
import { getMarker } from '../services/markers.js';

const addSpaces = (spacesCount) => {
  const blank = [];
  blank.length = 4 * spacesCount - 2;
  return blank.fill(' ').join('');
};

const printSimple = (simpleNode) => {
  const {
    key, depth, additional, status,
  } = simpleNode;

  let { oldValue, value } = simpleNode;
  let previousLine = '';
  let line = '';

  if (_.isArray(oldValue)) {
    oldValue = stringifyArray(oldValue);
  }

  if (_.isArray(value)) {
    value = stringifyArray(value);
  }

  if (additional === 'PATCHED') {
    previousLine += `${addSpaces(depth)}${getMarker(status)} ${key}: ${oldValue}\n`;
    line = `${addSpaces(depth)}${getMarker(additional)} ${key}: ${value}\n`;
    return `${previousLine}${line}`;
  }

  line = `${addSpaces(depth)}${getMarker(status)} ${key}: ${value}\n`;

  return line;
};

const stylish = (diffsWithMeta) => {
  const printAll = (values) => {
    const linesArray = values.map((item) => {
      const {
        key, depth, status, allNodes,
      } = item;
      console.log(allNodes);
      let { children } = item;
      let marker = getMarker('BLANK');

      if (item.elementType === 'Simple') {
        return printSimple(item);
      }

      if (status === 'ADDED' || status === 'DELETED' || status === 'BLANK') {
        children = children.map((oldChild) => {
          const child = _.cloneDeep(oldChild);
          child.status = 'BLANK';
          return child;
        });
        marker = getMarker(status);
      }

      const line = `${addSpaces(depth)}${marker} ${key}: {\n${printAll(children)} ${addSpaces(depth)} }\n`;
      return line;
    });

    return linesArray.join('');
  };
  const result = printAll(diffsWithMeta);
  return `{\n${result}}`;
};

export default stylish;
