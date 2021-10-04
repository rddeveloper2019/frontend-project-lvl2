const parseToObject = ({ data, type }) => {
  switch (type) {
    case '.json':
      return JSON.parse(data);
    default:
      return {};
  }
};

export default parseToObject;
