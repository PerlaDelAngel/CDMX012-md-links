const validate = require('./link-validation');

function stats(linksObj){
  let unique = [...new Set(linksObj.map(item => item.href))];
  return unique;
}

function brokenLinks(linksObj){
  const validateLinks = linksObj.map(link => validate.validateLink(link));

  return Promise.all(validateLinks)
  .then((result)=>{
    const broken = result.filter(link => link.status >= 400);
    return broken;
  }) 
}

module.exports = {stats, brokenLinks}