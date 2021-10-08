import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const selectFormatter = (format, data) => {
  switch (format) {
    case ('stylish'):
      return stylish(data);
    case ('plain'):
      return plain(data);
    case ('json'):
      return json(data);
    default:
      return 'Unknown format';
  }
};

export default selectFormatter;
