const puppeteer=require('puppeteer');

module.exports=async (url)=>{
	//url=url.replace("預", "");
	//url=url.replace("F", "").replace("f", "");
	const browser=await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox','--disable-setuid-sandbox']
	});
	const page=await browser.newPage();
	await page.goto(url);
	const image=await page.screenshot({
		fullPage : true,
		type:"png",
		//path: "./screenshot.png",
	});return image;
	console.log("===========================");
	console.log(__dirname+"/screenshot.png");
	console.log(image);
	console.log("===========================");
	await browser.close();
	return {
		type: 'image',
		originalContentUrl: "https://pbs.twimg.com/media/DfkhrO1XUAEYkdw.jpg",
		previewImageUrl: "https://pbs.twimg.com/media/DfkhrO1XUAEYkdw.jpg",
	};
}
