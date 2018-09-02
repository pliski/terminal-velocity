const readline = require('readline');

const resolver = () => {
	let res;

	const subscribe = (prom) => {
		prom.then((val) => {
			res(val)
		})
	}

	const promise = new Promise ((resolve, reject) => {
		res = resolve;
	})

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	const listener = {
		listening: false,
		suggested: [],
		listen(results){
			this.suggested = results;
			if (!this.listening) {
				this.listening = true;
				rl.on('line', (input) => {
					if (this.suggested.length) {
						return false;
					} else {
						res({ file: input})
					}
					rl.close();
				});	
			}
		},
	}

	return {
		promise,
		subscribe,
		listener,
	}
}

module.exports = {
	resolver
}