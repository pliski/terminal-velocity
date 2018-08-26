#!/usr/bin/env node

const program = require('commander');
const termV = require('../src/termv');

program
  .version('1.1.0')
  .option('-c, --config <config>', 'Configure your settings')
  .parse(process.argv);

const options = {
  ...program,
  path: program.path || process.cwd()
};

termV.init(options);