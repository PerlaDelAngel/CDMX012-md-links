const fs = require('fs'); 
const path = require('path');
// const readdir = require('fs/promises')

function readDirRecursive(inputPath, arrFiles){
  const filenames = fs.readdirSync(inputPath);

  filenames.forEach((element)=>{
    const resolvedPath = path.resolve(inputPath, element);
    if(fs.lstatSync(resolvedPath).isDirectory()){
      readDirRecursive(resolvedPath, arrFiles);
    } else if(path.extname(resolvedPath) === '.md'){
      arrFiles.push(resolvedPath);
    }
  });
  //console.log(arrFiles);
  return arrFiles;
}

module.exports = {readDirRecursive}
