<template>
	<view class="borderTop">
		<!-- info start -->
		<view class="info-container bg-white">
			<normal-detail-title title="寄件详情"></normal-detail-title>
			<view class="info-item margin-bottom">
				<express-user-info
					src="../../../../../static/img/work/express/other/ji.png"
					:shopName="expressDetail.depname"
					:clerkName="expressDetail.senderName"
					:clerkMobile="expressDetail.senderMobile"
					:shopAddress="expressDetail.depaddr"
				></express-user-info>
				<express-user-info 
					src="../../../../../static/img/work/express/other/shoujian.png"
					:shopName="expressDetail.destype!=expressItem.company?expressDetail.desname :''"
					:clerkName="expressDetail.recverName"
					:clerkMobile="expressDetail.recverMobile"
					:shopAddress="expressDetail.desaddr"
				></express-user-info>
			</view>
			
		</view>
		<!-- info end -->
		<!-- goods info start -->
		<view class=" bg-white " style="margin-bottom:200upx;">
			<normal-detail-title title="物品详情"></normal-detail-title>
			<view class="goods-info flex justify-between">
				<view class="flex-1">
					<view>
						<text class="color-regular order-intro">寄件类型 </text>
						<text class="color-normal" >{{expressDetail.type==expressType.speed ? '特快送' :'特惠送'}}</text>
					</view>
					<view>
						<text class="color-regular order-intro">物品类型</text>
						<text class="color-normal ">{{expressDetail.catalog || ''}}</text>
					</view>
					<view>
						<text class="color-regular order-intro">物品体积</text>
						<text class="color-normal">{{expressDetail.volume}}(m³)</text>
					</view>
				</view>
				<view class="flex-1">
					<view>
						<text class="color-regular order-intro">订单状态</text>
						<text class=" status-tag" 
							:class="{
								'unpick':expressDetail.status==expressStatus.unSign,
								'pick':expressDetail.status==expressStatus.pick,
								'travel':expressDetail.status==expressStatus.travel,
								'arrive':expressDetail.status==expressStatus.arrive
							}"
						>
							{{expressDetail.status | expressStatusZnPipe}}
						</text>
					</view>
					<view>
						<text class="color-regular order-intro">保价费用</text>
						<text class="color-blue font-weight-bold">￥{{expressDetail.insamount}}</text>
					</view>
					<view>
						<text class="color-regular order-intro">物品重量</text>
						<text class="color-normal">{{expressDetail.weight}}(kg)</text>
					</view>
				</view>
			</view>
			<view class="goods-info-other ">
				<text class="order-other-intro color-regular " style="margin-right:9px;">快递备注</text>
				<text class="color-normal text-ellipse">{{expressDetail.summary || ''}}</text>
			</view>
			<view class="other-container borderTop position_relative">
				<view>
					<text class="order-other-intro color-regular " style="margin-right:9px;">运单号</text>
					<text class="color-blue ">{{expressDetail.seq || ''}}</text>
				</view>
				<view>
					<text class="order-other-intro color-regular " style="margin-right:9px;">收件对象</text>
					<text class="color-normal ">{{expressDetail.destype | expressItemZnPipe }}</text>
				</view>
				
				<view>
					<text class="order-other-intro color-regular " style="margin-right:9px;">下单时间</text>
					<text class="color-normal ">{{expressDetail.orderdate | formatTime('YMDHMS')}}</text>
				</view>
				<view class="warn-content position_absolute text-center"  
					:class="{
						'color-red':expressDetail.complaint==0,
						'color-blue':expressDetail.complaint!=0
					}"
					@tap="orderComplaint">
					<view class="cuIcon-warn "></view>
					<view class="font-size-mini ">{{expressDetail.complaint!=0?'取消申诉':'我要申诉'}}</view>
				</view>
			</view>
		</view>
		<!-- goods info end -->
		
		<template v-if="expressDetail.status==expressStatus.unSign && expressDetail.sender==userInfo.id">
			<common-btn-one
				type="primary"
				content="取消订单"
				@operateBtn="operateOrder" :isPos="true"></common-btn-one>
		</template>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import commonBtnOne from '../common/common-btn-one.vue'
	import normalDetailTitle from '../common/normal-detail-title.vue'
	import expressUserInfo from './express-user-info.vue'
	import {CancelWaybillApi} from '../../api/express_api.js'
	export default{
		components:{normalDetailTitle,commonBtnOne,expressUserInfo},
		computed:{
			...mapState(['userInfo']),
			expressType(){return this.config.expressType},
			expressStatus(){return this.config.expressStatus},
			expressGive(){return this.config.expressGive},
			expressItem(){return this.config.expressItem}
		},
		props:{
			expressDetail:Object,
			isShow:Boolean,
			jiImg:String,
			shouImg:String
		},
		methods:{
			//快递申诉
			orderComplaint(){
				this.$emit('orderComplaint')
			},
			async cancelOrder(){
				if(await CancelWaybillApi(this.expressDetail.id)){
					this.$utils.showToast('取消成功，您可以重新下单')
					this.$emit('cancel')
					this.$utils.hide()
				}

			},
			operateOrder(){
				uni.showModal({
					confirmColor:'#FF3434',
				    content: '确定要取消快递单',
				    success:(res)=>{
				        if (res.confirm)  this.cancelOrder()
				    }
				});
			},
		}
	}
</script>

<style scoped>
	@import url("../../common/css/express.css");
	.info-item{
		padding: 26upx 0 30upx 34upx;
		background:url('../../static/img/work/express/other/track-img.png') no-repeat 58upx 70px ;
		background-size:15upx 80upx;
	
	}
	.info-item>view:first-child{
		margin-bottom:60upx;
	}
	.info-item .tag{
		width:60upx;
		height:60upx;
		line-height:60upx;
		color:#FFFFFF;
		text-align: center;
		border-radius: 100%;
	}
	.info-item .send-tag{
		background:#000;
	}
	.info-item .rece-tag{
		background:#42B0ED;
	}
	.goods-info{
		padding:20upx 40upx 0;
	}
	.order-intro{
		margin-right:10upx;
	}
	.goods-info>view:first-child>view,.goods-info>view:last-child>view{
		margin:10upx 0;
	}
	.goods-info-other{
		padding: 10upx 40upx;
	}
	.other-container{
		margin:26upx  38upx 0;
		padding-bottom:10upx;
	}
	.other-container>view{
		margin:15upx 0;
	}
	.check-btn{
		padding:10upx 20upx;
		border-radius: 20upx;
		border:1upx solid #EEEEED;
		background-color: #42B0ED;
		color:#fff;
	}
	.track-container{
		padding:20upx 40upx;
	}
	.track-tag{
		width:30upx;
		height:30upx;
		border-radius: 100%;
		background-color: #CCC;
	}
	.track-border{
		width:1upx;
		height:160upx;
		position:absolute;
		left:16upx;
		background-color: #CCC;
	}
	.track-load{
		padding-bottom:150upx;
	}
	.warn-content{
		right:30upx;
		top:50%;
		transform: translateY(-50%);
	}
	.cuIcon-warn{
		font-size:25px;
		
	}
</style>
