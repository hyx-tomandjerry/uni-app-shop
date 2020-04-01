<template>
	<view class="list-item bg-white flex justify-between align-center"  @click='checkItem'>
		<view class="list-item-l">
			<view class="font-size-big font-weight-bold color-normal">{{item.name  || ''}}</view>
			<view class="color-regular">{{item.bgndate | formatTime('YMD')}}</view>
		</view>
		<view class="list-item-r">
			<view class="list-item-tag">去审核</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number
		},
		methods:{
			checkItem(){
				this.$emit('checkItem',this.item)
			}
		}
	}
</script>

<style scoped>
	.list-item{
		border-radius:12upx;
		margin-bottom:26upx;
		padding:40upx 0  40upx;
		border-left:20upx solid #3AA9E6;
	}
	.list-item-tag{
		height:50upx;
		line-height:50upx;
		padding-left:60upx;
		width:160upx;
		background:#3AA9E6;
		border-radius:4px 0px 0px 4px;
		color:#fff;
		font-size:26upx;
		background-image:url("../../static/img/work/statistics/check_tag.png");
		background-repeat: no-repeat;
		background-position: 20upx center; 
		background-size:36upx 36upx;
	}
	.list-item>.list-item-l{
		padding-left: 20upx;
		
	}
	.list-item>.list-item-l>view:first-child{
		margin-bottom: 20upx;
	}
</style>
