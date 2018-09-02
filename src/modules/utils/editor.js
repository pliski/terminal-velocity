const childProcess = require('child_process');
const editor = process.env.EDITOR || 'vi';

const openFile = (file) => {
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