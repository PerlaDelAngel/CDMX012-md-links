const fs = require('fs'); 
const path = require('path');

function readDirec(inputPath, arrFiles){
  const filenames = fs.readdirSync(inputPath);

  filenames.forEach((element)=>{
    const resolvedPath = path.resolve(inputPath, element);
    const ext = path.extname(resolvedPath);
    if(fs.lstatSync(resolvedPath).isDirectory()){
      readDirec(resolvedPath, arrFiles);
    } else if(ext === '.md' || ext === '.markdown' || ext === '.mdown'){ //ext
      arrFiles.push(resolvedPath);
    }
  });
  return arrFiles;
}

module.exports = readDirec;
