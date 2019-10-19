<template>
	<view>
		<cu-custom :isBack="true"  bgColor="bg-color-perform">
			<block slot="left">
				<view class="cuIcon-back text-white" style="font-size:20px;" @click="goBack"></view>
			</block>
			<block slot="content">
				<view class="text-white font-size-big">销售绩效</view>
			</block>
		</cu-custom>

		<!--图表 start-->
		<view class="chart-container ">
			<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true"
					interval="5000" duration="500" autoplay="true">
				<swiper-item v-for="(item,index) in shopPerformList" :key="index" class="text-white">
					<view class="dateTitle font-family-num  font-size-supper text-white">{{item.date}}</view>
					<view class="performData flex justify-between text-red">
						<view style="width:60%">
							<view class="text-white" style="margin-bottom:5px">{{item.aimTitle}}</view>
							<view class="font-family-num" style="font-size:24px;color:#78F6B2">¥ {{item.aimPerform}}</view>
						</view>
						<view style="flex:1" class="text-left">
							<view class="text-white" style="margin-bottom:5px">{{item.factTitle}}</view>
							<view class="font-family-num" style="font-size:24px;color:#FF7A91">¥{{item.factPerform}}</view>
						</view>
					</view>
					<view class="progress-container flex justify-start align-center" style="padding:0 10px;">
						<view style="width:23%" class="font-size-big text-white">门店占比</view>
						<view style="flex:1;margin:0 8px 0 5px;" >
							<view class="cu-progress round sm striped active" >
								<view class="bg-color-red"  :style="[{ width:`${item.shopPre}%`}]"></view>

							</view>
						</view>
						<view style="width:13%;text-align: right;" class="color-purple font-size-middle font-family-num">{{item.shopPre}}%</view>
					</view>
				</swiper-item>
			</swiper>

		</view>
		<!--图表 end-->

		<!--列表 start-->
		<view class="rank-container bg-white" >
			<view class="rank-container-item count flex justify-between align-center " @click="tabSelect('count')"	>
				<image src="../../../../../static/img/work/statistics/xiaoshoutongji.png" class="rank-img"></image>
				<view class="flex justify-between borderBottom" style="flex:1;height:69px;line-height:69px;">
					<view>销售统计</view>
					<view class="cuIcon-right font-size-bigger color-regular " ></view>
				</view>

			</view>
			<view class="rank-container-item flex justify-between align-center " @click="tabSelect('start')"	>
				<image src="../../../../../static/img/work/statistics/rank.png" class="rank-img"></image>
				<view class="flex justify-between borderBottom" style="flex:1;height:69px;line-height:69px;">
					<view>销售明星榜</view>
					<view class="cuIcon-right font-size-bigger color-regular " ></view>
				</view>
			</view>
			<view class="rank-container-item flex justify-between align-center position_relative" @click="tabSelect('check')"	>
				<image src="../../../../../static/img/work/statistics/shenhe.png" class="rank-img"></image>
				<view class="flex justify-between " style="flex:1;height:69px;line-height:69px;"
					:class="{
						'borderBottom':userInfo.id==shopManagerID
					}"
				>
					<view>门店绩效审核</view>
					<view class="cuIcon-right font-size-bigger color-regular " ></view>
				</view>
			</view>
			<view class="rank-container-item flex justify-between align-center position_relative"  @click="tabSelect('resolve')"	v-if="userInfo.id==shopManagerID" >
				<image src="../../../../../static/img/work/statistics/resolve.png" class="rank-img"></image>
				<view class="flex justify-between " style="flex:1;height:69px;line-height:69px;">
					<view>门店绩效分解</view>
					<view class="cuIcon-right font-size-bigger color-regular " ></view>
				</view>
			</view>

		</view>
		<!--列表 end-->
		<view class="btn-tag font-size-big" @click="record">记一笔</view>
		<!-- <image src="../../../../../static/img/edit.png"
		style="position:fixed;right:12px;bottom:20px;width:80px;height:80px;z-index:100;" @click="record"></image> -->
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uCharts from '../../../../../components/u-charts/u-charts.js';
	var canvaArcbar1=null;
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				shopID:'',
				shopZone:'',//门店所在区域
				shopManagerID:'',//门店店长
				clickType:'',
				salePerformance:'',
				saleDayMount:'',
				/*圆弧*/
				chartData:{
					series:[]
				},
				cWidth3:'',
				cHeight3:'',
				pixelRatio:1,
				arcbarWidth:'',
				shopPerformList:[]
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
						fontSize: 25*this.pixelRatio
					},
					subtitle: {
						name: chartData.series[0].name,//这里您可以直接给任意字符串
						color: '#666666',
						fontSize: 15*this.pixelRatio
					},
					extra: {
						arcbar:{
							type:'default',
							width: this.arcbarWidth*this.pixelRatio,//圆弧的宽度
							startAngle:1.5,
							endAngle:1
						}
					}
				});

			},
			/*获得门店月份销售目标*/
			getShopSaleAim(){
				let year=new Date().getFullYear();
				let month=new Date().getMonth()+1>=10?new Date().getMonth()+1:'0'+(new Date().getMonth()+1);
				let day=new Date().getDate()>=10?new Date().getDate():'0'+new Date().getDate()

				//获得今年的目标绩效
				this.$ajax('ShopYearlyPerformance',{
					shop:this.shopID,
					year:new Date().getFullYear()
				},res=>{
					this.shopPerformList[0]={
						date:year,
						factPerform:Number(res['actual']).toFixed(2),
						aimPerform:Number(res['expect']).toFixed(2) || 0,
						shopPre:res['expect']?Number(res['actual']/res['expect']*100).toFixed(2):0,
						factTitle:'本年销售额',
						aimTitle:'年目标销售额',

					}
					
					this.chartData.series=[
						{
							name:'门店日占比',
							data:0.29,
							color: '#2fc25b'

						}
					]
					 this.showArcbar('canvasArcbar1', this.chartData)
				})

				/*
					获得月份的绩效，用于轮播图
				*/
			   this.$ajax('ShopMonthlyPerformance',{
				   shop:this.shopID,
				   year:new Date().getFullYear(),

			   },res=>{
				   this.shopPerformList[1]={
					date:`${year}.${month}`,
				   	factPerform:Number(res['actual']).toFixed(2),
				   	aimPerform:Number(res[`month${new Date().getMonth()+1}`]).toFixed(2) ||0,
				   	shopPre:res[`month${new Date().getMonth()+1}`]?Number(res['actual']/res[`month${new Date().getMonth()+1}`]*100).toFixed(2):0,
					factTitle:'本月销售额',
					aimTitle:'月目标销售额',
				   }
				  
				  this.chartData.series=[
				  	{
				  		name:'门店日占比',
				  		data:0.40,
				  		color: '#2fc25b'

				  	}
				  ]
				   this.showArcbar('canvasArcbar2', this.chartData)
			   })
			   /*
			   	获得日的绩效，用于轮播图
			   */
			  this.$ajax('ShopMonthlyPerformance',{
				  shop:this.shopID,
				  year:new Date().getFullYear(),
				  month:new Date().getMonth()+1
			  },res=>{
				  this.shopPerformList[2]={
					date:`${year}.${month}.${day}`,
				  	factPerform:Number(res[`aday${new Date().getDate()}`]).toFixed(2),
				  	aimPerform:Number(res[`day${new Date().getDate()}`]).toFixed(2),
				  	shopPre:res[`day${new Date().getDate()}`]?Number(res[`aday${new Date().getDate()}`]/res[`day${new Date().getDate()}`]*100).toFixed(2):0,
					factTitle:'今日销售额',
					aimTitle:'日目标销售额',
				  }
				  console.log(this.shopPerformList[2])
				  this.chartData.series=[
				  	{
				  		name:'门店日占比',
				  		data:0.79,
				  		color: '#2fc25b'

				  	}
				  ]
				   this.showArcbar('canvasArcbar3', this.chartData)

			  })

			},
			/*记一笔*/
			record(){
				uni.navigateTo({
					url:"../record-money/record-money?id="+this.shopID
				})
			},
			/*
			* 返回
			* */
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			/*
			* 选中tab
			*
			* */
			tabSelect(type){
				this.clickType=type;
				switch(type){

					case 'count':
						// 销售统计
						setTimeout(()=>{
							uni.navigateTo({
								url:"../sale-statistics-center/sale-statistics/sale-statistics?id="+this.shopID,
								success: () => {
									this.clickType=null;
								}

							})

						},600)

						break;
					case 'start':
						setTimeout(()=>{
							uni.navigateTo({
								url:"../sale-statistics-center/sale-statistics-start/sale-statistics-start?id="+this.shopID+"&zone="+this.shopZone,
								success: () => {
									this.clickType=null;
								}
							})
						},600)

						break;
					case 'check':
						setTimeout(()=>{
							uni.navigateTo({
								url:"../statistics-check/statistics-check?id="+this.shopID+'&managetID='+this.shopManagerID,
								success: () => {
									this.clickType=null;
								}
							})
						},600)

						break;
					case 'resolve':
						setTimeout(()=>{
							uni.navigateTo({
								url:"../shop-statistics-aim-resolve/shop-statistics-aim-resolve?id="+this.shopID,
								success: () => {
									this.clickType=null;
								}
							})
						},600)

						break;
				}

			}
		},
		onLoad(params){
			this.cWidth3=uni.upx2px(250);//这里要与样式的宽高对应
			this.cHeight3=uni.upx2px(250);//这里要与样式的宽高对应
			this.arcbarWidth=uni.upx2px(24);
			if(params){
				this.shopID=params.id;
				this.shopManagerID=params.manager;
				this.shopZone=params.zone;
				this.getShopSaleAim()
			}

		},
		onShow(){
			this.getShopSaleAim()
		}
	}
</script>

<style lang="less" >
	swiper .a-swiper-dot {
		display: inline-block;
		width: 18upx;
		height: 18upx;
		background:rgba(38,43,76,1);
		border-radius: 50%;
		vertical-align: middle;
	}



	swiper.round-dot .wx-swiper-dot.wx-swiper-dot-active::after,
	swiper.round-dot .a-swiper-dot.a-swiper-dot-active::after,
	swiper.round-dot .uni-swiper-dot.uni-swiper-dot-active::after {
		content: "";
		position: absolute;
		width: 16upx;
		height: 16upx;
		top: 0upx;
		left: 0upx;
		right: 0;
		bottom: 0;
		margin: auto;
		background:rgba(82,88,128,1);
		border-radius: 50%;

	}

	swiper.round-dot .wx-swiper-dot.wx-swiper-dot-active,
	swiper.round-dot .a-swiper-dot.a-swiper-dot-active,
	swiper.round-dot .uni-swiper-dot.uni-swiper-dot-active {
		width: 16upx;
		height: 16upx;
		background:rgba(82,88,128,1);
	}
	.charts3{
		width: 250upx;
		height: 250upx;
		position:absolute;
		top:17px;
		left:14px;
		opacity: 0;
	}
	.screen-swiper{
		min-height:216px;
	}

	.chart-container{
		height:216px;

		background:url(../../../../../static/img/work/statistics/bg.png) no-repeat center center;
		background-size:cover;

		.dateTitle{

			margin-top:30px;
			margin-left:26px;
		}
		.performData{
			margin: 15px 41px 17px 26px;

		}
		.progress-container{
			margin: 0px 21px 17px 20px;
		}
	}

	.rank-container{
		/*padding:23px 13px 56px 14px;*/



		.rank-container-item{
			padding:3px 13px;
			// padding-left:14px;
			// padding-right:13px;
			.rank-img{
				width:42px;
				height: 42px;
				vertical-align: middle;
				margin-right:10px;
			}
			.real-aim{
				margin-right:31px;
			}
			.aim{
				font-size:16px;
				font-weight: bold;
				color:rgba(255,72,103,1);
				margin-left:5px;
			}
		}


	}
	.btn-tag{

		height: 36px;
		width: 117px;
		margin:35px auto;
		line-height: 36px;
		text-align: center;
		background:rgba(66,176,237,1);
		border-radius:20px;
		color:#fff;
	}
	.boxShadow{
		box-shadow: 0px 15px 30px rgba(0,0,0,0.2)
	}
	.show{
		opacity:1;
	}
	 uni-swiper.round-dot .uni-swiper-dot{
		width: 8px !important;
		height: 8px !important;
	}
</style>
