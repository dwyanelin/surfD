const axios=require('axios');
const options={
	headers: {
		'accept-language': ' zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		'user-agent': ' Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
	}
}
const cheerio=require('cheerio');

module.exports=async (keyword)=>{
	keyword=keyword.replace("肯", "");
	keyword=keyword.replace("K", "").replace("k", "");
	return await axios.get("https://kfc.izo.tw/coupons/"+keyword, options)
	.then((res)=>{
		//內容、價格、日期跟圖片
		const $=cheerio.load(res.data);
		let content=$(".card-text.mb-3").text().trim();
		let price=$(".mx-2")[0].children[0].data.trim();
		let date=$(".text-muted")[0].children[0].data.trim();
		let image=$(".card-img-bottom")[0].attribs["data-src"];
		/*console.log("===========================");
		console.log({content, price, date, image});
		console.log("===========================");*/
		//title=keyword(編號, bold)+price
		//image
		//content
		//date

		return {
			"type": "flex",
			"altText": keyword,
			"contents": {
				"type": "bubble",
				"header": {
					"type": "box",
					"layout": "horizontal",
					"contents": [{
						"type": "text",
						"text": keyword,
						"weight": "bold"
					},
					{
						"type": "text",
						"text": " "
					},
					{
						"type": "text",
						"text": price
					}]
				},
				hero: {
					"type": "image",
					"url": image,
					"size": "full",
					"aspectRatio": "2:1"
				},
				body: {
					"type": "box",
					"layout": "vertical",
					"contents": [{
						"type": "text",
						"text": content,
						"wrap": true
					},
					{
						"type": "text",
						"text": date
					}]
				}
			}
		};
	})
	.catch(err => console.log(err));
}