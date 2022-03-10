/*const express=require("express");
const bodyParser=require("body-parser");
const app=express();

const rp=require('request-promise');
const $=require('cheerio');
const url='https://www.ptt.cc/bbs/fastfood/M.1526277935.A.DA0.html';*/

// 引用linebot SDK
var linebot=require('linebot');

// 用於辨識Line Channel的資訊
var bot=linebot({
	channelId:'1656957916',
	channelSecret:'9ad6181f07656cecde7ed27546281b37',
	channelAccessToken:'mRylXzlEWz1SF/zZi2j5S6xfDXFXq66FSAXVRUCti7ljR0Ofm2bg33/CGk5UfQN8AnUx7hFY/v04p3wsl09egyN5p4jlxikPkYq/kp5uAHwSzZ98NeE72fFA9oL3bxxDi/JgVwX09gClqzO86YT9OAdB04t89/1O/w1cDnyilFU='
});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
	// event.message.text是使用者傳給bot的訊息
	// 準備要回傳的內容
	var replyMsg = `Hello你剛才說的是:${event.message.text}`;
	// 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
	event.reply(replyMsg).then(function (data) {
		// 當訊息成功回傳後的處理
	}).catch(function (error) {
		// 當訊息回傳失敗後的處理
	});
});

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
	console.log('[BOT已準備就緒]');
});

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post("/surfD", async (req, res)=>{
	let time={};

	let now=new Date();
	let highTide=now.getHours()+":"+now.getMinutes();
	let lowTide=(now.getHours()+6)+":"+now.getMinutes();

	time={highTide, lowTide};

	return res.json(time);
});

app.get("/getKfcCoupons", async (req, res)=>{
	let coupons=await rp("https://kfc.2dim.space")
	.then(body=>{
		let coupons=[];
		$(".box", body).each((i, e)=>{
			let code, price, description, expireDate;
			e.children.forEach(e=>{
				if(e.name==="a"){
					e.children.forEach(e=>{
						if(e.name==="div"){
							price=e.children[0].data;
						}
						else{
							code=e.children[0].data;
						}
					});
				}
				else if(e.attribs&&e.attribs.class==="vldt"){
					expireDate=e.children[0].children[e.children[0].children.length-1].data;
				}
				else if(e.type==="text"){
					description=e.data;
				}
			});
			if(!(code.includes("+"))){
				coupons.push({code, price, description, expireDate});
			}
		});
		return coupons;
	})
	.catch(error=>console.log("server.getKfcCoupons.rp", error));

	return res.json(coupons);
});

app.get("/getPizzahutCoupons", async (req, res)=>{
	let coupons=await rp("https://pizzahut.2dim.space/")
	.then(body=>{
		let coupons=[];
		$("#parent", body)[0].children.forEach(e=>{
			if(e.attribs&&e.attribs.class&&e.attribs.class.includes("box")){
				let code, price, description, expireDate;
				e.children.forEach(e=>{
					if(e.name==="a"){
						e.children.forEach(e=>{
							if(e.name==="div"){
								price=e.children[0].data;
							}
							else{
								code=e.data;
							}
						});
					}
					else if(e.attribs&&e.attribs.class==="vldt"){
						expireDate=e.children[0].children[e.children[0].children.length-1]&&e.children[0].children[e.children[0].children.length-1].data;
					}
					else if(e.type==="text"){
						description=e.data;
					}
				});
				if(!(code.includes("+"))){
					coupons.push({code, price, description, expireDate});
				}
			}
		});
		return coupons;
	})
	.catch(error=>console.log("server.getPizzahutCoupons.rp1", error));

	let i=0;
	let temp=await rp(url)
	.then(body=>{
		let coupons=[];
		$("#main-content", body)[0].children.some(e=>{
			if(e.attribs&&e.attribs.class==="f1 b7 hl"){
				i++;
			}
			if(i<3){
				return false;
			}
			if(i===4){
				return true;
			}
			if(e.type==="text"&&e.data.trim()!==""){
				if(!(e.data.includes("\n"))&&e.data.includes("$")){
					//console.log(e.prev);return true;
					coupons.push({
						"code":e.prev.children[0].data.trim(),
						"price":e.data.trim(),
						"description":e.next.children[0].data.trim(),
						"expireDate":e.next.next.data.split("\n")[0].trim(),
					});
				}
				else if(e.data.includes("$")){
					let t=e.data.split("\n");
					t=t[t.length-1];
					t=t.split("$");
					coupons.push({
						"code":t[0].trim(),
						"price":"$"+t[1].trim(),
						"description":e.next.children[0].data.trim(),
						"expireDate":e.next.next.data.split("\n")[0].trim(),
					});
				}
				else if(e.data.includes("限悠遊卡付款")){
					coupons.push({
						"code":e.data.trim(),
						"price":"$ ?",
						"description":e.next.children[0].data.trim(),
						"expireDate":e.next.next.data.split("\n")[0].trim(),
					});
				}
			}
			return false;
		});
		//console.log(coupons);
		return coupons;
	})
	.catch(error=>console.log("server.getPizzahutCoupons.rp2", error));

	coupons=coupons.concat(temp);

	//let result=[{"code":"18205", "price":99, "description":"指定口味個人比薩/黃金起司餃1份+薯星星*10+330ml飲", "expireDate":"?"}];
	return res.json(coupons);
});

app.get("/getDominosCoupons", async (req, res)=>{
	let i=0;
	let coupons=await rp(url)
	.then(body=>{
		let coupons=[];
		$("#main-content", body)[0].children.some(e=>{
			if(e.attribs&&e.attribs.class==="f1 b7 hl"){
				i++;
			}
			if(i<4){
				return false;
			}
			if(i===5){
				return true;
			}
			if(e.type==="text"&&e.data.trim().includes("~")){////總有些空白element，要想其他判斷方式
				if(e.prev.prev.prev.attribs.class==="f3 hl"){//悠遊卡
					coupons.push({
						"code":e.prev.prev.prev.children[0].data,
						"price":"$ ?",
						"description":e.prev.children[0].data,
						"expireDate":e.data.split("\n")[0].trim(),
					});
				}
				else if(e.prev.name==="a"){
					coupons.push({
						"code":e.prev.prev.prev.prev.prev.children&&e.prev.prev.prev.prev.prev.children[0].data,
						"price":e.prev.prev.prev.prev.data.trim(),
						"description":e.prev.prev.prev.children[0].data,
						"expireDate":e.data.split("\n")[0].trim(),
						"url":e.prev.attribs.href,
					});
				}
			}
			return false;
		});
		//console.log(coupons);
		return coupons;
	})
	.catch(error=>console.log("server.getDominosCoupons.rp", error));

	//let result=[{"code":"18205", "price":99, "description":"指定口味個人比薩/黃金起司餃1份+薯星星*10+330ml飲", "expireDate":"?"}];
	return res.json(coupons);
});

app.get("/getNapoliCoupons", async (req, res)=>{
	let i=0;
	let coupons=await rp(url)
	.then(body=>{
		let coupons=[];
		$("#main-content", body)[0].children.some(e=>{
			if(e.attribs&&e.attribs.class==="f1 b7 hl"){
				i++;
			}
			if(i<5){
				return false;
			}
			if(i===6){
				return true;
			}
			if(e.type==="text"&&e.data.trim()!==""){
				if(e.data.includes("$")){
					coupons.push({
						"code":"?",
						"price":e.data.trim(),
						"description":e.next.children[0].data.trim(),
						"expireDate":e.next.next.data.split("\n")[0].trim(),
					});
				}
			}
			return false;
		});
		//console.log(coupons);
		return coupons;
	})
	.catch(error=>console.log("server.getNapoliCoupons.rp", error));

	//let result=[{"code":"18205", "price":99, "description":"指定口味個人比薩/黃金起司餃1份+薯星星*10+330ml飲", "expireDate":"?"}];
	return res.json(coupons);
});

app.get("/getImg", async (req, res)=>{
	let img=await rp(url)
	.then(body=>{
		let flagPizzahut=false;
		let imgPizzahut={};
		$("#main-content", body)[0].children.forEach(e=>{
			if(e.children&&e.children[0].data&&e.children[0].data.includes("imgur")){//pivot=圖片網址
				if(e.prev.prev.name==="span"&&e.prev.prev.children[0].data.trim()==="必勝客 優惠代碼"){
					flagPizzahut=true;//開始抓必勝客圖片
				}
				if(e.prev.prev.name==="span"&&e.prev.prev.children[0].data.trim()==="MOS"){
					flagPizzahut=false;//停止抓必勝客圖片
				}
				let url=e.children[0].data.trim();//刪除前後空白換行
				if(!url.includes("i.imgur")){
					url=url.replace("imgur", "i.imgur");//img一致化
				}
				if(!url.includes(".jpg")&&!url.includes(".png")){
					url+=".jpg";//加了才是直接顯示圖片的網址
				}
				if(flagPizzahut&&e.prev.data.trim()!==""){
					imgPizzahut[e.prev.data.trim()]=url.replace("http:", "https:");
				}
			}
		});
		return {imgPizzahut};
	})
	.catch(error=>console.log("server.getImg.rp1", error));

	img.imgKfc=await rp("https://kfc.2dim.space/img.html")
	.then(body=>{
		let imgKfc={};
		$("#images", body)[0].children.forEach(e=>{
			if(e.name==="img"){
				let url=e.attribs.lnk.trim();//刪除前後空白換行
				if(!url.includes("i.imgur")){
					url=url.replace("imgur", "i.imgur");//img一致化
				}
				if(!url.includes(".jpg")&&!url.includes(".png")){
					url+=".jpg";//加了才是直接顯示圖片的網址
				}
				let code=e.attribs.id.trim().replace("i", "");
				if(code==="abc"){
					code="ABC自由選";
				}
				imgKfc[code]=url.replace("http:", "https:");//統一https
			}
		});
		return imgKfc;
	})
	.catch(error=>console.log("server.getImg.rp2", error));

	var temp=await rp("https://pizzahut.2dim.space/img.html")
	.then(body=>{
		let imgPizzahut={};
		$("#images", body)[0].children.forEach(e=>{
			if(e.name==="img"){
				let url=e.attribs.lnk.trim();//刪除前後空白換行
				if(!url.includes("i.imgur")){
					url=url.replace("imgur", "i.imgur");//img一致化
				}
				if(!url.includes(".jpg")&&!url.includes(".png")){
					url+=".jpg";//加了才是直接顯示圖片的網址
				}
				imgPizzahut[e.attribs.id.trim().replace("i", "")]=url.replace("http:", "https:");//統一https
			}
		});
		return imgPizzahut;
	})
	.catch(error=>console.log("server.getImg.rp2", error));
	img.imgPizzahut=Object.assign({}, img.imgPizzahut, temp);

	return res.json(img);
});

//Serve static assets if in production
if (process.env.NODE_ENV==='production'){
	//Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res)=>res.sendFile('index.html', {root:__dirname+'/client/build/'}));
}

const port=process.env.PORT||5000;

app.listen(port, ()=>console.log(`LISTENING ON PORT ${port}`));*/
