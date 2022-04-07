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

  if(fs.existsSync(absolutePath)){
    console.log('Valid pathname');
  } else {
    console.log(`Pathname doesn't exist`);
  }
}

//Invalid path
//mdLinks('docs/new-dir');

//Valid path
//mdLinks('docs/new-dir');
//mdLinks('docs/new-dir/doc3.md')


// Reading a file
const readFile = (filePath) => {
  fs.readFile('filePath', 'utf8', (err, data) => {
    if(err){
      console.log(err);
    } else {
      console.log(data);
    }
});
};

// Extracting the type of the file
const extension = (filePath) => {
  const ext = path.extname(filePath);
  console.log(ext);
};

// Printing in console an array of the files inside a directory
const readDirectory = (directoryPath) => {
  fs.readdir(directoryPath, (err, files) => {
    if(err){
      console.log(err);
    } else {
      console.log(files);
    }
  });
};

