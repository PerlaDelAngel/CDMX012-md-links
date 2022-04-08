const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths
const process = require('process');
const fileValid = require('./file-validation');

/* module.exports = () => {
  // ...
}; */

function mdLinks(userPath, options){
  let absolutePath;
  if(path.isAbsolute(userPath) === false){
    absolutePath = path.resolve(userPath);
    /* console.log('resolved path'); */
  } else {
    absolutePath = userPath;
    /* consolelog('absolute path'); */
  }
  console.log(absolutePath);

  let dirOrFile;
  if(fs.existsSync(absolutePath)){
    console.log('Valid pathname');
    //console.log(isDirectory(absolutePath));
    dirOrFile = fileValid.isDirectory(absolutePath);
  } else {
    // console.log(`Path doesn't exist`); 
    process.stdout.write('Path does not exist\n');
    process.exit(); // END PROCESS
  }

  if(dirOrFile === false){ //File
    const ext = fileValid.extension(absolutePath);
    if (ext !== '.md'){ //Not a MD file
      process.stdout.write('This is not a markdown file and cannot be analyzed');
      process.exit(); //END PROCESS
    } else if (ext === '.md'){ //MD file
      fileValid.readFile(absolutePath);
    }
  }
  else if (dirOrFile === true){ //Directory
    
  }
}


//Invalid path
//mdLinks('docs/old-dir');

//Valid path
//mdLinks('docs');
//mdLinks('docs/new-dir/doc3.md');
//mdLinks('docs/new-dir/testdoc.txt');
