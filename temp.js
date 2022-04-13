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

const { ImgurClient } = require('imgur');
const client = new imgur({ clientId: "1f37d55e8774b46" });

const screenshot=require("./modules/screenshot");

(async ()=>{let echo=await screenshot("https://windy.com");

console.log(typeof echo);
console.log(echo);

// upload multiple images via fs.createReadStream (node)
const response = await client.upload({
  image: createReadStream(echo),
  type: 'stream',
});
response.data.forEach((r) => console.log(r.link));

})();
