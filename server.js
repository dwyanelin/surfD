const axios=require('axios');
const cheerio=require('cheerio');

const options={
	headers: {
		'accept-language': ' zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		'user-agent': ' Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
	}
}

const tideDangerous=require("./methods/tideDangerous");
const help=require("./methods/help");
const tide=require("./methods/tide");

// index.js
const line=require('@line/bot-sdk');
var express=require('express');

const config={
	channelAccessToken: process.env.channelAccessToken,
	channelSecret: process.env.channelSecret
};

// create LINE SDK client
const client=new line.Client(config);

// create Express app
// about Express itself: <https://expressjs.com/>
const app=express();
const puppeteer=require('puppeteer');

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res)=>{
	//console.log(req, res);
	Promise
	.all(req.body.events.map(handleEvent))
	.then((result)=>res.json(result))
	.catch((err)=>{
		console.error(err);
		res.status(500).end();
	});
});

// event handler
async function handleEvent(event){
	if(event.type!=='message'||event.message.type!=='text'){
		// ignore non-text-message event
		return Promise.resolve(null);
	}

	let keyword;
	let echo;
	if(event.message.text.toUpperCase()==="HELP"||event.message.text==="使用教學"){
		echo=help;
	}
	else if(event.message.text.toUpperCase().includes("~TIDE")){
		echo=tideDangerous;
	}
	else if(event.message.text[0]==="潮"||event.message.text[0].toUpperCase()==="T"){//查潮汐（tide）+浪點名，預設雙獅
		////還要加多天查詢
		echo=tide(keyword);
	}
	else if(event.message.text[0]==="預"||event.message.text[0].toUpperCase()==="F"){//查預報（三個系統的現在氣象圖、風力、風向、兩種浪高（都截圖？））+浪點名，預設雙獅
		//1
		keyword=event.message.text.replace("預", "");
		keyword=event.message.text.replace("F", "").replace("f", "");
		const browser=await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox','--disable-setuid-sandbox']
		});
		const page=await browser.newPage();
		await page.goto("https://www.windy.com/");
		const image=await page.screenshot({
			fullPage : true,
			type:"png",
			path: __dirname+"/screenshot.png",
		});
		console.log("===========================");
		console.log(__dirname+"/screenshot.png");
		console.log(image);
		console.log("===========================");
		await browser.close();
		echo={
			type: 'image',
			originalContentUrl: "https://pbs.twimg.com/media/DfkhrO1XUAEYkdw.jpg",
			previewImageUrl: "https://pbs.twimg.com/media/DfkhrO1XUAEYkdw.jpg",
		};
		/*response.set('Content-Type', 'image/png');
		response.send(image);*/
	}
	else if(event.message.text[0]==="直"||event.message.text[0].toUpperCase()==="L"){
		keyword=event.message.text.replace("直", "");
		keyword=event.message.text.replace("L", "").replace("l", "");
		if(keyword.includes("金樽")){
			echo={"type":"text", "text":"https://www.youtube.com/watch?v=q3KJt-SZc2s"};
		}
		else if(keyword.includes("多良")){
			echo={"type":"text", "text":"https://www.youtube.com/watch?v=UCG1aXVO8H8"};
		}
		else if(keyword.includes("天堂路")){
			echo={"type":"text", "text":"https://www.youtube.com/watch?v=WA7GEXVGAP0"};
		}
		else if(keyword.includes("杉原")){
			echo={"type":"text", "text":"https://www.youtube.com/watch?v=VqS_Y8ZCj6M"};
		}
		else if(keyword.includes("富山")){
			echo={"type":"text", "text":"https://www.youtube.com/watch?v=Rsq95SQ26bY"};
		}
		else if(keyword.includes("南灣")){
			echo={"type":"text", "text":"https://www.youtube.com/watch?v=HRTtPjFsE9s"};
		}
		else if(keyword.includes("萬里桐")){
			echo={"type":"text", "text":"https://www.youtube.com/watch?v=xy_KZDsRYTU"};
		}
		else{
			echo={"type":"text", "text":"https://swelleye.com/pro/"};
		}
	}
	else if(event.message.text.includes("店")||event.message.text[0].toUpperCase()==="S"){//連結店家官網、FB、IG
		keyword=event.message.text.replace("店", "");
		keyword=event.message.text.replace("S", "").replace("s", "");
		//google評分class="Aq14fc"
		if(keyword.includes("namiaru")){
			echo={
				"type": "flex",
				"altText": "namiarusurfstudio",
				"contents": {
					"type": "bubble",
					"hero": {
						"type": "image",
						"url": "https://namiaru.yibnb.com/images/bg.jpg",
						"size": "full",
						"aspectRatio": "20:13",
						"aspectMode": "cover",
						"action": {
							"type": "uri",
							"uri": "https://namiaru.yibnb.com/"
						}
					},
					"body": {
						"type": "box",
						"layout": "vertical",
						"contents": [
							{
								"type": "text",
								"text": "namiarusurfstudio",
								"weight": "bold",
								"size": "xl"
							},
							{
								"type": "box",
								"layout": "baseline",
								"margin": "md",
								"contents": [
									{
										"type": "icon",
										"size": "sm",
										"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
									},
									{
										"type": "icon",
										"size": "sm",
										"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
									},
									{
										"type": "icon",
										"size": "sm",
										"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
									},
									{
										"type": "icon",
										"size": "sm",
										"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
									},
									{
										"type": "icon",
										"size": "sm",
										"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
									},
									{
										"type": "text",
										"text": "4.6",
										"size": "sm",
										"color": "#999999",
										"margin": "md",
										"flex": 0
									}
								]
							},
							{
								"type": "box",
								"layout": "vertical",
								"margin": "lg",
								"spacing": "sm",
								"contents": [
									{
										"type": "box",
										"layout": "baseline",
										"spacing": "sm",
										"contents": [
											{
												"type": "text",
												"text": "地址",
												"color": "#aaaaaa",
												"size": "sm",
												"flex": 1
											},
											{
												"type": "text",
												"text": "宜蘭縣頭城鎮環鎮東路二段668巷",
												"wrap": true,
												"color": "#666666",
												"size": "sm",
												"flex": 5
											}
										]
									},
									{
										"type": "box",
										"layout": "baseline",
										"spacing": "sm",
										"contents": [
											{
												"type": "text",
												"text": "電話",
												"color": "#aaaaaa",
												"size": "sm",
												"flex": 1
											},
											{
												"type": "text",
												"text": "0968-369853",
												"wrap": true,
												"color": "#666666",
												"size": "sm",
												"flex": 5
											}
										]
									},
									{
										"type": "box",
										"layout": "baseline",
										"spacing": "sm",
										"contents": [
											{
												"type": "text",
												"text": "信箱",
												"color": "#aaaaaa",
												"size": "sm",
												"flex": 1
											},
											{
												"type": "text",
												"text": "namiarusurfstudio@gmail.com",
												"wrap": true,
												"color": "#666666",
												"size": "sm",
												"flex": 5
											}
										]
									}
								]
							}
						]
					},
					"footer": {
						"type": "box",
						"layout": "vertical",
						"spacing": "sm",
						"contents": [
							{
								"type": "button",
								"style": "link",
								"height": "sm",
								"action": {
									"type": "uri",
									"label": "Line",
									"uri": "https://line.me/R/ti/p/%40420msvqa"
								}
							},
							{
								"type": "button",
								"style": "link",
								"height": "sm",
								"action": {
									"type": "uri",
									"label": "Instagram",
									"uri": "https://www.instagram.com/namiarusurfstudio/"
								}
							},
							{
								"type": "button",
								"style": "link",
								"height": "sm",
								"action": {
									"type": "uri",
									"label": "Facebook",
									"uri": "https://www.facebook.com/808387692583232"
								}
							}
						]
					}
				}
			};
		}
		else if(keyword.includes("一間")||keyword.includes("有間")){
			echo={
				"type": "flex",
				"altText": "一間衝浪店",
				"contents": {
					"type": "bubble",
					"hero": {
						"type": "image",
						"url": "https://scontent.ftpe8-1.fna.fbcdn.net/v/t39.30808-6/275676027_5418329274922361_5012254170367866697_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=a26aad&_nc_ohc=HAhkSQGKLZAAX9aqdRM&_nc_ht=scontent.ftpe8-1.fna&oh=00_AT9K_K5kpGPUvwtwAhXBlPigf3nWdEvSeZZOWt4BK6zadw&oe=6253F466",
						"size": "full",
						"aspectRatio": "20:13",
						"aspectMode": "cover",
						"action": {
							"type": "uri",
							"uri": "https://www.facebook.com/aloha.hisurf/"
						}
					},
					"body": {
						"type": "box",
						"layout": "vertical",
						"contents": [
							{
								"type": "text",
								"text": "一間衝浪店",
								"weight": "bold",
								"size": "xl"
							},
							{
								"type": "box",
								"layout": "baseline",
								"margin": "md",
								"contents": [
									{
										"type": "icon",
										"size": "sm",
										"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
									},
									{
										"type": "icon",
										"size": "sm",
										"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
									},
									{
										"type": "icon",
										"size": "sm",
										"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
									},
									{
										"type": "icon",
										"size": "sm",
										"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
									},
									{
										"type": "icon",
										"size": "sm",
										"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
									},
									{
										"type": "text",
										"text": "4.4",
										"size": "sm",
										"color": "#999999",
										"margin": "md",
										"flex": 0
									}
								]
							},
							{
								"type": "box",
								"layout": "vertical",
								"margin": "lg",
								"spacing": "sm",
								"contents": [
									{
										"type": "box",
										"layout": "baseline",
										"spacing": "sm",
										"contents": [
											{
												"type": "text",
												"text": "地址",
												"color": "#aaaaaa",
												"size": "sm",
												"flex": 1
											},
											{
												"type": "text",
												"text": "宜蘭縣頭城鎮濱海路二段332巷29-1號",
												"wrap": true,
												"color": "#666666",
												"size": "sm",
												"flex": 5
											}
										]
									},
									{
										"type": "box",
										"layout": "baseline",
										"spacing": "sm",
										"contents": [
											{
												"type": "text",
												"text": "電話",
												"color": "#aaaaaa",
												"size": "sm",
												"flex": 1
											},
											{
												"type": "text",
												"text": "03 977 7517",
												"wrap": true,
												"color": "#666666",
												"size": "sm",
												"flex": 5
											}
										]
									},
									{
										"type": "box",
										"layout": "baseline",
										"spacing": "sm",
										"contents": [
											{
												"type": "text",
												"text": "信箱",
												"color": "#aaaaaa",
												"size": "sm",
												"flex": 1
											},
											{
												"type": "text",
												"text": "namiarusurfstudio@gmail.com",
												"wrap": true,
												"color": "#666666",
												"size": "sm",
												"flex": 5
											}
										]
									}
								]
							}
						]
					},
					"footer": {
						"type": "box",
						"layout": "vertical",
						"spacing": "sm",
						"contents": [
							{
								"type": "button",
								"style": "link",
								"height": "sm",
								"action": {
									"type": "uri",
									"label": "Line",
									"uri": "https://line.me/R/ti/p/%40420msvqa"
								}
							},
							{
								"type": "button",
								"style": "link",
								"height": "sm",
								"action": {
									"type": "uri",
									"label": "Instagram",
									"uri": "https://www.instagram.com/namiarusurfstudio/"
								}
							},
							{
								"type": "button",
								"style": "link",
								"height": "sm",
								"action": {
									"type": "uri",
									"label": "Facebook",
									"uri": "https://www.facebook.com/aloha.hisurf/"
								}
							}
						]
					}
				}
			};
		}
	}
	else if(event.message.text.toUpperCase()[0]==="K"){//查KFC優惠券的內容價格日期跟圖片
		keyword=event.message.text.toUpperCase().replace("K", "").replace("k", "");
		console.log("===========================");
		console.log(keyword);
		console.log("===========================");
		echo=await axios.get("https://kfc.izo.tw/coupons/"+keyword, options)
		.then((res) => {
			//內容、價格、日期跟圖片
			const $=cheerio.load(res.data);
			let content=$(".card-text.mb-3").text().trim();
			let price=$(".mx-2")[0].children[0].data.trim();
			let date=$(".text-muted")[0].children[0].data.trim();
			let image=$(".card-img-bottom")[0].attribs["data-src"];
			console.log("===========================");
			console.log({content, price, date, image});
			console.log("===========================");
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
	else{////記錄所有雜訊
		return Promise.resolve(null);
	}

	console.log("===========================");
	console.log(typeof echo);
	console.log(echo);
	console.log("===========================");

	// use reply API
	if((echo.type==="text"&&echo.text!=="")||echo.type!=="text"){
		console.log("===========================");
		console.log("有進到reply");
		console.log("===========================");
		return client.replyMessage(event.replyToken, echo);
	}
}

// listen on port
const port=process.env.PORT||3000;
app.listen(port, ()=>{
	console.log(`listening on ${port}`);
});
