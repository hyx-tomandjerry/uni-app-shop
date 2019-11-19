<template>
	<view :style="{height:windowHeight+'px'}" class="position_relative" id="test">
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back"  @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold color-normal" >{{title.name}}</view></block>
		</cu-custom>
		<scroll-view scroll-y="true" :style="{minHeight:screenHeight+'px'}">
			<view class="express-container borderTop bg-white">
				<view class="user-info border-top ">
					<view class="flex justify-start position_relative send-info borderBottom align-center" >
						<view class="send-tag" >寄</view>
						<view class="font-size-normal font-weight-normal shopInfo"
						:class="{'borderRight':!distributeItem.id,'borderNo':distributeItem.id}"
						>
							<view v-if="sendShop.name">
								<view class="font-size-normal color-normal font-weight-bold">{{sendShop.name || ''}}</view>
								<view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">{{sendShop.saleName || distributeItem.supplierName}}</text>{{sendShop.saleTel || distributeItem.supplierMobile}}</view>
								<view style="font-size:12px;" class="color-placeholder">{{sendShop.provinceName || ''}}{{sendShop.cityName || ''}}{{sendShop.districtName || ''}}
									{{sendShop.address || ''}}</view>
							</view>
							<view v-else style="color:#606060" class="font-size-normal">请填写/添加寄件人信息</view>
						</view>
						<text class=" position_absolute "
						  v-if="!distributeItem.id"
						 @click="chooseSenderItem('send')" style="right:21px;top:35px;color:#42B0ED">选择</text>
					</view>
					<view class="flex justify-start position_relative send-info borderBottom align-center">
						<view class="receive-tag" >收</view>
						<view class="font-size-normal font-weight-normal shopInfo"
							:class="{'borderRight':!distributeItem.id,'borderNo':distributeItem.id}"
						>
							<view v-if="receiverMan.name">
								<view class="font-size-normal color-normal font-weight-bold">{{receiveShop.name || ''}}</view>
								<view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">{{receiverMan.name}}</text>{{receiverMan.account || receiverMan.mobile}}</view>
								<view style="font-size:12px;" class="color-placeholder">{{receiveShop.provinceName || ''}}{{receiveShop.cityName || ''}}
									{{receiveShop.districtName || ''}}{{receiveShop.address || ''}}</view>
							</view>
							<view v-else style="color:#606060" class="font-size-normal">请填写/添加收件人信息</view>
						</view>
						<text class=" position_absolute  "
						  v-if="!distributeItem.id"
						 @click="chooseSenderItem('receiver')" style="right:21px;top:35px;color:#42B0ED">选择</text>
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
				<view class="goods-item flex justify-between borderBottom align-center" >
					<view class=" font-size-normal item-name"><text class="text-red">*</text>身份证号</view>
					<view class="color-normal font-size-normal">{{userInfo.idnum}}</view>
				</view>

				<view class="goods-item flex justify-between borderBottom align-center" @click="showModal($event)" data-target="goodsInfo">
					<view class="font-weight-normal font-size-normal item-name"><text class="text-red">*</text>包裹信息</view>
					<view style="width:60%;text-align:right;padding-top:2px;" class="text-ellipse">
						<text class="color-normal font-size-normal" v-if="expressTypeValue || goods.summary">
							<text v-if="goods.size">{{goods.size}}平方米/</text>
							{{goods.weight}}kg
							<text v-if="goodsTypeValue">/</text>{{goodsTypeValue}}
							<text v-if="goods.summary">/</text>{{goods.summary}}
						</text>
						<text class="font-size-normal color-regular" v-else>
							请选择包裹信息
						</text>

					</view>
					<text class="cuIcon-right right-icon"></text>
				</view>

				<view class="goods-item flex justify-between borderBottom align-center">
					<view class="font-weight-normal font-size-normal item-name" style="padding-left:15px;">保价</view>
					<view style="width:80%;text-align:right">
						<input type="text" placeholder="未保价货品最高赔付9倍运费，建议保价"
							   :class="{'color-regular':!goods.price,'color-normal':goods.price}"
							   class="font-size-normal" v-model="goods.price"></view>
					<text class="cuIcon-right " style="font-size:18px;right:13px;top:30px;color:#898888;"></text>
				</view>
				<view class="goods-item flex justify-between borderBottom align-center" v-if="receiveTarget==expressItem.customer">
					<view class="font-weight-normal font-size-normal item-name"><text class="text-red">*</text>是否到付</view>
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
		</scroll-view>
		<view class="btn-container   flex-all" >
			<view class="font-size-mini  align-center protocol-area">
				<image :src="isAccept?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'" style="width:16px;height:16px;margin-right:5px;vertical-align: middle;"  @click="changeAccpet()"
				></image>
				<text style="color:#2A2A2A;" >我已阅读并同意</text>
				<text style="color:#42B0ED">《京东快件服务协议》《丽象服务协议》</text>
			</view>
			<view class="flex justify-start ">
				<view	class="submit-price-btn"
						>预估计运费暂无</view>
				<view 	class="submit-btn"
						 @click="createExpress">下单</view>
			</view>

		</view>




		<!--//包裹信息-->
		<view class="cu-modal bottom-modal" :class="modalName=='goodsInfo'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green"></view>
					<view class="font-size-big color-normal">包裹信息</view>
					<view class="action text-blue font-size-normal" @tap="hideModal">确定</view>
				</view>
				<view class="padding-xl borderTop bg-white">
					<view class="goods-info-item flex justify-between" style="margin-bottom:18px;">
						<view class="font-size-big color-normal">体积</view>
						<view class="flex justify-start">
							<view class="num-tab " @click="goodsNumOperate('square','minus')">-</view>
							<view style="background:#F5F5F5;padding:3px 12px;margin:0 9px;" class="font-size-normal color-normal">
								{{goods.square}}m³
							</view>

							<view class="num-tab " @click="goodsNumOperate('square','add')">+</view>
						</view>
					</view>
					<!--<view class="goods-info-item flex justify-between" style="margin-bottom:18px;">-->
						<!--<view class="font-size-big color-normal">数量</view>-->
						<!--<view>-->
							<!--<text class="num-tab tab-add" @click="goodsNumOperate('qty','minus')">-</text>-->
							<!--<text style="font-size:19px;"><text style="color:#2A2A2A;padding:0 20px;">{{goods.qty}}</text> <text style="color:#898888;margin-right:4px;">㎡</text></text>-->
							<!--<text class="num-tab tab-minus" @click="goodsNumOperate('qty','add')">+</text>-->
						<!--</view>-->
					<!--</view>-->
					<view class="goods-info-item flex justify-between" style="margin-bottom:18px;">
						<view class="font-size-big color-normal">重量</view>
						<view  class="flex justify-start">
							<view class="num-tab " @click="goodsNumOperate('weight','minus')">-</view>
							<view style="background:#F5F5F5;padding:3px 12px;margin:0 9px;" class="font-size-normal color-normal">
								{{goods.weight}}kg

							</view>
							<view class="num-tab " @click="goodsNumOperate('weight','add')">+</view>
						</view>
					</view>
					<view class="font-size-mini color-placeholder text-left" style="white-space: nowrap;margin-bottom:14px;">
						(注：重量以快递员称重为准，快件“虚胖”要按体积收费哦～)
					</view>
					<view>
						<view class="font-size-big color-normal text-left" style="margin-bottom:10px;">物品类型</view>
						<view class="flex justify-around" style="margin-bottom:17px;" >
							<view class="goods-type" v-for="(item,index) in goodType" :key="index"
								  :class="{'bg-blue':goodsTypeTabCur==item.value,'text-white':goodsTypeTabCur==item.value}"
								  @click="chooseItemOperate('goodsType',item)">
								{{item.name}}
							</view>
						</view>
					</view>
					<view>
						<view class="font-size-big color-normal text-left" style="margin-bottom:10px;">备注</view>
						<view class="flex justify-around" style="margin-bottom:17px;">
							<view class="goods-type" v-for="(item,index) in goodSummary" :key="index" :class="{
								'bg-blue':goodSummaryTabCur==item.value,
								'text-white':goodSummaryTabCur==item.value
							}"  @click="chooseItemOperate('summary',item)">
								{{item.name}}
							</view>
						</view>
					</view>

					<view class="position_relative">
						<textarea  cols="30" rows="10" v-model="goods.summary" placeholder="请输入包裹备注信息" maxlength="100"
							class="goods-summary text-left"
						></textarea>

						<view style="position:absolute;right:10px;bottom:10px;"><text class="text-blue">{{goods.summary.length}}</text>/100</view>
					</view>
				</view>
			</view>
		</view>


		<showModel :isShow="modalName=='orderModal'" @hideModel="hideModel"
				   @confirmDel="hideModel" v-if="modalName=='orderModal'">
			<block slot="content">请遵守相关条例</block>
		</showModel>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	import showModel from '../../../../../components/show-model.vue'
	export default{
		computed:mapState(['userInfo','expressStatusZn','expressCatalog','expressItem']),
		data(){
			return{
				title:{
					name:'',
					value:''
				},//判断是速递订单还是物流订单
				goods:{
					name:'',
					number:1,
					weight:1,
					price:'',
					summary:'',
					card:'',//身份证号
					square:1,
					size:1,//体积
					qty:1,//数量
				},
				ispay:'pay',//货到付款
				isAccept:true,
				modalName:'',
				goodsTypeTabCur:0,//包裹类型
				goodsTypeValue:'',//包裹类型
				goodSummaryTabCur:0,//包裹备注
				goodSummaryValue:'',//包裹备注
				goodsSummaryList:[],
				expressTypeValue:'',//寄件类型
				expressTypeTabcur:0,//寄件类型
				goodType:[
					{name:'衣物',value:1},
					{name:'文件',value:2},
					{name:'数码产品',value:3},
					{name:'其他',value:4},
				],
				goodSummary:[
					{name:'带防水袋',value:1},
					{name:'带文件封',value:2},
					{name:'带纸箱',value:3},
					{name:'上门请联系',value:4},
				],
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
				windowHeight:'',
				sTop:'',
				screenHeight:''

			}
		},
		components:{
			showModel
		},
		mounted(){
			this.viewTop()
		},
		methods:{
			/**
			 * 获得页面的相对高度
			 */
			viewTop(){
				uni.createSelectorQuery().select('#test').boundingClientRect((e)=>{
					this.sTop=e.top

				}).exec()
			},
			hideModel(){
				if(this.modalName){
					this.modalName=null;
				}
			},
			createExpress(){
				if(!this.isAccept){
					this.modalName='orderModal'
				}else{
					if(this.distributeItem.id){
						if(this.expressTypeTabcur==0){
							uni.showToast({
								title:'还没有选择寄件类型',
								icon:'none'
							})
						}else if(!this.goods.weight || !this.goods.size){
							uni.showToast({
								title:'还没有选择包裹信息',
								icon:'none'
							})
						}else{
							this.$ajax('NewWaybill',{
								type:this.expressTypeTabcur,//寄件类型
								catalog:this.goodsTypeValue,//判断物品类型
								departure:this.sendShop.id,//门店id
								deptype:this.expressItem.shop,//门店
								//目的地如果receiverName存在就是0
								// destination:this.receiveTarget==this.expressItem.customer?0:this.receiveShop.id,
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
							},res=>{
								if(res==-75){
									uni.showToast({
										title:'收件人和寄件人不能相同!',
										icon:'none'
									})
								}else{
									uni.navigateTo({
										url:"../success-send/success-send?way="+this.expressCatalog.express+'&id='+res+"&type=distribute"
									})
								}

							})
						}
					}else{
						if(!this.sendShop){
							uni.showToast({
								title:'还没有选择寄件人',
								icon:'none'
							})
						}else if(
						(this.receiveTarget==1 && !this.receiveShop)
						|| (this.receiveTarget==2 && !this.receiverMan)){
							uni.showToast({
								title:'还没有选择收件人',
								icon:'none'
							})
						}else if(this.expressTypeTabcur==0){
							uni.showToast({
								title:'还没有选择寄件类型',
								icon:'none'
							})
						}else if(!this.goods.weight || !this.goods.size){
							uni.showToast({
								title:'还没有选择包裹信息',
								icon:'none'
							})
						}else{
							this.$ajax('NewWaybill',{
								type:this.expressTypeTabcur,//寄件类型
								catalog:this.goodsTypeValue,//判断物品类型
								departure:this.sendShop.id,//门店id
								deptype:this.expressItem.shop,//门店
								destination:this.receiveTarget==this.expressItem.customer?0:this.receiveShop.id,
								destype:this.receiveTarget,
								receiver:this.receiveTarget==this.expressItem.customer?0:this.receiverMan.id,//店员
								desaddr:this.receiveTarget==this.expressItem.customer?
										`${this.receiveShop.provinceName}${this.receiveShop.cityName}${this.receiveShop.districtName}${this.receiveShop.address}`:'',//消费者的地址
								volume:this.goods.square?this.goods.square:'',//体积
								weight:this.goods.weight?this.goods.weight:'',//重量
								// qty:this.goods.qty?this.goods.qty:'',//数量
								insamount:this.goods.price?this.goods.price:'',//报价
								destpay:this.ispay=='pay'?1:0,//是否到付
								summary:this.goods.summary?this.goods.summary:'',//备注
								recverName:this.receiveTarget==this.expressItem.customer?this.receiverMan.name:'',
								recverMobile:this.receiveTarget==this.expressItem.customer?this.receiverMan.mobile:'',
							},res=>{
								if(res==-75){
									uni.showToast({
										title:'收件人和寄件人不能相同!',
										icon:'none'
									})
								}else{
									uni.navigateTo({
										url:"../success-send/success-send?way="+this.expressCatalog.express+'&id='+res+"&type=create"
									})
								}

							})
						}
					}



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
							uni.showToast({
								title:'请输入寄件信息',
								icon:'none'
							})
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
				uni.redirectTo({
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

			/**
			 * @param {Object} type
			 获得调拨单详情
			 */
			getDistributeInfo(id){
				this.$ajax('Requisition',{id:id},res=>{
					this.distributeItem=res;
					this.sendShop={
						id:res.supplyShop,
						name:res.supplyShopName,

					}
					this.receiveShop={
					id:res.applyShop?res.applyShop:'',//如果是门店，则为门店id,
					name:res.applyShopName?res.applyShopName:'',//如果是门店则为门店名字，
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
					id:res.applier?res.applier:'',//如果是门店，则为门店的id,
					name:res.recverName?res.recverName:res.applierName,//联系人名称,
					mobile:res.recverMobile?res.recverMobile:res.applierMobile,//电话
				}


				})
			},
			backFixationTop(){
				uni.pageScrollTo({
					scrollTop:this.sTop,
					duration:10
				})
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
			uni.getSystemInfo({
				success:(res)=>{
					this.screenHeight=res.screenHeight-100;
				}
			})
			if(options.type=='speed'){
				this.title={name:'速递寄件',value:'speed',catalog:1}
			}else if(options.type=='logistics'){
				this.title={name:'物流寄件',value:'logistics',catalog:2}
			}
			if(options.id){
				//获得调拨单详情
				this.getDistributeInfo(options.id)
			}
			//需求方
			this.$fire.on('applierShop',result=>{
				console.log(result)
				this.sendShop=result;
			})
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
					this.receiveTarget=result.target;
					this.receiverMan={
						id:result.man.id,
						name:result.man.name,
						mobile:result.man.mobile || result.man.account
					}
				}


			})
			this.$fire.on('price',result=>{
				this.goods.price=result;
				this.backFixationTop();
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
			uni.getSystemInfo({
				success:(res)=>{
					this.windowHeight=res.windowHeight;
				}
			})
		},
	}
</script>
<style lang="less" >
	page{
		background:rgba(247,247,247,1)
	}
	.express-container{
		.user-info{
			.send-info{
				padding:23px 9px 22px 18px;

			}
			.send-tag{
				width:45px;
				height:45px;
				border-radius: 50%;
				color:#fff;
				margin-right:14px;
				text-align:center;
				line-height:45px;
				font-size:20px;
				background:rgba(32,32,32,1);
			}
			.receive-tag{
				width:45px;
				height:45px;
				border-radius: 50%;
				color:#fff;
				text-align:center;
				line-height:45px;
				font-size:20px;
				margin-right:14px;
				background:rgba(66,176,237,1);
			}
			.shopInfo{
				width:60%;

			}

		}

	}
	.goods-container,.other-container{


		.goods-item{
			padding:0px 9px 0px 15px;
			height:53px;
			line-height:53px;
			.item-name{

				font-size:15px;
				color:#2A2A2A;
			}
			.right-icon{
				font-size:18px;
				color:#898888;
			}

		}
		.goods-item-summary{
			padding:17px 11px 24px 14px;
			.goods-item-summary-name{
				padding-bottom:10px;
			}
		}
		.goods-item-area{
			max-height:84px;
			width:100%;
			padding-top:8px;
			padding-left:11px;
			background:rgba(247,247,247,1);
			border-radius:4px;
		}
	}
	.btn-container{
		background:#fff;
		.protocol-area{
			padding-left:14px;height:36px;line-height:36px;background:rgba(247,247,247,1)
		}
		.submit-price-btn{
			flex:1;padding-top:19px;padding-left:15px;padding-bottom:19px;font-size:16px;color:#2A2A2A
		}
		.submit-btn{
			width:35%;padding-top:16px;background:rgba(66,176,237,1);font-size:20px;text-align: center;color:white
		}

	}
	.goods-info-item{
		.num-tab{
			display: inline-block;width:24px;height:24px;border-radius: 50%;text-align: center;
			font-size:24px;
			line-height:20px;
		}
		.tab-add{
			background:#EEEEED;color:#2A2A2A;
		}
		.tab-minus{
			background:#42B0ED;color:#fff;
		}

	}
	.goods-type{
		border-radius:14px;
		border:1px solid rgba(216,216,216,1);width:24%;padding:4px 0;text-align: center;
	}
	.express-item-modal{
		padding-top:20px;padding-left:14px;padding-bottom:5px;
		.express-item-tab{
			margin-bottom:19px;
			.express-logo{
				width: 44px;height:44px;vertical-align: middle;margin-right:16px;
			}
			.choose-item{
				width:18px;height:18px;right:18px;top:15px;
			}
		}
	}
	.goods-summary{
		background:rgba(247,247,247,1);
		border-radius:8px;
		width:100%;
		max-height:103px;
		padding-left:10px;
		padding-top:10px;
		font-size:12px;
	}
	.time-info{
		padding:11px 32px 10px 15px;
	}
	.borderNo{
		border:none
	}
	.borderRight{
		border-right:1px solid #EEEEED;
	}
</style>
