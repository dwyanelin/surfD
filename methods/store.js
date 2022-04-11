module.exports=(keyword)=>{
	keyword=keyword.replace("店", "");
	keyword=keyword.replace("S", "").replace("s", "");

	////google評分class="Aq14fc"
	if(keyword.includes("namiaru")){
		echo={
			"type": "flex",
			"altText": "namiarusurfstudio",
			"contents": {
				"type": "bubble",
				"hero": {
					"type": "image",
					"url": "https://namiaru.yibnb.com/images/bg.jpg",
					"size": "full",
					"aspectRatio": "20:13",
					"aspectMode": "cover",
					"action": {
						"type": "uri",
						"uri": "https://namiaru.yibnb.com/"
					}
				},
				"body": {
					"type": "box",
					"layout": "vertical",
					"contents": [{
						"type": "text",
						"text": "namiarusurfstudio",
						"weight": "bold",
						"size": "xl"
					},
					{
						"type": "box",
						"layout": "baseline",
						"margin": "md",
						"contents": [{
							"type": "icon",
							"size": "sm",
							"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
						},
						{
							"type": "icon",
							"size": "sm",
							"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
						},
						{
							"type": "icon",
							"size": "sm",
							"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
						},
						{
							"type": "icon",
							"size": "sm",
							"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
						},
						{
							"type": "icon",
							"size": "sm",
							"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
						},
						{
							"type": "text",
							"text": "4.6",
							"size": "sm",
							"color": "#999999",
							"margin": "md",
							"flex": 0
						}]
					},
					{
						"type": "box",
						"layout": "vertical",
						"margin": "lg",
						"spacing": "sm",
						"contents": [{
							"type": "box",
							"layout": "baseline",
							"spacing": "sm",
							"contents": [{
								"type": "text",
								"text": "地址",
								"color": "#aaaaaa",
								"size": "sm",
								"flex": 1
							},
							{
								"type": "text",
								"text": "宜蘭縣頭城鎮環鎮東路二段668巷",
								"wrap": true,
								"color": "#666666",
								"size": "sm",
								"flex": 5
							}]
						},
						{
							"type": "box",
							"layout": "baseline",
							"spacing": "sm",
							"contents": [{
								"type": "text",
								"text": "電話",
								"color": "#aaaaaa",
								"size": "sm",
								"flex": 1
							},
							{
								"type": "text",
								"text": "0968-369853",
								"wrap": true,
								"color": "#666666",
								"size": "sm",
								"flex": 5
							}]
						},
						{
							"type": "box",
							"layout": "baseline",
							"spacing": "sm",
							"contents": [{
								"type": "text",
								"text": "信箱",
								"color": "#aaaaaa",
								"size": "sm",
								"flex": 1
							},
							{
								"type": "text",
								"text": "namiarusurfstudio@gmail.com",
								"wrap": true,
								"color": "#666666",
								"size": "sm",
								"flex": 5
							}]
						}]
					}]
				},
				"footer": {
					"type": "box",
					"layout": "vertical",
					"spacing": "sm",
					"contents": [{
						"type": "button",
						"style": "link",
						"height": "sm",
						"action": {
							"type": "uri",
							"label": "Line",
							"uri": "https://line.me/R/ti/p/%40420msvqa"
						}
					},
					{
						"type": "button",
						"style": "link",
						"height": "sm",
						"action": {
							"type": "uri",
							"label": "Instagram",
							"uri": "https://www.instagram.com/namiarusurfstudio/"
						}
					},
					{
						"type": "button",
						"style": "link",
						"height": "sm",
						"action": {
							"type": "uri",
							"label": "Facebook",
							"uri": "https://www.facebook.com/808387692583232"
						}
					}]
				}
			}
		};
	}
	else if(keyword.includes("一間")||keyword.includes("有間")){
		echo={
			"type": "flex",
			"altText": "一間衝浪店",
			"contents": {
				"type": "bubble",
				"hero": {
					"type": "image",
					"url": "https://scontent.ftpe8-1.fna.fbcdn.net/v/t39.30808-6/275676027_5418329274922361_5012254170367866697_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=a26aad&_nc_ohc=HAhkSQGKLZAAX9aqdRM&_nc_ht=scontent.ftpe8-1.fna&oh=00_AT9K_K5kpGPUvwtwAhXBlPigf3nWdEvSeZZOWt4BK6zadw&oe=6253F466",
					"size": "full",
					"aspectRatio": "20:13",
					"aspectMode": "cover",
					"action": {
						"type": "uri",
						"uri": "https://www.facebook.com/aloha.hisurf/"
					}
				},
				"body": {
					"type": "box",
					"layout": "vertical",
					"contents": [{
						"type": "text",
						"text": "一間衝浪店",
						"weight": "bold",
						"size": "xl"
					},
					{
						"type": "box",
						"layout": "baseline",
						"margin": "md",
						"contents": [{
							"type": "icon",
							"size": "sm",
							"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
						},
						{
							"type": "icon",
							"size": "sm",
							"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
						},
						{
							"type": "icon",
							"size": "sm",
							"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
						},
						{
							"type": "icon",
							"size": "sm",
							"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
						},
						{
							"type": "icon",
							"size": "sm",
							"url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
						},
						{
							"type": "text",
							"text": "4.4",
							"size": "sm",
							"color": "#999999",
							"margin": "md",
							"flex": 0
						}]
					},
					{
						"type": "box",
						"layout": "vertical",
						"margin": "lg",
						"spacing": "sm",
						"contents": [{
							"type": "box",
							"layout": "baseline",
							"spacing": "sm",
							"contents": [{
								"type": "text",
								"text": "地址",
								"color": "#aaaaaa",
								"size": "sm",
								"flex": 1
							},
							{
								"type": "text",
								"text": "宜蘭縣頭城鎮濱海路二段332巷29-1號",
								"wrap": true,
								"color": "#666666",
								"size": "sm",
								"flex": 5
							}]
						},
						{
							"type": "box",
							"layout": "baseline",
							"spacing": "sm",
							"contents": [{
								"type": "text",
								"text": "電話",
								"color": "#aaaaaa",
								"size": "sm",
								"flex": 1
							},
							{
								"type": "text",
								"text": "03 977 7517",
								"wrap": true,
								"color": "#666666",
								"size": "sm",
								"flex": 5
							}]
						},
						{
							"type": "box",
							"layout": "baseline",
							"spacing": "sm",
							"contents": [{
								"type": "text",
								"text": "信箱",
								"color": "#aaaaaa",
								"size": "sm",
								"flex": 1
							},
							{
								"type": "text",
								"text": "namiarusurfstudio@gmail.com",
								"wrap": true,
								"color": "#666666",
								"size": "sm",
								"flex": 5
							}]
						}]
					}]
				},
				"footer": {
					"type": "box",
					"layout": "vertical",
					"spacing": "sm",
					"contents": [{
						"type": "button",
						"style": "link",
						"height": "sm",
						"action": {
							"type": "uri",
							"label": "Line",
							"uri": "https://line.me/R/ti/p/%40420msvqa"
						}
					},
					{
						"type": "button",
						"style": "link",
						"height": "sm",
						"action": {
							"type": "uri",
							"label": "Instagram",
							"uri": "https://www.instagram.com/namiarusurfstudio/"
						}
					},
					{
						"type": "button",
						"style": "link",
						"height": "sm",
						"action": {
							"type": "uri",
							"label": "Facebook",
							"uri": "https://www.facebook.com/aloha.hisurf/"
						}
					}]
				}
			}
		};
	}

	return echo;
}