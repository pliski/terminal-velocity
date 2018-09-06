const fuzzy = require('fuzzy');
const styles = require('ansi-styles');

const cleanFileObject = require('./utils/cleaner').cleanFileObject;
const splitStr = require('./utils/splitter').splitStr;
const colorize = require('./utils/formatter').colorize;


const formatResults = (str) => {
	let { base, directory, subDir, content } = splitStr(str);
	return `${colorize(base, 'base')} ${colorize(directory, 'directory')} ${colorize(subDir, 'subDir')} ${colorize(content, 'content')}`
}

const matchFiles = (listener, files, extract) => {
	const options = {
		extract,
		pre: styles.green.open,
		post: styles.green.close
	}

	return (answers, input = '') => {
		return new Promise((resolve, reject) => {
			let cleansedFiles = files.map(cleanFileObject);
			let results = fuzzy.filter(input, cleansedFiles, options).map((file) => file.string)
			let formattedResults = results.map(formatResults);

			listener(formattedResults);
			resolve(formattedResults)
		})
	}
  }

const init = (listener, library) => {
	const files = library
					.map((directory) => directory.files)
					.reduce((files, fileArr) => [...files, ...fileArr]);

	const opts = {
		type: 'autocomplete',
		name: 'file',
		source: matchFiles(listener, files, (file) => file.content),
		message: 'Search or Create New File:',
		pageSize: 100,
	}

	return opts;
};

module.exports = {
	init
}