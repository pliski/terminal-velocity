const config = require('../../config');

const splitStr = (str = '') => {
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