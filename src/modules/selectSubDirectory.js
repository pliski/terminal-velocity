const fuzzy = require('fuzzy');
const styles = require('ansi-styles');

function matchDirectories(listener, directories = [], extract = () => {}) {
	const options = {
		extract,
		pre: styles.green.open,
		post: styles.green.close
	}

	return (answers, input = '') => {
		return new Promise((resolve) => {
			let results = fuzzy.filter(input, directories, options).map((dir) => dir.string)
			listener(results)
			resolve(results)
		});
	}
  }

const init = (listener, library, prev) => {
	let subDirectories = library
							.filter((dir) => dir.base === prev.directory)
							.map((dir) => dir.subDirectories);
							
	subDirectories = subDirectories[0] || [];
	const opts = {
		message: 'Search or Create New Sub-Directory:',
		name: 'subDirectory',
		match: matchDirectories(listener, subDirectories, (dir) => dir),
		pageSize: 100,
	}

	if (!subDirectories.length) {
		opts.type = 'input';
		opts.message = 'Create New Sub-directory';
	}

	return opts;
};

module.exports = {
 	init	
}