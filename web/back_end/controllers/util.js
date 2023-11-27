const fs = require('fs');


const updateFile = (filePath, newContent) => {

// Append or update the file asynchronously
fs.writeFileSync(filePath, newContent, 'utf8', (err) => {
  if (err) {
    console.error(`Error updating file: ${err.message}`);
    return;
  }

  console.log('File updated successfully!');
});

}

module.exports = updateFile;