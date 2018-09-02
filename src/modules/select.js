const inquirer = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');
const fuzzy = require('fuzzy');
const styles = require('ansi-styles');

const cleanFileObject = require('./utils/cleaner').cleanFileObject;
const splitStr = require('./utils/splitter').splitStr;
const colorize = require('./utils/formatter').colorize;

const resolver  = require('./utils/resolver').resolver();
inquirer.registerPrompt('autocomplete', autocomplete);

// TODO:
// create new file if one is not
// select/create new directory for new files
// figure out how to do local and global directories

const formatResults = (str) => {
	let { name, directory, subDir, content } = splitStr(str);
	return `${colorize(name, 'name')} ${colorize(directory, 'directory')} ${colorize(subDir, 'subDir')} ${colorize(content, 'content')}`
}

function matchFiles(files = [], extract = () => {}) {
	const options = {
		extract,
		pre: styles.green.open,
		post: styles.green.close
	}

	return (answers, input = '') => {
		return new Promise((resolve) => {
			let cleansedFiles = files.map(cleanFileObject);
			let results = fuzzy.filter(input, cleansedFiles, options).map((file) => file.string)
			let formattedResults = results.map(formatResults);
			
			resolver.listener.listen(formattedResults);
			resolve(formattedResults)
		});
	}
  }

const fileFromDirectory = (directories, options) => {
	const opts = {
		type: 'autocomplete',
		name: 'file',
		message: 'Search or Create New:',
		match: (file) => file.content,
		pageSize: 100,
		...options
	}

	// create name with directory tag
	// use in source as name that appears
	const files = directories
					.map((directory) => directory.files)
					.reduce((groupArr, dirArr) => [...groupArr, ...dirArr])

	opts.source = matchFiles(files, opts.match)
	
	const promptPromise = inquirer.prompt(opts);

	resolver.subscribe(promptPromise);
	return resolver.promise;	
}
module.exports = {
	fileFromDirectory
}