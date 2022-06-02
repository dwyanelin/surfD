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
		"text": "查詢預報$的格式：\nW+浪點+(可不填)「A(All)或G(GFS)或I(ICON)」\nM+浪點+(可不填)「天數1~7」\n\n例如：\n「W雙獅」、「W佳樂水A」、「M金樽」、「M翡翠3」\n\n陸續增加全台浪點$",
		"emojis": [{
			"index": 4,//在字串中的index
			"productId": "5ac21d59031a6752fb806d5d",
			"emojiId": "164"//outdoor太陽
		},{
			"index": 103,//在字串中的index
			"productId": "5ac21184040ab15980c9b43a",
			"emojiId": "192"//海浪
		}],
		"wrap": true
	},
	tide:{
		"type": "text",
		"text": "查詢潮汐$的格式：\nT+浪點+(可不填)「天數」\n\n例如：\n「T蜜月」、「T北堤5」\n\n陸續增加全台浪點$",
		"emojis": [{
			"index": 4,//在字串中的index
			"productId": "5ac21184040ab15980c9b43a",
			"emojiId": "192"//海浪
		},{
			"index": 52,//在字串中的index
			"productId": "5ac21184040ab15980c9b43a",
			"emojiId": "192"//海浪
		}],
		"wrap": true
	},
	live:{
		"type": "text",
		"text": "查詢直播$的格式：\nL+浪點\n\n例如：\n「L金樽」、「L南灣」\n\n目前有直播的浪點為：\n金樽、杉原灣、南灣，陸續增加全台浪點$",
		"emojis": [{
			"index": 4,//在字串中的index
			"productId": "5ac21d59031a6752fb806d5d",
			"emojiId": "192"//outdoor海邊椰子樹夕陽
		},{
			"index": 62,//在字串中的index
			"productId": "5ac21184040ab15980c9b43a",
			"emojiId": "192"//海浪
		}],
		"wrap": true
	},
	store:{
		"type": "text",
		"text": "查詢店家$的格式：\nS+店名\n\n例如：\n「Snamiaru」\n\n如店家想在此新增您的店家資訊，請備妥以下資訊：\n店名、地址、電話、(以下可不提供)店家封面圖網址(比例接近16:9)、店家官網網址、email、line ID、IG網址、FB網址\n並email至：\ntest@gmail.com\n\n收到後將定期新增！",
		"emojis": [{
			"index": 4,//在字串中的index
			"productId": "5ac21d59031a6752fb806d5d",
			"emojiId": "151"//outdoor衝浪
		}],
		"wrap": true
	}
};
