const businessFlexMessage=require("./businessFlexMessage");
const businessInformation=require("./businessInformation");

module.exports=(keyword)=>{
	keyword=keyword.replace("店家", "").replace("店", "");
	keyword=keyword.toUpperCase().replace("BUSINESS", "").replace("B", "");

	////google評分class="Aq14fc"
	////評分改google搜尋？
	if(keyword.toLowerCase().includes("namiaru")){
		return businessFlexMessage(businessInformation.namiarusurfstudio);
	}
	else if(keyword.includes("一間")||keyword.includes("有間")){
		return businessFlexMessage(businessInformation.一間衝浪店);
	}
	else if(keyword.includes("浪花舞")||keyword.toLowerCase().includes("wavedance")){
		return businessFlexMessage(businessInformation.浪花舞);
	}
	else if(keyword.includes("吉鵝")||keyword.toLowerCase().includes("jill")){
		return businessFlexMessage(businessInformation.吉鵝);
	}
	else if(keyword.includes("外澳飯")||keyword.toLowerCase().includes("waiao")){
		return businessFlexMessage(businessInformation.外澳飯);
	}
	/*else if(keyword.includes("豆你丸")||keyword.includes("逗你丸")||keyword.includes("豆你玩")||keyword.includes("逗你玩")){
		return businessFlexMessage(businessInformation.豆你丸);
	}*/
	else{
		return {"type": "text", "text": ""};
	}
}