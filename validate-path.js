const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths
const process = require('process');

function resolvePath(userPath){
  let resolvedPath;
  if(path.isAbsolute(userPath) === false){
      resolvedPath = path.resolve(userPath);
    } else {
      resolvedPath = userPath;
    }
  return resolvedPath;
}

function directoryOrFile(absolutePath){
  let dirOrFile;
    if(fs.existsSync(absolutePath)){ //Checks if the path exists
      console.log('Valid pathname');
      dirOrFile = fs.lstatSync(absolutePath).isDirectory(); // The path belongs to a file or a directory?
    } else {
      process.stdout.write('Path does not exist');
      process.exit();
    }
  return dirOrFile;
}

module.exports = {resolvePath, directoryOrFile}
