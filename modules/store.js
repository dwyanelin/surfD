const storeFlexMessage=require("./storeFlexMessage");
const storeInformation=require("./storeInformation");

module.exports=(keyword)=>{
	keyword=keyword.replace("店", "");
	keyword=keyword.replace("S", "").replace("s", "");

	////google評分class="Aq14fc"
	////再分離出店家資訊模組
	////評分改google搜尋？
	//(name, imageUrl, url, address, phone, email, lineId, instagramUrl, facebookUrl)
	if(keyword.toLowerCase().includes("namiaru")){
		return storeFlexMessage(storeInformation.namiarusurfstudio);
	}
	else if(keyword.includes("一間")||keyword.includes("有間")){
		return storeFlexMessage(storeInformation.一間衝浪店);
	}
	else{
		return {"type": "text", "text": ""};
	}
}