const { ImgurClient }=require('imgur');
const client=new ImgurClient({ clientId: process.env.clientId });

const screenshot=require("./screenshot");

module.exports=async (keyword)=>{
	keyword=keyword.replace("預", "");
	keyword=keyword.replace("F", "").replace("f", "");

	let url;
	if(keyword.includes("雙獅")){
		url="https://windy.com";
	}
	else{
		url="https://windy.com";
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
