const addSpaces = (spacesCount) => ' '.repeat(4 * spacesCount - 2);

const getMarker = (status) => {
  const markers = {
    SIMILAR: ' ',
    DELETED: '-',
    ADDED: '+',
    UPDATED: '-',
    PATCH: '+',
    NON: ' ',
  };
  return markers[status];
};

const getKeyword = (status) => {
  const keywords = {
    SIMILAR: '',
    DELETED: 'removed',
    ADDED: 'added',
    UPDATED: 'updated',
    PATCH: '',
    NON: '',
  };
  return keywords[status];
};

export { getMarker, getKeyword, addSpaces };
