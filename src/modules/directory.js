const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const promisify = require('util').promisify;

const readFile = promisify(fs.readFile);

// TODO:
// Separate all file/directory crawiling to separate module
// Find ways to make file/directory lookup faster

const walkSync = (dir) => {
  const files = fs.readdirSync(dir);
  let directories = [];

  for (const file of files) {
      let pathToFile = path.join(dir, file);
      let isDirectory = fs.statSync(pathToFile).isDirectory();
      if (isDirectory) {
        directories = [...directories, file]
        let subDirectories = walkSync(pathToFile).map((files) => `${file}/${files}`)
        directories = [ ...directories, ...subDirectories]
      }
  }

  return directories;
}

const findDirectories = async (root) => {
  const directories = walkSync(root);
  return directories
}

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
    const directory = dirPath.replace(/[^\w]*/, ''); // remove relative pathing
    const absPath = `${root}/${directory}`;
    const subDirectories = await findDirectories(absPath)
    const files = await findFiles(absPath);
    return {
      absPath,
      directory,
      subDirectories,
      files: await getFileContent(files, directory)
    }
  })).catch(console.error);
};

module.exports = {
  create
};
