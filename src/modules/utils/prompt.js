const inquirer = require('inquirer');
const listener = require('./listener').listen;
const Autocomplete = require('inquirer-autocomplete-prompt');

inquirer.registerPrompt('autocomplete', Autocomplete);

const selectResolver = (resolve, prompt) => {
	return (selection) => {
		prompt.ui.close();
		prompt.ui.activePrompt.done();
		resolve(selection)
	}
}

const attachPromptHandlers = async (library, question, resolve) => {
	let hotListener = listener();
	let prompt = inquirer.prompt(question(library, hotListener.onResults));
	let hotResolver = selectResolver(resolve, prompt);

	hotListener.onEnter(hotResolver);
	hotListener.onSelected(prompt);
	hotResolver(await prompt);
}

const select = (library, question) => {
	let res;
	let promise = new Promise((resolve, reject) => {
		res = resolve;
	})

	attachPromptHandlers(library, question, res)
	return promise;
}


module.exports = {
	select	
}