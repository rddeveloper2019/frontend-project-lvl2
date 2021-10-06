import _ from 'lodash';

const addSpaces = (spacesCount) => ' '.repeat(4 * spacesCount - 2);

const getMarkerBy = (status) => {
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

const printSimple = (valueWithMeta) => {
  const {
    key, value, oldValue, nestingLevel: count, newValueStatus, status,
  } = valueWithMeta;

  let previousLine = '';
  let line = '';

  if (newValueStatus) {
    previousLine += `${addSpaces(count)}${getMarkerBy(status)} ${key}: ${oldValue}\n`;
    line = `${addSpaces(count)}${getMarkerBy(newValueStatus)} ${key}: ${value}\n`;
    return `${previousLine}${line}`;
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
        key, nestingLevel: count, status,
      } = item;
      let { children } = item;

      if (item.elementType === 'Simple') {
        return printSimple(item);
      }

      let marker = getMarkerBy('NON');

      if (status === 'ADDED' || status === 'DELETED' || status === 'NON') {
        children = children.map((oldChild) => {
          const child = _.cloneDeep(oldChild);
          child.status = 'NON';
          return child;
        });

        marker = getMarkerBy(status);
      }

      const line = `${addSpaces(count)}${marker} ${key}: {\n${printAll(children)} ${addSpaces(count)} }\n`;
      return line;
    });

    return linesArray.join('');
  };

  return printAll(newData);
};

export default stylish;
