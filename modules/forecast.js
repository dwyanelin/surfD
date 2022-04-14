const { ImgurClient }=require('imgur');
const client=new ImgurClient({ clientId: process.env.clientId });

const screenshot=require("./screenshot");

module.exports=async (keyword)=>{
	keyword=keyword.replace("預", "");
	keyword=keyword.replace("F", "").replace("f", "");
	//https://www.windy.com/緯度latitude/經度longitude
	////把浪點的gps設定好，帶入windy url
	////要設定成繁體中文

	let url;
	if(keyword.includes("雙獅")){
		url="https://www.windy.com/24.888/121.851";
	}
	else{
		url="https://www.windy.com/24.888/121.851";
	}

	let imageBuffers=await screenshot(url);//截圖三個系統的波浪預報

	let imageLinks=[];
	//upload image via buffer
	for(let i=0;i<imageBuffers.length;i++){
		let response=await client.upload({
			image: imageBuffers[i],
			type: 'stream',
		});
		imageLinks.push(response.data.link);
	}

	return {
		"type": "flex",
		"altText": "浪點預報",
		"contents": {
			"type": "carousel",
			"contents": [{
				"type": "bubble",
				"hero": {
					"type": "image",
					"url": imageLinks[0],
					"size": "full",
					"aspectRatio": "16:9",
					"aspectMode": "cover"
				}
			},
			{
				"type": "bubble",
				"hero": {
					"type": "image",
					"url": imageLinks[1],
					"size": "full",
					"aspectRatio": "16:9",
					"aspectMode": "cover"
				}
			},
			{
				"type": "bubble",
				"hero": {
					"type": "image",
					"url": imageLinks[2],
					"size": "full",
					"aspectRatio": "16:9",
					"aspectMode": "cover"
				}
			}]
		}
	};
}
