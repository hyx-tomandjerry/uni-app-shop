<template>
	<view class="borderTop">
		<view class="user-info bg-white margin-bottom-normal">
			<view class="user-info-item  flex justify-start align-center">
				<view class="email-tag text-white font-size-middle" style="background:#000;">需</view>
				<view>
					<view class="font-size-normal color-normal" >{{itemInfo['applyShopName'] || ''}}</view>
					<view  class="font-size-normal color-normal">
						<text style="margin-right:10px;">{{itemInfo['applierName'] || ''}}</text> <text>{{itemInfo['applierMobile'] || ''}}</text>
					</view>
					<!--<view class="color-regular font-size-litter" >上海市长宁区金钟路658号东华大学</view>-->
				</view>
				<image src="../../../../../static/img/work/express/other/track-img.png" class="track-img" style="top:35px;"></image>
			</view>
			<view class="user-info-item  flex justify-start align-center">
				<view class="email-tag text-white font-size-middle" style="background:rgba(66,176,237,1)">发</view>
				<view>
					<view class="font-size-normal color-normal" >{{itemInfo['supplyShopName'] || ''}}</view>
					<view  class="font-size-normal color-normal" >
						<text style="margin-right:10px;">{{itemInfo['supplierName'] || ''}}</text> <text>{{itemInfo['supplierMobile'] || ''}}</text>
					</view>
					<!--<view class="color-regular font-size-litter" >上海市长宁区金钟路658号东华大学</view>-->
				</view>
				<image src="../../../../../static/img/work/express/other/track-img.png" class="track-img" style="top:35px;" v-if="itemInfo.recverName && itemInfo.recverMobile"></image>
			</view>
			<view class="user-info-item  flex justify-start align-center" v-if="itemInfo.recverName && itemInfo.recverMobile">
				<view class="email-tag text-white font-size-middle" style="background:rgba(255,160,30,1);">收</view>
				<view>
					<view  class="font-size-normal color-normal">
						<text style="margin-right:10px;">{{itemInfo.recverName}}</text> <text>{{itemInfo.recverMobile}}</text>
					</view>
					<view class="color-regular font-size-litter" >上海市长宁区金钟路658号东华大学</view>
				</view>
			</view>
		</view>
		<view class="order-info bg-white margin-bottom-normal">
			<view class="order-info-title font-size-big font-weight-bold color-normal">调拨单详情</view>
			<view  style="padding-bottom:22px;" class="borderBottom">
				<view class="order-info-item flex justify-start">
					<view class="flex-xs color-regular">调拨类型</view>
					<view class="flex-1 color-normal">{{itemInfo.recverName && itemInfo.recverMobile ?'代发':'到店'}}</view>
				</view>
				<view class="order-info-item flex justify-start">
					<view class="flex-xs color-regular">发件对象</view>
					<view class="flex-1 color-normal">门店</view>
				</view>
				<view class="order-info-item flex justify-start">
					<view class="flex-xs color-regular">调拨状态</view>
					<view class="flex-1 color-normal">已签收</view>

				</view>
				<view class="order-info-item flex justify-start" >
					<view class="flex-xs color-regular">商品名称</view>
					<view class="flex-1 color-normal">{{itemInfo['name'] || '无'}}</view>
				</view>
				<view class="order-info-item flex justify-start">
					<view class="flex-xs color-regular">商品数量</view>
					<view class="flex-1 color-normal">{{itemInfo['quantity']}}个</view>
				</view>

				<view class="order-info-item flex justify-start">
					<view class="flex-xs color-regular">下单备注</view>
					<view class="flex-1 color-normal">{{itemInfo['summary'] || ''}}</view>
				</view>
			</view>
			<view class="order-time">
				<view class="order-info-item flex justify-start">
					<view class="flex-xs color-regular">调拨单号</view>
					<view class="flex-1  color-blue">{{itemInfo['seq']}}</view>
				</view>
				<view class="order-info-item flex justify-start">
					<view class="flex-xs color-regular">下单时间</view>
					<view class="flex-1 color-normal">2019-7-3</view>
				</view>
			</view>
		</view>
		<view class="btn-container bg-white flex justify-around" v-if="itemInfo.status==distributeStatusZn.unHandle &&itemType=='my'">
			<view class="tran-btn btn " @click="operateItem('cancel')">取消调拨单</view>
			
		</view>

		<view class="btn-container bg-white flex justify-around" v-if="itemType=='alone' && itemInfo.status !==distributeStatusZn.finish">
			<view class="tran-btn btn"  @click="operateItem('transform')">转为寄件单</view>
		</view>
		
		<showModel :isShow="modalName=='cancel'" @hideModel="hideModal" @confirmDel="confirmDel" v-if="modalName=='cancel'">
			<block slot="content">确认取消调拨单?</block>
		</showModel>
	</view>

</template>

<script>
	import showModel from '../../../../../components/show-model.vue'
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['userInfo','distributeStatusZn']),
		data() {
			return {
				assignType:'',
				itemInfo:'',
				modalName:'',
				itemType:''
			}
		},
		methods: {
			operateItem(type){
				switch(type){
					case 'cancel':
						this.modalName='cancel';
						break;
					case 'transform':
					uni.navigateTo({
						url:"../create-express/create-express?type=speed&id="+this.itemInfo.id
					})
						break;
				}
			},
			confirmDel(){
				this.hideModal()
				this.$ajax('RemoveRequisition',{id:this.itemInfo.id},res=>{
					uni.showToast({
						title:'您已成功取笑调拨单',
						icon:'none',
						success:()=>{
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},600)
						}
					})
				})
			},
			hideModal(){
				if(this.modalName){
					this.modalName=null;
				}
			},
			getItemInfo(id){
				this.$ajax('Requisition',{id:id},res=>{
					this.itemInfo=res;
				})
			}
		},
		onLoad(options){
			if(options.id){
				this.getItemInfo(options.id)
			}
			if(options.itemType){
				this.itemType=options.itemType
			}
			
			// if(options){
			// 	this.assignType=options.type;
			// }
		},
		components:{showModel}
	}
</script>

<style lang="less">
	.user-info{
		padding-top:22px;
		padding-left:19px;
		padding-bottom:13px;
		.user-info-item{
			margin-bottom: 40px;
			position:relative;
			.email-tag{
				font-size:12px;
				border-radius: 50%;
				width:20px;
				height: 20px;
				line-height:20px;
				text-align: center;
				margin-right: 12px;
			}
			.track-img{
				width: 10px;
				height: 35px;
				position:absolute;
				left:5px;
			}
		}
	}
	.order-info{
		padding-left:21px;
		.order-info-title{
			padding-top:17px;
			padding-bottom:12px;

		}
		.order-info-item{
			font-size:15px;
			margin-bottom:10px;
			display: flex;
			justify-content: flex-start;
		}
		.order-time{
			padding-top:20px;
			padding-bottom: 30px;
		}
	}
	.btn-container{
		padding: 12px 13px 11px 14px;
		.btn{
			height:40px;
			line-height:40px;
			text-align: center;
			font-size:16px;

		}
		.cancel-btn{
			color:#42B0ED;
			margin-right: 15px;
			border-radius:5px;
			border:1px solid rgba(66,176,237,1);
		}
		.tranfer-btn{
			background:rgba(66,176,237,1);
			border-radius:5px;
			color:#fff;
		}
		.tran-btn{
			width:100%;
			background:rgba(66,176,237,1);
			border-radius:5px;
			color:#fff;
		}
	}
</style>
