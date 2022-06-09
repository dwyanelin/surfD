/*
client.replyMessage(event.replyToken, echo);
echo可以是單一個message object
也可以是message object array
*/

const help=require("./modules/help");
const about=require("./modules/about");

//ftsburl
const windy=require("./modules/windy");
const msw=require("./modules/msw");
const cwb=require("./modules/cwb");
const tide=require("./modules/tide");
const sun=require("./modules/sun");
const business=require("./modules/business");
const businessInformation=require("./modules/businessInformation");
const uv=require("./modules/uv");
const radar=require("./modules/radar");
const live=require("./modules/live");

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

const richMenuId='richmenu-126b9788deb92459b5e8df163d2273e7';

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
	else if(event.message.text[0]==="/"){//ftsburl
		if(event.message.text.toUpperCase()==="/A"){//ftsburl
			echo=[about.forecast, about.tide, about.sun, about.business];
		}
		else if(event.message.text.toUpperCase()==="/F"){
			echo=about.forecast;
		}
		else if(event.message.text.toUpperCase()==="/T"){
			echo=about.tide;
		}
		else if(event.message.text.toUpperCase()==="/S"){
			echo=about.sun;
		}
		else if(event.message.text.toUpperCase()==="/B"){
			echo=about.business;
		}
		else if(event.message.text.toUpperCase()==="/U"){
			echo=about.uv;
		}
		else if(event.message.text.toUpperCase()==="/R"){
			echo=about.radar;
		}
		else if(event.message.text.toUpperCase()==="/L"){
			echo=about.live;
		}
		else if(event.message.text.toUpperCase()==="/O"){//url
			echo=[about.uv, about.radar, about.live];
		}
		else{
			return Promise.resolve(null);
		}
	}
	else if(event.message.text[0]==="預"||event.message.text[0].toUpperCase()==="W"){//windy
		//預報（windy）+浪點名+F, A, E, G, I
		//先reply ecmwf小截圖，另可指定三個系統的小截圖，或單一系統的大截圖
		echo=await windy(event.message.text, clientPostgres, browser);
	}
	else if(event.message.text[0].toUpperCase()==="M"){//msw
		//預報（msw）+浪點名+天數
		//按天數reply幾個預報table，合在一張圖
		echo=await msw(event.message.text, clientPostgres, browser);
	}////還要做個MSW api版本
	else if(event.message.text[0].toUpperCase()==="C"){//central weather bureau
		//預報（cwb）+浪點名
		//天氣+浪況合在一張圖（天氣、風級、風向、浪週期、浪高、浪向、流速、流向等等..）
		echo=await cwb(event.message.text, clientPostgres, browser);
	}
	else if(event.message.text[0]==="阿"||event.message.text[0].toUpperCase()==="A"){
		////加入瑪神預報
		return Promise.resolve(null);
	}
	else if(event.message.text[0]==="潮"||event.message.text[0].toUpperCase()==="T"){
		//查潮汐（tide）+浪點名+天數（最多31）
		//滿乾、時間、潮高
		echo=await tide(event.message.text);
	}
	else if(event.message.text[0]==="日"||event.message.text[0].toUpperCase()==="S"){
		//開燈關燈時間sunrise sunset（日出、日落）
		echo=await sun(event.message.text, browser);
	}
	else if(event.message.text[0]==="店"||event.message.text[0].toUpperCase()==="B"){
		//查店家店名、店圖、官網、地址、電話、email、line、IG、FB
		////1.新增雙獅或想加的知名店家
		if(event.message.text.includes("列表")||event.message.text.toUpperCase().includes("LIST")){
			echo={"type": "text", "text": "店家列表：\n"+Object.keys(businessInformation).join("、\n")};
		}
		else{
			echo=business(event.message.text);
		}
	}
	else if(event.message.text[0]==="紫"||event.message.text[0].toUpperCase()==="U"){//紫外線圖
		echo=uv;
	}
	else if(event.message.text[0]==="雷"||event.message.text[0].toUpperCase()==="R"){//雷達回波圖
		echo=radar;
	}
	else if(event.message.text[0]==="直"||event.message.text[0].toUpperCase()==="L"){
		//查直播（live）+浪點名
		echo=live(event.message.text);
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
