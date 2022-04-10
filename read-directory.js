const fs = require('fs'); 
const path = require('path');
// const readdir = require('fs/promises')


//NODE PROMISES
function readDirRecursive(inputPath, arrFiles){
  fs.promises.readdir(inputPath)
  .then(filenames => {
    filenames.forEach((element)=>{
      const resolvedPath = path.resolve(inputPath, element);
      //console.log(resolvedPath);
      if(fs.lstatSync(resolvedPath).isDirectory()){
        console.log(`This is a directory: ${resolvedPath}`);
        readDirRecursive(resolvedPath, arrFiles);
      } else if(path.extname(resolvedPath) === '.md'){
        arrFiles.push(resolvedPath);
      }
    })
    console.log(arrFiles);
    return arrFiles;
  })
  .catch(err => {
    console.error(err);
  })
}

// SYNC
/* function readDirRec1(inputPath, arrFiles = []){
  if(fs.lstatSync(inputPath).isDirectory()){ //SI ES UN DIRECTORIO
    const elements = fs.readdirSync(inputPath);
    // console.log(elements); //elementos del directorio 

    elements.forEach((element) => {
      const resolvedPath = path.resolve(inputPath, element);
      //console.log(resolvedPath); //path resuelto de cada elemento
      readDirectory(resolvedPath);
    }) 
  } else if(path.extname(inputPath) === '.md'){
    arrFiles.push(inputPath);
  }
  //console.log(arrFiles);
  return arrFiles;
} */

// NEW PROMISE
/* function readDirectory(directoryPath) {
  return new Promise(function(resolve, reject) {
    fs.readdir(directoryPath, function(err, files){
      if (err) 
        reject(err); 
      else 
        resolve(files);
      });
  });
};

function readDirRecursive(directoryPath, elementsArr, arrFiles){
  readDirectory(directoryPath)
  .then((files) => {
    files.forEach(file => {
      let resolvedPath = path.resolve(directoryPath, file);
      elementsArr.push(resolvedPath); 
    });
    //console.log(elementsArr); //Regresa los paths en array de los contenidos de la carpeta

    elementsArr.forEach(element => {
      if(fs.lstatSync(element).isDirectory()){
        readDirRecursive(element, elementsArr, arrFiles);
      } else if(path.extname(element) === '.md') {
        arrFiles.push(element);
      }
    })
    console.log(arrFiles);
    return arrFiles;
  });
};  */


module.exports = {readDirRecursive}