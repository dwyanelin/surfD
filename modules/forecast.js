/*
先顯示windy三個系統的小圖預報，
並附上label跟message action，去觸發單一系統的大圖預報（三個大圖會系統超時）

1.地點
2.小圖大圖
3.哪個系統
*/

////加入MSW
////加入瑪神預報
const { ImgurClient }=require('imgur');
const client=new ImgurClient({ clientId: "1f37d55e8774b46" });

const screenshot=require("./screenshot");

module.exports=async (keyword)=>{
	keyword=keyword.replace("預報", "").replace("預", "");
	keyword=keyword.toUpperCase().replace("FORECAST", "").replace("forecast", "");
	//https://www.windy.com/緯度latitude/經度longitude
	////把浪點的gps設定好，帶入windy url

	let url;
	let location;
	if(keyword.includes("雙獅")){
		url="https://www.windy.com/24.889/121.851";
		location="雙獅";
	}
	else if(keyword.includes("臭水")){
		url="https://www.windy.com/24.889/121.851";
		location="臭水";
	}
	else if(keyword.includes("南堤")){
		url="https://www.windy.com/24.889/121.851";
		location="南堤";
	}
	else if(keyword.includes("烏石")||keyword.includes("北堤")){
		url="https://www.windy.com/24.889/121.851";
		location="北堤";
	}
	else if(keyword.includes("外澳")){
		url="https://www.windy.com/24.889/121.851";
		location="外澳";
	}
	else if(keyword.includes("梗枋")){
		url="https://www.windy.com/24.889/121.851";
		location="梗枋";
	}
	else if(keyword.includes("蜜月")||keyword.includes("大溪")){
		url="https://www.windy.com/24.889/121.851";
		location="蜜月";
	}
	else if(keyword.includes("南澳")){
		url="https://www.windy.com/24.889/121.851";
		location="南澳";
	}
	else if(keyword.includes("蘇澳")||keyword.includes("無尾")){
		url="https://www.windy.com/24.889/121.851";
		location="無尾";
	}
	else if(keyword.includes("貢寮")||keyword.includes("福隆")){
		url="https://www.windy.com/24.889/121.851";
		location="福隆";
	}
	else if(keyword.includes("金沙")){
		url="https://www.windy.com/24.889/121.851";
		location="金沙";
	}
	else if(keyword.includes("萬里")){
		url="https://www.windy.com/24.889/121.851";
		location="萬里";
	}
	else if(keyword.includes("翡翠")){
		url="https://www.windy.com/24.889/121.851";
		location="翡翠";
	}
	else if(keyword.includes("龜吼")){
		url="https://www.windy.com/24.889/121.851";
		location="龜吼";
	}
	else if(keyword.includes("金山")||keyword.includes("磺港")){
		url="https://www.windy.com/24.889/121.851";
		location="磺港";
	}
	else if(keyword.includes("中角")){
		url="https://www.windy.com/24.889/121.851";
		location="中角";
	}
	else if(keyword.includes("石門")||keyword.includes("餐廳")){
		url="https://www.windy.com/24.889/121.851";
		location="餐廳";
	}
	else if(keyword.includes("環保")){
		url="https://www.windy.com/24.889/121.851";
		location="環保";
	}
	else if(keyword.includes("北濱")){
		url="https://www.windy.com/24.889/121.851";
		location="北濱";
	}
	else if(keyword.includes("壽豐")||keyword.includes("雙橋")){
		url="https://www.windy.com/24.889/121.851";
		location="雙橋";
	}
	else if(keyword.includes("豐濱")||keyword.includes("磯崎")){
		url="https://www.windy.com/24.889/121.851";
		location="磯崎";
	}
	else if(keyword.includes("長濱")||keyword.includes("八仙洞")){
		url="https://www.windy.com/24.889/121.851";
		location="八仙洞";
	}
	else if(keyword.includes("宜灣")){
		url="https://www.windy.com/24.889/121.851";
		location="宜灣";
	}
	else if(keyword.includes("成功")||keyword.includes("基翬")){
		url="https://www.windy.com/24.889/121.851";
		location="成功";
	}
	else if(keyword.includes("都歷")){
		url="https://www.windy.com/24.889/121.851";
		location="都歷";
	}
	else if(keyword.includes("北東")){
		url="https://www.windy.com/24.889/121.851";
		location="北東";
	}
	else if(keyword.includes("南東")){
		url="https://www.windy.com/24.889/121.851";
		location="南東";
	}
	else if(keyword.includes("東河")||keyword.includes("河口")){
		url="https://www.windy.com/24.889/121.851";
		location="東河口";
	}
	else if(keyword.includes("金樽左")){
		url="https://www.windy.com/24.889/121.851";
		location="金樽左";
	}
	else if(keyword.includes("金樽")){
		url="https://www.windy.com/24.889/121.851";
		location="金樽";
	}
	else if(keyword.includes("小漁港")){
		url="https://www.windy.com/24.889/121.851";
		location="小漁港";
	}
	else if(keyword.includes("都蘭")){
		url="https://www.windy.com/24.889/121.851";
		location="都蘭";
	}
	else if(keyword.includes("佳樂水")){
		url="https://www.windy.com/24.889/121.851";
		location="佳樂水";
	}
	else if(keyword.includes("大灣")){
		url="https://www.windy.com/24.889/121.851";
		location="大灣";
	}
	else if(keyword.includes("港仔")){////這的地點有待商榷
		url="https://www.windy.com/24.889/121.851";
		location="港仔";
	}
	else if(keyword.includes("恆春")||keyword.includes("南灣")||keyword.includes("獅頭")){
		url="https://www.windy.com/24.889/121.851";
		location="南灣";
	}
	else if(keyword.includes("旗津")){
		url="https://www.windy.com/24.889/121.851";
		location="旗津";
	}
	else if(keyword.includes("安平")||keyword.includes("漁光")){
		url="https://www.windy.com/24.889/121.851";
		location="漁光";
	}
	else if(keyword.includes("大甲")||keyword.includes("松柏港")){
		url="https://www.windy.com/24.889/121.851";
		location="松柏港";
	}
	else if(keyword.includes("後龍")||keyword.includes("外埔")){
		url="https://www.windy.com/24.889/121.851";
		location="外埔";
	}
	else{
		return {"type":"text", "text":""};
	}

	let viewport;
	let system;
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
	}
	else{
		viewport="小";
	}

	let imageBuffers=await screenshot(url, viewport, system);//截圖三個系統的波浪預報

	let imageLinks=[];
	//upload image via buffer
	for(let i=0;i<imageBuffers.length;i++){
		let response=await client.upload({
			image: imageBuffers[i],
			type: 'stream'
		});
		imageLinks.push(response.data.link);
	}

	if(viewport==="大"){
		return {
			"type": "image",
			"originalContentUrl": imageLinks[0],
			"previewImageUrl": imageLinks[0]
		}
	}
	else{
		return {
			"type": "template",
			"altText": location+"windy預報",
			"template": {
				"type": "image_carousel",
				"columns": [{
					"imageUrl": imageLinks[0],
					"action": {
						"type": "message",
						"label": "預報"+location+"ECMWF",
						"text": "預報"+location+"E"
					}
				},
				{
					"imageUrl": imageLinks[1],
					"action": {
						"type": "message",
						"label": "預報"+location+"GFS",
						"text": "預報"+location+"G"
					}
				},
				{
					"imageUrl": imageLinks[2],
					"action": {
						"type": "message",
						"label": "預報"+location+"ICON",
						"text": "預報"+location+"I"
					}
				}]
			}
		};
	}

	let imageObjectArray=imageLinks.map(imageLink=>({//覺得有更好的流程
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
