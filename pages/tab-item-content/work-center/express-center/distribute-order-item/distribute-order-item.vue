<template>
	<view class="borderTop">
		<view class="user-info bg-white margin-bottom-normal">
			<express-user-info 
				src="../../../../../static/img/work/express/other/xuqiufang.png"
				:shopName="itemInfo.applyShopName"
				:clerkName="itemInfo.applierName"
				:clerkMobile="itemInfo.applierMobile"
			></express-user-info>
			<express-user-info
				src="../../../../../static/img/work/express/other/ji.png"
				:shopName="itemInfo.supplyShopName"
				:clerkName="itemInfo.supplierName"
				:clerkMobile="itemInfo.supplierMobile"
			></express-user-info>
			<express-user-info v-if="itemInfo.recverName && itemInfo.recverMobile"
				src="../../../../../static/img/work/express/other/shoujian.png"
				
				:clerkName="itemInfo.recverName"
				:clerkMobile="itemInfo.recverMobile"
				:shopAddress="itemInfo.destaddr"
			></express-user-info>
			<!-- <view class="user-info-item  flex justify-start align-center">
				
				<image src="../../../../../static/img/work/express/other/xuqiufang.png" mode="widthFix" class="xuqiu_img"></image>
				<view>
					<view class=" color-normal font-weight-bold" >{{itemInfo['applyShopName'] || ''}}</view>
					<view  class=" color-regular">
						<text>{{itemInfo['applierName'] || ''}}</text> /<text>{{itemInfo['applierMobile'] || ''}}</text>
					</view>
				</view>
			</view> -->
			<!-- <view class="user-info-item  flex justify-start align-center">
				
				<image src="../../../../../static/img/work/express/other/ji.png" mode="widthFix" class="xuqiu_img"></image>
				<view>
					<view class=" color-normal font-weight-bold" >{{itemInfo['supplyShopName'] || ''}}</view>
					<view  class=" color-regular" >
						<text>{{itemInfo['supplierName'] || ''}}</text>/<text>{{itemInfo['supplierMobile'] || ''}}</text>
					</view>
				</view>
			</view> -->
			<!-- <view class="user-info-item  flex justify-start align-center" v-if="itemInfo.recverName && itemInfo.recverMobile">
				
				<image src="../../../../../static/img/work/express/other/shoujian.png" mode="widthFix" class="xuqiu_img"></image>
				<view>
					<view  class="font-size-normal color-normal">
						<text>{{itemInfo.recverName}}</text>/<text>{{itemInfo.recverMobile}}</text>
					</view>
					<view class="color-regular font-size-litter" >{{itemInfo.destaddr || ''}}</view>
				</view>
			</view> -->
		</view>
		<normal-detail-title title="调拨单详情"></normal-detail-title>
		<view class="order-info bg-white margin-bottom-normal">
			<normal-detail-item leftIntro="调拨类型" :rightContent="itemInfo.recverName && itemInfo.recverMobile ?'代发':'到店'"></normal-detail-item>
			<normal-detail-item leftIntro="发件对象" rightContent="门店"></normal-detail-item>
			<view class="order-info-item flex justify-start align-center">
				<view class="flex-xs color-regular" style="padding-left:20upx;">调拨状态</view>
				<view class="status-tag" style="margin-left:30upx;"
					:class="{
						'bg-purple':itemInfo.status==distributeStatus.unHandle,
						'bg-green':itemInfo.status==distributeStatus.finish
						}"
					
				>{{itemInfo.status | distributeStatusZnPipe}}</view>
			
			</view>
			<normal-detail-item leftIntro="商品名称" :rightContent="itemInfo.name|| ''"></normal-detail-item>
			<normal-detail-item leftIntro="商品数量" :rightContent="itemInfo.quantity"></normal-detail-item>
			<normal-detail-item leftIntro="下单备注" :rightContent="itemInfo.summary|| ''"></normal-detail-item>
			<view class="order-time borderTop">
				<normal-detail-item leftIntro="调拨单号" :rightContent="itemInfo.seq|| ''"></normal-detail-item>
				<normal-detail-item leftIntro="下单时间" :rightContent="itemInfo.applyDate | formatTime('YMDHMS')"></normal-detail-item>
			</view>
		</view>
		<common-btn-one v-if="itemInfo.status==distributeStatus.unHandle &&itemType=='my'"
			content="取消调拨单"
			type="primary"
			@operateBtn="cancelOrder" :isPos="true"></common-btn-one>

		<common-btn-one v-if="itemType=='alone' && itemInfo.status !==distributeStatus.finish"
			content="转为寄件单"
			type="primary"
			@operateBtn="transformOrder" :isPos="true"></common-btn-one>
	</view>

</template>

<script>
	import commonBtnOne from '../../../../../components/common/common-btn-one.vue'
	import normalDetailItem from '../../../../../components/common/normal-detail-item.vue'
	import normalDetailTitle from '../../../../../components/common/normal-detail-title.vue'
	import expressUserInfo from '../../../../../components/express/express-user-info.vue'
	
	import {RemoveRequisitionApi,RequisitionApi} from '../../../../../api/express_api.js'
	export default {
		computed:{
			distributeStatus(){return this.config.distributeStatus}
		},
		components:{commonBtnOne,normalDetailItem,normalDetailTitle,expressUserInfo},
		data() {
			return {
				assignType:'',
				itemInfo:'',
				modalName:'',
				itemType:'',
				distributeID:''
			}
		},
		methods: {
			cancelOrder(){
				uni.showModal({
					content:'确认取消调拨单',
					success: (res) => {
						if(res.confirm){
							this.confirmDel()
						}
					}
				})
			},
			transformOrder(){
				uni.navigateTo({
					url:"../create-express/create-express?newOrEdit=edit&type=speed&id="+this.itemInfo.id
				})
			},
			async confirmDel(){
				if(await RemoveRequisitionApi(this.itemInfo.id)){
					this.$utils.showToast('您已成功取消调拨单')
					this.$utils.goBack()
					this.$utils.hide()
				}

			},
			hideModal(){
				if(this.modalName){
					this.modalName=null;
				}
			},
			async getItemInfo(id){
				this.itemInfo = await RequisitionApi(id)

			}
		},
		onLoad(options){
			if(options.id){
				this.distributeID=options.id;
				this.getItemInfo(options.id)
			}
			if(options.itemType){
				this.itemType=options.itemType
			}
		},
		onShow(){
			this.getItemInfo(this.distributeID)
		}
	}
</script>

<style scoped>
	.xuqiu_img{
		flex-shrink: 0;
		width:80upx;
		height: 80upx !important;
		margin-right: 24upx;
	}
	.status-tag{
		padding:10upx 15upx;
		font-size:14px;
		border-radius: 20upx;
		color:#fff;
	}
	.user-info{
		padding-top:44upx;
		padding-left:38upx;
		padding-bottom:26upx;
		
	}
	.user-info-item{
		margin-bottom: 40upx;
		position:relative;
		
	}
	.email-tag{
		font-size:20px;
		border-radius: 50%;
		width:80upx;
		height: 80upx;
		line-height:80upx;
		text-align: center;
		margin-right: 24upx;
	}
	.track-img{
		width: 20upx;
		height: 70upx;
		position:absolute;
		left:10upx;
	}
	.order-info{
		padding:20upx 0 100upx 42upx;
		
	}
	.order-info-title{
		padding-top:34upx;
		padding-bottom:24upx;
	
	}
	.order-info-item{
		font-size:15px;
		margin-bottom:20upx;
		display: flex;
		justify-content: flex-start;
	}
	.order-time{
		padding-top:40upx;
		padding-bottom: 60upx;
	}
	/* // .btn-container{
	// 	padding: 12px 13px 11px 14px;
	// 	.btn{
	// 		height:40px;
	// 		line-height:40px;
	// 		text-align: center;
	// 		font-size:16px;

	// 	}
	// 	.cancel-btn{
	// 		color:#42B0ED;
	// 		margin-right: 15px;
	// 		border-radius:5px;
	// 		border:1px solid rgba(66,176,237,1);
	// 	}
	// 	.tranfer-btn{
	// 		background:rgba(66,176,237,1);
	// 		border-radius:5px;
	// 		color:#fff;
	// 	}
	// 	.tran-btn{
	// 		width:100%;
	// 		background:rgba(66,176,237,1);
	// 		border-radius:5px;
	// 		color:#fff;
	// 	}
	// } */
</style>
