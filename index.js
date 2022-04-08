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
  } else {
    absolutePath = userPath;
  }
  console.log(absolutePath);

  let dirOrFile;
  if(fs.existsSync(absolutePath)){ //Checks if the path exists
    console.log('Valid pathname');
    dirOrFile = fileValid.isDirectory(absolutePath); // The path belongs to a file or a directory?
  } else {
    process.stdout.write('Path does not exist');
    process.exit();
  }

  let filesArr = [];
  let mdFiles = [];

  if(dirOrFile === false){ //File
    const ext = fileValid.extension(absolutePath);
    if (ext !== '.md'){ //Not a MD file
      process.stdout.write('This is not a markdown file and cannot be analyzed');
      process.exit();
    } else if (ext === '.md'){ //MD file
      fileValid.readFile(absolutePath)
    }
  }
  else if (dirOrFile === true){ //Directory
    const docs = fileValid.readDirectory(absolutePath);
    docs
    .then((files) => {
      files.forEach(file => {
        let resolvedPath = path.resolve(absolutePath, file);
        filesArr.push(resolvedPath);
      });
      //console.log(filesArr); //Aquí si regresa los paths en un array
      
      filesArr.forEach(filepath => {
        if(fileValid.extension(filepath) === '.md'){
          mdFiles.push(filepath);
        } else if (fileValid.isDirectory(filepath) === true){
          console.log(`This is a directory: ${filepath}`); //Falta implementar la recursividad para revisar las carpetas
        }
      });
      console.log(mdFiles)

    });
  };

};


//Invalid path
//mdLinks('docs/old-dir');

//Valid path
mdLinks('docs');
//mdLinks('docs/new-dir/doc3.md');
//mdLinks('docs/new-dir/testdoc.txt');
