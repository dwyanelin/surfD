const axios=require('axios');
const cheerio=require('cheerio');

const options={
	headers: {
		'accept-language': ' zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		'user-agent': ' Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
	}
};

(async ()=>{
	let res=await axios.get("https://www.cwb.gov.tw/V8/C/M/Fishery/tide_30day_MOD/T000204.html", options);
		const $=cheerio.load(res.data);
		let tideDifference=$($(".orange-text").get(0)).text();
		console.log(tideDifference);
})();
