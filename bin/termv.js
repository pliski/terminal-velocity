#!/usr/bin/env node

const config = require('../termv.config');
const termV = require('../src/termv');

// console.log(process.cwd());

// var pkgConfig = require(process.cwd() + '/package.json');
// console.log(pkgConfig);

termV.init(config.directoryPaths || []);