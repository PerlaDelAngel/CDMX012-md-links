const fs = require('fs'); 
const pathIsFile = require('./read-file');
const readDirec = require('./read-directory');
const resolvePath = require('./resolve-path');
const getLinks = require('./get-links');
const validateLink = require('./link-validation');

function mdLinks(userPath, options){
  return new Promise(function(resolve, reject){
    const absolutePath = resolvePath(userPath);

    let dirOrFile = fs.lstatSync(absolutePath).isDirectory();
    
    let mdFiles = [];
    if(dirOrFile === false){
      pathIsFile(absolutePath, mdFiles);
    } else if (dirOrFile === true){
      readDirec(absolutePath, mdFiles);
    };

    const obtainedLinks = getLinks(mdFiles);

    if (options === false) { 
      return resolve(obtainedLinks);
    } 
    else if (options === true){
      const status = obtainedLinks.map(link => validateLink(link));
      return resolve(Promise.all(status));
    }
    else {
      return reject(Error('Something went wrong'));
    }
  })
}

//Invalid path
//mdLinks('docs/old-dir');

//Valid path
//mdLinks('docs');
//mdLinks('docs/new-dir/doc3.md');
//mdLinks('docs/new-dir/testdoc.txt');
//mdLinks('docs/doc1.md');

//Valid path with broken link
//mdLinks('docs/doc2.md')

module.exports = mdLinks;