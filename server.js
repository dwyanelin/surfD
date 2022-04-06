const axios=require('axios');
const cheerio=require('cheerio');

const options={
	headers: {
		'accept-language': ' zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		'user-agent': ' Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
	}
}

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
		echo={"type":"text", "text":"正在做"};
	}
	else if(event.message.text.toUpperCase().includes("~TIDE")){
		echo={"type":"text", "text":"這樣tide危險～"};
	}
	else if(event.message.text[0]==="潮"||event.message.text.toUpperCase()[0]==="T"){//查潮汐（tide）+浪點名，預設雙獅
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
	else if(event.message.text.includes("~預報")||event.message.text.toUpperCase().includes("~WINDY")){//查預報（三個系統的現在氣象圖、風力、風向、兩種浪高（都截圖？））+浪點名，預設雙獅
		//1
		keyword=event.message.text.replace("~預報", "");
		keyword=event.message.text.replace("~WINDY", "");
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
	else if(event.message.text.includes("~店家")){//連結店家官網、FB、IG
		keyword=event.message.text.replace("~店家", "");
		return Promise.resolve(null);
	}
	else if(event.message.text.toUpperCase()[0]==="K"){//查KFC優惠券的內容價格日期跟圖片
		//2
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
