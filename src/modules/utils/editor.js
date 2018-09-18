const childProcess = require('child_process');

const openFile = (editor, file) => {
	let child = childProcess.spawn(editor, [file], {
		stdio: 'inherit'
	});
	
	child.on('exit', function (e, code) {
		console.log("finished");
	});
}

module.exports = {
	openFile
}