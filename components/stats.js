const validateLink = require('./link-validation');

function stats(linksObj){
  let unique = [...new Set(linksObj.map(item => item.href))];
  return unique;
}

function brokenLinks(linksObj){
  const validateLinks = linksObj.map(link => validateLink(link));

  return Promise.all(validateLinks)
  .then((result)=>{
    const broken = result.filter(link => link.ok === 'fail');
    return broken.length;
  }) 
}

module.exports = {stats, brokenLinks}