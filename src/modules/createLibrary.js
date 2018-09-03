const crawler = require('./utils/crawler');
const path = require('path');

const fromPaths = function (directoryPaths) {
  const root = process.cwd();

  return Promise.all(directoryPaths.map(async (dirPath) => {
    const directory = path.normalize(dirPath);
    const absPath = `${root}/${directory}`;

    const subDirectories = await crawler.findDirectories(absPath);
    const files = await crawler.findFiles(absPath);

    return {
      absPath,
      directory,
      subDirectories,
      files: await crawler.getFileContent(files, directory, absPath)
    }
  })).catch(console.error);
};

module.exports = {
  fromPaths
};
