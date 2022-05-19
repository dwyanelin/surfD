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

module.exports=async (url, days, browser, location)=>{
	let page;
	try{
		page=await browser.newPage();
		let pages=await browser.pages();
		//console.log(pages);
		console.log("browser開啟的page數量(msw)："+pages.length);

		const context=browser.defaultBrowserContext();
		await context.overridePermissions(url, ['geolocation']);
		await page.setGeolocation({latitude:24.888, longitude:121.849});

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

		/*
			先goto到網頁，
			找到<thead>，找出他的位置，截圖，
			再看天數，將截圖放進i				每個next()，找出他的位置，扣掉最後一個不要截的child，截圖
			創個imageAll，寬度=thead寬度，高度的thead+i部截圖高度，
			按順序draw進去，
			encode成png，return
		*/

		await page.goto(url, {"waitUntil" : "networkidle0"});

		const thead=await page.$('thead');
		const rectHead=await page.evaluate(el=>{
			const {top, left, width, height}=el.getBoundingClientRect();
			return {top, left, width, height};
		}, thead);
		//console.log(rectHead);
		const imageBufferHead=await page.screenshot({
			clip: {
				x: rectHead.left,
				y: rectHead.top,
				width: rectHead.width,
				height: rectHead.height
			},
			type: "png"
		});

		let nowElement=thead;
		let imageBufferBodys=[];
		for(let i=0;i<days;i++){
			const tbody=await page.evaluateHandle(el=>el.nextElementSibling, nowElement);
			nowElement=tbody;
			const rectBody=await page.evaluate(el=>{
				const {top, left, width, height}=el.getBoundingClientRect();
				return {top, left, width, height};
			}, tbody);
			//console.log(rectBody);

			const lastTr=(await tbody.$$(':scope > tr:last-child'))[0];
			const rectBodyLastTr=await page.evaluate(el=>{
				const {top, left, width, height}=el.getBoundingClientRect();
				return {top, left, width, height};
			}, lastTr);
			//console.log(rectBodyLastTr);
			const imageBufferBody=await page.screenshot({
				clip: {
					x: rectBody.left,
					y: rectBody.top,
					width: rectBody.width,
					height: rectBody.height-rectBodyLastTr.height
				},
				type: "png"
			});
			imageBufferBodys.push(imageBufferBody);
		}

		let imageHead=images(imageBufferHead);
		let imageBodys=imageBufferBodys.map(imageBufferBody=>images(imageBufferBody));
		let imageAllHeight=imageHead.height();
		for(let i=0;i<days;i++){
			imageAllHeight+=imageBodys[i].height();
		}
		let imageAll=images(imageHead.width(), imageAllHeight);
		imageAll
		.draw(imageHead, 0, 0)
		for(let i=0;i<days;i++){
			imageAll
			.draw(imageBodys[i], 0, imageHead.height()+imageBodys[i].height()*i)
		}
		let imageAllBuffer=imageAll
		.encode("png");

		await page.close();
		return [imageAllBuffer];


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

		await page.close();
		return [imageBufferE];
	}
	catch(error){
		//免費server效能太差，windy太吃效能
		//最常見的執行超時30秒會跑來這
		if(typeof page!=="undefined"&&page.isClosed()===false){
			//剛開伺服器就跑指令，browser還沒開好page就會是undefined
			//要先檢查page還沒被關掉，再去關他才不會錯誤
			console.log("截圖失敗："+location+days);
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
