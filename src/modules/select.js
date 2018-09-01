const inquirer = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');
const fuzzy = require('fuzzy');
const styles = require('ansi-styles');
const strs = require('./strings');

// TODO:
// create module that will split string into categories (name, direcotry, content)
// open file if one is selected
// create new file if one is not
// select/create new directory for new files
// figure out how to do local and global directories


inquirer.registerPrompt('autocomplete', autocomplete);

const formatResults = (str) => {
	let splitStr = str.split(' ');

	let [name, directory, ...content] = splitStr;

	return `${strs.format(name, 'name')} ${strs.format(directory, 'directory')} ${strs.format(content.join(' '), 'content')}`
}

function matchFiles(files = [], extract = () => {}) {

	const options = {
		extract,
		pre: styles.green.open,
		post: styles.green.close
	}

	return (answers, input = '') => {
		return new Promise((resolve) => {
			let results = fuzzy.filter(input, files, options).map((file) => file.string)
			let formattedResults = results.map(formatResults);
			// if possible remove all asci characters that arent the fuzzy matches
			// use flag character to identify which part of the string we are matching (name, path, or content)
			// rewrap the results with the right colorization
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
		suggestOnly: false,
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