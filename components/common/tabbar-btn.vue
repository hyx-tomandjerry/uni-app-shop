<template>
	<view class="box" style="position: fixed;bottom:0;z-index:1000;left:0;right:0;">
		<view class="cu-bar tabbar bg-white">
				<view class="action" @tap="gotoItem('index')">
					<view class="cuIcon-cu-image">
						<image :src="indexImg?indexImg:'../../../static/img/footer/index.png'" mode="widthFix" lazy-load></image>
					</view>
					<view :class="tabCur=='index'?'color-blue':'color-regular'">首页</view>
				</view>
				<view class="action" @tap="gotoItem('notice')">
					<view class="cuIcon-cu-image">
						<image :src="noticeImg?noticeImg:'../../../static/img/footer/message.png'" mode="widthFix" lazy-load></image>
						<view class="cu-tag badge" v-show="num>0">{{num}}</view>
					</view>
					<view :class="tabCur=='notice'?'color-blue':'color-regular'">通知</view>
				</view>
				<view class="action" @tap="gotoItem('work')">
					<view class="cuIcon-cu-image">
						<image :src="workImg?workImg:'../../../static/img/footer/work.png'" mode="widthFix" lazy-load></image>
						
					</view>
					<view :class="tabCur=='work'?'color-blue':'color-regular'">工作</view>
				</view>
				<view class="action" @tap="gotoItem('mine')">
					<view class="cuIcon-cu-image">
						<image :src="mineImg?mineImg:'../../../static/img/footer/mine.png'" mode="widthFix" lazy-load></image>
					</view>
					<view :class="tabCur=='mine'?'color-blue':'color-regular'">我的</view>
				</view>
			</view>	
	</view>
</template>

<script> 
	export default{
		props:{
			indexImg:String,
			noticeImg:String,
			workImg:String,
			mineImg:String,
			tabCur:String,
			num:Number
		},
		data(){
			return{
				
			}
		},
		methods:{
			gotoItem(type){
				this.$emit('gotoItem',type)
			}
		}
	}
</script>

<style>
</style>
