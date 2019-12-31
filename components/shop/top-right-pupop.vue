<template>
	<view v-if="isShowModel">
		<view class="mask" @tap="hideModel"></view>
		<view class="model-content" :style="{top:statusHeight+'px'}" >
			<block v-for="(item,index) in topRightList" :key="index">
				<view :class="item.color" @tap="operateItem(item.value)" hover-class="bg-placeholder">
					<text :class="item.icon" ></text>
					{{item.name}}
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
		background:rgba(0,0,0,0.2)
	}
	.model-content{
		background:#FFFFFF;
		width:300upx;
		border-radius: 10upx;
		position:fixed;
		right:40upx;
		z-index:10000000000000
	}
	.model-content view{
		height:100upx;
		font-size:15px;
		line-height:100upx;
		padding:0upx 16upx;
		border-bottom:1px solid #EEEEED;
	}
	.model-content>view>text{
		margin-right:20upx;
		font-size:18px;
	}
</style>
