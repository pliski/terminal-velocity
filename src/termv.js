const config = require('./config');
const libaryFromDirectory = require('./modules/library').fromDirectory;
const prompt = require('./modules/utils/prompt');
const selectFile = require('./modules/select').init;
const formatter = require('./modules/utils/formatter');
const editor = require('./modules/utils/editor');

const init = async () => {
	const directoryPath = config.notesDirectory;
	const library = await libaryFromDirectory(directoryPath);
	const selected = await prompt.select(library, selectFile);

	const { name : selectedFile } = formatter.splitStr(formatter.clean(selected.file));
	const filePath = `${directoryPath}/${selectedFile}.${config.fileType}`;

	await editor.openFile(config.editor, filePath);
	init();
}	

module.exports = {
	init
}