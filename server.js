const axios=require('axios');
const cheerio=require('cheerio');

const options={
	headers: {
		'accept-language': ' zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		'user-agent': ' Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
	}
}

import tideDangerous from "tideDangerous";

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
		echo={
			"type":"text",
			"text":"第一個字打T(Tide)或潮(潮汐)，後面接浪點，即可查詢浪點潮汐。\n第一個字打F(Forecast)或預(預報)，後面接浪點，即可查詢浪點預報。\n第一個字打L(Live)或直播(直播)，後面接浪點，即可查詢浪點直播。\n第一個字打S(Store)或店(店家)，後面接店名，即可查詢店家資訊。"
		};
	}
	else if(event.message.text.toUpperCase().includes("~TIDE")){
		echo=tideDangerous;
	}
	else if(event.message.text[0]==="潮"||event.message.text[0].toUpperCase()==="T"){//查潮汐（tide）+浪點名，預設雙獅
		////還要加多天查詢
		keyword=event.message.text.replace("潮", "");
		keyword=event.message.text.replace("T", "").replace("t", "");
		let url;
		if(keyword.includes("頭城")||keyword.includes("臭水")||keyword.includes("南堤")||keyword.includes("烏石")||keyword.includes("北堤")||keyword.includes("外澳")||keyword.includes("雙獅")||keyword.includes("梗枋")||keyword.includes("蜜月")||keyword.includes("大溪")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000204.html";
		}
		else if(keyword.includes("南澳")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000212.html";
		}
		else if(keyword.includes("蘇澳")||keyword.includes("無尾")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000203.html";
		}
		else if(keyword.includes("貢寮")||keyword.includes("福隆")||keyword.includes("金沙")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500026.html";
		}
		else if(keyword.includes("萬里")||keyword.includes("翡翠")||keyword.includes("龜吼")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500028.html";
		}
		else if(keyword.includes("金山")||keyword.includes("中角")||keyword.includes("磺港")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500027.html";
		}
		else if(keyword.includes("石門")||keyword.includes("餐廳")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500022.html";
		}
		else if(keyword.includes("花蓮")||keyword.includes("環保")||keyword.includes("北濱")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001501.html";
		}
		else if(keyword.includes("壽豐")||keyword.includes("雙橋")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001506.html";
		}
		else if(keyword.includes("豐濱")||keyword.includes("磯崎")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001508.html";
		}
		else if(keyword.includes("長濱")||keyword.includes("八仙洞")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001408.html";
		}
		else if(keyword.includes("成功")||keyword.includes("宜灣")||keyword.includes("基翬")||keyword.includes("都歷")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001402.html";
		}
		else if(keyword.includes("東河")||keyword.includes("河口")||keyword.includes("金樽")||keyword.includes("小漁港")||keyword.includes("都蘭")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001407.html";
		}
		else if(keyword.includes("恆春")||keyword.includes("佳樂水")||keyword.includes("大灣")||keyword.includes("南灣")||keyword.includes("港仔")||keyword.includes("獅頭")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001304.html";
		}
		else if(keyword.includes("旗津")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T401000.html";
		}
		else if(keyword.includes("安平")||keyword.includes("漁光島")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T700036.html";
		}
		else if(keyword.includes("大甲")||keyword.includes("松柏港")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T600011.html";
		}
		else if(keyword.includes("後龍")||keyword.includes("外埔")){
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000506.html";
		}
		else{
			url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000204.html";
		}
/*
頭城https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000204.html
臭水、南堤、烏石港、北堤、外澳、雙獅、梗枋、蜜月灣、大溪
南澳https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000212.html
蘇澳https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000203.html
無尾
貢寮https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500026.html
福隆、金沙灣
萬里https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500028.html
翡翠灣、龜吼
金山https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500027.html
中角、磺港
石門https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500022.html
餐廳
花蓮https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001501.html
環保、北濱
壽豐https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001506.html
雙橋
豐濱https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001508.html
磯崎
長濱https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001408.html
八仙洞、
成功https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001402.html
宜灣、基翬、都歷
東河https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001407.html
北東河、河口、南東河、金樽左、金樽、小漁港、都蘭
恆春https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001304.html
佳樂水、大灣、南灣、港仔、獅頭、
旗津https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T401000.html
安平https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T700036.html
漁光島
大甲https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T600011.html
松柏港
後龍https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000506.html
外埔
*/

		//漲退潮時間
		let res=await axios.get(url, options);
		const $=cheerio.load(res.data);
		let tides=$("td[headers=\"day1 tide\"]");
		let times=$("td[headers=\"day1 time\"]");

		//地點
		let title=$("h2[class=\"text-center\"]");
		let titles=title.text().split(" ");
		titles=titles.slice(0, 2);
		let locationName=titles.join(" ");

		//潮差
		let tideDifference=$($(".orange-text").get(0)).text();

		let text=locationName+"\n"+tideDifference+"\n"+$(tides.get(0)).text()+" "+$(times.get(0)).text()+"\n"+$(tides.get(1)).text()+" "+$(times.get(1)).text()+"\n"+$(tides.get(2)).text()+" "+$(times.get(2)).text()+"\n"+$(tides.get(3)).text()+" "+$(times.get(3)).text();

		echo={"type":"text", "text":text, "wrap":true};
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
