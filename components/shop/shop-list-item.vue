<template>
	<view>
		<view class="shop-list-item bg-white flex justify-start margin-bottom-normal flex-all animated fadeInLeft margin-bottom-normal"
			   @click="checkShopDetail" v-if="item.name">
			<view class="shop-img-area">
				<template v-if="cat=='search'">
					<image :src="item.coverurl?item.coverurl:'../../../static/img/default.png'" mode="widthFix" class="shop-img"></image>
				</template>
				<template v-else>
					<image :src="item.coverurl?item.coverurl:'../../../../static/img/default.png'" mode="widthFix" class="shop-img"></image>
				</template>

			</view>
			<view class="shop-info-area flex-1 " >
				<view class="flex justify-start font-weight-bold align-center" style="margin-bottom:10upx;">
					<view class=" text-ellipse " style="width:200upx">{{item.name || ''}}</view>
					<view v-if="item.brandName" class="font-size-mini font-weight-normal">({{item.brandName }})</view>
					<image 	:src="type=='join'?'../../../static/img/shop/businessing.png':'../../../../static/img/shop/businessing.png'"
							  class="shop-tag"
							  v-if="item.status==shopStatus.businessing"></image>
					<image
							:src="type=='join'?'../../../static/img/shop/ready.png':'../../../../static/img/shop/ready.png'"
							class="shop-tag" v-if="item.status==shopStatus.ready"></image>
					<image
							:src="type=='join'?'../../../static/img/shop/processing.png':'../../../../static/img/shop/processing.png'"
							class="shop-tag" v-if="item.status==shopStatus.processing"></image>
					<image
							:src="type=='join'?'../../../static/img/shop/canceled.png':'../../../../static/img/shop/canceled.png'"
							v-if="item.status==shopStatus.canceled"></image>
					<image
							:src="type=='join'?'../../../static/img/shop/renovated.png':'../../../../static/img/shop/renovated.png'"
							v-if="item.status==shopStatus.renovated"></image>
					<image
							:src="type=='join'?'../../../static/img/shop/moved.png':'../../../../static/img/shop/moved.png'"
							class="shop-tag-canceled" v-if="item.status==shopStatus.moved"></image>
					
				</view>

				<view class="shop-name flex align-center" style="margin:20upx 0;" v-show="showManager">
					<view style="width:60upx">店长:</view>
					<view class="flex-1">{{item.managerName || ''}}/{{item.managerMobile || ''}}</view>
				</view>
				<view style="height:20upx;"  v-show="!showManager"></view>
				<view class="shop-name flex ">
					<view style="width:60upx">地址:</view>
					<view class="text-ellipse" style="width:350upx">{{item.provinceName || ''}}{{item.cityName || ''}}{{item.districtName||''}}{{item.address}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			shopStatus(){
				return this.config.shopStatus
			}
		},
		props:{
			item:Object,
			index:Number,
			type:{
				type:String,
				default:'normal'
			},//join是加入门店，normal是正常的
			cat:{
				type:String,
				default:'shop'
			},
			showManager:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			checkShopDetail(){
				this.$emit('checkShopDetail',this.item)
			}
		}
	}
</script>

<style scoped lang="less">
.shop-list-item{
		padding:20upx;
		.shop-img-area{

			margin-right: 10px;
			.shop-img{
				width:100px;
				height:86px !important;
				border-radius:6px;
				flex-shrink: 0;
			}
		}
		.shop-info-area{
			margin-top: 9px;
			.shop-tag{
				width:18px;
				height: 18px;
				margin-left: 5px;
			}
			.shop-tag-canceled{
				width: 56px;
				height: 18px;
				margin-left: 5px;
			}
		}

	}
	.shop-name{
		font-size:12px;
	}
</style>
