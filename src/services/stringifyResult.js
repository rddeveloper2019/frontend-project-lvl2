import _ from 'lodash';

const addSpaces = (spacesCount) => {
  const array = [];
  array.length = spacesCount;
  return _.chain(array).fill(' ').join('').value();
};

const stringifyResult = (separatedData) => {
  const formatByMatrix = (item) => {
    const labelByStatus = {
      left: '-',
      right: '+',
      both: ' ',
    };
    const { data: [key, value], status, nestingLevel: count } = item;
    const string = `${addSpaces(count)} ${labelByStatus[status]} ${key}: ${value}\n`;
    return string;
  };

  let string = '';

  separatedData.forEach((item) => {
    if (_.isArray(item.data[0])) {
      string += stringifyResult(item.data);
    }

    string += formatByMatrix(item);
  });

  return `{\n${string}}`;
};

export default stringifyResult;
