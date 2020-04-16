<template>
	<view class="flex justify-start align-center borderBottom position_relative more-content"   @tap="checkItemInfo" >
		<view class="left-container">
			<view class="font-size-big font-weight-bold more-content-name">{{item.name}} </view>
			<view class="font-size-litter  color-regular left-container-time">{{item.applyDate | formatTime('YMDHMS')}}</view>
		</view>
		<view style="width:29%;">
			<image :src="item.coverurl" mode="widthFix"  class="more-content-cover"></image>
		</view>
		<image src="../../static/img/huizhi1.png"  class="position_absolute operateImg" v-if="item.report==report"></image>
	</view>
</template>

<script>


	export default{
		props:{
			item:Object,
			index:Number
		},
		computed:{
			report(){
				return this.config.report
			}
		},
		methods:{
			checkItemInfo(){
				this.$emit('checkItemInfo',this.item)
			}
		}
	}
</script>

<style scoped>
	.left-container{
		width:68%;
		
	}
	/* .left-container>view:first-child{
		word-break: break-all;
	} */
	.left-container-time{
		word-break: break-all;
	}
	.more-content{
		padding: 10upx 20upx ;
	}
	.more-content-name{
		width:100%;
		margin-bottom: 20upx;
		padding-right: 30upx;
	}
	.more-content-cover{
		height:160upx !important;
		flex-shrink: 0;
		border-radius: 20upx;
	}
	.operateImg{
		width:37px;
		height:37px;
		top:10upx;
		right:40upx;

	}
</style>
