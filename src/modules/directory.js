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

const getDirStr = (file, directory) => {
  let relPathWithoutFileName = file.substring(0, file.lastIndexOf('/'));
  return relPathWithoutFileName.substring(relPathWithoutFileName.indexOf(directory) + directory.length + 1);
}

const getNameStr = (file) => {
  return file.substring(file.lastIndexOf('/') + 1)
}

const getFileContent = (files, directory) => {
  return Promise.all(files.map(async (file) => {
    let name = getNameStr(file);
    let subDir = getDirStr(file, directory);
    let content = await getContentStr(file);

    return {
      name,
      absPath: file,
      content: `${name} ${directory} ${subDir} ${content}`,
    }
  })).catch(console.error);
}

const create = function (directoryPaths) {
  const root = process.cwd();

  return Promise.all(directoryPaths.map(async (dirPath) => {
    const directory = dirPath.replace(/[^\w]*/, '');
    const absPath = `${root}/${dirPath}`;
    const files = await findFiles(absPath);
    return {
      absPath,
      directory,
      files: await getFileContent(files, directory)
    }
  })).catch(console.error);
};

module.exports = {
  create
};
