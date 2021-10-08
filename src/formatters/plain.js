import _ from 'lodash';

import { getKeywords } from '../services/markers.js';

const stringifyValue = ((value) => {
  if (_.isPlainObject(value) || _.isArray(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
});

const getWasUpdatedFormToStr = (oldValue, newValue) => `From ${stringifyValue(oldValue)} to ${stringifyValue(newValue)}`;

const renderModified = (path, status, itemValue, oldValue) => {
  const valueBefore = oldValue;
  const valueAfter = itemValue;

  const firstPart = getKeywords(status, path);
  const secondPart = getWasUpdatedFormToStr(valueBefore, valueAfter);
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
      if (status !== 'HAS_CHILDREN') {
        return print(item, nodeList);
      }

      return sanitize(children, nodeList);
    });

    return lines.join('\n');
  };
  // console.log(sanitize(diffs));

  return sanitize(diffs);
};

export default plain;
