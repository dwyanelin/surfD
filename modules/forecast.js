const { ImgurClient }=require('imgur');
const client=new ImgurClient({ clientId: process.env.clientId });

const screenshot=require("./screenshot");

module.exports=async (keyword)=>{
	keyword=keyword.replace("預", "");
	keyword=keyword.replace("F", "").replace("f", "");
	////查地點GPS，帶入windy url
	//https://www.windy.com/lat/lon
	//緯度/經度
	//點波浪，三個系統
	//https://www.windy.com/24.888/121.851

	let url;
	if(keyword.includes("雙獅")){
		url="https://www.windy.com/24.888/121.851";
	}
	else{
		url="https://www.windy.com/24.888/121.851";
	}

	let echo=await screenshot(url);

	//upload image via buffer
	const response=await client.upload({
		image: echo,
		type: 'stream',
	});

	return {
		"type": "image",
		"originalContentUrl": response.data.link,
		"previewImageUrl": response.data.link,
	};
}
