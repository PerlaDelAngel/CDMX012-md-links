const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths

function pathIsFile(absolutePath, mdFilesArr){
  const ext = path.extname(absolutePath);
  if (ext !== '.md'){ //Not a MD file
    process.stdout.write('This is not a markdown file and cannot be analyzed');
    process.exit();
  } else if (ext === '.md'){ //MD file
    mdFilesArr.push(absolutePath);
  }
}


module.exports = {pathIsFile}