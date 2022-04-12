const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths


//Reading a file and extracting links
function getLinks(filePaths){ //recibe un archivo
  let links = [];

  filePaths.forEach(file => {
    const data = fs.readFileSync(file, 'utf8');

    const linkRegExp = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
    
    const linkMatches = [...data.matchAll(linkRegExp)]
    linkMatches.forEach(link => {
    links.push(link[0])
  });
  })

  return links;

  /* const textRegExp = /\[(.*)\]/g;
  let titles = []
  const linkTitles = [...data.matchAll(textRegExp)];
  linkTitles.forEach(linkTitle => {
    titles.push(linkTitle[1])
    //console.log(linkTitle[1]); 
  }); */
  
  /* const linksObj = {};
  titles.forEach((title, index) => {
    linksObj[title] = links[index];
  }) */
  //console.log(linksObj)
  
  //return linksObj;
}


//Function for the array that contains all the md file paths
function defaultBehavior(filesArr, userPath){
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
}


module.exports = {defaultBehavior, getLinks}