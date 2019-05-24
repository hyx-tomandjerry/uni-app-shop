<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="left"><text class="cuIcon-back" style="font-size:22px;" @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold" >{{title.name}}</view></block>
		</cu-custom>
		<view class="express-container ">
			<view class="user-info border-top">
				<view class="flex justify-start position_relative send-info borderBottom">
					<view class="send-tag" >寄</view>
					<view><input type="text" placeholder="请填写/添加寄件人信息" class="inputStyle"></view>
					<text class="cuIcon-right position_absolute right-icon"></text>
				</view>
				<view class="flex justify-start position_relative send-info borderBottom">
					<view class="receive-tag" >收</view>
					<view><input type="text" placeholder="请填写/添加收件人信息" class="inputStyle"></view>
					<text class="cuIcon-right position_absolute right-icon"></text>
				</view>
			</view>
		</view>
		
		<view class="goods-container" style="margin-bottom:13px;">
			<view class="goods-item flex justify-between borderBottom" v-if="title.value=='express'">
				<view class="font-weight-normal font-size-normal item-name">快递公司</view>
				<view style="width:75%;text-align:right"><text class="font-weight-normal font-weight-normal text-grey" >请选择快递公司</text></view>
				<text class="cuIcon-right right-icon"  @click="showModal($event)" data-target="bottomModal"></text>
			</view>
			<view class="goods-item flex justify-between borderBottom" v-if="title.value=='logistics'">
				<view class="font-weight-normal font-size-normal item-name">物流公司</view>
				<view style="width:75%;text-align:right"><text class="font-weight-normal font-weight-normal text-grey" >请选择物流公司</text></view>
				<text class="cuIcon-right right-icon"  @click="showModal($event)" data-target="bottomModal"></text>
			</view>
			<view class="goods-item flex justify-between borderBottom" >
				<view class="font-weight-normal font-size-normal item-name">收件对象</view>
				<view style="width:75%;text-align:right"><text class="font-weight-normal font-weight-normal text-grey" >请选择收件对象</text></view>
				<text class="cuIcon-right right-icon"></text>
			</view>
			
		</view>
		
		<view class="other-container"  style="margin-bottom:8px;">
			<view class="goods-item flex justify-between borderBottom">
				<view class="font-weight-normal font-size-normal item-name">商品名称</view>
				<view style="width:75%;text-align:right"><input type="text" placeholder="请填写商品名称" v-model="goods.name" class="font-weight-normal font-weight-normal text-gray" ></view>
				<!-- <text class="cuIcon-right right-icon" style="padding-top:3px;"></text> -->
			</view>
			
			<view class="goods-item flex justify-between borderBottom">
				<view class="font-weight-normal font-size-normal item-name">预估重量</view>
				<view>
					<text class="num-tab tab-add">-</text>
					<text style="font-size:19px;"><text style="color:#2A2A2A;padding:0 20px;">{{goods.weight}}</text> <text style="color:#898888;margin-right:4px;">kg</text></text>
					<text class="num-tab tab-minus">+</text>
				</view>
			</view>
			
			<view class="goods-item flex justify-between borderBottom">
				<view class="font-weight-normal font-size-normal item-name">数量</view>
				<view>
					<text class="num-tab tab-add">-</text>
					<text style="font-size:19px;"><text style="color:#2A2A2A;padding:0 30px;">{{goods.number}}</text> <text style="color:#898888;margin-right:4px;"></text></text>
					<text class="num-tab tab-minus">+</text>
				</view>
			</view>
			<view class="goods-item flex justify-between borderBottom" >
				<view class="font-weight-normal font-size-normal item-name">上门时间</view>
				<view style="width:75%;text-align:right"><text class="font-weight-normal font-weight-normal text-grey" >请选择上门时间</text></view>
				<text class="cuIcon-right right-icon" ></text>
			</view>
			
			<view class="goods-item flex justify-between borderBottom">
				<view class="font-weight-normal font-size-normal item-name">是否到付</view>
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
		<view style="color:rgba(137,136,136,1);margin-bottom:7px;padding-left:14px;" class="font-size-normal font-weight-normal">选填</view>
		<view class="other-container" style="margin-bottom:8px;">
			<view class="goods-item flex justify-between borderBottom">
				<view class="font-weight-normal font-size-normal item-name">保价金额</view>
				<view style="width:75%;text-align:right"><input type="text" placeholder="请输入保价金额(元)" v-model="goods.inprice" class="font-weight-normal font-weight-normal text-gray" ></view>
			</view>
			<view class="goods-item-summary">
				<view class="goods-item-summary-name font-weight-normal font-size-small">备注</view>
				<view>
					<textarea  cols="30" rows="10" class="goods-item-area" placeholder="请输入备注" v-model="goods.summary"></textarea>
				</view>
			</view>
		</view>
		
		<view style="margin-bottom:7px;padding-left:14px;" class="font-size-small font-weight-normal">
			
			<image src="../../../../../static/icon/nochoose.png" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;"  @click="changeAccpet()" v-if="isAccept"></image>
			<image src="../../../../../static/icon/choose.png" style="width:16px;height:16px;margin-right:3px;vertical-align: middle;"  v-else @click="changeAccpet()"></image>
			<text style="color:#2A2A2A" >我已经我已阅读并同意</text>
			<text style="color:#42B0ED">《服务协议》</text>
		</view>
		
		<view class="btn-container">
			<button type="primary"  class="font-weight-normal submit-btn">立即下单</button>
		</view>
		
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white borderBottom">
					<view class="action text-green"></view>
					<view class="font-weight-normal font-size-big">快递选择</view>
					<view class="action cuIcon-close" @click="hideModal()"></view>
				</view>
				<view class="padding-xl">
					Modal 内容。
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
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
					inprice:'',
					summary:''
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
			
			}
		},
		components:{
			
		},
		methods:{
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
				console.log(event)
				this.modalName = event.currentTarget.dataset.target
			},
			hideModal(){
				this.modalName=null;
			}		
		},
		onLoad(options){
			if(options.type=='express'){
				this.title={name:'速递订单',value:'express'}
			}else if(options.type=='logistics'){
				this.title={name:'物流订单',value:'logistics'}
			}
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
			.inputStyle{
				font-size:15px;height:45px;line-height: 45px;
			}
			.right-icon{
				font-size:20px;right:13px;top:30px;
				color:#898888;
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
		}
		
	}
	.goods-container,.other-container{
		background:#fff;
		
		.goods-item{
			padding:15px 9px 13px 15px;
			.item-name{
				padding-top:4px;
				font-size:15px;
			}
			.right-icon{
				font-size:20px;
				line-height:25px;
				color:#898888;
			}
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
		padding:12px 11px 13px 14px;
		.submit-btn{
			width:100%;background:rgba(66,176,237,1);
			border-radius:5px;font-size:17px;color:#FFFFFF
		}
		
	}
	
</style>