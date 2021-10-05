import _ from 'lodash';

const addSpaces = (spacesCount) => {
  const array = [];
  array.length = spacesCount;
  return _.chain(array).fill(' ').join('').value();
};

const getMarkerBy = (status) => {
  // if (nodeType !== 'List') return '';

  const markers = {
    SIMILAR: ' ',
    DELETED: '-',
    ADDED: '+',
    CORRECTED: '-',
    UPDATED: '+',
    NON: ' ',
  };

  return markers[status];
};

const exp = {
  key: 'follow',
  value: false,
  oldValue: [],
  nestingLevel: 1,
  status: 'DELETED',
  children: [],
  elementType: 'Simple',
  nodeType: 'List',
};

const stylishSimple = (valueWithMeta, requestedStatus) => {
  const {
    key, value, oldValue, nestingLevel: count, newValueStatus,
  } = valueWithMeta;

  let { status } = valueWithMeta;

  let lineBefore = '';
  let line = '';

  if (requestedStatus === 'NON') {
    status = 'NON';
  }

  if (newValueStatus) {
    lineBefore += `${addSpaces(count)} ${getMarkerBy(status)} ${key}: ${oldValue}\n`;
    line = `${addSpaces(count)} ${getMarkerBy(newValueStatus)} ${key}: ${value}\n`;
    return lineBefore + line;
  }

  return `${addSpaces(count)} ${getMarkerBy(status)} ${key}: ${value}\n`;
};

const stylish = (valuesWithMeta) => {
  const linesArray = valuesWithMeta.map((item) => {
    const {
      key, nestingLevel: count, children,
    } = item;

    const { status } = item;

    if (item.elementType === 'Simple') {
      return stylishSimple(item);
    }

    const newStatus = 'NON';
    let marker = getMarkerBy(newStatus);

    if (status === 'ADDED' || status === 'DELETED' || status === 'NON') {
      children.map((item) => item.status = newStatus);
      marker = getMarkerBy(status);
    }

    const line = `${addSpaces(count)} ${marker} ${key}: ${stylish(children)}`;
    return line;
  });
  const result = `{\n${linesArray.join('')}}`;
  return result;
};
export default stylish;
