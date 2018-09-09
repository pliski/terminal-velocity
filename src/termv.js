const path = require('path');
const createLibary = require('./modules/createLibrary');
const queue = require('./modules/utils/queuer').queue;

const editor = require('./modules/utils/editor');

const stripAnsi = require('strip-ansi');
const splitStr = require('./modules/utils/splitter').splitStr;

// TODO:
// Split on something better than space
// Create data model that all other files can refer to (so if we want to change something in object, we change it once)
// Make logic is solid (unit tests)
// If adding new directory update termv directory config
// Figure out local/global directories
// Handle directory name conflicts (print name with path and split like we're doing for file)

const init = async (paths) => {
	const library = await createLibary.fromPaths(paths);
	const promptQueue = queue(library);
	promptQueue.queueNext();

	let promptSelections = await promptQueue.promise;
	let selected = promptSelections.reduce((acc, item) => {
		Object.keys(item).forEach((key) => { 
			acc[key] = item[key]
		})
		return acc;
	}, {});

	console.log(selected)

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
		let basePath = process.cwd();
		let directories = [];

		let fileWithExtension = path.extname(selected.file) ? selected.file : `${selected.file}.md`;
		let subDirectories = selected.subDirectory ? selected.subDirectory.split('/') : [];
		let existingDirectory = library.find((dir) => dir.base === selected.directory);

		if (existingDirectory) {
			let existingSubDirectory = existingDirectory.subDirectories.find((dir) => dir === selected.subDirectory);

			if (existingSubDirectory) {
				basePath = path.join(existingDirectory.absPath, selected.subDirectory);
			} else {
				basePath = existingDirectory.absPath;
				directories = subDirectories;
			}
		} else {
			directories = [selected.directory, ...subDirectories]
		}

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