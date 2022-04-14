const { ImgurClient }=require('imgur');
const client=new ImgurClient({ clientId: "1f37d55e8774b46" });

const screenshot=require("./screenshot");

module.exports=async (keyword)=>{
	keyword=keyword.replace("預", "");
	keyword=keyword.replace("F", "").replace("f", "");
	//https://www.windy.com/緯度latitude/經度longitude
	////把浪點的gps設定好，帶入windy url
	////要設定成繁體中文//

	let url;
	if(keyword.includes("雙獅")){
		url="https://www.windy.com/24.888/121.851";
	}
	else{
		url="https://www.windy.com/24.888/121.851";
	}

	let viewport;
	if(keyword.includes("小")){
		viewport="小";
	}
	else{
		viewport="大";
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

	return {
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
