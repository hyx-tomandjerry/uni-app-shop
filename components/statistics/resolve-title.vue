<template>
	<view>
		<template v-if="type=='year'">
			<view>
				<view class="text-white">{{new Date().getFullYear()}} 年门店年目标</view>
				<view class="shop-aim">¥{{shopSaleResolve.expect | numStyle}}</view>
				<view class="shop-intro flex justify-start">
					<view class="intro-l flex justify-start flex-1">
						<image src="../../../../../static/icon/icon-time@2x.png" class="intro-i"></image>
						<view>
							<view class="shop-date" v-if="shopSaleResolve.bgndate">{{shopSaleResolve.bgndate | formatTime('YMD')}}</view>
							<view class="shop-date" v-else>时间未知</view>
							<view class="font-size-mini" style="color:#7C81A3">开业日期</view>
						</view>
					</view>
					<view class="intro-r flex justify-start flex-1">
						<image src="../../../../../static/icon/icon-time@2x.png" class="intro-i"></image>
						<view>
							<view class="shop-date" >{{new Date().getFullYear()}}-12-31</view>
							<view class="font-size-mini" style="color:#7C81A3">截止日期</view>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-else-if="type=='month'">
			<view>
				<view class="text-white">{{new Date().getFullYear()}} 年{{month}}目标</view>
				<view class="shop-aim">¥ {{shopSaleResolve.monthAim  | numStyle}}</view>
				<view class="shop-intro flex justify-between align-center">
					<view class="text-white" style="width:50%;">{{month}}占全年比重</view>
					<view class="cu-progress round sm striped active" style="margin:0 5px;">
						<view class="bg-color-purple"  :style="[{ width:`${shopSaleResolve.monthPre}%`}]"></view>
					</view>
					<view class="font-family-num font-size-middle  font-weight-bold color-purple">{{shopSaleResolve.monthPre || 0}}%</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default{
		props:{
			type:String,//year是显示年，month是显示月
			shopSaleResolve:Object,
			month:String,
			monthPre:Number,
			

		}
	}
</script>

<style scoped lang="less">
	.shop-aim{
		font-size:36px;
		font-family:DINAlternate-Bold;
		color:rgba(120,246,178,1);
		margin:3px 0 10px;
	}
	.intro-r{
		padding-left:15px;
		border-left:1px solid #525A85;
	}
	.intro-i{
		width: 16px;
		height: 16px;
		vertical-align: middle;
		margin-right:6px;
		margin-top:4px;
	}
	.shop-date{
		font-size:16px;
		font-family:DINAlternate-Bold;
		color:rgba(255,255,255,1);
	}
	
</style>
