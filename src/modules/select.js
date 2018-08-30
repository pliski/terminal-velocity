const inquirer = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');
var fuzzy = require('fuzzy');
var htmlToText = require('html-to-text');
const style = require('ansi-styles');


inquirer.registerPrompt('autocomplete', autocomplete);

function matchFiles(files = [], extract = () => {}) {

	const options = {
		extract,
		pre: style.green.open,
		post: style.green.close
	}

	return (answers, input = '') => {
		return new Promise((resolve) => {
			resolve(
				fuzzy
					.filter(input, files, options)
					.map((file) => {
						return file.string
					})
			);
		});
	}
  }

const fileFromDirectory = (directories, options) => {
	const opts = {
		type: 'autocomplete',
		name: 'file',
		message: 'Search or Create New:',
		match: (file) => file.content,
		suggestOnly: true,
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