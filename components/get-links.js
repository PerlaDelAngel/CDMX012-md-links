const fs = require('fs'); //file system

//Reading a file and extracting links
function getLinks(filePaths){ //recibe un archivo
  let links = [];
  let linksObject = [];
  let paths = [];
  
  filePaths.forEach(mdFile => {
    const data = fs.readFileSync(mdFile, 'utf8'); //lee el archivo
  
    const linkRegExp = /\[([^\]]+)\]\(https?:\/\/(www\.)?[\w\-]+(\.[\w\-]+)+[/#?]?.*\)/gi;
  
    const linkMatches = [...data.matchAll(linkRegExp)]; //Busca las coincidencias
    linkMatches.forEach(link => { //Por cada coincidencia
      links.push(link); // manda el link al array de links
      paths.push(mdFile); // manda el path al de paths
    });
  });
  
  links.forEach((linkObj) => { //Recorre el array de links
    let i = links.indexOf(linkObj); //Idenfica el índice del link actual en el array
    const closingB = linkObj[0].indexOf(']');
    let enclosedUrl = linkObj[0].slice(closingB + 1);

    const opening = enclosedUrl.indexOf('(');
    const closing = enclosedUrl.indexOf(')');
    let url = enclosedUrl.slice(opening + 1, closing); //extrae sólo el link
      
    if(url.includes(' ')){
      url = url.slice(0, (url.indexOf(' '))); //si este contiene otro texto además del link, lo elimina
    } 

    let linkText = linkObj[1];  //extrae el texto asociado al link
    if(linkObj[1].length >= 50){
      linkText = linkObj[1].slice(0, 50); //si el texto tiene más de 50 caracteres, los corta
    }
  
    linksObject.push({ //crea el objeto del link y lo empuja al array de objetos
      href: url,
      text: linkText,
      file: paths[i],
    });
  });
  //console.log(arrayLinks)
  return linksObject;
}

module.exports = getLinks;