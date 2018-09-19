const path = require('path');
const notesDirectory = path.join(__dirname, '../notes')

module.exports = {
	splitChar: ' \b ',
	notesDirectory,
	fileType: 'md',
	editor: 'vi'
}