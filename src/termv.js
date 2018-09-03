const lib = require('./modules/library');
const select = require('./modules/select');
const cleanFileObject = require('./modules/utils/cleaner').cleanFileObject;
const splitStr = require('./modules/utils/splitter').splitStr;
const editor = require('./modules/utils/editor');

const init = async (paths) => {
	let library = await lib.create(paths);
	let selectedFile = await select.fileFromLibrary(library);
	let cleanSelectedFile = cleanFileObject(selectedFile).file; // remove ansi characters

    let { name: nameStr, directory: dirStr } = splitStr(cleanSelectedFile); // splits file string into name, directory, subdirectories, and file content
	let directory = library.find((dir) => dir.directory === dirStr);

	if (!directory) { // new files wont have directory
		console.log('newfile') 
	} else {
		let file = directory.files.find((file) => file.name === nameStr);
		editor.openFile(file.absPath);
	}
}	

module.exports = {
	init
}