<template>
	<view class="resolveModal data-choose-container"  v-if="isShowRadio">
	
		<view class="choose-content">
			<image src='../../../../../static/icon/close.png'  @tap="cancelRadio" class="close_img"></image>
			<view style="text-align:center;">
				<image :src="radio==resolveWayZn.day?'../../../../../static/img/work/statistics/resolve-day.png':'../../../../../static/img/work/statistics/resolve-week.png'" class="choose-way-img" mode="widthFix" lazy-load></image>
			</view>
			<view class="resolve-content" >
				<view class="font-size-big color-normal" style="margin-bottom:10px;">{{year}}年{{month}}月</view>
				<view class="margin-bottom-mini">月目标 :	<text  class="resolve-content-text">{{shopMonthAim.monthAim || 0}}元</text></view>
				<view v-show="radio==resolveWayZn.day">
					<view class="margin-bottom-mini">分解方式 :	<text class="resolve-content-text">按天平摊({{monthDay}}天)</text></view>
				</view>
				<view v-show="radio==resolveWayZn.week">
					<view class="margin-bottom-mini">周末天数 :	<text class="resolve-content-text">{{countWeek}}天</text></view>
					<view class="margin-bottom-mini">普通天数 :	<text class="resolve-content-text">{{monthDay-countWeek}}天</text></view>
				</view>
			</view>
			<view class="resolve-btn" @tap="radioSelect()">确定</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		computed:mapState(['resolveWayZn']),
		props:{
			isShowRadio:Boolean,
			radio:Number,
			shopMonthAim:Object,
			countWeek:Number,
			monthDayCountWeek:Number,
			year:Number,
			month:Number,
			monthDay:Number
		},
		methods:{
			cancelRadio(){
				this.$emit('cancelRadio')
			},
			radioSelect(){
				this.$emit('radioSelect')
			}
		}
	}
</script>

<style scoped>
	.data-choose-container{
		width:100%;min-height:800px;background:rgba(0,0,0,0.2);position:absolute;z-index:9999;top:0;left:0;
	}
	.choose-content{
		width:263px;height:219px;
		background:#fff;border:1px solid #ccc;
		position:absolute;
		transform: translate(-50%,-50%);
		left:50%;top:50%;transition: all 1s;padding-bottom:5px;
	}
	.close_img{
		width:24px;height:24px;margin-top:-10px;position:absolute;right:-10px;
	}
	.choose-way-img{
		width:137px;height:90px;margin-top:-40px;margin-left:6px;
	}
	.resolve-content{
		padding-top:4px;padding-left:20px;margin-bottom:17px;
	}
	.resolve-content-text{
		color:#14B45D;margin-left:8px;
	}
	.margin-bottom-mini{
		margin-bottom: 10upx;
	}
	.resolve-btn{
		height:30px;line-height:30px;text-align: center;background: url('../../static/img/work/statistics/btn-bg.png') no-repeat center;margin:0 13px;color:#fff;
	}
</style>
