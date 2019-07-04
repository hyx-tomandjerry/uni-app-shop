<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="left"><text class="cuIcon-back" style="font-size:22px;" @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold" >{{title.name}}</view></block>
		</cu-custom>
		<view class="express-container borderTop">
			<view class="user-info border-top">
				<view class="flex justify-start position_relative send-info borderBottom align-center" >
					<view class="send-tag" >寄</view>
					<view class="font-size-normal font-weight-normal shopInfo" >
						<view v-if="sendShop">
							<view class="font-size-normal color-normal font-weight-bold">{{sendShop.name}}</view>
							<view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">{{userInfo.name}}</text>{{userInfo.mobile}}</view>
							<view style="font-size:12px;" class="color-placeholder">{{sendShop.provinceName}}{{sendShop.cityName}}{{sendShop.districtName}}{{sendShop.address}}</view>
						</view>
						<view v-else>请填写/添加寄件人信息</view>
					</view>
					<text class=" position_absolute " @click="chooseSenderItem('send')" style="right:21px;top:35px;color:#42B0ED">选择</text>
				</view>
				<view class="flex justify-start position_relative send-info borderBottom align-center">
					<view class="receive-tag" >收</view>
					<view class="font-size-normal font-weight-normal shopInfo" >
						<view v-if="receiveShop">
							<view class="font-size-normal color-normal font-weight-bold">{{receiveShop.name}}</view>
							<view  class="font-size-normal color-normal font-weight-bold"><text style="margin-right:10px;">{{reveiverMan.name}}</text>{{reveiverMan.account}}</view>
							<view style="font-size:12px;" class="color-placeholder">{{receiveShop.provinceName}}{{receiveShop.cityName}}{{receiveShop.districtName}}{{receiveShop.address}}</view>
						</view>
						<view v-else>请填写/添加收件人信息</view>
					</view>
					<text class=" position_absolute  "  @click="chooseSenderItem('receiver')" style="right:21px;top:35px;color:#42B0ED">选择</text>
				</view>
			</view>
		</view>
		<view class="other-container"  style="margin-bottom:8px;">
			<view class="goods-item flex justify-between borderBottom align-center">
				<view class="font-weight-normal font-size-normal item-name"><text class="text-red">*</text>取件方式</view>
				<view style="color:#42B0ED;padding:0 8px;border:1px solid #42B0ED;border-radius:12px;">上门取件</view>
			</view>
			<view class="goods-item flex justify-between borderBottom align-center" @click="showModal($event)" data-target="timeModal">
				<view class="font-weight-normal font-size-normal item-name"><text class="text-red">*</text>期待上门时间</view>
				<view style="width:65%;text-align:right">
					<view v-if="mainTimeName && smallTimeName" class="font-size-normal">
						<text style="margin-right:4px;">{{mainTimeName}}</text><text>{{smallTimeName}}</text>
					</view>
					<view v-else>
						<text class="font-weight-normal font-weight-normal text-grey" >请选择上门时间</text>
					</view>
				</view>
				<text class="cuIcon-right right-icon"   @click="showModal($event)" data-target="timeModal"></text>
			</view>
			<view class="goods-item borderBottom">
				<view style="margin-bottom:11px;"><text class="text-red">*</text><text>寄件类型及预计送达时间</text></view>
				<view class=" flex justify-start" v-if="title.value=='speed'">
					<image :src="expressTypeTabcur=='speed'?'../../../../../static/img/work/express/other/express-speed-color.png':'../../../../../static/img/work/express/other/express-speed.png'"
						   @click="chooseExpressType('speed')"
						   style="width:42%;height:97px;margin-right:6px;"></image>
					<image :src="expressTypeTabcur=='price'?'../../../../../static/img/work/express/other/express-price-color.png':'../../../../../static/img/work/express/other/express-price.png'"
						   @click="chooseExpressType('price')"
						   style="width:42%;height:97px;"></image>
				</view>
				<view class=" flex justify-start" v-if="title.value=='logistics'">
					<image :src="expressTypeTabcur=='speed'?'../../../../../static/img/work/express/other/express-zhun-color.png':'../../../../../static/img/work/express/other/express-zhun.png'"
						   @click="chooseExpressType('speed')"
						   style="width:42%;height:97px;margin-right:6px;"></image>
					<image :src="expressTypeTabcur=='price'?'../../../../../static/img/work/express/other/express-price-color.png':'../../../../../static/img/work/express/other/express-price.png'"
						   @click="chooseExpressType('price')"
						   style="width:42%;height:97px;"></image>
				</view>
				<view class=" flex justify-start" v-if="title.value=='local'">
					<image :src="expressTypeTabcur=='speed'?'../../../../../static/img/work/express/other/express-shun-color.png':'../../../../../static/img/work/express/other/express-shun.png'"
						   @click="chooseExpressType('speed')"
						   style="width:42%;height:97px;margin-right:6px;"></image>
					<image :src="expressTypeTabcur=='price'?'../../../../../static/img/work/express/other/express-today-color.png':'../../../../../static/img/work/express/other/express-today.png'"
						   @click="chooseExpressType('price')"
						   style="width:42%;height:97px;"></image>
				</view>
			</view>
		</view>

		<view class="other-container" style="margin-bottom:8px;">
			<view class="goods-item flex justify-between borderBottom" v-if="title.value!='speed'">
				<view class="font-weight-normal font-size-normal item-name"><text class="text-red">*</text>身份证号</view>
				<input type="text" v-model="goods.card" placeholder="请输入身份证号" style="text-align: right;">
			</view>

			<view class="goods-item flex justify-between borderBottom" @click="showModal($event)" data-target="goodsInfo">
				<view class="font-weight-normal font-size-normal item-name"><text class="text-red">*</text>包裹信息</view>
				<view style="width:75%;text-align:right;padding-top:2px;"><text class="font-weight-normal font-weight-normal text-grey" >
					请选择包裹信息
				</text></view>
				<text class="cuIcon-right right-icon"></text>
			</view>

			<view class="goods-item flex justify-between borderBottom align-center" @click="savePrice()">
				<view class="font-weight-normal font-size-normal item-name">保价</view>
				<view style="width:80%;text-align:right">
					<input type="text" placeholder="未保价货品最高赔付9倍运费，建议保价"  class="font-weight-normal font-weight-normal text-gray" v-model="goods.price"></view>
				<text class="cuIcon-right " style="font-size:18px;right:13px;top:30px;color:#898888;"></text>
			</view>

			<view class="goods-item flex justify-between borderBottom align-center">
				<view class="font-weight-normal font-size-normal item-name"><text class="text-red">*</text>是否到付</view>
				<view>
					<view>

						<image src="../../../../../static/icon/choose.png" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;" v-if="ispay" @click="changePayment()"></image>
						<image src="../../../../../static/icon/nochoose.png" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;" v-else @click="changePayment()"></image>
						<text style="margin-right:25px;">是</text>
						<image src="../../../../../static/icon/nochoose.png" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;" v-if="ispay" @click="changePayment()"></image>
						<image src="../../../../../static/icon/choose.png" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;" v-else @click="changePayment()"></image>

						<text>否</text>
					</view>

				</view>
			</view>
		</view>
		
		<view style="margin-bottom:7px;padding-left:14px;" class="font-size-mini font-weight-normal">
			
			<image src="../../../../../static/icon/nochoose.png" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;"  @click="changeAccpet()" v-if="isAccept"></image>
			<image src="../../../../../static/icon/choose.png" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;"  v-else @click="changeAccpet()"></image>
			<text style="color:#2A2A2A;" >我已阅读并同意</text>
			<text style="color:#42B0ED">《服务协议》</text>
		</view>

		<view class="btn-container flex justify-start">
			<view style="width:65%;padding-top:19px;padding-left:15px;padding-bottom:19px;font-size:16px;color:#2A2A2A">预估计运费暂无</view>
			<view style="width:35%;padding-top:16px;background:rgba(66,176,237,1);font-size:20px;text-align: center;color:white">下单</view>
		</view>
		
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white borderBottom">
					<view class="action text-green"></view>
					<view class="font-weight-normal font-size-big">快递选择</view>
					<view class="action cuIcon-close" @click="hideModal()"></view>
				</view>
				<view class="bg-white">
					<view  class="express-item-modal">
						<view class="flex justify-start express-item-tab position_relative" 
							@click="chooseExpress(item)"
						v-for="(item,index) in expressList" :key="index">
							<image :src="item.url" class="express-logo"></image>
							<view style="text-align: left;">
								<view class="font-size-big font-weight-bold">{{item.title}}</view>
								<view class="font-size-normal font-weight-normal">{{item.desc}}</view>
							</view>
							<image src="../../../../../static/img/work/choose.png" v-if="item.id==expressTab" mode=""  class="position_absolute choose-item"></image>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<view class="cu-modal bottom-modal" :class="modalName=='timeModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white borderBottom">
					<view class="action text-green"></view>
					<view class=" font-size-big color-normal">上门取件时间</view>
					<view class="action" style="font-size:14px;" @click="hideModal()">确定</view>
				</view>
				<view class="">
					<view  class="bg-white nav">
						<view class="flex text-center">
							<view class="cu-item flex-sub font-size-big " :class="item.id==mainTimeTabCur?'text-blue cur':''" v-for="(item,index) in timeTab" :key="index"
							 @click="tabSelect(item)"
							 :data-id="index">
							{{item.name}}
							</view>
						</view>
						<view >

							<view class="flex justify-between time-info"
								  :class="{
								  	'bg-gray':index%2==0
								  }"
								  v-for="(item,index) in timeList" :key="index" @click="chooseItemOperate('time',item)">
								{{item.name}}
								<image src="../../../../../static/icon/xuanze.png" style="width:18px;height:18px;"
									v-if="timeTabCur==item.value"
								></image>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<!--//包裹信息-->
		<view class="cu-modal bottom-modal" :class="modalName=='goodsInfo'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green"></view>
					<view class="font-size-big color-normal">包裹备注</view>
					<view class="action text-blue font-size-normal" @tap="hideModal">确定</view>
				</view>
				<view class="padding-xl borderTop bg-white">
					<view class="goods-info-item flex justify-between" style="margin-bottom:18px;" v-if="title.value=='logistics'">
						<view class="font-size-big color-normal">体积</view>
						<view>
							<text class="num-tab tab-add" @click="goodsNumOperate('square','minus')">-</text>
							<text style="font-size:19px;"><text style="color:#2A2A2A;padding:0 20px;">{{goods.square}}</text> <text style="color:#898888;margin-right:4px;">㎡</text></text>
							<text class="num-tab tab-minus" @click="goodsNumOperate('square','add')">+</text>
						</view>
					</view>
					<view class="goods-info-item flex justify-between" style="margin-bottom:18px;">
						<view class="font-size-big color-normal">重量</view>
						<view>
							<text class="num-tab tab-add" @click="goodsNumOperate('weight','minus')">-</text>
							<text style="font-size:19px;"><text style="color:#2A2A2A;padding:0 20px;">{{goods.weight}}</text> <text style="color:#898888;margin-right:4px;">kg</text></text>
							<text class="num-tab tab-minus" @click="goodsNumOperate('weight','add')">+</text>
						</view>
					</view>
					<view class="font-size-mini color-placeholder" style="whiteSpace: nowrap;margin-bottom:14px;">
						(注：重量以快递员称重为准，快件“虚胖”要按体积收费哦～)
					</view>
					<view>
						<view class="font-size-big color-normal" style="margin-bottom:10px;">物品类型</view>
						<view class="flex justify-around" style="margin-bottom:17px;" >
							<view class="goods-type" v-for="(item,index) in goodType" :key="index"
								  :class="{'bg-blue':goodsTypeTabCur==item.value,'text-white':goodsTypeTabCur==item.value}"
								  @click="chooseItemOperate('goodsType',item)">
								{{item.name}}
							</view>
						</view>
					</view>
					<view>
						<view class="font-size-big color-normal" style="margin-bottom:10px;">备注</view>
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
							class="goods-summary"
						></textarea>
						<image src="../../../../../static/icon/close.png" style="width:14px;height:14px;position:absolute;right:10px;top:10px;"></image>
						<view style="position:absolute;right:10px;bottom:10px;"><text class="text-blue">{{goods.summary.length}}</text>/100</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {mapState} from 'vuex'
	export default{
		computed:mapState(['userInfo']),
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
					square:1
				},
				ispay:true,//货到付款
				isAccept:false,
				expressObj:{
					id:'',
					name:''
				},
				appointDate:'',//预约时间
				receiver:'',
				modalName:'',
				expressList:[
					{id:1,url:'../../../../../static/img/work/logo/shunfeng.png',title:'顺丰速运',desc:'传递，零距离，快速到达',isChecked:false},
					{id:2,url:'../../../../../static/img/work/logo/tiantian.png',title:'天天快递',desc:'卓越服务，我们就在您身边',isChecked:false},
					{id:3,url:'../../../../../static/img/work/logo/yuantong.png',title:'圆通快递',desc:'一键下单，快速取件',isChecked:false},
					{id:4,url:'../../../../../static/img/work/logo/yunda.png',title:'韵达快递',desc:'韵悠之间，达通天下',isChecked:false},
					{id:5,url:'../../../../../static/img/work/logo/zhongtong.png',title:'中通快递',desc:'一键下单，快速取件',isChecked:false},

				],

				expressTab:0,//选中的快递
				mainTimeTabCur:0,//上门取件时间,
				timeTabCur:0,//时间选择
				goodsTypeTabCur:0,//包裹类型
				goodSummaryTabCur:0,//包裹备注
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
				timeList:[
					{name:'2小时之内',value:1},
					{name:'09:00-11:00',value:2},
					{name:'11:00-13:00',value:3},
					{name:'13:00-15:00',value:4},
					{name:'15:00-17:00',value:5},
					{name:'17:00-19:00',value:6},
					{name:'19:00-21:00',value:7},
				],
				sendShop:'',
				receiveShop:'',
				reveiverMan:"",
				timeTab:[],//今天，明天，后天,
				mainTimeName:'今天',
				smallTimeName:'',
				expressType:[
					{img:'../../../../../static/img/work/express/other/express-speed.png',value:1},
					{img:'../../../../../static/img/work/express/other/express-price.png',value:2},
				]

			
			}
		},
		components:{
			
		},
		methods:{
			chooseExpressType(type){
				this.expressTypeTabcur=type;
			},
			getTimeInfo(){
				var today=new Date().toLocaleDateString();
				var day3 = new Date().getDate()+1;
				var tomorrow=new Date().getFullYear()+'-'+ ((new Date().getMonth())+1)+'-'+day3
				var day4=new Date().getDate()+2;
				var second=new Date().getFullYear()+'-'+ ((new Date().getMonth())+1)+'-'+day4;
				this.timeTab=[
					{name:'今天',time:today,id:0},
					{name:'明天',time:tomorrow,id:1},
					{name:'后天',time:second,id:2},
				]
			},
			chooseSenderItem(type){

				uni.navigateTo({
					url:'../express-shop-list/express-shop-list?type='+type
				})
			},
			savePrice(){
				//进行报价


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
						break;
					case 'summary':
						this.goodSummaryTabCur=item.value;
				}

			},
			tabSelect(item){
				this.mainTimeTabCur=item.id;
				this.mainTimeName=item.name;
				if(this.mainTimeTabCur!=0){
					this.timeList.shift()
				}
			},
			chooseExpress(item){
				this.expressTab=item.id
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			changePayment(){
				this.ispay=!this.ispay
			},
			changeAccpet(){
				this.isAccept=!this.isAccept
			},
			showModal(event) {
				this.modalName = event.currentTarget.dataset.target;
				if(this.modalName=='timeModal'){
					this.getTimeInfo();
				}

			},
			hideModal(){
				this.modalName=null;
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
				}

			}
		},
		onLoad(options){
			if(options.type=='speed'){
				this.title={name:'速递寄件',value:'speed'}
			}else if(options.type=='logistics'){
				this.title={name:'物流寄件',value:'logistics'}
			}else if(options.type=='local'){
				this.title={name:'同城寄件',value:'local'}
			}
			this.$fire.on('sendShop',result=>{

				this.sendShop=result;
			})
			this.$fire.on('receiverShop',result=>{

				this.receiveShop=result.shop;
				this.reveiverMan=result.man;
			})
			this.$fire.on('price',result=>{

				this.goods.price=result;
			})
		},
	}
</script>
<style lang="less" scoped>
	
	.express-container{
		background:#fff;
		margin-bottom:13px;
		.user-info{
			.send-info{
				padding:23px 9px 22px 18px;
			
			}
			/*.inputStyle{*/
				/*font-size:15px;height:45px;line-height: 45px;*/
			/*}*/
			/*.right-icon{*/
				/*font-size:20px;*/
				/*right:13px;top:30px;*/
				/*color:#898888;*/
			/*}*/
			.send-tag{
				width:13%;
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
				width:13%;
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
				border-right:1px solid #EEEEED;
			}

		}
		
	}
	.goods-container,.other-container{
		background:#fff;
		
		.goods-item{
			padding:15px 9px 13px 15px;
			.item-name{

				font-size:15px;
				color:#2A2A2A;
			}
			.right-icon{
				font-size:20px;
				line-height:25px;
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

		/*.submit-btn{*/
			/*width:100%;background:rgba(66,176,237,1);*/
			/*border-radius:5px;font-size:17px;color:#FFFFFF*/
		/*}*/
		
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
		padding:4px 10px;
		font-size:12px;
	}
	.time-info{
		padding:11px 32px 10px 15px;
	}
</style>