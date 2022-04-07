/* module.exports = () => {
  // ...
}; */

const fs = require('fs'); //file system
const path = require('path'); // working with file and directory paths
// const readline = require('readline'); // to receive user inputs

// Reading a file
fs.readFile('./doc.md', 'utf8', (err, data) => {
  if(err){
    console.log(err);
  } else {
    console.log(data);
  }
});

// Extracting the type of the file
const ext = path.extname('./doc.md')
console.log(ext);