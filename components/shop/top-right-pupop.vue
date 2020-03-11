<template>
	<view v-if="isShowModel">
		<view class="mask" @tap="hideModel"></view>
		<view class="model-content" :style="{top:statusHeight+'px'}" >
			<block v-for="(item,index) in topRightList" :key="index">
				<view  @tap="operateItem(item.value)" hover-class="bg-color-normal" class="flex align-center">
					<image :src="item.img" mode="widthFix" class="symbol-img"></image>
					<view>{{item.name}}</view>
				</view>
			</block>
			
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			isShowModel:Boolean,//是否显示
			statusHeight:Number,
			topRightList:Array
		},
		methods:{
			// 关闭pupop
			hideModel(){
				this.$emit('hideModel')
			},
			operateItem(item){
				this.$emit('operateItem',item)
			}
		}
	}
</script>

<style scoped>
	.mask{
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
		height:100%;
		width:100%;
		background:rgba(0,0,0,0.2)
	}
	.model-content{
		color:#FFFFFF;
		width:360upx;
		border-radius: 10upx;
		position:fixed;
		right:40upx;
		z-index:100000000;
		background:url('../../static/img/shop/topRight_bg.png') no-repeat;
		background-size:cover;
	}
	.model-content view{
		height:100upx;
		line-height:100upx;
		padding:0upx 16upx;
		border-bottom:1upx solid #707070;
	}
	.model-content>view>text{
		margin-right:20upx;
		font-size:18px;
	}
	.symbol-img{
		width:40upx;
		height:40upx;
		flex-shrink: 0;
		margin-right:10upx;
		vertical-align: middle;
	}
</style>
