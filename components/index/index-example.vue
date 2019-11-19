<template>
	<view class="example-list  position_relative"   @tap="detailContent" >
		<div 	class="coverImg"
				:style="[{ backgroundImage:'url(' + item.coverurl+ ')' }]"></div>
		<view class="font-weight-bold color-normal  color-normal example-name" >{{item.name}}</view>
		<view class="font-size-small  color-regular" >{{item.applyDate | formatTime('YMDHMS')}}</view>
		<image src="../../../static/img/huizhi1.png"  mode="aspectFill" class="operateImg position_absolute"
			   v-if="item.report==report"></image>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		computed:mapState(['report']),
		props:{item:Object,index:Number},
		methods:{
			detailContent(){
				this.$emit('detailContent',{item:this.item,type:"example"})
			}
		}
	}
</script>

<style scoped>
	.operateImg{
		width:40px;height:36px;
		top:21px;right:0;
	}
	.coverImg{
		width:100%;height:143px !important;background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border-radius:6px;
	}
	.example-list{
		padding:21px 0 18px;
	}
	.example-name{
		margin-bottom:3px;margin-top:5px;
	}
</style>
