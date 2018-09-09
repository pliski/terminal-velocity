const config = require('../../config');
const colorize = require('./formatter').colorize;

const create = (input, color) => {
	return Object.keys(input).reduce((acc, inputKey) => {
		let baseStr = input[inputKey].trim();
		if (baseStr.length) {
			let str = color ? colorize(baseStr, inputKey) : baseStr;
			return `${acc}${str} ${config.splitChar} `;
		} else {
			return `${acc} ${config.splitChar}`;
		}
	}, '')
}

module.exports = {
	create
}