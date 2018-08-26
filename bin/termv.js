#!/usr/bin/env node

const config = require('../termv.config');
const termV = require('../src/termv');

const program = {
  path:  config.path
}


const options = {
  path: program.path || process.cwd()
};

termV.init(options);