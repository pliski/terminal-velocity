const listen = (dispatch) => {
	const readline = require('readline');
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	let listening = false;
	let suggested = []

	return (results) => {
		suggested = results;
		if (!listening) {
			listening = true;
			rl.on('line', (input) => {
				if (suggested.length) {
					return false;
				} else {
					dispatch(input)
				}
			});	
		}
	}
}

module.exports = {
	listen
}