const stringifyArray = (data) => {
  const string = JSON.stringify(data)
    .split('')
    .map((item) => {
      const symbols = ['[', ']', '{', '}', ':', ','];

      if (symbols.includes(item)) {
        return `${item} `;
      }
      if (item === '"' || item === "'") {
        return '';
      }

      return item;
    })
    .join('');
  return string;
};

export default stringifyArray;
