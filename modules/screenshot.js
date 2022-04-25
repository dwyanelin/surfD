/*
heroku buildpacks:add heroku/nodejs
heroku buildpacks:set https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack.git
應該是用上面的add cmd，add下面三個，再git push heroku master就可，
如果coffee不行add，就用set，set完還要再add heroku/nodejs一次（不知為啥會替換掉）
//指令沒有list，只有add或set完後才會list裝了什麼buildpacks
heroku/nodejs
jontewks/puppeteer
https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack.git
*/

module.exports=async (url, viewport, system, puppeteer)=>{
	const browser=await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	try{
		const page=await browser.newPage();

		//Set the language forcefully on javascript
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, "language", {
				get: function() {
					return "zh-TW";
				}
			});
			Object.defineProperty(navigator, "languages", {
				get: function() {
					return ["zh-TW"];
				}
			});
		});

		if(viewport==="大"){
			await page.setViewport({
				width: 1600,
				height: 1200
			});
		}
		else{
			await page.setViewport({
				width: 900,
				height: 900
			});
		}

		if(system==="E"){
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
			const imageBufferE=await page.screenshot({
				fullPage: true,
				type: "png"
			});
			await browser.close();
			return [imageBufferE];
		}
		else if(system==="G"){
			await page.goto(url, {"waitUntil" : "networkidle0"});
			const button1=await page.$('[data-do="set,waves"]');
			await button1.evaluate(b=>b.click());
			await page.waitForNavigation();
			const button11=await page.$('[data-do="set,gfsWaves"]');
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
			const imageBufferG=await page.screenshot({
				fullPage: true,
				type: "png"
			});
			await browser.close();
			return [imageBufferG];
		}
		else if(system==="I"){
			await page.goto(url, {"waitUntil" : "networkidle0"});
			const button1=await page.$('[data-do="set,waves"]');
			await button1.evaluate(b=>b.click());
			await page.waitForNavigation();
			const button11=await page.$('[data-do="set,iconWaves"]');
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
			const imageBufferI=await page.screenshot({
				fullPage: true,
				type: "png"
			});
			await browser.close();
			return [imageBufferI];
		}
		else{
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
	}
	catch(error){
		console.log(error);
	}
	finally {
		await browser.close();//總是在try結束後關閉browser
	}
}
