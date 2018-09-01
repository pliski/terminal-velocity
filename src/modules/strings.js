const chalk = require('chalk');

const typeColors = {
	'name': chalk.white,
	'directory': chalk.blue,
	'content': chalk.gray
}

const format = (str, type) => {
	return typeColors[type] ? typeColors[type](str) : str
}

module.exports = {
	format
}