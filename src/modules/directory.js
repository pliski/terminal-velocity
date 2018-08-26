const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const promisify = require('util').promisify;

const readFile = promisify(fs.readFile)

const findFiles = async (directory) => {
  return await recursive(directory);
}

const getDirectoryContent = (files, root) => {
  return Promise.all(files.map(async (file) => {
    return {
      path: path.relative(root, file),
      absPath: file,
      content: await readFile(file, 'utf8')
    }
  }))
}

const create = async function (options) {

  const root = path.resolve(process.cwd(), options.path || '.');
  const files = await findFiles(root);
  const directory = getDirectoryContent(files, root)

  return directory
};

module.exports = {
  create
};
