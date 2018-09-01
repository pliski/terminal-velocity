const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const promisify = require('util').promisify;

const strs = require('./strings');


const readFile = promisify(fs.readFile);

const findFiles = async (directory) => {
  return await recursive(directory);
}

const getContentStr = async (file) => {
  let raw = await readFile(file, 'utf8')
  return raw.replace(/\r?\n|\r|\t/g, " "); // removing new lines and tabs
}

const getDirStr = (relPath = '', formattedRoot = '') => {
  let relPathWithoutFileName = relPath.substr(0, relPath.lastIndexOf('/'));
  return relPathWithoutFileName ? `${formattedRoot}/${relPathWithoutFileName}` : formattedRoot;
}

const getNameStr = (relPath = '') => {
  return relPath.substr(relPath.lastIndexOf('/') + 1)
}

const getFileContent = (files, root) => {
  let formattedRoot = root.replace(/[^\w]*/, ''); // remove everything before first word char
  return Promise.all(files.map(async (file) => {
    let relPath = path.relative(root, file);

    let name = strs.format(getNameStr(relPath), 'name');
    let directory = strs.format(getDirStr(relPath, formattedRoot), 'directory');
    let content = strs.format(await getContentStr(file), 'content');

    return {
      content: `${name} ${directory} ${content}`,
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
      files: await getFileContent(files, dirPath)
    }
  })).catch(console.error);
};

module.exports = {
  create
};
