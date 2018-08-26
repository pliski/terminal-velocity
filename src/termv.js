
const dir = require('./modules/directory.js');
const search = require('./modules/search.js').init;
	
const init = async (options) => {
	let directory = await dir.create(options);
	let selected = await search(directory);
	console.log(selected)
}

module.exports = {
	init
}