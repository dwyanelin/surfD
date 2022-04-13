const tideDangerous=require("./modules/tideDangerous");
const help=require("./modules/help");
const tide=require("./modules/tide");
const live=require("./modules/live");
const store=require("./modules/store");
const kfc=require("./modules/kfc");
const forecast=require("./modules/forecast");
const screenshot=require("./modules/screenshot");

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
		echo=await tide(event.message.text);
	}
	else if(event.message.text[0]==="預"||event.message.text[0].toUpperCase()==="F"){//查預報（三個系統的現在氣象圖、風力、風向、兩種浪高（都截圖？））+浪點名，預設雙獅
		echo=forecast;
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

app.get('/screenshot', (req, res)=>{
	const url=req.query.url;
	(async ()=>{
		const buffer=await screenshot(url);
		res.setHeader('Content-Disposition', 'attachment; filename="screenshot.png"');
		res.setHeader('Content-Type', 'image/png');
		//res.send(buffer);
	})();
})

// listen on port
const port=process.env.PORT||3000;
app.listen(port, ()=>{
	console.log(`listening on ${port}`);
});
