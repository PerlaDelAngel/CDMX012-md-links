const validate = require('./link-validation');
const { resolvePath } = require('./validate-path');

function stats(linksObj){
  let unique = [...new Set(linksObj.map(item => item.href))];
  process.stdout.write(`Total: ${linksObj.length}\nUnique: ${unique.length}`);
}

function combinedStats(linksObj){
  let unique = [...new Set(linksObj.map(item => item.href))];

  const validateLinks = linksObj.map(link => validate.validateLink(link));

  Promise.all(validateLinks)
  .then((result)=>{
    const broken = result.filter(link => link.status >= 400);
    process.stdout.write(`Total: ${linksObj.length}\nUnique: ${unique.length}\nBroken: ${broken.length}`);
  }) 
}

module.exports = {stats, combinedStats}