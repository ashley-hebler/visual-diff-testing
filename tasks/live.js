const puppeteer = require('puppeteer');

async function run() {
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://ashley-viz.surge.sh/');
    await page.screenshot({ path: './screenshots/live/image.png', type: 'png', fullPage: true });
    await page.close();
    await browser.close();
}

run();