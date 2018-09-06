const crawler = require('./utils/crawler');
const path = require('path');

const fromPaths = function (directoryPaths) {
  const root = process.cwd();

  return Promise.all(directoryPaths.map(async (dirPath) => {
    const base = path.normalize(dirPath);
    const absPath = `${root}/${base}`;

    const subDirectories = await crawler.findDirectories(absPath);
    const files = await crawler.findFiles(absPath);

    return {
      absPath,
      base,
      subDirectories,
      files: await crawler.getFileContent(files, base, absPath)
    }
  })).catch(console.error);
};

module.exports = {
  fromPaths
};
