<template>
	<view>
		<view class="header-content flex justify-between">
			<text class="cuIcon-back" style="font-size:17px;" @click="goBack()"></text>
			<text class="header-content-title">建议列表</text>
			<view>
				<image src="../../../../static/icon/roundadd.png" style="width:20px;height:20px;" @click="addSuggestion()"></image>
			</view>
		</view>
		<view class="suggestion-list-content">
			<view class="cu-list menu-avatar comment solids-top">
					<view class="cu-item" style="border-bottom:1px solid #EEEEED;border-radius: 10px;">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content">
							<view class="text-grey">莫甘娜</view>
							<!-- <view class="text-gray text-content text-df">
								凯尔，你被自己的光芒变的盲目。
							</view> -->
							<view class="bg-gray padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cu-tag line-red">查看评价</text>
									<text class="cu-tag line-red">修改</text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="cu-item" style="border-bottom:1px solid #EEEEED;border-radius: 10px;">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content">
							<view class="text-grey">莫甘娜</view>
							<!-- <view class="text-gray text-content text-df">
								凯尔，你被自己的光芒变的盲目。
							</view> -->
							<view class="bg-gray padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cu-tag line-red">查看评价</text>
									<text class="cu-tag line-red">修改</text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="cu-item" style="border-bottom:1px solid #EEEEED;border-radius: 10px;">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content">
							<view class="text-grey">莫甘娜</view>
							<!-- <view class="text-gray text-content text-df">
								凯尔，你被自己的光芒变的盲目。
							</view> -->
							<view class="bg-gray padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cu-tag line-red">查看评价</text>
									<text class="cu-tag line-red">修改</text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="cu-item" style="border-bottom:1px solid #EEEEED;border-radius: 10px;">
						<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
						<view class="content">
							<view class="text-grey">莫甘娜</view>
							<!-- <view class="text-gray text-content text-df">
								凯尔，你被自己的光芒变的盲目。
							</view> -->
							<view class="bg-gray padding-sm radius margin-top-sm  text-sm">
								<view class="flex">
									<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
								</view>
							</view>
							<view class="margin-top-sm flex justify-between">
								<view class="text-gray text-df">2018年12月4日</view>
								<view>
									<text class="cu-tag line-red">查看评价</text>
									<text class="cu-tag line-red">修改</text>
								</view>
							</view>
						</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			addSuggestion(){
				uni.navigateTo({
					url:'../create-suggestion/create-suggestion'
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background:#fff ;
	}
	.header-content{
		padding:15px 13px 15px 15px;
		width:100%;
		border-bottom:0.5px solid #EEEEED;
		.header-content-title{
			font-size:16px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(42,42,42,1);
		}
		.header-content-submit{
			font-size:14px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			// color:rgba(182,222,251,1);
			color:rgba(66,176,237,1)
		}
	}
</style>
