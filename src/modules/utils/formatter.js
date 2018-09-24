const config = require('../../config');
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');

const clean = (str) => {
	return stripAnsi(str);
}

const splitStr = (str) => {
	return {
		name: str.substr(0,str.indexOf(config.splitChar)) || str,
		content: str.substr(str.indexOf(config.splitChar) + config.splitChar.length)
	}
}

const hideContent = (str) => {
	return splitStr(str).name
}

const showContent = (str) => {
	let {name, content} = splitStr(str);

	return chalk`${name}${config.splitChar}{blue ${content}}`;
}

module.exports = {
	hideContent,
	showContent,
	splitStr,
	clean
}