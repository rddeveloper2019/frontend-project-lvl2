import _ from 'lodash';

import { getMarker } from '../services/markers.js';

const addSpaces = (spacesCount) => ' '.repeat(4).repeat(spacesCount);
const generateValue = (depth, value) => {
  if (!_.isPlainObject(value)) return `${value}`;

  const keys = _.keys(value);
  const lines = keys.map((key) => {
    const part1 = `${addSpaces(depth + 1)}${key}: `;
    const part2 = `${generateValue(depth + 1, value[key])}`;

    return part1 + part2;
  });
  return `{\n${lines.join('\n')}\n${addSpaces(depth)}}`;
};

const print = (item, depth) => {
  const {
    itemName, itemValue, status,
  } = item;

  if (status === 'MODIFIED') {
    const { oldValue } = item;
    const previousLine = `${addSpaces(depth)}${getMarker('DELETED')}${itemName}: ${generateValue(depth + 1, oldValue)}\n`;

    const nextLine = `${addSpaces(depth)}${getMarker('ADDED')}${itemName}: ${generateValue(depth + 1, itemValue)}\n`;
    return `${previousLine}${nextLine}`;
  }

  return `${addSpaces(depth)}${getMarker(status)}${itemName}: ${generateValue(depth + 1, itemValue)}\n`;
};

const stylish = (diffs) => {
  const sanitize = (values, depth = 0) => {
    const lines = values.map((item) => {
      const {
        itemName, status, children,
      } = item;

      if (status !== 'SUBOBJECTS') {
        return print(item, depth);
      }

      return `${addSpaces(depth)}${getMarker(status)}${itemName}: {\n${sanitize(children, depth + 1)}${addSpaces(depth + 1)}}\n`;
    });

    return lines.join('');
  };
  const result = sanitize(diffs);
  return `{\n${result}}`;
};

export default stylish;
