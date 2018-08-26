
const dir = require('./modules/directory.js');
const select = require('./modules/select.js');
	
const init = async (options) => {
	let directory = await dir.create(options);
	let selectedFile = await select.fileFromDirectory(directory);
	console.log(selectedFile)
}

module.exports = {
	init
}