var fs = require('fs');

module.exports = {
  logs: function (name, text) {
    let dir = './temp/';
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    } catch (err) {
      console.error(err);
    }
    fs.appendFile('./temp/' + name + '.txt', text, function (err) {
      if (err) throw err;
      console.log('Updated!');
    });
  }
};