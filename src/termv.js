
const dir = require('./modules/directory.js');
const select = require('./modules/select.js');
	
const init = async (paths) => {
	let directories = await dir.create(paths);
	let selectedFile = await select.fileFromDirectory(directories);
	console.log(selectedFile)
}

module.exports = {
	init
}