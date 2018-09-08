const readline = require('readline');

const listen = (dispatch) => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	
	let listening = false;
	let currentResults = []
	let currentName = '';

	return (name, results) => {
		currentResults = results;
		currentName = name;
		if (!listening) {
			listening = true;
			rl.once('line', (input) => {
				if (currentResults.length) {
					return false;
				} else {
					dispatch({
						[currentName]: input,
						new: true
					})
				}
			})
		}
	}
}

module.exports = {
	listen
}