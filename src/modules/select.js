const fuzzy = require('fuzzy');
const styles = require('ansi-styles');

const formatter = require('./utils/formatter');

const matchFiles = (library, listener) => {

	let currentLibrary = library;
	let searchableLibrary = Object.keys(library).map((file) => library[file]); 
	
	const options = {
		extract: (file) => file.actual,
		pre: styles.green.open,
		post: styles.green.close
	}

	return (answers, input = '') => {
		return new Promise((resolve, reject) => {
			let results = fuzzy.filter(input, searchableLibrary, options);

			results.forEach((result) => {
				currentLibrary[result.original.name].display = result.string;
			})

			results = results.map((result, idx) => {
				if (idx === 0) return formatter.showContent(result.string)
				else return formatter.hideContent(result.string);
			});

			listener(results, currentLibrary);
			resolve(results);
		})
	}
  }

const init = (library, listener) => {
	const opts = {
		type: 'autocomplete',
		name: 'file',
		source: matchFiles(library, listener),
		message: 'Search or Create New File:',
		pageSize: 100,
	}

	return opts;
};

module.exports = {
	init
}