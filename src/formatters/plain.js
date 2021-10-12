import _ from 'lodash';

export const getKeywords = (selector, path) => {
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

const stringifyValue = ((value) => {
  if (_.isPlainObject(value) || _.isArray(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
});

const plain = (diffs) => {
  const sanitize = (values, parentNodes = []) => {
    const lines = values.filter((item) => item.status !== 'SIMILAR').map((item) => {
      const {
        itemName, status, children, itemValue, oldValue,
      } = item;

      const nodeList = [...parentNodes, itemName];
      const path = nodeList.map(((node) => node)).join('.');

      if (status === 'SUBOBJECTS') {
        return sanitize(children, nodeList);
      }

      const basicInformation = getKeywords(status, path);

      if (status === 'MODIFIED') {
        const valueDetails = `From ${stringifyValue(oldValue)} to ${stringifyValue(itemValue)}`;

        return `${basicInformation}${valueDetails}`;
      }

      if (status === 'DELETED') {
        return `${basicInformation}`;
      }

      return `${basicInformation}${stringifyValue(itemValue)}`;
    });

    return lines.join('\n');
  };

  return sanitize(diffs);
};

export default plain;
