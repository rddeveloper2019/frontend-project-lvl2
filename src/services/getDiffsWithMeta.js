import _ from 'lodash';

const setMeta = (key = '', value, status, depth, children = [], nodes = '', oldValue = []) => {
  const meta = {
    key,
    value,
    nodeList: [...nodes],
    oldValue,
    depth,
    status,
    children,
  };

  return meta;
};

const getDiffsWithMeta = (obj1, obj2, depth = 1, prevNodes = []) => {
  const firstObj = _.isPlainObject(obj1) ? _.cloneDeep(obj1) : {};
  const secondObj = _.isPlainObject(obj2) ? _.cloneDeep(obj2) : {};
  const allKeys = _.sortBy(_.union(_.keys(firstObj), _.keys(secondObj)));

  const valuesWithMeta = allKeys.map((key) => {
    const setNodes = (status, value) => [...prevNodes, { [key]: [status, value] }];

    // eslint-disable-next-line max-len
    const setChildren = (status, value) => getDiffsWithMeta(firstObj[key], secondObj[key], depth + 1, setNodes(status, value)) || [];

    if (!_.has(firstObj, key)) {
      return setMeta(key, secondObj[key], 'ADDED', depth, setChildren('ADDED', secondObj[key]), setNodes('ADDED', secondObj[key]));
    }
    if (!_.has(secondObj, key)) {
      return setMeta(key, firstObj[key], 'DELETED', depth, setChildren('DELETED', firstObj[key]), setNodes('DELETED', firstObj[key]));
    }
    if (_.isEqual(firstObj[key], secondObj[key])) {
      return setMeta(key, firstObj[key], 'SIMILAR', depth, setChildren('SIMILAR', firstObj[key]), setNodes('SIMILAR', firstObj[key]));
    }

    if (_.isPlainObject(firstObj[key]) !== _.isPlainObject(secondObj[key])) {
      return [setMeta(key, firstObj[key], 'REPLACED', depth, setChildren('REPLACED', firstObj[key]), setNodes('REPLACED', firstObj[key])),
        setMeta(key, secondObj[key], 'PLACED', depth, setChildren('PLACED', secondObj[key]), setNodes('PLACED', secondObj[key]))].flat();
    }
    return setMeta(key, secondObj[key], 'UPDATED', depth, setChildren('UPDATED', secondObj[key]), setNodes('UPDATED', secondObj[key]), firstObj[key]);
  });

  const result = _.chain(valuesWithMeta).flatten().value();
  // console.log(JSON.stringify(result));
  return result;
};

export default getDiffsWithMeta;
