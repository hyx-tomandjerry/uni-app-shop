<template>
	<view class="wrap">
		<text class="line"></text>
		<text >{{title}}</text>
		<text class="line"></text>
	</view>
</template>

<script>
	export default{
		props:{
			title:String
		}
	}
</script>

<style scoped>
	.wrap{
		position:relative;
		overflow: hidden;
		margin:0px 20upx;
		padding:28upx 0 28upx;
	}
	.wrap text{
		float:left;
		font-size:16px;
		font-weight: bold;
		text-align: center;
		width:33.3%;
	}
	.wrap .line{
		border-bottom:0.3px solid #aaaaaa;
		height:12px;
	}
</style>
