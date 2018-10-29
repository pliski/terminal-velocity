const path = require('path');
const homedir = require('os').homedir()

const getFile = require('./modules/helpers').getFile;

const notesDirectory = path.join(__dirname, '../notes')
const userConfigPath = path.join(homedir, '.termv');

const userConfig = getFile(userConfigPath).contents;

module.exports = {
	splitChar: ' \b ',
	notesDirectory,
	fileType: 'md',
	editor: 'nano'
, ...userConfig }