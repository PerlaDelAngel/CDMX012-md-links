const file = require('./lib/read-file');
const folder = require('./lib/read-directory');
const validPath = require('./lib/validate-path');
const links = require('./lib/get-links');
const validate = require('./lib/link-validation');
const linkStats = require('./lib/stats');


function mdLinks(userPath, options){
  return new Promise(function(resolve, reject){
    const absolutePath = validPath.resolvePath(userPath);

    let dirOrFile = validPath.directoryOrFile(absolutePath);
    
    let mdFiles = [];
    if(dirOrFile === false){
      file.pathIsFile(absolutePath, mdFiles);
    } else if (dirOrFile === true){
      folder.readDirec(absolutePath, mdFiles);
    };

    const obtainedLinks = links.getLinks(mdFiles);

    if (options.validate === false) { 
      return resolve(obtainedLinks);
    } 
    else if (options.validate === true){
      const status = obtainedLinks.map(link => validate.validateLink(link));
      resolve(Promise.all(status));
    } 
    /* else if (options === '--stats'){
      linkStats.stats(obtainedLinks);
    } 
    else if (options === '--stats --validate'){
      linkStats.combinedStats(obtainedLinks);
    } */
    else {
      return reject(Error("Something went wrong"));
    }
  })
}

//Valid path with options undefined
mdLinks('docs/doc2.md', { validate: false })
.then((result)=>{
  console.log(result)
}) 

//Valid path with validate true
/* mdLinks('docs/doc2.md', { validate: true })
.then((result)=>{
  console.log(result)
})  */

//Valid path with stats and validate true
/* mdLinks('docs', '--stats --validate')
.then((result)=>{
  console.log(result)
})  */

//Invalid path
//mdLinks('docs/old-dir');

//Valid path
//mdLinks('docs');
//mdLinks('docs/new-dir/doc3.md');
//mdLinks('docs/new-dir/testdoc.txt');
//mdLinks('docs/doc1.md');

exports.index = mdLinks;