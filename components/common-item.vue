<template>
	<view class="repair-detail-list-item flex justify-start align-center" :class="{
		'font-size-litter':isSize,
		'marginBottomBig':bottomBigStyle,
		'marginBottomLitter':bottomLitterStyle
	}">
		<template v-if="type=='normal'">
			<!-- 门店报修 -->
			<view class="flex-litter text-left " :class="{'repair-intro':isPadding}" style="width:25%; ">{{intro}}</view>
			<view class="color-regular flex-1 ">{{content}}</view>
		</template>
		<template v-else-if="type=='unNormal'">
			<!-- 门店列表样式 -->
			<view class=" text-left" style="width:110upx">{{intro}} : </view>
			<view class="color-regular" style="margin-left:10upx;margin-bottom:12upx">{{content}}</view>
		</template>
		<template v-else-if="type=='img'">
			<!-- 标题类型 -->
			<image :src="src" class="shopImg" ></image>
			<text style="margin-right:5px;" class="color-regular">门店名称 : </text> {{content}}
		</template>
	</view>
</template>

<script>
	export default{
		props:{
			intro:String,
			content:[Number,String],
			src:String,
			isSize:Boolean,
			bottomBigStyle:{
				type:Boolean,
				default:true
			},
			bottomLitterStyle:Boolean,
			type:{
				type:String,
				default:'normal'
			},
			isPadding:{
				type:Boolean,
				default:true
			}
		}
	}
</script>

<style scoped>
	.repair-detail-list-item{
		font-size:15px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1)	
	}
	.repair-intro{
		padding-left:10px;
	}
	.shopImg{
		width:32upx;
		height:32upx;
		flex-shrink: 0;
		margin-right: 10upx;
	}
	.marginBottomBig{
		margin-bottom:30upx;
	}
	.marginBottomLitter{
		margin-bottom: 14upx !important;
	}
</style>
