<template>
	<view class="flex justify-start align-center borderBottom position_relative more-content"   @tap="checkItemInfo" >
		<view style="flex:1">
			<view class="font-size-big font-weight-bold more-content-name">{{item.name}} </view>
			<view class="font-size-litter  color-regular">{{item.applyDate | formatTime('YMDHMS')}}</view>
		</view>
		<view style="width:29%;">
			<image :src="item.coverurl" mode="widthFix"  class="more-content-cover"></image>
		</view>
		<image src="../../../static/img/huizhi1.png"  class="position_absolute operateImg" v-if="item.report==report"></image>
	</view>
</template>

<script>
	import {mapState} from 'vuex'

	export default{
		computed:mapState(['report']),
		props:{
			item:Object,
			index:Number
		},
		methods:{
			checkItemInfo(){
				this.$emit('checkItemInfo',this.item)
			}
		}
	}
</script>

<style scoped>
	.more-content{
		padding: 10upx 20upx ;
	}
	.more-content-name{
		margin-bottom: 20upx;
	}
	.more-content-cover{
		height:160upx;
		flex-shrink: 0;
		border-radius: 20upx;
	}
	.operateImg{
		width:37px;
		height:37px;
		top:22px;
		right:18px;

	}
</style>
