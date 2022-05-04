module.exports={
	"size": {
		"width": 1080,
		"height": 728
	},
	"selected": true,
	"name": "surfD richmenu",
	"chatBarText": "功能說明",
	"areas": [{//區塊1：
		"bounds": {
			"x": 0,
			"y": 0,
			"width": 360,
			"height": 364
		},
		"action": {
			"type": "message",
			"label": "使用教學",
			"text": "help"
		}
	},
	{//區塊2：
		"bounds": {
			"x": 361,
			"y": 0,
			"width": 360,
			"height": 364
		},
		"action": {
			"type": "message",
			"label": "觸發Forecast(預報)使用說明",
			"text": "/F"
		}
	},
	{//區塊3：
		"bounds": {
			"x": 721,
			"y": 0,
			"width": 360,
			"height": 364
		},
		"action": {
			"type": "message",
			"label": "觸發Tide(潮汐)使用說明",
			"text": "/T"
		}
	},
	{//區塊4：
		"bounds": {
			"x": 0,
			"y": 365,
			"width": 360,
			"height": 364
		},
		"action": {
			"type": "message",
			"label": "觸發Live(直播)使用說明",
			"text": "/L"
		}
	},
	{//區塊5：
		"bounds": {
			"x": 361,
			"y": 365,
			"width": 360,
			"height": 364
		},
		"action": {
			"type": "message",
			"label": "觸發Store(店家)使用說明",
			"text": "/S"
		}
	},
	{//區塊6：
		"bounds": {
			"x": 721,
			"y": 365,
			"width": 360,
			"height": 364
		},
		"action": {
			"type": "message",
			"label": "這樣Tide危險～",
			"text": "~Tide"
		}
	}]
};
