const fromSource = (listener) => {
	let opts = {};

	let source = (match) => {
		return (answers, input) => {
			return new Promise((resolve, reject) => {
				let matched = match(answers, input);
				listener(matched);
				resolve(matched);
			})
		}
	}

	return (options, currentMatch) => {

		opts = {
			type: 'autocomplete',
			name: 'file',
			source: source(currentMatch),
			message: 'Search or Create New File:',
			pageSize: 100,
			...options
		}
		
		return opts;
	}
};

module.exports = {
	fromSource
}
