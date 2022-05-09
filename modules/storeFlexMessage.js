module.exports=({
	name,
	imageUrl,//可以沒有
	url,//可以沒有
	address,
	phone,
	email,//可以沒有
	lineId,//可以沒有
	instagramUrl,//可以沒有
	facebookUrl//可以沒有
})=>{
	////還要縮小footer button
	////還要想如果沒形象圖，但有官網網址怎麼呈現
	let result;
	eval('result={"type": "flex","altText": "'+name+'"+"店家資訊","contents": {"type": "bubble",'+(imageUrl!==null?'"hero": {"type": "image","url": "'+imageUrl+'","size": "full","aspectRatio": "16:9","aspectMode": "cover"'+(url!==null?',"action": {"type": "uri","uri": "'+url+'"}':'')+'},':'')+'"body": {"type": "box","layout": "vertical","paddingTop": "10px","paddingBottom": "0px","contents": [{"type": "text","text": "'+name+'","weight": "bold","size": "xl"},{"type": "box","layout": "baseline","margin": "md","contents": [{"type": "icon","size": "sm","url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"},{"type": "icon","size": "sm","url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"},{"type": "icon","size": "sm","url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"},{"type": "icon","size": "sm","url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"},{"type": "icon","size": "sm","url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"},{"type": "text","text": "5","size": "sm","color": "#999999","margin": "md","flex": 0}]},{"type": "box","layout": "vertical","margin": "md","spacing": "sm","contents": [{"type": "box","layout": "baseline","spacing": "sm","contents": [{"type": "text","text": "地址","color": "#aaaaaa","size": "sm","flex": 1},{"type": "text","text": "'+address+'","wrap": true,"color": "#666666","size": "sm","flex": 5}]},{"type": "box","layout": "baseline","spacing": "sm","contents": [{"type": "text","text": "電話","color": "#aaaaaa","size": "sm","flex": 1},{"type": "text","text": "'+phone+'","wrap": true,"color": "#666666","size": "sm","flex": 5}]}'+(email!==null?',{"type": "box","layout": "baseline","spacing": "sm","contents": [{"type": "text","text": "信箱","color": "#aaaaaa","size": "sm","flex": 1},{"type": "text","text": "'+email+'","wrap": true,"color": "#666666","size": "sm","flex": 5}]}':'')+']}]}'+(lineId!==null||instagramUrl!==null||facebookUrl!==null?',"footer": {"type": "box","layout": "vertical","paddingTop": "0px","contents": ['+(lineId!==null?'{"type": "button","style": "link","height": "sm","action": {"type": "uri","label": "Line","uri": "https://line.me/R/ti/p/"+"'+encodeURIComponent(lineId)+'"}},':'')+''+(instagramUrl!==null?'{"type": "button","style": "link","height": "sm","action": {"type": "uri","label": "Instagram","uri": "'+instagramUrl+'"}},':'')+''+(facebookUrl!==null?'{"type": "button","style": "link","height": "sm","action": {"type": "uri","label": "Facebook","uri": "'+facebookUrl+'"}}':'')+']}':'')+'}}');
	return result;

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
				"paddingTop": "10px",
				"paddingBottom": "0px",
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
					"margin": "md",
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
				"paddingTop": "0px",
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
