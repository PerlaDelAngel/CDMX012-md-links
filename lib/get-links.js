const fs = require('fs'); //file system

//Reading a file and extracting links
function getLinks(filePaths){ //recibe un archivo
  let links = [];
  let arrayLinks = [];
  let filepath = [];
  
  filePaths.forEach(mdFile => {
    const data = fs.readFileSync(mdFile, 'utf8');
  
    const linkRegExp = /\[([^\]]+)\]\(https?:\/\/(www\.)?[\w\-]+(\.[\w\-]+)+[/#?]?.*\)/gi;
  
    const linkMatches = [...data.matchAll(linkRegExp)];
    linkMatches.forEach(link => {
      links.push(link);
      filepath.push(mdFile);
    });
  });
  
  links.forEach((linkObj) => {
    let i = links.indexOf(linkObj);
    const opening = linkObj[0].indexOf('(');
    const closing = linkObj[0].indexOf(')');
    let url = linkObj[0].slice(opening + 1, closing);
      
    if(url.includes(' ')){
      url = url.slice(0, (url.indexOf(' ')));
    } 

    let linkText = linkObj[1];
    if(linkObj[1].length >= 50){
      linkText = linkObj[1].slice(0, 50);
    }
  
    arrayLinks.push({
      href: url,
      text: linkText,
      file: filepath[i],
    });
  });
  
  //console.log(arrayLinks)
  return arrayLinks;
}

module.exports = {getLinks}