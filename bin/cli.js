#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');
const mdLinks = require('../components/mdLinks');
const linkStats = require('../components/stats');

// Styles
const successful = chalk.green.bold;
const difText = chalk.cyanBright;
const fail = chalk.red;
const errorSty = chalk.red.bold;
const emphasis = chalk.magenta;

// Arguments
const { argv } = yargs
  .scriptName('mdLinks')
  .usage(emphasis('\nUsage: $0 path --validate --stats \n(validate and stats commands are optional, paths can be absolute or relative)'))
  .example('$0 docs\\doc.md --validate --stats')
  .option('validate', {
    alias: 'v',
    demandOption: false,
    default: false,
    description: 'Validates the links found in the markdown files of the given path',
    type: 'boolean',
  })
  .option('stats', {
    alias: 's',
    demandOption: false,
    default: false,
    description: 'Generates stats for the links found inside the markdown files of the given path',
    type: 'boolean',
  })
  .alias('help', 'h')
  .locale('en')
  .showHelpOnFail(false, 'Specify --help for available options')
  .epilog(emphasis('Made by Perla Del Ángel, copyright 2022\n'));

// console.log(argv)

// Arguments
const userPath = argv._[0];
const validate = argv.validate;
const getStats = argv.stats;

// Validation of path arg
if (userPath === undefined) {
  console.log(errorSty('Can not recognize this command, type --help for available options'));
} else if (!fs.existsSync(userPath)) {
  console.log(errorSty('Path does not exist, please try with another one'));
} else {
  mdLinks(userPath, validate) // Obtaining and/or validating links
    .then((result) => {
      if (result.length === 0) {
        console.log(errorSty('No links were found'));
      } else if (validate === false && getStats === false) { // default behaviour
        console.log(successful('Links found:  \n'));
        result.forEach((link) => {
          console.log(`${difText('url:')} ${link.href}\n${difText('text:')} ${link.text}\n${difText('filepath:')} ${link.file}\n`);
        });
      } else if (validate === true && getStats === false) { // obtains status for each link
        console.log(successful('Links found:  \n'));
        result.forEach((link) => {
          if (link.ok === 'fail') {
            console.log(`${difText('url:')} ${link.href}\n${difText('text:')} ${link.text}\n${difText('filepath:')} ${link.file}\n${fail('status:')} ${link.status} ${link.ok}\n`);
          } else {
            console.log(`${difText('url:')} ${link.href}\n${difText('text:')} ${link.text}\n${difText('filepath:')} ${link.file}\n${difText('status:')} ${link.status} ${link.ok}\n`);
          }
        });
      } else if (validate === false && getStats === true) { // gets basic stats
        const unique = linkStats.stats(result);
        console.log(`${successful('Links found: ')}\n${difText('Total:')} ${result.length}\n${difText('Unique:')} ${unique.length}`);
      } else if (validate === true && getStats === true) { // gets combined stats
        const unique = linkStats.stats(result);
        const broken = linkStats.brokenLinks(result);
        broken
          .then((brokenLink) => {
            console.log(`${successful('Links found: ')}\n${difText('Total:')} ${result.length}\n${difText('Unique:')} ${unique.length}\n${fail('Broken:')} ${brokenLink}`);
          });
      }
    })
    .catch((err) => {
      console.log(errorSty(err));
    });
}

