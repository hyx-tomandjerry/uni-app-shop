<template>
	<!-- 消息通知页面item -->
	<view   class="animated fadeInLeft notice-item-container" @tap="checkMessageItem(item)">
		<view class="text-center margin-bottom-normal" >
			<view class="font-size-small font-weight-normal text-white">
				<template v-if="item.occtime">
					<text class="notice-time">{{item.occtime | formatTime('YMDHMS')}}</text>
				</template>
				<template v-else-if="item.applyDate">
					<text class="notice-time">{{item.applyDate | formatTime('YMDHMS')}}</text>
				</template>
				
			</view>
		</view>
		<view class="flex justify-start">
			<image
					src="../../../../static/img/notice/daiban.png"
					class="notice-tag" mode="widthFix" lazy-load></image>
			
			<view  class="bg-white notice-detail">
				<view class="font-size-litter font-weight-normal color-placeholder " >
					<text>{{TabCur==2?'公告':'通知'}}</text>
				</view>
				<view class="notice-desc">
					<!-- <view class=" color-blue" style="margin-bottom:6px;">{{item.title}}</view> -->
					<view v-html="item.content || item.message" class="notice-content"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:Object,
			index:Number,
			TabCur:[Number,String]
		},
		methods:{
			checkMessageItem(){
				this.$emit('checkItem',this.item)
			}
		}
	}
</script>

<style scoped>
	.notice-item-container{
		margin-bottom:25px;
	}
	.notice-time{
		background:rgba(0,0,0,0.1);padding:2px 8px 2px 9px;border-radius: 4px;
	}
	.notice-tag{
		height:80upx !important;
		margin-right:15px;
		vertical-align: middle;
		width:80upx;
		flex-shrink: 0;
	}
	.notice-content{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.notice-detail{
		flex:1;
		padding:20upx;
		border-radius: 18upx;
	}
</style>
