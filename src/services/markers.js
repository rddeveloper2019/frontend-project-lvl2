const getMarker = (selector) => {
  switch (selector) {
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

const getKeywords = (selector, path) => {
  switch (selector) {
    case 'DELETED':
      return `Property '${path}' was removed`;
    case 'ADDED':
      return `Property '${path}' was added with value: `;
    case 'MODIFIED':
      return `Property '${path}' was updated. `;
    default:
      return console.log('Unknown selector', selector);
  }
};

export { getMarker, getKeywords };
