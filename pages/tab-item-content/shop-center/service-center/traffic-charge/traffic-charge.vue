<template>
	
	<!-- 
	第一版本
	<view class="borderTop charge-container bg-white" :style="{height:screenHeight+'px'}">
		<view class="seq-info">
			<view class="font-size-big color-normal " >充值序列号</view>
			<view class="font-size-back color-regular">{{seq}}</view>
		</view>
		<view class="flex justify-around flex-wrap">
			<block v-for="(item,index) in trafficList" :key="index">
				<view class="charge-item flex-litter" @tap="trafficOperate(item)" 
					:class="[trafficTab==item.id?'img_active':'img_normal']">
					<view class="font-size-bigger " :class="[trafficTab==item.id?'color-blue':'color_noActive']">{{item.name}}</view>
					<view class="font-size-litter" :class="[trafficTab==item.id?'color-blue':'color_noActive']">4元/GB</view>
				</view>
			</block>
		</view>
		<view class="traffic-bottom flex borderTop bg-white">
			<view class="flex-1  font-size-big color-normal">金额总计 : <text class="color-blue font-weight-bold">{{trafficCount * 4}}元</text></view>
			<view class="charge-btn">确定</view>
		</view>
	</view> 
	第一版本结束
	-->
	<!-- 第二版本 -->
	<view class="borderTop">
		<common-flex 
			:isRed="true"
			leftContent="CPE名称"
			:rightContent="serviceItem.name"
		/>
		<common-flex
			:isRed="true"
			leftContent="CPE序列号"
			:rightContent="serviceItem.seq"
		/>
		<common-flex
			:isRed="true"
			leftContent="ICCID"
			:rightContent="serviceItem.sim"
		/>
		<common-flex
			:isRed="true"
			leftContent="单价"
			rightContent="4元/GB"
		/>
		<common-form-group :showRequired="true" intro="流量">
			<view class="flex align-center" slot="right">
				<view class="num-tab" @click="operateNum('minus')">-</view>
				<view class="num-area">{{num}}GB</view>
				<view class="num-tab" @click="operateNum('add')">+</view>
			</view>
		</common-form-group>
		<common-flex
			:isRed="true"
			leftContent="金额"
			:rightContent="getTrafficCount"
		/>
		<common-btn-one
			:type="btnType" 
			content="确定"
			@operateBtn="confirmCharge" :isPos="true" />
			
			
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="modal-content bg-white">
					
					<view class="modal-content-top flex flex-d-column position_relative">
						<text class="cuIcon-close position_absolute"></text>
						<view class="modal-content-title color-normal">{{getTrafficCount}}GB</view>
						<view class="color-regular">到账后生效，当月有效</view>
					</view>
					<view class="modal-content-bottom ">
						<view class="modal-content-bottom-intro">
							单卡流量充值计入套餐总量，当月充值流量当月有效，当月未使用完毕将作清零处理
						</view>
					</view>
					<common-btn-one 
					type="primary"
					content="立即购买"
					@operateBtn="createChargeOrder" 
					/>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import {RouterApi,NewOrderApi} from '../../../../../api/shop_api.js'
	
	import CommonFlex from '../../../../../components/common/common-flex.vue'
	import CommonFormGroup from '../../../../../components/common/common-form-group.vue'
	import CommonBtnOne from '../../../../../components/common/common-btn-one.vue'
	export default {
		components:{CommonFlex,CommonFormGroup,CommonBtnOne},
		data() {
			return {
				// 第一版本start
				// seq:'',
				// trafficList:[
				// 	{name:'30GB',id:1,num:30},
				// 	{name:'60GB',id:2,num:60},
				// 	{name:'90GB',id:3,num:90},
				// 	{name:'120GB',id:4,num:120},
				// 	{name:'150GB',id:5,num:150},
				// 	{name:'180GB',id:6,num:180},
				// ],
				// trafficTab:1,
				// trafficCount:30,
				// screenHeight:400,
				// 第一版本end
				// 第二版本 start
				serviceItem:{},
				num:10,
				btnType:'primary',
				shopID:'',
				modalName:''
				// 第二版本end
			}
		},
		computed:{
			getTrafficCount(){
				return this.num * 4;
			}
		},
		methods: {
			// ------------------第一版本start
			// trafficOperate(item){
			// 	this.trafficTab = item.id;
			// 	this.trafficCount= item.num;
			// },
			// getSystem(){
			// 	uni.getSystemInfo({
			// 		success: (res) => {
			// 			this.screenHeight = res.windowHeight;
			// 		}
			// 	})
			// }
			// ----------------第一版本end
			// 第二版本 start
			hideModal(){
				this.modalName=null;
			},
			async routerInfo(seq){
				this.serviceItem = await RouterApi(seq);
			},
			confirmCharge(){this.modalName='bottomModal'},
			operateNum(type){
				switch(type){
					case 'add':
					this.num++;
					break;
					case 'minus':
					if(this.num<=10){
						return;
					}
					this.num--;
					break;
				}
				
			},
			async createChargeOrder(){
				if(await NewOrderApi(this.shopID,`3,${this.num}`)){
					this.$utils.showToast('购买流量成功!');
					this.hideModal()
					setTimeout(()=>{
						this.$utils.hide()
						this.$utils.goBack()
					},9000)
				}
			},
			// 第二版本end
			
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				uni.navigateTo({
					url:'../charge-order-list/charge-order-list?shopID='+this.shopID
				})
			}
		},
		onLoad(options){
			// 第一版本 start
			// this.seq=options.seq;
			// this.getSystem()
			// 第一版本end
			
			this.routerInfo(options.seq);
			this.shopID=options.shop;
			
		}
	}
</script>

<style scoped>
/* 
第一版本start
.charge-container{
	padding:48upx 40upx;
}
.seq-info{
	margin-bottom:30upx;
}
.seq-info>view:first-child{
	margin-bottom: 16upx;
}
.input-style{
	border:1px solid #EEEEED;
	background:rgba(0,0,0,0.1);
	border-radius:10upx;
	padding:0upx 20upx;
	height:80upx;
	line-height:80upx;
}
.charge-item{
	text-align: center;
	padding:6upx 0upx 40upx;
	margin:10upx;

}
.img_active{
	background:url('../../../../../static/img/shop/service/charge_active.png') no-repeat ;
		background-size:contain;
}
.img_normal{
	background:url('../../../../../static/img/shop/service/charge_normal.png') no-repeat;
	background-size:contain;
}
.traffic-bottom{
	height:120upx;
	line-height:120upx;
	position:fixed;
	bottom:0;
	right:0;
	left:0;
}
.traffic-bottom>view:first-child{
	padding-left:40upx;
}
.traffic-bottom>view:first-child strong{
	margin-left: 10upx;
}
.color_noActive{
	color:rgba(66,176,237,0.5)
}
.charge-btn{
	width:300upx;
	background:rgba(66,176,237,1);
	color:#FFFFFF;
	font-size:20px;
	text-align: center;
}
 第一版本end
 */
.num-area{
	    background: #F5F5F5;
	    padding: 4upx 10upx;
	    border-radius: 10upx;
	    margin: 0 10upx;
		    font-size: 14px;
		    font-weight: bold;
		    color: #2A2A2A;
}
.num-tab{
	font-size:24px;
	color:#BEBEBE;
}
.modal-content-top{
	padding:48upx 0 20upx;
	border-bottom:2upx solid #979797;
}
.modal-content-title{
	font-size:24px;
	font-weight: bold;
	margin-bottom:16upx;
}
.modal-content-bottom{
	padding:20upx 30upx 36upx;
}
.modal-content-bottom-intro{
	padding:20upx;
	background:rgba(229,238,255,1);
	border-radius:4px;
	font-size:14px;
	color:#898888;
	text-align: left;
	margin-bottom:100upx;
}
.cuIcon-close{
	right:20upx;
	top:20upx;
	font-size:20px;
}
</style>
