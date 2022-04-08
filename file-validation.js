const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths

// Determines if a given path is a directory or not
function isDirectory(userPath){
  const directory = fs.lstatSync(userPath).isDirectory();
  return directory;
}

// Extracting the type of the file
function extension(filePath){
  const ext = path.extname(filePath);
  //console.log(ext);
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

module.exports = {isDirectory, extension, readFile, readDirectory}