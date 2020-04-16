<template>
	<view>
		<view>
			<view class="express-container borderTop bg-white">
				<view class="user-info border-top">
					<view class="flex justify-start position_relative send-info borderBottom align-center" >
						<view class="send-tag express-tag" >寄</view>
						<view class="font-size-normal font-weight-normal shopInfo ">
							<view v-if="sendShop.name">
								<view class="font-size-normal color-normal font-weight-bold">{{sendShop.name || ''}}</view>
								<view  class="font-size-normal color-normal font-weight-bold"><text>{{sendShop.saleName || distributeItem.supplierName}}</text>{{sendShop.saleTel || distributeItem.supplierMobile}}</view>
								<view style="font-size:12px;" class="color-placeholder text-ellipse">{{sendShop.provinceName || ''}}{{sendShop.cityName || ''}}{{sendShop.districtName || ''}}
									{{sendShop.address || ''}}</view>
							</view>
							<view v-else style="color:#606060" class="font-size-normal">请填写/添加寄件人信息</view>
						</view>
					</view>
					<view class="flex justify-start position_relative send-info borderBottom align-center">
						<view class="receive-tag express-tag" >收</view>
						<view class=" font-weight-normal shopInfo"
							:class="{'borderRight':!distributeItem.id,'borderNo':distributeItem.id}"
							>
							<view v-if="receiverMan.name">
								<view class=" color-normal font-weight-bold">{{receiveShop.name || ''}}</view>
								<view  class=" color-normal font-weight-bold"><text>{{receiverMan.name}}</text>({{receiverMan.account || receiverMan.mobile}})</view>
								<view style="font-size:12px;" class="color-placeholder text-ellipse">{{receiveShop.provinceName || ''}}{{receiveShop.cityName || ''}}
									{{receiveShop.districtName || ''}}{{receiveShop.address || ''}}</view>
							</view>
							<view v-else style="color:#606060" class="font-size-normal">请填写/添加收件人信息</view>
						</view>
						<view class=" position_absolute  " 
						  v-if="!distributeItem.id"
						 @click="chooseSenderItem('receiver')" style="right:3px;color:#42B0ED;">选择</view>
					</view>
				</view>
			</view>
			<view style="height:13px;width:100%;background:rgba(247,247,247,1)"></view>
			<view class="other-container bg-white" >
				<view class=" borderBottom" style="padding-top:16px;padding-bottom:17px;padding-left:13px;">
					<view style="margin-bottom:11px;"><text class="text-red">*</text><text class="font-size-normal color-normal">寄件类型</text></view>
					<view class=" flex justify-start" v-if="title.value=='speed'">
						<image :src="expressTypeValue=='speed'?'../../../../../static/img/work/express/other/express-speed-color.png':'../../../../../static/img/work/express/other/express-speed.png'"
							   @click="chooseExpressType('speed')"
							   style="width:42%;height:97px;margin-right:6px;"></image>
						<image :src="expressTypeValue=='price'?'../../../../../static/img/work/express/other/express-price-color.png':'../../../../../static/img/work/express/other/express-price.png'"
							   @click="chooseExpressType('price')"
							   style="width:42%;height:97px;"></image>
					</view>
					<view class=" flex justify-start" v-if="title.value=='logistics'">
						<image :src="expressTypeValue=='speed'?'../../../../../static/img/work/express/other/express-zhun-color.png':'../../../../../static/img/work/express/other/express-zhun.png'"
							   @click="chooseExpressType('speed')"
							   style="width:42%;height:97px;margin-right:6px;"></image>
						<image :src="expressTypeValue=='price'?'../../../../../static/img/work/express/other/express-price-color.png':'../../../../../static/img/work/express/other/express-price.png'"
							   @click="chooseExpressType('price')"
							   style="width:42%;height:97px;"></image>
					</view>
					<view class=" flex justify-start" v-if="title.value=='local'">
						<image :src="expressTypeValue=='speed'?'../../../../../static/img/work/express/other/express-shun-color.png':'../../../../../static/img/work/express/other/express-shun.png'"
							   @click="chooseExpressType('speed')"
							   style="width:42%;height:97px;margin-right:6px;"></image>
						<image :src="expressTypeValue=='price'?'../../../../../static/img/work/express/other/express-today-color.png':'../../../../../static/img/work/express/other/express-today.png'"
							   @click="chooseExpressType('price')"
							   style="width:42%;height:97px;"></image>
					</view>
				</view>
			</view>
			<view style="height:13px;width:100%;background:rgba(247,247,247,1)"></view>
			<view class="other-container bg-white" >
				<view class="goods-item flex justify-between borderBottom align-center" @click="showModal($event)" data-target="goodsInfo">
					<view class="font-weight-normal font-size-normal item-name flex-sm"><text class="text-red">*</text>包裹信息</view>
					<view style="text-align:right;" class="text-ellipse flex-1">
						<text class="color-regular font-size-normal" >
							<text>{{goods.square}}m³/</text>
							{{goods.weight}}kg
							<text>/</text>{{goods.type}}
							<text v-show="goods.summary">/</text>{{goods.summary}}
						</text>
					</view>
					<text class="cuIcon-right right-icon"></text>
				</view>
				
				<common-flex 
					leftContent="保价" 
					type="navigate"
					:isRed="false"
					@operateItem="savePrice"
					:rightContent="price?price:'未保价货品最高赔付9倍运费，建议保价'"></common-flex>
					
				<view class="goods-item flex justify-between borderBottom align-center" v-if="receiveTarget==expressItem.customer">
					<view class="font-weight-normal font-size-normal font-size-normal color-normal"><text class="text-red">*</text>是否到付</view>
					<view>
						<view>
							<image :src="ispay=='pay'?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;"
								  @click="changePayment('pay')"></image>
							<text style="margin-right:25px;">是</text>

							<image :src="ispay=='nopay'?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;"
								    @click="changePayment('nopay')"></image>
							<text>否</text>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view class="submit-container">
			<view>
				<image :src="isAccept?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'"  @click="changeAccpet()"
				></image>
				<text style="color:#2A2A2A;" >我已阅读并同意</text>
				<text style="color:#42B0ED" @tap="goProtocol">《快件服务协议》</text>
			</view>
			<view class="submit-btn flex align-center">
				<view class="flex-1">
					预估运费 : <text class="font-size-bigger color-blue font-weight-bold">暂无</text>
				</view>
				<view class="flex-sm bg-blue" @click="submitOrder">下单</view>
			</view>
		</view>

		<!--//包裹信息-->
		<goods-info
			:isShow="modalName=='goodsInfo'"
			@hideModal="getGoodsInfo"
		></goods-info>

		
	</view>
</template>
<script>

	import commonFlex from '../../../../../components/common/common-flex.vue'
	import goodsInfo from '../../../../../components/express/goods-info.vue'
	
	import {mapState} from 'vuex'
	import {ChainShopApi} from '../../../../../api/shop_api.js'
	import {NewWaybillApi,RequisitionApi} from '../../../../../api/express_api.js'
	export default{
		computed:{
			...mapState(['userInfo','shopCount','shopOnlyObj']),
			expressItem(){return this.config.expressItem}
		},
		data(){
			return{
				title:{
					name:'',
					value:''
				},//判断是速递订单还是物流订单
				price:0,//报价
				goods:{
					type:'衣物',//物品类型
					weight:1,//重量
					square:1,//体积
					summary:'',//备注
				},
				ispay:'pay',//货到付款
				isAccept:true,
				modalName:'',
				expressTypeValue:'',//寄件类型
				expressTypeTabcur:0,//寄件类型
				sendShop:{},
				receiveShop:{
					id:'',//如果是门店，则为门店id,
					name:'',//如果是门店则为门店名字，
					province:'',
					provinceName:'',
					district:'',
					districtName:'',
					city:'',
					cityName:'',
					address:'',
					contactor:'',//如果是消费者，则为姓名
					teleophone:'',//消费者电话
				},
				receiverMan:{
					id:'',//如果是门店，则为门店的id,
					name:'',//联系人名称,
					mobile:'',//电话
				},
				expressType:[
					{img:'../../../../../static/img/work/express/other/express-speed.png',value:1},
					{img:'../../../../../static/img/work/express/other/express-price.png',value:2},
				],
				receiveTarget:'',//判断收件对象是门店还是消费者
				distributeItem:{},//调拨单详情
				newOrEdit:'new',
				screenHeight:500

			}
		},
		components:{
			goodsInfo,commonFlex
		},
		onShow(){
			this.getSystemInfo();
			this.$fire.on('supplierShop',result=>{
				this.receiveTarget=result.target;
				if(result.shop){
					this.receiveShop={
						id:result.shop.id,
						name:result.shop.name,
						province:result.shop.province,
						provinceName:result.shop.provinceName,
						city:result.shop.city,
						cityName:result.shop.cityName,
						district:result.shop.district,
						districtName:result.shop.districtName,
						address:result.shop.address,
					}
				}
				if(result.man){
					this.receiverMan={
						id:result.man.id,
						name:result.man.name,
						mobile:result.man.mobile || result.man.account
					}
				}
			
			
			})
			this.$fire.on('price',result=>{
				this.price=result;
				this.getSystemInfo()
			})
			this.$fire.on('address',result=>{
				this.receiveTarget=result.target;
				if(result){
					this.receiveShop={
						province:result.shoper.province,
						provinceName:result.shoper.provinceName,
						city:result.shoper.city,
						cityName:result.shoper.cityName,
						district:result.shoper.district,
						districtName:result.shoper.districtName,
						address:result.shoper.address,
					}
					this.receiverMan={
						name:result.shoper.name,//联系人名称,
						mobile:result.shoper.telephone,//电话
					}
				}
			})
		},
		methods:{
			goProtocol(){
				uni.navigateTo({
					url:"../express-protocol/express-protocol"
				})
			},
			getSystemInfo(){
				uni.getSystemInfo({
					success: (res) => {
						this.screenHeight=res.windowHeight-uni.upx2px(150)
					}
				})
			},
			getGoodsInfo(event){
				this.goods={
					type:event.goodsType,
					weight:event.weight,//重量
					square:event.square,//体积
					summary:event.goodSummary?event.goodSummary:'',//备注
				}
				this.hideModal()
			},

			hideModel(){
				if(this.modalName){
					this.modalName=null;
				}
			},
			editCheck(){
				if(this.expressTypeTabcur==0){
					
					this.$utils.showToast('还没有选择寄件类型')
					return false;
				}
				return true;
			},
			createCheck(){
				//收件对象是门店并且没有收件人，收件对象是第三方并且没有收件人信息
				if((this.receiveTarget==1 && !this.receiveShop)|| (this.receiveTarget==2 && !this.receiverMan)){
					
					this.$utils.showToast('还没有选择收件人')
					return false;
				}
				if(this.expressTypeTabcur==0){
					
					this.$utils.showToast('还没有选择寄件类型')
					return false;
				}
				if(!this.goods.weight || !this.goods.square){
					
					this.$utils.showToast('还没有选择包裹信息')
					return false;
				}
				return true;
			},
			submitOrder(){
				if(!this.isAccept){
					uni.showModal({
						content:'请遵守相关条例',
						success: (res) => {
							if(res.confirm){
								this.isAccept=true;
								this.createExpress()
							}
						}
					})
				}else{
					this.createExpress()
				}
			},
			async createExpress(){
				switch(this.newOrEdit){
					case 'new':
					//新建快递
					let newParams={};
					let params={
						destype:this.receiveTarget,
						type:this.expressTypeTabcur,//寄件类型
						catalog:this.goods.type,//判断物品类型
						departure:this.sendShop.id,//门店id
						deptype:this.expressItem.shop,//门店
						volume:this.goods.square?this.goods.square:'',//体积
						weight:this.goods.weight?this.goods.weight:'',//重量
						insamount:this.price?this.price:'',//报价
						summary:this.goods.summary?this.goods.summary:'',//备注
					};
					switch(this.receiveTarget){
						case this.expressItem.shop://门店
						newParams ={...params,destination:this.receiveShop.id,receiver:this.receiverMan.id}
						break;
						case this.expressItem.store://仓库
							newParams = {...params,
								destination:this.receiveShop.id,
								recverName:this.receiverMan.name?this.receiverMan.name:'',
								recverMobile:this.receiverMan.mobile?this.receiverMan.mobile:''}
						break;
						case this.expressItem.company://公司
							newParams = {...params,
								destination:this.receiveShop.id,
								recverName:this.receiverMan.name?this.receiverMan.name:'',
								recverMobile:this.receiverMan.mobile?this.receiverMan.mobile:''}
						break;
						case this.expressItem.customer://消费者
						
							newParams ={...params,
								destination:0,
								receiver:0,
								desaddr:`${this.receiveShop.provinceName}${this.receiveShop.cityName}${this.receiveShop.districtName}${this.receiveShop.address}`,
								destpay:this.ispay=='pay'?1:0,
								recverName:this.receiverMan.name?this.receiverMan.name:'',
								recverMobile:this.receiverMan.mobile?this.receiverMan.mobile:''
							}
						break
					}
					if(this.createCheck()){
						if(await NewWaybillApi(newParams)){
							this.$utils.showToast('下单成功')
							this.$utils.goBack()
							this.$utils.hide()
						}

					}
					break;
					case 'edit':
					//调拨转快递
					if(this.editCheck()){
						let val={
								type:this.expressTypeTabcur,//寄件类型
								catalog:this.goods.type,//判断物品类型
								departure:this.sendShop.id,//门店id
								deptype:this.expressItem.shop,//门店
								//目的地如果receiverName存在就是0
								destination:this.distributeItem.recverName && this.distributeItem.recverMobile ? 0:this.receiveShop.id,
								destype:this.distributeItem.recverName && this.distributeItem.recverMobile ?this.expressItem.customer:this.expressItem.shop,
								receiver:this.distributeItem.recverName && this.distributeItem.recverMobile?0:this.receiverMan.id,//店员
								desaddr:this.distributeItem.recverName && this.distributeItem.recverMobile?
										`${this.receiveShop.address}`:'',//消费者的地址
								volume:this.goods.square?this.goods.square:'',//体积
								weight:this.goods.weight?this.goods.weight:'',//重量
								// qty:this.goods.qty?this.goods.qty:'',//数量
								insamount:this.goods.price?this.goods.price:'',//报价
								destpay:0,//是否到付
								summary:this.goods.summary?this.goods.summary:'',//备注
								recverName:this.distributeItem.recverName && this.distributeItem.recverMobile?this.receiverMan.name:'',
								recverMobile:this.distributeItem.recverName && this.distributeItem.recverMobile?this.receiverMan.mobile:'',
								transfer:this.distributeItem.id
						}
						if(await NewWaybillApi(val)){
							this.$utils.showToast('下单成功')
							this.$utils.goBack()
							this.$utils.hide()
						}

					}
					break;
				}
			},
			chooseExpressType(type){
				this.expressTypeValue=type;
				this.expressTypeTabcur=type=='speed'?1:2;

			},

			chooseSenderItem(type){
				switch (type) {
					case 'send':
						uni.navigateTo({
							url:'../shop-list-applier/shop-list-applier'
						})
						break;
					case 'receiver':
						if(!this.sendShop.name){
							
							this.$utils.showToast('请输入寄件信息')
						}else{
							uni.navigateTo({
								url:"../shop-list-supplier/shop-list-supplier?type=emailReceiver&id="+this.sendShop.id
							})
						}
						break;
				}

			},
			savePrice(){
				//进行包裹保价
				uni.navigateTo({
					url:'../choose-express/choose-express?type='+this.title.value
				})
			},
			chooseItemOperate(type,item){
				switch(type){
					case 'time':
						this.timeTabCur=item.value;
						this.smallTimeName=item.name;
						break;
					case 'goodsType':
						this.goodsTypeTabCur=item.value;
						this.goodsTypeValue=item.name;

						break;
					case 'summary':
						this.goodSummaryTabCur=item.value;
						this.goodSummaryValue=item.name;
						this.goods.summary=`${this.goods.summary} ${this.goodSummaryValue}`
				}

			},

			chooseExpress(item){
				this.expressTab=item.id
			},
			goBack(){
				uni.navigateTo({
					url:'../express-index/express-index'
				})
			},
			changePayment(type){
				this.ispay=type;
			},
			changeAccpet(){
				this.isAccept=!this.isAccept
			},
			showModal(event) {
				this.modalName = event.currentTarget.dataset.target;

			},
			hideModal(){
				this.modalName=null;
			},
			async getShopItem(id){
				let result = await ChainShopApi(id);
				this.sendShop={
					id:result.id,
					name:result.name,
					address:result.address?result.address:'',
					provinceName:result.provinceName?result.provinceName:'',
					cityName:result.cityName?result.cityName:'',
					districtName:result.districtName?result.districtName:'',
					saleName:this.userInfo.name?this.userInfo.name:'',
					saleTel:this.userInfo.mobile?this.userInfo.mobile:''
				}

			},
			/**
			 * @param {Object} type
			 获得调拨单详情
			 */
			async getDistributeInfo(id){
				this.distributeItem = await RequisitionApi(id);
				this.sendShop={
					id:this.distributeItem.supplyShop,
					name:this.distributeItem.supplyShopName,
				
				}
				this.receiveShop={
					id:this.distributeItem.applyShop?this.distributeItem.applyShop:'',//如果是门店，则为门店id,
					name:this.distributeItem.applyShopName?this.distributeItem.applyShopName:'',//如果是门店则为门店名字，
					province:'',
					provinceName:'',
					district:'',
					districtName:'',
					city:'',
					cityName:'',
					address:'',
					contactor:'',//如果是消费者，则为姓名
					teleophone:'',//消费者电话
				}
				this.receiverMan={
					id:this.distributeItem.applier?this.distributeItem.applier:'',//如果是门店，则为门店的id,
					name:this.distributeItem.recverName?this.distributeItem.recverName:this.distributeItem.applierName,//联系人名称,
					mobile:this.distributeItem.recverMobile?this.distributeItem.recverMobile:this.distributeItem.applierMobile,//电话
				}

			},

			goodsNumOperate(type,operate){
				switch(type){
					case 'square':
						if(operate=='minus'){
							if(this.goods.square>1){
								this.goods.square--
							}
						}else if(operate=='add'){
							this.goods.square++;
						}
						break;
					case 'weight':
						if(operate=='minus'){
							if(this.goods.weight>1){
								this.goods.weight--
							}
						}else if(operate=='add'){
							this.goods.weight++;
						}
						break;
					case 'qty':
						if(operate=='minus'){
							if(this.goods.qty>1){
								this.goods.qty--
							}
						}else if(operate=='add'){
							this.goods.qty++;
						}
						break;
				}

			}
		},
		onLoad(options){
			this.getSystemInfo()
			this.newOrEdit=options.newOrEdit;
			if(options.type=='speed'){
				this.title={name:'速递寄件',value:'speed',catalog:1}
				uni.setNavigationBarTitle({
					title:this.title.name
				})
				
			}
			switch(this.newOrEdit){
				case 'new':
				if(this.shopCount==1){
					this.sendShop={
						id:this.shopOnlyObj.id,
						name:this.shopOnlyObj.name?this.shopOnlyObj.name:'',
						address:this.shopOnlyObj.address?this.shopOnlyObj.address:'',
						provinceName:this.shopOnlyObj.provinceName?this.shopOnlyObj.provinceName:'',
						cityName:this.shopOnlyObj.cityName?this.shopOnlyObj.cityName:'',
						districtName:this.shopOnlyObj.districtName?this.shopOnlyObj.districtName:'',
						saleName:this.userInfo.name?this.userInfo.name:'',
						saleTel:this.userInfo.mobile?this.userInfo.mobile:''
					}
				}else{
					this.getShopItem(options.id)
				}
				break;
				case 'edit':
				if(options.id){
					//获得调拨单详情
					this.getDistributeInfo(options.id)
				}
				break;
			}
			
			
			//需求方
			this.$fire.on('applierShop',result=>{
				this.sendShop=result;
			})
			
			
			
		},
	}
</script>
<style lang="less" >
	.submit-container{
		position:fixed;
		bottom:0;
		right:0;
		left:0;
	}
	.submit-container>view:first-child{
		padding:20upx 0 20upx 30upx;
		background:rgba(247,247,247,1);
		font-size:12px;
	}
	.submit-container>view:first-child>image{
		width:32upx;height:32upx;margin-right:10upx;vertical-align: middle;
	}
	.submit-btn{
		background-color: #fff;
		height:100upx;
		font-size:16px;
		line-height:100upx;
	}
	.submit-btn>view:first-child{
		margin-left:30upx;
	}
	.submit-btn>view:first-child>text{
		margin-left:10upx;
	}
	.submit-btn>view:nth-child(2){
		text-align: center;
		font-size:20px;
		color:#fff;
	}
	page{
		background:rgba(247,247,247,1)
	}
	.send-info>view:nth-child(1){
		margin-left:46upx;
	}
	.send-info>view:nth-child(2){
		margin:40upx 0 ;
	}
	.send-info>view:nth-child(3){
		padding:46upx;
	}
	.receive-tag{
		
		background:rgba(66,176,237,1);
	}
	.express-tag{
		width:90upx;
		height:90upx;
		border-radius: 50%;
		color:#fff;
		margin-right:28upx;
		text-align:center;
		line-height:90upx;
		font-size:20px;
	}
	.send-tag{
		
		background:rgba(32,32,32,1);
	}
	
	.shopInfo{
		width:60%;
	
	}
	.goods-item{
		padding:0px 18upx 0px 8upx;
		height:106upx;
		line-height:106upx;
		
	
	}
	.right-icon{
		font-size:18px;
		color:#898888;
	}
	.goods-item-summary-name{
		padding-bottom:20upx;
	}
	.goods-item-summary{
		padding:34upx 22upx 48upx 28upx;
		
	}
	.goods-item-area{
		max-height:168upx;
		width:100%;
		padding-top:16upx;
		padding-left:22upx;
		background:rgba(247,247,247,1);
		border-radius:10upx;
	}
	
	.goods-info-item .num-tab{
		display: inline-block;width:48upx;height:48upx;border-radius: 50%;text-align: center;
		font-size:24px;
		line-height:40upx;
	}
	.goods-info-item .tab-add{
		background:#EEEEED;color:#2A2A2A;
	}
	.goods-info-item .tab-minus{
		background:#42B0ED;color:#fff;
	}
	
	.goods-type{
		border-radius:28upx;
		border:1px solid rgba(216,216,216,1);width:24%;padding:8upx 0;text-align: center;
	}
	.express-item-modal{
		padding-top:40upx;padding-left:28upx;padding-bottom:10upx;
		
	}
	.express-item-tab{
		margin-bottom:38upx;
		
	}
	.express-logo{
		width: 88upx;height:88upx;vertical-align: middle;margin-right:32upx;
	}
	.choose-item{
		width:36upx;height:36upx;right:36upx;top:30upx;
	}
	
	.time-info{
		padding:22upx 64upx 20upx 30upx;
	}
	.borderNo{
		border:none
	}
	.borderRight{
		border-right:1px solid #EEEEED;
	}
</style>
