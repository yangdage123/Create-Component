const fs = require('fs');
const path = require('path');

const writer = (url, baseName, string) => {
  fs.writeFile(path.join(url, baseName), string, (err) => {
    if (err) {
      return console.error(`write ${baseName} error: ${err}`);
    }
    console.log(`---${baseName}文件写入成功!---`);
  });
};

module.exports = {
  write: writer,
};
