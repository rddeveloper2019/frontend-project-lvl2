import _ from 'lodash';

const getNodeType = (data) => {
  if (_.isPlainObject(data)) return { type: 'Object', nodeType: 'Node' };
  if (_.isArray(data)) return { type: 'Simple', nodeType: 'List' };
  return { type: 'Simple', nodeType: 'List' };
};

export default getNodeType;
