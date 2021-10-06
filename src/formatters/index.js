import stylish from './stylish.js';

const selectFormatter = (format, data) => {
  switch (format) {
    case ('stylish'):
      return stylish(data);
    default:
      return 'Unknown format';
  }
};

export default selectFormatter;
