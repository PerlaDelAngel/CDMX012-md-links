const path = require('path');

function resolvePath(userPath){
  let resolvedPath;
  if(path.isAbsolute(userPath) === false){
      resolvedPath = path.resolve(userPath);
    } else {
      resolvedPath = userPath;
    }
  return resolvedPath;
}

module.exports = resolvePath;
