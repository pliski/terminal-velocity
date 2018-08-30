#!/usr/bin/env node

const config = require('../termv.config');
const termV = require('../src/termv');

termV.init(config.directoryPaths || []);