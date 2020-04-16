<template>
	<!-- 标题 -->
	<view class="title bg-white font-size-big font-weight-bold" :class="{'border-bottom':borderBottom,'title-padding':paddingLeft}">
		<view class="title-tag" v-show="isTag"></view>
		{{title}}
	</view>
</template>

<script>
	export default{
		props:{
			title:String,//标题
			// 是否有下边框
			borderBottom:{
				type:Boolean,
				default:true
			},
			// 左侧tag
			isTag:{
				type:Boolean,
				default:true
			},
			paddingLeft:{
				type:Boolean,
				default:true,
			}
		}
	}
</script>

<style scoped>
	.title-tag{
		width:16upx;
		height:40upx;
		position:absolute;
		left:0;
		background-color:#42B0ED;
	}
	.title{
		position:relative;
		padding:30upx 40upx 30upx 0;
	}
	.border-bottom{
		border-bottom: 1px solid #EEEEED;
	}
	.title-padding{
		padding-left:10px;
	}
</style>
