const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths


//Reading a file and extracting links
function getLinks(filePath){ //recibe un archivo
  const data = fs.readFileSync(filePath, 'utf8');

  const textRegExp = /\[(.*)\]/g;
  let titles = []
  const linkTitles = [...data.matchAll(textRegExp)];
  linkTitles.forEach(linkTitle => {
    titles.push(linkTitle[1])
    //console.log(linkTitle[1]); 
  });
  
  const linkRegExp = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
  let links = [];
  const linkMatches = [...data.matchAll(linkRegExp)]
  linkMatches.forEach(link => {
    links.push(link[0])
    //console.log(link[0]); 
  });

  const linksObj = {};
  titles.forEach((title, index) => {
    linksObj[title] = links[index];
  })
  //console.log(linksObj)
  
  return linksObj;
}

//Function for the array that contains all the md file paths
function defaultBehavior(filesArr){
  filesArr.forEach(mdFile => { //Recorre los archivos
    const links = getLinks(mdFile); //Extrae links
    //console.log(links);
    links.forEach(link => { //Recorre los links
      //console.log(`${mdFile} ${link}`)
    }) 
  })
}


module.exports = {defaultBehavior, getLinks}