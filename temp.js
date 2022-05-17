const axios=require('axios');
const cheerio=require('cheerio');

const options={
	headers: {
		'accept-language': ' zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		'user-agent': ' Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
	}
};

/*(async ()=>{
	let res=await axios.get("https://kfc.izo.tw/coupons/"+"22583", options);
		const $=cheerio.load(res.data);
		let content=$(".card-text.mb-3").text().trim();
			let price=$(".mx-2")[0].children[0].data.trim();
			let date=$(".text-muted")[0].children[0].data.trim();
			let image=$(".card-img-bottom")[0].attribs["data-src"];
			console.log("===========================");
			console.log({content, price, date, image});
			console.log("===========================");
})();*/

/*const msw=require("./modules/msw");

(async ()=>{
	let echo=await msw("m雙獅");

	console.log(typeof echo);
	console.log(echo);
})();*/

//開chrome
const puppeteer=require('puppeteer');
(async ()=>{
	let browser=await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	let page=await browser.newPage();
	await page.goto("https://magicseaweed.com/Wushi-Surf-Report/844/", {"waitUntil" : "networkidle0"});
	const thead=await page.$('thead');
	const tbody=await page.evaluateHandle(el => el.nextElementSibling, thead);
	let rect=await page.evaluate(el=>{
		const {top, left, width, height}=el.getBoundingClientRect();
		return {top, left, width, height};
	}, tbody);
	console.log(rect);
	await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      window.scrollBy(0, rect.top);
      resolve();
    });
  });
	const imageBuffer=await page.screenshot({
		fullPage: true,
		//type: "png",
		path: "./screenshot.png"
	});
	//console.log(await (await prev.getProperty('innerText')).jsonValue());
})();
//開chrome
