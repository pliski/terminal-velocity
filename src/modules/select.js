const inquirer = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');
const fuzzy = require('fuzzy');
const styles = require('ansi-styles');

const cleaner = require('./cleaner');
const splitter = require('./splitter').split;
const strs = require('./strings');


// TODO:
// open file if one is selected
// create new file if one is not
// select/create new directory for new files
// figure out how to do local and global directories


inquirer.registerPrompt('autocomplete', autocomplete);

const formatResults = (str) => {
	let splitStr = splitter(str);
	let { name, directory, subDir, content } = splitStr;

	return `${strs.format(name, 'name')} ${strs.format(directory, 'directory')} ${strs.format(subDir, 'subDir')} ${strs.format(content, 'content')}`
}

function matchFiles(files = [], extract = () => {}) {

	const options = {
		extract,
		pre: styles.green.open,
		post: styles.green.close
	}

	return (answers, input = '') => {
		return new Promise((resolve) => {
			let cleansedFiles = files.map(cleaner.cleanFile);
			let results = fuzzy.filter(input, cleansedFiles, options).map((file) => file.string)
			let formattedResults = results.map(formatResults);
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

	return inquirer.prompt(opts);
}

module.exports = {
	fileFromDirectory
}