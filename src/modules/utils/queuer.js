const inquirer = require('inquirer');
const listener = require('./listener').listen;

const selectFile = require('../selectFile').init;
const selectDirectory = require('../selectDirectory').init;
const selectSubDirectory = require('../selectSubDirectory').init;

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const queue = (library) => {
	let res;
	let prompt;

	let questions = [selectFile, selectDirectory, selectSubDirectory];
	let answers = [];

	const makeSelection = (selection) => {
		prompt.ui.close();
		answers = [...answers, selection];

		if (!questions.length){
			res(answers)
		} else {
			queueNext(selection);
		}
	}

	let hotListener = listener(makeSelection);

	const getNextQuestion = (prev) => {
		let next = questions.shift();
		return next(hotListener, library, prev);
	}

	const queueNext = async (prev) => {
		let nextQuestion = getNextQuestion(prev);
		prompt = inquirer.prompt(nextQuestion);

		let selected = await prompt;
		makeSelection(selected);
	}

	const promise = new Promise ((resolve, reject) => {
		res = resolve;
	})

	return {
		promise,
		queueNext,
	}
}

module.exports = {
	queue
}