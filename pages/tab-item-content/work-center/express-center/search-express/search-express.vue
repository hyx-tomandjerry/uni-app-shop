<template>
	<view class="borderTop">
		
		<view class="search-container flex justify-between position_relative">
			<input type="text" placeholder="搜索运单号" class="input-style">
			<image src="../../../../../static/icon/icon-sousuo2.png" class="search-img"></image>
			<view class="color-regular" style="margin-left:7px;width:10%">
				取消
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
			
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
	}
	.search-container{
		margin-top:17px;
		padding:0 17px 0 20px;
		height:31px;
		line-height:31px;
		.input-style{
			padding-left:32px;height:31px;line-height:31px;background:rgba(247,246,251,1);border-radius:16px;flex:1;font-size:13px;
		}
		.search-img{
			width:17px;height:17px;position:absolute;top:50%;transform: translateY(-50%);left:30px;
		}

	}
</style>
