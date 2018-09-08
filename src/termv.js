const path = require('path');
const createLibary = require('./modules/createLibrary');
const queue = require('./modules/utils/queuer').queue;

const editor = require('./modules/utils/editor');

const stripAnsi = require('strip-ansi');
const splitStr = require('./modules/utils/splitter').splitStr;

// TODO:
// Split on something better than space
// Handle name conflicts (maybe use a hash here)
// Create data model that all other files can refer to (so if we want to change something in object, we change it once)
// Make logic is solid (unit tests)
// If adding new directory update termv directory config
// Figure out local/global directories

const init = async (paths) => {
	const library = await createLibary.fromPaths(paths);
	const promptQueue = queue(library);
	promptQueue.queueNext();

	let selectedItems = await promptQueue.promise;
	let selected = selectedItems.reduce((acc, item) => {
		Object.keys(item).forEach((key) => { 
			acc[key] = item[key]
		})
		return acc;
	}, {});

	if (!selected.new) {
		let cleanSelectedFile = stripAnsi(selected.file) ; // remove bad characters
		let { base, directory, subDir } = splitStr(cleanSelectedFile); // splits file string into base, directory, subdirectories, and content
		let pathToFile = library.find((dir) => dir.base === directory)
						.files.find((file) => {
							if (file.base === base && file.subDir === subDir) {
								return file;
							}
						}).absPath;
						
		editor.openFile(pathToFile);
	} else {
		let fileWithExtension = path.extname(selected.file) ? selected.file : `${selected.file}.md`;
		let existingDirectory = library.find((dir) => dir.base === selected.directory);
		let subDirectories = selected.subDirectory ? selected.subDirectory.split('/') : [];
		let basePath = existingDirectory ? existingDirectory.absPath : process.cwd();
		let directories = existingDirectory ? subDirectories : [selected.directory, ...subDirectories];

		editor.makeDirectories({
			basePath,
			directories
		}).then((directoryPath) => {
			let pathToFile = path.join(directoryPath, fileWithExtension)
			editor.openFile(pathToFile)
		})
	}

}	

module.exports = {
	init
}