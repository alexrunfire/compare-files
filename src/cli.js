#!/usr/bin/env node

import program from 'commander';
import gendiff from '.';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'tap')
  .arguments('<firstConfig> <secondConfig>')
  .action(
    (firstConfig, secondConfig) => console.log(gendiff(firstConfig, secondConfig, program.format)),
  );
program.parse(process.argv);
