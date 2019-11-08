<template>
	<view>
		<view class="shop-list-item bg-white flex justify-start margin-bottom-normal flex-all animated fadeInLeft" 
			   @click="checkShopDetail" v-if="item.name">
			<view class="shop-img-area">
				<template v-if="cat=='search'">
					<image :src="item.coverurl?item.coverurl:'../../../static/img/default.png'" class="shop-img"></image>
				</template>
				<template v-else>
					<image :src="item.coverurl?item.coverurl:'../../../../static/img/default.png'" class="shop-img"></image>
				</template>
			</view>
			<view class="shop-info-area flex-1 " >
				<view class="flex justify-start font-weight-bold align-center" style="margin-bottom:10upx;">
					<view class=" text-ellipse " style="width:35%;">{{item.name || ''}}</view>
					<view v-if="item.brandName">({{item.brandName }})</view>
					<image 	:src="type=='join'?'../../../static/img/shop/businessing.png':'../../../../static/img/shop/businessing.png'" 
							class="shop-tag" 
					v-if="item.status==shopStatusZn.businessing"></image>
					<image 
					:src="type=='join'?'../../../static/img/shop/ready.png':'../../../../static/img/shop/ready.png'" 
					class="shop-tag" v-if="item.status==shopStatusZn.ready"></image>
					<image 
						:src="type=='join'?'../../../static/img/shop/processing.png':'../../../../static/img/shop/processing.png'"
					class="shop-tag" v-if="item.status==shopStatusZn.processing"></image>
					<image 
					:src="type=='join'?'../../../static/img/shop/canceled.png':'../../../../static/img/shop/canceled.png'"
					 v-if="item.status==shopStatusZn.canceled"></image>
					<image
					 :src="type=='join'?'../../../static/img/shop/renovated.png':'../../../../static/img/shop/renovated.png'"
					v-if="item.status==shopStatusZn.renovated"></image>
					<image 
					 :src="type=='join'?'../../../static/img/shop/moved.png':'../../../../static/img/shop/moved.png'"
					 class="shop-tag-canceled" v-if="item.status==shopStatusZn.moved"></image>
				</view>
				
				<view class="shop-name flex align-center" style="margin-bottom:8upx;">
					<view style="width:40px">店长:</view>
					<view class="flex-1">{{item.managerName || ''}}/{{item.managerMobile || ''}}</view>
				</view>
				<view class="shop-name flex align-center">
					<view style="width:40px">地址:</view>
					<view class="flex-1">{{item.provinceName || ''}}{{item.cityName || ''}}{{item.districtName||''}}{{item.address}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import commonItem from './common-item.vue'
	export default {
		computed:mapState(['shopStatusZn']),
		data() {
			return {
				
			};
		},
		components:{commonItem},
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
		margin-bottom:13px;
		padding:18px 10px 23px 14px;
		width:100%;
		.shop-img-area{
			width:30%;
			margin-right: 10px;
			.shop-img{
				height:86px;
				border-radius:6px;
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
</style>
