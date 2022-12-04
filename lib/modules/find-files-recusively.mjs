import fs from 'fs';
import path from 'path';

export const getFilesRecursively = (directory, fileExtRegex) => {
  let files = [];
  const recusiveFindFiles = (dir) => {
    const filesInDirectory = fs.readdirSync(dir);
    for (const file of filesInDirectory) {
      const absolute = path.join(dir, file);
      if (fs.statSync(absolute).isDirectory()) {
        recusiveFindFiles(absolute);
      } else if (path.extname(absolute).match(fileExtRegex)) {
        files.push(path.relative(directory, absolute));
      }
    }
  };
  recusiveFindFiles(directory);
  return files;
}