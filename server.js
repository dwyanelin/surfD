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
const live=require("./methods/live");
const store=require("./methods/store");
const kfc=require("./methods/kfc");

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
		echo=await tide(event.message.text);
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
		echo=live(event.message.text);
	}
	else if(event.message.text[0]==="店"||event.message.text[0].toUpperCase()==="S"){//連結店家官網、FB、IG
		////google評分class="Aq14fc"
		echo=store(event.message.text);
	}
	else if(event.message.text[0]==="肯"||event.message.text[0].toUpperCase()==="K"){//查KFC優惠券的內容價格日期跟圖片
		echo=await kfc(event.message.text);
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
