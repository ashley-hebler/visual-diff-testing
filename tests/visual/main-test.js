const path = require("path");

const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

describe("index page", () => {
	let page;
	beforeAll(async () => {
		page = await __BROWSER__.newPage();
		await page.goto("http://localhost:8080/");
	}, 5000);

	afterAll(async () => {
		await page.close();
	});

	it("should mirror live site", async () => {
		await page.setViewport({ width: 1920, height: 1080 });
		await page.screenshot({
      fullPage: true,
      path: `${path.resolve(__dirname, '..', '..', 'screenshots', 'local')}/image.png`,
		});
		return compareScreenshots('image');
	}, 5000);
});



function compareScreenshots(fileName) {
  return new Promise((resolve, reject) => {
    const img1 = fs.createReadStream(`./screenshots/live/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);
    const img2 = fs.createReadStream(`./screenshots/local/${fileName}.png`).pipe(new PNG()).on('parsed', doneReading);

    let filesRead = 0;
    function doneReading() {
      // Wait until both files are read.
      if (++filesRead < 2) return;

      // The files should be the same size.
      expect(img1.width).toEqual(img2.width);
      expect(img1.height).toEqual(img2.height);

      // Do the visual diff.
      const diff = new PNG({width: img1.width, height: img2.height});
      const numDiffPixels = pixelmatch(
          img1.data, img2.data, diff.data, img1.width, img1.height,
          {threshold: 0.1});

      // The files should look the same.
      expect(numDiffPixels).toBeCloseTo(0, 100);
      resolve();
    }
  });
}