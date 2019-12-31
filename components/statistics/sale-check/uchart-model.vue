<template>
	<view>
		
		<view>
			<view class="chart-container" >
				<view class="chart-content">
					<image src="../../../static/img/work/statistics/count-bg.png"></image>
					<slot name="canvas"></slot>
				</view>

				<view class="count-number-area" style="padding:10px 40px;">
					<view class="num-area flex justify-start flex-all align-center">
						<view class="num-area-left num flex-1">{{todayNum || 0}}</view>
						<view class="num-area-right num flex-sm">{{aimNum || 0}}</view>
					</view>
					<view class="intro-container font-size-mini">
						<view class="intro-area flex justify-start flex-all align-center" >
							<view class="intro-area-left  flex-1">
								<view class="num-intro">门店销售额</view>
							</view>
							<view class="intro-area-right  flex-sm">
								<view class="num-intro" >门店销售目标</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>

	export default {
		data() {
			return {
				saleList:[]
			}
		},
		props:{
			todayNum:{
				type:[Number,String],
				default:""
			},
			aimNum:{
				type:[Number,String],
				default:""
			},
		},
		methods: {
			goBack(){
				this.$emit('goBack')
			}
		},


	}
</script>

<style scoped>
	.chart-container{
		height:460upx;
		background:url("../../../static/img/work/statistics/bg.png") no-repeat center center;
		background-size:cover;
	}
		.chart-content{
			width: 300upx;
			height: 300upx;
			position:relative;
			margin: 0 auto;
			
		}
		.chart-content>image{
			width: 100%;
			height: 100%;
			position:absolute;
			top:0;
			left:0
		}
		.num{
			font-size:26px;
			font-family:DINAlternate-Bold;
			font-weight:bold;
			color:rgba(255,255,255,1);
		}
		.num-area-left{
			border-right:1px solid #525A85;
			background:url(../../../static/img/work/statistics/count-money.png) no-repeat 0 center;
			background-size: 32upx 32upx;
			padding-left:50upx;
		}
		.num-area-right{
			margin-left:24px;
			background:url(../../../static/img/work/statistics/aim-money.png) no-repeat 0 center;
			background-size: 32upx 32upx;
			padding-left:50upx;
		}
		.intro-container{
			color:#7C81A3;
			
		}
		.intro-area-left{
			padding-left:50upx;
		}
		.intro-area-right{
			padding-left:48upx;
		}
	

</style>
