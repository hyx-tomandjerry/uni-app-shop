<template>
	<view class="shop-man-item borderBottom flex justify-start align-center position_relative animated slideInLeft fast" @click="chooseman">
		<view class="flex justify-center align-center">
			<image :src="item.headurl?item.headurl:'../../../../../static/img/default.png'"></image>
		</view>
		<view >
			{{item.name}}/{{item.mobile || item.account}}
		</view>
		<view class=" position_absolute" >
			<image 
			:src="TabCur==item.id?'../../../../../static/icon/icon-xuanzhong.png':'../../../../../static/icon/icon-weixuanzhong.png'"></image>
		</view>
	</view>
</template>

<script>
	
	export default{
		props:{
			item:Object,
			index:Number,
			TabCur:Number
		},
		methods:{
			chooseman(){
				this.$emit('chooseman',this.item)
			}
		}
	}
</script>

<style scoped>
	.shop-man-item{
		padding:18px 0 15px;
	}
	.shop-man-item>view:first-child{
		
	}
	.shop-man-item>view:first-child>image{
		width:40px;height:40px !important;border-radius: 50%;vertical-align: middle;flex-shrink: 0;
	}
	.shop-man-item>view:nth-child(2){
		margin-left:10px;margin-right:15px;
	}
	.shop-man-item>view:nth-child(3){
		right:10px;top:25px;
	}
	.shop-man-item>view:nth-child(3)>image{
		width:20px;height:20px;
	}
</style>
