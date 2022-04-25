/*
client.replyMessage(event.replyToken, echo);
echo可以是單一個message object
也可以是message object array
*/

const tideDangerous=require("./modules/tideDangerous");
//const help=require("./modules/help");
const tide=require("./modules/tide");
const live=require("./modules/live");
const store=require("./modules/store");
const kfc=require("./modules/kfc");
const forecast=require("./modules/forecast");
const screenshot=require("./modules/screenshot");

//index.js
const line=require('@line/bot-sdk');
var express=require('express');

const config={
	channelAccessToken: process.env.channelAccessToken,
	channelSecret: process.env.channelSecret
};

//create LINE SDK client
const client=new line.Client(config);

//connecting-heroku-postgres
const {Client}=require('pg');

const clientPostgres=new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

const puppeteer=require('puppeteer');
let browser;

clientPostgres.connect();
//connecting-heroku-postgres

//create Express app
//about Express itself: <https://expressjs.com/>
const app=express();

//register a webhook handler with middleware
//about the middleware, please refer to doc
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

//event handler
async function handleEvent(event){
	if(event.type!=='message'||event.message.type!=='text'){
		//ignore non-text-message event
		return Promise.resolve(null);
	}

	let keyword;
	let echo;
	/*if(event.message.text.toUpperCase()==="HELP"||event.message.text==="使用教學"){
		echo=help;
	}
	else */if(event.message.text[0]==="預"||event.message.text[0].toUpperCase()==="F"){
		//查預報（forecast）+浪點名
		//三個系統的波浪預報截圖，或單一系統的高解析波浪預報截圖
		echo=await forecast(event.message.text, clientPostgres, browser);
	}
	else if(event.message.text[0]==="潮"||event.message.text[0].toUpperCase()==="T"){
		//查潮汐（tide）+浪點名
		echo=await tide(event.message.text);
	}
	else if(event.message.text[0]==="直"||event.message.text[0].toUpperCase()==="L"){
		//查直播（live）+浪點名
		echo=live(event.message.text);
	}
	else if(event.message.text[0]==="店"||event.message.text[0].toUpperCase()==="S"){
		//查店家店名、店圖、官網、地址、電話、email、line、IG、FB
		////考慮是否要crawl google真實評分，google頁面評分element的class="Aq14fc"
		echo=store(event.message.text);
	}
	else if(event.message.text.toUpperCase().includes("~TIDE")){
		//爽
		echo=tideDangerous;
	}
	else if(event.message.text[0]==="肯"||event.message.text[0].toUpperCase()==="K"){
		//查KFC優惠券的內容價格日期跟圖片（私人）
		echo=await kfc(event.message.text);
	}
	else{////記錄所有雜訊（用以提供新功能）
		return Promise.resolve(null);
	}

	console.log("===========================");
	console.log(typeof echo);
	console.log(echo);
	console.log("===========================");

	//use reply API
	if((echo.type==="text"&&echo.text!=="")||echo.type!=="text"){
		console.log("===========================");
		console.log("有進到reply");
		console.log("===========================");
		return client.replyMessage(event.replyToken, echo);
	}
}

//listen on port
const port=process.env.PORT||3000;
app.listen(port, async ()=>{
	console.log(`listening on ${port}`);
	browser=await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
});
