const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths


//Reading a file and extracting links
function getLinks(filePaths){ //recibe un archivo
  let links = [];
  let arrayLinks = [];
  let filepath = []

  filePaths.forEach(mdFile => {
    const data = fs.readFileSync(mdFile, 'utf8');

    const linkRegExp = /\[([^\]]+)\]\(https?:\/\/(www\.)?[\w\-]+(\.[\w\-]+)+[/#?]?.*\)/gi;

    const linkMatches = [...data.matchAll(linkRegExp)]
    linkMatches.forEach(link => {
      links.push(link);
      filepath.push(mdFile);
    });
  });

  links.forEach((linkObj) => {
    let i = links.indexOf(linkObj);
    const opening = linkObj[0].indexOf('(');
    const closing = linkObj[0].indexOf(')'); //hasta que haya un espacio
    let url = linkObj[0].slice(opening + 1, closing);
    
    if(url.includes(' ')){
      url = url.slice(0, (url.indexOf(' ')))
    } 

    arrayLinks.push({
      href: url,
      text: linkObj[1],
      file: filepath[i],
    });
  });

  //console.log(arrayLinks)
  return arrayLinks;
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


module.exports = {/* defaultBehavior, */ getLinks}