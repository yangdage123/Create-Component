const path = require('path');
const fs = require('fs');
const { baseUrl, fileUrl } = require('./config');
const {
  sagaString, viewString, actionString, meString, reducersString, typesString
} = require('./component-string');
const { write } = require('./writer');

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

write(url, 'view.jsx', viewString);

write(url, 'me.json', meString);

write(url, 'saga.js', sagaString);

write(url, 'action.js', actionString);

write(url, 'reducers.js', reducersString);

write(url, 'types.js', typesString);
