const storeFlexMessage=require("./storeFlexMessage");
const storeInformation=require("./storeInformation");

module.exports=(keyword)=>{
	keyword=keyword.replace("店", "");
	keyword=keyword.replace("S", "").replace("s", "");

	////google評分class="Aq14fc"
	////評分改google搜尋？
	if(keyword.toLowerCase().includes("namiaru")){
		return storeFlexMessage(storeInformation.namiarusurfstudio);
	}
	else if(keyword.includes("一間")||keyword.includes("有間")){
		return storeFlexMessage(storeInformation.一間衝浪店);
	}
	else if(keyword.includes("豆你丸")||keyword.includes("逗你丸")||keyword.includes("豆你玩")||keyword.includes("逗你玩")){
		return storeFlexMessage(storeInformation.豆你丸);
	}
	else{
		return {"type": "text", "text": ""};
	}
}