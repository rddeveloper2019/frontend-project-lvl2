import _ from 'lodash';
import customStringify from '../services/customStringify.js';
import { getMarker } from '../services/utils.js';

const addSpaces = (spacesCount) => ' '.repeat(4 * spacesCount - 2);

const printSimple = (simpleNode) => {
  console.log('HERE IS PLAIN');
  const {
    key, depth: count, newValueStatus, status,
  } = simpleNode;

  let { oldValue, value } = simpleNode;
  let previousLine = '';
  let line = '';

  if (_.isArray(oldValue)) {
    oldValue = customStringify(oldValue);
  }

  if (_.isArray(value)) {
    value = customStringify(value);
  }

  if (newValueStatus) {
    previousLine += `${addSpaces(count)}${getMarker(status)} ${key}: ${oldValue}\n`;
    line = `${addSpaces(count)}${getMarker(newValueStatus)} ${key}: ${value}\n`;
    return `${previousLine}${line}`;
  }

  line = `${addSpaces(count)}${getMarker(status)} ${key}: ${value}\n`;

  return line;
};

const stylish = (diffsWithMeta) => {
  const printAll = (values) => {
    const linesArray = values.map((item) => {
      const {
        key, depth: count, status, allNodes,
      } = item;
      console.log(allNodes);
      let { children } = item;
      let marker = getMarker('NON');

      if (item.elementType === 'Simple') {
        return printSimple(item);
      }

      if (status === 'ADDED' || status === 'DELETED' || status === 'NON') {
        children = children.map((oldChild) => {
          const child = _.cloneDeep(oldChild);
          child.status = 'NON';
          return child;
        });
        marker = getMarker(status);
      }

      const line = `${addSpaces(count)}${marker} ${key}: {\n${printAll(children)} ${addSpaces(count)} }\n`;
      return line;
    });

    return linesArray.join('');
  };
  const result = printAll(diffsWithMeta);
  return `{\n${result}}`;
};

export default stylish;
