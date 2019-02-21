const path = require('path');
const fs = require('fs');
const { baseUrl, fileUrl } = require('./config');

const url = path.join(baseUrl, fileUrl);

if (url.length > 1) {
  let target = '';
  const dir = url.split('/');
  for (let i = 0; i < dir.length; i++) {
    target = `${target}${dir[i]}`;
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }
    target += '/';
  }
  if (!fs.existsSync(path.join(url, 'jsx'))) {
    fs.mkdirSync(path.join(url, 'jsx'));
  }
}

module.exports = url;
