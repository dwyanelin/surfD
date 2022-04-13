module.exports=(keyword)=>{
	keyword=keyword.replace("直", "");
	keyword=keyword.replace("L", "").replace("l", "");
	let echo;
	if(keyword.includes("金樽")){
		echo={"type":"text", "text":"https://www.youtube.com/watch?v=q3KJt-SZc2s"};
	}
	else if(keyword.includes("多良")){
		echo={"type":"text", "text":"https://www.youtube.com/watch?v=UCG1aXVO8H8"};
	}
	else if(keyword.includes("天堂路")){
		echo={"type":"text", "text":"https://www.youtube.com/watch?v=WA7GEXVGAP0"};
	}
	else if(keyword.includes("杉原")){
		echo={"type":"text", "text":"https://www.youtube.com/watch?v=VqS_Y8ZCj6M"};
	}
	else if(keyword.includes("富山")){
		echo={"type":"text", "text":"https://www.youtube.com/watch?v=Rsq95SQ26bY"};
	}
	else if(keyword.includes("南灣")){
		echo={"type":"text", "text":"https://www.youtube.com/watch?v=HRTtPjFsE9s"};
	}
	else if(keyword.includes("萬里桐")){
		echo={"type":"text", "text":"https://www.youtube.com/watch?v=xy_KZDsRYTU"};
	}
	else{
		echo={"type":"text", "text":"https://swelleye.com/pro/"};
	}

	return echo;
}