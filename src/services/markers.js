const getMarker = (status) => {
  const markers = {
    SIMILAR: ' ',
    DELETED: '-',
    ADDED: '+',
    UPDATED: '-',
    REPLACED: '-',
    PLACED: '+',
    BLANK: ' ',
  };
  return markers[status];
};

const getKeyword = (status) => {
  const keywords = {
    SIMILAR: '',
    DELETED: 'removed',
    ADDED: 'added',
    UPDATED: 'updated',
    REPLACED: 'updated',
    PLACED: ' ',
    BLANK: '',
  };
  return keywords[status];
};

export { getMarker, getKeyword };
