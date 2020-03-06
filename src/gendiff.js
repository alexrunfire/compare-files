#!/usr/bin/env node

import gendiff from '.';

const program = require('commander');

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => gendiff(firstConfig, secondConfig));
program.parse(process.argv);
