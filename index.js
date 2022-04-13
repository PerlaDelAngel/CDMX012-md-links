const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths
const process = require('process');
const file = require('./read-file');
const folder = require('./read-directory');

/* module.exports = () => {
  // ...
}; */

function mdLinks(userPath, options){
  return new Promise(function(resolve, reject){
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
      dirOrFile = fs.lstatSync(absolutePath).isDirectory(); // The path belongs to a file or a directory?
    } else {
      process.stdout.write('Path does not exist');
      process.exit();
    }
    
    let mdFiles = [];
  
    if(dirOrFile === false){ //File
      const ext = path.extname(absolutePath);
      if (ext !== '.md'){ //Not a MD file
        process.stdout.write('This is not a markdown file and cannot be analyzed');
        process.exit();
      } else if (ext === '.md'){ //MD file
        //file.readFile(absolutePath);
        mdFiles.push(absolutePath);
      }
    }
    else if (dirOrFile === true){ //Directory
      folder.readDirRecursive(absolutePath, mdFiles);
    };
  
    //ejecutar leer un archivo, va a recibir el array con muchos archivos
    const obtainedLinks = file.getLinks(mdFiles);

    if (options === undefined) { //Acá poner condiciones, ej. options = validate:true, etc
      return resolve(obtainedLinks);
    }
    else {
      return reject(Error("Something went wrong"));
    }
  })
}

//Valid path
mdLinks('docs')
.then((links)=>{
  console.log(links)
})

//Invalid path
//mdLinks('docs/old-dir');

//Valid path
//mdLinks('docs');
//mdLinks('docs/new-dir/doc3.md');
//mdLinks('docs/new-dir/testdoc.txt');
//mdLinks('docs/doc1.md');
