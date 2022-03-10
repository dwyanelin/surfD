// /client/App.js
import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

//import './css/bootstrap.min.css';
import './css/fastfoodCoupons.css';

class App extends Component{
	state={
		kfcCouponsShow:[],
		pizzahutCouponsShow:[],
		dominosCouponsShow:[],
		napoliCouponsShow:[],

		kfcFilterExpiredActive:false,
		kfcFilterCacheActive:false,
		kfcIncludeActive:[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],//toggle button
		kfcExcludeActive:[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
		kfcCodeInput:"",

		pizzahutFilterExpiredActive:false,
		pizzahutIncludeActive:[false, false, false, false, false, false, false, false],
		pizzahutExcludeActive:[false, false, false, false, false, false, false, false],
		pizzahutCodeInput:"",

		imgKfc:{},
		imgPizzahut:{},
		modalImg:false,
		imgUrl:"",
		imgAlt:"",
	};
	kfcNames=["炸雞", "蛋塔", "地瓜球", "漢堡", "雞塊", "雞米花", "薯條", "飲品", "炸雞2+", "烤雞堡", "咔啦堡", "脆雞堡", "霸王/嫩雞捲", "濃湯"];
	kfcFilterNames=["炸雞", "蛋塔", "瓜球", "堡", "雞塊", "雞米花", "薯", "飲", "炸雞*", "烤雞堡", "咔啦", "脆雞堡", "霸王", "濃湯"];
	pizzahutNames=["雞腿/翅", "鱈魚", "QQ球", "濃湯", "薯星星", "飲料"];
	pizzahutFilterNames=["腿", "鱈魚", "QQ球", "濃湯", "薯星星", "飲"];
	kfcCoupons=[];
	pizzahutCoupons=[];
	dominosCoupons=[];
	napoliCoupons=[];
	kfcIncludeFilters=[];
	kfcExcludeFilters=[];
	pizzahutIncludeFilters=[];
	pizzahutExcludeFilters=[];

	componentDidMount(){
		fetch("/getKfcCoupons")
		.then(res=>res.json())
		.then(kfcCoupons=>{
			this.kfcCoupons=kfcCoupons;
			this.setState({kfcCouponsShow:kfcCoupons});
		})
		.catch(error=>console.log("App.componentDidMount.getKfcCoupons", error));

		fetch("/getPizzahutCoupons")
		.then(res=>res.json())
		.then(pizzahutCoupons=>{
			this.pizzahutCoupons=pizzahutCoupons;
			this.setState({pizzahutCouponsShow:pizzahutCoupons});
		})
		.catch(error=>console.log("App.componentDidMount.getPizzahutCoupons", error));

		fetch("/getDominosCoupons")
		.then(res=>res.json())
		.then(dominosCoupons=>{
			this.dominosCoupons=dominosCoupons;
			this.setState({dominosCouponsShow:dominosCoupons});
		})
		.catch(error=>console.log("App.componentDidMount.getDominosCoupons", error));

		fetch("/getNapoliCoupons")
		.then(res=>res.json())
		.then(napoliCoupons=>{
			this.napoliCoupons=napoliCoupons;
			this.setState({napoliCouponsShow:napoliCoupons});
		})
		.catch(error=>console.log("App.componentDidMount.getNapoliCoupons", error));

		fetch("/getImg")
		.then(res=>res.json())
		.then(img=>this.setState({imgKfc:img.imgKfc, imgPizzahut:img.imgPizzahut}))
		.catch(error=>console.log("App.componentDidMount.getImg", error));
	}

	render(){
		const closeBtn=<button className="close" onClick={this.toggleModalImg}>&times;</button>;

		const {
			kfcCouponsShow,
			pizzahutCouponsShow,
			dominosCouponsShow,
			napoliCouponsShow,

			kfcFilterExpiredActive,
			kfcFilterCacheActive,
			kfcIncludeActive,
			kfcExcludeActive,
			kfcCodeInput,

			pizzahutFilterExpiredActive,
			pizzahutIncludeActive,
			pizzahutExcludeActive,
			pizzahutCodeInput,

			imgKfc,
			imgPizzahut,
			imgUrl,
			imgAlt,
		}=this.state;

		return (
			<Router>
				<div style={{fontFamily:"Helvetica-W01-Light,微軟正黑體,sans-serif", display:"flex", flexDirection:"column", alignItems:"center", color:"#6c757d"}}>
					<ul style={styles.nav}>
						<NavLink to="/">肯德基</NavLink>
						<NavLink to="/pizzahut">必勝客</NavLink>
						<NavLink to="/dominos">達美樂</NavLink>
						<NavLink to="/napoli">拿坡里</NavLink>
					</ul>

					<Route exact path="/" render={()=>(
						<div style={{display:"flex", flexDirection:"column", alignItems:"center", position:"absolute", top:50}}>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10, marginRight:10}}>
								<span>過濾：</span>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcFilterExpired(0)} active={kfcFilterExpiredActive}>未過期</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcFilterCache(1)} active={kfcFilterCacheActive}>預定快取</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10, marginRight:10}}>
								<span>　我一定要：</span>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(0)} active={kfcIncludeActive[0]}>{this.kfcNames[0]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(1)} active={kfcIncludeActive[1]}>{this.kfcNames[1]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(2)} active={kfcIncludeActive[2]}>{this.kfcNames[2]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(3)} active={kfcIncludeActive[3]}>{this.kfcNames[3]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(4)} active={kfcIncludeActive[4]}>{this.kfcNames[4]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(5)} active={kfcIncludeActive[5]}>{this.kfcNames[5]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(6)} active={kfcIncludeActive[6]}>{this.kfcNames[6]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(7)} active={kfcIncludeActive[7]}>{this.kfcNames[7]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(8)} active={kfcIncludeActive[8]}>{this.kfcNames[8]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(9)} active={kfcIncludeActive[9]}>{this.kfcNames[9]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(10)} active={kfcIncludeActive[10]}>{this.kfcNames[10]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(11)} active={kfcIncludeActive[11]}>{this.kfcNames[11]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(12)} active={kfcIncludeActive[12]}>{this.kfcNames[12]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcInclude(13)} active={kfcIncludeActive[13]}>{this.kfcNames[13]}</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10, marginRight:10}}>
								<span>我一定不要：</span>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(0)} active={kfcExcludeActive[0]}>{this.kfcNames[0]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(1)} active={kfcExcludeActive[1]}>{this.kfcNames[1]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(2)} active={kfcExcludeActive[2]}>{this.kfcNames[2]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(3)} active={kfcExcludeActive[3]}>{this.kfcNames[3]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(4)} active={kfcExcludeActive[4]}>{this.kfcNames[4]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(5)} active={kfcExcludeActive[5]}>{this.kfcNames[5]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(6)} active={kfcExcludeActive[6]}>{this.kfcNames[6]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(7)} active={kfcExcludeActive[7]}>{this.kfcNames[7]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(8)} active={kfcExcludeActive[8]}>{this.kfcNames[8]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(9)} active={kfcExcludeActive[9]}>{this.kfcNames[9]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(10)} active={kfcExcludeActive[10]}>{this.kfcNames[10]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(11)} active={kfcExcludeActive[11]}>{this.kfcNames[11]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(12)} active={kfcExcludeActive[12]}>{this.kfcNames[12]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.kfcExclude(13)} active={kfcExcludeActive[13]}>{this.kfcNames[13]}</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10, marginRight:10}}>
								<span style={{marginRight:10}}>數量：{kfcCouponsShow.length}</span>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={this.kfcReset}>重置</Button>
								<input
									type="text"
									name="kfcCodeInput"
									style={{marginLeft:10, color:"#6c757d", height:38, borderRadius:".25rem", border:"1px solid #6c757d", padding:5}}
									value={kfcCodeInput}
									onChange={e=>this.setState({kfcCodeInput:e.target.value}, ()=>this.kfcFiltering())}
									placeholder="搜尋代碼"
								/>
								<span style={{marginLeft:10, marginRight:10, color:"#17a2b8"}}>天藍色可以直接點開圖片</span>
								<span>來源：</span>
								<a href="https://www.ptt.cc/bbs/fastfood/M.1526277935.A.DA0.html" target="_blank" rel="noopener noreferrer">ptt置底</a>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
								{kfcCouponsShow.map((e, i)=>(
									<div style={{width:330, margin:5, padding:5, border:imgKfc[e.code]!==undefined?"1px solid #17a2b8":"1px solid #6c757d", color:imgKfc[e.code]!==undefined?"#17a2b8":"inherit", borderRadius:".25rem"}} key={i} onClick={()=>imgKfc[e.code]!==undefined&&this.toggleModalImg(imgKfc[e.code], e.code)}>
										<div style={{display:"flex", justifyContent:"space-between"}}>
											<div style={{display:"flex"}}><div style={{marginRight:10}}>{e.code}</div><div>{e.price}</div></div><div>{e.expireDate}</div>
										</div>
										<div>{e.description}</div>
									</div>
								))}
							</div>
						</div>
					)}/>
					<Route path="/pizzahut" render={()=>(
						<div style={{display:"flex", flexDirection:"column", alignItems:"center", position:"absolute", top:50}}>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10, marginRight:10}}>
								<span>過濾：</span>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutFilterExpired(0)} active={pizzahutFilterExpiredActive}>未過期</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10, marginRight:10}}>
								<span>　我一定要：</span>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutInclude(0)} active={pizzahutIncludeActive[0]}>{this.pizzahutNames[0]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutInclude(1)} active={pizzahutIncludeActive[1]}>{this.pizzahutNames[1]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutInclude(2)} active={pizzahutIncludeActive[2]}>{this.pizzahutNames[2]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutInclude(3)} active={pizzahutIncludeActive[3]}>{this.pizzahutNames[3]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutInclude(4)} active={pizzahutIncludeActive[4]}>{this.pizzahutNames[4]}</Button>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutInclude(5)} active={pizzahutIncludeActive[5]}>{this.pizzahutNames[5]}</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10, marginRight:10}}>
								<span>我一定不要：</span>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutExclude(0)} active={pizzahutExcludeActive[0]}>{this.pizzahutNames[0]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutExclude(1)} active={pizzahutExcludeActive[1]}>{this.pizzahutNames[1]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutExclude(2)} active={pizzahutExcludeActive[2]}>{this.pizzahutNames[2]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutExclude(3)} active={pizzahutExcludeActive[3]}>{this.pizzahutNames[3]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutExclude(4)} active={pizzahutExcludeActive[4]}>{this.pizzahutNames[4]}</Button>
								<Button outline color="secondary" style={{margin:".1rem .1rem"}} onClick={()=>this.pizzahutExclude(5)} active={pizzahutExcludeActive[5]}>{this.pizzahutNames[5]}</Button>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10, marginRight:10}}>
								<span style={{marginRight:10}}>數量：{pizzahutCouponsShow.length}</span>
								<Button outline color="primary" style={{margin:".1rem .1rem"}} onClick={this.pizzahutReset}>重置</Button>
								<input
									type="text"
									name="pizzahutCodeInput"
									style={{marginLeft:10, color:"#6c757d", height:38, borderRadius:".25rem", border:"1px solid #6c757d", padding:5}}
									value={pizzahutCodeInput}
									onChange={e=>this.setState({pizzahutCodeInput:e.target.value}, ()=>this.pizzahutFiltering())}
									placeholder="搜尋代碼"
								/>
								<span style={{marginLeft:10, marginRight:10, color:"#17a2b8"}}>天藍色可以直接點開圖片</span>
								<span>來源：</span>
								<a href="https://www.ptt.cc/bbs/fastfood/M.1526277935.A.DA0.html" target="_blank" rel="noopener noreferrer">ptt置底</a>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
								{pizzahutCouponsShow.map((e, i)=>(
									<div style={{width:330, margin:5, padding:5, border:imgPizzahut[e.code]!==undefined?"1px solid #17a2b8":"1px solid #6c757d", color:imgPizzahut[e.code]!==undefined?"#17a2b8":"inherit", borderRadius:".25rem"}} key={i} onClick={()=>imgPizzahut[e.code]!==undefined&&this.toggleModalImg(imgPizzahut[e.code], e.code)}>
										<div style={{display:"flex", justifyContent:"space-between"}}>
											<div style={{display:"flex"}}><div style={{marginRight:10}}>{e.code}</div><div>{e.price}</div></div><div>{e.expireDate}</div>
										</div>
										<div>{e.description}</div>
									</div>
								))}
							</div>
						</div>
					)}/>
					<Route path="/dominos" render={()=>(
						<div style={{display:"flex", flexDirection:"column", alignItems:"center", position:"absolute", top:50}}>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10, marginRight:10}}>
								<span style={{marginRight:10}}>數量：{dominosCouponsShow.length}</span>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
								{dominosCouponsShow.map((e, i)=>e.url?(
									<div style={{width:330, margin:5, padding:5, border:"1px solid #17a2b8", color:"#17a2b8", borderRadius:".25rem"}} key={i} onClick={()=>this.toggleModalImg(e.url, e.code)}>
										<div style={{display:"flex", justifyContent:"space-between"}}>
											<div style={{display:"flex"}}><div style={{marginRight:10}}>{e.code}</div><div>{e.price}</div></div><div>{e.expireDate}</div>
										</div>
										<div>{e.description}</div>
									</div>
									):(
									<div style={{width:330, margin:5, padding:5, border:"1px solid #6c757d", borderRadius:".25rem"}} key={i}>
										<div style={{display:"flex", justifyContent:"space-between"}}>
											<div style={{display:"flex"}}><div style={{marginRight:10}}>{e.code}</div><div>{e.price}</div></div><div>{e.expireDate}</div>
										</div>
										<div>{e.description}</div>
									</div>
								))}
							</div>
						</div>
					)}/>
					<Route path="/napoli" render={()=>(
						<div style={{display:"flex", flexDirection:"column", alignItems:"center", position:"absolute", top:50}}>
							<div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:10, marginRight:10}}>
								<span style={{marginRight:10}}>數量：{napoliCouponsShow.length}</span>
							</div>
							<div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
								{napoliCouponsShow.map((e, i)=>(
									<div style={{width:330, margin:5, padding:5, border:"1px solid #6c757d", borderRadius:".25rem"}} key={i}>
										<div style={{display:"flex", justifyContent:"space-between"}}>
											<div style={{display:"flex"}}><div style={{marginRight:10}}>{e.code}</div><div>{e.price}</div></div><div>{e.expireDate}</div>
										</div>
										<div>{e.description}</div>
									</div>
								))}
							</div>
						</div>
					)}/>

					<Modal isOpen={this.state.modalImg} toggle={this.toggleModalImg} className={"modal-lg"}>
						<ModalHeader toggle={this.toggleModalImg} close={closeBtn} style={{fontFamily:"Helvetica-W01-Light,微軟正黑體,sans-serif"}}>優惠券圖片</ModalHeader>
						<ModalBody>
							<img src={imgUrl} style={{width:"100%"}} alt={imgAlt}/>
						</ModalBody>
					</Modal>
				</div>
			</Router>
		);
	}

	toggleModalImg=(url, code)=>this.setState({imgUrl:url, imgAlt:code, modalImg:!this.state.modalImg});

	kfcFilterExpired=()=>{//過濾表定過期的coupon
		const {kfcFilterExpiredActive}=this.state;
		this.setState({kfcFilterExpiredActive:!kfcFilterExpiredActive}, ()=>{//設定按鈕active
			this.kfcFiltering();//callback kfcFiltering
		});
	};

	kfcFilterCache=()=>{//過濾預定快取可用的coupon
		const {kfcFilterCacheActive}=this.state;
		this.setState({kfcFilterCacheActive:!kfcFilterCacheActive}, ()=>{//設定按鈕active
			this.kfcFiltering();//callback kfcFiltering
		});
	};

	kfcInclude=index=>{//按kfc一定要按紐
		const {kfcIncludeActive}=this.state;
		if(kfcIncludeActive[index]===true){//有active，所以點了
			if(this.kfcIncludeFilters.includes(this.kfcFilterNames[index])){//如果filter有，就要刪除
				this.kfcIncludeFilters=this.kfcIncludeFilters.filter(e=>e!==this.kfcFilterNames[index]);
			}
		}
		else{//沒active，所以點了
			if(!this.kfcIncludeFilters.includes(this.kfcFilterNames[index])){//如果filter沒有，就要加入
				this.kfcIncludeFilters.push(this.kfcFilterNames[index]);
			}
		}

		this.setState(prevState=>({//toggle this button active
			kfcIncludeActive:prevState.kfcIncludeActive.map((e,i)=>i===index?!e:e),
		}));

		this.kfcFiltering();
	};

	kfcExclude=index=>{//按kfc一定不要按紐
		const {kfcExcludeActive}=this.state;
		if(kfcExcludeActive[index]===true){//有active，所以點了
			if(this.kfcExcludeFilters.includes(this.kfcFilterNames[index])){//如果filter有，就要刪除
				this.kfcExcludeFilters=this.kfcExcludeFilters.filter(e=>e!==this.kfcFilterNames[index]);
			}
		}
		else{//沒active，所以點了
			if(!this.kfcExcludeFilters.includes(this.kfcFilterNames[index])){//如果filter沒有，就要加入
				this.kfcExcludeFilters.push(this.kfcFilterNames[index]);
			}
		}

		this.setState(prevState=>({//toggle this button active
			kfcExcludeActive:prevState.kfcExcludeActive.map((e,i)=>i===index?!e:e),
		}));

		this.kfcFiltering();
	};

	kfcFiltering=()=>{
		const {kfcFilterExpiredActive, kfcFilterCacheActive, kfcCodeInput}=this.state;
		let kfcCouponsShow=[];
		this.kfcCoupons.forEach(kfcCoupon=>{//要全包含include&&全排除exclude
			if(!kfcCoupon.code.includes(kfcCodeInput)){
				return;
			}
			let includesAll=this.kfcIncludeFilters.every(kfcIncludeFilter=>{
				if(kfcIncludeFilter==="飲"){
					return kfcCoupon.description.includes(kfcIncludeFilter)||kfcCoupon.description.includes("義式")||kfcCoupon.description.includes("紅茶")||kfcCoupon.description.includes("可");
				}
				else if(kfcIncludeFilter==="霸王"){
					return kfcCoupon.description.includes(kfcIncludeFilter)||kfcCoupon.description.includes("嫩雞");
				}
				else if(kfcIncludeFilter==="炸雞*"){
					return kfcCoupon.description.includes(kfcIncludeFilter)||kfcCoupon.description.includes("炸雞x");
				}
				else if(kfcIncludeFilter==="蛋塔"){
					return kfcCoupon.description.includes(kfcIncludeFilter)||kfcCoupon.description.includes("蛋撻");
				}
				else{
					return kfcCoupon.description.includes(kfcIncludeFilter);
				}
			});
			let excludesAll=this.kfcExcludeFilters.every(kfcExcludeFilter=>{
				if(kfcExcludeFilter==="飲"){
					return !kfcCoupon.description.includes(kfcExcludeFilter)&&!kfcCoupon.description.includes("義式")&&!kfcCoupon.description.includes("紅茶")&&!kfcCoupon.description.includes("可");
				}
				else if(kfcExcludeFilter==="霸王"){
					return !kfcCoupon.description.includes(kfcExcludeFilter)&&!kfcCoupon.description.includes("嫩雞");
				}
				else if(kfcExcludeFilter==="炸雞*"){
					return !kfcCoupon.description.includes(kfcExcludeFilter)&&!kfcCoupon.description.includes("炸雞x");
				}
				else if(kfcExcludeFilter==="蛋塔"){
					return !kfcCoupon.description.includes(kfcExcludeFilter)&&!kfcCoupon.description.includes("蛋撻");
				}
				else{
					return !kfcCoupon.description.includes(kfcExcludeFilter);
				}
			});
			if(kfcFilterExpiredActive){//用.expireDate過濾
				let d=new Date();
				let couponD=new Date(kfcCoupon.expireDate.replace("+", ""));
				if(kfcFilterCacheActive){
					if(includesAll&&excludesAll&&(kfcCoupon.expireDate.includes("無期限")||couponD>=d)&&kfcCoupon.code[0]!=="1"){
						kfcCouponsShow.push(kfcCoupon);
					}
				}
				else{
					if(includesAll&&excludesAll&&(kfcCoupon.expireDate.includes("無期限")||couponD>=d)){
						kfcCouponsShow.push(kfcCoupon);
					}
				}
			}
			else{
				if(kfcFilterCacheActive){
					if(includesAll&&excludesAll&&kfcCoupon.code[0]!=="1"){
						kfcCouponsShow.push(kfcCoupon);
					}
				}
				else{
					if(includesAll&&excludesAll){
						kfcCouponsShow.push(kfcCoupon);
					}
				}
			}
		});
		this.setState({kfcCouponsShow});
	};

	pizzahutFilterExpired=()=>{//過濾表定過期的coupon
		const {pizzahutFilterExpiredActive}=this.state;
		this.setState({pizzahutFilterExpiredActive:!pizzahutFilterExpiredActive}, ()=>{//設定按鈕active
			this.pizzahutFiltering();//callback pizzahutFiltering
		});
	};

	pizzahutInclude=index=>{//按pizzahut一定要按紐
		const {pizzahutIncludeActive}=this.state;
		if(pizzahutIncludeActive[index]===true){//有active，所以點了
			if(this.pizzahutIncludeFilters.includes(this.pizzahutFilterNames[index])){//如果filter有，就要刪除
				this.pizzahutIncludeFilters=this.pizzahutIncludeFilters.filter(e=>e!==this.pizzahutFilterNames[index]);
			}
		}
		else{//沒active，所以點了
			if(!this.pizzahutIncludeFilters.includes(this.pizzahutFilterNames[index])){//如果filter沒有，就要加入
				this.pizzahutIncludeFilters.push(this.pizzahutFilterNames[index]);
			}
		}

		this.setState(prevState=>({//toggle this button active
			pizzahutIncludeActive:prevState.pizzahutIncludeActive.map((e,i)=>i===index?!e:e),
		}));

		this.pizzahutFiltering();
	};

	pizzahutExclude=index=>{//按pizzahut一定不要按紐
		const {pizzahutExcludeActive}=this.state;
		if(pizzahutExcludeActive[index]===true){//有active，所以點了
			if(this.pizzahutExcludeFilters.includes(this.pizzahutFilterNames[index])){//如果filter有，就要刪除
				this.pizzahutExcludeFilters=this.pizzahutExcludeFilters.filter(e=>e!==this.pizzahutFilterNames[index]);
			}
		}
		else{//沒active，所以點了
			if(!this.pizzahutExcludeFilters.includes(this.pizzahutFilterNames[index])){//如果filter沒有，就要加入
				this.pizzahutExcludeFilters.push(this.pizzahutFilterNames[index]);
			}
		}

		this.setState(prevState=>({//toggle this button active
			pizzahutExcludeActive:prevState.pizzahutExcludeActive.map((e,i)=>i===index?!e:e),
		}));

		this.pizzahutFiltering();
	};

	pizzahutFiltering=()=>{
		const {pizzahutFilterExpiredActive, pizzahutCodeInput}=this.state;
		let pizzahutCouponsShow=[];
		this.pizzahutCoupons.forEach(pizzahutCoupon=>{//要全包含include&&全排除exclude
			if(!pizzahutCoupon.code.includes(pizzahutCodeInput)){
				return;
			}
			let includesAll=this.pizzahutIncludeFilters.every(pizzahutIncludeFilter=>{
				if(pizzahutIncludeFilter==="腿"){
					return pizzahutCoupon.description.includes(pizzahutIncludeFilter)||pizzahutCoupon.description.includes("翅");
				}
				else if(pizzahutIncludeFilter==="飲"){
					return pizzahutCoupon.description.includes(pizzahutIncludeFilter)||pizzahutCoupon.description.includes("雪碧")||pizzahutCoupon.description.includes("可樂");
				}
				else{
					return pizzahutCoupon.description.includes(pizzahutIncludeFilter);
				}
			});
			let excludesAll=this.pizzahutExcludeFilters.every(pizzahutExcludeFilter=>{
				if(pizzahutExcludeFilter==="腿"){
					return !pizzahutCoupon.description.includes(pizzahutExcludeFilter)&&!pizzahutCoupon.description.includes("翅");
				}
				else if(pizzahutExcludeFilter==="飲"){
					return !pizzahutCoupon.description.includes(pizzahutExcludeFilter)&&!pizzahutCoupon.description.includes("雪碧")&&!pizzahutCoupon.description.includes("可樂");
				}
				else{
					return !pizzahutCoupon.description.includes(pizzahutExcludeFilter);
				}
			});
			if(pizzahutFilterExpiredActive){//用.expireDate過濾
				if(pizzahutCoupon.expireDate===undefined){
					pizzahutCouponsShow.push(pizzahutCoupon);
					return;
				}
				let d=new Date();
				let couponD=new Date(pizzahutCoupon.expireDate.replace("+", "").replace("~", ""));
				if(includesAll&&excludesAll&&(pizzahutCoupon.expireDate.includes("無期限")||couponD>=d)){
					pizzahutCouponsShow.push(pizzahutCoupon);
				}
			}
			else{
				if(includesAll&&excludesAll){
					pizzahutCouponsShow.push(pizzahutCoupon);
				}
			}
		});
		this.setState({pizzahutCouponsShow});
	};

	kfcReset=()=>{
		this.setState({
			kfcCouponsShow:this.kfcCoupons,
			kfcFilterExpiredActive:false,
			kfcFilterCacheActive:false,
			kfcIncludeActive:[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			kfcExcludeActive:[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
			kfcCodeInput:"",
		});
		this.kfcIncludeFilters=[];
		this.kfcExcludeFilters=[];
	};

	pizzahutReset=()=>{
		this.setState({
			pizzahutCouponsShow:this.pizzahutCoupons,
			pizzahutFilterExpiredActive:false,
			pizzahutIncludeActive:[false, false, false, false, false, false, false, false],
			pizzahutExcludeActive:[false, false, false, false, false, false, false, false],
			pizzahutCodeInput:"",
		});
		this.pizzahutIncludeFilters=[];
		this.pizzahutExcludeFilters=[];
	};
}

export default App;

function NavLink(props){
	return (
		<li style={styles.navItem}>
			<Link {...props} style={{color:"#6c757d"}}/>
		</li>
	);
}

const styles={};

styles.nav={
	padding:0,
	margin:0,
	position:"fixed",
	top:0,
	zIndex:1,
	height:"40px",
	width:"100%",
	display:"flex",
	background:"#f4f5f6",
	borderBottom:"1px solid #d1d1d1",
};

styles.navItem={
	textAlign:"center",
	flex:1,
	listStyleType:"none",
	padding:"10px",
};