<template>
	<view class="operate-item flex justify-between align-center animated slideInLeft" 
	:class="{
		'border-Left-red':border_left_r,
		'border-left-y':border_left_y,
		'border-left-g':border_left_g,
		'border-left-p':border_left_p
	}"
		v-show="show" hover-class="bg-color-normal" @click="goToItem">
		<view class="font-size-big font-weight-bold color-normal">
			{{name}}
		</view>
		<image :src="src"
		 :class="{
			 'apply_img':apply_img,
			 'check_img':check_img,
			 'sale_resolve_img':sale_resolve_img,
			 'sale_check_img':sale_check_img
		 }"
		 mode="widthFix" lazy-load></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			show:{
				type:Boolean,
				default:true
			},
			src:String,
			name:String,
			value:String,
			sale_check_img:Boolean,
			sale_resolve_img:Boolean,
			apply_img:Boolean,
			check_img:Boolean,
			border_left_r:Boolean,
			border_left_y:Boolean,
			border_left_g:Boolean,
			border_left_p:Boolean
		},
		methods:{
			goToItem(){
				this.$emit('goToItem',this.value)
			}
		}
	}
</script>

<style scoped lang="less">
.operate-item{
	min-width:650upx;
	border-radius: 12upx;
	padding:0 34upx 0 80upx;
	height:180upx;
	line-height:180upx;
	box-sizing: border-box;
	background-color: #fff;
	margin-bottom:20upx;
	}
	.apply_img{
		width:100upx;
		height:60upx !important;
	}
	.border-Left-red{
		border-left:12upx solid #FF4C4C;
	}
	.border-left-y{
		border-left:12upx solid #FFB126;
	}
	.border-left-p{
		border-left:12upx solid #3343C9;
	}
	.check_img{
		width:76upx;
		height:90upx !important
	}
	.sale_check_img{
		width: 36px;
		height: 38px;
	}
	.sale_resolve_img{
		width:50px;
		height:50px !important;
	}
	.border-left-g{
		border-left:12upx solid #15AFA1;
	}
			
</style>
