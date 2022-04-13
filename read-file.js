const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths

function pathIsFile(absolutePath, mdFilesArr){
  const ext = path.extname(absolutePath);
  if (ext !== '.md'){ //Not a MD file
    process.stdout.write('This is not a markdown file and cannot be analyzed');
    process.exit();
  } else if (ext === '.md'){ //MD file
    mdFilesArr.push(absolutePath);
  }
}

//Function for the array that contains all the md file paths
/* function defaultBehavior(filesArr, userPath){
  const basePath = userPath;

  filesArr.forEach(mdFile => { //Recorre los archivos
    const userInputPath = mdFile.match(basePath);
    const relative = mdFile.slice(userInputPath.index, mdFile.length);

    const links = getLinks(mdFile); //Extrae links
    if(links.length > 0){ //Aplica solo para los archivos que tuvieron links
      links.forEach(link => { //Recorre los links
        process.stdout.write(`${relative} ${link}\n`); //FALTA AGREGARLE EL TEXTO ASOCIADO
      }) 
    }
  })
} */


module.exports = {/* defaultBehavior, */ pathIsFile}