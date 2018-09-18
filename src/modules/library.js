const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);

const config = require('../config');
const formatter = require('./utils/formatter');

const getFileContent = async (path) => {
  let raw = await readFile(path, 'utf8')
  return raw.replace(/\r?\n|\r|\t/g, " "); // removing new lines and tabs
}

const findFiles = async (directory) => {
  return await recursive(directory);
}

const fromDirectory = async function (directory) {
  const filePaths = await findFiles(directory);

  return await filePaths.reduce(async (accP, file) => {
    let name = path.basename(file, '.md');
    let content = await getFileContent(file);
    let initial = `${name}${config.splitChar}${content}`;
    let acc = await accP;
    let result = {
      ...acc,
      [name]: {
        name,
        display: formatter.hideContent(initial),
        actual: initial
      }
    }

    return result
    
  }, Promise.resolve({}));
};

module.exports = {
  fromDirectory
};
