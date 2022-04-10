const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths
 
// Reading a file
function readFile(filePath){
  fs.readFile(filePath, 'utf8', (err, data) => {
    if(err){
      console.log(err);
    } else {
      console.log(data);
    }
  });
};


module.exports = {readFile}