const fs = require('fs');

const getFile = (path) => {
	try {
		return {
			contents: JSON.parse(fs.readFileSync(path))
		}
	} catch (e) {
		return {
			contents: ''
		}
	}
}

module.exports = {
	getFile
}
