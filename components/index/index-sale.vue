<template>
	<view class="flex justify-start  position_relative borderBottom sale-item"  @tap="detailContent" >
	
		<view  class="sale-item-l">
			<view class="font-weight-bold color-normal" >{{item.name}}</view>
			<view class="font-size-small font-weight-normal color-regular ">{{item.applyDate | formatTime('YMDHMS')}}</view>
		</view>
		<view  class="sale-item-r">
			<image :src="item.coverurl" mode="widthFix"></image>
		</view>
	
		<image src="../../../static/img/huizhi1.png"
		mode="widthFix"
		class="position_absolute operateImg" v-if="item.report==1"></image>
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number
		},
		methods:{
			detailContent(){
				this.$emit('detailContent',{
					type:'skill',
					item:this.item
				})
			}
		}
	}
</script>

<style scoped>
	.operateImg{
		width:40px;height:36px;top:22px;right:0;
	}
	.sale-item{
		padding:23px 0 25px;;width:100%;align-items:center
	}
	.sale-item-l{
		flex:1;margin-right:7px;
	}
	.sale-item-l>view:first-child{
		margin-bottom:9px;
	}
	.sale-item-r{
		
	}
	.sale-item-r>image{
		height:79px !important;border-radius: 10px;vertical-align: middle;width:100px; flex-shrink: 0;
	}
</style>
