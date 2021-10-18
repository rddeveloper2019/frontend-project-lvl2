import _ from 'lodash';

export const getMarker = (selector) => {
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

const addSpaces = (spacesCount) => ' '.repeat(4).repeat(spacesCount);

const generateValue = (depth, value) => {
  if (!_.isPlainObject(value)) return `${value}`;

  const keys = _.keys(value);
  const lines = keys.map((key) => {
    const part1 = `${addSpaces(depth + 1)}${key}: `;
    const part2 = `${generateValue(depth + 1, value[key])}`;

    return `${part1}${part2}`;
  });
  return `{\n${lines.join('\n')}\n${addSpaces(depth)}}`;
};

const stylish = (diffs) => {
  const sanitize = (values, depth = 0) => {
    const lines = values.map((item) => {
      const {
        itemName, status,
      } = item;

      switch (status) {
        case 'SUBOBJECTS': {
          const { children } = item;
          return `${addSpaces(depth)}${getMarker(status)}${itemName}: {\n${sanitize(children, depth + 1)}${addSpaces(depth + 1)}}\n`;
        }

        case 'MODIFIED': {
          const { oldValue, itemValue } = item;
          const previousLine = `${addSpaces(depth)}${getMarker('DELETED')}${itemName}: ${generateValue(depth + 1, oldValue)}\n`;

          const nextLine = `${addSpaces(depth)}${getMarker('ADDED')}${itemName}: ${generateValue(depth + 1, itemValue)}\n`;
          return `${previousLine}${nextLine}`;
        }

        case 'ADDED':
        case 'DELETED':
        case 'SIMILAR': {
          const { itemValue } = item;
          return `${addSpaces(depth)}${getMarker(status)}${itemName}: ${generateValue(depth + 1, itemValue)}\n`;
        }

        default:
          throw new Error(`Invalid status selector: <${status}>`);
      }
    });

    return lines.join('');
  };
  const result = sanitize(diffs);
  return `{\n${result}}`;
};

export default stylish;
