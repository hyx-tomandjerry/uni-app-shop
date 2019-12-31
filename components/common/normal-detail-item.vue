<template>
	<view class="flex normal-item font-size-normal" 
		:class="{'margin-bottom':marginBottom,
				'align-center':alignCenter,
				'margin-b-mini':marginBMini,
				'margin-b-litter':marginBLitter,
				'margin-b-no':marginBNo
				}">
		<template v-if="fromType=='repair'">
			<!-- 保修详情形式 -->
			<view class="color-regular"
				:style="{width:width}"
				:class="{'left-padding':leftPadding}">{{leftIntro}}</view>
			<view class="flex-1 wordBreak color-normal" >{{rightContent}}</view>
		</template>
		<template v-else-if="fromType=='image'">
			<!-- 报修列表单个那种形式 -->
			<view class="color-regular flex align-center" :style="{width:width}">
				<image :src="src" mode="widthFix" lazy-load class="shopImg"></image>
				<view>{{leftIntro}} : </view>
			</view>
			<view class="flex-1 wordBreak color-normal">{{rightContent}}</view>
		</template>
	</view>
</template>

<script>
	export default{
		props:{
			src:String,
			fromType:{
				type:String,
				default:'repair'
			},
			width:{
				default:'30%',
				type:String,
			},
			leftIntro:String,
			rightContent:[String,Number],
			leftPadding:{
				type:Boolean,
				default:true
			},
			marginBottom:{
				type:Boolean,
				default:true
			},
			marginBLitter:Boolean,
			marginBMini:Boolean,
			alignCenter:Boolean,
			marginBNo:Boolean
		}
	}
</script>

<style scoped>
	.wordBreak{
		word-break: break-word;
	}
	.left-padding{
		padding-left:20upx;
	}
	.margin-bottom{
		margin-bottom:30upx;
	}
	.shopImg{
		width:32upx;
		height:32upx !important;
		flex-shrink: 0;
		margin-right: 10upx;
	}
	.margin-b-mini{
		margin-bottom:20upx;
	}
	.margin-b-litter{
		margin-bottom:14upx;
	}
	.margin-b-no{
		margin-bottom: 0;
	}
</style>
