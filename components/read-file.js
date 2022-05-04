const fs = require('fs');
const path = require('path'); 

function pathIsFile(absolutePath, mdFilesArr){
  const ext = path.extname(absolutePath);
  if (ext !== '.md' && ext !== '.markdown' && ext !== '.mdown'){ //Not a MD file
    console.log('This is not a markdown file and cannot be analyzed');
  } else if (ext === '.md' || ext === '.markdown' || ext === '.mdown'){ //MD file
    mdFilesArr.push(absolutePath);
  }
}

module.exports = pathIsFile;