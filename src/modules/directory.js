const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const promisify = require('util').promisify;
const style = require('ansi-styles');


const readFile = promisify(fs.readFile);

const findFiles = async (directory) => {
  return await recursive(directory);
}

const getContentStr = async (file) => {
  // need to do content formatting in here
  // add 
  // strip newlines
  // change text color
  let raw = await readFile(file, 'utf8')
  raw = raw.replace(/\r?\n|\r/g, " ");

  const formatted = `${style.grey.open}${raw.trim()}${style.grey.close}`
  return formatted
}

const getFileContent = (files, root) => {
  return Promise.all(files.map(async (file) => {
    let name = path.relative(root, file);
    return {
      name,
      content: `${name.trim()}\n    ${await getContentStr(file)}`,
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
      files: await getFileContent(files, absPath)
    }
  })).catch(console.error);
};

module.exports = {
  create
};
