const readline = require('readline');
const formatter = require('./formatter');
const stripAnsi = require('strip-ansi');

const listen = () => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	
	let currentResults = [];
	let currentLibrary = {};

	const onResults = (results, library) => {
		currentResults = results;
		currentLibrary = library;
	}

	const onSelected = (prompt) => {
		rl.input.setRawMode(true)
		rl.input.on('keypress', (str, key) => {
			if (key.name === 'up' || key.name === 'down') {
				let activePrompt = prompt.ui.activePrompt;
				let selected = activePrompt.selected;

				let choices = activePrompt.currentChoices.realChoices.map((choice) => {
					choice.name = formatter.hideContent(choice.name);
					return choice
				});
				
				let selectedFile = choices[selected];
				selectedFile.name = formatter.showContent(currentLibrary[stripAnsi(selectedFile.name)].display);

				activePrompt.render(); // render screen with updated choices
			}
		})
	}

	const onEnter = (dispatch) => {
		rl.once('line', (input) => {
			if (currentResults.length) {
				rl.close();
				return false;
			} else {
				rl.close();
				dispatch({
					file: input
				})
			}
		})
	}

	return {
		onResults,
		onEnter,
		onSelected,
	}
}

module.exports = {
	listen
}