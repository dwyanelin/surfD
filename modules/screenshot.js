const puppeteer=require('puppeteer');

module.exports=async (url, viewport)=>{
	const browser=await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	const page=await browser.newPage();

	// Set the language forcefully on javascript
	await page.evaluateOnNewDocument(() => {
		Object.defineProperty(navigator, "language", {
			get: function() {
				return "zh-cht";
			}
		});
		Object.defineProperty(navigator, "languages", {
			get: function() {
				return ["zh-cht"];
			}
		});
	});

	if(viewport==="小"){
		await page.setViewport({
			width: 960,
			height: 720
		});
	}
	else{
		await page.setViewport({
			width: 1920,
			height: 1440
		});
	}

	await page.goto(url, {"waitUntil" : "networkidle0"});
	const button1=await page.$('[data-do="set,waves"]');
	await button1.evaluate(b=>b.click());
	await page.waitForNavigation();
	const button11=await page.$('[data-do="set,ecmwfWaves"]');
	await button11.evaluate(b=>b.click());
	await page.waitForNavigation();
	//metric,wind//風速單位，按兩下
	//metric,waves//浪高單位，按一下
	const button12=await page.$('[data-do="metric,wind"]');
	await button12.evaluate(b=>{
		b.click();
		b.click();
	});
	await page.waitForNavigation();
	const button13=await page.$('[data-do="metric,waves"]');
	await button13.evaluate(b=>b.click());
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
