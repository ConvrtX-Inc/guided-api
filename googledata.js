var gplay = require('google-play-scraper');
const fs = require('fs');

const file = fs.createWriteStream('gdata.json');
gplay
  .app({ appId: 'com.canada.guided' })
  .then((result) => JSON.stringify(result))
  .then((text) => file.write(text));
