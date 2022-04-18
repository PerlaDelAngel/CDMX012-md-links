#!/usr/bin/env node
const yargs = require('yargs');
const mdLinks = require('../lib/index.js');

const argv = yargs
  .scriptName('mdLinks')
  .usage('Usage: $0 path --validate --stats \n(validate and stats commands are optional)')
  .option('validate', {
    alias: 'v',
    demandOption: false,
    default: false,
    description: 'Validates the links found in the MD files of the given path',
    type: 'boolean'
  })
  .option('stats', {
    alias: 's',
    demandOption: false,
    default: false,
    description: 'Generates stats for the links found inside the MD files of the given path',
    type: 'boolean'
  })
  .alias('help', 'h')
  .locale('en')
  .showHelpOnFail(false, 'Specify --help for available options')
  .epilog('Made by Perla Del Ángel, copyright 2022')
  .argv;

//console.log(argv._); //path
console.log(argv);

const userPath = argv._[0];
const options = argv.validate;

mdLinks(userPath, options)
.then((result)=>{
  console.log(result)
})

