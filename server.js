const axios = require('axios');
const cheerio = require('cheerio');

const options = {
	headers: {
		'accept-language': ' zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		'user-agent': ' Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
	}
}

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
	else if(event.message.text.toUpperCase().includes("~KFC")){//查KFC優惠券的內容價格日期跟圖片
		//2
		keyword=event.message.text.toUpperCase().replace("~KFC", "");
		console.log("===========================");
		console.log(keyword);
		console.log("===========================");
		echo=await axios.get("https://kfc.izo.tw/coupons/"+keyword, options)
		.then((res) => {
			//內容、價格、日期跟圖片
			const $ = cheerio.load(res.data);
			let content=$(".card-text")[0].children[0].data.trim();
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
				type: 'image',
				originalContentUrl: image,
				previewImageUrl: image,
			};
			/*return {
				type: "bubble",
				header: {
					type: "box",
					layout: "horizontal",
					contents: [{
						type: "text",
						text: keyword,
						weight: "bold",
					},
					{
						type: "text",
						text: " ",
					},
					{
						type: "text",
						text: price,
					}],
				},
				hero: {
					type: "image",
					url: image,
					size: "full",
					aspectRatio: "2:1",
				},
				body: {
					type: "box",
					layout: "vertical",
					contents: [{
						type: "text",
						text: content,
					},
					{
						type: "text",
						text: date,
					}],
				},
			};*/
		})
		.catch(err => console.log(err));
	}
	else{
		return Promise.resolve(null);
	}

	console.log("===========================");
	console.log(typeof echo);
	console.log(echo);
	console.log("===========================");

	// use reply API
	if((echo.type==="text"&&echo.text!=="")||echo.type==="image"||echo.type==="bubble"){
		console.log("===========================");
		console.log("有進到reply");
		console.log("===========================");
		return client.replyMessage(event.replyToken, echo);
	}
}

const bodyParser = require('body-parser');
const request = require('request-promise-native');
const TIE = require('@artificialsolutions/tie-api-client');
const FB_PAGE_ACCESS_TOKEN="EAAEJewbZCTzEBAI4cXWlxn23ewstg1aTY7XPc8EBQyJitgOb0gB71nClsTHReqF5aujEvVtay6LSj9c4xQH7BZCLfXIbwa4CZCmtiK43cyxtNnzQYOXtkX8RVLm7G8IlclyvSixM80xE3z1IolPpzvc2EbKkPEmKtPMOIZBWSQoF0yXQd9oJkrumnFH7E1sZD";
const FB_VERIFY_TOKEN="asdf";
const TENEO_ENGINE_URL="https://surfd.herokuapp.com/webhook";
const teneoApi = TIE.init(TENEO_ENGINE_URL);
console.log("teneoApi===========================");
console.log(teneoApi);
console.log("teneoApi===========================");

app.post('/webhook', facebookWebhook(SessionHandler()));

function SessionHandler() {
	console.log("SessionHandler===========================");
	console.log("SessionHandler");
	console.log("SessionHandler===========================");

  // Map the Facebook user id to the teneo engine session id.
  // This code keeps the map in memory, which is ok for testing purposes
  // For production usage it is advised to make use of more resilient storage mechanisms like redis
  const sessionMap = new Map();

  return {
    getSession: (userId) => new Promise((resolve) => {
      if (sessionMap.size > 0) {
        resolve(sessionMap.get(userId));
      }
      else {
        resolve("")
      }
    }),
    setSession: (userId, sessionId) => new Promise((resolve) => {
      sessionMap.set(userId, sessionId);
      resolve();
    })
  };
}

/* *
 * FACEBOOK WEBHOOK ROUTER
 * */

function facebookWebhook(sessionHandler) {
	console.log("facebookWebhook===========================");
	console.log("facebookWebhook");
	console.log("facebookWebhook===========================");
  const router = express.Router();

  router.use(bodyParser.json());
  router.get('/', verifyEndpoint);
  router.post('/', handleFacebookMessage(sessionHandler));

  return router;
}

function verifyEndpoint(req, res) {
	console.log("verifyEndpoint===========================");
	console.log("verifyEndpoint");
	console.log("verifyEndpoint===========================");
  if (req.query['hub.verify_token'] === FB_VERIFY_TOKEN) {
    console.log('Verify token')
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
}

function handleFacebookMessage(sessionHandler) {
	console.log("handleFacebookMessage===========================");
	console.log("handleFacebookMessage");
	console.log("handleFacebookMessage===========================");
  return (req, res) => {
    res.sendStatus(200);

    req.body.entry.forEach(({ messaging }) => {
			console.log("messaging===========================");
			console.log(messaging);
			console.log("messaging===========================");
      messaging.forEach(async ({ message, sender }) => {
        try {
          console.log(`Got message '${message.text}' from sender ${sender.id}`);

          const sessionId = await sessionHandler.getSession(sender.id);
          const teneoResponse = await teneoApi.sendInput(sessionId, {
            text: message.text
          });

          console.log(`Got Teneo Engine response '${teneoResponse.output.text}' for session ${teneoResponse.sessionId}`);

          await sessionHandler.setSession(sender.id, teneoResponse.sessionId);
          const facebookMessage = createFacebookMessage(sender.id, teneoResponse.output.text);

          await sendFacebookMessage(facebookMessage);

          // use the engine output parameter 'fbmessenger' to send messenger templates and attachments
          // https://developers.facebook.com/docs/messenger-platform/send-messages/templates
          if (teneoResponse.output.parameters.fbmessenger) {
            const facebookAttachment = createFacebookAttachment(sender.id, teneoResponse.output.parameters.fbmessenger);
            await sendFacebookMessage(facebookAttachment);
          }

        } catch (error) {
          console.error(`Failed when sending input to Teneo Engine @ ${TENEO_ENGINE_URL}`, error);
        }
      });
    });
  };
}

function createFacebookMessage(recipientId, text) {
	console.log("createFacebookMessage===========================");
	console.log("createFacebookMessage");
	console.log("createFacebookMessage===========================");
  return {
    message: { text },
    recipient: { id: recipientId }
  };
}

function createFacebookAttachment(recipientId, attachment) {
	console.log("createFacebookAttachment===========================");
	console.log("createFacebookAttachment");
	console.log("createFacebookAttachment===========================");
  return {
    message: { attachment: attachment },
    recipient: { id: recipientId }
  };
}

async function sendFacebookMessage(messageData) {
	console.log("sendFacebookMessage===========================");
	console.log("sendFacebookMessage");
	console.log("sendFacebookMessage===========================");
  try {
    const response = await request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: FB_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: messageData,
      resolveWithFullResponse: true
    });

    if (response.statusCode !== 200) {
      throw new Error(`Got status code ${response.statusCode} when sending response.`);
    }

    console.log('Sent response to Facebook');
  } catch (error) {
    console.error('Got error while sending message to Facebook', error);
  }
}

// listen on port
const port=process.env.PORT||3000;
app.listen(port, ()=>{
	//console.log(`listening on ${port}`);
});
