const stripAnsi = require('strip-ansi');

const cleanFile = (file = {}) => {
	return Object.keys(file).reduce((obj, prop) => {
		return {
			...obj,
			[prop]: stripAnsi(file[prop])
		}
	}, {})
}

module.exports = {
	cleanFile
}