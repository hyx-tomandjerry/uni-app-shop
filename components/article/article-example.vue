<template>
	<view  @tap="checkItemInfo"  class="borderBottom position_relative example-content-list">
		<image :src="item.coverurl" mode="widthFix" class="example-content-cover"></image>
		<view class="font-size-big font-weight-bold example-content-name" >{{item.name}}</view>
		<view class="font-size-litter font-weight-normal color-placeholder">{{item.applyDate | formatTime('YMDHMS')}}</view>
		<image src="../../../static/img/huizhi1.png"  class="position_absolute operateImg" v-if="item.report==report"></image>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		computed:mapState(['report']),
		props:{item:Object,index:Number},
		methods:{
			checkItemInfo(){
				this.$emit('checkItemInfo',this.item)
			}
		}
	}
</script>

<style scoped>
	.example-content-list{
		padding:46upx 28upx 42upx 28upx;
	}
	.example-content-cover{
		width:100%;
		height:143px !important;
		border-radius: 20upx;
		margin-bottom: 26upx;
	}
	.example-content-name{
		margin-bottom: 20upx;
	}
	.operateImg{
		width:37px;
		height:37px;
		top:22px;
		right:18px;

	}
</style>
