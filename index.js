const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths
// const EventEmitter = require('events');
// const readline = require('readline'); // to receive user inputs

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
    dirOrFile = isDirectory(absolutePath);
  } else {
    console.log(`Pathname doesn't exist`); //END PROCESS
  }

  if(dirOrFile === false){ //File
    const ext = extension(absolutePath);
    if (ext !== '.md'){ //Not a MD file
      console.log('This is not a markdown file and cannot be analyzed'); //END PROCESS
    } else if (ext === '.md'){ //MD file
       readFile(absolutePath);
    }
  }
   /* else if (dirOrFile === true){ //Directory

  } */
}


//Invalid path
//mdLinks('docs/new-dir');

//Valid path
//mdLinks('docs/new-dir');
//mdLinks('docs/new-dir/doc3.md');
mdLinks('docs/new-dir/testdoc.txt');

// Determines if a given path is a directory or not
function isDirectory(userPath){
  const directory = fs.lstatSync(userPath).isDirectory();
  return directory;
}

// Extracting the type of the file
function extension(filePath){
  const ext = path.extname(filePath);
  console.log(ext);
  return ext;
}

// Reading a file
function readFile(filePath){
  fs.readFile(filePath, 'utf8', (err, data) => {
    if(err){
      console.log(err);
    } else {
      console.log(data);
    }
});
};

// Printing in console an array of the files inside a directory
function readDirectory(directoryPath){
  fs.readdir(directoryPath, (err, files) => {
    if(err){
      console.log(err);
    } else {
      console.log(files);
    }
  });
};

