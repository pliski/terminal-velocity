const inquirer = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');
var fuzzy = require('fuzzy');

inquirer.registerPrompt('autocomplete', autocomplete);

function searchFiles(directory) {
	const options = {
		extract: (file) => file.content
	}
	return (answers, input) => {
		input = input || '';
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

const search = (directory) => {
	return inquirer.prompt([
		{
			type: 'autocomplete',
			name: 'file',
			message: 'Search/Create New File:',
			source: searchFiles(directory),
			pageSize: 4,
		}
	]);
}


const init = (directory) => {
	return search(directory);
}

module.exports = {
	init
}