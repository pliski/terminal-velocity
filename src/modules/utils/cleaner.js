const stripAnsi = require('strip-ansi');

const cleanFileObject = (file) => {
	return stripAnsi(file);
}

module.exports = {
	cleanFileObject
}