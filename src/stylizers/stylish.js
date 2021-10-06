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

const printSimple = (valueWithMeta) => {
  const {
    key, value, oldValue, nestingLevel: count, newValueStatus, status,
  } = valueWithMeta;

  let lineBefore = '';
  let line = '';

  if (newValueStatus) {
    lineBefore += `${addSpaces(count)}${getMarkerBy(status)} ${key}: ${oldValue}\n`;
    line = `${addSpaces(count)}${getMarkerBy(newValueStatus)} ${key}: ${value}\n`;
    return `${lineBefore}${line}`;
  }

  line = `${addSpaces(count)}${getMarkerBy(status)} ${key}: ${value}\n`;

  return line;
};

const stylish = (valuesWithMeta) => {
  const newData = ['{\n', ..._.cloneDeep(valuesWithMeta), '}'];

  const printAll = (values) => {
    const linesArray = values.map((item) => {
      if (item === '{\n' || item === '}') {
        return item;
      }

      const {
        key, nestingLevel: count, children, status,
      } = item;

      if (item.elementType === 'Simple') {
        return printSimple(item);
      }

      let marker = getMarkerBy('NON');

      if (status === 'ADDED' || status === 'DELETED' || status === 'NON') {
        children.map((child) => { child.status = 'NON'; });
        marker = getMarkerBy(status);
      }

      const line = `${addSpaces(count)}${marker} ${key}: {\n${printAll(children)}${addSpaces(count)}}\n`;
      return line;
    });

    return linesArray.join('');
  };

  return printAll(newData);
};

export default stylish;
