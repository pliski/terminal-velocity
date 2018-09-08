const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const editor = process.env.EDITOR || 'vi';

const makeDirectories = ({ basePath, directories }) => {
	return new Promise((resolve, reject) => {
		let directoryPath = basePath;
		if (directories.length) {
			directories.forEach((directory, idx, arr) => {
				directoryPath = path.join(directoryPath, directory);
				fs.mkdirSync(directoryPath);
				if (idx === (arr.length - 1)) {
					resolve(directoryPath)
				}
			})
		} else {
			resolve(directoryPath)
		}
	})
}

const openFile = (file) => {
	let child = childProcess.spawn(editor, [file], {
		stdio: 'inherit'
	});
	
	child.on('exit', function (e, code) {
		console.log("finished");
	});
}

module.exports = {
	openFile,
	makeDirectories	
}