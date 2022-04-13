const puppeteer=require('puppeteer');

module.exports=async (url)=>{
	const browser=await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox','--disable-setuid-sandbox']
	});
	const page=await browser.newPage();
	await page.setViewport({
		width: 1920,
		height: 1080
	});
	await page.goto(url);
	const image=await page.screenshot({
		fullPage : true,
		type:"png"
	});

	await browser.close();
	return image;
}
