import _ from 'lodash';

const addSpaces = (spacesCount, type = ' ') => {
  const array = [];
  array.length = spacesCount * 2;
  return _.chain(array).fill(type).join('').value();
};

const getMarkerBy = (status) => {
  const markers = {
    SIMILAR: ' ',
    DELETED: '-',
    ADDED: '+',
    CORRECTED: '-',
    UPDATED: '+',
    NON: '',
  };
  return markers[status];
};

const print = (valueWithMeta) => {
  const {
    key, value, oldValue, nestingLevel: count, newValueStatus, status,
  } = valueWithMeta;

  let lineBefore = '';
  let line = '';

  if (newValueStatus) {
    lineBefore += `${addSpaces(count)}${getMarkerBy(status)}${key}: ${oldValue}\n`;
    line = `${addSpaces(count)}${getMarkerBy(newValueStatus)}${key}: ${value}\n`;
    return `${lineBefore}${line}`;
  }

  line = `${addSpaces(count)}${getMarkerBy(status)}${key}: ${value}\n`;

  return line;
};

const stylish = (valuesWithMeta) => {
  const linesArray = valuesWithMeta.map((item) => {
    const {
      key, nestingLevel: count, children,
    } = item;

    const { status } = item;
    const newStatus = 'NON';
    const oldStatus = status;

    if (item.elementType === 'Simple') {
      return print(item);
    }

    let marker = getMarkerBy(newStatus);

    if (oldStatus === 'ADDED' || oldStatus === 'DELETED' || oldStatus === 'NON') {
      children.map((child) => { child.status = newStatus; });
      marker = getMarkerBy(oldStatus);
    }

    const line = `${addSpaces(count)}${marker}${key}: {\n${stylish(children)}${addSpaces(count)}}\n`;

    return line;
  });

  const string = linesArray.join('');
  // string += '}';
  // linesArray.forEach((line) => {
  //   string += line;
  // });

  // let result = _;

  return string;
};

export default stylish;
