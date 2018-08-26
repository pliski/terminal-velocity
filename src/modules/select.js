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

const fileFromDirectory = (directory, options) => {
	const opts = {
		type: 'autocomplete',
		name: 'file',
		message: 'Search or Create New:',
		match: (file) => file.content,
		pageSize: 4,
		...options
	}

	opts.source = matchFiles(directory, opts.match)

	// Potential solution for previewing
	// On a certain key press (spacebar?) show preview of file
	// convert markdown to html with showdown pkg
	// then render with htmlToTextfromString
	// release of spacebar returns user to previous view

	return inquirer.prompt(opts);
}

module.exports = {
	fileFromDirectory
}