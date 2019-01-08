const fs = require('fs');

const getFile = (path) => {
	try {
		return {
			contents: JSON.parse(fs.readFileSync(path))
		}
	} catch (e) {
		console.log(`Could not parse file: ${path} ${e}`)
		return {
			contents: ''
		}
	}
}

const detildy = (input) => {
	return input ? input.replace(/\/?~(?=$|\/|\\)/, '') : '';
}

module.exports = {
	getFile,
	detildy
}
