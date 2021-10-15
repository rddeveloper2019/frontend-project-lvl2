import _ from 'lodash';

const stringifyValue = ((value) => {
  if (_.isPlainObject(value) || _.isArray(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
});

const plain = (diffs) => {
  const sanitize = (values, parentNodes = []) => {
    const lines = values.filter((item) => item.status !== 'SIMILAR').map((item) => {
      const {
        itemName, status,
      } = item;

      const path = [...parentNodes, itemName].map(((node) => node)).join('.');

      switch (status) {
        case 'SUBOBJECTS': {
          const { children } = item;
          const nodeList = [...parentNodes, itemName];
          return sanitize(children, nodeList);
        }

        case 'MODIFIED': {
          const { oldValue, itemValue } = item;
          return `Property '${path}' was updated. From ${stringifyValue(oldValue)} to ${stringifyValue(itemValue)}`; }

        case 'DELETED':
          return `Property '${path}' was removed`;

        case 'ADDED': {
          const { itemValue } = item;
          return `Property '${path}' was added with value: ${stringifyValue(itemValue)}`;
        }

        default:
          throw new Error(`Invalid status selector: <${status}>`);
      }
    });

    return lines.join('\n');
  };

  return sanitize(diffs);
};

export default plain;
