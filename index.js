const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths
// const readline = require('readline'); // to receive user inputs

/* module.exports = () => {
  // ...
}; */

function mdLinks(path, options){
  
}

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

// Resolving two path segments 
const resolvePath = (...paths) => {
  const resolvedPath = path.resolve(...paths);
  return resolvedPath;
};
/* console.log(resolvePath('docs', '/new-dir', './doc3.md')); */