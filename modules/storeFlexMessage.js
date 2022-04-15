module.exports=({name, imageUrl, url, address, phone, email, lineId, instagramUrl, facebookUrl})=>{
	return {
		"type": "flex",
		"altText": name+"店家資訊",
		"contents": {
			"type": "bubble",
			"hero": {
				"type": "image",
				"url": imageUrl,
				"size": "full",
				"aspectRatio": "16:9",
				"aspectMode": "cover",
				"action": {
					"type": "uri",
					"uri": url
				}
			},
				"body": {
				"type": "box",
				"layout": "vertical",
				"contents": [{
					"type": "text",
					"text": name,
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
						"text": "5",
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
							"text": address,
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
							"text": phone,
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
							"text": email,
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
						"uri": "https://line.me/R/ti/p/"+encodeURIComponent(lineId)
					}
				},
				{
					"type": "button",
					"style": "link",
					"height": "sm",
					"action": {
						"type": "uri",
						"label": "Instagram",
						"uri": instagramUrl
					}
				},
				{
					"type": "button",
					"style": "link",
					"height": "sm",
					"action": {
						"type": "uri",
						"label": "Facebook",
						"uri": facebookUrl
					}
				}]
			}
		}
	};
}
