const path = require('path'); // working with file and directory paths

function resolvePath(userPath){
  let resolvedPath;
  if(path.isAbsolute(userPath) === false){
      resolvedPath = path.resolve(userPath);
    } else {
      resolvedPath = userPath;
    }
  return resolvedPath;
}

module.exports = {resolvePath}
