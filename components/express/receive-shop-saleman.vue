<template>
	<view class="cu-modal bottom-modal " :class="isShow?'show':''" >
		<view class="cu-dialog">
			<view class="cu-bar bg-white">
				<view class="action text-green font-size-normal" @tap="hideModal">取消</view>
				<view class="color-normal font-size-big">选择收件店员</view>
				<view class="action text-blue font-size-normal" @tap="confirmShop()">确定</view>
			</view>
			<view >
				<view class="shop-info bg-white borderTop text-left" v-if="selectedShop">
					<view class="borderBottom" >
						<view class="shop-intro">省/市/区</view>
						<view class="font-size-big color-normal">{{selectedShop.provinceName || ''}} {{selectedShop.cityName || ''}} {{selectedShop.districtName || ''}}</view>
					</view>
					<view class="borderBottom">
						<view  class="shop-intro">详细地址</view>
						<view class="font-size-big color-normal">{{selectedShop.address || ''}}</view>
					</view>
					<view class="borderBottom">
						<view class="shop-intro">门店名称</view>
						<view class="font-size-big color-normal">{{selectedShop.name || ''}}</view>
					</view>
	
					<view class="borderBottom flex justify-between align-center"  @click.stop="chooseShopMan">
						<view>
							<view  class="shop-intro">联系人姓名/电话</view>
							<view class="font-size-big color-normal">
								<view>
									{{selectman.name || ''}} <text v-if="selectman.name">/</text>
									{{selectman.account || selectman.mobile || ''}}</view>
							</view>
						</view>
						<view class="cuIcon-roundright color-placeholder font-size-middle"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			isShow:Boolean,
			selectman:Object,
			selectedShop:Object
		},
		methods:{
			confirmShop(){
				this.$emit('confirmShop')
			},
			hideModal(){
				this.$emit('hideModal')
			},
			chooseShopMan(){
				this.$emit('chooseShopMan')
			}
		}
	}
</script>

<style scoped>
	.shop-info{
		padding:36upx 0 30upx 50upx;
	}
	.shop-info>view{
		padding-bottom:30upx;
	}
	.shop-info>view:nth-child(2),.shop-info>view:nth-child(3){
		padding-top:20upx
	}
	.shop-info>view:nth-child(4){
		padding:20upx 40upx 20upx 0;
	}
	.shop-intro{
		font-size:13px;
		color:#898888;
		margin-bottom:8upx;
	}
</style>
