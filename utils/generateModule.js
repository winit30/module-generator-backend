const fs = require("fs"),
      archiver = require('archiver');

var generateModule = (userID) => {
    var output = fs.createWriteStream(`./public/downloads/${userID}/generatedModule.zip`);
    var archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    output.on('close', function() {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive.on('error', function(err){
      throw err;
    });

    archive.pipe(output);
    archive.directory('./modules', false);
    archive.finalize();
};

module.exports = {generateModule};
