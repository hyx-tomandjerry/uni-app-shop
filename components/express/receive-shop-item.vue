<template>
	<view
		  class="shop-item borderBottom flex justify-start " @tap="chooseItem" >
		<view>
			<image :src="shopTabCur==item.id?'../../../../../static/icon/icon-xuanzhong.png':
			'../../../../../static/icon/icon-weixuanzhong.png'" class="chooseImg"></image>
		</view>
		<view>
			<view class="shop-name flex align-center">
				<view class="font-size-normal font-weight-bold" >{{item.name || ''}}</view>
				<view class="color-blue font-weight-bold shop-tag" style="margin:0 5px;">{{item.brandName || ''}}</view>
				<view  class="cu-tag " :class="{
							'shop-business':item.status==shopStatus.businessing,
							'shop-execution':item.status==shopStatus.ready,
							'shop-prepare':item.status==shopStatus.processing,
							'shop-canceled':item.status==shopStatus.canceled,
							'shop-renovated':item.status==shopStatus.renovated,
							'shop-moved':item.status==shopStatus.moved,
						}" style="border-radius:5px;">{{item.status | shopStatusZnPipe}}</view>
			</view>
			<view class="color-regular font-size-small">
				门店地址 :	<text style="margin-left:3px;">{{item.provinceName ||''}}</text>
				<text v-if="item.districtName">-</text>
				<text>{{item.districtName}}</text>
				<text v-if="item.cityName">-</text>
				<text>{{item.cityName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		computed:{
			shopStatus(){return this.config.shopStatus}
		},
		props:{
			item:Object,
			index:Number,
			shopTabCur:[Number,String]
		},
		methods:{
			chooseItem(){
				this.$emit('chooseItem',this.item)
			}
		}
	}
</script>

<style scoped>
	@import "../../common/css/shop.css";
	.shop-item{
		padding:38upx 38upx 32upx 34upx;
	}
	.shop-name{
		margin-bottom:10upx;
	}
	.chooseImg{
		width:40upx;
		height:40upx;
		margin-right:30upx;
		vertical-align: middle;
		margin-top:20upx;
	}
	.shop-tag{
		border-radius:10upx;
		background:rgba(0,0,0,0.1);
		padding:6upx;
		font-size:12px;
	}
</style>
