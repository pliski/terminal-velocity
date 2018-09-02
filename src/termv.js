
const dir = require('./modules/directory');
const select = require('./modules/select');
const cleanFileObject = require('./modules/utils/cleaner').cleanFileObject;
const splitStr = require('./modules/utils/splitter').splitStr;
const editor = require('./modules/utils/editor');

const init = async (paths) => {
	let directories = await dir.create(paths);
	let selectedFile = await select.fileFromDirectory(directories);
	console.log(directories);
	let cleanSelectedFile = cleanFileObject(selectedFile).file;

    let { name: nameStr, directory: dirStr } = splitStr(cleanSelectedFile);
	let matchedDirectory = directories.find((dir) => dir.directory === dirStr);

	if (!matchedDirectory) {
		console.log('newfile') 
	} else {
		let matchedFile = matchedDirectory.files.find((file) => file.name === nameStr);
		editor.openFile(matchedFile.absPath);
	}
}	

module.exports = {
	init
}