const file = require('./read-file');
const folder = require('./read-directory');
const validPath = require('./validate-path');
const links = require('./get-links');
const validate = require('./link-validation');
const linkStats = require('./stats');

//let userPath = process.argv[2];

function mdLinks(userPath, options){
  return new Promise(function(resolve, reject){
    const absolutePath = validPath.resolvePath(userPath);
    console.log(absolutePath);

    let dirOrFile = validPath.directoryOrFile(absolutePath);
    
    let mdFiles = [];
    if(dirOrFile === false){
      file.pathIsFile(absolutePath, mdFiles);
    } else if (dirOrFile === true){ //Directory
      folder.readDirec(absolutePath, mdFiles);
    };

    const obtainedLinks = links.getLinks(mdFiles);

    if (options === undefined) { 
      return resolve(obtainedLinks);
    } else if (options.validate === true){
      const status = obtainedLinks.map(link => validate.validateLink(link));
      resolve(Promise.all(status));
    } else if (options === '--stats'){
      linkStats.stats(obtainedLinks);
    } else if (options === '--stats --validate'){
      linkStats.combinedStats(obtainedLinks);
    }
    else {
      return reject(Error("Something went wrong"));
    }
  })
}

//console.log(process.argv[2])

//Valid path with options undefined
/* mdLinks('docs/doc2.md')
.then((result)=>{
  console.log(result)
})  */

//Valid path with validate true
/* mdLinks('docs/doc2.md', { validate: true })
.then((result)=>{
  console.log(result)
})  */

//Valid path with validate true
mdLinks('docs', '--stats --validate')
.then((result)=>{
  console.log(result)
}) 

//Invalid path
//mdLinks('docs/old-dir');

//Valid path
//mdLinks('docs');
//mdLinks('docs/new-dir/doc3.md');
//mdLinks('docs/new-dir/testdoc.txt');
//mdLinks('docs/doc1.md');

exports.index = mdLinks;