function stats(linksObj){
  let unique = [...new Set(linksObj.map(item => item.href))];
  process.stdout.write(`Total: ${linksObj.length}\nUnique: ${unique.length}`);
}

module.exports = {stats}