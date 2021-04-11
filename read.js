// Importing File System and Utilities module
const fs = require('fs')
const util = require('util')
  
// Convert callback based methods to
// promise based methods
const readFileAsync = util.promisify(fs.readFile)
  
// The readFileAsync() method reads the file
// and returns buffer form of the data 
readFileAsync('./db/db.json', 'utf8')
// If promise resolved and datas are read 
.then(data => {
  const contents = data.toString()
  console.log(`\nContents of the file :\n${contents}`)
})
  
// If promise get rejected
.catch(err => {
   console.log(`Error occurs, Error code -> ${err.code}, 
   Error No -> ${err.errno}`);
});