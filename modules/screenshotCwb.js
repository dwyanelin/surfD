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

const images=require("images");

module.exports=async (url, browser, location)=>{
	let page;
	try{
		page=await browser.newPage();
		let pages=await browser.pages();
		//console.log(pages);
		console.log("browser開啟的page數量(cwb)："+pages.length);

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

		await page.setViewport({
			width: 1199,
			height: 900
		});

		/*
			先goto到網頁，找到以下的位置：
			class="main-title"
			id="tabcontent-2"
			id="tabcontent-3"
			截圖，
			創個imageAll，寬度=大的寬度，高度=兩個相加，
			按順序draw進去，
			encode成png，return
		*/

		await page.goto(url, {"waitUntil": "networkidle0"});

		const title=await page.$('[class="main-title"]');
		const rectTitle=await page.evaluate(el=>{
			const {top, left, width, height}=el.getBoundingClientRect();
			return {top, left, width, height};
		}, title);
		//console.log(rectTitle);
		const imageBufferTitle=await page.screenshot({
			clip: {
				x: rectTitle.left,
				y: rectTitle.top,
				width: rectTitle.width,
				height: rectTitle.height
			},
			type: "png"
		});

		const tableWeather=await page.$('[id="tabcontent-2"]');
		const rectTableWeather=await page.evaluate(el=>{
			const {top, left, width, height}=el.getBoundingClientRect();
			return {top, left, width, height};
		}, tableWeather);
		//console.log(rectTableWeather);
		const imageBufferTableWeather=await page.screenshot({
			clip: {
				x: rectTableWeather.left,
				y: rectTableWeather.top,
				width: rectTableWeather.width,
				height: rectTableWeather.height
			},
			type: "png"
		});

		const tableWave=await page.$('[id="tabcontent-3"]');
		const rectTableWave=await page.evaluate(el=>{
			const {top, left, width, height}=el.getBoundingClientRect();
			return {top, left, width, height};
		}, tableWave);
		//console.log(rectTableWave);
		const imageBufferTableWave=await page.screenshot({
			clip: {
				x: rectTableWave.left,
				y: rectTableWave.top,
				width: rectTableWave.width,
				height: rectTableWave.height
			},
			type: "png"
		});

		let imageTitle=images(imageBufferTitle);
		let imageTableWeather=images(imageBufferTableWeather);
		let imageTableWave=images(imageBufferTableWave);

		let imageAllHeight=imageTitle.height()+imageTableWeather.height()+imageTableWave.height();

		//較寬的當全圖寬度，並填滿白色，空的地方才不會缺一角
		let imageAll=images(Math.max(imageTitle.width(), imageTableWeather.width(), imageTableWave.width()), imageAllHeight).fill(0xff, 0xff, 0xff);
		//較寬的當全圖寬度，並填滿白色，空的地方才不會缺一角

		imageAll
		.draw(imageTitle, 0, 0)
		.draw(imageTableWeather, 0, imageTitle.height())
		.draw(imageTableWave, 0, imageTitle.height()+imageTableWeather.height())
		let imageAllBuffer=imageAll
		.encode("png");

		await page.close();
		return [imageAllBuffer];
	}
	catch(error){
		//可能執行超時30秒會跑來這
		if(typeof page!=="undefined"&&page.isClosed()===false){
			//剛開伺服器就跑指令，browser還沒開好page就會是undefined
			//要先檢查page還沒被關掉，再去關他才不會錯誤
			console.log("截圖失敗："+location);
			console.log("error await page.close();");
			console.log("===========================");
			await page.close();
		}
		console.log(error);
		console.log("===========================");
	}
	finally {
		console.log("finally");
		console.log("===========================");
		//await page.close();//總是在try結束後關閉browser
	}
};
