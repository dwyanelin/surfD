const axios=require('axios');
const options={
	headers: {
		'accept-language': ' zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		'user-agent': ' Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
	}
}
const cheerio=require('cheerio');

module.exports=async (keyword)=>{
	////還要加多天查詢
	keyword=keyword.replace("潮", "");
	keyword=keyword.replace("T", "").replace("t", "");
	let url;
	if(keyword.includes("頭城")||keyword.includes("臭水")||keyword.includes("南堤")||keyword.includes("烏石")||keyword.includes("北堤")||keyword.includes("外澳")||keyword.includes("雙獅")||keyword.includes("梗枋")||keyword.includes("蜜月")||keyword.includes("大溪")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000204.html";
	}
	else if(keyword.includes("南澳")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000212.html";
	}
	else if(keyword.includes("蘇澳")||keyword.includes("無尾")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000203.html";
	}
	else if(keyword.includes("貢寮")||keyword.includes("福隆")||keyword.includes("金沙")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500026.html";
	}
	else if(keyword.includes("萬里")||keyword.includes("翡翠")||keyword.includes("龜吼")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500028.html";
	}
	else if(keyword.includes("金山")||keyword.includes("中角")||keyword.includes("磺港")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500027.html";
	}
	else if(keyword.includes("石門")||keyword.includes("餐廳")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500022.html";
	}
	else if(keyword.includes("花蓮")||keyword.includes("環保")||keyword.includes("北濱")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001501.html";
	}
	else if(keyword.includes("壽豐")||keyword.includes("雙橋")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001506.html";
	}
	else if(keyword.includes("豐濱")||keyword.includes("磯崎")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001508.html";
	}
	else if(keyword.includes("長濱")||keyword.includes("八仙洞")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001408.html";
	}
	else if(keyword.includes("成功")||keyword.includes("宜灣")||keyword.includes("基翬")||keyword.includes("都歷")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001402.html";
	}
	else if(keyword.includes("東河")||keyword.includes("河口")||keyword.includes("金樽")||keyword.includes("小漁港")||keyword.includes("都蘭")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001407.html";
	}
	else if(keyword.includes("恆春")||keyword.includes("佳樂水")||keyword.includes("大灣")||keyword.includes("南灣")||keyword.includes("港仔")||keyword.includes("獅頭")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001304.html";
	}
	else if(keyword.includes("旗津")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T401000.html";
	}
	else if(keyword.includes("安平")||keyword.includes("漁光")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T700036.html";
	}
	else if(keyword.includes("大甲")||keyword.includes("松柏港")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T600011.html";
	}
	else if(keyword.includes("後龍")||keyword.includes("外埔")){
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000506.html";
	}
	else{
		url="https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000204.html";
	}
/*
頭城https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000204.html
臭水、南堤、烏石港、北堤、外澳、雙獅、梗枋、蜜月灣、大溪
南澳https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000212.html
蘇澳https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000203.html
無尾
貢寮https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500026.html
福隆、金沙灣
萬里https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500028.html
翡翠灣、龜吼
金山https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500027.html
中角、磺港
石門https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T500022.html
餐廳
花蓮https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001501.html
環保、北濱
壽豐https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001506.html
雙橋
豐濱https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001508.html
磯崎
長濱https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001408.html
八仙洞、
成功https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001402.html
宜灣、基翬、都歷
東河https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001407.html
北東河、河口、南東河、金樽左、金樽、小漁港、都蘭
恆春https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T001304.html
佳樂水、大灣、南灣、港仔、獅頭、
旗津https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T401000.html
安平https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T700036.html
漁光島
大甲https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T600011.html
松柏港
後龍https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000506.html
外埔
*/

	let res=await axios.get(url, options);
	const $=cheerio.load(res.data);

	let days=keyword.match(/\d+$/);
	if(days===null){
		days=1;
	}

	//地點
	let title=$("h2[class=\"text-center\"]");
	let titles=title.text().split(" ");
	titles=titles.slice(0, 2);
	let locationName=titles.join(" ");

	let text=locationName;

	let previousLast;
	for(let day=1;day<=days;day++){
		//抓日期（星期）+潮差
		let tideDifference=$($(".orange-text").get(day-1)).parent().text();
		tideDifference=tideDifference.replace(" ", "").replace(")", ") ").replace("潮差", " 潮差");
		text+="\n"+tideDifference;

		//抓天數的潮汐
		if(day>1){
			text+=previousLast;
		}

		let tides=$("td[headers=\"day"+day+" tide\"]");
		let times=$("td[headers=\"day"+day+" time\"]");

		for(let i=0;i<tides.length-1;i++){
			text+="\n"+$(tides.get(i)).text()+" "+$(times.get(i)).text();
		}

		previousLast="\n"+$(tides.get(tides.length-1)).text()+" "+$(times.get(tides.length-1)).text();
	}

	return {"type":"text", "text":text, "wrap":true};
};
