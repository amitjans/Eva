var fs = require('fs');

module.exports = {
    logs: function (name, text) {
        fs.appendFile('./temp/' + name + '.txt', text, function (err) {
            if (err) throw err;
            console.log('Updated!');
          });
    }
  };