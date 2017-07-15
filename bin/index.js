#! /usr/bin/env node

// Allow requiring absolute paths relative to the src directory
const path = require('path');
process.env.NODE_PATH = path.join(__dirname, '../src');
require('module').Module._initPaths();
require('../src/index.js');
