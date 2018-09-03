const splitStr = (str = '') => {
	let splitStr = str.split(' ');
	let [base, directory, subDir, ...content] = splitStr;
	content = content.join(' ');

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