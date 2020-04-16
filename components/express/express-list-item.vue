<template>
	<view class="list-item position_relative" @tap="checkItemInfo">
		<view class="list-card flex justify-between align-center ">
			<view class="flex justify-start align-center">
				<image src="../../static/img/work/express/other/tag-speed.png" 
				class="img-tag" 
				v-if="item.type==expressType.speed"></image>
				<image src="../../static/img/work/express/other/tag-price.png" class="img-tag" v-if="item.type==expressType.price"></image>
				<view>运单号 : {{item.seq || ''}}</view>
			</view>
			<view>
				<image src="../../static/img/work/express/other/express-sign.png" class="sign-img" v-if="item.type==expressStatus.sign"></image>
				<view v-else class="status-tag" 
					  :class="{
					  	'unpick':item.status==expressStatus.unSign,
					  	'pick':item.status==expressStatus.pick,
					  	'travel':item.status==expressStatus.travel,
					  	'arrive':item.status==expressStatus.arrive
					  }"
				>
					{{item.status | expressStatusZnPipe}}
				</view>
			</view>
		</view>
		<view class="list-item-content ">
			<view class="color-regular font-size-mini">下单时间：{{item.orderdate | formatTime('YMDHMS')}}</view>
			<view class="list-shop flex justify-between borderBottom align-center">
				<view class="flex-1  font-size-normal">
					<view class="font-size-mini font-weight-bold color-normal text-ellipse width-all" >{{item.depname || ''}}</view>
					<view class="font-size-mini color-regular  text-ellipse width-all">({{item.senderName || ''}}/{{item.senderMobile || ''}})</view>
				</view>
				<image src="../../static/img/work/express/other/express-arrow.png"></image>
				<view class="flex-1  font-size-normal">
					<template v-if="item.destype==expressItem.shop">
						<view class="font-size-mini font-weight-bold color-normal  text-ellipse width-all" style="margin-bottom:5px;">{{item.desname || ''}}</view>
						<view class="font-size-mini color-regular  text-ellipse width-all">({{item.recverName || ''}}/{{item.recverMobile || ''}})</view>
					</template>
					<template v-else-if="item.destype==expressItem.customer || item.destype==expressItem.company">
						<view class="font-size-mini color-normal  text-ellipse width-all">({{item.recverName || ''}}/{{item.recverMobile || ''}})</view>
						<view  class="font-size-mini color-regular  text-ellipse width-all">{{item.desaddr || ''}}</view>
					</template>
					
				</view>
			</view>
		</view>
		<view class="list-time flex justify-end">
			<view class="express-tag check-tag" v-show="TabCur==expressGive.receive">确认收货</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number,
			TabCur:Number
			
		},
		computed:{
			expressStatus(){return this.config.expressStatus},
			expressType(){return this.config.expressType},
			expressItem(){return this.config.expressItem},
			expressGive(){return this.config.expressGive}
		},
		methods:{
			checkItemInfo(){
				this.$emit('checkItemInfo',this.item)
			},
			
		}
	}
</script>

<style scoped>
	@import url("../../common/css/express.css");
	.list-item-content>view:first-child{
		padding:10upx 0 20upx;
	}
	.list-item{
		padding:26upx 32upx 0 28upx;
		background-color: #fff;
		margin-bottom: 26upx;
		border-radius:8upx;
	}
	.list-card{
		height:86upx;
		line-height:86upx;
		border-bottom:1px solid #EEEEED;
		
	}
	.img-tag{
		width: 40upx;
		height: 40upx;
		vertical-align: middle;
		margin-right: 10upx;
	}
	.sign-img{
		width:69upx;height:84upx;position: absolute;right:0;top:0
	}

	.arrive{
		background:#B82BFE
	}
	.list-item-content{
		padding-top:24upx;
	}
	.list-shop{
		padding-bottom: 20upx;
	}
	.list-shop>view:nth-of-type(1)>view:first-child{
		margin-bottom:10upx;
	}
	.list-shop>image{
		width:88upx;height:22upx;margin:0 10upx; flex-shrink: 0;
	}
	.list-shop>view:nth-of-type(2){
		padding-left:20upx;
	}
	.list-time{
		padding:15upx 0;
	}
	.width-all{
		width:260upx;
	}
	.finish-tag{
		border:1upx solid #2DD19B;
		color:#2DD19B;
		margin-right:20upx;
	}
	.check-tag{
		border:1upx solid #42B0ED;
		
		color:#42B0ED;
	}
	.express-tag{
		border-radius: 30upx;
		padding:8upx 10upx;
		font-size:12px;
	}
</style>
