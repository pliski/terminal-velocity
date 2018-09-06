const createLibary = require('./modules/createLibrary');
const queue = require('./modules/utils/queuer').queue;


// const cleanFileObject = require('./modules/utils/cleaner').cleanFileObject;
// const splitStr = require('./modules/utils/splitter').splitStr;
// const editor = require('./modules/utils/editor');

const findDirectoryInLibrary = (directory, library) => {
	return library.find((lib) => lib.base === directory);
}

const init = async (paths) => {

	const library = await createLibary.fromPaths(paths);
	const promptQueue = queue(library);

	promptQueue.queueNext();
	
	let selected = await promptQueue.promise;
	console.log(selected);
	// let cleanSelectedFile = cleanFileObject(selectedFile); // remove ansi characters
	// selected = {...selected, ...splitStr(cleanSelectedFile) }; // splits file string into base, directory, subdirectories, and content

	// if (!selected.directory) { // create new file - new files wont have directory
	// 	selected.directory = (await selectDirectory.fromLibrary(library)).selected;
	// 	let existingDirectory = findDirectoryInLibrary(selected.directory, library);
		
	// 	selected.absPath = existingDirectory ? existingDirectory.absPath : process.cwd();
	// 	selected.subDirectory = (await selectSubDirectory.fromList(existingDirectory)).selected;
	// 	if (!existingDirectory) {
	// 		selected.absPath = `${selected.absPath}/${selected.directory}/${selected.subDirectory}`;
	// 		editor.makeDirectory(selected.absPath);
	// 		selected.absPath = `${selected.absPath}/${selected.base}.md`;
	// 	} else {
	// 		selected.absPath = `${selected.absPath}/${selected.subDirectory}/${selected.base}.md`;
	// 	}
	// 	editor.openFile(selected.absPath);
	// } else {
	// 	let existingDirectory = findDirectoryInLibrary(selected.directory, library);
	// 	let file = existingDirectory.files.find((file) => file.base === selected.base);
	// 	editor.openFile(file.absPath);
	// }
}	

module.exports = {
	init
}