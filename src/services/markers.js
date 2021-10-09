const getMarker = (selector) => {
  switch (selector) {
    case ('SIMILAR'):
      return '    ';
    case ('ADDED'):
      return '  + ';
    case ('DELETED'):
      return '  - ';
    case ('SUBOBJECTS'):
      return '    ';
    default:
      throw new Error(`Invalid marker selector  <${selector}>`);
  }
};

const getKeywords = (selector, path) => {
  if (!path) throw new Error(`required  path not received: <${path}>`);
  switch (selector) {
    case 'DELETED':
      return `Property '${path}' was removed`;
    case 'ADDED':
      return `Property '${path}' was added with value: `;
    case 'MODIFIED':
      return `Property '${path}' was updated. `;
    default:
      throw new Error(`Invalid keyword selector <${selector}>`);
  }
};

export { getMarker, getKeywords };
