import stylish from './stylish.js';
import plain from './plain.js';

const selectFormatter = (format, data) => {
  switch (format) {
    case ('stylish'):
      return stylish(data);
    case ('plain'):
      return plain(data);
    default:
      return 'Unknown format';
  }
};

export default selectFormatter;
