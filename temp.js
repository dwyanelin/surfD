/*const axios=require('axios');
const cheerio=require('cheerio');

const options={
	headers: {
		'accept-language': ' zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		'user-agent': ' Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
	}
};

(async ()=>{
	let res=await axios.get("https://www.cwb.gov.tw/V8/C/L/Surfing/Surfing.html?PID=O001", options);
	const $=cheerio.load(res.data);
	let table=$("#Table3hrMMC");
	console.log("===========================");
	console.log($(table).text());
	console.log("===========================");
})();*/


//connecting-heroku-postgres
const {Client}=require('pg');

const clientPostgres=new Client({
	connectionString: "postgres://sxbnpzsyssdmju:35a6034e052b869017573731bc2d483826f1e1a02a658ddc315e3eb14412a940@ec2-54-80-123-146.compute-1.amazonaws.com:5432/djs1c759ff30m",
	ssl: {
		rejectUnauthorized: false
	}
});
clientPostgres.connect();
//connecting-heroku-postgres


//開chrome
const puppeteer=require('puppeteer');
let browser;
//開chrome

const cwb=require("./modules/cwb");

(async ()=>{
	browser=await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	let echo=await cwb("北堤", clientPostgres, browser);

	console.log(typeof echo);
	console.log(echo);
})();
