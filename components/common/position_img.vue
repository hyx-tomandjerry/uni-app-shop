<template>
	<view>
		<image :src="src"
				:class="{
					'position-img':position_img,
					'record_img':record_img
				}"
				 @tap="operate"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			src:String,
			position_img:Boolean,
			record_img:Boolean
		},
		methods:{
			operate(){
				this.$emit('createOperate')
			}
		}
	}
</script>

<style scoped lang="less">
	.position-img{
		position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;
	}
	.record_img{
		width:84px;
		height: 84px;
		position:fixed;
		z-index:100;
		bottom:32px;
		right:20px;
	}
</style>
