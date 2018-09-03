const lib = require('./modules/library');
const select = require('./modules/select');
const cleanFileObject = require('./modules/utils/cleaner').cleanFileObject;
const splitStr = require('./modules/utils/splitter').splitStr;
const editor = require('./modules/utils/editor');

const init = async (paths) => {
	let library = await lib.create(paths);
	let selectedFile = await select.fileFromLibrary(library);
	let cleanSelectedFile = cleanFileObject(selectedFile).file; // remove ansi characters

    let { base: selectedBase, directory: selectedDirectory } = splitStr(cleanSelectedFile); // splits file string into name, directory, subdirectories, and file content
	

	if (!selectedDirectory) { // new files wont have directory
		console.log('newfile') 
	} else {
		let directory = library.find((lib) => lib.directory === selectedDirectory);
		let file = directory.files.find((file) => file.base === selectedBase);
		editor.openFile(file.absPath);
	}
}	

module.exports = {
	init
}