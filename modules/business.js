const businessFlexMessage=require("./businessFlexMessage");
const businessInformation=require("./businessInformation");

module.exports=(keyword)=>{
	keyword=keyword.replace("店家", "").replace("店", "");
	keyword=keyword.toUpperCase().replace("BUSINESS", "").replace("B", "");

	////google評分class="Aq14fc"
	////評分改google搜尋？
	if(/namiaru|有浪/i.test(keyword)){
		return businessFlexMessage(businessInformation.NamiaruSurfStudio);
	}
	else if(/一間|有間|surfshop/i.test(keyword)){
		return businessFlexMessage(businessInformation.一間衝浪店);
	}
	else if(/浪花舞|wavedance/i.test(keyword)){
		return businessFlexMessage(businessInformation.浪花舞);
	}
	else if(/吉鵝|jill/i.test(keyword)){
		return businessFlexMessage(businessInformation.吉鵝的瑜浪情節);
	}
	else if(/外澳飯|waiao/i.test(keyword)){
		return businessFlexMessage(businessInformation.外澳飯);
	}
	else if(/refresh|海邊計畫/i.test(keyword)){
		return businessFlexMessage(businessInformation.TheRefresh);
	}
	else if(/j\.shoot|jshoot|j\.攝|j攝/i.test(keyword)){
		return businessFlexMessage(businessInformation["J.Shoot"]);
	}
	else if(/(?<!金樽)衝浪小屋|surferhouse/i.test(keyword)){
		return businessFlexMessage(businessInformation.衝浪小屋);
	}
	else if(/好享|oceanvibes/i.test(keyword)){
		return businessFlexMessage(businessInformation.好享衝浪);
	}
	else if(/ride/i.test(keyword)){
		return businessFlexMessage(businessInformation.RideToRideSurf);
	}
	else if(/衝浪客棧|surferinn/i.test(keyword)){
		return businessFlexMessage(businessInformation.SurferInn);
	}
	else if(/海盜|pirate/i.test(keyword)){
		return businessFlexMessage(businessInformation.海盜衝浪);
	}
	else if(/國度|surfernation/i.test(keyword)){
		return businessFlexMessage(businessInformation.衝浪國度);
	}
	else if(/地球人|beingsurf/i.test(keyword)){
		return businessFlexMessage(businessInformation.地球人衝浪);
	}
	else if(/貝貝|baybay/i.test(keyword)){
		return businessFlexMessage(businessInformation.貝貝);
	}
	else if(/安東尼|anthony/i.test(keyword)){
		return businessFlexMessage(businessInformation.安東尼海灘小屋);
	}
	else if(/狂衝浪|bravesurf/i.test(keyword)){
		return businessFlexMessage(businessInformation.狂衝浪);
	}
	else if(/金樽衝浪小屋|jinzunsurf/i.test(keyword)){
		return businessFlexMessage(businessInformation.金樽衝浪小屋);
	}
	else if(/夏日波影|summerpoint/i.test(keyword)){
		return businessFlexMessage(businessInformation.Summerpoint);
	}
	else if(/一舟|onboard/i.test(keyword)){
		return businessFlexMessage(businessInformation.一舟浪館);
	}
	else if(/草分木|yellows/i.test(keyword)){
		return businessFlexMessage(businessInformation["草分木B&B"]);
	}
	else if(/小浪館|kneehigh/i.test(keyword)){
		return businessFlexMessage(businessInformation.小浪館);
	}
	else if(/daya/i.test(keyword)){
		return businessFlexMessage(businessInformation.DAYA);
	}
	else if(/鳳梨|pineapple/i.test(keyword)){
		return businessFlexMessage(businessInformation.PineappleSurfboardsTaiwan);
	}
	else if(/浪點衝浪|surfspot/i.test(keyword)){
		return businessFlexMessage(businessInformation.浪點衝浪民宿);
	}
	/*else if(keyword.includes("豆你丸")||keyword.includes("逗你丸")||keyword.includes("豆你玩")||keyword.includes("逗你玩")){
		return businessFlexMessage(businessInformation.豆你丸);
	}*/
	else{
		return {"type": "text", "text": ""};
	}
}