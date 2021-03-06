var fs = require('fs'),
    PNG = require('pngjs').PNG,
    pixelmatch = require('pixelmatch');

var img1 = fs.createReadStream('screenshots/live/image.png').pipe(new PNG()).on('parsed', doneReading),
    img2 = fs.createReadStream('screenshots/local/image.png').pipe(new PNG()).on('parsed', doneReading),
    filesRead = 0;

function doneReading() {
    if (++filesRead < 2) return;
    var diff = new PNG({width: img1.width, height: img1.height});
    const numDiffPixels = pixelmatch(
        img1.data, img2.data, diff.data, img1.width, img1.height,
        {threshold: 0.1});
    console.log(numDiffPixels)
    // pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});

    diff.pack().pipe(fs.createWriteStream('screenshots/diff.png'));
}