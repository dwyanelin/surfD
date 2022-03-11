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
function handleEvent(event){
	if(event.type!=='message'||event.message.type!=='text'){
		// ignore non-text-message event
		return Promise.resolve(null);
	}

	// create a echoing text message
	//const echo={type: 'text', text: event.message.text};
	let echo=axios
	.post('https://www.feature-mw.com/consult/searchExactFromChromeExtension2', {
		keyword: event.message.text,
	})
	.then(res => {
		console.log("===========================");
		console.log(typeof res.data);
		console.log(res.data);
		console.log("===========================");
		if(res.data.cht.length>0){
			//將不重複的中文串起來
			return res.cht.join(", ");
		}
		else{
			return "";
		}
	})
	.catch(error => {
		console.error(error)
	});

	/*let echo=fetch('https://www.feature-mw.com/consult/searchExactFromChromeExtension2', {
		method:'POST', //or 'PUT'
		body:JSON.stringify({keyword:event.message.text}), //data can be `string` or {object}!
		headers:new Headers({
			'Content-Type':'application/json'
		})
	}).then(res=>res.json())
	.catch(error=>console.error('Error:', error))
	.then(res=>{
		//console.log('Success:', res);
		//秀cht或縮寫或全寫cht
		if(res.cht.length>0){
			//將不重複的中文串起來
			return res.cht.join(", ");
		}
		else{
			return "";
		}
	});*/

	// use reply API
	if(echo!==""){
		return client.replyMessage(event.replyToken, echo);
	}
}

// listen on port
const port=process.env.PORT||3000;
app.listen(port, ()=>{
	console.log(`listening on ${port}`);
});
