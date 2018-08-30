const inquirer = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');
var fuzzy = require('fuzzy');
var htmlToText = require('html-to-text');


inquirer.registerPrompt('autocomplete', autocomplete);

function matchFiles(directory = [], extract = () => {}) {

	const options = {
		extract
	}

	return (answers, input = '') => {
		return new Promise((resolve) => {
			var fuzzyResult = fuzzy.filter(input, directory, options);
			resolve(
				fuzzyResult.map(function(el) {
					return el.original.path;
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
		pageSize: 4,
		...options
	}

	// create name with directory tag
	// use in source as name that appears

	console.log(directories)

	opts.source = matchFiles(directory, opts.match)

	return inquirer.prompt(opts);
}

module.exports = {
	fileFromDirectory
}