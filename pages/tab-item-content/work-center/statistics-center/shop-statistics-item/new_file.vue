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
		<view class="chart-container">
			<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true"
					interval="5000" duration="500" autoplay="true">
				<swiper-item v-for="(item,index) in shopPerformList" :key="index">
					<view class="chart-content" >
						<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"  :class="{'show':item.id==0}"></canvas>
						<canvas canvas-id="canvasArcbar2" id="canvasArcbar2" class="charts3" :class="{'show':item.id==1}"></canvas>
						<canvas canvas-id="canvasArcbar3" id="canvasArcbar3" class="charts3" :class="{'show':item.id==2}"></canvas>
					</view>
					<view class="chart-num">
						<view style="flex:1" class="flex justify-start">
							<view class="chartNum-l">
								<image src="../../../../../static/img/work/statistics/count-money.png" ></image>
							</view>
							<view>
								<view >
									<view class="font-family-num font-weight-bold" style="font-size:26px;">{{item.factPerform}}</view>
									<view style="color:#7C81A3;" class="font-size-mini">{{item.factTitle}}</view>
								</view>
							</view>
						</view>
						<view style="flex:1"  class="flex justify-start">
							<view class="chartNum-r">
								<image src="../../../../../static/img/work/statistics/aim-money.png" ></image>
							</view>
							<view>
								<view >
									<view class="font-family-num font-weight-bold" style="font-size:26px;">{{item.aimPerform}}</view>
									<view style="color:#7C81A3;" class="font-size-mini">{{item.aimTitle}}</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>

		</view>
		<!--图表 end-->

		<!--列表 start-->
		<view class="rank-container bg-white" >
			<view class="rank-container-item count flex justify-between align-center " @click="tabSelect('count')"	 :class="{'boxShadow':clickType=='count'}">
				<image src="../../../../../static/img/work/statistics/xiaoshoutongji.png" class="rank-img"></image>
				<view class="flex justify-between borderBottom" style="flex:1;height:42px;line-height:42px;">
					<view>销售统计</view>
					<view class="cuIcon-right font-size-bigger color-regular " ></view>
				</view>
				
			</view>
			<view class="rank-container-item flex justify-between align-center " @click="tabSelect('start')"	:class="{'boxShadow':clickType=='start'}">
				<image src="../../../../../static/img/work/statistics/rank.png" class="rank-img"></image>
				<view class="flex justify-between borderBottom" style="flex:1;height:42px;line-height:42px;">
					<view>销售明星榜</view>
					<view class="cuIcon-right font-size-bigger color-regular " ></view>
				</view>
			</view>
			<view class="rank-container-item flex justify-between align-center position_relative" @click="tabSelect('check')"	:class="{'boxShadow':clickType=='check'}">
				<image src="../../../../../static/img/work/statistics/shenhe.png" class="rank-img"></image>
				<view class="flex justify-between borderBottom" style="flex:1;height:42px;line-height:42px;">
					<view>门店绩效审核</view>
					<view class="cuIcon-right font-size-bigger color-regular " ></view>
				</view>
			</view>
			<view class="rank-container-item flex justify-between align-center position_relative"  @click="tabSelect('resolve')"	v-if="userInfo.id==shopManagerID" :class="{'boxShadow':clickType=='resolve'}">
				<image src="../../../../../static/img/work/statistics/resolve.png" class="rank-img"></image>
				<view class="flex justify-between borderBottom" style="flex:1;height:42px;line-height:42px;">
					<view>门店绩效分解</view>
					<view class="cuIcon-right font-size-bigger color-regular " ></view>
				</view>
			</view>
			
		</view>
		<!--列表 end-->
		<view class="btn-tag" @click="record">记一笔</view>
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
				
				//获得今年的目标绩效
				this.$ajax('ShopYearlyPerformance',{
					shop:this.shopID,
					year:new Date().getFullYear()
				},res=>{
					this.shopPerformList[0]={
						id:0,
						factPerform:Number(res['aamount']),
						aimPerform:Number(res['expect']) ||1,
						shopPre:(Number(res['aamount']/(res['expect'] ||1))).toFixed(2),
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
					id:1,
				   	factPerform:Number(res[`amonth${new Date().getMonth()+1}`]),
				   	aimPerform:Number(res[`month${new Date().getMonth()+1}`]),
				   	shopPre:(Number(res[`amonth${new Date().getMonth()+1}`]) / (Number(res[`month${new Date().getMonth()+1}`]) || 1)).toFixed(2),
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
					id:2,
				  	factPerform:Number(res[`aday${new Date().getDate()}`]),
				  	aimPerform:Number(res[`day${new Date().getDate()}`]),
				  	shopPre:(Number(res[`aday${new Date().getDate()}`]) / (Number(res[`day${new Date().getDate()}`]) || 1)).toFixed(2),
					factTitle:'今日销售额',
					aimTitle:'日目标销售额',
				  }
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
					case 'today':
						setTimeout(()=>{
							uni.navigateTo({
								url:"../statistics-detail/statistics-detail?value="+type+'&id='+this.shopID,
								success: () => {
									this.clickType=null;
								}
							})

						},600)
						break;
					case 'month':
						setTimeout(()=>{
							uni.navigateTo({
								url:"../statistics-detail/statistics-detail?value="+type+'&id='+this.shopID,
								success: () => {
									this.clickType=null;
								}
							})

						},600)

						break;
					case 'year':
						setTimeout(()=>{
							uni.navigateTo({
								url:"../statistics-detail/statistics-detail?value="+type+'&id='+this.shopID,
								success: () => {
									this.clickType=null;
								}
							})

						},600)

						break;
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
								url:"../sale-statistics-center/sale-statistics-start/sale-statistics-start",
								success: () => {
									this.clickType=null;
								}
							})
						},600)

						break;
					case 'check':
						setTimeout(()=>{
							uni.navigateTo({
								url:"../statistics-check/statistics-check?id="+this.shopID,
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
				this.getShopSaleAim()
			}

		}
	}
</script>

<style lang="less" scoped>
	.charts3{
		width: 250upx;
		height: 250upx;
		position:absolute;
		top:17px;
		left:14px;
		opacity: 0;
	}
	.screen-swiper{
		min-height:220px;
	}
	.chart-container{
		height:220px;
		background:url(../../../../../static/img/work/statistics/bg.png) no-repeat;
		.chart-content{
			width: 150px;
			height: 150px;
			margin:0 auto;
			background:url(../../../../../static/img/work/statistics/count-bg.png) no-repeat;
			-webkit-background-size: contain;
			background-size: contain;
			position:relative;
		}
		.chart-num{
			margin-left:70px;
			display:flex;
			color:#fff;
			justify-content: space-between;
			.chartNum-l{
				background:url(../../../../../static/img/work/statistics/count-money.png) no-repeat left 10px;
				padding-left:30px;
				background-size:20px;
			}
			.chartNum-r{
				padding-left:30px;
				background:url(../../../../../static/img/work/statistics/aim-money.png) no-repeat left 10px;
				background-size:20px;
			}
		}
	}
	.rank-container{
		/*padding:23px 13px 56px 14px;*/
		padding-top:23px;
		padding-bottom:4px;
		border-radius:6px;
		.rank-container-item{
			margin-bottom:27px;
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
		margin:15px auto;
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
</style>
