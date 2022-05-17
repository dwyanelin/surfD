/*
到MSW網頁，
瀏覽器定位到預報table，並按天數定位table index，
截圖
*/

const { ImgurClient }=require('imgur');
const clientImgur=new ImgurClient({ clientId: "1f37d55e8774b46" });

const screenshotMsw=require("./screenshotMsw");

module.exports=async (keyword, clientPostgres, browser)=>{
	keyword=keyword.toUpperCase().replace("MSW", "").replace("M", "");
	//https://www.windy.com/緯度latitude/經度longitude
	////陸續增加浪點gps，使用下方台灣浪點地圖
	//https://www.google.com/maps/d/viewer?hl=zh-TW&mid=1Tmx-N1h9ZELKdrtxT7RxT4oK1m0bhSoq

	let url;
	let location;
	if(keyword.includes("雙獅")){
		url="https://magicseaweed.com/Wushi-Surf-Report/844/";
		location="雙獅";
	}
	else if(keyword.includes("臭水")){
		url="https://magicseaweed.com/Wushi-Surf-Report/844/";
		location="臭水";
	}
	else if(keyword.includes("南堤")){
		url="https://magicseaweed.com/Wushi-Surf-Report/844/";
		location="南堤";
	}
	else if(keyword.includes("烏石")||keyword.includes("北堤")){
		url="https://magicseaweed.com/Wushi-Surf-Report/844/";
		location="北堤";
	}
	else if(keyword.includes("外澳")){
		url="https://magicseaweed.com/Wushi-Surf-Report/844/";
		location="外澳";
	}
	else if(keyword.includes("梗枋")){
		url="https://magicseaweed.com/Dashi-Surf-Report/2412/";
		location="梗枋";
	}
	else if(keyword.includes("蜜月")||keyword.includes("大溪")){
		url="https://magicseaweed.com/Dashi-Surf-Report/2412/";
		location="蜜月";
	}
	else if(keyword.includes("貢寮")||keyword.includes("福隆")){
		url="https://magicseaweed.com/Fulong-Beach-Surf-Report/3442/";
		location="福隆";
	}
	else if(keyword.includes("金沙")){
		url="https://magicseaweed.com/Fulong-Beach-Surf-Report/3442/";
		location="金沙";
	}
	else if(keyword.includes("萬里")){
		url="https://magicseaweed.com/Jin-Shan-Surf-Report/3447/";
		location="萬里";
	}
	else if(keyword.includes("翡翠")){
		url="https://magicseaweed.com/Jin-Shan-Surf-Report/3447/";
		location="翡翠";
	}
	else if(keyword.includes("龜吼")){
		url="https://magicseaweed.com/Jin-Shan-Surf-Report/3447/";
		location="龜吼";
	}
	else if(keyword.includes("金山")||keyword.includes("磺港")){
		url="https://magicseaweed.com/Jin-Shan-Surf-Report/3447/";
		location="磺港";
	}
	else if(keyword.includes("中角")){
		url="https://magicseaweed.com/Jin-Shan-Surf-Report/3447/";
		location="中角";
	}
	else if(keyword.includes("石門")||keyword.includes("餐廳")){
		url="https://magicseaweed.com/Baishawan-Surf-Report/3767/";
		location="餐廳";
	}
	else if(keyword.includes("環保")){
		url="https://magicseaweed.com/Hualien-Surf-Report/756/";
		location="環保";
	}
	else if(keyword.includes("北濱")){
		url="https://magicseaweed.com/Hualien-Surf-Report/756/";
		location="北濱";
	}
	else if(keyword.includes("壽豐")||keyword.includes("雙橋")){
		url="https://magicseaweed.com/Gongs-Surf-Report/2411/";
		location="雙橋";
	}
	else if(keyword.includes("豐濱")||keyword.includes("磯崎")){
		url="https://magicseaweed.com/Jigi-Beach-Surf-Report/5471/";
		location="磯崎";
	}
	else if(keyword.includes("長濱")||keyword.includes("八仙洞")){
		url="https://magicseaweed.com/Bashien-Dong-Surf-Report/3450/";
		location="八仙洞";
	}
	else if(keyword.includes("宜灣")){
		url="https://magicseaweed.com/Cheng-Gong-Surf-Report/3452/";
		location="宜灣";
	}
	else if(keyword.includes("成功")||keyword.includes("基翬")){
		url="https://magicseaweed.com/Cheng-Gong-Surf-Report/3452/";
		location="成功";
	}
	else if(keyword.includes("都歷")){
		url="https://magicseaweed.com/Jinzun-Harbour-Surf-Report/4662/";
		location="都歷";
	}
	else if(keyword.includes("北東")){
		url="https://magicseaweed.com/Jinzun-Harbour-Surf-Report/4662/";
		location="北東";
	}
	else if(keyword.includes("南東")){////跟東河口可以再細分
		url="https://magicseaweed.com/Jinzun-Harbour-Surf-Report/4662/";
		location="南東";
	}
	else if(keyword.includes("東河")||keyword.includes("河口")){
		url="https://magicseaweed.com/Jinzun-Harbour-Surf-Report/4662/";
		location="東河口";
	}
	else if(keyword.includes("金樽左")){////跟金樽可以再細分
		url="https://magicseaweed.com/Jinzun-Harbour-Surf-Report/4662/";
		location="金樽左";
	}
	else if(keyword.includes("金樽")){
		url="https://magicseaweed.com/Jinzun-Harbour-Surf-Report/4662/";
		location="金樽";
	}
	else if(keyword.includes("小漁港")){
		url="https://magicseaweed.com/Jinzun-Harbour-Surf-Report/4662/";
		location="小漁港";
	}
	else if(keyword.includes("都蘭")){
		url="https://magicseaweed.com/Jinzun-Harbour-Surf-Report/4662/";
		location="都蘭";
	}
	else if(keyword.includes("佳樂水")){
		url="https://magicseaweed.com/Jialeshuei-Surf-Report/2409/";
		location="佳樂水";
	}
	else if(keyword.includes("大灣")){
		url="https://magicseaweed.com/South-Bay-Surf-Report/5473/";
		location="大灣";
	}
	else if(keyword.includes("港仔")){////這的地點有待商榷，可跟獅頭再細分
		url="https://magicseaweed.com/South-Bay-Surf-Report/5473/";
		location="港仔";
	}
	else if(keyword.includes("恆春")||keyword.includes("南灣")||keyword.includes("獅頭")){
		url="https://magicseaweed.com/South-Bay-Surf-Report/5473/";
		location="南灣";
	}
	else if(keyword.toUpperCase().includes("AK")){
		url="https://magicseaweed.com/Nanwan-Surf-Report/2407/";
		location="AK";
	}
	else if(keyword.includes("旗津")){
		url="https://magicseaweed.com/West-Bay-Surf-Report/3448/";
		location="旗津";
	}
	else if(keyword.includes("安平")||keyword.includes("漁光")){
		url="https://magicseaweed.com/Xiaomeijun-Surf-Report/5466/";//小美軍
		location="漁光";
	}
	else if(keyword.includes("大甲")||keyword.includes("松柏港")){
		url="https://magicseaweed.com/Daan-Beach-Surf-Report/5470/";
		location="松柏港";
	}
	else if(keyword.includes("後龍")||keyword.includes("外埔")){
		url="https://magicseaweed.com/Chu-Nan-Surf-Report/3451/";
		location="外埔";
	}
	else{
		return {"type":"text", "text":""};
	}

	let days=keyword.match(/\d+$/);//天數看要截幾個圖
	if(days===null){
		days=1;
	}
	else{
		days=days[0];
	}

	let locationKey=location+days;//要存postgres的key

	//如果有截圖locationKey
		//如果時間<=一小時，直接取用
			//tableName=mswImgur, id, location, imgur, created_at
			//location=雙獅，imgur=url
			//location=雙獅7，imgur=url*7
		//else
			//跑截圖，update table
	//else
		//跑截圖，insert table

	//connecting-heroku-postgres
	return new Promise((resolve, reject)=>{
		clientPostgres.query('SELECT location, imgur, created_at FROM mswImgur where location=\''+locationKey+'\';', async (err, res)=>{
			//console.log(err, res);
			if(err) throw err;

			let imageLinks=[];

			//res.rows[0]=我們要的資料，location, imgur, created_at
			if(res.rows.length>0){//如果有截圖location
				let row=res.rows[0];
				console.log("截圖cache建立時間：");
				console.log(row.created_at);
				let hours=Math.abs(Date.now()-row.created_at)/3.6e6;//3600000
				console.log("離現在幾小時（超過1小不取用）："+hours);
				if(hours<=1){//如果時間<=一小時，直接取用
					imageLinks=JSON.parse(row.imgur);
					console.log("直接取用截圖cache網址：");
					console.log(imageLinks);
					let isAllLinksWork=imageLinks.every(link=>link&&link.includes("https://i.imgur.com/")&&(link.includes(".png")||link.includes(".jpg")));
					if(isAllLinksWork===false){
						console.log("跑進有截圖location，但截圖網址有問題的流程");
						//先清空links重新來
						imageLinks=[];

						//跑截圖
						let imageBuffers=await screenshotMsw(url, days, browser, location);//截圖msw+天數波浪預報

						if(typeof imageBuffers==="undefined"){
							//以防screenshot error，imageBuffers就會被設定成undefined
							resolve({
								"type": "text",
								"text": ""
							});
						}
						else{
							console.log("有截圖cache但網址有問題，成功截圖："+location+days);

							//upload image via buffer
							for(let i=0;i<imageBuffers.length;i++){
								let response=await clientImgur.upload({
									image: imageBuffers[i],
									type: 'stream'
								});
								imageLinks.push(response.data.link);
							}

							//update table
							clientPostgres.query('UPDATE mswImgur SET imgur=\''+JSON.stringify(imageLinks)+'\', created_at=to_timestamp('+Date.now()+'/1000) WHERE location=\''+locationKey+'\';');
						}
					}
				}
				else{
					console.log("跑進有截圖location，但截圖時間超過一小時的流程");
					//跑截圖
					let imageBuffers=await screenshotMsw(url, days, browser, location);//截圖msw+天數波浪預報

					if(typeof imageBuffers==="undefined"){
						//以防screenshot error，imageBuffers就會被設定成undefined
						resolve({
							"type": "text",
							"text": ""
						});
					}
					else{
						console.log("有截圖cache但時間超過，成功截圖："+location+days);

						//upload image via buffer
						for(let i=0;i<imageBuffers.length;i++){
							let response=await clientImgur.upload({
								image: imageBuffers[i],
								type: 'stream'
							});
							imageLinks.push(response.data.link);
						}

						//update table
						clientPostgres.query('UPDATE mswImgur SET imgur=\''+JSON.stringify(imageLinks)+'\', created_at=to_timestamp('+Date.now()+'/1000) WHERE location=\''+locationKey+'\';');
					}
				}
			}
			else{
				console.log("跑進沒有截圖location的流程");
				//跑截圖
				let imageBuffers=await screenshotMsw(url, days, browser, location);//截圖msw+天數波浪預報

				if(typeof imageBuffers==="undefined"){
					//以防screenshot error，imageBuffers就會被設定成undefined
					resolve({
						"type": "text",
						"text": ""
					});
				}
				else{
					console.log("沒有截圖cache，成功截圖"+location+days);

					//upload image via buffer
					for(let i=0;i<imageBuffers.length;i++){
						let response=await clientImgur.upload({
							image: imageBuffers[i],
							type: 'stream'
						});
						imageLinks.push(response.data.link);
					}

					//insert table
					clientPostgres.query('INSERT INTO mswImgur(location, imgur) VALUES (\''+locationKey+'\', \''+JSON.stringify(imageLinks)+'\');');
				}
			}

			resolve([{//都是傳多張image回去
				"type": "image",
				"originalContentUrl": imageLinks[0],
				"previewImageUrl": imageLinks[0]
			}]);
		});
		//connecting-heroku-postgres
	});
};
