const config = require('../../config');

const splitStr = (str = '') => {
	// make this more efficient by any splitting to n number of times (number of passed in values to set to)
	let splitStr = str.split(config.splitChar);
	let [base, directory, subDir, content] = splitStr;

	return {
		base,
		directory,
		subDir,
		content
	}
}

module.exports = {
	splitStr
}