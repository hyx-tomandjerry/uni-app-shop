<template>
	<view class="data-choose-container"  v-if="isShowRadio">
		<view class="choose-content font-size-normal">
			<image src=../../../../../static/icon/close.png mode="widthFix" class="close_img" lazy-load @tap="cancelRadio"></image>
			<image src="../../../../../static/img/work/statistics/resolve-day.png" mode="widthFix" class="choose-way-img" lazy-load></image>
			<view class="way-desc font-weight-bold font-size-normal">
				<view class="font-size-big color-normal" style="margin-bottom:10px;">{{year}}年{{month}}月</view>
				<view class="margin-bottom-mini">月目标 :	<text  class="resolve-content-text">{{shopMonthAim.monthAim || 0}}元</text></view>
				<view v-show="radio==resolveWay.day">
					<view class="margin-bottom-mini">分解方式 :	<text class="resolve-content-text">按天平摊({{monthDay}}天)</text></view>
				</view>
				<view v-show="radio==resolveWay.week">
					<view class="margin-bottom-mini">周末天数 :	<text class="resolve-content-text">{{countWeek}}天</text></view>
					<view class="margin-bottom-mini">普通天数 :	<text class="resolve-content-text">{{monthDay-countWeek}}天</text></view>
				</view>
				<view class="flex align-center" v-show="month==new Date().getMonth()+1">
					<text 
							class="font-size-back color-regular"
							@tap="changeCheck"
							:class="{
								'cuIcon-round':!checked,
								'cuIcon-roundcheck':checked,
							}"
					>
				
					</text><text style="margin-left:10upx;" class="color-regular">在本月剩余天数中分配</text>
				</view>
			</view>
			<view class="btn-container" >
				<button type="primary" class="resolve-btn" @tap="radioSelect">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		computed:{
			resolveWay(){return this.config.resolveWay}
		},
		data(){
			return{
				checked:false
			}
		},
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
			changeCheck(){
				this.checked=!this.checked;
			},
			cancelRadio(){
				this.$emit('cancelRadio')
			},
			radioSelect(){
				this.$emit('radioSelect',this.checked)
			}
		}
	}
</script>

<style scoped>
	.data-choose-container{
		width:100%;min-height:800px;background:rgba(0,0,0,0.2);position:absolute;z-index:9999;top:0;left:0;
	}
	.choose-content{
		padding-top:100upx;
		border-radius: 20upx;
		width:550upx;
		background:#fff;border:1px solid #ccc;
		position:absolute;
		transform: translate(-50%,-50%);
		left:50%;top:50%;transition: all 1s;padding-bottom:5px;
	}
	.way-desc{
		padding-left:50upx;
	}
	.close_img{
		width:50upx;height:50upx;top:-20upx;position:absolute;right:-16upx;
	}
	.choose-way-img{
		position:absolute;
		top:-68upx;
		left:120upx;
		width:280upx;height:180upx !important;
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
		height:70upx;line-height:70upx;
	}
	.btn-container{
		margin:40upx 30upx
	}
</style>
