const fs = require('fs'); //file system
const file = require('./read-file');
const folder = require('./read-directory');
const validPath = require('./validate-path');
const links = require('./get-links');


/* module.exports = () => {
  // ...
}; */

function mdLinks(userPath, options){
  return new Promise(function(resolve, reject){
    const absolutePath = validPath.resolvePath(userPath);
    console.log(absolutePath);

    let dirOrFile = validPath.directoryOrFile(absolutePath);
    console.log(dirOrFile)
    
    let mdFiles = [];
    if(dirOrFile === false){
      file.pathIsFile(absolutePath, mdFiles);
    } else if (dirOrFile === true){ //Directory
      folder.readDirRecursive(absolutePath, mdFiles);
    };

    const obtainedLinks = links.getLinks(mdFiles);

    if (options === undefined) { //Acá poner condiciones, ej. options = validate:true, etc
      return resolve(obtainedLinks);
    }
    else {
      return reject(Error("Something went wrong"));
    }
  })
}

//Valid path
mdLinks('docs/doc1.md')
.then((links)=>{
  console.log(links)
})

//Invalid path
//mdLinks('docs/old-dir');

//Valid path
//mdLinks('docs');
//mdLinks('docs/new-dir/doc3.md');
//mdLinks('docs/new-dir/testdoc.txt');
//mdLinks('docs/doc1.md');
