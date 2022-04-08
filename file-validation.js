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
  
// Finding the md files inside a directory
function readDirec(directoryPath){
  let mdFiles = [];
  fs.readdir(directoryPath, (err, files) => {
    if(err){
      console.log(err);
    } else {
      const contentsArr = files; //Todo el contenido del directorio
      contentsArr.forEach(files => {
        if(extension(files) === '.md'){ //si es archivo MD
          mdFiles.push(path.resolve(directoryPath, files));
        } else if(extension(files) === ''){ //si es carpeta
          let resolvedPath = path.resolve(directoryPath, files);
          readDirectory(resolvedPath);
        }
      })
      //console.log(mdFiles);
      //return mdFiles;
    }
  })
  return mdFiles;
};

function readDirectory(directoryPath) {
  return new Promise(function(resolve, reject) {
    fs.readdir(directoryPath, function(err, files){
      if (err) 
        reject(err); 
      else 
        resolve(files)
      });
  });
};

function readDirRecursive(resolved, ){

}


function recursiveFileExtrac(dir){
/*Pasos: 
1. Se ejecuta sobre una carpeta
2. Lee los contenidos, los guarda en un array Content y lo recorre
3. Identifica la extensión de cada uno, si tienen extensión, los manda al array de Files, 
sino entonces significa que son una carpeta, y que esta función se 
debe ejecutar dentro de esa carpeta también
4. Debe dejar de ejecutarse cuando termine de recorrer el array de content
*/

  // Caso base, cuándo debe detenerse

  // Lo que hará cuando encuentre una carpeta

  // Almacenar los pathnames en un array

  // La función se llama a sí misma nuevamente
}

module.exports = {isDirectory, extension, readFile, readDirectory}