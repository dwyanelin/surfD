/*
client.replyMessage(event.replyToken, echo);
echo可以是單一個message object
也可以是message object array
*/

const help=require("./modules/help");
const about=require("./modules/about");
const windy=require("./modules/windy");
const msw=require("./modules/msw");
const tide=require("./modules/tide");
const live=require("./modules/live");
const sun=require("./modules/sun");
const store=require("./modules/store");
const uv=require("./modules/uv");
const radar=require("./modules/radar");
const tideDangerous=require("./modules/tideDangerous");
const kfc=require("./modules/kfc");

//create LINE SDK client and richmenu
const line=require('@line/bot-sdk');
const config={
	channelAccessToken: process.env.channelAccessToken,
	channelSecret: process.env.channelSecret
};
const client=new line.Client(config);
//Step1: create your image for richmenu
//Step2: create richmenu object
//Step3-1: createRichMenu and get richMenuId
/*const richmenu=require("./modules/richmenu");
client.createRichMenu(richmenu)
.then(richMenuId=>{
	console.log("richMenuId: "+richMenuId)
})
.catch(err=>console.error(err));*/

const richMenuId='richmenu-a0baad6e6f8827b6d3b7a67e9959a6d9';

//Step3-2: setRichMenuImage: upload image for RichMenu
/*const fs=require('fs');
client.setRichMenuImage(richMenuId, fs.createReadStream('./images/richmenu.jpg'))
.then(res=>console.log(res));*/

//Step4: display to "all" users
client.setDefaultRichMenu(richMenuId);
//create LINE SDK client and richmenu

//connecting-heroku-postgres
const {Client}=require('pg');

const clientPostgres=new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});
clientPostgres.connect();
//connecting-heroku-postgres

//開chrome
const puppeteer=require('puppeteer');
let browser;
(async ()=>browser=await puppeteer.launch({
	headless: true,
	args: ['--no-sandbox', '--disable-setuid-sandbox']
}))();
//開chrome

//create Express app
//about Express itself: <https://expressjs.com/>
var express=require('express');
const app=express();
//create Express app

//register a webhook handler with middleware
//about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res)=>{
	//console.log(req, res);
	Promise
	.all(req.body.events.map(handleEvent))
	.then(result=>res.json(result))
	.catch(error=>{
		console.error(error);
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
	if(event.message.text.toUpperCase()==="HELP"||event.message.text==="使用教學"){
		echo=help;
	}
	else if(event.message.text[0]==="/"){
		if(event.message.text.toUpperCase()==="/F"){
			echo=about.forecast;
		}
		else if(event.message.text.toUpperCase()==="/T"){
			echo=about.tide;
		}
		else if(event.message.text.toUpperCase()==="/L"){
			echo=about.live;
		}
		else if(event.message.text.toUpperCase()==="/S"){
			////修改收取店家資訊email
			echo=about.store;
		}
		else{
			return Promise.resolve(null);
		}
	}
	else if(event.message.text[0]==="預"||event.message.text[0].toUpperCase()==="W"){
		//查預報（windy）+浪點名
		//先reply ecmwf小截圖，另可指定三個系統的小截圖，或單一系統的大截圖
		//字串尾加：F, A, E, G, I
		echo=await windy(event.message.text, clientPostgres, browser);
	}
	else if(event.message.text[0]==="潮"||event.message.text[0].toUpperCase()==="T"){
		//查潮汐（tide）+浪點名
		//可指定查詢天數，最多31
		//字串尾加：天數
		echo=await tide(event.message.text);
	}
	else if(event.message.text[0]==="直"||event.message.text[0].toUpperCase()==="L"){
		//查直播（live）+浪點名
		echo=live(event.message.text);
	}
	else if(event.message.text.slice(0, 3).toUpperCase()==="SUN"){
		////開燈關燈時間sunrise sunset（日出、日落）
		echo=await sun(event.message.text, browser);
	}
	else if(event.message.text[0]==="店"||event.message.text[0].toUpperCase()==="S"){
		//查店家店名、店圖、官網、地址、電話、email、line、IG、FB
		echo=store(event.message.text);
	}
	else if(event.message.text.toUpperCase().includes("~TIDE")){
		//爽
		echo=tideDangerous;
	}
	else if(event.message.text[0].toUpperCase()==="M"){//MSW預報
		echo=await msw(event.message.text, clientPostgres, browser);
	}////還要做個MSW api版本
	////加入瑪神預報
	/*////1.
	中央氣象局海象預報
	https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O004
	風級、風向、浪週期、浪高、浪向、流速、流向、
	*/
	////中央氣象局的浪況預報也用截圖的
	else if(event.message.text.slice(0, 2).toUpperCase()==="UV"){//紫外線圖
		echo=uv;
	}
	else if(event.message.text[0]==="雷"||event.message.text[0].toUpperCase()==="R"){//雷達回波圖
		echo=radar;
	}
	else if(event.message.text[0]==="肯"||event.message.text[0].toUpperCase()==="K"){
		//查KFC優惠券的內容價格日期跟圖片（私人）
		echo=await kfc(event.message.text);
	}
	else{////記錄所有雜訊（用以提供新功能）
		return Promise.resolve(null);
	}

	console.log(typeof echo);
	console.log(echo);
	console.log("===========================");

	//use reply API
	if((echo.type==="text"&&echo.text!=="")||echo.type!=="text"){
		console.log("有進到reply");
		console.log("===========================");
		return client.replyMessage(event.replyToken, echo);
	}
}

//listen on port
const port=process.env.PORT||3000;
app.listen(port, async ()=>{
	console.log(`listening on ${port}`);
});
