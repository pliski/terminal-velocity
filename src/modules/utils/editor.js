const childProcess = require('child_process');

const openFile = (editor, file) => {
	return new Promise((resolve, reject) => {
		let child = childProcess.spawn(editor, [file], {
			stdio: 'inherit'
		});
		
		child.on('exit', function (e, code) {
			process.stdout.write('\033c\033[3J'); // clears the terminal
			resolve();
		});
	})
}

module.exports = {
	openFile
}