<template>
	<view class="sale-count-content borderTop margin-bottom-normal flex justify-center align-center">
		<template v-if="type=='year'">
			<view class="chart-container flex justify-center align-center position_relative">
				<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
			</view>
		</template>
		<template v-else-if="type=='month'">
			<view class="progress-content">
				<view class="font-weight-bold color-blue">{{shopPerformPre}}%</view>
				<view class="color-blue text-center">完成比例</view>
			</view>
			<view class="cu-progress round flex-1 striped active" >
				<view class="bg-color-blue" :style="[{'width':shopPerformPre+'%'}]"></view>
			</view>
		</template>
		
		<view class="sale-count-bottom flex justify-between color-regular flex-all">
			<view class="flex-1 text-center ">
				<template v-if="type=='year'">
					<view>{{timeObj.year}}年</view>
				</template>
				<template v-else-if="type=='month'">
					<view>{{timeObj.month}}月</view>
				</template>
				<view class="margin-mini">门店销售总额(元)</view>
				<view class="font-weight-bold font-size-num color-normal">{{shopfactPerform}}</view>
			</view>
			<view class="flex-1 text-center ">
				<template v-if="type=='year'">
					<view>{{timeObj.year}}年</view>
				</template>
				<template v-else-if="type=='month'">
					<view>{{timeObj.month}}月</view>
				</template>
				<view class="margin-mini">门店销售目标(元)</view>
				<view class="font-weight-bold font-size-num color-normal">{{shopAimPerform}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			shopPerformPre:[Number,String],
			timeObj:Object,
			shopfactPerform:[Number,String],
			shopAimPerform:[Number,String],
			type:String
		}
	}
</script>

<style scoped>
	.sale-count-content{
		padding:40upx 60upx;
		background-color: #fff;
		flex-direction: column;
	}
	.progress-content>view:first-child{
		font-size:80upx;
	}
	.progress-content{
		margin-bottom: 20upx;
	}
	.margin-mini{
		margin:10upx 0;
	}
	.sale-count-bottom{
			margin-top: 20px;
	}
	.charts3 {
		position: absolute;
		width: 250upx;
		height: 250upx;
		background-color: #FFFFFF;			
		
	}
	.chart-container{
		height:250upx;
	}
</style>
