<template>
	<view>
		
	
		<cu-custom :isBack="true">
			<block slot="left"><text class="cuIcon-back" style="font-size:20px" @click="goBack()"></text></block>
			<block slot="content">{{title.name}}</block>
		</cu-custom>
		
		<view style="padding-bottom:46px">
			<view class="express-container" >
				<text  class="left-line" ></text>
				<view class="flex justify-start user-info" style="position: relative;">
					<view class="express-tab bg-blue" >寄</view>
					<view style="width:78%;">
						<view v-if="shopItem" style="padding-top:6px;">
							<view style="font-size:12px;" class="flex justify-start">
								<view>
									<text style="font-size:16px;" class="text-blue">{{shopItem.name}}</text>
								</view>
								<view>
									<text style="margin-left:8px;">(   {{userInfo.name}}</text>
									 <text class="text-green" style="margin:0 4px;">|</text> 
									 {{ userInfo.mobile ||''}}  )
								</view>
							 </view>
							<view    class="text-gray shop-faddr">
								{{shopItem.provinceName||''}}/{{shopItem.cityName||''}}/{{shopItem.districtName||''}}/{{shopItem.address||''}}
							</view>
						</view>
						<view v-if="checkItemInfo" style="padding-top:6px;">
							<view style="font-size:12px;" class="flex justify-start">
								<view>
									<text style="font-size:16px;" class="text-blue">{{checkItemInfo.fromshopName}}</text>
								</view>
								<view>
									<text style="margin-left:8px;">(   {{userInfo.name}}</text>
									 <text class="text-green" style="margin:0 4px;">|</text> 
									 {{ userInfo.mobile ||''}}  )
								</view>
							 </view>
							<view    class="text-gray shop-faddr">
								{{checkItemInfo.faddr || ''}}
							</view>
						</view>
						<view v-else class="notice">请选择寄件信息</view>
					</view>
					<text class="cuIcon-addressbook addressbookStyle" @click="choseSender()"></text>
				</view>
				<view class="flex justify-start user-info">
					<view class="express-tab bg-orange" >收</view>
						<view style="width:78%;">
							<view >
								<view v-if="receiveShopItem || shopMaleInfo" style="padding-top:6px;">
									<view style="font-size:12px;">
										<text style="font-size:16px;" class="text-blue">{{receiveShopItem.name}}</text>
										<text >(   {{shopMaleInfo.name}}</text>
										 <text class="text-green" style="margin:0 4px;">|</text> 
										 {{ shopMaleInfo.account ||''}}  )</view>
									<view  class="text-gray shop-faddr">{{receiveShopItem.provinceName|| shopMaleInfo.provinceName||''}}/{{receiveShopItem.cityName|| shopMaleInfo.cityName||''}}/{{receiveShopItem.districtName||shopMaleInfo.districtName ||''}}/{{receiveShopItem.address||shopMaleInfo.address||''}}</view>
								</view>
								<view v-if="checkItemInfo" style="padding-top:6px;">
									<view style="font-size:12px;">
										<text style="font-size:16px;" class="text-blue">{{checkItemInfo.toshopName}}</text>
										<text >(   {{checkItemInfo.receiverName}}</text>
										 <text class="text-green" style="margin:0 4px;">|</text> 
										 {{ checkItemInfo.receiverMobile ||''}}  )</view>
									<view  class="text-gray shop-faddr">{{checkItemInfo.taddr || ''}}</view>
								</view>
								<view  v-else class="notice">请选择收件信息</view>
							</view>
							
						</view>
					<text class="cuIcon-addressbook addressbookStyle" 
					@click="choseReceive()"
					></text>
					
				</view>
			</view>
			
			<view class="express-info" >
				<view class="flex justify-between express-info-goods" >
					<view style="font-size: 13px;color:gray"><text style="color:red;margin-right:5px;">*</text>商品名称</view>
					<view v-if="checkItemInfo">
						<input type="text" placeholder="请输入商品名称" v-model="checkItemInfo.name" style="font-size:13px;text-align:right;">
					</view>
					<view v-else>
						<input type="text" placeholder="请输入商品名称" v-model="goods.name" style="font-size:13px;text-align:right;">
					</view>
				</view>
				
				<view class="flex justify-between express-info-express" >
					<view style="font-size: 13px;color:gray">
						<text style="color:red;margin-right:5px;">*</text>
						<text v-if="title.value=='express-order' ">快递公司</text>
						<text v-if="title.value=='logistics-order'">物流公司</text>
					</view>
					<view>
						<text>{{expressObj.name ||''}}</text>
						<text class="cuIcon-right" style="font-size:15px;" @click="chooseExpress()"></text>
					</view>
				</view>
				<view class="flex justify-between express-info-express">
					<view style="font-size: 13px;color:gray"><text style="color:red;margin-right:5px;">*</text>期望上门时间</view>
					<view style="font-size:12px;">
						<text v-if="checkItemInfo" style="margin-right:8px;width:43%">{{checkItemInfo.appointdate}}</text>
						<text v-else style="margin-right:8px;width:43%">{{mainTimeName || ''}}</text>{{smallTimeName || ''}}
						<text class="cuIcon-right" style="font-size:15px;" @click="chooseTime($event)" data-target="bottomModal"></text>
					</view>
				</view>
				<view class="flex justify-between express-info-goods" style="margin-top:6px" >
					<view style="font-size: 13px;color:gray">物件保价</view>
					<view>
						
						<input type="text"  placeholder="请输入保价金额" v-model="goods.price" style="font-size:13px;text-align:right;">
					</view>
				</view>
			</view>
			<view class="goods-content" >
				<view class="flex justify-between" >
					<view  class="goods-content-item ">
						<text style="color:red;margin-right:5px;">*</text><text>货物重量估计</text>
					</view>
					<!-- <view>
						<text class="cuIcon-order"></text>
						<text @click="changeChoose()">重量填写</text>
					</view> -->
				</view>
				<view class="goods-info">
					<view >
						<view class="flex justify-between" style="padding:10px 20px;">
							<text class="minuBtn"  @click="numberMinus('quantity')">-</text>
							<input type="number" placeholder="输入重量" v-model="goods.quantity" 
								class="inputBtn"
							>
							<text class="unitBtn">kg</text>
							<text  class="addBtn" @click="numberAdd('quantity')">+</text>
						</view>
						<view class="flex justify-between" style="padding:10px 20px;">
								<view>
									总重量 : <text style="font-size:14px;color:red;margin:0 5px;">{{goods.quantity}}</text>kg
								</view>
								<view>注；实际重量以收派员确定为准</view>
						</view>
					</view>
				</view>
				
				<view style="margin-top:20px;padding-top:10px;" >
					<view class="goods-content-item">
						<text style="color:red;margin-right:5px;">*</text><text>货物数量</text>
					</view>
					<view class="flex justify-between" style="padding:0px 20px;">
						<text class="minuBtn" @click="numberMinus('number')">-</text>
						<input type="number" placeholder="输入数量" v-model="goods.number" 
						class="inputBtn">
						<text class="unitBtn"></text>
						<text  class="addBtn" @click="numberAdd('number')">+</text>
					</view>
				</view>
			</view>
			
			<view class="goods-summary text-gray" >
				<view style="font-size:13px;margin-bottom:8px;">寄件备注</view>
				<view>
					<textarea  placeholder="请输入寄件备注信息" v-model="goods.summary" style="font-size:13px;"/>
				</view>
			</view>
			
		</view>
		
		
		
		
		
		
		
		
		
		<view class="bottom-area">
			<view class="flex justify-between">
				<view  class="bottom-area-item">
					
					<text class="cuIcon-roundcheck" v-if="isAccept" style="font-size:16px;color:#00BFFF" @click="acceptDel()"></text>
					<text class="cuIcon-round" v-else style="font-size:16px;color:#00BFFF" @click="acceptDel()"></text>
					<text style="margin-left:10px;">我已阅读并同意快递服务条款</text>
				</view>
				<view class="cu-btn bg-orange">
					<text   v-if="checkItemInfo" @click="createExpress('edit')">修改完毕</text>
					<text  v-else  @click="createExpress('new')">立即下单</text>

				</view>
			</view>
			
		</view>

		
		

		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-gray">
					<view class="action" style="font-size:12px;">请选择预约上门时间</view>
					<view class="action " @click="hideModal()"><text class="cuIcon-close"></text></view>
				</view>
				<view class="padding-xl bg-white">
					<view class="flex justify-around">
						<view class="time-tab text-center" v-for="(item,index) in mainTime" 
							:class="{'chooseTimeActive':timeIndex==item.id}"
							@click="chooseTimeIndex(item)"
							:key="index">
							<view style="font-size:16px;margin-bottom:10px;">{{item.name}}</view>
							<view style="font-size:12px;">{{item.time}}</view>
						</view>
					</view>
					<view class="flex justify-start " style="flex-wrap: wrap;margin-top:10px;">
						<view v-for="(item,index) in smallTime" 
						@click="smallTimeChoose(item)"
						:class="{'bg-orange':smallTimeIndex==item.index}"
						:key="index" class="cu-tag" style="width:28%;margin:10px 9px" >
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio:'',
				goodID:-1,
				// goodChooseList:[
				// 	{name:'<3kg',text:'小件',id:0,image:'../../../../../static/img/work/goods/box1.jpg'},
				// 	{name:'3-10kg',id:1,text:'标准大件',image:'../../../../../static/img/work/goods/box2.jpg'},
				// 	{name:'31-60kg',text:'超重大件',id:2,image:'../../../../../static/img/work/goods/box3.jpg'},
				// 	{name:'>60kg',text:'物流',id:3,image:'../../../../../static/img/work/goods/box4.jpg'},
				// ],
				title:{},
				//快递信息
				expressObj:{
					id:'',
					name:'',
					img:''
				},
				sender:{
					name:''
				},//寄件人
				modalName: null,
				shopItem:'',//寄件门店详情
				receiveShopItem:'',//收件门店详情
				goods:{
					name:'',
					quantity:1,
					number:1,
					price:'',
					summary:''
				},
				showChoose:true,//显示选择
				mainTime:[],
				mainTimeName:'',
				timeIndex:-1,//选择时间
				smallTime:[],
				smallTimeIndex:-1,
				smallTimeName:'',
				userInfo:'',
				shopMaleInfo:'',
				smallTimeName2:'',
				mainTimeName2:'',
				type:'',//用于区分消费者还是门店(1是消费之，2是门店)
				isAccept:true,//是否遵守跳跃
				checkID:'',//修改快递订单的id
				checkItemInfo:'',//修改快递单的内容
			};
		},
		methods: {
			//接受条约
			acceptDel(){
				this.isAccept=!this.isAccept;
			},
			createExpress(type){
				var data=new Date();
				var year   =  data.getFullYear(); 
				var month  = data.getMonth() + 1<10?"0"+(data.getMonth() + 1):data.getMonth() + 1
				if(this.mainTimeName=='今天'){
					console.log()
					var day    = data.getDate()<10?"0"+data.getDate():data.getDate(); 
					this.mainTimeName2=year+'-'+month+'-'+day;
				}else if(this.mainTimeName=='明天'){
					var day  = data.getDate()+1<10?"0"+data.getDate()+1:data.getDate()+1; 
					this.mainTimeName2=year+'-'+month+'-'+day;
				}else if(this.mainTimeName=='后天'){
					var day  = data.getDate()+2<10?"0"+data.getDate()+2:data.getDate()+2; 
					this.mainTimeName2=year+'-'+month+'-'+day;
				}	
				if(this.smallTimeName=='2小时上门'){
					var data=new Date();
					var year   =  data.getFullYear();  
					var month  = data.getMonth() + 1<10?"0"+(data.getMonth() + 1):data.getMonth() + 1
					var day    = data.getDate()<10?"0"+data.getDate():data.getDate();
					var hour   = data.getHours()<10?"0"+data.getHours():data.getHours();
					var delHour=data.getHours()<10?"0"+data.getHours()+2:data.getHours()+2;
					var minute =  data.getMinutes()<10?"0"+data.getMinutes():data.getMinutes();
					let startTime=hour+':'+minute;
					let endTime=delHour+':'+minute
					this.smallTimeName2=`${startTime}--${endTime}`
				
				}else{
					this.smallTimeName2=this.smallTimeName;
				}
				if(!this.isAccept){
						uni.showToast({
							title:'请遵守寄件条款',
							icon:'none'
						})
					}else{
						if(type=='edit'){
							console.log('edit')
						}else if(type=='new'){
							if(!this.shopItem || !this.shopMaleInfo){
								uni.showToast({
									title:'请填写寄件信息',
									icon:'none'
								})
							}else if(!this.goods.name || !this.mainTimeName || !this.smallTimeName2 || !this.title){
								uni.showToast({
									title:'请填写完成信息',
									icon:'none'
								})
							}else{
								uni.getStorage({
									key:'userInfo',
									success: (res) => {
										this.$ajax('NewExpress',{
											way:1,//way=1是快递。不填是调拨
											express:this.title.id,//订单类型（1是速递，2是物流)
											fromshop:this.shopItem.id,
											faddr:`${this.shopItem.provinceName || ''}${this.shopItem.cityName || ''}${this.shopItem.districtName || ''}${this.shopItem.address || ''}`,
											toshop:this.receiveShopItem.id?this.receiveShopItem.id:'',
											taddr:this.receiveShopItem?`${this.receiveShopItem.provinceName || ''}${this.receiveShopItem.cityName || ''}${this.receiveShopItem.districtName || ''}${this.receiveShopItem.address || ''}`:`${this.shopMaleInfo.provinceName || ''}${this.shopMaleInfo.cityName || ''}${this.shopMaleInfo.districtName || ''}${this.shopMaleInfo.address || ''}`,
											weight:this.goods.quantity,
											quantity:this.goods.number,
											appointdate:`${this.mainTimeName2} ${this.smallTimeName2}`,
											inprice:this.goods.price,
											summary:this.goods.summary,
											name:this.goods.name,
											type:this.type,
											catalog:this.expressObj.id,
											receiver:this.type==1?this.shopMaleInfo.id:'',//如果是门店receiver为店员的id,如果是消费者则为kong
											sender:res.data.id,
											contactor:this.type==2?this.shopMaleInfo.name:'',//如果是type=2是消费者，为联系人的姓名
											telephone:this.type==2?this.shopMaleInfo.account:''
										},res=>{
											var title=''
											if(this.title.id==1){
												title='新建速递订单成功'
											}else if(this.title.id==2){
												title='新建物流订单成功'
											}else {
												title='新建调拨订单成功'
											}
											uni.showToast({
												title:title,
												icon:'none'
											})
											setTimeout(()=>{
												uni.navigateTo({
													url:'../express-list/express-list'
												})
											})
										})
									}
								})
								
							}
						}
						
				}
				
				
			},
			numberMinus(type){
				if(type=="number"){
					if(this.goods.number>1){
						this.goods.number--;
					}
					
				}else if(type=='quantity'){
					
					if(this.goods.quantity>1){
						this.goods.quantity--;
					}
				}
			},
			numberAdd(type){
				
				if(type=="number"){
						
					this.goods.number++;
					
				}else if(type=='quantity'){
					this.goods.quantity++;
					
				}
			},
			chooseExpress(){
				if(this.title.value=='express-order'){
					//速递订单
					uni.navigateTo({
						url:'../choose-express/choose-express?name=express-order'
					})
				}else if(this.title.value=='logistics-order'){
					//物流订单
					uni.navigateTo({
						url:'../choose-express/choose-express?name=logistics-order'
					})
				}
			},
			chooseTimeIndex(item){
				this.timeIndex=item.id;
				this.mainTimeName=item.name;
				this.smallTime=[
					{name:'2小时上门',index:0},
					{name:'9:00--11:00',index:1},
					{name:'11:00--13:00',index:2},
					{name:'13:00--15:00',index:3},
					{name:'15:00--17:00',index:4},
					{name:'17:00--19:00',index:5}
					
				]
				
				if(this.timeIndex!=0){
					this.smallTime.shift()
				}
			},
			smallTimeChoose(item){
				this.smallTimeIndex=item.index;
				this.smallTimeName=item.name;
				console.log(this.smallTimeName)
				this.modalName='';
			},
			getTimeInfo(){
				var today=new Date().toLocaleDateString();
				var day3 = new Date().getDate()+1;
				var tomorrow=new Date().getFullYear()+'-'+ ((new Date().getMonth())+1)+'-'+day3
				var day4=new Date().getDate()+2;
				var second=new Date().getFullYear()+'-'+ ((new Date().getMonth())+1)+'-'+day4;
				this.mainTime=[
					{name:'今天',time:today,id:0},
					{name:'明天',time:tomorrow,id:1},
					{name:'后天',time:second,id:2},
				]
			},
			//获得快递信息
			getExpressCatalogInfo(type){
				console.log(type)
				if(type==1){
					//速递
					this.$store.state.expressList.forEach(item=>{
						if(this.checkItemInfo.catalog==item.id){
							this.expressObj=item
						}
					})
					console.log(this.expressObj.name)
				}else if(type==2){
					this.$store.state.logisticsList.forEach(item=>{
						if(this.checkItemInfo.catalog==item.id){
							this.expressObj=item
						}
					})
					console.log(this.expressObj)
				}
			},
			//选择时间
			chooseTime(event){
				this.modalName=event.currentTarget.dataset.target;
				this.getTimeInfo()
			},
			chooseQuantity(item){
				this.goodID=item.id
			},
			changeChoose(){
				this.showChoose=true;
			},
			changeInput(){
				this.showChoose=false;
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//选择寄件人
			choseSender(){
				uni.navigateTo({
					url:'../../../shop-center/near-shop-list/near-shop-list?type=express&&cat=send'
				})
			},
			choseReceive(){
				if(!this.shopItem){
					uni.showToast({
						title:'请选择寄件信息',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:'../../../shop-center/near-shop-list/near-shop-list?type=express&&cat=receive'
					})
				}
				
			},
			
			//获得门店信息
			getShopInfo(id,type){
				this.$ajax('ProprietorShop',{id:id},res=>{
					if(type=='send'){
						//寄件
						this.shopItem=res;
					}else if(type=='receive'){
						this.receiveShopItem=res;
						console.log(this.receiveShopItem)
					}
					
				})
				
				
			},
			getUserInfo(){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						this.userInfo=res.data
					}
				})
			},
			//获得单个店员信息
			getShopMaleItemInfo(shopID,shopMaleID){
				this.$ajax('ShopSalesmen',{shop:shopID},res=>{
					res.forEach(item=>{
						if(item.id==shopMaleID){
							this.shopMaleInfo=item;
							console.log(this.shopMaleInfo)
						}
					})
				})
			},
			//调拨转为订单，获得单个调拨单的信息
			getDistributeItemInfo(id){
				this.$ajax('Express',{id:id,transferred:1},res=>{
					console.log(res)
					this.distributeObj=res;
					this.shopItem={
						name:res.fromshopName,
						fromshop:res.fromshop,
						faddr:res.faddr,
						toshop:res.toshop,
						taddr:res.taddr,
						toshopName:res.toshopName
					}
					this.goods.name=res.name;
					this.goods.number=res.quantity;
					if(res.summary){
						this.goods.summary=res.summary
					}
					
				})
			},
			//获得快递订单详情
			getExpressItemInfo(id){
				this.$ajax('Express',{way:1,id:id},res=>{
					console.log(res);
					this.checkItemInfo=res;
					this.goods={
					name:this.checkItemInfo.name?this.checkItemInfo.name:'',
					quantity:this.checkItemInfo.weight?this.checkItemInfo.weight:1,
					number:this.checkItemInfo.quantity?this.checkItemInfo.quantity:1,
					price:this.checkItemInfo.insprice?this.checkItemInfo.insprice:'',
					summary:this.checkItemInfo.summary?this.checkItemInfo.summary:''
					},
					this.getExpressCatalogInfo(this.title.id)
				})
			},
			hideModal() {
				this.modalName = null
			},
			
		},
		
		//获得时间
		
		onLoad(options){
			console.log(options)
			//checkType判断是快递还是物流
			
			if(options){
				if(options.type==1 || options.checkType==1){
					this.title={id:1,name:'速递订单',value:'express-order'};
					
				}else if(options.type==2 || options.checkType==2){
					this.title={id:2,name:'物流订单',value:'logistics-order'}
					
				}
				//修改快递信息
				if(options.checkID){
					this.checkID=options.checkID;
					this.getExpressItemInfo(options.checkID)
					
					
				}
			}
			this.getUserInfo();
			this.$fire.on('sendShop',res=>{
				if(res.shopID){
					this.getShopInfo(res.shopID,res.type)
				}
			})
			this.$fire.on('shop',res=>{
				this.type=1;
				if(res.shopID){
					this.getShopInfo(res.shopID,res.type);
					this.getShopMaleItemInfo(res.shopID,res.shopMaleID)
				}
			})
			this.$fire.on('express',res=>{
				this.expressObj=res;
			})
			this.$fire.on('address',res=>{
				this.type=2;
				this.shopMaleInfo={
					name:res.name,
					account:res.telephone,
					provinceName:res.provinceName,
					cityName:res.cityName,
					districtName:res.districtName,
					address:res.address,
					
				}
			})
		}
	}
</script>

<style lang="less">
	
	uni-textarea{
		width:100%;
		border-radius: 10px;
		padding:10px 20px;
		padding:10px 20px;
		height:84px;
		background:rgba(247,247,247,1)
	}
	.chooseTimeActive{
		border:1px solid orange;
		color:orange;
	}
	uni-input{
		height:30px;
	}
	.img25{
		width:25px;
		height:35px;
	}
	.img35{width:35px;height:35px}
	.img55{width:55px;height:35px;}
	.img75{width:75px;height:35px;}
	page{
		background:#fff;
	}
	button .cu-tag {
		position: absolute;
		top: 8upx;
		right: 8upx;
	}
	.cu-list.menu>.cu-item{
		min-height:45px;
	}
	uni-radio .uni-radio-input{
		width:24px;
		height:21px;
	}
	.cu-card>.cu-item{
		margin:5px;
	}
	.express-info{
		background:#fff;
		margin:6px;
		border-radius: 8px;
		padding:10px ;border:1px solid #EEEEED;border-radius: 10px;
		.express-info-goods{
			border-bottom:1px solid #EEEEED;padding:10px;
		}
		.express-info-express{
			border-bottom:1px solid #EEEEED;padding:10px;margin-top:6px
		}
	}
	.express-container{
		position: relative;
		border:1px solid #EEEEED;
		box-shadow: 10px;
		background:#fff;
		margin:6px;
		border-radius: 8px;
		padding-bottom:10px;
		.left-line{
			border:0.4px solid gray;position:absolute;left:25px;top:50px;height:35px
		}
		.shop-faddr{
			font-size:12px;margin-top:10px;border-bottom:1px solid #EEEEED;padding-bottom:5px;
		}
		.notice{
			padding-top:15px;min-height:55px;border-bottom: 1px solid #EEEEED;color:#aaa
		}
		.addressbookStyle{
			font-size: 30px;color:gray;position:absolute;right:10px;top:20px;
		}
		.user-info{
			padding:8px 10px;
			position:relative;
			.express-tab{
				margin-top:10px;
				margin-right:10px;
				width: 30px;
				height: 30px;
				font-size: 16px;
				text-align: center;
				line-height: 30px;
				color: white;
				border-radius: 50%;
			}
		}
		.goods-info{
			.goods-num{
				border-top:1px solid #EEEEED;
				padding:10px 15px;
			}
		}
		
		
	}
	.cu-bar{
		min-height:44px;
	}
	.time-tab{
		border:1px solid #EEEEED;
		border-radius: 9px;
		padding:10px 15px;
	}
	.goods-content{
		padding:10px 15px;color:gray;font-size:12px;border:1px solid #EEEEED;border-radius: 10px;margin: 10px 8px
	}
	.goods-content-item{
		color:gray;font-size:13px;margin-bottom:20px;
	}
	.minuBtn{
		font-size:23px;background:lightgray;width:20%;text-align:center;
	}
	.inputBtn{
		text-align:right;width:52%;border-top:1px solid #EEEEED;border-bottom:1px solid #EEEEED;padding-left:10px;
	}
	.unitBtn{
		width:8%;text-align:center;border-top:1px solid #EEEEED;border-bottom:1px solid #EEEEED;line-height:28px;height:28px;
	}
	.addBtn{
		font-size:23px;background:lightgray;width:20%;text-align:center;
	}
	.goods-summary{
		border:1px solid #EEEEED;border-radius: 10px;padding:10px 15px;margin:6px 10px;
	}
	.bottom-area{
		bottom:0px;left:0px;width:100%;position:fixed;background:lightgrey
	}
	.bottom-area-item{
		font-size:12px;padding-top:8px;padding-left:10px;
	}
</style>
