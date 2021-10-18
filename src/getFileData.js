import fs from 'fs';
import path from 'path';

const getFileData = (filepath) => {
  const filePath = path.resolve(filepath);
  const readData = fs.readFileSync(filePath, 'utf-8');
  const format = path.extname(filepath).slice(1);
  return { readData, format };
};

export default getFileData;
