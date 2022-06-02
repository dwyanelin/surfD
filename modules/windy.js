/*
先截圖windy E系統的小圖預報，
有加A才截圖3個系統的小圖預報，並附上label跟message action，
點擊可以去觸發單一系統的小（大）圖預報

1.地點
2.小圖大圖
3.哪個系統
*/

const { ImgurClient }=require('imgur');
const clientImgur=new ImgurClient({ clientId: "1f37d55e8774b46" });

const screenshotWindy=require("./screenshotWindy");

module.exports=async (keyword, clientPostgres, browser)=>{
	keyword=keyword.replace("預報", "").replace("預", "");
	keyword=keyword.toUpperCase().replace("WINDY", "").replace("W", "");
	//https://www.windy.com/緯度latitude/經度longitude
	////陸續增加浪點gps，使用下方台灣浪點地圖
	//https://www.google.com/maps/d/viewer?hl=zh-TW&mid=1Tmx-N1h9ZELKdrtxT7RxT4oK1m0bhSoq

	let url;
	let location;
	if(keyword.includes("雙獅")){
		url="https://www.windy.com/24.889/121.851";
		location="雙獅";
	}
	else if(keyword.includes("臭水")){
		url="https://www.windy.com/24.855/121.833";
		location="臭水";
	}
	else if(keyword.includes("南堤")){
		url="https://www.windy.com/24.864/121.839";
		location="南堤";
	}
	else if(keyword.includes("烏石")||keyword.includes("北堤")){
		url="https://www.windy.com/24.872/121.842";
		location="北堤";
	}
	else if(keyword.includes("外澳")){
		url="https://www.windy.com/24.880/121.846";
		location="外澳";
	}
	else if(keyword.includes("梗枋")){
		url="https://www.windy.com/24.902/121.866";
		location="梗枋";
	}
	else if(keyword.includes("蜜月")||keyword.includes("大溪")){
		url="https://www.windy.com/24.931/121.886";
		location="蜜月";
	}
	else if(keyword.includes("南澳")){
		url="https://www.windy.com/24.448/121.818";
		location="南澳";
	}
	else if(keyword.includes("蘇澳")||keyword.includes("無尾")){
		url="https://www.windy.com/24.610/121.864";
		location="無尾";
	}
	else if(keyword.includes("貢寮")||keyword.includes("福隆")){
		url="https://www.windy.com/25.020/121.949";
		location="福隆";
	}
	else if(keyword.includes("金沙")){
		url="https://www.windy.com/25.075/121.916";
		location="金沙";
	}
	else if(keyword.includes("萬里")){
		url="https://www.windy.com/25.181/121.691";
		location="萬里";
	}
	else if(keyword.includes("翡翠")){
		url="https://www.windy.com/25.188/121.687";
		location="翡翠";
	}
	else if(keyword.includes("龜吼")){
		url="https://www.windy.com/25.193/121.686";
		location="龜吼";
	}
	else if(keyword.includes("金山")||keyword.includes("磺港")){
		url="https://www.windy.com/25.231/121.644";
		location="磺港";
	}
	else if(keyword.includes("中角")){
		url="https://www.windy.com/25.241/121.634";
		location="中角";
	}
	else if(keyword.includes("石門")||keyword.includes("餐廳")){
		url="https://www.windy.com/25.288/121.531";
		location="餐廳";
	}
	else if(keyword.includes("環保")){
		url="https://www.windy.com/24.008/121.647";
		location="環保";
	}
	else if(keyword.includes("北濱")){
		url="https://www.windy.com/23.977/121.620";
		location="北濱";
	}
	else if(keyword.includes("壽豐")||keyword.includes("雙橋")){
		url="https://www.windy.com/23.852/121.595";
		location="雙橋";
	}
	else if(keyword.includes("豐濱")||keyword.includes("磯崎")){
		url="https://www.windy.com/23.701/121.550";
		location="磯崎";
	}
	else if(keyword.includes("長濱")||keyword.includes("八仙洞")){
		url="https://www.windy.com/23.396/121.480";
		location="八仙洞";
	}
	else if(keyword.includes("宜灣")){
		url="https://www.windy.com/23.208/121.400";
		location="宜灣";
	}
	else if(keyword.includes("成功")||keyword.includes("基翬")){
		url="https://www.windy.com/23.115/121.396";
		location="成功";
	}
	else if(keyword.includes("都歷")){
		url="https://www.windy.com/23.021/121.336";
		location="都歷";
	}
	else if(keyword.includes("北東")){
		url="https://www.windy.com/22.975/121.314";
		location="北東";
	}
	else if(keyword.includes("南東")){////跟東河口可以再細分
		url="https://www.windy.com/22.973/121.313";
		location="南東";
	}
	else if(keyword.includes("東河")||keyword.includes("河口")){
		url="https://www.windy.com/22.973/121.313";
		location="東河口";
	}
	else if(keyword.includes("金樽左")){////跟金樽可以再細分
		url="https://www.windy.com/22.955/121.296";
		location="金樽左";
	}
	else if(keyword.includes("金樽")){
		url="https://www.windy.com/22.955/121.296";
		location="金樽";
	}
	else if(keyword.includes("小漁港")){
		url="https://www.windy.com/22.953/121.291";
		location="小漁港";
	}
	else if(keyword.includes("都蘭")){
		url="https://www.windy.com/22.876/121.238";
		location="都蘭";
	}
	else if(keyword.includes("佳樂水")){
		url="https://www.windy.com/21.987/120.848";
		location="佳樂水";
	}
	else if(keyword.includes("大灣")){
		url="https://www.windy.com/21.942/120.796";
		location="大灣";
	}
	else if(keyword.includes("港仔")){////這的地點有待商榷，可跟獅頭再細分
		url="https://www.windy.com/21.958/120.761";
		location="港仔";
	}
	else if(keyword.includes("恆春")||keyword.includes("南灣")||keyword.includes("獅頭")){
		url="https://www.windy.com/21.958/120.761";
		location="南灣";
	}
	else if(keyword.toUpperCase().includes("AK")){//颱風管浪barrel高級浪點
		url="https://www.windy.com/21.927/120.708";
		location="AK";
	}
	else if(keyword.includes("旗津")){
		url="https://www.windy.com/22.610/120.265";
		location="旗津";
	}
	else if(keyword.includes("安平")||keyword.includes("漁光")){
		url="https://www.windy.com/22.980/120.153";
		location="漁光";
	}
	else if(keyword.includes("大甲")||keyword.includes("松柏港")){
		url="https://www.windy.com/24.432/120.617";
		location="松柏港";
	}
	else if(keyword.includes("後龍")||keyword.includes("外埔")){
		url="https://www.windy.com/24.636/120.759";
		location="外埔";
	}
	else{
		return {"type":"text", "text":""};
	}

	let viewport;
	let system;
	let locationKey;//要存postgres的key
	if(/[egi]/i.test(keyword)){
		viewport="大";//EGI
		if(keyword.toUpperCase().includes("E")){
			system="E";
		}
		else if(keyword.toUpperCase().includes("G")){
			system="G";
		}
		else if(keyword.toUpperCase().includes("I")){
			system="I";
		}
		locationKey=location+system;
	}
	else{
		viewport="小";
		if(/[a3全]/i.test(keyword)){//指定要All預報圖，就回復3個小預報圖
			system="A";//All
			locationKey=location+system;
		}
		else{//最簡單的指令，快速回復1個小預報圖
			system="F";//Fast
			locationKey=location;
		}
	}

	//如果有截圖locationKey
		//如果時間<=一小時，直接取用
			//tableName=windyImgur, id, location, imgur, created_at
			//location=雙獅，imgur=url
			//location=雙獅A，imgur=url*3
			//location=雙獅E，imgur=url
		//else
			//跑截圖，update table
	//else
		//跑截圖，insert table

	//connecting-heroku-postgres
	return new Promise((resolve, reject)=>{
		clientPostgres.query('SELECT location, imgur, count, created_at FROM windyImgur where location=\''+locationKey+'\';', async (err, res)=>{
			//console.log(err, res);
			if(err) throw err;

			let imageLinks=[];

			//res.rows[0]=我們要的資料，location, imgur, created_at
			if(res.rows.length>0){//如果有截圖location
				let row=res.rows[0];

				//先update查詢次數
				clientPostgres.query('UPDATE windyImgur SET count='+(row.count+1)+' WHERE location=\''+locationKey+'\';');
				//先update查詢次數

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
						let imageBuffers=await screenshotWindy(url, viewport, system, browser, location);//截圖windy波浪預報

						if(typeof imageBuffers==="undefined"){
							resolve({
								"type": "text",
								"text": ""
							});
						}
						else{
							console.log("有截圖cache但網址有問題，成功截圖："+location+system);

							//upload image via buffer
							for(let i=0;i<imageBuffers.length;i++){
								let response=await clientImgur.upload({
									image: imageBuffers[i],
									type: 'stream'
								});
								imageLinks.push(response.data.link);
							}

							//update table
							clientPostgres.query('UPDATE windyImgur SET imgur=\''+JSON.stringify(imageLinks)+'\', created_at=to_timestamp('+Date.now()+'/1000) WHERE location=\''+locationKey+'\';');
						}
					}
				}
				else{
					console.log("跑進有截圖location，但截圖時間超過一小時的流程");
					//跑截圖
					let imageBuffers=await screenshotWindy(url, viewport, system, browser, location);//截圖windy波浪預報

					if(typeof imageBuffers==="undefined"){
						resolve({
							"type": "text",
							"text": ""
						});
					}
					else{
						console.log("有截圖cache但時間超過，成功截圖："+location+system);

						//upload image via buffer
						for(let i=0;i<imageBuffers.length;i++){
							let response=await clientImgur.upload({
								image: imageBuffers[i],
								type: 'stream'
							});
							imageLinks.push(response.data.link);
						}

						//update table
						clientPostgres.query('UPDATE windyImgur SET imgur=\''+JSON.stringify(imageLinks)+'\', created_at=to_timestamp('+Date.now()+'/1000) WHERE location=\''+locationKey+'\';');
					}
				}
			}
			else{
				console.log("跑進沒有截圖location的流程");
				//跑截圖
				let imageBuffers=await screenshotWindy(url, viewport, system, browser, location);//截圖windy波浪預報

				if(typeof imageBuffers==="undefined"){
					resolve({
						"type": "text",
						"text": ""
					});
				}
				else{
					console.log("沒有截圖cache，成功截圖"+location+system);

					//upload image via buffer
					for(let i=0;i<imageBuffers.length;i++){
						let response=await clientImgur.upload({
							image: imageBuffers[i],
							type: 'stream'
						});
						imageLinks.push(response.data.link);
					}

					//insert table
					clientPostgres.query('INSERT INTO windyImgur(location, imgur) VALUES (\''+locationKey+'\', \''+JSON.stringify(imageLinks)+'\');');
				}
			}

			if(viewport==="大"){
				resolve({
					"type": "image",
					"originalContentUrl": imageLinks[0],
					"previewImageUrl": imageLinks[0]
				});
			}
			else{
				if(system==="A"){
					resolve({
						"type": "template",
						"altText": location+"windy預報",
						"template": {
							"type": "image_carousel",
							"columns": [{
								"imageUrl": imageLinks[0],
								"action": {
									"type": "message",
									"label": "預報"+location+"ECMWF",
									"text": "W"+location+"E"
								}
							},
							{
								"imageUrl": imageLinks[1],
								"action": {
									"type": "message",
									"label": "預報"+location+"GFS",
									"text": "W"+location+"G"
								}
							},
							{
								"imageUrl": imageLinks[2],
								"action": {
									"type": "message",
									"label": "預報"+location+"ICON",
									"text": "W"+location+"I"
								}
							}]
						}
					});
				}
				else{
					resolve({
						"type": "image",
						"originalContentUrl": imageLinks[0],
						"previewImageUrl": imageLinks[0]
					});
				}
			}
		});
		//connecting-heroku-postgres
	});




	//以下是以前想法暫時留存
	/*let imageObjectArray=imageLinks.map(imageLink=>({//覺得有更好的流程
		"type": "image",
		"originalContentUrl": imageLink,
		"previewImageUrl": imageLink
	}));

	return imageObjectArray;

	return {//這樣使用者不能點圖片放大，看不清楚
		"type": "flex",
		"altText": "surf forecast",
		"contents": {
			"type": "carousel",
			"contents": [{
				"type": "bubble",
				"hero": {
					"type": "image",
					"url": imageLinks[0],
					"size": "full",
					"aspectRatio": "4:3",
					"aspectMode": "cover"
				}
			},
			{
				"type": "bubble",
				"hero": {
					"type": "image",
					"url": imageLinks[1],
					"size": "full",
					"aspectRatio": "4:3",
					"aspectMode": "cover"
				}
			},
			{
				"type": "bubble",
				"hero": {
					"type": "image",
					"url": imageLinks[2],
					"size": "full",
					"aspectRatio": "4:3",
					"aspectMode": "cover"
				}
			}]
		}
	};*/
};
