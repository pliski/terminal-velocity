const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const promisify = require('util').promisify;

const readFile = promisify(fs.readFile);

const findFiles = async (directory) => {
  return await recursive(directory);
}

const getContentOfFiles = (files, root) => {
  return Promise.all(files.map(async (file) => {
    return {
      name: path.relative(file, root),
      content: await readFile(file, 'utf8')
    }
  })).catch(console.error);
}

const create = function (directoryPaths) {
  const root = process.cwd();

  return Promise.all(directoryPaths.map(async (dirPath) => {
    const absPath = `${root}/${dirPath}`;
    const files = await findFiles(absPath);
    return {
      absPath,
      dirPath,
      files: await getContentOfFiles(files, absPath)
    }
  })).catch(console.error);
};

module.exports = {
  create
};
