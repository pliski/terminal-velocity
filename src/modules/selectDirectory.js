const fuzzy = require('fuzzy');
const styles = require('ansi-styles');

function matchDirectories({listener, directories, name, extract}) {
	const options = {
		extract,
		pre: styles.green.open,
		post: styles.green.close
	}

	return (answers, input = '') => {
		return new Promise((resolve) => {
			let results = fuzzy.filter(input, directories, options).map((dir) => dir.string)
			listener(name, results);
			resolve(results)
		});
	}
  }

  const init = (listener, library) => {
	const directories = library.map((directory) => directory.base);
	const name = 'directory';
	const matchOn = {
		listener,
		directories,
		name,
		extract: (dir) => dir
	}


	listener(name,[]);

	const opts = {
		type: 'autocomplete',
		name: 'directory',
		message: 'Search or Create New Directory:',
		source: matchDirectories(matchOn),
		pageSize: 100,
	}

	return opts;
};

module.exports = {
	init	
}