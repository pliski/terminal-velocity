const fuzzy = require('fuzzy');
const styles = require('ansi-styles');

function matchSubDirectories({listener, name, subDirectories, extract}) {
	const options = {
		extract,
		pre: styles.green.open,
		post: styles.green.close
	}

	return (answers, input = '') => {
		return new Promise((resolve) => {
			let results = fuzzy.filter(input, subDirectories, options).map((dir) => dir.string);
			listener(name, results)
			resolve(results)
		});
	}
  }

const init = (listener, library, prev) => {
	let subDirectories = library
							.filter((dir) => dir.base === prev.directory)
							.map((dir) => dir.subDirectories);

	subDirectories = subDirectories[0] || [];

	let name = 'subDirectory';
	const matchOn = {
		listener,
		name,
		subDirectories,
		extract: (subDir) => subDir
	}
							
	const opts = {
		type: 'autocomplete',
		message: 'Search or Create New Sub-Directory:',
		name,
		source: matchSubDirectories(matchOn),
		pageSize: 100,
	}

	if (!subDirectories.length) {
		opts.type = 'input';
		opts.message = 'Create New Sub-directory';
		listener(name, [])
	}

	return opts;
};

module.exports = {
 	init	
}