const path = require('path');
const {
  sagaString, viewString, actionString, meString, reducersString, typesString, headerString, listString
} = require('./component-string');
const { write } = require('./writer');
const url = require('./make-dir');

write(url, 'view.jsx', viewString);

write(url, 'me.json', meString);

write(url, 'saga.js', sagaString);

write(url, 'action.js', actionString);

write(url, 'reducers.js', reducersString);

write(url, 'types.js', typesString);

write(path.join(url, 'jsx'), 'header.jsx', headerString);

write(path.join(url, 'jsx'), 'list.jsx', listString);
