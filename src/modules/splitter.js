const split = (str) => {
	let splitStr = str.split(' ')
	let [name, directory, subDir, ...content] = splitStr;
	content = content.join(' ');

	return {
		name,
		directory,
		subDir,
		content
	}
}

module.exports = {
	split
}