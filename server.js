const axios = require('axios');

// index.js
const line=require('@line/bot-sdk');
var express=require('express');
const config={
	channelAccessToken: 'mRylXzlEWz1SF/zZi2j5S6xfDXFXq66FSAXVRUCti7ljR0Ofm2bg33/CGk5UfQN8AnUx7hFY/v04p3wsl09egyN5p4jlxikPkYq/kp5uAHwSzZ98NeE72fFA9oL3bxxDi/JgVwX09gClqzO86YT9OAdB04t89/1O/w1cDnyilFU=',
	channelSecret: '9ad6181f07656cecde7ed27546281b37'
};

// create LINE SDK client
const client=new line.Client(config);

// create Express app
// about Express itself: <https://expressjs.com/>
const app=express();
const puppeteer = require('puppeteer');

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res)=>{
	console.log(req, res);
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
	if(event.message.text.includes("===")){//查辭典
		keyword=event.message.text.replace("===", "");
		// create a echoing text message
		echo=await axios
		.post('https://www.feature-mw.com/consult/searchExactFromChromeExtension2', {
			keyword,
		})
		.then(res => {
			console.log("===========================");
			console.log(typeof res.data);
			console.log(res.data);
			console.log("===========================");
			if(res.data.cht.length>0){
				//將不重複的中文串起來
				return {type: 'text', text: res.data.cht.join(", ")};
			}
			else{
				return {type: 'text', text: ""};
			}
		})
		.catch(error => {
			console.error(error)
		});
	}
	else if(event.message.text.includes("+++")){//查icd
		//4
		keyword=event.message.text.replace("+++", "");
	}
	else if(event.message.text.includes("~潮汐")||event.message.text.toUpperCase().includes("~TIDE")){//查潮汐（tide）+浪點名，預設雙獅
		//3
		keyword=event.message.text.replace("~潮汐", "");
		keyword=event.message.text.replace("~TIDE", "");
	}
	else if(event.message.text.includes("~預報")||event.message.text.toUpperCase().includes("~WINDY")){//查預報（三個系統的現在氣象圖、風力、風向、兩種浪高（都截圖？））+浪點名，預設雙獅
		//1
		keyword=event.message.text.replace("~預報", "");
		keyword=event.message.text.replace("~WINDY", "");
		const browser = await puppeteer.launch({
			headless: true,
      args: ['--no-sandbox','--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto("https://www.windy.com/");
    const image = await page.screenshot({
    	fullPage : true,
    	type:"png",
    	path: "./screenshot.png",
    });
		console.log("===========================");
    console.log(image);
		console.log("===========================");
    await browser.close();
    echo={
    	type: 'image',
    	originalContentUrl: "./screenshot.png",
      previewImageUrl: "./screenshot.png",
    };
    /*response.set('Content-Type', 'image/png');
    response.send(image);*/
	}
	else if(event.message.text.includes("~店家")){//連結店家官網、FB、IG
		keyword=event.message.text.replace("~店家", "");
		return Promise.resolve(null);
	}
	else if(event.message.text.includes("~KFC")){//查KFC優惠券的內容價格日期跟圖片
		//2
		keyword=event.message.text.replace("~KFC", "");
	}
	else{
		return Promise.resolve(null);
	}

	console.log("===========================");
	console.log(typeof echo);
	console.log(echo);
	console.log("===========================");

	// use reply API
	if(echo.text!==""||echo.type==="image"){
		return client.replyMessage(event.replyToken, echo);
	}
}

// listen on port
const port=process.env.PORT||3000;
app.listen(port, ()=>{
	console.log(`listening on ${port}`);
});
