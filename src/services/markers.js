const getMarker = (status) => {
  switch (status) {
    case ('SIMILAR'):
      return '    ';
    case ('ADDED'):
      return '  + ';
    case ('DELETED'):
      return '  - ';
    default:
      return '    ';
      // throw new Error('Unknown status', status);
  }
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
