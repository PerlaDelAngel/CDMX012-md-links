const fs = require('fs');
const pathIsFile = require('./read-file');
const readDirec = require('./read-directory');
const resolvePath = require('./resolve-path');
const getLinks = require('./get-links');
const validateLink = require('./link-validation');

function mdLinks(userPath, options) {
  return new Promise((resolve, reject) => {
    const absolutePath = resolvePath(userPath);

    const dirOrFile = fs.lstatSync(absolutePath).isDirectory();

    const mdFiles = [];
    if (dirOrFile === false) {
      pathIsFile(absolutePath, mdFiles);
    } else if (dirOrFile === true) {
      readDirec(absolutePath, mdFiles);
    }

    const obtainedLinks = getLinks(mdFiles);

    if (options === false) {
      resolve(obtainedLinks);
    } else if (options === true) {
      const status = obtainedLinks.map((link) => validateLink(link));
      resolve(Promise.all(status));
    } else {
      reject(Error('Something went wrong'));
    }
  });
}

module.exports = mdLinks;
