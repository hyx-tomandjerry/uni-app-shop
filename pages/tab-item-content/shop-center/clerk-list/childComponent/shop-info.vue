<template>
	<view class="shop-info  borderTop bg-white margin-bottom-normal">
		<view class="flex justify-start" style="margin-bottom:8px;">
			<view class="color-normal font-size-middle font-weight-bold" style="margin-right:8px;">{{shopItem.name || ''}}</view>
			<view >
				<text  class="shop-tag  cu-tag" :class="{
							'shop-business':shopItem.status==shopStatus.businessing,
							'shop-execution':shopItem.status==shopStatus.ready,
							'shop-prepare':shopItem.status==shopStatus.processing,
							'shop-canceled':shopItem.status==shopStatus.canceled,
							'shop-renovated':shopItem.status==shopStatus.renovated,
							'shop-moved':shopItem.status==shopStatus.moved,
						}">{{shopItem.status | shopStatusZnPipe}}</text>
			</view>
		</view>
	
		<view style="padding-bottom:14px;" class="borderBottom">
			<template v-if="shopItem.managerName">
				<normal-detail-item 
					width="24%"
					leftIntro="门店店长" 
					:marginBMini="true"
					:leftPadding="false"
					:rightContent="`${shopItem.managerName || ''}/${shopItem.managerMobile || ''}`"></normal-detail-item>
				
			</template>
			<normal-detail-item
				width="24%"
				leftIntro="品牌名称" 
				:marginBMini="true"
				:leftPadding="false"
				:rightContent="shopItem.brandName || ''"></normal-detail-item>
			<normal-detail-item
				width="24%"
				leftIntro="所属区域" 
				:marginBMini="true"
				:leftPadding="false"
				:rightContent="shopItem.zoneName || '暂无所属'"></normal-detail-item>
			<template v-if="shopItem.catalog">
				<normal-detail-item
					leftIntro="经营类别" 
					:marginBMini="true"
					:leftPadding="false"
					:rightContent="shopItem.catalog || ''"></normal-detail-item>
			</template>
			<view class="flex align-center" style="margin-bottom:20upx;" >
				<view style="width:24%" class="color-regular">门店面积</view>
				<view class="flex-1 color-normal  flex ">
					<view style="margin-right:20upx;">{{shopItem.area}}㎡</view>
					<view class="cuIcon-writefill color-blue font-size-big" @tap="editAddress('area')" v-if="shopItem.manager== userInfo.id"></view>
				</view>
			</view>
			<view class="flex align-center"  >
				<view style="width:24%" class="color-regular">门店编号</view>
					<view class="flex-1 color-normal  flex ">
						<view style="margin-right:20upx;">{{shopItem.seq}}</view>
						<view class="cuIcon-writefill color-blue font-size-big" @tap="editAddress('seq')" v-if="shopItem.manager == userInfo.id"></view>
					</view>
			</view>
		</view>
	
		<view class="shop-time flex justify-start align-center borderBottom">
			<view class="flex justify-start shop-duedate align-center" >
				<view class="cuIcon-time color-placeholder" style="font-size:18px;" ></view>
				<view style="margin:0 2px;">开业日期:</view><view >{{shopItem.duedate | formatTime('YMD')}}</view>
			</view>
			<view class="flex justify-start align-center " style="padding-left:20px;">
				<view class="cuIcon-time color-placeholder" style="font-size:18px;" ></view>
				<view style="margin:0 2px;">营业天数:</view><view >{{shopItem.days>0? shopItem.days:0}}</view>
			</view>
	
		</view>
	
		<view class="flex justify-between shop-address align-center">
			<view class="flex justify-start flex-1">
				<view class="cuIcon-location color-placeholder" style="font-size:18px;"></view>
				<view style="margin-left:7px;" class="color-blue" @tap="getLocation">
					{{shopItem.provinceName  || '' }}{{shopItem.cityName  || '' }}{{shopItem.districtName  || ''}}{{shopItem.address || ''}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import normalDetailItem from '../../../../../components/common/normal-detail-item.vue'
	
	
	export default{
		components:{normalDetailItem},
		computed:{
			shopStatus(){return this.config.shopStatus}
		},
		props:{
			shopItem:{
				type:Object,
				default(){return {}}
			},
			userInfo:{
				type:Object,
				default(){return {}}
			}
		},
		methods:{
			editAddress(type){
				this.$emit('editAddress',type)
			},
			getLocation(){
				this.$emit('getLocation')
			}
		}
	}
</script>

<style scoped>
		@import  url("../../../../../common/css/shop.css");
	.shop-info{
		padding:20upx 44upx 0;
	}
	.shop-time{
		padding:38upx 0 40upx;	
	}
	.shop-duedate{
		border-right:1px solid #EEEEED;padding-right:40upx;
	}
	.shop-address{
		padding:38upx 0 40upx;
	}
</style>
