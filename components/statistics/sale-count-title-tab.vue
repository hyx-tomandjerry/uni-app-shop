<template>
	<view class="sale-trend-top flex justify-between">
		<view class="flex-1">
			<view class="font-size-big font-weight-bold">
				<slot name="content"></slot>
			</view>
		</view>
		<view class="flex align-center">
			<view class="flex align-center clerk-container-tab">
				<block v-for="(tab,index) in tabList" :key="index">
					<view class="text-center" @tap="selectTabCur(tab)" :class="{
						'bg-color-active':tabCurVal==tab.value,
						'text-white':tabCurVal==tab.value
						}">{{tab.name}}</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			tabList:Array,
			tabCurVal:[Number,String],
			
			
		},
		methods:{
			selectTabCur(item){
				this.$emit('selectTabCur',item)
			}
		}
	}
</script>

<style scoped>
	.clerk-container-tab{
		border:1upx solid #EEEEED;
		border-radius:20upx;
		width:260upx;
		height:70upx;
		line-height:70upx;
	}
	.clerk-container-tab>view{
		flex:1;
	}
	.clerk-container-tab>view:first-child{
		border-right: 1upx solid #EEEEED;
		border-radius: 20upx 0 0 20upx;
	}
	.clerk-container-tab>view:last-child{
		border-radius:  0 20upx   20upx 0;
	}
	.sale-trend-top{
		padding:10upx 20upx;
		align-content: center;
		border-bottom:1px solid #E3E3E3;
		
	}
	.trend-tab{
		border:1px solid #42B0ED;
		border-radius:6px;
		font-size:12px;
		height:21px;
		line-height:21px;
		text-align: center;
		color:#42B0ED;
		
	}
	.trend-tab-item{
		padding:0 8px;
	}
	.trend-tab-item:first-child{
		border-right:1px solid #42B0ED;
	}
</style>
