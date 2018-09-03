const chalk = require('chalk');

const typeColors = {
	'base': chalk.white,
	'directory': chalk.blue,
	'subDir': chalk.yellow,
	'content': chalk.gray
}

const colorize = (str, type) => {
	return typeColors[type] ? typeColors[type](str) : str
}

module.exports = {
	colorize
}