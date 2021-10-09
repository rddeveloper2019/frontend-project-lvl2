import _ from 'lodash';

import { getKeywords } from '../services/markers.js';

const stringifyValue = ((value) => {
  if (_.isPlainObject(value) || _.isArray(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
});

const renderModified = (path, status, currentValue, oldValue) => {
  const firstPart = getKeywords(status, path);
  const secondPart = `From ${stringifyValue(oldValue)} to ${stringifyValue(currentValue)}`;

  return `${firstPart + secondPart}`;
};

const print = (item, parentNodes) => {
  const path = parentNodes.map(((node) => node)).join('.');

  const {
    status, itemValue, oldValue,
  } = item;

  if (status === 'MODIFIED') {
    return renderModified(path, status, itemValue, oldValue);
  }
  if (status === 'DELETED') {
    return `${getKeywords(status, path)}`;
  }

  return `${getKeywords(status, path)}${stringifyValue(itemValue)}`;
};

const plain = (diffs) => {
  const sanitize = (values, parentNodes = []) => {
    const lines = values.filter((item) => item.status !== 'SIMILAR').map((item) => {
      const {
        itemName, status, children,
      } = item;

      const nodeList = [...parentNodes, itemName];
      if (status !== 'SUBOBJECTS') {
        return print(item, nodeList);
      }

      return sanitize(children, nodeList);
    });

    return lines.join('\n');
  };

  return sanitize(diffs);
};

export default plain;
