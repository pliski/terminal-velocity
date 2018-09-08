
const fs = require('fs');
const recursive = require('recursive-readdir');
const path = require('path');
const promisify = require('util').promisify;

const readFile = promisify(fs.readFile);

const findDirectories = (dir) => {
	const files = fs.readdirSync(dir);
	let directories = [];
  
	for (const file of files) {
		let pathToFile = path.join(dir, file);
		let isDirectory = fs.statSync(pathToFile).isDirectory();
		if (isDirectory) {
		  directories = [...directories, file]
		  directories = [ ...directories, ...findDirectories(pathToFile).map((files) => `${file}/${files}`)]
		}
	}
  
	return directories;
  }

const findFiles = async (directory) => {
  return await recursive(directory);
}

const getContentStr = async (file) => {
  let raw = await readFile(file, 'utf8')
  return raw.replace(/\r?\n|\r|\t/g, " "); // removing new lines and tabs
}

const getFileContent = (files, dirName, dirRoot) => {
	return Promise.all(files.map(async (file) => {
		let { base, dir } = path.parse(file);
		let subDir = path.relative(dirRoot, dir);
		let content = await getContentStr(file);

		return {
			base,
			subDir,
			absPath: file,
			content: `${base} ${dirName} ${subDir} ${content}`,
		}
	})).catch(console.error);
}


module.exports = {
	findDirectories,
	findFiles,
	getFileContent
}