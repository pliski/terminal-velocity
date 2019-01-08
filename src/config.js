const path = require('path');
const homedir = require('os').homedir()

const { getFile, detildy } = require('./modules/helpers');

const userConfigPath = path.join(homedir, '.termv');
const userConfig = getFile(userConfigPath).contents;
const userDirectory = detildy(userConfig.notesDirectory);

const notesDirectory = path.join(homedir, userDirectory || '.termv-notes')

module.exports = {
	splitChar: ' \b ',
	fileType: 'md',
	editor: 'vi',
	...userConfig,
	notesDirectory
}