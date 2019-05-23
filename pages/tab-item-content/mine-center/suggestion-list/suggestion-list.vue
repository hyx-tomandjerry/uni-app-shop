<template>
	<view >
		<cu-custom  isBack="true">
			 <block slot="left"><text class="cuIcon-back" @click="goBack()"></text></block>
			<block slot="content">反馈建议</block>
			<block slot="right">
				<image src="../../../../static/icon/roundadd.png" style="width:20px;height:20px;" @click="addSuggestion()"></image>
			</block>
		</cu-custom>
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
									<text class="cu-tag line-red">查看</text>
									<text class="cu-tag line-red">删除</text>
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
									<text class="cu-tag line-red">查看</text>
									<text class="cu-tag line-red">删除</text>
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
									<text class="cu-tag line-red">查看</text>
									<text class="cu-tag line-red">删除</text>
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
									<text class="cu-tag line-red">查看</text>
									<text class="cu-tag line-red">删除</text>
								</view>
							</view>
						</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headTab from '../../../../components/head-tab.vue'
	export default {
		data() {
			return {
				title:'建议列表'
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
		},
		components:{
			headTab
		}
	}
</script>

<style lang="less">
	page{
		background:#fff ;
	}

	
</style>
