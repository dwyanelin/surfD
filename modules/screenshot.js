const puppeteer=require('puppeteer');

module.exports=async (url)=>{
	const browser=await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox','--disable-setuid-sandbox']
	});
	const page=await browser.newPage();
	await page.setViewport({
		width: 1200,
		height: 1200
	});
	await page.goto(url, {"waitUntil" : "networkidle0"});
	const button1=await page.$('[data-do="set,waves"]');
	await button1.evaluate(b=>b.click());
	await page.waitForNavigation();
	const button11=await page.$('[data-do="set,ecmwfWaves"]');
	await button11.evaluate(b=>b.click());
	await page.waitForNavigation();
	const imageBuffer1=await page.screenshot({
		fullPage: true,
		type: "png"
	});
	const button2=await page.$('[data-do="set,gfsWaves"]');
	await button2.evaluate(b=>b.click());
	await page.waitForNavigation();
	const imageBuffer2=await page.screenshot({
		fullPage: true,
		type: "png"
	});
	const button3=await page.$('[data-do="set,iconWaves"]');
	await button3.evaluate(b=>b.click());
	await page.waitForNavigation();
	const imageBuffer3=await page.screenshot({
		fullPage: true,
		type: "png"
	});

	await browser.close();
	return [imageBuffer1, imageBuffer2, imageBuffer3];
}
