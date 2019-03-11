const path = require('path');
const opn = require('opn');
const image = `${path.resolve(__dirname, '..', 'screenshots')}/diff.png`;

opn(image, {wait: false}).then(() => {
  console.log('opened diff');
});;
