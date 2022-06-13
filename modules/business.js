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
	else if(keyword.toLowerCase().includes("therefresh")){
		return businessFlexMessage(businessInformation.therefresh);
	}
	else if(keyword.includes("j攝")||keyword.toLowerCase().includes("jshoot")){
		return businessFlexMessage(businessInformation.jshoot);
	}
	else if(keyword.includes("衝浪小屋")||keyword.toLowerCase().includes("surferhouse")){
		return businessFlexMessage(businessInformation.surferhouse);
	}
	else if(keyword.includes("好享")){
		return businessFlexMessage(businessInformation.好享衝浪);
	}
	else if(keyword.toLowerCase().includes("ride")){
		return businessFlexMessage(businessInformation.ridetoridesurf);
	}
	else if(keyword.includes("衝浪客棧")||keyword.toLowerCase().includes("surferinn")){
		return businessFlexMessage(businessInformation.surferinn);
	}
	else if(keyword.includes("海盜")||keyword.toLowerCase().includes("pirate")){
		return businessFlexMessage(businessInformation.pirate);
	}
	else if(keyword.includes("國度")||keyword.toLowerCase().includes("surfernation")){
		return businessFlexMessage(businessInformation.surfernation);
	}
	else if(keyword.includes("地球人")){
		return businessFlexMessage(businessInformation.地球人);
	}
	else if(keyword.includes("貝貝")||keyword.toLowerCase().includes("baybay")){
		return businessFlexMessage(businessInformation.貝貝);
	}
	else if(keyword.includes("安東尼")||keyword.toLowerCase().includes("anthony")){
		return businessFlexMessage(businessInformation.安東尼);
	}
	/*else if(keyword.includes("豆你丸")||keyword.includes("逗你丸")||keyword.includes("豆你玩")||keyword.includes("逗你玩")){
		return businessFlexMessage(businessInformation.豆你丸);
	}*/
	else{
		return {"type": "text", "text": ""};
	}
}