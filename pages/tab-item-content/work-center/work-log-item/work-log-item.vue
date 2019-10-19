<template>
	<view class="borderTop">
		<view class="sale_item_top flex justify-between margin-bottom-normal">
			<view class="sale_info_container flex-1">
				<view class="user_info flex justify-start">
					<image src="../../../../static/img/cute.jpg" mode="" class="user_avatar"></image>
					<view>
						<view class="color-normal font-size-big" style="margin-bottom:7px;">张三</view>
						<view class="font-size-litter color-regular">2019-08-22</view>
					</view>
				</view>
				<view class="sale_info">
					<view class="flex justify-start align-center sale_info_item font-size-normal">
						<view class="blue-dot"></view>
						<view>上海zara旗舰店时尚广场</view>
					</view>
					<view class="flex justify-star align-center sale_info_item font-size-normal">
						<view class="blue-dot"></view>
						<view class="color-regular">今日目标:<text style="color:#13B27A" class="font-weight-bold">¥53,2234.00</text></view>
					</view>
					<view class="flex justify-star align-center sale_info_item font-size-normal">
						<view class="blue-dot"></view>
						<view class="color-regular">今日销售额:<text style="color:#FE2763" class="font-weight-bold">¥53,2234.00</text></view>
					</view>
				</view>
			</view>
			<view class="sale_chart_container flex-sm">
				<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3" ></canvas>
			</view>
		</view>
		<view class="sale_item_bottom bg-white">
			<view class="intro font-size-big font-weight-bold">门店成员绩效</view>
			<view class="sale_man_list flex justify-between align-center" v-for="(item,index ) in saleList" :key="index">
				<image :src="item.img" mode="" class="man_avatar flex-sm"></image>
				<view class="flex-1">
					<view class="man_sale flex justify-between align-center">
						<view>{{item.name}}</view>
						<view>{{item.alonePre}}5</view>
						<view>门店排名{{item.rank}}</view>
						<view class="font-size-middle  font-weight-bold" 
						:class="{
							'color-blue':(index+1)%2==0,
							'color-purple':(index+1)%3==0,
							'color-red':(index+1)%5==0,
							'text-orange':(index+1)%7==0
						}"
						style="padding-bottom:3px;">{{item.money}}</view>
					</view>
					<view class="cu-progress round sm striped active" >
						<!-- :style="[{'width':`${item.pre}%`}]" -->
							<view 
							 :class="{
									
									'bg-color-blue':(index+1)%2==0,
									'bg-color-purple':(index+1)%3==0,
									'bg-color-red':(index+1)%5==0,
									'bg-color-orange':(index+1)%7==0
									}"
							 :style="[{'width':`${item.alonePre}%`}]"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../../../components/u-charts/u-charts.js'
	var canvaArcbar1;
	export default {
		data() {
			return {
				cWidth3:'',//圆弧进度图
				cHeight3:'',//圆弧进度图
				arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio:1,
				chartData: {
					series: [{
						name: '正确率',
						data: 0.29,
						color: '#2fc25b'
					}]
				},
				saleList:[
					{img:'../../../../static/img/cute.jpg',name:'TOM',alonePre:'10',rank:'03',money:'￥2100.00'},
					{img:'../../../../static/img/cute.jpg',name:'Jerry',alonePre:'20',rank:'03',money:'￥2100.00'},
					{img:'../../../../static/img/cute.jpg',name:'Rose',alonePre:'30',rank:'03',money:'￥2100.00'},
					{img:'../../../../static/img/cute.jpg',name:'Jerry',alonePre:'40',rank:'03',money:'￥2100.00'},
					{img:'../../../../static/img/cute.jpg',name:'Simily',alonePre:'50',rank:'03',money:'￥2100.00'},
					{img:'../../../../static/img/cute.jpg',name:'sinale',alonePre:'60',rank:'03',money:'￥2100.00'},
					{img:'../../../../static/img/cute.jpg',name:'Tim',alonePre:'70',rank:'03',money:'￥2100.00'},
					{img:'../../../../static/img/cute.jpg',name:'Klla',alonePre:'80',rank:'03',money:'￥2100.00'}
				]
			}
		},
		methods: {
			showArcbar(canvasId,chartData){
				canvaArcbar1=new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize:11,
					legend:{show:false},
					background:'#FFFFFF',
					pixelRatio:this.pixelRatio,
					series: chartData.series,
					animation: true,
					width: this.cWidth3*this.pixelRatio,
					height: this.cHeight3*this.pixelRatio,
					dataLabel: true,
					title: {
						name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
						color: chartData.series[0].color,
						fontSize: 18*this.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,//这里您可以直接给任意字符串
						color: '#666666',
						fontSize: 15*this.pixelRatio
					},
					extra: {
						arcbar:{
							type:'circle',//整圆类型进度条图
							width: this.arcbarWidth*this.pixelRatio,//圆弧的宽度
							startAngle:0.5//整圆类型只需配置起始角度即可
						}
					}
				});
				
			},
		},
		onLoad(options){
			this.cWidth3=uni.upx2px(200);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(200);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(20);
			this.showArcbar("canvasArcbar1",this.chartData);
		}
	}
</script>

<style lang="less">
	page{
		background-color:rgba(247,247,247,1)
	}
	.sale_item_top{
		padding:13px 20px 22px 17px;
		background-color: #fff;
		.sale_info_container{
			.user_info{
				margin-bottom: 7px;
				.user_avatar{
					width:47px;
					height:47px;
					border-radius: 50%;
					vertical-align: middle;
					margin-right:14px;
				}
			}
			.sale_info{
				padding-left: 17px;
				.sale_info_item{
					margin-bottom: 7px;
				}
				.blue-dot{
					width: 6px;
					height: 6px;
					border-radius: 50%;
					margin-right: 8px;
					background:#42B0ED
				}
			}
		}
	}
	.sale_chart_container{
		width: 200upx;
		height: 200upx;
		background-color: #FFFFFF;
		position: relative;
		.charts3 {
			position: absolute;
			width: 200upx;
			height: 200upx;
			background-color: #FFFFFF;
		}
	}
	.sale_item_bottom{
		padding:17px 16px 20px; 
		background-color: #fff;
		.intro{
			margin-bottom: 18px;
		}
		.sale_man_list{
			margin-bottom: 20px;
			.man_avatar{
				width: 50px;
				height: 50px;
				border-radius:50%;
				vertical-align: middle;
				margin-right: 7px;
			}
			.man_sale{
				
			}
		}
	}
</style>
