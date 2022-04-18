const { ImgurClient }=require('imgur');
const client=new ImgurClient({ clientId: "1f37d55e8774b46" });

const screenshot=require("./screenshot");

module.exports=async (keyword)=>{
	keyword=keyword.replace("預", "");
	keyword=keyword.replace("F", "").replace("f", "");
	//https://www.windy.com/緯度latitude/經度longitude
	////把浪點的gps設定好，帶入windy url
	////要設定成繁體中文

	let url;
	if(keyword.includes("雙獅")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("臭水")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("南堤")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("烏石")||keyword.includes("北堤")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("外澳")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("梗枋")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("蜜月")||keyword.includes("大溪")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("南澳")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("蘇澳")||keyword.includes("無尾")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("貢寮")||keyword.includes("福隆")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("金沙")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("萬里")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("翡翠")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("龜吼")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("金山")||keyword.includes("磺港")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("中角")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("石門")||keyword.includes("餐廳")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("環保")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("北濱")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("壽豐")||keyword.includes("雙橋")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("豐濱")||keyword.includes("磯崎")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("長濱")||keyword.includes("八仙洞")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("宜灣")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("成功")||keyword.includes("基翬")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("都歷")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("北東")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("南東")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("東河")||keyword.includes("河口")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("金樽左")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("金樽")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("小漁港")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("都蘭")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("佳樂水")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("大灣")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("港仔")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("恆春")||keyword.includes("南灣")||keyword.includes("獅頭")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("旗津")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("安平")||keyword.includes("漁光")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("大甲")||keyword.includes("松柏港")){
		url="https://www.windy.com/24.889/121.851";
	}
	else if(keyword.includes("後龍")||keyword.includes("外埔")){
		url="https://www.windy.com/24.889/121.851";
	}
	else{
		url="https://www.windy.com/24.889/121.851";
	}

	let viewport;
	if(keyword.includes("大")){
		viewport="大";//EGI
		//提供box button給使用者選系統，再根據回傳訊息傳截圖
		return {
			"type": "template",
			"altText": "this is a image carousel template",
			"template": {
				"type": "image_carousel",
				"columns": [{
					"imageUrl": "https://i.imgur.com/kuypT8T.png",
					"action": {
						"type": "message",
						"label": "預報大E",
						"text": "yes"
					}
				},
				{
					"imageUrl": "https://i.imgur.com/TRarN6B.png",
					"action": {
						"type": "message",
						"label": "預報大G",
						"text": "yes"
					}
				},
				{
					"imageUrl": "https://i.imgur.com/4Y8jpGA.png",
					"action": {
						"type": "message",
						"label": "預報大I",
						"text": "yes"
					}
				}]
			}
		}
	}
	else{
		viewport="小";
	}

	let imageBuffers=await screenshot(url, viewport);//截圖三個系統的波浪預報

	let imageLinks=[];
	//upload image via buffer
	for(let i=0;i<imageBuffers.length;i++){
		let response=await client.upload({
			image: imageBuffers[i],
			type: 'stream',
		});
		imageLinks.push(response.data.link);
	}

	let imageObjectArray=imageLinks.map(imageLink=>({
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
	};
}
