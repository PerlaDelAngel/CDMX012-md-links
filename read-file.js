const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths
const markdownLinkExtractor = require('markdown-link-extractor');

//Reading a file
function readFile(filePath){ //recibe un archivo
  const data = fs.readFileSync(filePath, 'utf8');
  const { links } = markdownLinkExtractor(data, true); 
  return links;
}

//Function for the array that contains all the md file paths
function readFilesRec(filesArr){
  filesArr.forEach(mdFile => {
    const links = readFile(mdFile);
    //console.log(links);
    links.forEach(link => console.log(`${link.href} => ${link.text}`))
  })
}


module.exports = {readFilesRec, readFile}