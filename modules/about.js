/*
5ac21d59031a6752fb806d5d outdoor貼圖
151衝浪
164太陽
173衝浪板
191椰子樹
192海邊椰子樹夕陽

5ac21184040ab15980c9b43a
089獅子
192海浪
203滿月
213海面日出
225太陽
*/

module.exports={
	forecast:{
		"type": "text",
		"text": "查詢預報的標準格式為：\n「F(Forecast)或預(預報)」+「浪點」+(可不填)「A(All windy 3個預報系統)或E(ECMWF系統)或G(GFS系統)或I(ICON系統)」\n\n例如：\n「F北堤」、「預佳樂水A」、「F漁光E」\n\n陸續增加全台浪點",
		/*"emojis": [{
			"index": 0,//在字串中的index
			"productId": "5ac21d59031a6752fb806d5d",
			"emojiId": "164"//outdoor太陽
		},{
			"index": 23,//在字串中的index
			"productId": "5ac21184040ab15980c9b43a",
			"emojiId": "089"//獅子
		},{
			"index": 24,//在字串中的index
			"productId": "5ac21184040ab15980c9b43a",
			"emojiId": "089"//獅子
		},{
			"index": 27,//在字串中的index
			"productId": "5ac21184040ab15980c9b43a",
			"emojiId": "192"//海浪
		},{
			"index": 44,//在字串中的index
			"productId": "5ac21d59031a6752fb806d5d",
			"emojiId": "192"//outdoor海邊椰子樹夕陽
		},{
			"index": 61,//在字串中的index
			"productId": "5ac21d59031a6752fb806d5d",
			"emojiId": "151"//outdoor衝浪
		}],*/
		"wrap": true
	},
	tide:{
		"type": "text",
		"text": "查詢潮汐的標準格式為：\n「T(Tide)或潮(潮汐)」+「浪點」+(可不填)「天數」\n\n例如：\n「T翡翠」、「潮環保5」\n\n陸續增加全台浪點",
		"wrap": true
	},
	live:{
		"type": "text",
		"text": "查詢直播的標準格式為：\n「L(Live)或直(直播)」+「浪點」\n\n例如：\n「L金樽」、「直南灣」\n\n目前有直播的浪點為：\n金樽、杉原、南灣，陸續增加中",
		"wrap": true
	},
	store:{
		"type": "text",
		"text": "查詢店家的標準格式為：\n「S(Store)或店(店家)」+「店名」\n\n例如：\n「Snamiaru」\n\n如店家想新增您的店家資訊，請備妥以下資訊：\n店名、店家封面圖網址(比例16:9)、店家官網網址、地址、電話、email、line ID、IG網址、FB網址\n並email至：\ntest@gmail.com\n\n收到後將盡速新增！",
		"wrap": true
	}
};
