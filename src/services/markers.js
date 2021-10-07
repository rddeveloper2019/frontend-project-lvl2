const getMarker = (status) => {
  const markers = {
    SIMILAR: ' ',
    DELETED: '-',
    ADDED: '+',
    UPDATED: '-',
    PATCHED: '+',
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
    PATCHED: '',
    NON: '',
  };
  return keywords[status];
};

export { getMarker, getKeyword };
