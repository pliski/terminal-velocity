const createLibary = require('./modules/createLibrary');
const selectFile = require('./modules/selectFile');


const cleanFileObject = require('./modules/utils/cleaner').cleanFileObject;
const splitStr = require('./modules/utils/splitter').splitStr;
const editor = require('./modules/utils/editor');

const init = async (paths) => {
	let library = await createLibary.fromPaths(paths);
	let selectedFile = await selectFile.fromLibrary(library);
	let cleanSelectedFile = cleanFileObject(selectedFile).file; // remove ansi characters
    let { base: selectedBase, directory: selectedDirectory } = splitStr(cleanSelectedFile); // splits file string into base, directory, subdirectories, and content

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