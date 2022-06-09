/*
到中央氣象局衝浪網頁：https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O004，
跑完網頁之後擷取class="GT_Sunrise", class="GT_Sunset"
*/

module.exports=async (keyword, browser)=>{
	keyword=keyword.replace("日出", "").replace("日落", "").replace("日", "");
	keyword=keyword.toUpperCase().replace("SUN", "").replace("S", "");

	let url;
	let location;
	if(keyword.includes("雙獅")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O004";
		location="雙獅";
	}
	else if(keyword.includes("臭水")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O004";
		location="臭水";
	}
	else if(keyword.includes("南堤")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O004";
		location="南堤";
	}
	else if(keyword.includes("烏石")||keyword.includes("北堤")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O004";
		location="北堤";
	}
	else if(keyword.includes("外澳")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O004";
		location="外澳";
	}
	else if(keyword.includes("梗枋")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O004";
		location="梗枋";
	}
	else if(keyword.includes("蜜月")||keyword.includes("大溪")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O004";
		location="蜜月";
	}
	else if(keyword.includes("南澳")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O004";
		location="南澳";
	}
	else if(keyword.includes("蘇澳")||keyword.includes("無尾")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O004";
		location="無尾";
	}
	else if(keyword.includes("貢寮")||keyword.includes("福隆")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O003";
		location="福隆";
	}
	else if(keyword.includes("金沙")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O003";
		location="金沙";
	}
	else if(keyword.includes("萬里")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O002";
		location="萬里";
	}
	else if(keyword.includes("翡翠")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O002";
		location="翡翠";
	}
	else if(keyword.includes("龜吼")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O002";
		location="龜吼";
	}
	else if(keyword.includes("金山")||keyword.includes("磺港")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O001";
		location="磺港";
	}
	else if(keyword.includes("中角")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O001";
		location="中角";
	}
	else if(keyword.includes("石門")||keyword.includes("餐廳")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O001";
		location="餐廳";
	}
	/*else if(keyword.includes("環保")){
		url="https://www.windy.com/24.008/121.647";
		location="環保";
	}
	else if(keyword.includes("北濱")){
		url="https://www.windy.com/23.977/121.620";
		location="北濱";
	}
	else if(keyword.includes("壽豐")||keyword.includes("雙橋")){
		url="https://www.windy.com/23.852/121.595";
		location="雙橋";
	}
	else if(keyword.includes("豐濱")||keyword.includes("磯崎")){
		url="https://www.windy.com/23.701/121.550";
		location="磯崎";
	}
	else if(keyword.includes("長濱")||keyword.includes("八仙洞")){
		url="https://www.windy.com/23.396/121.480";
		location="八仙洞";
	}
	else if(keyword.includes("宜灣")){
		url="https://www.windy.com/23.208/121.400";
		location="宜灣";
	}
	else if(keyword.includes("成功")||keyword.includes("基翬")){
		url="https://www.windy.com/23.115/121.396";
		location="成功";
	}
	else if(keyword.includes("都歷")){
		url="https://www.windy.com/23.021/121.336";
		location="都歷";
	}
	else if(keyword.includes("北東")){
		url="https://www.windy.com/22.975/121.314";
		location="北東";
	}
	else if(keyword.includes("南東")){////跟東河口可以再細分
		url="https://www.windy.com/22.973/121.313";
		location="南東";
	}
	else if(keyword.includes("東河")||keyword.includes("河口")){
		url="https://www.windy.com/22.973/121.313";
		location="東河口";
	}
	else if(keyword.includes("金樽左")){////跟金樽可以再細分
		url="https://www.windy.com/22.955/121.296";
		location="金樽左";
	}
	else if(keyword.includes("金樽")){
		url="https://www.windy.com/22.955/121.296";
		location="金樽";
	}
	else if(keyword.includes("小漁港")){
		url="https://www.windy.com/22.953/121.291";
		location="小漁港";
	}
	else if(keyword.includes("都蘭")){
		url="https://www.windy.com/22.876/121.238";
		location="都蘭";
	}*/
	else if(keyword.includes("佳樂水")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O010";
		location="佳樂水";
	}
	else if(keyword.includes("大灣")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O008";
		location="大灣";
	}
	else if(keyword.includes("港仔")){////這的地點有待商榷，可跟獅頭再細分
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O007";
		location="港仔";
	}
	else if(keyword.includes("恆春")||keyword.includes("南灣")||keyword.includes("獅頭")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O007";
		location="南灣";
	}
	else if(keyword.toUpperCase().includes("AK")){//颱風管浪barrel高級浪點
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O007";
		location="AK";
	}
	/*else if(keyword.includes("旗津")){
		url="https://www.windy.com/22.610/120.265";
		location="旗津";
	}
	else if(keyword.includes("安平")||keyword.includes("漁光")){
		url="https://www.windy.com/22.980/120.153";
		location="漁光";
	}*/
	else if(keyword.includes("大甲")||keyword.includes("松柏")){
		url="https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O005";
		location="松柏港";
	}
	/*else if(keyword.includes("後龍")||keyword.includes("外埔")){
		url="https://www.windy.com/24.636/120.759";
		location="外埔";
	}*/
	else{
		return {"type":"text", "text":""};
	}

	let page;
	try{
		page=await browser.newPage();
		let pages=await browser.pages();
		//console.log(pages);
		console.log("browser開啟的page數量(sun)："+pages.length);

		//Set the language forcefully on javascript
		await page.evaluateOnNewDocument(() => {
			Object.defineProperty(navigator, "language", {
				get: function() {
					return "zh-TW";
				}
			});
			Object.defineProperty(navigator, "languages", {
				get: function() {
					return ["zh-TW"];
				}
			});
		});

		await page.goto(url, {"waitUntil": "networkidle0"});

		const sunrise=await page.$('[class="GT_Sunrise"]');
		const sunset=await page.$('[class="GT_Sunset"]');

		let sunriseTimeString=await sunrise.evaluate(el=>el.textContent);
		let sunsetTimeString=await sunset.evaluate(el=>el.textContent);

		await page.close();
		return {
			"type":"text",
			"text":location+"$\n日出$："+sunriseTimeString+"\n日落$："+sunsetTimeString,
			"emojis": [{
				"index": location.length,//在字串中的index
				"productId": "5ac21184040ab15980c9b43a",
				"emojiId": "225"//太陽
			},{
				"index": location.length+4,//在字串中的index
				"productId": "5ac21184040ab15980c9b43a",
				"emojiId": "213"//海面日出
			},{
				"index": location.length+14,//在字串中的index
				"productId": "5ac21d59031a6752fb806d5d",
				"emojiId": "192"//outdoor海邊椰子樹夕陽
			}],
			"wrap": true
		};
	}
	catch(error){
		//可能執行超時30秒會跑來這
		if(typeof page!=="undefined"&&page.isClosed()===false){
			//剛開伺服器就跑指令，browser還沒開好page就會是undefined
			//要先檢查page還沒被關掉，再去關他才不會錯誤
			console.log("抓日出日落時間失敗："+location);
			console.log("error await page.close();");
			console.log("===========================");
			await page.close();
		}
		console.log(error);
		console.log("===========================");
	}
	finally {
		console.log("finally");
		console.log("===========================");
		//await page.close();//總是在try結束後關閉browser
	}
};
