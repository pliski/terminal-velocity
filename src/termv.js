
const dir = require('./modules/directory');
const select = require('./modules/select');
const cleaner = require('./modules/cleaner');
const splitter = require('./modules/splitter').split;

const editor = process.env.EDITOR || 'vi';
const childProcess = require('child_process');

const openEditor = (file) => {
	let child = childProcess.spawn(editor, [file], {
		stdio: 'inherit'
	});
	
	child.on('exit', function (e, code) {
		console.log("finished");
	});
}
	
const init = async (paths) => {
	let directories = await dir.create(paths);
	let selectedFile = await select.fileFromDirectory(directories);
	let cleanSelectedFile = cleaner.cleanFile(selectedFile).file;

	let { name: nameStr, directory: dirStr } = splitter(cleanSelectedFile);
	let matchedDirectory = directories.find((dir) => dir.directory === dirStr);
	let matchedFile = matchedDirectory.files.find((file) => file.name === nameStr);

	openEditor(matchedFile.absPath)
	


}	

module.exports = {
	init
}